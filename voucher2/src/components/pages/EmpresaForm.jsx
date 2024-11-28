import React, { useState } from "react";
import { EmpresaForm } from './EmpresaForm'; // Importe a função para enviar os dados

export default function EmpresaForm() {
    const [empresa, setEmpresa] = useState({
        razaoSocial: "", cnpj: "", nomeCompletoAdm: "", email: "", senha: "", endereco: "", telefone: ""
    });
    const [logo, setLogo] = useState(null);
    const [fotoEmpresa, setFotoEmpresa] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Chama a função empresaForm para enviar os dados
            const response = await empresaForm(empresa, logo, fotoEmpresa);
            alert("Empresa cadastrada com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar empresa:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Razão Social" value={empresa.razaoSocial} onChange={(e) => setEmpresa({ ...empresa, razaoSocial: e.target.value })} required />
            <input type="text" placeholder="CNPJ" value={empresa.cnpj} onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })} required />
            <input type="text" placeholder="Nome Completo ADM" value={empresa.nomeCompletoAdm} onChange={(e) => setEmpresa({ ...empresa, nomeCompletoAdm: e.target.value })} required />
            <input type="email" placeholder="Email" value={empresa.email} onChange={(e) => setEmpresa({ ...empresa, email: e.target.value })} required />
            <input type="password" placeholder="Senha" value={empresa.senha} onChange={(e) => setEmpresa({ ...empresa, senha: e.target.value })} required />
            <input type="text" placeholder="Endereço" value={empresa.endereco} onChange={(e) => setEmpresa({ ...empresa, endereco: e.target.value })} required />
            <input type="text" placeholder="Telefone" value={empresa.telefone} onChange={(e) => setEmpresa({ ...empresa, telefone: e.target.value })} required />

            <input type="file" onChange={(e) => setLogo(e.target.files[0])} accept="image/*" required />
            <input type="file" onChange={(e) => setFotoEmpresa(e.target.files[0])} accept="image/*" required />

            <button type="submit">Cadastrar Empresa</button>
        </form>
    );
}
