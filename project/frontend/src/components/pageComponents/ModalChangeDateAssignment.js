import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AnswerService from "../service/AnswerService";
import AssignmentService from "../service/AssignmentService";

const ModalChangeDateAssignment = ({ show, onHide, assignment, onUpdate }) => {
  const [error, setError] = useState("");
  const [closeDate, setCloseDate] = useState(null);
  const [assignmentId, setAssignmentId] = useState(null)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    if (show) {
      if (assignment?.closeDate) {
        const formattedDate = new Date(assignment.closeDate)
          .toISOString()
          .split("T")[0];
        setCloseDate(formattedDate);
      }
    }
  }, [assignment, show]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        closeDate: closeDate,
      };

      console.log( assignment.id)
      await AssignmentService.updateCloseDateAssignment(
        assignment.id,
        payload,
        token
      );
      onUpdate();
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
          <Form.Group className="times">
            <div className="field-group">
              <Form.Label htmlFor="endDateInput">
                Изменить окончание задания
              </Form.Label>
              <Form.Control
                id="endDateInput"
                type="date"
                value={closeDate}
                onChange={(e) => setCloseDate(e.target.value)}
                min={minDate}
                required
              />
            </div>
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

export default ModalChangeDateAssignment;
