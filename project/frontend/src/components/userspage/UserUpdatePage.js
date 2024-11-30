import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { Button, Container, Image, Form } from "react-bootstrap";
import emptyAvatar from "../assets/empty-avatar.avif";

import "../styles/UserUpdatePage.css";
import { ADMIN_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
import WaitingComponent from "../common/WaitingComponent";
import { useUser } from "../common/UserContext";

function UserUpdatePage() {
  const { slug } = useParams();
  const [user, setUser] = useState(null);
  const [userPic, setLocalUserPic] = useState(emptyAvatar);
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState("");
  const [role, setRole] = useState("");
  const [curRole, setCurRole] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    role: "",
    position: "",
    city: "",
  });

  const navigate = useNavigate();
  const { setUserPic } = useUser();

  useEffect(() => {
    fetchUser();
    const curR = localStorage.getItem('role')
    setCurRole(curR)
  }, [slug]);
  useEffect(() => {
    if (user) {
      fetchUserPic();
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      let userData = "";
      if (slug) {
        userData = await UserService.getUserById(slug, token);
      } else {
        userData = await UserService.getYourProfile(token);
        setRole(userData.ourUsers.role);
      }
      setUser(userData.ourUsers);
      setFormData({
        name: userData.ourUsers.name || "",
        lastname: userData.ourUsers.lastname || "",
        email: userData.ourUsers.email || "",
        role: userData.ourUsers.role || "",
        position: userData.ourUsers.position || "",
        city: userData.ourUsers.city || "",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchUserPic = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const pic = await UserService.getUserImage(user.id, token);
      setLocalUserPic(pic || emptyAvatar);
      if (String(user.id) === id) {
        setUserPic(pic || emptyAvatar);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    if (!image) {
      alert("Пожалуйста, выберите изображение.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.updateUserPhoto(user.id, image, token);

      if (response.statusCode === 200) {
        alert("Фотография успешно обновлена!");
        fetchUserPic();
        setImageName("");
      } else {
        alert("Произошла ошибка при обновлении фотографии.");
      }
    } catch (error) {
      console.error("Error updating user image:", error);
      alert("Произошла ошибка при обновлении фотографии.");
    }
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.updateUser(user.id, formData, token);
      if (response.statusCode === 200) {
        alert("Данные успешно обновлены!");
        if (slug) {
          navigate(ADMIN_ROUTE);
        } else {
          navigate(PROFILE_ROUTE);
        }
      } else {
        alert("Произошла ошибка при обновлении данных.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Произошла ошибка при обновлении данных.");
    }
  };

  return (
    <Container>
      {user ? (
        <div className="main-update-container">
          <div className="image-container buttons">
            <Image
              src={userPic}
              className="user-image-update"
              onClick={() => document.getElementById("fileInput").click()}
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {imageName && (
              <div className="image-name">
                <p>{imageName}</p>
              </div>
            )}
            <Button onClick={handleUpdateClick}>Обновить фото</Button>
          </div>
          <div className="user-form-container buttons">
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder={user.name}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastname">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  placeholder={user.lastname}
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Город</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder={user.city}
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder={user.email}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              {curRole === "ADMIN" ? <div>
                <Form.Group controlId="formEmail">
                  <Form.Label>Должность</Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formRole">
                  <Form.Label>Роль</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option>ADMIN</option>
                    <option>USER</option>
                    <option>HR</option>
                  </Form.Control>
                </Form.Group>
              </div> :<></>}
              <Button variant="primary" onClick={handleSaveClick}>
                Сохранить изменения
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <WaitingComponent />
      )}
    </Container>
  );
}

export default UserUpdatePage;
