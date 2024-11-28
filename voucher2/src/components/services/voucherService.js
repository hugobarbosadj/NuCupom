import API from './api';

const voucherService = {
    // Obter lista de vouchers
    async getVouchers() {
        try {
            const response = await API.get('/vouchers');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar todos os vouchers:', error);
            throw error;
        }
    },

    // Obter vouchers por ID do produto
    async getVouchersByProductId(productId) {
        try {
            const response = await API.get(`/vouchers/produto/${productId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar vouchers por produto:', error);
            throw error;
        }
    },

    // Adicionar novo voucher
    async addVoucher(voucher) {
        try {
            const response = await API.post('/vouchers', voucher);
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar voucher:', error);
            throw error;
        }
    },

    // Atualizar voucher existente
    async updateVoucher(voucherId, updatedVoucher) {
        try {
            const response = await API.put(`/vouchers/${voucherId}`, updatedVoucher, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar voucher:', error);
            throw error.response?.data || 'Erro ao atualizar voucher';
        }
    },

    // Excluir voucher por ID
    async deleteVoucher(id) {
        try {
            await API.delete(`/vouchers/${id}`);
        } catch (error) {
            console.error('Erro ao deletar voucher:', error);
            throw error;
        }
    },

    // Obter um voucher para o cliente
    async obtainVoucher(voucherId, clientData) {
        try {
            const response = await API.post('/vouchers/obtain', {
                voucherId,
                ...clientData,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter voucher:', error);
            throw error;
        }
    },
};

export default voucherService;
