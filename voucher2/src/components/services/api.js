// api.js
import axios from 'axios';

// Configuração inicial do Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/', // URL base para o servidor
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptador para adicionar o token de autenticação a todas as requisições
// Interceptador para adicionar o token de autenticação a todas as requisições (exceto para alguns endpoints)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Recupera o token do localStorage

        // Excluir o cabeçalho Authorization em endpoints específicos (como o de busca de CEP)
        if (!config.url.includes('/cep/buscar') && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


// Interceptador para tratamento de respostas ou erros globais
axiosInstance.interceptors.response.use(
    (response) => response.data, // Retorna os dados da resposta diretamente
    (error) => {
        const errorResponse = error.response || {};
        const errorMessage =
            errorResponse.data?.message || `Erro: ${errorResponse.status} - ${errorResponse.statusText}`;
        return Promise.reject(new Error(errorMessage));
    }
);


// Criação da instância axios
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Exemplo de uso da API
export const getAllProducts = () => api.get('/produtos');
export const getProductById = (id) => api.get(`/produtos/${id}`);
export const addProduct = (product) => api.post('/produtos', product);
export const updateProduct = (id, product) => api.put(`/produtos/${id}`, product);
export const deleteProduct = (id) => api.delete(`/produtos/${id}`);

// Exportação da instância `api`
export default api;
