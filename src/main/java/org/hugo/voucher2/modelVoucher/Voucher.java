package org.hugo.voucher2.modelVoucher;

import jakarta.persistence.*;
import org.hugo.voucher2.modelProduto.Produto;

import java.time.LocalDate;

@Entity
@Table(name = "vouchers")
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String voucher;
    private Double quantidade;
    private LocalDate dataInicial;
    private LocalDate dataFinal;

    private boolean esgotado; // Indica se o voucher está esgotado


    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;


    // Getters e setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public String getVoucher() {
        return voucher;
    }

    public void setVoucher(String voucher) {
        this.voucher = voucher;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    public LocalDate getDataInicial() {
        return dataInicial;
    }

    public void setDataInicial(LocalDate dataInicial) {
        this.dataInicial = dataInicial;
    }

    public LocalDate getDataFinal() {
        return dataFinal;
    }

    public void setDataFinal(LocalDate dataFinal) {
        this.dataFinal = dataFinal;
    }

    public boolean isEsgotado() {  // Getter para esgotado
        return esgotado;
    }

    public void setEsgotado(boolean esgotado) {  // Setter para esgotado
        this.esgotado = esgotado;

    }
}
