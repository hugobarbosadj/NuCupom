import React, { useState } from 'react';
import empresaService from '../services/empresaService'; // Import único para evitar redundância
import './EmpresaForm.css';
import InputMask from 'react-input-mask';

const CadastroEmpresa = () => {
    const [formData, setFormData] = useState({
        razaoSocial: '',
        cnpj: '',
        nomeCompletoAdm: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        telefone: '',
        logo: null,
        fotoEmpresa: null,
        endereco: {
            cep: '',
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
        },
    });

    const [logoPreview, setLogoPreview] = useState(null);
    const [fotoEmpresaPreview, setFotoEmpresaPreview] = useState(null);

    // Atualiza os campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('endereco.')) {
            const field = name.split('.')[1];
            setFormData((prevState) => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    [field]: value,
                },
            }));

            if (field === 'cep') {
                const cepSemMascara = value.replace(/\D/g, '');
                if (cepSemMascara.length === 8) {
                    buscarCepAutomatico(value);
                }
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Upload de arquivos
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        setFormData((prevState) => ({ ...prevState, [name]: file }));

        if (name === 'logo') setLogoPreview(URL.createObjectURL(file));
        if (name === 'fotoEmpresa') setFotoEmpresaPreview(URL.createObjectURL(file));
    };

    // Busca o endereço automaticamente pelo CEP
    const isValidCep = (cep) => /^[0-9]{5}-[0-9]{3}$/.test(cep);

    const buscarCepAutomatico = async (cep) => {
        if (!isValidCep(cep)) {
            console.warn('CEP inválido. O formato deve ser XXXXX-XXX.');
            return;
        }

        try {
            const endereco = await empresaService.buscarCep(cep);
            setFormData((prevState) => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    rua: endereco.logradouro || '',
                    bairro: endereco.bairro || '',
                    cidade: endereco.localidade || '',
                    estado: endereco.uf || '',
                },
            }));
        } catch (error) {
            console.error('Erro ao buscar o CEP:', error);
            alert('CEP inválido ou erro ao buscar o endereço.');
        }
    };

    // Submissão do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação das senhas
        if (formData.senha !== formData.confirmarSenha) {
            alert('As senhas não coincidem. Tente novamente.');
            return;
        }

        // Verifique se os campos de endereço estão preenchidos
        const { endereco } = formData;
        if (!endereco || !endereco.cep || !endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.estado) {
            alert('Preencha todos os campos de endereço.');
            return;
        }

        const data = new FormData();

        // Adiciona os campos diretamente ao FormData
        data.append('razaoSocial', formData.razaoSocial);
        data.append('cnpj', formData.cnpj);
        data.append('nomeCompletoAdm', formData.nomeCompletoAdm);
        data.append('email', formData.email);
        data.append('senha', formData.senha);
        data.append('telefone', formData.telefone);
        data.append('endereco[cep]', formData.endereco.cep);
        data.append('endereco[rua]', formData.endereco.rua);
        data.append('endereco[numero]', formData.endereco.numero);
        data.append('endereco[bairro]', formData.endereco.bairro);
        data.append('endereco[cidade]', formData.endereco.cidade);
        data.append('endereco[estado]', formData.endereco.estado);

        // Adiciona arquivos
        if (formData.logo) data.append('logo', formData.logo);
        if (formData.fotoEmpresa) data.append('fotoEmpresa', formData.fotoEmpresa);

        try {
            await empresaService.registerCompany(data);
            alert('Cadastro realizado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar empresa:', error);
            alert('Falha no cadastro. Verifique os dados e tente novamente.');
        }
        console.log('FormData enviado:', formData);
        console.log('Endereço:', formData.endereco);

    };


    return (
        <div className="cadastro-empresa-container">
            <h2>Cadastro de Empresa</h2>
            <form onSubmit={handleSubmit} className="cadastro-empresa-form">
                <h3>Dados da Empresa</h3>
                <input
                    type="text"
                    name="razaoSocial"
                    placeholder="Razão Social"
                    value={formData.razaoSocial}
                    onChange={handleChange}
                    required
                />
                <InputMask
                    mask="99.999.999/9999-99"
                    name="cnpj"
                    placeholder="CNPJ"
                    value={formData.cnpj}
                    onChange={handleChange}
                    required
                >
                    {(inputProps) => <input {...inputProps} />}
                </InputMask>
                <input
                    type="text"
                    name="nomeCompletoAdm"
                    placeholder="Nome Completo do Administrador"
                    value={formData.nomeCompletoAdm}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmarSenha"
                    placeholder="Confirmar Senha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    required
                />

                <h3>Endereço</h3>
                <InputMask
                    mask="99999-999"
                    name="endereco.cep"
                    placeholder="CEP"
                    value={formData.endereco.cep}
                    onChange={handleChange}
                    required
                >
                    {(inputProps) => <input {...inputProps} />}
                </InputMask>
                <input
                    type="text"
                    name="endereco.rua"
                    placeholder="Rua"
                    value={formData.endereco.rua}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="endereco.numero"
                    placeholder="Número"
                    value={formData.endereco.numero}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="endereco.bairro"
                    placeholder="Bairro"
                    value={formData.endereco.bairro}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="endereco.cidade"
                    placeholder="Cidade"
                    value={formData.endereco.cidade}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="endereco.estado"
                    placeholder="Estado"
                    value={formData.endereco.estado}
                    onChange={handleChange}
                    required
                />

                <h3>Contato</h3>
                <InputMask
                    mask="(99) 99999-9999"
                    name="telefone"
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                >
                    {(inputProps) => <input {...inputProps} />}
                </InputMask>

                <h3>Imagens</h3>
                <div className="file-input">
                    <label>Logo da Empresa</label>
                    <input type="file" name="logo" onChange={handleFileChange} />
                    {logoPreview && <img src={logoPreview} alt="Prévia da Logo" className="preview-image" />}
                </div>
                <div className="file-input">
                    <label>Foto da Empresa</label>
                    <input type="file" name="fotoEmpresa" onChange={handleFileChange} />
                    {fotoEmpresaPreview && <img src={fotoEmpresaPreview} alt="Prévia da Foto" className="preview-image" />}
                </div>

                <button type="submit" className="btn-cadastrar">
                    Cadastrar Empresa
                </button>
            </form>
        </div>
    );
};

export default CadastroEmpresa;
