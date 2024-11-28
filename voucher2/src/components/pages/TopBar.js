import React, { useState } from 'react';
import { login as authLogin } from "../services/authService";
import { useAuthContext } from "../services/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import './TopBar.css';

const TopBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginInput, setLoginInput] = useState('');
    const [senhaInput, setSenhaInput] = useState('');
    const [error, setError] = useState('');
    const { token, login, logout } = useAuthContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setError('');

    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authLogin(loginInput, senhaInput);
            login(response.token);
            navigate('/dashboard');
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao fazer login:', error.response?.data || error.message);
            setError('Login ou senha inválidos.');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="topbar">
            <Link to="/">
                <img
                    src="/images/logo.png"
                    alt="Logo da Empresa"
                    className="logo"
                />
            </Link>

            <h1>N U. C U P O M</h1>

            <div>
                {token ? (
                    <button onClick={handleLogout}>Sair</button>
                ) : (
                    <button onClick={handleOpenModal}>Entrar</button>
                )}
            </div>

            {!token && isModalOpen && (
                <div className="login-modal">
                    <form onSubmit={handleLogin}>
                        <div className="modal-title">N U. C U P O M</div>

                        <div>
                            <label htmlFor="loginInput">Login (CNPJ/Email):</label>
                            <input
                                id="loginInput"
                                type="text"
                                value={loginInput}
                                onChange={(e) => setLoginInput(e.target.value)}
                                placeholder="Digite seu CNPJ ou Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="senhaInput">Senha:</label>
                            <input
                                id="senhaInput"
                                type="password"
                                value={senhaInput}
                                onChange={(e) => setSenhaInput(e.target.value)}
                                placeholder="Digite sua senha"
                            />
                        </div>
                        <button type="submit">Entrar</button>
                        <button type="button" onClick={handleCloseModal}>
                            Cancelar
                        </button>

                        {error && <p style={{color: "red"}}>{error}</p>}
                    </form>
                </div>
            )}
            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Buscar produtos, empresas ou cidades..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        🔍
                    </button>
                </form>
            </div>
        </div>

    );
};

export default TopBar;
