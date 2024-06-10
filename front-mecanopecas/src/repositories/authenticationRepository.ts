import api from './axiosClient.ts';
import { AxiosPromise } from "axios";
import { AuthenticateRequestDTO } from "../dtos/request/authenticateRequestDTO.ts";

export async function authenticate(authenticateRequestDTO: AuthenticateRequestDTO): AxiosPromise<string> {
    const response = await api.post('/authenticate', authenticateRequestDTO);
    // localStorage.setItem('jwtToken', JSON.stringify(response.data));
    localStorage.setItem('jwtToken', response.data);
    return response.data;
}

export const logout = () => {
    localStorage.removeItem('jwtToken');
    setAuthToken(null);
};

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token.toString()}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};