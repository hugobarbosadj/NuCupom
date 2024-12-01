package org.hugo.voucher2.repository;

import org.hugo.voucher2.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    Optional<Empresa> findByEmailOrCnpj(String email, String cnpj);

    Empresa findByEmail(String email);

    Empresa findByCnpj(String cnpj);

    // Buscar empresas por CEP
    List<Empresa> findByEndereco_Cep(String cep);

    // Buscar empresas por bairro
    List<Empresa> findByEndereco_Bairro(String bairro);
}

