import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroProduto.css';

const API_URL = 'http://localhost:8080/produtos/cadastrar';

export const cadastroProduto = async (productData, imagemProduto) => {
    const formData = new FormData();
    formData.append('categoria', productData.categoria);
    formData.append('nome', productData.nome);
    formData.append('descricao', productData.descricao);
    formData.append('preco', productData.preco);
    formData.append('imagemProduto', imagemProduto);

    const response = await fetch(`${API_URL}/cadastrar`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Erro ao cadastrar o produto');
    }

    return response.json();
};

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
            const response = await cadastroProduto(formData, imagemProduto);
            setMensagem('Produto cadastrado com sucesso!');
            navigate(`/listar-produtos-por-empresa`);
        } catch (error) {
            setMensagem('Erro ao cadastrar produto. Tente novamente.');
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
                    placeholder="Preço"
                    value={formData.preco}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="file"
                    name="imagemProduto"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit">Cadastrar Produto</button>
                <button type="button" onClick={() => navigate('/listar-produtos-por-empresa')}>
                    Voltar
                </button>
            </form>
        </div>
    );
};

export default CadastroProduto;
