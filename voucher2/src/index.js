// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/services/AuthContext';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// Obtendo o elemento root do DOM
const rootElement = document.getElementById('root');

// Criando a raiz do React com createRoot (React 18+)
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
            <ToastContainer />
        </AuthProvider>
    </React.StrictMode>
);

// Função para medir a performance (opcional)
reportWebVitals();
