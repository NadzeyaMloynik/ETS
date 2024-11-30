import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Row,
  Col,
  Nav,
  NavLink,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TestService from "../service/TestService";
import "../styles/TestsPage.css";
import WaitingComponent from "../common/WaitingComponent";
import CreateTestModal from "../pageComponents/CreateTestModal";

function TestsPage() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadTests();
  }, [pageNo, keyword]);

  const loadTests = async () => {
    setLoading(true);
    try {
      const response = await TestService.searchTests(pageNo, keyword, token);
      setTests(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Ошибка при загрузке тестов:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPageNo(0);
  };

  const handlePrevPage = () => {
    if (pageNo > 0) setPageNo(pageNo - 1);
  };

  const handleNextPage = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleOpenModal = () => setShowCreateModal(true);
  const handleCloseModal = () => setShowCreateModal(false);

  return (
    <div className="tests-page">
      <Container className="search-cards">
        <Form className="search buttons">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Поиск по ключевому слову"
              value={keyword}
              onChange={handleSearchChange}
            />
            <Button variant="outline-secondary" onClick={loadTests}>
              Поиск
            </Button>
            <Button onClick={handleOpenModal} variant="outline-secondary">
              Новый тест
            </Button>
          </InputGroup>
        </Form>

        {loading ? (
          <WaitingComponent />
        ) : (
          <Row className="cards">
            {tests.map((test) => (
              <Col key={test.id} md={4}>
                <NavLink onClick={()=>{navigate(`/questions/${test.id}`)}}>
                  <div className="main-card">
                    <div className="mt-3 title-nav">
                      <span>{test.name}</span>
                    </div>
                    <Card className="mb-3">
                      <Card.Body>
                        <Card.Text>{test.description}</Card.Text>
                        <div className="buttons"></div>
                      </Card.Body>
                    </Card>
                  </div>
                </NavLink>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <div className="pagination">
        <Button onClick={handlePrevPage} disabled={pageNo === 0}>
          Назад
        </Button>
        <span>
          Страница {pageNo + 1} из {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={pageNo === totalPages - 1}>
          Вперед
        </Button>
      </div>

      <CreateTestModal
        show={showCreateModal}
        onHide={handleCloseModal}
        token={token}
        onTestCreated={loadTests}
      />
    </div>
  );
}

export default TestsPage;
