import { Route, Routes, Navigate } from "react-router-dom";
import { adminRoutes, hrRoutes, publicRoutes, userRoutes } from "../../routes";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";
import UserService from "../service/UserService";
import React, { useState, useEffect } from "react";
import { useAuth } from "../common/AuthContext";
import WaitingComponent from "./WaitingComponent";

const AppRouter = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
  }, [isAuthenticated]);

  return (
    <Routes>
      {localStorage.getItem("role") === "ADMIN" &&
        adminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}

        {localStorage.getItem("role") === "HR" &&
        hrRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}

        {localStorage.getItem("role") === "USER" &&
        userRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}

        {publicRoutes
        .filter(
          ({ path }) =>
            path !== REGISTRATION_ROUTE || profileInfo.role !== "ADMIN"
        )
        .map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}
        
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} exact />
      ))}
      <Route path="*" element={<Navigate to={HOME_ROUTE} />} exact />
    </Routes>
  );
};

export default AppRouter;
