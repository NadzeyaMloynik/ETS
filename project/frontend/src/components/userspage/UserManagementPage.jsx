import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";
import TestSevice from "../service/TestService";
import { ADMIN_REGISTRATION_ROUTE } from "../../utils/consts";

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllUsers(token);
      setUsers(response.ourUsersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );

      const token = localStorage.getItem("token");
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadPhoto = async (userId) => {
    if (!selectedFile) return;
    console.log(userId);
    try {

      console.log(selectedFile);
      const token = localStorage.getItem("token");
      await UserService.updateUserPhoto(userId, selectedFile, token);

      alert("Photo uploaded successfully!");
      console.log(selectedFile);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <div className="user-management-container">
      <h2>Users Management Page</h2>
      <button className="reg-button">
        {" "}
        <Link to={ADMIN_REGISTRATION_ROUTE}>Add User</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
                <button>
                  <Link to={`/update-user/${user.id}`}>Update</Link>
                </button>
                <div>
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={() => handleUploadPhoto(user.id)}>
                    Upload Photo
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementPage;
