import { useQuery, useQueryClient, useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ClienteResponseDTO } from "../dtos/response/clienteResponseDTO";
import { ClienteRequestDTO } from "../dtos/request/clienteRequestDTO";
import { getAllClientes, getAllClientesAtivos, getCliente, createCliente, updateCliente, deleteCliente } from "../repositories/clienteRepository";

export function useClientes() {
    const { data, isLoading, isError } = useQuery<AxiosResponse<ClienteResponseDTO[]>>({
        queryKey: ['clientes'],
        queryFn: getAllClientes,
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
        queryFn: getAllClientesAtivos,
        retry: 2
    });

    return {
        clientesAtivosData: data?.data,
        clientesAtivosLoading: isLoading,
        clientesAtivosError: isError,
    };
}

export function useCliente(id: string) {
    const { data, isLoading, isError } = useQuery<AxiosResponse<ClienteResponseDTO>>({
        queryKey: ['cliente', id],
        queryFn: () => getCliente(BigInt(id)),
        retry: 2
    });

    return {
        clienteData: data?.data,
        clienteLoading: isLoading,
        clienteError: isError,
    };
}

export function useCreateCliente(): UseMutationResult<AxiosResponse<ClienteResponseDTO>, unknown, ClienteRequestDTO> {
    return useMutation<AxiosResponse<ClienteResponseDTO>, unknown, ClienteRequestDTO>({
        mutationFn: createCliente
    });
}

export function useUpdateCliente(): UseMutationResult<AxiosResponse<ClienteResponseDTO>, unknown, { id: bigint, clienteRequestDTO: ClienteRequestDTO }> {
    return useMutation<AxiosResponse<ClienteResponseDTO>, unknown, { id: bigint, clienteRequestDTO: ClienteRequestDTO }>({
        mutationFn: ({ id, clienteRequestDTO }) => updateCliente(id, clienteRequestDTO)
    });
}

export function useDeleteCliente(): UseMutationResult<AxiosResponse<void>, unknown, bigint> {

    const queryClient = useQueryClient()

    return useMutation<AxiosResponse<void>, unknown, bigint>({
        mutationFn: (id) => deleteCliente(id),
        onMutate: async (id) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['clientes'] })

            // Snapshot the previous value
            const oldClientes: AxiosResponse<ClienteResponseDTO[]> = queryClient.getQueryData(['clientes'])!;

            // Get the cliente from the list
            const updatedCliente = oldClientes.data.find(cliente => cliente.id === id)

            // Set the cliente as inactive
            updatedCliente!.ativo = false

            // Optimistically update to the new value
            queryClient.setQueryData(['clientes', updatedCliente?.id], updatedCliente)

            return { oldClientes }
        },
        onError: (context) => {
            // If the mutation fails, use the context to roll back
            const typedContext = context as { oldClientes: AxiosResponse<ClienteResponseDTO[]> };
            queryClient.setQueryData(['clientes'], typedContext.oldClientes);
        },
        onSettled: () => {
            // If the mutation is successful, invalidate the query
            queryClient.invalidateQueries({ queryKey: ['clientes'] })
        },
    })
}