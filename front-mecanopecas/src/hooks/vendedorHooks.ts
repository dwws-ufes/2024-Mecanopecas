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

export function useVendedor(id: string) {
    const { data, isLoading, isError } = useQuery<AxiosResponse<VendedorResponseDTO>>({
        queryKey: ['vendedor', id],
        queryFn: () => getVendedor(BigInt(id)),
        retry: 2
    });

    return {
        vendedorData: data?.data,
        vendedorLoading: isLoading,
        vendedorError: isError,
    };
}

export function useCreateVendedor(): UseMutationResult<AxiosResponse<VendedorResponseDTO>, unknown, VendedorRequestDTO> {
    return useMutation<AxiosResponse<VendedorResponseDTO>, unknown, VendedorRequestDTO>({
        mutationFn: createVendedor
    })
}

export function useUpdateVendedor(): UseMutationResult<AxiosResponse<VendedorResponseDTO>, unknown, { id: bigint, vendedorRequestDTO: VendedorRequestDTO }> {
    return useMutation<AxiosResponse<VendedorResponseDTO>, unknown, { id: bigint, vendedorRequestDTO: VendedorRequestDTO }>({
        mutationFn: ({ id, vendedorRequestDTO }) => updateVendedor(id, vendedorRequestDTO)
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
    })
}