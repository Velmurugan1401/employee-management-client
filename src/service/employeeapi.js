import apiClient from "./axiosConfig";


const EmployeeApi = {
    getemployee: () => apiClient.get('/employee/get')
};

export default EmployeeApi;