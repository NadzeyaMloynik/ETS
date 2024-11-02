import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    HOME_ROUTE,
    ADMIN_REGISTRATION_ROUTE
} from "./utils/consts"

import Admin from "./components/userspage/AdminPage"
// import Auth from "./components/userspage/Auth"
import Login from "./components/auth/LoginPage"
import Registration from "./components/auth/RegistrationPage"
import AdminRegistrationPage from "./components/userspage/AdminRegistrationPage"
// import Home from "./components/userspage/HomePage"

import React from "react";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin/>
    }
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin/>
    },
    {
        path: ADMIN_REGISTRATION_ROUTE,
        element: <AdminRegistrationPage/>
    }
]

export const userRoutes = [

]

export const hrRoutes = [
    
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <Login/>
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Registration/>
    },
    {
        path: HOME_ROUTE,
        element: <Login/>
    },
]