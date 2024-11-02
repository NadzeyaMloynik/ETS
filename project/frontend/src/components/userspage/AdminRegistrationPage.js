import React from "react";
import Menu from "../common/Menu";
import RegistrationPage from "../auth/RegistrationPage";
import "../styles/AdminPage.css"

function AdminRegistrationPage() {
  return (
    <div className="main-admin-container">
      <Menu />
      <RegistrationPage/>
    </div>
  );
}

export default AdminRegistrationPage;
