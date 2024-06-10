import api from "../repositories/axiosClient.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticate, setAuthToken, logout } from "../repositories/authenticationRepository.ts";

export const useAuthenticate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authenticate,
        onSuccess: async (data) => {
            (function() {
                api.defaults.headers.common['Authorization'] = `Bearer ${data.toString()}`;
            })();
        }
    });
}

export const useLogout = () => {
    const queryClient = useQueryClient();

    return () => {
        logout();
        setAuthToken(null);
        queryClient.invalidateQueries('');
    };
};