import apiClient from "./axiosConfig";


const LeaveType = {
    getTypes: () => apiClient.get('/type/get'),
};

export default LeaveType;