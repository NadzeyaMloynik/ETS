import axios from "axios";

class FeedbackService {
    static BASE_URL = "http://localhost:1010";

    static async createFeedback(assignmentDetailId, payload, token) {
        try{
            await axios.post(`${FeedbackService.BASE_URL}/hr/feedback/${assignmentDetailId}`,
            payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            throw err;
        }
    }

    static async getFeedback(assignmentDetailId, token){
        try{
            await axios.put(`${FeedbackService.BASE_URL}/hruser/feedback/${assignmentDetailId}`,{
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            throw err;
        }
    }
}

export default FeedbackService;
