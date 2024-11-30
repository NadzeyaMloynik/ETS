import axios from "axios";

class AssignmentService {
    static BASE_URL = "http://localhost:1010";
    
    static async getAssignmentById(id, token) {
        try {
            const response = await axios.get(`${AssignmentService.BASE_URL}/hruser/assignment/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getAllAssignmentsFromUser(fromUserId, token) {
        try {
            const response = await axios.get(`${AssignmentService.BASE_URL}/hruser/from/${fromUserId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getAllAssignmentsToUser(toUserId, token) {
        try {
            const response = await axios.get(`${AssignmentService.BASE_URL}/hruser/to/${toUserId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getPaginatedAssignmentsFromUser(fromUserId, pageNo, token, count) {
        try {
            const response = await axios.get(`${AssignmentService.BASE_URL}/hruser/from/${fromUserId}/pagination`, {
                params: { pageNo,
                    count
                 },
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getPaginatedAssignmentsToUser(toUserId, pageNo, token, count) {
        try {
            const response = await axios.get(`${AssignmentService.BASE_URL}/hruser/to/${toUserId}/pagination`, {
                params: { pageNo,
                    count
                 },
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async createAssignment(fromUserId, toUserId, payload, token) {
        try {
            const response = await axios.post(`${AssignmentService.BASE_URL}/hr/assignment/from/${fromUserId}/to/${toUserId}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async updateCloseDateAssignment(id, payload, token) {
        try {
            const response = await axios.put(`${AssignmentService.BASE_URL}/hr/assignment/${id}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.status;
        } catch (err) {
            throw err;
        }
    }

    static async deleteAssignment(id, token) {
        try {
            const response = await axios.delete(`${AssignmentService.BASE_URL}/hr/assignment/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.status;
        } catch (err) {
            throw err;
        }
    }

    static async getAssignmentsByDateRange(startDate, endDate, pageNo, token, id) {
        try {
            const response = await axios.get(`${AssignmentService.BASE_URL}/hr/assignments/by-date-range/${id}`, {
                params: { startDate, endDate, pageNo },
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getOpenAssignments(pageNo, token, id) {
        try {
            const response = await axios.get(`${AssignmentService.BASE_URL}/hr/open-assignments/${id}`, {
                params: { pageNo },
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default AssignmentService;
