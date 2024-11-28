import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import productService from '../services/productService';
import ProductCard from "../ProductCard";

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                if (query) {
                    // Chamada à API para buscar produtos com base na query
                    const data = await productService.searchProdutos(query);
                    setProdutos(data);
                }
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, [query]);

    return (
        <div className="container my-4">
            <h1 className="mb-4">Resultados da Busca</h1>
            {query ? (
                <>
                    <p>Exibindo resultados para: <strong>{query}</strong></p>
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
                            <p>Nenhum produto encontrado para sua busca.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Digite algo na barra de busca para começar.</p>
            )}
        </div>
    );
};

export default SearchResults;
