import apiClient from "./axiosConfig";


const AuthApi = {
    login: (data) => apiClient.post('/login',data),
};

export default AuthApi;