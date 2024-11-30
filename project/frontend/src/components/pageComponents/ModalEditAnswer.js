import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AnswerService from "../service/AnswerService";

const ModalEditAnswer = ({
  show,
  onHide,
  answerId,
  onUpdate,
  onImageUpdate,
}) => {
  const [text, setText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [points, setPoints] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [error, setError] = useState("");

  const fetchAnswerData = async () => {
    if (answerId) {
      try {
        const token = localStorage.getItem("token");
        const answerData = await AnswerService.findAnswerById(answerId, token);
        setText(answerData.text);
        setIsCorrect(answerData.isCorrect);
        setPoints(answerData.points);
        if (answerData.image) {
          const imageBlob = await AnswerService.getAnswerImage(answerId, token);
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageFile(imageUrl);
        } else {
          setImageFile(null);
        }
      } catch (error) {
        console.error("Error fetching answer data:", error);
      }
    }
  };

  useEffect(() => {
    if (show) {
      fetchAnswerData();
    }
  }, [answerId, show]);

  const handleSave = async () => {
    try {
      if (text.trim() === "") {
        setError("Вопрос не может быть пустым.");
        return;
      }
      const token = localStorage.getItem("token");
      await AnswerService.updateAnswer(
        answerId,
        { text, isCorrect, points },
        newImageFile,
        token
      );
      if (newImageFile) {
        onImageUpdate(answerId, URL.createObjectURL(newImageFile));
      } else {
        onImageUpdate(answerId, null);
      }
      onUpdate();
      onHide();
      setImageFile(null);
      setNewImageFile(null);
    } catch (error) {
      setError("Ошибка при обновлении ответа.");
      console.error("Error updating answer:", error);
    }
  };

  const handlePointsChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 100) {
      setPoints(value);
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

  const handleIsCorrectChange = (e) => {
    const checked = e.target.checked;
    setIsCorrect(checked);

    if (!checked) {
      setPoints(0);
    } else {
      setPoints(1)
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>Редактировать ответ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAnswerText">
            <Form.Label>Текст ответа</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Введите текст ответа"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formAnswerCorrect">
            <Form.Check
              type="checkbox"
              label="Правильный ответ"
              checked={isCorrect}
              onChange={handleIsCorrectChange}
            />
          </Form.Group>
          {isCorrect ? (
            <Form.Group controlId="formAnswerPoints">
              <Form.Label>Баллы (1-10)</Form.Label>
              <Form.Control
                type="number"
                value={points}
                onChange={handlePointsChange}
                min="1"
                max="10"
                placeholder="Введите количество баллов"
              />
            </Form.Group>
          ) : (
            <></>
          )}
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
        <Button variant="secondary" onClick={handleSave}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditAnswer;
