// src/components/Voucher/VoucherInfo.js
import React from 'react';

function VoucherInfo({ voucher }) {
    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR');
    };

    return (
        <div className="voucher-info">
            <h3>Voucher: {voucher.voucher}</h3>
            <p>Quantidade: {voucher.quantidade}</p>
            <p>Válido de {formatarData(voucher.dataInicial)} até {formatarData(voucher.dataFinal)}</p>
            {voucher.esgotado ? (
                <p className="esgotado">Esgotado</p>
            ) : (
                <p className="disponivel">Disponível</p>
            )}
        </div>
    );
}

export default VoucherInfo;
