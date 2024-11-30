import {
  Button,
  ListGroup,
  Collapse,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import "../styles/HRConteiner.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AssignmentService from "../service/AssignmentService";
import WaitingComponent from "../common/WaitingComponent";
import { PASS_TEST_ROUTE } from "../../utils/consts";

function UserProfileContainer() {
  const [isSetAssignments, setIsSetAssignments] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [visibleFeedback, setVisibleFeedback] = useState(null); 
  const navigate = useNavigate();
  const pageSize = 5

  useEffect(() => {
    fetchAssignments();
  }, [pageNo]);

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const data = await AssignmentService.getPaginatedAssignmentsToUser(
        id,
        pageNo,
        token,
        pageSize
      );
      console.log(data)
      setAssignments(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Ошибка при загрузке заданий:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handlePassTestNavigate = async (assignmentId) => {
    localStorage.setItem("curAssignmentDetailId", assignmentId);
    navigate(PASS_TEST_ROUTE);
  };

  return (
    <div className="hr-container">
      <div className="users-for-assignment">
        <h3>Список выданных заданий</h3>
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
                    <Col md={6} className="item">
                      {assignment.name}
                    </Col>
                    <Col md={3}>
                      {new Date(assignment.startDate).toLocaleDateString()} -{" "}
                      {new Date(assignment.closeDate).toLocaleDateString()}
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
                              <li key={detail.id}>
                                <b>{detail.test.name}</b> -{" "}
                                {detail.isPassed ? (
                                  <>
                                    Пройден. {detail.result}/{detail.maxResult}.{" "}
                                    {detail.feedback != null ? (
                                      <>
                                        <span 
                                          className="feedback-link"
                                          onMouseEnter={() =>
                                            setVisibleFeedback(detail.id)
                                          }
                                          onMouseLeave={() =>
                                            setVisibleFeedback(null)
                                          }
                                        >
                                          Отзыв
                                        </span>
                                        {visibleFeedback === detail.id && (
                                          <div
                                            className="feedback-container"
                                            style={{
                                              position: "absolute",
                                              marginTop: "10px",
                                              backgroundColor: "#f9f9f9",
                                              border: "1px solid #ddd",
                                              borderRadius: "4px",
                                              padding: "10px",
                                              width: "300px",
                                              zIndex: 1000,
                                            }}
                                          >
                                            <p>{detail.feedback.message}</p>
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <div></div>
                                    )}
                                  </>
                                ) : (
                                  "Не пройден"
                                )}
                                {
                                  assignment.isOpen ? <>
                                  {!detail.isPassed ? (
                                  <Button
                                    variant="secondary"
                                    onClick={() =>
                                      handlePassTestNavigate(detail.id)
                                    }
                                  >
                                    Пройти
                                  </Button>
                                ) : (
                                  <div>Тест пройден</div>
                                )}
                                  </> : <div>Тест заблокирован</div>
                                }
                                
                                <hr/>
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
    </div>
  );
}

export default UserProfileContainer;
