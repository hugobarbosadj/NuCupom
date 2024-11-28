// src/pages/EditProduct.js
import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProduct.css'

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        nome: '',
        categoria: '',
        descricao: '',
        preco: '',
    });
    const [imagemProduto, setImagemProduto] = useState(null);

    // Carregar detalhes do produto
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Erro ao carregar dados do produto:', error);
            }
        };

        fetchProduct();
    }, [id]);

    // Manipulação das mudanças no formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImagemProduto(e.target.files[0]);
    };

    // Função para salvar o produto
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('nome', product.nome);
            formData.append('categoria', product.categoria);
            formData.append('descricao', product.descricao);
            formData.append('preco', product.preco);
            if (imagemProduto) {
                formData.append('imagemProduto', imagemProduto);
            }

            await productService.updateProduct(id, formData);
            alert('Produto atualizado com sucesso!');
            navigate(`/produto/${id}`);
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            alert('Não foi possível salvar o produto. Tente novamente.');
        }
    };


    return (
        <div>
            <h2>Editar Produto</h2>
            <form onSubmit={handleSave}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={product.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Categoria:</label>
                    <select
                        name="categoria"
                        value={product.categoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        <option value="Doces">Doces</option>
                        <option value="Massas">Massas</option>
                        <option value="Assados">Assados</option>
                        <option value="Porções">Porções</option>
                        <option value="Drinks">Drinks</option>
                        <option value="Cerveja">Cerveja</option>
                    </select>
                </div>

                <div>
                    <label>Descrição:</label>
                    <textarea
                        name="descricao"
                        value={product.descricao}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="preco"
                        value={product.preco}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Imagem do Produto:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <button type="submit">Salvar Alterações</button>
                <button type="button" onClick={() => navigate(`/produto/${id}`)}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
