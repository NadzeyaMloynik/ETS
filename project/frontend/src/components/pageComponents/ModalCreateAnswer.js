import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AnswerService from "../service/AnswerService";

const ModalCreateAnswer = ({ show, onHide, questionId, onCreate, onImageCreate }) => {
  const [text, setText] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [points, setPoints] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handlePointsChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 100) {
      setPoints(value);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (text != null || imageFile != null) {
        const createdAnswer = await AnswerService.createAnswer(
          questionId,
          { text, isCorrect, points },
          imageFile,
          token
        );
        
        if (imageFile) {
          const imagePreview = URL.createObjectURL(imageFile);
          onImageCreate(createdAnswer.id, imagePreview);
        }
  
        onCreate();
        onHide();
        setText("");
        setIsCorrect(false);
        setPoints(0);
      } else {
        alert("Заполните текстовое поле или выберите картинку");
      }
    } catch (error) {
      console.error("Error creating answer:", error);
    }
  };
  
  const handleClose = async () => {
    onHide();
    setText("");
    setIsCorrect(false);
    setImageFile(null);
    setImagePreview(null);
    setPoints(0);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const filePreview = URL.createObjectURL(file);
      setImagePreview(filePreview);
    }
  };

  const handleIsCorrectChange = (e) => {
    const checked = e.target.checked;
    setIsCorrect(checked);

    if (!checked) {
      setPoints(0);
    } else {
      setPoints(1);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>Добавить ответ</Modal.Title>
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
        <Button variant="secondary" onClick={handleSave}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateAnswer;
