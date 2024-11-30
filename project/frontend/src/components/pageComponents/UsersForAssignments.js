import { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import UserService from "../service/UserService";
import AssignmentModal from "./CreateAssignmentModal";

function UsersForAssignments() {
  const [users, setUsers] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showTestSelectionModal, setShowTestSelectionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [assignment, setAssignment] = useState(null)

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const data = await UserService.getAllUsersPaginationNameLastname(
        pageNo,
        keyword,
        token
      )
      setUsers(data.content)
      setTotalPages(data.totalPages)
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pageNo, keyword]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPageNo(0);
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

  const openAssignmentModal = (user) => {
    setSelectedUser(user);
    setShowAssignmentModal(true);
  };

  const handleSaveAssignment = (assignmentData) => {
    setAssignment(assignmentData)
    setShowAssignmentModal(false);
    setShowTestSelectionModal(true);
  };

  return (
    <div className="users-for-assignment">
      <Form>
        <Form.Control
          type="text"
          placeholder="Search by name or lastname"
          value={keyword}
          onChange={handleSearchChange}
        />
      </Form>

      <div className="user-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td className="buttons">
                  <Button onClick={() => openAssignmentModal(user)}>
                    Задание
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="pagination">
        <Button onClick={handlePrevPage} disabled={pageNo === 0}>
          Назад
        </Button>
        <span>
          Page {pageNo + 1} of {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={pageNo === totalPages - 1}>
          Вперед
        </Button>
      </div>

      <AssignmentModal
        show={showAssignmentModal}
        onHide={() => setShowAssignmentModal(false)}
        onSave={handleSaveAssignment}
        user={selectedUser}
        fromUserId={localStorage.getItem("id")}
      />
    </div>
  );
}

export default UsersForAssignments;
