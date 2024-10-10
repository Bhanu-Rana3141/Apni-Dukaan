import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode as jwt_decode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        user: null,
    });

    // Checking token in localStorage on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwt_decode(token);
                setAuthState({
                    token,
                    user: decoded, 
                });
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwt_decode(token);
        setAuthState({
            token,
            user: decoded,
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            token: null,
            user: null,
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
