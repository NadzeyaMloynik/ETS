import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import QuestionService from "../service/QuestionService";

const ModalCreateQuestion = ({ show, testId, onHide, onCreate, onImageCreate }) => {
  const [questionText, setQuestionText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const handleClose = async () => {
    onHide();
    setError(null);
    setQuestionText("");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleCreate = async () => {
    if (questionText.trim() === "") {
      setError("Вопрос не может быть пустым.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const payload = { question: questionText };
      const createdQuestion = await QuestionService.addQuestion(
        testId,
        payload,
        imageFile ? imageFile : null,
        token
      );
  
      if (imageFile) {
        const filePreview = URL.createObjectURL(imageFile);
        onImageCreate(createdQuestion.id, filePreview);
      }
  
      onCreate();
      onHide();
      setQuestionText("");
      setImageFile(null);
      setImagePreview(null);
      setError(null);
    } catch (err) {
      setError("Ошибка при создании вопроса.");
      console.error("Error creating question:", err);
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const filePreview = URL.createObjectURL(file);
      setImagePreview(filePreview);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton={false}>
        <Modal.Title>Создать новый вопрос</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Вопрос</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              maxLength="1000"
              isInvalid={error}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mt-3">
            <div className="d-flex justify-content-center mt-2">
              <Button
                variant="secondary"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                Выбрать изображение
              </Button>
              <Form.Control
                id="imageUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            {imagePreview && (
              <div className="mt-3 d-flex justify-content-center">
                <img
                  src={imagePreview}
                  alt="Предпросмотр"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="secondary" onClick={handleCreate}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateQuestion;
