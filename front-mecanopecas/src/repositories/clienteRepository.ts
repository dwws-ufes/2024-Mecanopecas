import api from './axiosClient.ts';
import { AxiosPromise } from "axios";
import { ClienteResponseDTO } from "../dtos/response/clienteResponseDTO.ts";
import { ClienteRequestDTO } from "../dtos/request/clienteRequestDTO.ts";

export async function getAllClientes(): AxiosPromise<ClienteResponseDTO[]> {
    return await api.get('/api/clientes');
}

export async function getAllClientesAtivos(): AxiosPromise<ClienteResponseDTO[]> {
    return await api.get('/api/clientes/ativos');
}

export async function getCliente(id: bigint): AxiosPromise<ClienteResponseDTO> {
    return await api.get(`/api/clientes/${id}`);
}

export async function createCliente(clienteRequestDTO: ClienteRequestDTO): AxiosPromise<ClienteResponseDTO> {
    return await api.post('/api/clientes', clienteRequestDTO);
}

export async function updateCliente(id: bigint, clienteRequestDTO: ClienteRequestDTO): AxiosPromise<ClienteResponseDTO> {
    return await api.put(`/api/clientes/${id}`, clienteRequestDTO);
}

export async function deleteCliente(id: bigint): AxiosPromise<void> {
    return await api.delete(`/api/clientes/${id}`);
}