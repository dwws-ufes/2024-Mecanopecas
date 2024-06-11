import { useMutation } from "@tanstack/react-query";
import { login } from "../repositories/authenticationRepository.ts";
import { setTokenOnLocalStorage, setRoleOnLocalStorage, removeTokenFromLocalStorage, removeRoleFromLocalStorage } from "../helpers/localStorage.ts";
import { setAuthTokenOnAxiosClient, removeAuthTokenFromAxiosClient } from "../repositories/axiosClient.ts";
import { decodeJWT } from "../helpers/jwtToken.ts";

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        onSuccess: async ({ data }) => {
            (function() {
                setTokenOnLocalStorage(data);
                setAuthTokenOnAxiosClient(data);

                const decodedToken = decodeJWT(data);
                if (decodedToken) {
                    setRoleOnLocalStorage(decodedToken.role);
                }
            })();
        }
    });
}

export const useLogout = () => {
    removeTokenFromLocalStorage();
    removeRoleFromLocalStorage();
    removeAuthTokenFromAxiosClient();
};