// productService.js
import API from './api';


const productService = {
    addProduct: async (productData, imagemProduto) => {
        const formData = new FormData();
        formData.append('produto', JSON.stringify(productData));
        formData.append('imagemProduto', imagemProduto);
        formData.append('categoria', productData.categoria);
        formData.append('nome', productData.nome);
        formData.append('descricao', productData.descricao);
        formData.append('preco', productData.preco);

        try {
            const response = await API.post('/produtos/cadastrar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error.response?.data || error.message);
            throw error;
        }
    },
};

// Cadastrar novo produto
export const addProduct = async (empresaId, produtoData, imagemProduto) => {
    const formData = new FormData();
    formData.append('produto', JSON.stringify(produtoData));
    formData.append('imagemProduto', imagemProduto);

    const response = await API.post(`/api/empresa/${empresaId}/produto/cadastrar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Obter detalhes de um produto
export const getProductDetails = async (productId) => {
    const response = await API.get(`/api/produto/${productId}`);
    return response.data;
};

// Atualizar produto
export const updateProduct = async (empresaId, productId, produtoData, imagemProduto) => {
    const formData = new FormData();
    formData.append('produto', JSON.stringify(produtoData));
    formData.append('imagemProduto', imagemProduto);

    const response = await API.put(`/api/empresa/${empresaId}/produto/${productId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Excluir produto
export const deleteProduct = async (productId) => {
    await API.delete(`/api/produto/${productId}`);
};

export default productService;
