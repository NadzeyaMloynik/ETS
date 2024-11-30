import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import TestService from '../service/TestService';

const CreateTestModal = ({ show, onHide, token, onTestCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
  
    const handleSubmit = async () => {
      setError(null);
      const payload = { title, description };
  
      try {
        if (title.length < 3 || title.length > 50) {
          throw new Error('Заголовок должен содержать от 3 до 50 символов');
        }
        if (description.length > 1000) {
          throw new Error('Описание не должно превышать 1000 символов');
        }
  
        await TestService.addTest(payload, token);
        setTitle('');
        setDescription('');
        onHide();
        onTestCreated();
      } catch (err) {
        setError(err.message || 'Не удалось создать тест');
      }
    };
  
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header>
          <Modal.Title>Создать новый тест</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Заголовок</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите заголовок теста"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
  
            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Введите описание (необязательно)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </Form.Group>
  
            {error && <p className="text-danger mt-3">{error}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Отмена
          </Button>
          <Button variant="secondary" onClick={handleSubmit}>
            Создать
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  

export default CreateTestModal;
