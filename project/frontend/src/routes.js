import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    HOME_ROUTE,
    ADMIN_REGISTRATION_ROUTE,
    USER_UPDATE_ROUTE,
    PROFILE_ROUTE,
    PROFILE_UPDATE_ROUTE,
    TESTS_ROUTE,
    QUESTION_ROUTE,
    PASS_TEST_ROUTE,
    TEST_RESULTS
} from "./utils/consts"

import Admin from "./components/userspage/UserManagementPage"
import Login from "./components/auth/LoginPage"
import Registration from "./components/auth/RegistrationPage"
import AdminRegistrationPage from "./components/userspage/AdminRegistrationPage"
import UserProfilePage from "./components/userspage/UserProfilePage"
import TestsPage from "./components/userspage/TestPage"
import QuestionsPage from "./components/userspage/QuestionsPage"

import React from "react";
import UserUpdatePage from "./components/userspage/UserUpdatePage"
import PassTestPage from "./components/userspage/PassTestPage"
import TestResultPage from "./components/userspage/TestResultsPage"
import HomePage from "./components/userspage/HomePage"

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin/>
    },
    {
        path: ADMIN_REGISTRATION_ROUTE,
        element: <AdminRegistrationPage/>
    },
    {
        path: USER_UPDATE_ROUTE,
        element: <UserUpdatePage/>
    },
    {
        path: PROFILE_ROUTE,
        element: <UserProfilePage/>
    },
    {
        path: PROFILE_UPDATE_ROUTE,
        element: <UserUpdatePage/>
    },
]

export const userRoutes = [
    {
        path: PROFILE_ROUTE,
        element: <UserProfilePage/>
    },
    {
        path: PROFILE_UPDATE_ROUTE,
        element: <UserUpdatePage/>
    },
    {
        path: PASS_TEST_ROUTE,
        element: <PassTestPage/>
    },
]

export const hrRoutes = [
    {
        path: PROFILE_ROUTE,
        element: <UserProfilePage/>
    },
    {
        path: PROFILE_UPDATE_ROUTE,
        element: <UserUpdatePage/>
    },
    {
        path: TESTS_ROUTE,
        element: <TestsPage/>
    },
    {
        path: QUESTION_ROUTE,
        element: <QuestionsPage/>
    },
    {
        path: TEST_RESULTS,
        element: <TestResultPage/>
    }
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
        element: <HomePage/>
    },
]