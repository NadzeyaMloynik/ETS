import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionService from "../service/QuestionService";
import "../styles/QuestionsPage.css";
import { Container, Button, Image } from "react-bootstrap";
import TestService from "../service/TestService";
import WaitingComponent from "../common/WaitingComponent";
import ModalEditQuestion from "../pageComponents/ModalEditQuestion";
import ModalCreateQuestion from "../pageComponents/ModalCreateQuestion";
import ModalCreateAnswer from "../pageComponents/ModalCreateAnswer";
import ModalEditAnswer from "../pageComponents/ModalEditAnswer";
import correct from "../assets/checked.png";
import incorrect from "../assets/cancel.png";
import AnswerService from "../service/AnswerService";
import { useNavigate } from "react-router-dom";
import { TESTS_ROUTE } from "../../utils/consts";
import ModalUpdateTest from "../pageComponents/ModalUpdateTest";

const QuestionsPage = () => {
  const { slug } = useParams();
  const [questions, setQuestions] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [test, setTest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateAnswerModal, setShowCreateAnswerModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showEditAnswerModal, setShowEditAnswerModal] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [answerImageUrls, setAnswerImageUrls] = useState({});
  const [imageUrls, setImageUrls] = useState({});
  const [showTestModal, setShowTestModal] = useState(false);
  const count = 7;

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, [slug, pageNo]);

  const fetchAnswerImage = async (answerId, token) => {
    try {
      const imageBlob = await AnswerService.getAnswerImage(answerId, token);
      const imageUrl = URL.createObjectURL(imageBlob);
      setAnswerImageUrls((prevUrls) => ({
        ...prevUrls,
        [answerId]: imageUrl,
      }));
    } catch (error) {
      console.error("Error fetching answer image:", error);
    }
  };

  const fetchImage = async (questionId, token) => {
    try {
      const imageBlob = await QuestionService.getQuestionImage(
        questionId,
        token
      );
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrls((prevUrls) => ({
        ...prevUrls,
        [questionId]: imageUrl,
      }));
    } catch (error) {
      console.error("Error fetching question image:", error);
    }
  };

  const handleAnswerImageUpdate = (answerId, newImageUrl) => {
    setAnswerImageUrls((prevUrls) => ({
      ...prevUrls,
      [answerId]: newImageUrl,
    }));
  };

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await QuestionService.getPaginatedQuestions(
        Number(slug),
        Number(pageNo),
        count,
        token
      );
      const testLoc = await TestService.getTestById(slug, token);
      setTest(testLoc);
      setQuestions(data.content);
      setTotalPages(data.totalPages);

      data.content.forEach((question) => {
        if (question.image) {
          fetchImage(question.id, token);
        }
        question.answerList.forEach((answer) => {
          if (answer.image != null) {
            fetchAnswerImage(answer.id, token);
          }
        });
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAnswers = (questionId) => {
    setActiveQuestion((prev) => (prev === questionId ? null : questionId));
  };

  const handlePagination = (direction) => {
    if (direction === "next" && pageNo < totalPages - 1) {
      setPageNo(pageNo + 1);
    } else if (direction === "prev" && pageNo > 0) {
      setPageNo(pageNo - 1);
    }
  };

  const handleEditClick = (questionId) => {
    setSelectedQuestionId(questionId);
    setShowModal(true);
  };

  const handleUpdateQuestionsList = () => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await QuestionService.getPaginatedQuestions(
          Number(slug),
          Number(pageNo),
          token
        );
        setQuestions(data.content);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  };

  const handleImageUpdate = (questionId, newImageUrl) => {
    setImageUrls((prevUrls) => ({
      ...prevUrls,
      [questionId]: newImageUrl,
    }));
  };

  const handleCreateQuestion = () => {
    setShowCreateModal(true);
  };

  const handleAddAnswer = (questionId) => {
    setSelectedQuestionId(questionId);
    setShowCreateAnswerModal(true);
  };

  const handleEditAnswer = (answerId) => {
    setSelectedAnswerId(answerId);
    setShowEditAnswerModal(true);
  };

  const handleDeleteAnswer = async (answerId) => {
    const token = localStorage.getItem("token");
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить этот ответ?"
    );

    if (confirmDelete) {
      try {
        await AnswerService.deleteAnswer(answerId, token);
        alert("Ответ успешно удален");
        handleUpdateQuestionsList();
      } catch (error) {
        console.error("Ошибка при удалении ответа:", error);
        alert("Не удалось удалить ответ. Попробуйте снова.");
      }
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    const token = localStorage.getItem("token");
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить этот ответ?"
    );

    if (confirmDelete) {
      try {
        await QuestionService.deleteQuestion(questionId, token);
        alert("вопрос успешно удален");
        handleUpdateQuestionsList();
      } catch (error) {
        console.error("Ошибка при удалении вопроса:", error);
        alert("Не удалось удалить вопрос. Попробуйте снова.");
      }
    }
  };

  const handleTestDelete = async () => {
    const token = localStorage.getItem("token");
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить этот тест?"
    );

    if (confirmDelete) {
      try {
        TestService.deleteTest(slug, token);
        navigate(TESTS_ROUTE);
        alert("Тест успешно удален");
      } catch (error) {
        console.error("Ошибка при удалении тест:", error);
        alert("Не удалось удалить тест. Попробуйте снова.");
      }
    }
  };

  return (
    <Container className="qustion-container">
      {isLoading ? (
        <WaitingComponent />
      ) : (
        <>
          <div className="hat buttons">
            <div>
              <h1 className="header">{test.name}</h1>
              <p className="description">{test.description}</p>
            </div>
            <div>
              <Button
                variant="secondary"
                onClick={handleCreateQuestion}
                className="me-2"
              >
                Новый вопрос
              </Button>
              <Button
                variant="outline-primary"
                className="me-2"
                size="sm"
                onClick={() => setShowTestModal(true)}
              >
                <i className="bi bi-pencil-fill"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={handleTestDelete}
              >
                <i className="bi bi-trash-fill"></i>
              </Button>
            </div>
          </div>
          <ul className="questionList">
            {questions.map((question) => (
              <div className="buttons question-button">
                <li key={question.id} className="questionItem">
                  <div
                    className="questionTitle"
                    onClick={() => toggleAnswers(question.id)}
                  >
                    {question.question}
                    {question?.image && imageUrls[question.id] && (
                      <div className="questionImage">
                        <img src={imageUrls[question.id]} alt="Question" />
                      </div>
                    )}
                  </div>
                  {activeQuestion === question.id &&
                    question.answerList.length > 0 && (
                      <>
                        <hr />
                        <ul className="answerList">
                          {question.answerList.map((answer) => (
                            <li key={answer.id} className="answerItem">
                              <div className="text">
                                <p>{answer.text}</p>
                                {answerImageUrls[answer.id] && (
                                  <img
                                    src={answerImageUrls[answer.id]}
                                    alt="Answer"
                                    className="answerImage"
                                  />
                                )}
                              </div>
                              <div className="answer">
                                <div>
                                  {answer.isCorrect ? (
                                    <Image src={correct} />
                                  ) : (
                                    <Image src={incorrect} />
                                  )}
                                  <span>Баллы: {answer.points}</span>
                                </div>
                                <div>
                                  <Button
                                    variant="outline-primary"
                                    onClick={() => handleEditAnswer(answer.id)}
                                    className="me-2"
                                    size="sm"
                                  >
                                    <i className="bi bi-pencil-fill"></i>
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    onClick={() =>
                                      handleDeleteAnswer(answer.id)
                                    }
                                    size="sm"
                                  >
                                    <i className="bi bi-trash-fill"></i>
                                  </Button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                </li>
                <Button onClick={() => handleAddAnswer(question.id)}>
                  Добавить
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => handleEditClick(question.id)}
                  className="me-2"
                  size="sm"
                >
                  <i className="bi bi-pencil-fill"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDeleteQuestion(question.id)}
                  size="sm"
                >
                  <i className="bi bi-trash-fill"></i>
                </Button>
              </div>
            ))}
          </ul>

          <div className="pagination">
            <Button
              onClick={() => handlePagination("prev")}
              disabled={pageNo === 0}
              className="paginationButton"
            >
              Предыдущая
            </Button>
            <span className="paginationText">
              Страница {pageNo + 1} из {totalPages}
            </span>
            <Button
              onClick={() => handlePagination("next")}
              disabled={pageNo === totalPages - 1}
              className="paginationButton"
            >
              Следующая
            </Button>
          </div>
        </>
      )}

      <ModalCreateQuestion
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        testId={slug}
        onCreate={handleUpdateQuestionsList}
        onImageCreate={(questionId, imageUrl) => {
          setImageUrls((prevUrls) => ({
            ...prevUrls,
            [questionId]: imageUrl,
          }));
        }}
      />

      <ModalEditQuestion
        show={showModal}
        onHide={() => setShowModal(false)}
        questionId={selectedQuestionId}
        onUpdate={handleUpdateQuestionsList}
        onImageUpdate={handleImageUpdate}
      />

      <ModalCreateAnswer
        show={showCreateAnswerModal}
        onHide={() => setShowCreateAnswerModal(false)}
        questionId={selectedQuestionId}
        onCreate={handleUpdateQuestionsList}
        onImageCreate={(answerId, imageUrl) => {
          setAnswerImageUrls((prevUrls) => ({
            ...prevUrls,
            [answerId]: imageUrl,
          }));
        }}
      />
      <ModalEditAnswer
        show={showEditAnswerModal}
        onHide={() => setShowEditAnswerModal(false)}
        answerId={selectedAnswerId}
        onUpdate={handleUpdateQuestionsList}
        onImageUpdate={handleAnswerImageUpdate}
      />
      <ModalUpdateTest
        show={showTestModal}
        onHide={() => setShowTestModal(false)}
        test={test}
        onUpdate={(updatedTest) => {
          setTest(updatedTest);
        }}
      />
    </Container>
  );
};

export default QuestionsPage;
