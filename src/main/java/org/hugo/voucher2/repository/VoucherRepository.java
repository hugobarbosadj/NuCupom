package org.hugo.voucher2.repository;

import org.hugo.voucher2.modelVoucher.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    // Busca os vouchers associados a um produto específico
    List<Voucher> findByProdutoId(Long produtoId);

    // Verifica se o voucher está disponível (quantidade > 0)
//    default boolean verificarDisponibilidade(Long id) {
//        return findById(id).map(voucher -> voucher.getQuantidade() > 0).orElse(false);
//    }

    // Atualiza a quantidade de vouchers diminuindo em 1
//    @Transactional
//    @Modifying
//    @Query("UPDATE Voucher v SET v.quantidade = v.quantidade - 1 WHERE v.id = :id AND v.quantidade > 0")
//    int diminuirQuantidade(Long id);
//
//    // Verifica se o voucher está esgotado (quantidade <= 0)
//    @Query("SELECT CASE WHEN v.quantidade <= 0 THEN true ELSE false END FROM Voucher v WHERE v.id = :id")
//    boolean isEsgotado(Long id);
//
//    // Busca um voucher pelo código
//    Optional<Voucher> findByVoucher(String voucherCode);
}
