import {
  Button,
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
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import AssignmentDetailService from "../service/AssignmentDetailService";
import QuestionService from "../service/QuestionService";
import AnswerService from "../service/AnswerService";
import WaitingComponent from "../common/WaitingComponent";
import "../styles/PassTestPage.css";
import { useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from "../../utils/consts";

function PassTestPage() {
  const [test, setTest] = useState(null);
  const [questionImages, setQuestionImages] = useState({});
  const [answerImages, setAnswerImages] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigate();
  const count = 3

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
    const curAssignmentDetailId = localStorage.getItem("curAssignmentDetailId");
    try {
      const curAssignment = await AssignmentDetailService.getAssignmentDetail(
        curAssignmentDetailId,
        token
      );
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

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const currentAnswers = prevSelectedAnswers[questionId] || [];
      let updatedAnswers;

      const answerId = answer.id;

      const existingAnswerIndex = currentAnswers.findIndex(
        (selectedAnswer) => selectedAnswer.answerId === answerId
      );

      if (existingAnswerIndex !== -1) {
        updatedAnswers = currentAnswers.filter(
          (selectedAnswer) => selectedAnswer.answerId !== answerId
        );
      } else {
        updatedAnswers = [
          ...currentAnswers,
          {
            answerId: answerId,
            isCorrect: answer.isCorrect,
            points: answer.points,
          },
        ];
      }

      const newSelectedAnswers = {
        ...prevSelectedAnswers,
        [questionId]: updatedAnswers,
      };
      
      return newSelectedAnswers;
    });
  };

  useEffect(() => {
    if (questions.length > 0) {
      setSelectedAnswers((prevSelectedAnswers) => {
        const updatedAnswers = { ...prevSelectedAnswers };
        questions.forEach((question) => {
          if (!updatedAnswers[question.id]) {
            updatedAnswers[question.id] = [];
          }
        });
        return updatedAnswers;
      });
    }
  }, [questions]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePassTest = async () => {
    try {
      const token = localStorage.getItem("token");
      const curAssignmentDetailId = localStorage.getItem(
        "curAssignmentDetailId"
      );
      AssignmentDetailService.passTestAssignmentDetail(
        curAssignmentDetailId,
        selectedAnswers,
        token
      );
      localStorage.removeItem("curAssignmentDetailId")
      navigation(PROFILE_ROUTE)
    } catch (error) {
      console.error("Ошибка при отправке теста:", error);
      alert("Приносим извинения, возникла ошибка при отправке теста");
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
              Будьте осторожны, при перезагрузке страницы данные об ответах
              будут утяряны. Также вопросы могут содержать более одного
              правильно.
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
                    <strong>{`Вопрос ${currentPage * count + index + 1}:`}</strong>{" "}
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
                              {answer.text}
                              {answerImages[answer.id] && (
                                <img
                                  src={answerImages[answer.id]}
                                  alt="answer"
                                  style={{ width: "50px", marginLeft: "10px" }}
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
                          onChange={() =>
                            handleAnswerChange(question.id, answer)
                          }
                        />
                      ))}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </ListGroup>
        <Container className="buttons">
          {totalPages - 1 === currentPage && (
            <Button className="answer-button" onClick={handlePassTest}>
              Ответить
            </Button>
          )}
        </Container>
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

export default PassTestPage;
