import api from './axiosClient';
import { AxiosPromise } from "axios";
import { VendedorResponseDTO } from "../dtos/response/vendedorResponseDTO";
import { VendedorRequestDTO } from "../dtos/request/vendedorRequestDTO";

export function getVendedores(): AxiosPromise<VendedorResponseDTO[]> {
    return api.get('/api/vendedores');
}

export function getVendedoresAtivos(): AxiosPromise<VendedorResponseDTO[]> {
    return api.get('/api/vendedores/ativos');
}

export function getVendedor(id: number): AxiosPromise<VendedorResponseDTO> {
    return api.get(`/api/vendedores/${id}`);
}

export function createVendedor(vendedorRequestDTO: VendedorRequestDTO): AxiosPromise<VendedorResponseDTO> {
    return api.post('/api/vendedores', vendedorRequestDTO);
}

export function updateVendedor(id: number, vendedorRequestDTO: VendedorRequestDTO): AxiosPromise<VendedorResponseDTO> {
    return api.put(`/api/vendedores/${id}`, vendedorRequestDTO);
}

export function deleteVendedor(id: number): AxiosPromise<void> {
    return api.delete(`/api/vendedores/${id}`);
}
