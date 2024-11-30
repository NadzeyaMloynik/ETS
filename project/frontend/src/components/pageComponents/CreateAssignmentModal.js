import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form, InputGroup } from "react-bootstrap";
import AssignmentService from "../service/AssignmentService";
import TestService from "../service/TestService";
import AssignmentDetailService from "../service/AssignmentDetailService";

function AssignmentModal({ show, onHide, onSave, fromUserId, user }) {
  const [startDate, setStartDate] = useState(null);
  const [closeDate, setCloseDate] = useState(null);
  const [name, setName] = useState(null);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchTests();
  }, [pageNo, keyword]);

  const handleSave = async () => {
    if (!startDate || !closeDate) {
      alert("Пожалуйста, выберите дату начала и окончания.");
      return;
    }

    const token = localStorage.getItem("token");
    const payload = {
      startDate: startDate,
      closeDate: closeDate,
      name: name,
    };

    console.log(selectedTests);

    if (selectedTests.length > 0) {
      try {
        const response = await AssignmentService.createAssignment(
          fromUserId,
          user.id,
          payload,
          token
        );
        console.log(response);

        await AssignmentDetailService.createAssignmentDetail(
          response.id,
          selectedTests,
          token
        );
        alert(
          "Вы успешно назначили тесты пользователю: " +
            user?.name +
            " " +
            (user.lastname != null ? user.lastname : "")
        );
        onHide();
        onSave(response);
        setStartDate("");
        setCloseDate("");
        setSelectedTests([]);
      } catch (error) {
        alert("Заполните все поля");
      }
    } else {
      alert("Выберите тест(ы) для назначения");
    }
  };

  const fetchTests = async () => {
    try {
      const token = localStorage.getItem("token");
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
      <Modal.Header closeButton={false}>
        <Modal.Title>
          Назначить тест для {user?.name} {user?.lastname}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="times">
            <div className="field-group">
              <Form.Label htmlFor="startDateInput">Начало</Form.Label>
              <Form.Control
                id="startDateInput"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={minDate}
                required
              />
            </div>
            <div className="field-group">
              <Form.Label htmlFor="endDateInput">Конец</Form.Label>
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
          <Form.Group className="mt-3">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="test"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <br />
          <hr />
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Поиск тестов"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button
              type="submit"
              variant="outline-secondary"
              onClick={() => setPageNo(0)}
            >
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="secondary" onClick={handleSave}>
          Дальше
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AssignmentModal;
