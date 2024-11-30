import axios from "axios";

class NotificationService {
    static BASE_URL = "http://localhost:1010";
    
    static async createNotification(userId, payload, token) {
        try {
            await axios.post(`${NotificationService.BASE_URL}/hr/notification/${userId}`, 
            payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            throw err;
        }
    }
    
    static async readNotification(notificationId, token) {
        try {
            await axios.put(`${NotificationService.BASE_URL}/hruser/notification/${notificationId}`, null, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            throw err;
        }
    }
    
    static async deleteNotification(notificationId, token) {
        try {
            await axios.delete(`${NotificationService.BASE_URL}/hr/notification/${notificationId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            throw err;
        }
    }
    
    static async findAllNotifications(userId, token) {
        try {
            const response = await axios.get(`${NotificationService.BASE_URL}/hruser/notification/${userId}/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    
    static async findNotificationById(notificationId, token) {
        try {
            const response = await axios.get(`${NotificationService.BASE_URL}/hruser/notification/${notificationId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    
    static async paginationNotification(userId, pageNo, token) {
        try {
            const response = await axios.get(`${NotificationService.BASE_URL}/hruser/notification/${userId}/pagination`, {
                params: { pageNo },
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default NotificationService;
