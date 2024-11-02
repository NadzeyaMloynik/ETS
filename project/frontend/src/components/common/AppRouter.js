import { Route, Routes, Navigate } from "react-router-dom";
import { adminRoutes, authRoutes, publicRoutes } from "../../routes";
import { LOGIN_ROUTE } from "../../utils/consts";
import UserService from "../service/UserService";
import React, { useState, useEffect } from "react";

const AppRouter = () => {
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
      console.log("Updated profileInfo:", response.ourUsers);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };
  return (
    <Routes>
      {profileInfo.role === "ADMIN" &&
        adminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}

      {profileInfo.isAuthenticated &&
        authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}

      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} exact />
      ))}
      {/* <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} exact /> */}
    </Routes>
  );
};

export default AppRouter;
