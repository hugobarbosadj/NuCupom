package org.hugo.voucher2.repository;

import org.hugo.voucher2.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    Empresa findByCnpj(String cnpj);

    // Buscar empresas por CEP
    List<Empresa> findByEnderecoCep(String cep); // Correto com o novo mapeamento

    // Buscar empresas por cidade e estado
    List<Empresa> findByEnderecoCidadeAndEnderecoEstado(String cidade, String estado);
}


