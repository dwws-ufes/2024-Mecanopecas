import api from './axiosClient.ts';
import { AxiosPromise } from "axios";
import { AuthenticateRequestDTO } from "../dtos/request/authenticateRequestDTO.ts";

export async function authenticate(authenticateRequestDTO: AuthenticateRequestDTO): AxiosPromise<string> {
    return await api.post('/authenticate', authenticateRequestDTO);
}
