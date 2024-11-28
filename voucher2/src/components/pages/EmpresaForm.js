import React, { useState } from 'react';
import empresaService, { buscarCep } from '../services/empresaService'; // Import único
import './EmpresaForm.css';
import InputMask from 'react-input-mask';

const CadastroEmpresa = () => {
    const [formData, setFormData] = useState({
        razaoSocial: '',
        cnpj: '',
        nomeAdm: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        telefone: '',
        logo: null,
        fotoEmpresa: null,
    });

    const [logoPreview, setLogoPreview] = useState(null);
    const [fotoEmpresaPreview, setFotoEmpresaPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        setFormData({ ...formData, [name]: file });

        if (name === 'logo') setLogoPreview(URL.createObjectURL(file));
        if (name === 'fotoEmpresa') setFotoEmpresaPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmarSenha) {
            alert('As senhas não coincidem. Tente novamente.');
            return;
        }

        try {
            await empresaService.registerCompany(formData);
            alert('Cadastro realizado com sucesso!');
            console.log('passou no await')
        } catch (error) {
            console.error('Erro ao cadastrar empresa:', error);
            alert('Falha no cadastro. Verifique os dados e tente novamente.');
        }
    };

    const handleCepBlur = async (e) => {
        const cep = e.target.value;

        if (!cep || cep.length !== 8) {
            console.error('CEP inválido ou vazio.');
            return;
        }

        try {
            const endereco = await buscarCep(cep);

            if (endereco) {
                setFormData((prevData) => ({
                    ...prevData,
                    rua: endereco.logradouro || '',
                    bairro: endereco.bairro || '',
                    cidade: endereco.localidade || '',
                    estado: endereco.uf || '',
                }));
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error.message);
        }
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
                    name="nomeAdm"
                    placeholder="Nome Completo do Administrador"
                    value={formData.nomeAdm}
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
                <input
                    type="text"
                    name="cep"
                    placeholder="CEP"
                    value={formData.cep}
                    onChange={handleChange}
                    onBlur={handleCepBlur}
                />
                <input
                    type="text"
                    name="cidade"
                    placeholder="Cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="estado"
                    placeholder="Estado"
                    value={formData.estado}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="rua"
                    placeholder="Rua"
                    value={formData.rua}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="numero"
                    placeholder="Número"
                    value={formData.numero}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="bairro"
                    placeholder="Bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                />

                <h3>Contato</h3>
                <InputMask
                    mask="(99) 99999-9999"
                    name="telefone"
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                >
                    {(inputProps) => <input {...inputProps} />}
                </InputMask>

                <h3>Imagens</h3>
                <div className="file-input">
                    <label>Logo da Empresa </label>
                    <input type="file" name="logo" onChange={handleFileChange} />
                    {logoPreview && <img src={logoPreview} alt="Prévia da Logo" className="preview-image" />}
                </div>
                <div className="file-input">
                    <label>Foto da Empresa </label>
                    <input type="file" name="fotoEmpresa" onChange={handleFileChange} />
                    {fotoEmpresaPreview && (
                        <img src={fotoEmpresaPreview} alt="Prévia da foto da empresa" className="preview-image" />
                    )}
                </div>

                <button type="submit" className="btn-cadastrar">
                    Cadastrar Empresa
                </button>
            </form>
        </div>
    );
};

export default CadastroEmpresa;
