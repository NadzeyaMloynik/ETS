import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import "../styles/Login.css";
import { Image } from "react-bootstrap";
import { ADMIN_ROUTE, PROFILE_ROUTE, TESTS_ROUTE } from "../../utils/consts";
import { useAuth } from "../common/AuthContext";
import loginPic from "../assets/mountains_high_res_sharp.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [role, setRole] = useState(""); 
  
  useEffect(() => {
    if (isAuthenticated) {
      if (role === "ADMIN") {
        navigate(ADMIN_ROUTE);
      } else if (role === "HR") {
        navigate(TESTS_ROUTE);
      } else if (role === "USER") {
        navigate(PROFILE_ROUTE);
      }
    }
  }, [isAuthenticated, role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(email, password);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        console.log("token: ", userData.token);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("id", userData.id);
        setRole(userData.role); 
        await login(); 
      } else {
        setError("Логин или пароль неверны");
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
        <div className="error-message">{error && <p>{error}</p>}</div>
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
          <button type="submit">Войти</button>
        </form>
      </div>
      <Image src={loginPic} />
    </div>
  );
}

export default LoginPage;
