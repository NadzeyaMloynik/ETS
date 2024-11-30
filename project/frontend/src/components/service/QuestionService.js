import axios from "axios";

class QuestionService {
  static BASE_URL = "http://localhost:1010";

  static async getQuestionById(id, token) {
    try {
      const response = await axios.get(
        `${QuestionService.BASE_URL}/hruser/question/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getAllQuestionsForTest(testId, token) {
    try {
      const response = await axios.get(
        `${QuestionService.BASE_URL}/hruser/question/${testId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getPaginatedQuestions(testId, pageNo, count,token) {
    try {
      const response = await axios.get(
        `${QuestionService.BASE_URL}/hruser/question/${testId}/pages`,
        {
          params: { pageNo: pageNo,
            count: count
           },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async addQuestion(testId, payload, imageFile, token) {
    try {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.post(
        `${QuestionService.BASE_URL}/hr/question/${testId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateQuestion(id, payload, imageFile, token) {
    try {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.patch(
        `${QuestionService.BASE_URL}/hr/question/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.status;
    } catch (err) {
      throw err;
    }
    
  }

  static async deleteQuestion(id, token) {
    try {
      const response = await axios.delete(
        `${QuestionService.BASE_URL}/hr/question/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.status;
    } catch (err) {
      throw err;
    }
  }

  static async getQuestionImage(id, token) {
    try {
      const response = await axios.get(
        `${QuestionService.BASE_URL}/hruser/question/${id}/image`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default QuestionService;
