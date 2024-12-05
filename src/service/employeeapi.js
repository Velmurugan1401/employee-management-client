import apiClient from "./config";


const EmployeeApi = {
    getemployee: () => apiClient.get('/employee/get')
};

export default EmployeeApi;