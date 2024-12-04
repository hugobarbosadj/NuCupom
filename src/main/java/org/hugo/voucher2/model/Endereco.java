package org.hugo.voucher2.model;

import jakarta.persistence.Embeddable;
import org.hugo.voucher2.service.CepServico;

@Embeddable
public class Endereco {
    private String rua;
    private String bairro;
    private String cidade; // Deve existir
    private String estado; // Deve existir
    private String cep;

    public void preencherEnderecoPorCep(CepServico cepServico) {
        if (this.cep != null && !this.cep.isEmpty()) {
            ViaCepResponse response = cepServico.buscarCep(this.cep);
            if (response != null) {
                this.rua = response.getLogradouro();
                this.bairro = response.getBairro();
                this.cidade = response.getLocalidade();
                this.estado = response.getUf();
            }
        }
    }
    //------ Validação de Endereço para saber se chama todos os campos corretos ------//
//    private void validarEndereco(Endereco endereco) {
//        if (endereco == null || endereco.getCep() == null || endereco.getCep().isEmpty()) {
//            throw new RuntimeException("O CEP do endereço é obrigatório.");
//        }
//        if (endereco.getRua() == null || endereco.getRua().isEmpty()) {
//            throw new RuntimeException("A rua do endereço é obrigatória.");
//        }
//        // Outras validações conforme necessário
//    }
//
    //Chamada para por no seviço de Atualizar
//    if (empresaAtualizada.getEndereco() != null) {
//        validarEndereco(empresaAtualizada.getEndereco());
//    }

    // Getters e Setters
    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
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

}
