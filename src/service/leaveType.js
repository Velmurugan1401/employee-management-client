import apiClient from "./config";


const LeaveType = {
    getTypes: () => apiClient.get('/type/get'),
};

export default LeaveType;