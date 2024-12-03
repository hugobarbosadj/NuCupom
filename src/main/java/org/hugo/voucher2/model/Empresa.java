package org.hugo.voucher2.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.hugo.voucher2.modelProduto.Produto;

import java.util.List;

@Entity
@Table(name = "empresas")
public class Empresa {

    // Getters e Setters
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @NotBlank(message = "A razão social é obrigatória.")
    private String razaoSocial;

    @Getter
    @Setter
    @NotNull(message = "CNPJ é obrigatório.")
    @Pattern(regexp ="[0-9]{2}\\.?[0-9]{3}\\.?[0-9]{3}/?[0-9]{4}\\-?[0-9]{2}", message = "CNPJ deve conter 14 dígitos.")
    private String cnpj;

    @Getter
    @Setter
    @NotBlank(message = "O nome completo do administrador é obrigatório.")
    private String nomeCompletoAdm;

    @Getter
    @Setter
    @NotBlank
    @Email(message = "Email inválido.")
    private String email;

    @Getter
    @Setter
    @NotBlank
    @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres.")
    private String senha;

    @Getter
    @Setter
    private String logoUrl;
    @Getter
    @Setter
    private String fotoEmpresaUrl;


    @Embedded
    @Valid
    private Endereco endereco;

    @Getter
    @Setter
    @Pattern(regexp = "\\(\\d{2}\\) \\d{4,5}-\\d{4}", message = "Telefone inválido.")
    private String telefone;

    @Getter
    @Setter
    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produto> produtos;


    public Endereco getEndereco() {
        if (getEndereco() == null) {
            throw new IllegalArgumentException("O endereço é obrigatório.");
        }

        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
        if (endereco != null) {
            endereco.preencherEnderecoPorCep();
        }
    }

}