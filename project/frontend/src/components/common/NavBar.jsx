import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../common/UserContext";
import UserService from "../service/UserService";
import NotificationService from "../service/NotificationService";
import empty from "../assets/empty-avatar.avif";
import {
  Button,
  ButtonGroup,
  Container,
  Nav,
  Navbar,
  Image,
  ListGroup,
  Pagination,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/mountain.png";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ADMIN_REGISTRATION_ROUTE,
  ADMIN_ROUTE,
  PROFILE_ROUTE,
  TESTS_ROUTE,
  HOME_ROUTE,
} from "../../utils/consts";
import "../styles/NavBarStyle.css";

import { useAuth } from "../common/AuthContext";

function NavBar() {
  const { userPic } = useUser();
  const { setUserPic } = useUser();
  const { isAuthenticated, logout } = useAuth();
  const [role, setRole] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const notificationsRef = useRef(null); // Реф для блока оповещений

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserPic();
    fetchUser();
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated, currentPage]);

  useEffect(() => {
    // Обработчик клика вне блока
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    // Подписка на событие клика
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Отписка от события при размонтировании компонента
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (token != null && id != null) {
        const response = await UserService.getYourProfile(token);
        const userRole = response.ourUsers.role;
        setRole(userRole);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserPic = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (token != null && id != null) {
        const pic = await UserService.getUserImage(id, token);
        setUserPic(pic || empty);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      const response = await NotificationService.paginationNotification(
        userId,
        currentPage,
        token
      );

      const { content, totalPages, pageable } = response;

      setNotifications(
        content.map((notification) => ({
          ...notification,
          isOpen: false,
        }))
      );

      setCurrentPage(pageable.pageNumber);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsReadOrToggle = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              isOpen: !notification.isOpen,
              isRead: true,
            }
          : notification
      )
    );
  };

  const handleLogout = () => {
    const confirmDelete = window.confirm("Вы уверены, что хотите выйти?");
    if (confirmDelete) {
      logout();
      navigate(LOGIN_ROUTE);
      localStorage.clear();
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1);
  };

  return (
    <>
      <Navbar collapseOnSelect className="navbar navbar-dark">
        <Container className="main-block">
          <Navbar.Brand>
            <NavLink to={HOME_ROUTE} className="logo">
              <h3>UNI</h3>
              <Image src={logo} />
              <h3>TEST</h3>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="links-and-buttons"
          >
            <Nav className="link">
              {/* <NavLink to={LOGIN_ROUTE} className="nav-link">
                Контакты
              </NavLink> */}
              {role === "ADMIN" && isAuthenticated ? (
                <>
                  <NavLink to={ADMIN_ROUTE} className="nav-link">
                    Управление
                  </NavLink>
                  <NavLink to={ADMIN_REGISTRATION_ROUTE} className="nav-link">
                    Регистрация
                  </NavLink>
                </>
              ) : role === "HR" && isAuthenticated ? (
                <>
                  <NavLink to={TESTS_ROUTE} className="nav-link">
                    Тесты
                  </NavLink>
                </>
              ) : (
                <></>
              )}
            </Nav>
            <Nav className="buttons">
              {isAuthenticated ? (
                <>
                  <Button
                    className="br-0"
                    variant={"outline-light"}
                    onClick={handleLogout}
                  >
                    Выйти
                  </Button>
                  <Button
                    className="br-0"
                    variant={"outline-light"}
                    onClick={() => setShowNotifications(!showNotifications)} // Переключение отображения
                  >
                    {notifications.some(
                      (notification) => !notification.isRead
                    ) ? (
                      <i className="bi bi-bell-fill"></i>
                    ) : (
                      <i className="bi bi-bell"></i>
                    )}
                  </Button>
                  <NavLink to={PROFILE_ROUTE}>
                    <Image className="nav-img" src={userPic} />
                  </NavLink>
                </>
              ) : (
                <ButtonGroup>
                  <Button
                    className="br-0"
                    variant={"outline-light"}
                    onClick={() => navigate(LOGIN_ROUTE)}
                  >
                    Войти
                  </Button>
                  <Button
                    className="br-0"
                    variant={"outline-light"}
                    onClick={() => navigate(REGISTRATION_ROUTE)}
                  >
                    Регистрация
                  </Button>
                </ButtonGroup>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showNotifications && (
        <div className="notifications-container" ref={notificationsRef}>
          {notifications.length === 0 ? (
            <div>Нет оповещений</div>
          ) : (
            <>
              <ListGroup>
                {notifications.map((notification) => (
                  <ListGroup.Item key={notification.id}>
                    <div
                      style={{
                        fontWeight: notification.isRead ? "normal" : "bold",
                        cursor: "pointer",
                      }}
                      className="notification"
                      onClick={() => markAsReadOrToggle(notification.id)}
                    >
                      <p>{notification.title}</p>
                      <p>{notification.date}</p>
                      <p>{!notification.isRead && <i class="bi bi-circle-fill"
                      style={{ fontSize: "10px", color: "rgb(231, 135, 0)", marginLeft: "5px" }}></i>}</p> 
                    </div>
                    {notification.isOpen && <div>{notification.body}</div>}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {totalPages > 1 && (
                <Pagination className="mt-3">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default NavBar;
