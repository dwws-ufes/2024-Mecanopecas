import api from './axiosClient.ts';
import { AxiosPromise } from "axios";
import { OrcamentoResponseDTO } from "../dtos/response/orcamentoResponseDTO.ts";
import { OrcamentoRequestDTO } from "../dtos/request/orcamentoRequestDTO.ts";
import { OrcamentoDetailResponseDTO } from "../dtos/response/orcamentoDetailResponseDTO.ts";
import { VendaResponseDTO } from "../dtos/response/vendaResponseDTO.ts";
import { OrcamentoPecaRequestDTO } from "../dtos/request/orcamentoPecaRequestDTO.ts";

export function getOrcamentos(): AxiosPromise<OrcamentoResponseDTO[]> {
    return api.get('/api/orcamentos');
}

export async function getOrcamento(id: bigint): AxiosPromise<OrcamentoDetailResponseDTO> {
    return await api.post(`/api/orcamentos/${id}`);
}

export async function createOrcamento(orcamentoRequestDTO: OrcamentoRequestDTO): AxiosPromise<OrcamentoResponseDTO> {
    return await api.post('/api/orcamentos', orcamentoRequestDTO);
}

export async function createVendaForOrcamento(id: bigint): AxiosPromise<VendaResponseDTO> {
    return await api.post(`/api/orcamentos/${id}/venda`);
}

export async function addPecaToOrcamento(id: bigint, orcamentoPecaRequestDTO: OrcamentoPecaRequestDTO): AxiosPromise<OrcamentoDetailResponseDTO> {
    return await api.post(`/api/orcamentos/${id}/pecas`, orcamentoPecaRequestDTO);
}

export async function removePecaFromOrcamento(id: bigint, orcamentoPecaId: bigint): AxiosPromise<OrcamentoDetailResponseDTO> {
    return await api.delete(`/api/orcamentos/${id}/pecas/${orcamentoPecaId}`);
}

export async function applyDescontoToOrcamento(id: bigint, descontoPercentual: bigint): AxiosPromise<OrcamentoDetailResponseDTO> {
    return await api.put(`/api/orcamentos/${id}/desconto`, { descontoPercentual });
}
