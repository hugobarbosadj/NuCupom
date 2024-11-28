package org.hugo.voucher2.repository;

import org.hugo.voucher2.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    // Métodos adicionais podem ser definidos aqui se necessário.
    Optional<Empresa> findByEmailOrCnpj(String email, String cnpj);
    Empresa findByEmail(String email);
    Empresa findByCnpj(String cnpj);

    }
