import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form, InputGroup } from "react-bootstrap";
import TestService from "../service/TestService";
import AssignmentDetailService from "../service/AssignmentDetailService";

function TestSelectionModal({ show, onHide, onConfirm, token, assignmentId, user }) {
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchTests();
  }, [pageNo, keyword]);

  const fetchTests = async () => {
    try {
      const data = await TestService.searchTests(pageNo, keyword, token);
      setTests(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const handleSelectTest = (testId) => {
    setSelectedTests((prevSelected) =>
      prevSelected.includes(testId)
        ? prevSelected.filter((id) => id !== testId)
        : [...prevSelected, testId]
    );
  };

  const handleConfirmSelection = async () => {
    const token = localStorage.getItem("token")
    await AssignmentDetailService.createAssignmentDetail(assignmentId, selectedTests, token)
    alert("Вы успешно назначили тесты пользователю: " + user?.name + " " + user?.lastname + ".")
    onConfirm(selectedTests);
    setSelectedTests([]);
    onHide();
  };

  const handlePrevPage = () => {
    if (pageNo > 0) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNo < totalPages - 1) {
      setPageNo(pageNo + 1);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Выберите тесты</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Поиск тестов"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={() => setPageNo(0)}>
            Поиск
          </Button>
        </InputGroup>
        <div className="test-list">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Выбрать</th>
              <th>Название</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedTests.includes(test.id)}
                    onChange={() => handleSelectTest(test.id)}
                  />
                </td>
                <td>{test.name}</td>
                <td>{test.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="pagination test-list-pagination">
          <Button onClick={handlePrevPage} disabled={pageNo === 0}>
            Назад
          </Button>
          <span>
            Страница {pageNo + 1} из {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={pageNo === totalPages - 1}
          >
            Вперед
          </Button>
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="secondary" onClick={handleConfirmSelection}>
          Подтвердить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TestSelectionModal;
