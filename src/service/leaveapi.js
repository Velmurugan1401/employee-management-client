import apiClient from "./axiosConfig";


const LeaveApi = {
    getleaves: () => apiClient.get('/leave/getdetails'),
    getSummary: () => apiClient.get('/leave/getSummary'),
    getLeaveById: (id) => apiClient.get(`/leave/getbyId/${id}`),
    createLeave: (leaveData) => apiClient.post('/leave/create', leaveData),
};

export default LeaveApi;