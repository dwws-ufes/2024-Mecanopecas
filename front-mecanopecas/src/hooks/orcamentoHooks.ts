import { useQuery, useQueryClient, useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { OrcamentoResponseDTO } from "../dtos/response/orcamentoResponseDTO";
import { OrcamentoRequestDTO } from "../dtos/request/orcamentoRequestDTO";
import { OrcamentoDetailResponseDTO } from "../dtos/response/orcamentoDetailResponseDTO";
import { VendaResponseDTO } from "../dtos/response/vendaResponseDTO";
import { OrcamentoPecaRequestDTO } from "../dtos/request/orcamentoPecaRequestDTO";
import { getOrcamentos, getOrcamento, createOrcamento, createVendaForOrcamento, addPecaToOrcamento, removePecaFromOrcamento, applyDescontoToOrcamento } from "../repositories/orcamentoRepository";

export function useOrcamentos() {
    const { data, isLoading, isError } = useQuery<AxiosResponse<OrcamentoResponseDTO[]>>({
        queryKey: ['orcamentos'],
        queryFn: getOrcamentos,
        retry: 2
    });

    return {
        orcamentosData: data?.data,
        orcamentosLoading: isLoading,
        orcamentosError: isError,
    };
}

export function useOrcamento(id: string) {
    const { data, isLoading, isError } = useQuery<AxiosResponse<OrcamentoDetailResponseDTO>>({
        queryKey: ['orcamento', id],
        queryFn: () => getOrcamento(BigInt(id)),
        retry: 2
    });

    return {
        orcamentoData: data?.data,
        orcamentoLoading: isLoading,
        orcamentoError: isError,
    };
}

export function useCreateOrcamento(): UseMutationResult<AxiosResponse<OrcamentoResponseDTO>, unknown, OrcamentoRequestDTO> {
    return useMutation<AxiosResponse<OrcamentoResponseDTO>, unknown, OrcamentoRequestDTO>({
        mutationFn: createOrcamento,
    });
}

export function useCreateVendaForOrcamento(): UseMutationResult<AxiosResponse<VendaResponseDTO>, unknown, {id: string}> {
    return useMutation<AxiosResponse<VendaResponseDTO>, unknown, {id: string }>({
        mutationFn: ({id}) => createVendaForOrcamento (BigInt(id)),
    });
}

export function useAddPecaToOrcamento() {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<OrcamentoDetailResponseDTO>, unknown, { id: string, orcamentoPecaRequestDTO: OrcamentoPecaRequestDTO, valorPeca: number }>({
        mutationFn: ({ id, orcamentoPecaRequestDTO }) => addPecaToOrcamento(BigInt(id), orcamentoPecaRequestDTO),
        onMutate: async ({ id, orcamentoPecaRequestDTO, valorPeca }) => {
            // Cancel any ongoing queries for the orcamento
            await queryClient.cancelQueries({ queryKey: ['orcamento', id] });

            // Snapshot the previous value
            const previousData = queryClient.getQueryData<AxiosResponse<OrcamentoDetailResponseDTO>>(['orcamento', id]);

            // Optimistically update the orcamento data
            if (previousData) {
                const updatedOrcamento = {
                    ...previousData.data,
                    pecas: [...previousData.data.pecas, orcamentoPecaRequestDTO],
                    valor: previousData.data.valor + (orcamentoPecaRequestDTO.quantidade * valorPeca),
                    valorTotal: (previousData.data.valor + (orcamentoPecaRequestDTO.quantidade * valorPeca)) - (((previousData.data.valor + (orcamentoPecaRequestDTO.quantidade * valorPeca)) * previousData.data.percentualDesconto) / 100),
                };

                queryClient.setQueryData(['orcamento', id], updatedOrcamento);
            }

            return { previousData };
        },
        onError: (error, variables, context) => {
            const { previousData } = context as { previousData: AxiosResponse<OrcamentoDetailResponseDTO> };
            if (previousData) {
                queryClient.setQueryData(['orcamento', variables.id], previousData);
            }
        },
        onSuccess: (data, variables) => {
            // Invalidate and refetch the orcamento query to ensure it's up to date
            queryClient.invalidateQueries({ queryKey: ['orcamento', variables.id] });
        },
    });
}

export function useRemovePecaFromOrcamento(): UseMutationResult<AxiosResponse<OrcamentoDetailResponseDTO>, unknown, { id: string, orcamentoPecaId: string }> {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<OrcamentoDetailResponseDTO>, unknown, { id: string, orcamentoPecaId: string }>({
        mutationFn: ({ id, orcamentoPecaId }) => removePecaFromOrcamento(BigInt(id), BigInt(orcamentoPecaId)),
        onMutate: async (variables) => {
            // Cancel any ongoing queries for the orcamento
            await queryClient.cancelQueries({ queryKey: ['orcamento', variables.id] });

            // Snapshot the previous value
            const previousData = queryClient.getQueryData<AxiosResponse<OrcamentoDetailResponseDTO>>(['orcamento', variables.id]);

            // Optimistically update the orcamento data
            if (previousData) {
                const updatedOrcamento = {
                    ...previousData.data,
                    pecas: previousData.data.pecas.filter(peca => peca.id !== BigInt(variables.orcamentoPecaId)),
                    valor: previousData.data.valor - ((previousData.data.pecas.find(peca => peca.id.toString() === variables.orcamentoPecaId)?.quantidade ?? 0) * (previousData.data.pecas.find(peca => peca.id.toString() === variables.orcamentoPecaId)?.preco ?? 0)),
                    valorTotal: (previousData.data.valor - ((previousData.data.pecas.find(peca => peca.id.toString() === variables.orcamentoPecaId)?.quantidade ?? 0) * (previousData.data.pecas.find(peca => peca.id.toString() === variables.orcamentoPecaId)?.preco ?? 0))) - (((previousData.data.valor - ((previousData.data.pecas.find(peca => peca.id.toString() === variables.orcamentoPecaId)?.quantidade ?? 0) * (previousData.data.pecas.find(peca => peca.id.toString() === variables.orcamentoPecaId)?.preco ?? 0)))) * previousData.data.percentualDesconto) / 100,
                };

                queryClient.setQueryData(['orcamento', variables.id], updatedOrcamento);
            }

            return { previousData };
        },
        onError: (error, variables, context) => {
            const { previousData } = context as { previousData: AxiosResponse<OrcamentoDetailResponseDTO> };
            if (previousData) {
                queryClient.setQueryData(['orcamento', variables.id], previousData);
            }
        },
        onSuccess: (data, variables) => {
            // Invalidate and refetch the orcamento query to ensure it's up to date
            queryClient.invalidateQueries({ queryKey: ['orcamento', variables.id] });
        },
    });
}

export function useApplyDescontoToOrcamento(): UseMutationResult<AxiosResponse<OrcamentoDetailResponseDTO>, unknown, { id: string, descontoPercentual: number }> {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<OrcamentoDetailResponseDTO>, unknown, { id: string, descontoPercentual: number }>({
        mutationFn: ({ id, descontoPercentual }) => applyDescontoToOrcamento(BigInt(id), descontoPercentual),
        onMutate: async (variables) => {
            // Cancel any ongoing queries for the orcamento
            await queryClient.cancelQueries({ queryKey: ['orcamento', variables.id] });

            // Snapshot the previous value
            const previousData = queryClient.getQueryData<AxiosResponse<OrcamentoDetailResponseDTO>>(['orcamento', variables.id]);

            // Optimistically update the orcamento data
            if (previousData) {
                const updatedOrcamento = {
                    ...previousData.data,
                    percentualDesconto: variables.descontoPercentual,
                    valorTotal: previousData.data.valor - (previousData.data.valor * variables.descontoPercentual) / 100,
                };

                queryClient.setQueryData(['orcamento', variables.id], updatedOrcamento);
            }

            return { previousData };
        },
        onError: (error, variables, context) => {
            const { previousData } = context as { previousData: AxiosResponse<OrcamentoDetailResponseDTO> };
            if (previousData) {
                queryClient.setQueryData(['orcamento', variables.id], previousData);
            }
        },
        onSuccess: (data, variables) => {
            // Invalidate and refetch the orcamento query to ensure it's up to date
            queryClient.invalidateQueries({ queryKey: ['orcamento', variables.id] });
        },
    });
}
