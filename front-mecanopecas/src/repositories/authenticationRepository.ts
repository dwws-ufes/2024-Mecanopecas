import api from './axiosClient.ts';
import axios, { AxiosPromise } from "axios";
import { AuthenticateRequestDTO } from "../dtos/request/authenticateRequestDTO.ts";

export async function authenticate(authenticateRequestDTO: AuthenticateRequestDTO): AxiosPromise<string> {
    const response = await api.post('/authenticate', authenticateRequestDTO);
    localStorage.setItem('jwtToken', JSON.stringify(response.data));
    // localStorage.setItem('jwtToken', response.data);
    return response.data;
}

export const logout = () => {
    localStorage.removeItem('jwtToken');
    setAuthToken(null);
};

export const setAuthToken = (token) => {
    console.log("Momento importante: " + token)
    console.log("Tipo: " + typeof token)
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};