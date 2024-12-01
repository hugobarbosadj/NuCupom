import API from './api';

const empresaService = {
    // Cadastro de empresa
    async registerCompany(data) {

        if (!data.endereco) {
            throw new Error("O campo 'endereco' está ausente ou inválido.");
        }

        const formData = new FormData();
        // Adiciona os campos diretamente ao FormData
        formData.append('razaoSocial', data.razaoSocial);
        formData.append('cnpj', data.cnpj);
        formData.append('nomeCompletoAdm', data.nomeCompletoAdm);
        formData.append('email', data.email);
        formData.append('senha', data.senha);
        formData.append('telefone', data.telefone);

        // Adiciona os campos de endereço
        formData.append('endereco[cep]', data.endereco.cep);
        formData.append('endereco[rua]', data.endereco.rua);
        formData.append('endereco[numero]', data.endereco.numero);
        formData.append('endereco[bairro]', data.endereco.bairro);
        formData.append('endereco[cidade]', data.endereco.cidade);
        formData.append('endereco[estado]', data.endereco.estado);


        // Adicionar os campos do endereço individualmente
        Object.keys(data.endereco).forEach((key) => {
            formData.append(`endereco.${key}`, data.endereco[key]);
        });

        // Adicionar os arquivos (logo e foto da empresa)
        if (data.logo) formData.append('logo', data.logo);
        if (data.fotoEmpresa) formData.append('fotoEmpresa', data.fotoEmpresa);

        try {
            const response = await API.post('/empresa/cadastrar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao registrar empresa:', error.response?.data || error.message);
            throw error;
        }
    },


    // Obter informações da empresa por ID
    async getEmpresaInfo(empresaId) {
        try {
            const response = await API.get(`/empresa/${empresaId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter informações da empresa:', error.response?.data || error.message);
            throw error;
        }
    },


    // Atualizar dados da empresa
    async updateCompany(empresaId, data) {
        const formData = new FormData();
        formData.append('razaoSocial', data.razaoSocial);
        formData.append('cnpj', data.cnpj);
        formData.append('nomeCompletoAdm', data.nomeCompletoAdm);
        formData.append('email', data.email);
        formData.append('senha', data.senha);
        formData.append('logoUrl', data.logoUrl);
        formData.append('fotoEmpresaUrl', data.fotoEmpresaUrl);
        formData.append('endereco', JSON.stringify(data.endereco));
        formData.append('telefone', data.telefone);

        try {
            const response = await API.put(`/empresa/${empresaId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar empresa:', error.response?.data || error.message);
            throw error;
        }
    },

    // Obter lista de produtos de uma empresa
    async getProdutos(empresaId) {
        try {
            const response = await API.get(`/empresa/${empresaId}/produtos`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter lista de produtos:', error.response?.data || error.message);
            throw error;
        }
    },

    // Obter lista de vouchers da empresa
    async getVouchers(empresaId) {
        try {
            const response = await API.get(`/empresa/${empresaId}/vouchers`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter lista de vouchers:', error.response?.data || error.message);
            throw error;
        }
    },

    // Excluir empresa (opcional)
    async deleteCompany(empresaId) {
        try {
            await API.delete(`/empresa/${empresaId}`);
        } catch (error) {
            console.error(`Erro ao excluir a empresa com ID ${empresaId}:`, error.response?.data || error.message);
            throw error;
        }
    },

        // Buscar informações do CEP
        async buscarCep(cep) {
            try {
                const response = await API.get(`/cep/buscar?cep=${cep}`);
                return response.data;
            } catch (error) {
                console.error('Erro ao buscar CEP:', error.response?.data || error.message);
                throw error;
            }
    },
};


// Exportação do serviço principal
export default empresaService;
