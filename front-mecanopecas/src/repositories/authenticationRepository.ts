import api from './axiosClient.ts';
import { removeAuthTokenFromAxiosClient } from './axiosClient.ts';
import { AxiosPromise } from "axios";
import { AuthenticateRequestDTO } from "../dtos/request/authenticateRequestDTO.ts";

export async function login(authenticateRequestDTO: AuthenticateRequestDTO): AxiosPromise<string> {
    removeAuthTokenFromAxiosClient();
    return await api.post('/api/authentication/login', authenticateRequestDTO);
}