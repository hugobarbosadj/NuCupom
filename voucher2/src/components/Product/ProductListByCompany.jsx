// src/pages/ProductListByCompany.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import TopBar from '../components/pages/TopBar';
import './ProductListByCompany.css';

const ProductListByCompany = () => {
    const { empresaId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carregar produtos ao montar o componente
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProductsByCompany(empresaId);
                setProducts(data);
            } catch (err) {
                setError('Erro ao carregar produtos. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [empresaId]);

    // Função para excluir um produto
    const handleDelete = async (productId) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await productService.deleteProduct(productId);
                setProducts(products.filter((product) => product.id !== productId));
            } catch (err) {
                alert('Erro ao excluir o produto. Tente novamente.');
            }
        }
    };

    // Função para editar um produto
    const handleEdit = (productId) => {
        navigate(`/editar-produto/${productId}`);
    };

    // Função para adicionar um novo produto
    const handleAddProduct = () => {
        navigate('/adicionar-produto');
    };

    if (loading) {
        return <p>Carregando produtos...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="product-list-container">
            <TopBar /> {/* Inclui a TopBar na página */}
            <h2>Lista de Produtos da Empresa</h2>
            <button className="add-product-button" onClick={handleAddProduct}>
                Adicionar Produto
            </button>

            {products.length === 0 ? (
                <p>Nenhum produto cadastrado.</p>
            ) : (
                <ul className="product-list">
                    {products.map((product) => (
                        <li key={product.id} className="product-item">
                            <div className="product-image">
                                {product.imagemProdutoUrl ? (
                                    <img src={product.imagemProdutoUrl} alt={product.nome} />
                                ) : (
                                    <p>Sem imagem</p>
                                )}
                            </div>
                            <div className="product-details">
                                <h3>{product.nome}</h3>
                                <p>Categoria: {product.categoria}</p>
                                <p>Preço: R$ {product.preco}</p>
                                <p>Descrição: {product.descricao}</p>
                                <div className="product-actions">
                                    <button onClick={() => handleEdit(product.id)}>Editar</button>
                                    <button onClick={() => handleDelete(product.id)}>Excluir</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductListByCompany;
