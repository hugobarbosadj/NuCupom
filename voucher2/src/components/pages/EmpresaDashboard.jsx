import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmpresaInfo, getProdutos, getVouchers, createVoucher, deleteVoucher } from '../services/empresaService';
import './EmpresaDashboard.css';

const EmpresaDashboard = () => {
    const [empresa, setEmpresa] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [newVoucher, setNewVoucher] = useState({ codigo: '', quantidade: '', dataInicial: '', dataFinal: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empresaData = await getEmpresaInfo();
                const produtosData = await getProdutos();
                const vouchersData = await getVouchers();
                setEmpresa(empresaData);
                setProdutos(produtosData);
                setVouchers(vouchersData);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };
        fetchData();
    }, []);

    // Função para criar um novo voucher
    const handleCreateVoucher = async () => {
        try {
            await createVoucher(newVoucher);
            setVouchers([...vouchers, newVoucher]);
            setNewVoucher({ codigo: '', quantidade: '', dataInicial: '', dataFinal: '' });
            alert("Voucher criado com sucesso!");
        } catch (error) {
            alert("Erro ao criar voucher.");
        }
    };

    // Função para excluir um voucher
    const handleDeleteVoucher = async (voucherId) => {
        try {
            await deleteVoucher(voucherId);
            setVouchers(vouchers.filter((voucher) => voucher.id !== voucherId));
            alert("Voucher excluído com sucesso!");
        } catch (error) {
            alert("Erro ao excluir o voucher.");
        }
    };

    return (
        <div className="empresa-dashboard">
            <h1>Dashboard da Empresa</h1>

            {empresa && (
                <div className="empresa-info">
                    <h2>Informações da Empresa</h2>
                    <p><strong>Razão Social:</strong> {empresa.razaoSocial}</p>
                    <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
                    <p><strong>Email:</strong> {empresa.email}</p>
                </div>
            )}

            <div className="vouchers-section">
                <h2>Gerenciar Vouchers</h2>

                <div className="create-voucher">
                    <h3>Criar Novo Voucher</h3>
                    <input
                        type="text"
                        placeholder="Código"
                        value={newVoucher.codigo}
                        onChange={(e) => setNewVoucher({ ...newVoucher, codigo: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Quantidade"
                        value={newVoucher.quantidade}
                        onChange={(e) => setNewVoucher({ ...newVoucher, quantidade: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Data Inicial"
                        value={newVoucher.dataInicial}
                        onChange={(e) => setNewVoucher({ ...newVoucher, dataInicial: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Data Final"
                        value={newVoucher.dataFinal}
                        onChange={(e) => setNewVoucher({ ...newVoucher, dataFinal: e.target.value })}
                    />
                    <button onClick={handleCreateVoucher}>Criar Voucher</button>
                </div>

                <ul>
                    {vouchers.map((voucher) => (
                        <li key={voucher.id}>
                            <span>{voucher.codigo} - Quantidade: {voucher.quantidade}</span>
                            <button onClick={() => handleDeleteVoucher(voucher.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EmpresaDashboard;
