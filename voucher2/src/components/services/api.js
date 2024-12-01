// api.js
import axios from 'axios';


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
