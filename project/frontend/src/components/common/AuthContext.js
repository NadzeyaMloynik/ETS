import React, { createContext, useContext, useState } from 'react';
import UserService from '../service/UserService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.clear()
        UserService.logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
