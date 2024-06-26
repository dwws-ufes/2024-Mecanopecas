import api from './axiosClient';
import { AxiosPromise } from "axios";
import { GerenteResponseDTO } from "../dtos/response/gerenteResponseDTO";
import { GerenteRequestDTO } from "../dtos/request/gerenteRequestDTO";

export function getGerentes(): AxiosPromise<GerenteResponseDTO[]> {
    return api.get('/api/gerentes');
}

export function getGerente(id: bigint): AxiosPromise<GerenteResponseDTO> {
    return api.get(`/api/gerentes/${id}`);
}

export function createGerente(vendedorId: bigint, gerenteRequestDTO: GerenteRequestDTO): AxiosPromise<GerenteResponseDTO> {
    return api.post(`/api/gerentes/${vendedorId}`, gerenteRequestDTO);
}

export function updateGerente(id: bigint, gerenteRequestDTO: GerenteRequestDTO): AxiosPromise<GerenteResponseDTO> {
    return api.put(`/api/gerentes/${id}`, gerenteRequestDTO);
}

export function deleteGerente(id: bigint): AxiosPromise<void> {
    return api.delete(`/api/gerentes/${id}`);
}
