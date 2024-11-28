import React, { useEffect, useState } from 'react';
import voucherService from '../services/voucherService'; // Atualizado
import { useNavigate } from 'react-router-dom';
import './EmpresaDashboard.css';
import { useAuthContext } from '../services/AuthContext';

const EmpresaDashboard = () => {
    const [vouchers, setVouchers] = useState([]);
    const navigate = useNavigate();
    const { empresaId } = useAuthContext();

    // Função para buscar os vouchers
    const fetchVouchers = async () => {
        try {
            const data = await voucherService.getVouchers(); // Atualizado
            setVouchers(data);
        } catch (error) {
            console.error('Erro ao buscar vouchers:', error);
            alert('Erro ao carregar vouchers. Verifique sua conexão.');
        }
    };

    // Função para deletar um voucher
    const handleDeleteVoucher = async (voucherId) => {
        if (window.confirm('Tem certeza que deseja excluir este voucher?')) {
            try {
                await voucherService.deleteVoucher(voucherId); // Atualizado
                alert('Voucher excluído com sucesso.');
                fetchVouchers(); // Atualiza a lista de vouchers
            } catch (error) {
                console.error('Erro ao excluir voucher:', error);
                alert('Erro ao excluir voucher.');
            }
        }
    };

    // Carregar vouchers ao montar o componente
    useEffect(() => {
        fetchVouchers();
    }, []);


    return (
        <div className="empresa-dashboard">
            <h1>Dashboard da Empresa</h1>
            <button onClick={() => navigate('/cadastrar-produto')}>Cadastrar Produto</button>
            <h2></h2>
            <button onClick={() => navigate(`/produtos/listar/${empresaId}`)}>Listar Produtos</button>

            <h2>Vouchers Criados</h2>
            <table className="voucher-table">
                <thead>
                <tr>
                    <th>Voucher</th>
                    <th>Quantidade</th>
                    <th>Data Inicial</th>
                    <th>Data Final</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {vouchers.map((voucher) => (
                    <tr key={voucher.id}>
                        <td>{voucher.voucher}</td>
                        <td>{voucher.quantidade}</td>
                        <td>{voucher.dataInicial}</td>
                        <td>{voucher.dataFinal}</td>
                        <td>
                            <button onClick={() => handleDeleteVoucher(voucher.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmpresaDashboard;
