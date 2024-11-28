import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { toast } from 'react-toastify';
import { useAuthContext } from '../services/AuthContext';
import ProductCard from '../ProductCard'; // Importando o Card para visualização

const ProductListByCompany = () => {
    const [produtos, setProdutos] = useState([]);
    const { company } = useAuthContext(); // Pega a empresa logada do contexto
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Função para buscar os produtos da empresa
    useEffect(() => {
        const fetchProductsByCompany = async () => {
            setLoading(true);
            try {
                const data = await productService.getAllProductsByCompany(company.id);
                setProdutos(data);
            } catch (error) {
                toast.error('Erro ao buscar produtos da empresa.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsByCompany();
    }, [company.id]);

    // Navegar para a página de cadastro de produto
    const handleCadastrarProduto = () => {
        navigate('/cadastrar-produto');
    };

    // Navegar para a edição de um produto
    const handleEditarProduto = (id) => {
        navigate(`/editar-produto/${id}`);
    };

    // Excluir um produto
    const handleExcluirProduto = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await productService.deleteProduct(id);
                toast.success('Produto excluído com sucesso!');
                setProdutos(produtos.filter((produto) => produto.id !== id));
            } catch (error) {
                toast.error('Erro ao excluir produto.');
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h2>Produtos da Empresa</h2>
            <button onClick={handleCadastrarProduto}>Cadastrar Novo Produto</button>
            <div className="product-list">
                {loading ? (
                    <p>Carregando produtos...</p>
                ) : produtos.length > 0 ? (
                    produtos.map((produto) => (
                        <ProductCard
                            key={produto.id}
                            id={produto.id}
                            nome={produto.nome}
                            empresa={company.nome}
                            preco={produto.preco}
                            descricao={produto.descricao}
                        >
                            {/* Botões adicionais no card */}
                            <div className="card-actions">
                                <button onClick={() => handleEditarProduto(produto.id)}>Editar</button>
                                <button onClick={() => handleExcluirProduto(produto.id)}>Excluir</button>
                            </div>
                        </ProductCard>
                    ))
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default ProductListByCompany;
