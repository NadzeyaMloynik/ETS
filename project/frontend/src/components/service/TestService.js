import axios from "axios";

class TestService {
    static BASE_URL = "http://localhost:1010";

    static async searchTests(pageNo, keyword, token) {
        try {
            const response = await axios.get(`${TestService.BASE_URL}/hruser/test`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    pageNo: pageNo,
                    keyword: keyword
                }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getTestById(id, token) {
        try {
            const response = await axios.get(`${TestService.BASE_URL}/hruser/test/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async addTest(payload, token) {
        try {
            const response = await axios.post(`${TestService.BASE_URL}/hr/test`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteTest(id, token) {
        try {
            const response = await axios.delete(`${TestService.BASE_URL}/hr/test/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.status;
        } catch (err) {
            throw err;
        }
    }
    
    static async updateTest(id, payload, token) {
        try {
            const response = await axios.patch(`${TestService.BASE_URL}/hr/test/${id}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default TestService;
