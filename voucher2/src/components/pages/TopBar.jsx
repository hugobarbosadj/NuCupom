import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';
import { login } from '../services/authService';

const TopBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loginData, setLoginData] = useState({
        login: "", // CNPJ ou email
        senha: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Função para abrir o modal de login
    const handleOpenLogin = () => setShowLogin(true);

    // Função para fechar o modal de login
    const handleCloseLogin = () => {
        setShowLogin(false);
        setError("");
    };

    // Função para lidar com o envio do formulário de login
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(loginData);
            localStorage.setItem("token", response.token);
            setIsLoggedIn(true);
            setShowLogin(false);
            alert("Login realizado com sucesso!");
            navigate('/empresa-dashboard');
        } catch (error) {
            setError("Login ou senha inválidos.");
        }
    };

    // Função para tratar mudanças nos inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Função para tratar a mudança no campo de busca
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        // Filtragem dos dados com base na consulta
        const filteredResults = data.filter((item) =>
            item.empresa.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.cidade.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.produto.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.cep.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    return (
        <header className="topbar">
            <div className="logo-container">
                <img src="/images/logo.png" alt="Nome da Empresa" className="logo" />
                <span className="company-name">Nome da Empresa</span>
            </div>

            {/* Barra de Pesquisa dentro da TopBar */}
            <div className="search-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Pesquisar empresa, cidade, produto, categoria, CEP..."
                    className="search-input"
                />
                {searchQuery && searchResults.length > 0 && (
                    <div className="search-results">
                        <ul>
                            {searchResults.map((item, index) => (
                                <li key={index}>
                                    <strong>Empresa:</strong> {item.empresa} <br />
                                    <strong>Cidade:</strong> {item.cidade} <br />
                                    <strong>Produto:</strong> {item.produto} <br />
                                    <strong>Categoria:</strong> {item.categoria} <br />
                                    <strong>CEP:</strong> {item.cep}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="login-section">
                {isLoggedIn ? (
                    <span className="login-link">Empresa</span>
                ) : (
                    <div onClick={handleOpenLogin} className="login-link">
                        <i className="fas fa-user-circle"></i> Entrar
                    </div>
                )}
            </div>
        </header>
    );
};

export default TopBar;
