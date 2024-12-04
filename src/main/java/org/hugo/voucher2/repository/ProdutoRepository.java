package org.hugo.voucher2.repository;

import org.hugo.voucher2.modelProduto.Categoria;
import org.hugo.voucher2.modelProduto.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByEmpresaId(Long empresaId);
//    List<Produto> findByCategoria(Categoria categoria);
}
