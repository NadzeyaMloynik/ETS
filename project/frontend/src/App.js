// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from './components/common/NavBar';
// import LoginPage from './components/auth/LoginPage';
// import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
// import UserService from './components/service/UserService';
// import UpdateUser from './components/userspage/UpdateUser';
// import UserManagementPage from './components/userspage/UserManagementPage';
// import ProfilePage from './components/userspage/ProfilePage';
import AppRouter from './components/common/AppRouter';




function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <AppRouter/>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
