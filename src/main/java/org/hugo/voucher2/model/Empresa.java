package org.hugo.voucher2.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hugo.voucher2.modelProduto.Produto;
import org.hugo.voucher2.service.CepServico;

import javax.xml.transform.Source;
import java.util.List;

@Entity
@Table(name = "empresas")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "A razão social é obrigatória.")
    private String razaoSocial;

    @NotNull(message = "CNPJ é obrigatório.")
    @Pattern(regexp = "[0-9]{2}\\.?[0-9]{3}\\.?[0-9]{3}/?[0-9]{4}\\-?[0-9]{2}", message = "CNPJ deve conter 14 dígitos.")
    private String cnpj;

    @NotBlank(message = "O nome completo do administrador é obrigatório.")
    private String nomeCompletoAdm;

    @NotBlank
    @Email(message = "Email inválido.")
    private String email;

    @NotBlank
    @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres.")
    private String senha;

    @Pattern(regexp = "\\(\\d{2}\\) \\d{4,5}-\\d{4}", message = "Telefone inválido.")
    private String telefone;

    @Embedded
    private Endereco endereco;

    private String logoUrl;
    private String fotoEmpresaUrl;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produto> produtos;

    // Métodos adicionais
    public void preencherEnderecoPorCep(CepServico cepServico) {
        if (this.endereco != null) {
            this.endereco.preencherEnderecoPorCep(cepServico);
        }
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getNomeCompletoAdm() {
        return nomeCompletoAdm;
    }

    public void setNomeCompletoAdm(String nomeCompletoAdm) {
        this.nomeCompletoAdm = nomeCompletoAdm;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getFotoEmpresaUrl() {
        return fotoEmpresaUrl;
    }

    public void setFotoEmpresaUrl(String fotoEmpresaUrl) {
        this.fotoEmpresaUrl = fotoEmpresaUrl;
    }

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }

}