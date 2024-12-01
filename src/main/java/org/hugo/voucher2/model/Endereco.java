package org.hugo.voucher2.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hugo.voucher2.service.CepServico;

@Embeddable
public class Endereco {

    @NotBlank(message = "A rua é obrigatória.")
    private String rua;

    private Integer numero;

    @NotBlank(message = "O bairro é obrigatório.")
    private String bairro; // Adicionado o atributo bairro

    @NotBlank(message = "A cidade é obrigatória.")
    private String cidade;

    @NotBlank(message = "O estado é obrigatório.")
    @Size(min = 2, max = 2, message = "O estado deve ter 2 caracteres.")
    private String estado;

    @Pattern(regexp = "\\d{5}-\\d{3}", message = "CEP inválido.")
    private String cep;

    @Transient
    private CepServico cepService; // Injetar via Spring ou manualmente

    public void preencherEnderecoPorCep() {
        if (cep != null) {
            ViaCepResponse response = cepService.buscarCep(cep);
            if (response != null) {
                this.rua = response.getLogradouro();
                this.bairro = response.getBairro(); // Adicionado preenchimento do bairro
                this.cidade = response.getLocalidade();
                this.estado = response.getUf();
            }
        }
    }

    // Getters e Setters

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public CepServico getCepService() {
        return cepService;
    }

    public void setCepService(CepServico cepService) {
        this.cepService = cepService;
    }
}
