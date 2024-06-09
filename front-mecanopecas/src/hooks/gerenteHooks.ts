import { useQuery, useMutation, UseMutationResult } from "@tanstack/react-query";
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

export function useGerente(id: bigint) {
    const { data, isLoading, isError } = useQuery<AxiosResponse<GerenteResponseDTO>>({
        queryKey: ['gerente', id],
        queryFn: () => getGerente(id),
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

export function useUpdateGerente(): UseMutationResult<AxiosResponse<GerenteResponseDTO>, unknown, { id: bigint, gerenteRequestDTO: GerenteRequestDTO }> {
    return useMutation<AxiosResponse<GerenteResponseDTO>, unknown, { id: bigint, gerenteRequestDTO: GerenteRequestDTO }>({
        mutationFn: ({ id, gerenteRequestDTO }) => updateGerente(id, gerenteRequestDTO),
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

export function useDeleteGerente(): UseMutationResult<AxiosResponse<void>, unknown, bigint> {
    return useMutation<AxiosResponse<void>, unknown, bigint>({
        mutationFn: (id) => deleteGerente(id),
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
