import React, { useState, useEffect } from "react";
import {
  Button,
  ListGroup,
  Collapse,
  Card,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import AssignmentService from "../service/AssignmentService";
import WaitingComponent from "../common/WaitingComponent";
import ModalChangeDateAssignment from "../pageComponents/ModalChangeDateAssignment";
import { Link } from "react-router-dom";
import { TEST_RESULTS } from "../../utils/consts";

function UsersAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortByOpen, setSortByOpen] = useState(false);

  const pageSize = 3;

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (startDate && endDate) {
        const data = await AssignmentService.getAssignmentsByDateRange(
          startDate,
          endDate,
          pageNo,
          token,
          id
        );
        setAssignments(data.content);
        setTotalPages(data.totalPages);
      } else if (sortByOpen) {
        const data = await AssignmentService.getOpenAssignments(
          pageNo,
          token,
          id
        );
        setAssignments(data.content);
        setTotalPages(data.totalPages);
      } else {
        const data = await AssignmentService.getPaginatedAssignmentsFromUser(
          id,
          pageNo,
          token,
          pageSize
        );
        setAssignments(data.content);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Ошибка при загрузке заданий:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [pageNo, startDate, endDate, sortByOpen]);

  const handleAssignmentClick = (assignment) => {
    if (selectedAssignment?.id === assignment.id) {
      setSelectedAssignment(null);
    } else {
      setSelectedAssignment(assignment);
    }
  };

  const handlePageChange = (newPageNo) => {
    if (newPageNo >= 0 && newPageNo < totalPages) {
      setPageNo(newPageNo);
    }
  };

  const handleResults = async (testId) => {
    localStorage.setItem("curTestForResult", testId);
  };

  const handleDeleteAssignment = async (assignmentId) => {
    const token = localStorage.getItem("token");
    console.log(assignmentId);

    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить это задание?"
    );

    if (confirmDelete) {
      try {
        await AssignmentService.deleteAssignment(assignmentId, token);
        alert("Задание удалено успешно");

        const data = await AssignmentService.getPaginatedAssignmentsFromUser(
          localStorage.getItem("id"),
          pageNo,
          token,
          pageSize
        );

        if (data.content.length === 0 && pageNo > 0) {
          setPageNo(pageNo - 1);
        } else {
          fetchAssignments();
        }
      } catch (error) {
        console.error("Ошибка при удалении задания:", error);
        alert("Не удалось удалить задание. Попробуйте снова.");
      }
    }
  };

  const handleShowModal = (assignment) => {
    setSelectedAssignment(assignment);
    setTimeout(() => {
      setShowModal(true);
    }, 0);
  };

  return (
    <div className="users-for-assignment">
      <h3>Список выданных заданий</h3>

      <Form className="mb-3">
        <Row>
          <Col md={5} sm={5}>
            <Form.Group>
              <Form.Label>Дата начала</Form.Label>
              <Form.Control
                className="date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={5} sm={5}>
            <Form.Group>
              <Form.Label>Дата окончания</Form.Label>
              <Form.Control
                className="date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2} sm={2}>
            <Form.Group className="open-assignments">
              <Form.Label>Доступные</Form.Label>
              <Form.Check
                type="checkbox"
                className="custom-checkbox"
                checked={sortByOpen}
                onChange={(e) => setSortByOpen(e.target.checked)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <div className="pagination">
        <Button
          disabled={pageNo <= 0}
          onClick={() => handlePageChange(pageNo - 1)}
        >
          Назад
        </Button>
        <span>{`Страница ${pageNo + 1} из ${totalPages}`}</span>
        <Button
          disabled={pageNo >= totalPages - 1}
          onClick={() => handlePageChange(pageNo + 1)}
        >
          Вперед
        </Button>
      </div>

      <div>
        {isLoading ? (
          <WaitingComponent />
        ) : (
          <div className="user-table">
            <ListGroup>
              {assignments.map((assignment) => (
                <ListGroup.Item
                  key={assignment.id}
                  onClick={() => handleAssignmentClick(assignment)}
                >
                  <Row>
                    <Col sm={6} className="item">
                      {assignment.toUser.name} {assignment.toUser.lastname}
                    </Col>
                    <Col sm={6}>
                      {new Date(assignment.startDate).toLocaleDateString()} -{" "}
                      {new Date(assignment.closeDate).toLocaleDateString()}
                    </Col>
                    <Col
                      sm={6}
                      className="d-flex justify-content-start justify-content-sm-end"
                    >
                      <Button
                        variant="secondary"
                        className="me-2"
                        size="sm"
                        onClick={() => handleShowModal(assignment)}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="me-2"
                        onClick={() => handleDeleteAssignment(assignment.id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                    </Col>
                  </Row>

                  <Collapse in={selectedAssignment?.id === assignment.id}>
                    <div>
                      <Card.Body>
                        {assignment.assigmentDetails.length === 0 ? (
                          <p>Нет назначенных тестов</p>
                        ) : (
                          <ul>
                            {assignment.assigmentDetails.map((detail) => (
                              <li
                                key={detail.id}
                                className="assignment-detail-info"
                              >
                                <b>{detail.test.name}</b> -{" "}
                                {detail.isPassed ? (
                                  <p>Пройден. </p>
                                ) : (
                                  "Не пройден"
                                )}{" "}
                                (
                                {detail.result != null ? (
                                  <div>
                                    <p>
                                      {" "}
                                      {detail.result}/{detail.maxResult}{" "}
                                      <a
                                        href={TEST_RESULTS}
                                        onClick={() => handleResults(detail.id)}
                                      >
                                        Подробнее
                                      </a>
                                    </p>
                                  </div>
                                ) : (
                                  "Результат не доступен"
                                )}
                                )
                              </li>
                            ))}
                          </ul>
                        )}
                      </Card.Body>
                    </div>
                  </Collapse>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </div>

      <ModalChangeDateAssignment
        show={showModal}
        onHide={() => setShowModal(false)}
        assignment={selectedAssignment}
        onUpdate={fetchAssignments}
      />
    </div>
  );
}

export default UsersAssignments;
