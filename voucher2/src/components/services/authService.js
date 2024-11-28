import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/login';

// Função de login
export const login = async (credentials) => {
    try {
        const response = await axios.post(API_URL, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Inclui cookies, caso necessário
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login:', error.response || error);
        throw error.response?.data || 'Erro ao tentar fazer login.';
    }
};
