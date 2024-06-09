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

export async function createOrcamento(orcamentoRequestDTO: OrcamentoRequestDTO): AxiosPromise<OrcamentoResponseDTO> {
    return await api.post('/orcamentos', orcamentoRequestDTO);
}

export async function createVendaForOrcamento(id: number): AxiosPromise<VendaResponseDTO> {
    return await api.post(`/orcamentos/${id}/venda`);
}

export async function addPecaToOrcamento(id: number, orcamentoPecaRequestDTO: OrcamentoPecaRequestDTO): AxiosPromise<OrcamentoDetailResponseDTO> {
    return await api.post(`/orcamentos/${id}/pecas`, orcamentoPecaRequestDTO);
}

export async function removePecaFromOrcamento(id: number, orcamentoPecaId: number): AxiosPromise<OrcamentoDetailResponseDTO> {
    return await api.delete(`/orcamentos/${id}/pecas/${orcamentoPecaId}`);
}

export async function applyDescontoToOrcamento(id: number, descontoPercentual: number): AxiosPromise<OrcamentoDetailResponseDTO> {
    return await api.put(`/orcamentos/${id}/desconto`, { descontoPercentual });
}
