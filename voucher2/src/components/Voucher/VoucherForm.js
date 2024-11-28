import React, { useState } from 'react';
import voucherService from '../services/voucherService';
import { toast } from 'react-toastify';

function VoucherForm({ productId, onClose, onVoucherCreated }) {
    const [voucher, setVoucher] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newVoucher = {
            voucher,
            quantidade,
            dataInicial,
            dataFinal,
            productId,
        };

        try {
            await voucherService.addVoucher(newVoucher);
            toast.success('Voucher criado com sucesso!');
            onVoucherCreated(); // Chama a função de callback para atualizar a lista de vouchers
            onClose(); // Fecha o modal/toolbar
        } catch (error) {
            toast.error('Erro ao criar o voucher. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="voucher-form">
            <h3>Criar Voucher</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome do Voucher"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Data Inicial"
                    value={dataInicial}
                    onChange={(e) => setDataInicial(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Data Final"
                    value={dataFinal}
                    onChange={(e) => setDataFinal(e.target.value)}
                    required
                />
                <button type="submit">Criar Voucher</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
}

export default VoucherForm;
