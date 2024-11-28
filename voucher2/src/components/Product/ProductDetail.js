import React, { useEffect, useState } from 'react';
import TopBar from '../pages/TopBar';
import voucherService from '../services/voucherService';
import productService from '../services/productService';
import empresaService from '../services/empresaService';
import VoucherInfo from '../Voucher/VoucherInfo';
import VoucherForm from '../Voucher/VoucherForm';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [voucher, setVoucher] = useState(null);
    const [company, setCompany] = useState(null);
    const [clientData, setClientData] = useState({
        nome: '',
        sobrenome: '',
        cpf: '',
        celular: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showCreateVoucher, setShowCreateVoucher] = useState(false);
    const navigate = useNavigate();

    // Carregar os dados do produto, voucher e empresa
    useEffect(() => {
        async function fetchData() {
            try {
                const productData = await productService.getProductById(productId);
                setProduct(productData);

                const voucherData = await voucherService.getVoucherByProductId(productId);
                setVoucher(voucherData);

                if (productData && productData.companyId) {
                    const companyData = await empresaService.getCompanyById(productData.companyId);
                    setCompany(companyData);
                }
            } catch (error) {
                console.error('Erro ao carregar dados do produto', error);
                setMessage('Erro ao carregar as informações do produto. Tente novamente.');
            }
        }

        fetchData();
    }, [productId]);

    // Função para editar o produto
    const handleEdit = () => {
        navigate(`/editar-produto/${productId}`);
    };

    // Função para excluir o produto
    const handleDelete = async () => {
        try {
            await productService.deleteProduct(productId);
            alert('Produto excluído com sucesso!');
            navigate('/produtos');
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Não foi possível excluir o produto.');
        }
    };

    // Função para lidar com a mudança nos campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });
    };

    // Função para solicitar o voucher
    const handleVoucherRequest = async () => {
        if (!clientData.nome || !clientData.sobrenome || !clientData.cpf || !clientData.celular) {
            setMessage('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            await voucherService.obtainVoucher(productId, clientData);
            setMessage('Voucher solicitado com sucesso! Verifique seu celular.');
            setShowForm(false);
        } catch (error) {
            setMessage('Erro ao solicitar voucher. Verifique os dados e tente novamente.');
            console.error('Erro ao obter voucher:', error);
        } finally {
            setLoading(false);
        }
    };

    const [editingVoucher, setEditingVoucher] = useState(false);
    const [voucherData, setVoucherData] = useState({
        quantidade: voucher?.quantidade || '',
        dataInicial: voucher?.dataInicial || '',
        dataFinal: voucher?.dataFinal || '',
    });

    const handleVoucherUpdate = async () => {
        try {
            const updatedVoucher = {
                ...voucher,
                quantidade: voucherData.quantidade,
                dataInicial: voucherData.dataInicial,
                dataFinal: voucherData.dataFinal,
            };

            await voucherService.updateVoucher(voucher.id, updatedVoucher);
            setMessage('Voucher atualizado com sucesso!');
            setEditingVoucher(false);
            handleVoucherCreated(); // Atualiza a lista de vouchers
        } catch (error) {
            console.error('Erro ao atualizar voucher:', error);
            setMessage('Não foi possível atualizar o voucher. Tente novamente.');
        }
    };



    // Callback para atualizar os vouchers após criar um novo
    const handleVoucherCreated = async () => {
        const updatedVoucher = await voucherService.getVoucherByProductId(productId);
        setVoucher(updatedVoucher);
        setShowCreateVoucher(false); // Fecha o formulário após criação
    };

    if (!product) return <p>Carregando informações do produto...</p>;

    return (
        <div className="product-detail-page">
            <TopBar />

            <div className="product-detail-container">
                {/* Imagem do Produto */}
                <div className="product-image">
                    {product.imagemProdutoUrl ? (
                        <img src={product.imagemProdutoUrl} alt={product.nome} />
                    ) : (
                        <p>Imagem não disponível</p>
                    )}
                </div>

                {/* Informações do Produto */}
                <div className="product-info">
                    <h2>{product.nome}</h2>
                    <p>Descrição: {product.descricao}</p>
                    <p>Categoria: {product.categoria}</p>
                    <p>Preço: R$ {product.preco}</p>
                    <button onClick={handleEdit}>Editar Produto</button>
                    <button onClick={handleDelete}>Excluir Produto</button>

                    {/* Informações da Empresa */}
                    {company && (
                        <div className="company-info">
                            <h3>Informações da Empresa</h3>
                            <p>Nome: {company.razaoSocial}</p>
                            <p>CNPJ: {company.cnpj}</p>
                            <p>Endereço: {company.endereco}</p>
                        </div>
                    )}

                    {/* Informações do Voucher */}
                    {voucher ? (
                        <VoucherInfo voucher={voucher}/>
                    ) : (
                        <p className="no-voucher">Este produto não possui vouchers disponíveis.</p>
                    )}

                    {/* Botão para criar voucher */}
                    <button onClick={() => setShowCreateVoucher(true)}>Criar Voucher</button>
                    <button onClick={() => setEditingVoucher(true)}>Editar Voucher</button>

                    {/* Formulário de criação de voucher */}
                    {showCreateVoucher && (
                        <VoucherForm
                            productId={productId}
                            onVoucherCreated={handleVoucherCreated}
                            onClose={() => setShowCreateVoucher(false)}
                        />
                    )}
                    {editingVoucher && (
                        <div className="voucher-edit-form">
                            <h3>Editar Voucher</h3>
                            <input
                                type="number"
                                name="quantidade"
                                placeholder="Quantidade"
                                value={voucherData.quantidade}
                                onChange={(e) => setVoucherData({ ...voucherData, quantidade: e.target.value })}
                            />
                            <input
                                type="date"
                                name="dataInicial"
                                placeholder="Data Inicial"
                                value={voucherData.dataInicial}
                                onChange={(e) => setVoucherData({ ...voucherData, dataInicial: e.target.value })}
                            />
                            <input
                                type="date"
                                name="dataFinal"
                                placeholder="Data Final"
                                value={voucherData.dataFinal}
                                onChange={(e) => setVoucherData({ ...voucherData, dataFinal: e.target.value })}
                            />
                            <button onClick={handleVoucherUpdate}>Salvar Alterações</button>
                            <button onClick={() => setEditingVoucher(false)}>Cancelar</button>
                        </div>
                    )}


                    {/* Botão para obter voucher */}
                    <button onClick={() => setShowForm(true)} disabled={voucher?.esgotado}>
                        Obter Voucher
                    </button>
                </div>

                {/* Formulário para Obtenção de Voucher */}
                {showForm && (
                    <div className="voucher-form">
                        <h3>Obtenha seu Voucher</h3>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={clientData.nome}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="sobrenome"
                            placeholder="Sobrenome"
                            value={clientData.sobrenome}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="cpf"
                            placeholder="CPF"
                            value={clientData.cpf}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="celular"
                            placeholder="Celular"
                            value={clientData.celular}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleVoucherRequest} disabled={loading}>
                            {loading ? 'Solicitando...' : 'Enviar Voucher'}
                        </button>
                        {message && <p className="message">{message}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
