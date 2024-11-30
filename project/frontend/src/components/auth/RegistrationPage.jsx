import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
import { Link, useNavigate } from "react-router-dom";
import {
  Image,
} from "react-bootstrap";
import { LOGIN_ROUTE, ADMIN_ROUTE } from "../../utils/consts";
import "../styles/Registration.css";
import loginPic from "../assets/mountains_high_res_sharp.png";

function RegistrationPage() {
  const [profileInfo, setProfileInfo] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repPassword: "",
    role: "USER",
    city: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role")
      const response = await UserService.register(formData, token);
      if (role === "ADMIN") {
        navigate(ADMIN_ROUTE);
      }
      else{
      navigate(LOGIN_ROUTE);}
    } catch (error) {
      console.error("Error registering user:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="register-main-container">
    <Image src={loginPic} />
      <div className="auth-container">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>*</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>*</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>*</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>*</label>
            <input
              type="password"
              placeholder="Repeat password"
              name="repPassword"
              value={formData.repPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {profileInfo.role !== "ADMIN" ?
            <div className="form-group">
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              required
            />
            <label htmlFor="agree">
              Я соглашаюсь на обработку данных
            </label>
          </div>
          : <></>
          }
          
          {profileInfo.role === "ADMIN" ? (
            <div className="role">
              <div className="dropdown mt-2">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {"Выберите роль"}
                </button>
                <div class="dropdown-menu roles">
                  <Link
                    className="dropdown-item"
                    onClick={() => handleRoleSelect("ADMIN")}
                  >
                    Администратор
                  </Link>
                  <Link
                    className="dropdown-item"
                    onClick={() => handleRoleSelect("USER")}
                  >
                    Сотрудник
                  </Link>
                  <Link
                    className="dropdown-item"
                    onClick={() => handleRoleSelect("HR")}
                  >
                    HR
                  </Link>
                </div>
              </div>
              <input
                type="text"
                name="city"
                value={
                  formData.role === "ADMIN"
                    ? "Администратор"
                    : formData.role === "USER"
                    ? "Сотрудник"
                    : formData.role === "HR"
                    ? "HR"
                    : "Роль не выбрана"
                }
                onChange={handleInputChange}
                placeholder="Role"
                disabled
                required
              />
            </div>
          ) : (
            <></>
          )}
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
