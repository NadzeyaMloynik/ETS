import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:1010"

    static async login(email, password){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {email, password})
            return response.data;

        }catch(err){
            throw err;
        }
    }

    static async register(userData, token){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserImage(userId, token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/${userId}/photo`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'arraybuffer' 
            }); 

            const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
    
            return imageUrl;
        } catch (err) {
            throw err;
        }
    }
    

    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async updateUser(userId, userData, token){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async updateUserPhoto(userId, photoFile, token) {
        try {
            const formData = new FormData();
            formData.append("photoFile", photoFile);
    
            console.log(token)

            const response = await axios.put(`${UserService.BASE_URL}/adminuser/${userId}/upload-photo`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static isHR(){
        const role = localStorage.getItem('role')
        return role === 'HR'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default UserService;