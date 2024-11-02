import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import "../styles/Login.css";
import {Button, ButtonGroup, Container, Nav, Navbar,  NavDropdown, Image} from "react-bootstrap";
import { ADMIN_ROUTE } from "../../utils/consts";
// import loginImg from "../assets/logRegBackground.webp"
import { useAuth } from '../common/AuthContext'; 

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Используйте метод login из контекста
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(email, password);
      console.log(userData);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        console.log(userData.role)
        login();
        if(userData.role === 'ADMIN'){
          navigate(ADMIN_ROUTE)
        }
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  

  return (
    <div className="main-login-container">
      <div className="auth-container-login">
        <h2>Вход</h2>
        <div className="error-message">
        {error && <p>{error}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <NavLink>Забыли пароль?</NavLink> */}
          <button type="submit" >Войти</button>
          
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
