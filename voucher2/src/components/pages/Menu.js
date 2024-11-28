import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import ProductCard from "../ProductCard";
import './Menu.css';

const Menu = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                // Chamada à API para obter os produtos
                const data = await productService.getProdutos();
                setProdutos(data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    return (
        <div className="container my-4">
            <h1 className="mb-4">Me.Nu</h1>
            <div className="row">
                {produtos.length > 0 ? (
                    produtos.map(produto => (
                        <div key={produto.id} className="col-md-4 mb-4">
                            <ProductCard
                                id={produto.id}
                                nome={produto.nome}
                                empresa={produto.empresa.razaoSocial}
                                preco={produto.preco}
                                descricao={produto.descricao}
                                imagem={produto.imagemUrl}
                            />
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default Menu;
