import api from './axiosClient';
import { AxiosPromise } from "axios";
import { PecaResponseDTO } from "../dtos/response/pecaResponseDTO";
import { PecaRequestDTO } from "../dtos/request/pecaRequestDTO";

export function getPecas(): AxiosPromise<PecaResponseDTO[]> {
    return api.get('/api/pecas');
}

export function getPecasAtivas(): AxiosPromise<PecaResponseDTO[]> {
    return api.get('/api/pecas/ativas');
}

export function getPeca(id: bigint): AxiosPromise<PecaResponseDTO> {
    return api.get(`/api/pecas/${id}`);
}

export function createPeca(pecaRequestDTO: PecaRequestDTO): AxiosPromise<PecaResponseDTO> {
    return api.post('/api/pecas', pecaRequestDTO);
}

export function updatePeca(id: bigint, pecaRequestDTO: PecaRequestDTO): AxiosPromise<PecaResponseDTO> {
    return api.put(`/api/pecas/${id}`, pecaRequestDTO);
}

export function deletePeca(id: bigint): AxiosPromise<void> {
    return api.delete(`/api/pecas/${id}`);
}
