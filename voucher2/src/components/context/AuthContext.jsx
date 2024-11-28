// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Criação do contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    // Função de login
    const login = async (loginData) => {
        try {
            const response = await fetch("http://localhost:8080/api/empresas/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                alert("Login falhou! Verifique suas credenciais.");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    // Função de logout
    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
