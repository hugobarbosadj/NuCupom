import axios from 'axios';

const API_CEP = 'https://viacep.com.br/ws';
const API_URL = 'http://localhost:8080/api/empresa';

// Função auxiliar para obter o token do localStorage
const getToken = () => localStorage.getItem('token');

// Função auxiliar para configurar headers de autenticação
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

// Serviços relacionados à empresa
export const empresaService = {
    // Cadastro de empresa
    async registerCompany(data) {
        try {
            const formData = new FormData();

            // Adicionando os dados do objeto Empresa como JSON
            const empresaData = {
                razaoSocial: data.razaoSocial,
                cnpj: data.cnpj,
                nomeCompletoAdm: data.nomeAdm, // Corrigido nomeAdm
                email: data.email,
                senha: data.senha,
                endereco: {
                    rua: data.rua,
                    numero: data.numero,
                    bairro: data.bairro,
                    cidade: data.cidade,
                    estado: data.estado,
                    cep: data.cep,
                },
                telefone: data.telefone,
            };

            formData.append('empresa', JSON.stringify(empresaData));

            // Adiciona os arquivos separadamente
            if (data.logo) {
                formData.append('logo', data.logo);
            }
            if (data.fotoEmpresa) {
                formData.append('fotoEmpresa', data.fotoEmpresa);
            }

            const response = await axios.post(`${API_URL}/cadastrar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            return response.data;
        } catch (error) {
            console.error('Erro no serviço de cadastro de empresa:', error);
            throw error;
        }
    },

    // Obter informações da empresa
    async getEmpresaInfo() {
        try {
            const response = await axios.get(`${API_URL}/info`, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Erro ao obter informações da empresa:', error);
            throw error;
        }
    },

    // Obter lista de produtos da empresa
    async getProdutos() {
        try {
            const response = await axios.get(`${API_URL}/produtos`, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Erro ao obter lista de produtos:', error);
            throw error;
        }
    },

    // Excluir produto
    async deleteProduto(productId) {
        try {
            await axios.delete(`${API_URL}/produtos/${productId}`, getAuthHeaders());
        } catch (error) {
            console.error(`Erro ao excluir o produto com ID ${productId}:`, error);
            throw error;
        }
    },

    // Obter lista de vouchers da empresa
    async getVouchers() {
        try {
            const response = await axios.get(`${API_URL}/vouchers`, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Erro ao obter lista de vouchers:', error);
            throw error;
        }
    },

    // Criar novo voucher
    async createVoucher(voucherData) {
        try {
            const response = await axios.post(`${API_URL}/vouchers`, voucherData, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Erro ao criar voucher:', error);
            throw error;
        }
    },

    // Excluir voucher
    async deleteVoucher(voucherId) {
        try {
            await axios.delete(`${API_URL}/vouchers/${voucherId}`, getAuthHeaders());
        } catch (error) {
            console.error(`Erro ao excluir o voucher com ID ${voucherId}:`, error);
            throw error;
        }
    },
};

// Função independente para buscar informações do CEP
export async function buscarCep(cep) {
    try {
        const response = await axios.get(`${API_CEP}/${cep}/json`);
        if (response.data && !response.data.erro) {
            return response.data; // Retorna os dados do endereço
        } else {
            throw new Error('Endereço não encontrado para o CEP informado.');
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error.message);
        throw error;
    }
}

// Exportação do serviço principal
export default {
    async registerCompany(data){},
    createVoucher(voucherData) {
        return Promise.resolve(undefined);
    },
    deleteProduto(productId) {
        return Promise.resolve(undefined);
    },
    deleteVoucher(voucherId) {
        return Promise.resolve(undefined);
    },
    empresaService,
    getEmpresaInfo() {
        return Promise.resolve(undefined);
    },
    getProdutos() {
        return Promise.resolve(undefined);
    },
    getVouchers() {
        return Promise.resolve(undefined);
    },
    getToken

};