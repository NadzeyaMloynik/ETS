import axios from "axios";

class AnswerService {
  static BASE_URL = "http://localhost:1010";

  static async createAnswer(questionId, payload, imageFile, token) {
    const formData = new FormData();
    formData.append("payload", JSON.stringify(payload));
    if (imageFile) {
      formData.append("image", imageFile);
    }
    try {
      const response = await axios.post(
        `${AnswerService.BASE_URL}/hr/answer/${questionId}`,
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

  static async updateAnswer(id, payload, imageFile, token) {
    try {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const response = await axios.put(
        `${AnswerService.BASE_URL}/hr/answer/${id}`,
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

  static async deleteAnswer(id, token) {
    try {
      const response = await axios.delete(
        `${AnswerService.BASE_URL}/hr/answer/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.status;
    } catch (err) {
      throw err;
    }
  }

  static async findAllAnswers(questionId, token) {
    try {
      const response = await axios.get(
        `${AnswerService.BASE_URL}/hruser/answer-all/${questionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async findAnswerById(id, token) {
    try {
      const response = await axios.get(
        `${AnswerService.BASE_URL}/hruser/answer/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getAnswerImage(id, token) {
    try {
      const response = await axios.get(
        `${AnswerService.BASE_URL}/hruser/answer/${id}/image`,
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

  static async uploadAnswerImage(id, imageFile, token) {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.put(
        `${AnswerService.BASE_URL}/hr/answer/${id}/image`,
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
}

export default AnswerService;
