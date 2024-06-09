import { useQuery, useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ClienteResponseDTO } from "../dtos/response/clienteResponseDTO";
import { ClienteRequestDTO } from "../dtos/request/clienteRequestDTO";
import { readAllClientes, readAllClientesAtivos, createCliente, updateCliente, deleteCliente } from "../repositories/clienteRepository";

export function useClientes() {
    const { data, isLoading, isError } = useQuery<AxiosResponse<ClienteResponseDTO[]>>({
        queryKey: ['clientes'],
        queryFn: readAllClientes,
        retry: 2
    });

    return {
        clientesData: data?.data,
        clientesLoading: isLoading,
        clientesError: isError,
    };
}

export function useClientesAtivos() {
    const {
        data,
        isLoading,
        isError
    } = useQuery<AxiosResponse<ClienteResponseDTO[]>>({
        queryKey: ['clientes-ativos'],
        queryFn: readAllClientesAtivos,
        retry: 2
    });

    return {
        clientesAtivosData: data?.data,
        clientesAtivosLoading: isLoading,
        clientesAtivosError: isError,
    };
}

export function useCreateCliente(): UseMutationResult<AxiosResponse<ClienteResponseDTO>, unknown, ClienteRequestDTO> {
    return useMutation<AxiosResponse<ClienteResponseDTO>, unknown, ClienteRequestDTO>({
        mutationFn: createCliente,
        onMutate: (clienteRequestDTO) => {
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

export function useUpdateCliente(): UseMutationResult<AxiosResponse<ClienteResponseDTO>, unknown, { id: bigint, clienteRequestDTO: ClienteRequestDTO }> {
    return useMutation<AxiosResponse<ClienteResponseDTO>, unknown, { id: bigint, clienteRequestDTO: ClienteRequestDTO }>({
        mutationFn: ({ id, clienteRequestDTO }) => updateCliente(id, clienteRequestDTO),
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

export function useDeleteCliente(): UseMutationResult<AxiosResponse<void>, unknown, bigint> {
    return useMutation<AxiosResponse<void>, unknown, bigint>({
        mutationFn: deleteCliente,
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
