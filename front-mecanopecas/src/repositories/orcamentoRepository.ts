import api from './axiosClient.ts';
import { AxiosPromise } from "axios";
import { OrcamentoResponseDTO } from "../dtos/response/orcamentoResponseDTO.ts";
import { OrcamentoRequestDTO } from "../dtos/request/orcamentoRequestDTO.ts";
import { OrcamentoDetailResponseDTO } from "../dtos/response/orcamentoDetailResponseDTO.ts";
import { VendaResponseDTO } from "../dtos/response/vendaResponseDTO.ts";
import { OrcamentoPecaRequestDTO } from "../dtos/request/orcamentoPecaRequestDTO.ts";

export function getOrcamentos(): AxiosPromise<OrcamentoResponseDTO[]> {
    return api.get('/orcamentos');
}

export async function getOrcamento(id: bigint): AxiosPromise<OrcamentoDetailResponseDTO> {
    return await api.post(`/orcamentos/${id}`);
}

export async function createOrcamento(orcamentoRequestDTO: OrcamentoRequestDTO): AxiosPromise<OrcamentoResponseDTO> {
    return await api.post('/orcamentos', orcamentoRequestDTO);
}

export async function createVendaForOrcamento(id: bigint): AxiosPromise<VendaResponseDTO> {
    return await api.post(`/orcamentos/${id}/venda`);
}

export async function addPecaToOrcamento(id: bigint, orcamentoPecaRequestDTO: OrcamentoPecaRequestDTO): AxiosPromise<OrcamentoDetailResponseDTO> {
    return await api.post(`/orcamentos/${id}/pecas`, orcamentoPecaRequestDTO);
}

export async function removePecaFromOrcamento(id: bigint, orcamentoPecaId: bigint): AxiosPromise<OrcamentoDetailResponseDTO> {
    return await api.delete(`/orcamentos/${id}/pecas/${orcamentoPecaId}`);
}

export async function applyDescontoToOrcamento(id: bigint, descontoPercentual: bigint): AxiosPromise<OrcamentoDetailResponseDTO> {
    return await api.put(`/orcamentos/${id}/desconto`, { descontoPercentual });
}
