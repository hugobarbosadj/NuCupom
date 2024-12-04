package org.hugo.voucher2.modelProduto;

public class VoucherRequest {
        private Long voucherId; // Corrigido de productId para voucherId
        private Long productId;
        private String nome;
        private String sobrenome;
        private String cpf;
        private String celular;

        // Getters e Setters
        public Long getVoucherId() {
            return voucherId;
        }

    public void setVoucherId(Long voucherId) {
        this.voucherId = voucherId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }
}


