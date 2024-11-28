package org.hugo.voucher2.modelProduto;

import jakarta.persistence.*;
import org.hugo.voucher2.model.Empresa;

import java.math.BigDecimal;

@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String imagemProdutoUrl;

    @ManyToOne
    @JoinColumn(name = "empresa_id")
    private Empresa empresa;

    // Adicionando o campo de categoria//
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Categoria categoria;


    /* Getters e setters */

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public String getImagemProdutoUrl() {
        return imagemProdutoUrl;
    }

    public void setImagemProdutoUrl(String imagemProdutoUrl) {
        this.imagemProdutoUrl = imagemProdutoUrl;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

}

