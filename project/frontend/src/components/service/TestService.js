import axios from "axios";

class TestService{
    static BASE_URL = "http://localhost:1010"

    static async searchTests(pageNo, keyword, token){
        try{
            const response = await axios.get(`${TestService.BASE_URL}/hruser/test`, 
            {
                headers: {Authorization: `Bearer ${token}`},
                params:{
                    pageNo: pageNo,
                    keyword: keyword
                }
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
}

export default TestService;