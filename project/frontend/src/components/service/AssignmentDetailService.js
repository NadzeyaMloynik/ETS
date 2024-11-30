import axios from "axios";

class AssignmentDetailService {
    static BASE_URL = "http://localhost:1010";

    static async passTestAssignmentDetail(assignmentId, answers, token){
        try{
            await axios.put(`${AssignmentDetailService.BASE_URL}/user/assignment-detail/${assignmentId}`,
            answers, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            throw err;
        }
    }

    static async createAssignmentDetail(assignmentId, testIds, token) {
        try {
            const response = await axios.post(`${AssignmentDetailService.BASE_URL}/hr/assignment-detail/${assignmentId}`, testIds, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteAssignmentDetail(id, token) {
        try {
            const response = await axios.delete(`${AssignmentDetailService.BASE_URL}/hr/assignment-detail/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.status;
        } catch (err) {
            throw err;
        }
    }

    static async getAssignmentDetail(id, token) {
        try {
            const response = await axios.get(`${AssignmentDetailService.BASE_URL}/hruser/assignment-detail/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getAllAssignmentDetails(assignmentId, token) {
        try {
            const response = await axios.get(`${AssignmentDetailService.BASE_URL}/hruser/assignment-detail-all/${assignmentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getPaginatedAssignmentDetails(assignmentId, pageNo, token) {
        try {
            const response = await axios.get(`${AssignmentDetailService.BASE_URL}/hruser/assignment-detail/${assignmentId}/pagination`, {
                params: { pageNo: pageNo },
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default AssignmentDetailService;
