import React from "react";
import Menu from "../common/Menu";
import ProfilePage from "./ProfilePage";
import UserManagement from "./UserManagementPage"
import "../styles/AdminPage.css"

function AdminPage() {
  return (
    <div className="main-admin-container">
      <Menu />
      <UserManagement/>
    </div>
  );
}

export default AdminPage;
