import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();



    return (
        <div>
            {product ? (
                <div>
                    <h2>{product.nome}</h2>
                    <p>Categoria: {product.categoria}</p>
                    <p>Descrição: {product.descricao}</p>
                    <p>Preço: R$ {product.preco.toFixed(2)}</p>
                    <img src={product.imagemUrl} alt={product.nome} style={{ width: '300px' }} />

                    <div style={{ marginTop: '20px' }}>
                        <button onClick={handleEdit} style={{ marginRight: '10px' }}>
                            Editar Produto
                        </button>
                        <button onClick={handleDelete} style={{ color: 'red' }}>
                            Excluir Produto
                        </button>
                    </div>
                </div>
            ) : (
                <p>Carregando detalhes do produto...</p>
            )}
        </div>
    );
};

export default ProductDetail;
