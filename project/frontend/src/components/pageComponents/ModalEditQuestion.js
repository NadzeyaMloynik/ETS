import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import QuestionService from "../service/QuestionService";

const ModalEditQuestion = ({
  show,
  onHide,
  questionId,
  onUpdate,
  onImageUpdate,
}) => {
  const [questionText, setQuestionText] = useState("");
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    if (questionId) {
      fetchQuestion();
    }
  }, [show]);

  const fetchQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await QuestionService.getQuestionById(questionId, token);
      setQuestionText(data.question);
      if (data.image) {
        const imageBlob = await QuestionService.getQuestionImage(
          questionId,
          token
        );
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageFile(imageUrl);
      } else {
        setImageFile(null);
      }
    } catch (err) {
      console.error("Error fetching question:", err);
    }
  };

  const handleUpdate = async () => {
    if (questionText.trim() === "") {
      setError("Вопрос не может быть пустым.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = { question: questionText };
      const status = await QuestionService.updateQuestion(
        questionId,
        payload,
        newImageFile ? newImageFile : imageFile,
        token
      );
      if (newImageFile) {
        onImageUpdate(questionId, URL.createObjectURL(newImageFile));
      }
      onUpdate();
      setQuestionText("");
      setNewImageFile(null);
      onHide();
    } catch (err) {
      setError("Ошибка при обновлении вопроса.");
      console.error("Error updating question:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      const filePreview = URL.createObjectURL(file);
      setImageFile(filePreview);
    }
  };

  const handleDeleteImage = () => {
    setImageFile(null);
    setNewImageFile(null);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton={false}>
        <Modal.Title>Изменить вопрос</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formQuestion">
            <Form.Label>Вопрос</Form.Label>
            <Form.Control
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              maxLength="1000"
              isInvalid={error}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>

          {imageFile && (
            <Form.Group className="mt-3">
              <div className="d-flex flex-column align-items-center">
                <img
                  src={imageFile}
                  alt="Изображение ответа"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
                <Button
                  variant="danger"
                  className="mt-2"
                  onClick={handleDeleteImage}
                >
                  Удалить изображение
                </Button>
              </div>
            </Form.Group>
          )}

          <Form.Group className="mt-3">
            <div className="d-flex justify-content-center">
              <Button
                variant="secondary"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                Выбрать новое изображение
              </Button>
            </div>
            <Form.Control
              id="imageUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="secondary" onClick={handleUpdate}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditQuestion;
