import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import "../styles/UserManagement.css";
import { Button, Container, Table, Pagination } from "react-bootstrap";
import WaitingComponent from "../common/WaitingComponent";

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (pageNumber) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await UserService.getAllUsersPagination(
        pageNumber,
        token
      );

      setUsers(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm(
        "Вы уверены, что хотите удалить пользователя?"
      );

      const token = localStorage.getItem("token");
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        fetchUsers(page);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Container className="user-management-container">
      {loading ? (
        <WaitingComponent/>
      ) : (
        <>
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Должность</th>
                <th>Роль</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.lastname || "-"}</td>
                  <td>{user.name || "-"}</td>
                  <td>{user.email || "-"}</td>
                  <td>{user.position || "-"}</td>
                  <td>{user.role === "ADMIN" ? "Администратор" :
                    user.role === "USER" ? "Сотрудник" :
                    user.role === "HR" ? "HR" : "-"}</td>
                  <td className="buttons">
                    <Button
                      className="delete"
                      onClick={() => deleteUser(user.id)}
                    >
                      Удалить
                    </Button>
                      <Button variant="primary"
                      onClick={()=>navigate(`/profile-update/${user.id}`)}
                      >Обновить</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination className="justify-content-center custom-pagination">
            <Pagination.Prev
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index}
                active={index === page}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1}
            />
          </Pagination>
        </>
      )}
    </Container>
  );
}

export default UserManagementPage;
