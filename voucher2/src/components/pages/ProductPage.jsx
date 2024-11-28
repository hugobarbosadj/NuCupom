// src/pages/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import voucherService from '../services/voucherService';
import './ProductPage.css';

function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [voucher, setVoucher] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [clientData, setClientData] = useState({
        nome: '',
        sobrenome: '',
        cpf: '',
        celular: ''
    });

    useEffect(() => {
        async function fetchData() {
            const productData = await productService.getProductById(productId);
            setProduct(productData);

            const voucherData = await voucherService.getVoucherByProductId(productId);
            setVoucher(voucherData);
        }

        fetchData();
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (voucher && voucher.quantidade > 0) {
            try {
                // Chamar o serviço para obter o voucher e diminuir a quantidade
                await voucherService.obtainVoucher(productId, clientData);

                alert('Voucher enviado para o seu celular!');
                setShowForm(false);
            } catch (error) {
                alert('Erro ao obter o voucher. Tente novamente.');
                console.error(error);
            }
        } else {
            alert('Voucher indisponível.');
        }
    };

    if (!product) return <p>Carregando...</p>;

    return (
        <div className="product-page">
            <h1>{product.nome}</h1>
            <img src={product.imagemProdutoUrl} alt={product.nome} className="product-image" />
            <div className="product-details">
                <p><strong>Descrição:</strong> {product.descricao}</p>
                <p><strong>Categoria:</strong> {product.categoria}</p>
                <p><strong>Preço:</strong> R$ {product.preco}</p>
                <p><strong>Empresa:</strong> {product.empresa.razaoSocial}</p>
            </div>

            {voucher && (
                <div className="voucher-info">
                    <h3>Voucher Disponível</h3>
                    <p><strong>Código:</strong> {voucher.voucher}</p>
                    <p><strong>Quantidade:</strong> {voucher.quantidade}</p>
                    <button onClick={() => setShowForm(true)}>Obter Voucher</button>
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="voucher-form">
                    <h3>Informações do Cliente</h3>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={clientData.nome}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="sobrenome"
                        placeholder="Sobrenome"
                        value={clientData.sobrenome}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF"
                        value={clientData.cpf}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="celular"
                        placeholder="Celular"
                        value={clientData.celular}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Enviar Voucher</button>
                </form>
            )}
        </div>
    );
}

export default ProductPage;
