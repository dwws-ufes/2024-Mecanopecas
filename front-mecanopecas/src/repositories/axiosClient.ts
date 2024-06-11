import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
});

export const setAuthTokenOnAxiosClient = (token: string) => {
    if (token) {
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
};

export const removeAuthTokenFromAxiosClient = () => {
    delete axiosClient.defaults.headers.common["Authorization"];
};

export default axiosClient;