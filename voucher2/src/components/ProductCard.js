import React from "react";
import PropTypes from "prop-types";
import "./ProductCard.css"; // Arquivo CSS opcional para estilo

const ProductCard = ({ id, nome, empresa, preco, descricao, children }) => {
    return (
        <div className="product-card">
            <h3>{empresa}</h3>
            <h4>{nome}</h4>
            <p>{descricao}</p>
            <span className="product-price">R$ {preco}</span>
            {/* Espaço para ações específicas */}
            {children}
        </div>
    );
};

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    empresa: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    descricao: PropTypes.string,
    imagem: PropTypes.string,
};

ProductCard.defaultProps = {
    descricao: "Sem descrição disponível",
    imagem: "https://via.placeholder.com/150", // Imagem padrão caso não exista
};

export default ProductCard;
