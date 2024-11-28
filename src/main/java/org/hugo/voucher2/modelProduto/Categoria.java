package org.hugo.voucher2.modelProduto;

public enum Categoria {
        DOCES("Doces"),
        MASSAS("Massas"),
        ASSADOS("Assados"),
        PORCOES("Porções"),
        DRINKS("Bebidas"),
        CERVEJA("Cervejas");

        private final String descricao;

        Categoria(String descricao) {
                this.descricao = descricao;
        }

        public String getDescricao() {
                return descricao;
        }
}
