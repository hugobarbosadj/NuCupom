import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import voucherService from '../services/voucherService';
import empresaService from '../services/empresaService';

function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [voucher, setVoucher] = useState(null);
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await productService.getProductDetails(productId);
                setProduct(productData);

                const voucherData = await voucherService.getVouchersByProductId(productId);
                setVoucher(voucherData);

                if (productData?.empresaId) {
                    // Usando a função correta do serviço da empresa
                    const companyData = await empresaService.getEmpresaInfo();
                    setCompany(companyData);
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        fetchData();
    }, [productId]);

    if (!product) return <p>Carregando informações do produto...</p>;

    return (
        <div>
            <h1>{product.nome}</h1>
            <p>{product.descricao}</p>
            <p>Preço: R${product.preco}</p>

            {voucher && (
                <div>
                    <h2>Voucher</h2>
                    <p>Código: {voucher.codigo}</p>
                    <p>Quantidade: {voucher.quantidade}</p>
                    <p>Validade: {voucher.dataFinal}</p>
                </div>
            )}

            {company && (
                <div>
                    <h3>Informações da Empresa</h3>
                    <p>Nome: {company.nome}</p>
                    <p>CNPJ: {company.cnpj}</p>
                </div>
            )}
        </div>
    );
}

export default ProductPage;
