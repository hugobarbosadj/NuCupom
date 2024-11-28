package org.hugo.voucher2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Pattern;

@Entity
public class Telefone {
    @Id
    private Long id;

    @Pattern(regexp = "\\d{2}", message = "O DDD deve conter 2 dígitos")
    private String ddd;
    @Pattern(regexp = "\\d{8,9}", message = "O número de telefone deve conter 8 ou 9 dígitos")
    private String numero;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDdd() {
        return ddd;
    }

    public void setDdd(String ddd) {
        this.ddd = ddd;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
}
