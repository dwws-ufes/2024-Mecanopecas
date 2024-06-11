import { useQuery, useQueryClient, useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { GerenteResponseDTO } from "../dtos/response/gerenteResponseDTO";
import { GerenteRequestDTO } from "../dtos/request/gerenteRequestDTO";
import { getGerentes, getGerente, createGerente, updateGerente, deleteGerente } from "../repositories/gerenteRepository";

export function useGerentes() {
    const { data, isLoading, isError } = useQuery<AxiosResponse<GerenteResponseDTO[]>>({
        queryKey: ['gerentes'],
        queryFn: getGerentes,
        retry: 2
    });

    return {
        gerentesData: data?.data,
        gerentesLoading: isLoading,
        gerentesError: isError,
    };
}

export function useGerente(id: string) {
    const { data, isLoading, isError } = useQuery<AxiosResponse<GerenteResponseDTO>>({
        queryKey: ['gerente', id],
        queryFn: () => getGerente(BigInt(id)),
        retry: 2
    });

    return {
        gerenteData: data?.data,
        gerenteLoading: isLoading,
        gerenteError: isError,
    };
}

export function useCreateGerente(): UseMutationResult<AxiosResponse<GerenteResponseDTO>, unknown, { vendedorId: bigint, gerenteRequestDTO: GerenteRequestDTO }> {
    return useMutation<AxiosResponse<GerenteResponseDTO>, unknown, { vendedorId: bigint, gerenteRequestDTO: GerenteRequestDTO }>({
        mutationFn: ({ vendedorId, gerenteRequestDTO }) => createGerente(vendedorId, gerenteRequestDTO),
    });
}

export function useUpdateGerente(): UseMutationResult<AxiosResponse<GerenteResponseDTO>, unknown, { id: bigint, gerenteRequestDTO: GerenteRequestDTO }> {
    return useMutation<AxiosResponse<GerenteResponseDTO>, unknown, { id: bigint, gerenteRequestDTO: GerenteRequestDTO }>({
        mutationFn: ({ id, gerenteRequestDTO }) => updateGerente(id, gerenteRequestDTO),
    });
}

export function useDeleteGerente(): UseMutationResult<AxiosResponse<void>, unknown, bigint> {

    const queryClient = useQueryClient()

    return useMutation<AxiosResponse<void>, unknown, bigint>({
        mutationFn: (id) => deleteGerente(id),
        onMutate: async (id) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['gerentes'] })

            // Snapshot the previous value
            const oldGerentes: AxiosResponse<GerenteResponseDTO[]> = queryClient.getQueryData(['gerentes'])!;

            // Get the gerente from the list
            const removedGerente = oldGerentes.data.find(gerente => gerente.id === id)

            // Filter out the gerente from the list
            oldGerentes.data = oldGerentes.data.filter(gerente => gerente.id !== id)

            // Optimistically update to the new value
            queryClient.setQueryData(['gerentes', removedGerente?.id], removedGerente)

            return { oldGerentes }
        },
        onError: (context) => {
            // If the mutation fails, use the context to roll back
            const typedContext = context as { oldGerentes: AxiosResponse<GerenteRequestDTO[]> };
            queryClient.setQueryData(['gerentes'], typedContext.oldGerentes);
        },
        onSettled: () => {
            // If the mutation is successful, invalidate the query
            queryClient.invalidateQueries({ queryKey: ['gerentes'] })
        },
    });
}
