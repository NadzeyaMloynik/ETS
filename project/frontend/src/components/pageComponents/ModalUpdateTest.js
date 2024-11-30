import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import TestService from "../service/TestService";

const ModalUpdateTest = ({ show, onHide, test, onUpdate }) => {
  const [error, setError] = useState("");
  const [description, setDescription] = useState(null)
  const [testName, setTestName] = useState(null)

  useEffect(() => {
    if (show && test) {
        console.log(test)
      setTestName(test.name || "");
      setDescription(test.description || "");
      setError(""); 
    }
  }, [show, test]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if(testName.trim() === "" ){
        setError("Название не может быть пустым.");
        return;
      }
      const responce = await TestService.updateTest(test.id, {
        title: testName,
        description: description
      }, token)
      console.log(responce)
      onUpdate(responce);
      onHide();
    } catch (error) {
      setError("Ошибка при обновлении ответа.");
      console.error("Error updating answer:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>Редактировать ответ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group controlId="formTestName">
            <Form.Label>Название теста</Form.Label>
            <Form.Control
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
        <Form.Group controlId="formTestDescription">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default ModalUpdateTest;
