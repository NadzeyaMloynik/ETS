import {
  ListGroup,
  Card,
  Form,
  Pagination,
  Row,
  Image,
  Col,
  Container,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import AssignmentDetailService from "../service/AssignmentDetailService";
import QuestionService from "../service/QuestionService";
import WaitingComponent from "../common/WaitingComponent";
import AnswerService from "../service/AnswerService";
import "../styles/PassTestPage.css";
import correct from "../assets/checked.png";
import incorrect from "../assets/cancel.png";
import FeedbackService from "../service/FeedbackService";

function TestResultPage() {
  const [test, setTest] = useState(null);
  const [questionImages, setQuestionImages] = useState({});
  const [answerImages, setAnswerImages] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [curFeedback, setCurFeedback] = useState(null);
  const count = 3;

  useEffect(() => {
    fetchAssignmentDetail();
  }, []);

  useEffect(() => {
    if (test) {
      fetchPaginatedQuestions(currentPage);
    }
  }, [test, currentPage]);

  const fetchAssignmentDetail = async () => {
    const token = localStorage.getItem("token");
    const curAssignmentDetailId = localStorage.getItem("curTestForResult");
    try {
      const curAssignment = await AssignmentDetailService.getAssignmentDetail(
        curAssignmentDetailId,
        token
      );
      console.log(curAssignment)
      if (curAssignment.feedback != null) {
        setCurFeedback(curAssignment.feedback.message);
      }
      const parsedObject = JSON.parse(curAssignment.testAnswers);
      const resultMap = new Map(Object.entries(parsedObject));
      setSelectedAnswers(Object.fromEntries(resultMap));
      setTest(curAssignment.test);
    } catch (error) {
      console.error("Ошибка при загрузке задания:", error);
    }
  };

  const fetchPaginatedQuestions = async (page) => {
    const token = localStorage.getItem("token");
    try {
      const paginationData = await QuestionService.getPaginatedQuestions(
        test.id,
        page,
        count,
        token
      );
      setQuestions(paginationData.content);
      setTotalPages(paginationData.totalPages);

      const images = await Promise.all(
        paginationData.content.map(async (question) => {
          if (question.image != null) {
            const image = await QuestionService.getQuestionImage(
              question.id,
              token
            );
            return { [question.id]: URL.createObjectURL(image) };
          }
        })
      );
      setQuestionImages(Object.assign({}, ...images));

      const answerImagesPromises = paginationData.content.flatMap((question) =>
        question.answerList.map(async (answer) => {
          if (answer.image != null) {
            const image = await AnswerService.getAnswerImage(answer.id, token);
            return { [answer.id]: URL.createObjectURL(image) };
          }
          return null;
        })
      );

      const loadedAnswerImages = await Promise.all(answerImagesPromises);
      const filteredAnswerImages = loadedAnswerImages.filter(
        (img) => img !== null
      );
      setAnswerImages((prev) => ({
        ...prev,
        ...Object.assign({}, ...filteredAnswerImages),
      }));
    } catch (error) {
      console.error("Ошибка при загрузке вопросов:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateFeedback = async () => {
    if (feedback.trim() === "") {
      setError("Отзыв не может быть пустым.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const curAssignmentDetailId = localStorage.getItem("curTestForResult");
      const payload = { message: feedback };
      const data = await FeedbackService.createFeedback(
        curAssignmentDetailId,
        payload,
        token
      );
      console.log(data);
    } catch (errror) {
      setError("Ошибка при отправке отзыва.");
      console.error("Error creating question:", error);
    }
  };

  if (!test) {
    return <WaitingComponent />;
  }

  return (
    <div className="test-pass-container">
      <div className="test-name-description">
        <div className="test-name">
          <h2>{test.name}</h2>
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip-info">
                Это ответы на тест. Они зафиксированы и недоступны для
                изменения.
              </Tooltip>
            }
          >
            <i
              className="bi bi-question-circle-fill"
              style={{ cursor: "pointer", marginLeft: "10px" }}
            ></i>
          </OverlayTrigger>
        </div>
        {test.description && <p>{test.description}</p>}
      </div>
      <Container className="question-container">
        <ListGroup>
          {questions.map((question, index) => (
            <Card key={question.id} className="mb-3">
              <Card.Body>
                <Row>
                  <Col className="col-question">
                    <strong>{`Вопрос ${
                      currentPage * count + index + 1
                    }:`}</strong>{" "}
                    {question.question}
                  </Col>
                  <Col className="col-image">
                    {questionImages[question.id] && (
                      <Image src={questionImages[question.id]} alt="question" />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col className="col-answer">
                    {question.answerList &&
                      question.answerList.map((answer) => (
                        <Form.Check
                          key={answer.id}
                          type="checkbox"
                          label={
                            <>
                              {answer.isCorrect ? (
                                <Image src={correct} width={20} />
                              ) : (
                                <Image src={incorrect} width={20} />
                              )}
                              {answer.text}
                              {answerImages[answer.id] && (
                                <img
                                  src={answerImages[answer.id]}
                                  alt="answer"
                                  style={{
                                    width: "50px",
                                    marginLeft: "10px",
                                  }}
                                />
                              )}
                            </>
                          }
                          name={`question-${question.id}`}
                          id={`answer-${answer.id}`}
                          checked={
                            selectedAnswers[question.id]?.some(
                              (selectedAnswer) =>
                                selectedAnswer.answerId === answer.id
                            ) || false
                          }
                          disabled={true}
                        />
                      ))}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </ListGroup>
      </Container>
      <Container className="buttons">
        {totalPages - 1 === currentPage && (
          <>
            <div className="feedback-form">
              <Form>
                <Form.Group controlId="formAnswerText">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder={
                      curFeedback
                        ? curFeedback
                        : "Добавьте ваш отзыв на пройденный тест"
                    }
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    maxLength="1000"
                    isInvalid={error}
                    readOnly={!!curFeedback}
                    required
                  />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form>
            </div>
            {!curFeedback && (
              <Button
                className="answer-button"
                onClick={() => handleCreateFeedback()}
              >
                Оставить отзыв
              </Button>
            )}
          </>
        )}
      </Container>

      <Pagination className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <Pagination.Item
            key={idx}
            variant="secondary"
            active={idx === currentPage}
            onClick={() => handlePageChange(idx)}
            className={`pagination-button ${
              idx === currentPage ? "active" : ""
            }`}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default TestResultPage;
