import { useQuery, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { OrcamentoResponseDTO } from "../dtos/response/orcamentoResponseDTO";
import { OrcamentoRequestDTO } from "../dtos/request/orcamentoRequestDTO";
import { OrcamentoDetailResponseDTO } from "../dtos/response/orcamentoDetailResponseDTO";
import { VendaResponseDTO } from "../dtos/response/vendaResponseDTO";
import { OrcamentoPecaRequestDTO } from "../dtos/request/orcamentoPecaRequestDTO";
import { getAllOrcamentos, getOrcamento, createOrcamento, createVendaForOrcamento, addPecaToOrcamento, removePecaFromOrcamento, applyDescontoToOrcamento } from "../repositories/orcamentoRepository";

export function useAllOrcamentos() {
    const { data, isLoading, isError } = useQuery<AxiosResponse<OrcamentoResponseDTO[]>>({
        queryKey: ['orcamentos'],
        queryFn: getAllOrcamentos,
        retry: 2
    });

    return {
        orcamentosData: data?.data,
        orcamentosLoading: isLoading,
        orcamentosError: isError,
    };
}

export function useOrcamento(id: bigint) {
    const { data, isLoading, isError } = useQuery<AxiosResponse<OrcamentoDetailResponseDTO>>({
        queryKey: ['orcamento', id],
        queryFn: () => getOrcamento(id),
        retry: 2
    });

    return {
        orcamentoData: data?.data,
        orcamentoLoading: isLoading,
        orcamentoError: isError,
    };
}

export function useCreateOrcamento(): UseMutationResult<AxiosResponse<OrcamentoResponseDTO>, unknown, OrcamentoRequestDTO> {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<OrcamentoResponseDTO>, unknown, OrcamentoRequestDTO>({
        mutationFn: createOrcamento,
        retry: 2,
        onMutate: (orcamentoRequestDTO) => {
            // Add your code here
        },
        onError: (error, variables, context) => {
            // Add your code here
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['orcamentos'])
        }
    });
}

export function useCreateVendaForOrcamento(): UseMutationResult<AxiosResponse<VendaResponseDTO>, unknown, bigint> {
    return useMutation<AxiosResponse<VendaResponseDTO>, unknown, bigint>({
        mutationFn: createVendaForOrcamento,
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

export function useAddPecaToOrcamento(): UseMutationResult<AxiosResponse<OrcamentoDetailResponseDTO>, unknown, { id: bigint, orcamentoPecaRequestDTO: OrcamentoPecaRequestDTO }> {
    return useMutation<AxiosResponse<OrcamentoDetailResponseDTO>, unknown, { id: bigint, orcamentoPecaRequestDTO: OrcamentoPecaRequestDTO }>({
        mutationFn: ({ id, orcamentoPecaRequestDTO }) => addPecaToOrcamento(id, orcamentoPecaRequestDTO),
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

export function useRemovePecaFromOrcamento(): UseMutationResult<AxiosResponse<OrcamentoDetailResponseDTO>, unknown, { id: bigint, orcamentoPecaId: bigint }> {
    return useMutation<AxiosResponse<OrcamentoDetailResponseDTO>, unknown, { id: bigint, orcamentoPecaId: bigint }>({
        mutationFn: ({ id, orcamentoPecaId }) => removePecaFromOrcamento(id, orcamentoPecaId),
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

export function useApplyDescontoToOrcamento(): UseMutationResult<AxiosResponse<OrcamentoDetailResponseDTO>, unknown, { id: bigint, descontoPercentual: bigint }> {
    return useMutation<AxiosResponse<OrcamentoDetailResponseDTO>, unknown, { id: bigint, descontoPercentual: bigint }>({
        mutationFn: ({ id, descontoPercentual }) => applyDescontoToOrcamento(id, descontoPercentual),
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
