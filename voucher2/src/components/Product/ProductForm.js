// src/pages/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { toast } from 'react-toastify';
import { useAuthContext } from '../services/AuthContext';

const ProductForm = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({ nome: '', preco: 0 });

    useEffect(() => {
        if (productId) {
            productService.getProductById(productId)
                .then((data) => setProduct(data))
                .catch((error) => toast.error('Erro ao carregar o produto.'));
        }
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product.preco <= 0) {
            alert('O preço deve ser maior que zero.');
            return;
        }

        try {
            if (productId) {
                await productService.updateProduct(productId, product);
                toast.success('Produto atualizado com sucesso!');
            } else {
                await productService.addProduct(product);
                toast.success('Produto adicionado com sucesso!');
            }
            navigate('/produtos-empresa');
        } catch (error) {
            toast.error('Erro ao salvar o produto.');
            console.error(error);
        }
    };

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (productId) {
            setIsLoading(true);
            productService.getProductById(productId)
                .then(setProduct)
                .finally(() => setIsLoading(false));
        }
    }, [productId]);


    return (
        <div>
            <h2>{productId ? 'Editar Produto' : 'Adicionar Produto'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Categoria:</label>
                    <select name="categoria" value={product.categoria} onChange={handleInputChange}>
                        <option value="">Selecione</option>
                        <option value="Doces">Doces</option>
                        <option value="Massas">Massas</option>
                        <option value="Assados">Assados</option>
                        <option value="Porções">Porções</option>
                        <option value="Drinks">Drinks</option>
                        <option value="Cerveja">Cerveja</option>
                    </select>
                </div>

                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={product.nome}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        name="preco"
                        value={product.preco}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default ProductForm;
