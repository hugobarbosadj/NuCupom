// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Criar o contexto de autenticação
export const AuthContext = createContext();

// Componente AuthProvider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Função de login
    const login = (userData) => {
        setUser(userData);
        setToken(userData.token);
        localStorage.setItem('token', userData.token);
    };

    // Função de logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para acessar o contexto de autenticação
export const useAuthContext = () => useContext(AuthContext);
