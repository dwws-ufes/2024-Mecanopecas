import api from "../repositories/axiosClient.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticate, setAuthToken, logout } from "../repositories/authenticationRepository.ts";

export const useAuthenticate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authenticate,
        onSuccess: async (data) => {
            (function() {
                var token = JSON.stringify(localStorage.getItem('jwtToken'));
                if (token) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } else {
                    api.defaults.headers.common['Authorization'] = null;
                    /*if setting null does not remove `Authorization` header then try
                      delete axios.defaults.headers.common['Authorization'];
                    */
                }
            })();
            // setAuthToken(JSON.stringify(data));
            // setAuthToken(data);
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