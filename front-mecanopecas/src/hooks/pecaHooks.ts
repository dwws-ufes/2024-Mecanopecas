import { useQuery, useQueryClient, useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { PecaResponseDTO } from "../dtos/response/pecaResponseDTO";
import { PecaRequestDTO } from "../dtos/request/pecaRequestDTO";
import { getPecas, getPeca, getPecasAtivas, createPeca, updatePeca, deletePeca } from "../repositories/pecaRepository";

export function usePecas() {
    const { data, isLoading, isError } = useQuery<AxiosResponse<PecaResponseDTO[]>>({
        queryKey: ['pecas'],
        queryFn: getPecas,
        retry: 2
    });

    return {
        pecasData: data?.data,
        pecasLoading: isLoading,
        pecasError: isError,
    };
}

export function usePecasAtivas() {
    const { data, isLoading, isError } = useQuery<AxiosResponse<PecaResponseDTO[]>>({
        queryKey: ['pecas-ativas'],
        queryFn: getPecasAtivas,
        retry: 2
    });

    return {
        pecasAtivasData: data?.data,
        pecasAtivasLoading: isLoading,
        pecasAtivasError: isError,
    };
}

export function usePeca(id: string) {
    const { data, isLoading, isError } = useQuery<AxiosResponse<PecaResponseDTO>>({
        queryKey: ['peca', id],
        queryFn: () => getPeca(BigInt(id)),
        retry: 2
    });

    return {
        pecaData: data?.data,
        pecaLoading: isLoading,
        pecaError: isError,
    };
}

export function useCreatePeca(): UseMutationResult<AxiosResponse<PecaResponseDTO>, unknown, PecaRequestDTO> {
    return useMutation<AxiosResponse<PecaResponseDTO>, unknown, PecaRequestDTO>({
        mutationFn: createPeca,
    });
}

export function useUpdatePeca(): UseMutationResult<AxiosResponse<PecaResponseDTO>, unknown, { id: bigint, pecaRequestDTO: PecaRequestDTO }> {
    return useMutation<AxiosResponse<PecaResponseDTO>, unknown, { id: bigint, pecaRequestDTO: PecaRequestDTO }>({
        mutationFn: ({ id, pecaRequestDTO }) => updatePeca(id, pecaRequestDTO),
    });
}

export function useDeletePeca(): UseMutationResult<AxiosResponse<void>, unknown, bigint> {
    const queryClient = useQueryClient()

    return useMutation<AxiosResponse<void>, unknown, bigint>({
        mutationFn: (id) => deletePeca(id),
        onMutate: async (id) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['pecas'] })

            // Snapshot the previous value
            const oldPecas: AxiosResponse<PecaResponseDTO[]> = queryClient.getQueryData(['pecas'])!;

            // Get the peca from the list
            const updatedPeca = oldPecas.data.find(peca => peca.id === id)

            // Set the peca as inactive
            updatedPeca!.ativo = false

            // Optimistically update to the new value
            queryClient.setQueryData(['pecas', updatedPeca?.id], updatedPeca)

            return { oldPecas: oldPecas }
        },
        onError: (context) => {
            // If the mutation fails, use the context to roll back
            const typedContext = context as { oldPecas: AxiosResponse<PecaResponseDTO[]> };
            queryClient.setQueryData(['pecas'], typedContext.oldPecas);
        },
        onSettled: () => {
            // If the mutation is successful, invalidate the query
            queryClient.invalidateQueries({ queryKey: ['pecas'] })
        },
    })
}
