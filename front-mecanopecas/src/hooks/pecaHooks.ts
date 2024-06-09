import { useQuery, useMutation, UseMutationResult } from "@tanstack/react-query";
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

export function usePeca(id: bigint) {
    const { data, isLoading, isError } = useQuery<AxiosResponse<PecaResponseDTO>>({
        queryKey: ['peca', id],
        queryFn: () => getPeca(id),
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
        onMutate: (variables) => {
            // Add your code here
        },
        onError: (error, variables, context) => {
            // Add your code here
        },
        onSuccess: (data, variables, context) => {
            // Add your code here
        },
    });
}

export function useUpdatePeca(): UseMutationResult<AxiosResponse<PecaResponseDTO>, unknown, { id: bigint, pecaRequestDTO: PecaRequestDTO }> {
    return useMutation<AxiosResponse<PecaResponseDTO>, unknown, { id: bigint, pecaRequestDTO: PecaRequestDTO }>({
        mutationFn: ({ id, pecaRequestDTO }) => updatePeca(id, pecaRequestDTO),
        onMutate: (variables) => {
            // Add your code here
        },
        onError: (error, variables, context) => {
            // Add your code here
        },
        onSuccess: (data, variables, context) => {
            // Add your code here
        },
    });
}

export function useDeletePeca(): UseMutationResult<AxiosResponse<void>, unknown, bigint> {
    return useMutation<AxiosResponse<void>, unknown, bigint>({
        mutationFn: (id) => deletePeca(id),
        onMutate: (id) => {
            // Add your code here
        },
        onError: (error, variables, context) => {
            // Add your code here
        },
        onSuccess: (data, variables, context) => {
            // Add your code here
        },
    });
}
