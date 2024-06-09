import { useQuery, useQueryClient, useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { VendedorResponseDTO } from "../dtos/response/vendedorResponseDTO";
import { VendedorRequestDTO } from "../dtos/request/vendedorRequestDTO";
import { getVendedores, getVendedoresAtivos, getVendedor, createVendedor, updateVendedor, deleteVendedor } from "../repositories/vendedorRepository";


export function useVendedores() {
    const { data, isLoading, isError } = useQuery<AxiosResponse<VendedorResponseDTO[]>>({
        queryKey: ['vendedores'],
        queryFn: getVendedores,
        retry: 2
    });

    return {
        vendedoresData: data?.data,
        vendedoresLoading: isLoading,
        vendedoresError: isError,
    };
}

export function useVendedoresAtivos() {
    const { data, isLoading, isError } = useQuery<AxiosResponse<VendedorResponseDTO[]>>({
        queryKey: ['vendedores-ativos'],
        queryFn: getVendedoresAtivos,
        retry: 2
    });

    return {
        vendedoresAtivosData: data?.data,
        vendedoresAtivosLoading: isLoading,
        vendedoresAtivosError: isError,
    };
}

export function useVendedor(id: bigint) {
    const { data, isLoading, isError } = useQuery<AxiosResponse<VendedorResponseDTO>>({
        queryKey: ['vendedor', id],
        queryFn: () => getVendedor(id),
        retry: 2
    });

    return {
        vendedorData: data?.data,
        vendedorLoading: isLoading,
        vendedorError: isError,
    };
}

export function useCreateVendedor(): UseMutationResult<AxiosResponse<VendedorResponseDTO>, unknown, VendedorRequestDTO> {

    const queryClient = useQueryClient()

    return useMutation<AxiosResponse<VendedorResponseDTO>, unknown, VendedorRequestDTO>({
        mutationFn: createVendedor,
        onMutate: async (newVendedor) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({queryKey: ['vendedores']})

            // Snapshot the previous value
            const oldVendedores: AxiosResponse<VendedorResponseDTO[]> = queryClient.getQueryData(['vendedores'])!;

            //Transform the new VendedorRequest into a VendedorResponse to push into the list
            const newVendedorResponseDTO: VendedorResponseDTO = {
                id: BigInt(0),
                ...newVendedor,
                ativo: true
            }

            // Optimistically update to the new value
            queryClient.setQueryData(['vendedores'], [...oldVendedores.data, newVendedorResponseDTO])

            return { oldVendedores }
        },
        onError: (context) => {
            // If the mutation fails, use the context to roll back
            const typedContext = context as { oldVendedores: AxiosResponse<VendedorResponseDTO[]> };
            queryClient.setQueryData(['vendedores'], typedContext.oldVendedores);
        },
        onSuccess: () => {
            // If the mutation is successful, invalidate the query
            queryClient.invalidateQueries({queryKey:['vendedores']})
        },
    });
}

export function useUpdateVendedor(): UseMutationResult<AxiosResponse<VendedorResponseDTO>, unknown, { id: bigint, vendedorRequestDTO: VendedorRequestDTO }> {

    const queryClient = useQueryClient()

    return useMutation<AxiosResponse<VendedorResponseDTO>, unknown, { id: bigint, vendedorRequestDTO: VendedorRequestDTO }>({
        mutationFn: ({ id, vendedorRequestDTO }) => updateVendedor(id, vendedorRequestDTO),
        onMutate: async (variables: { id: bigint; vendedorRequestDTO: VendedorRequestDTO }) => {
            const { id, vendedorRequestDTO: updatedVendedor } = variables;

            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['vendedores'] })

            // Snapshot the previous value
            const oldVendedores = queryClient.getQueryData(['vendedores'])!;

            // Optimistically update to the new value
            queryClient.setQueryData(['vendedores', id], updatedVendedor)

            return { oldVendedores }
        },
        onError: (context) => {
            // If the mutation fails, use the context to roll back
            const typedContext = context as { oldVendedores: AxiosResponse<VendedorResponseDTO[]> };
            queryClient.setQueryData(['vendedores'], typedContext.oldVendedores);
        },
        onSettled: () => {
            // If the mutation is successful, invalidate the query
            queryClient.invalidateQueries({ queryKey: ['vendedores'] })
        },
    });
}

export function useDeleteVendedor(): UseMutationResult<AxiosResponse<void>, unknown, bigint> {

    const queryClient = useQueryClient()

    return useMutation<AxiosResponse<void>, unknown, bigint>({
        mutationFn: (id) => deleteVendedor(id),
        onMutate: async (id) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['vendedores'] })

            // Snapshot the previous value
            const oldVendedores: AxiosResponse<VendedorResponseDTO[]> = queryClient.getQueryData(['vendedores'])!;

            // Get the vendedor from the list
            const updatedVendedor = oldVendedores.data.find(vendedor => vendedor.id === id)

            // Set the vendedor as inactive
            updatedVendedor!.ativo = false

            // Optimistically update to the new value
            queryClient.setQueryData(['vendedores', updatedVendedor?.id], updatedVendedor)

            return { oldVendedores }
        },
        onError: (context) => {
            // If the mutation fails, use the context to roll back
            const typedContext = context as { oldVendedores: AxiosResponse<VendedorResponseDTO[]> };
            queryClient.setQueryData(['vendedores'], typedContext.oldVendedores);
        },
        onSettled: () => {
            // If the mutation is successful, invalidate the query
            queryClient.invalidateQueries({ queryKey: ['vendedores'] })
        },
    });
}