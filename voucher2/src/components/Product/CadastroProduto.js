import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroProduto.css';
import productService from '../services/productService';

const API_URL = 'http://localhost:8080/api/produtos';

const CadastroProduto = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        categoria: '',
        nome: '',
        descricao: '',
        preco: '',

    });
    const [imagemProduto, setImagemProduto] = useState(null);
    const [mensagem, setMensagem] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,

        });
    };

    const handleFileChange = (e) => {
        setImagemProduto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await productService.addProduct(formData, imagemProduto);
            setMensagem('Produto cadastrado com sucesso!');
            const produtoId = response.id;
            navigate(`/produto/${produtoId}`);
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error.message || error);
            const mensagemErro = error.response?.data?.message || 'Erro ao cadastrar produto. Verifique sua conexão.';
            setMensagem(`Erro: ${mensagemErro}`);
        }
    };


    return (
        <div className="cadastro-produto-container">
            <h2>Cadastro de Produto</h2>
            {mensagem && <p className="mensagem">{mensagem}</p>}
            <form onSubmit={handleSubmit} className="cadastro-produto-form">
                <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Selecione uma Categoria</option>
                    <option value="DOCES">Doces</option>
                    <option value="MASSAS">Massas</option>
                    <option value="ASSADOS">Assados</option>
                    <option value="PORCOES">Porções</option>
                    <option value="DRINKS">Drinks</option>
                    <option value="CERVEJA">Cerveja</option>
                </select>

                <input
                    type="text"
                    name="nome"
                    placeholder="Nome do Produto"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    name="descricao"
                    placeholder="Descrição do Produto"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="preco"
                    placeholder="Preço (R$)"
                    value={formData.preco}
                    step="0.01"
                    onChange={handleInputChange}
                    required
                />

                <h3>Imagem do Produto</h3>
                <input
                    type="file"
                    name="imagemProduto"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit">Cadastrar Produto</button>
                <button type="button" onClick={() => navigate('/empresa-dashboard')}>
                    Voltar
                </button>
            </form>
        </div>
    );
};

export default CadastroProduto;
