package org.hugo.voucher2.service;

import org.hugo.voucher2.model.Empresa;
import org.hugo.voucher2.modelProduto.Categoria;
import org.hugo.voucher2.modelProduto.Produto;
import org.hugo.voucher2.repository.EmpresaRepository;
import org.hugo.voucher2.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> buscarProdutosPorEmpresa(Long empresaId) {
        return produtoRepository.findByEmpresaId(empresaId);
    }

    public List<Produto> buscarProdutosPorCategoria(Categoria categoria) {
        return produtoRepository.findByCategoria(categoria);
    }

    public Produto salvarProduto(Produto produto, MultipartFile imagemProduto) throws IOException {
        if (imagemProduto != null && !imagemProduto.isEmpty()) {
            String fileName = imagemProduto.getOriginalFilename();
            Path path = Paths.get("uploads/produtos/" + fileName);
            Files.copy(imagemProduto.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            produto.setImagemProdutoUrl("/uploads/produtos/" + fileName);
        }

        return produtoRepository.save(produto);
    }

    public Produto getProdutoById(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    // Método cadastrarProduto
    public Produto cadastrarProduto(Long empresaId, Produto produto, MultipartFile imagemProduto) throws IOException {
        Optional<Empresa> empresaOptional = empresaRepository.findById(empresaId);
        if (empresaOptional.isEmpty()) {
            throw new RuntimeException("Empresa não encontrada");
        }

        Empresa empresa = empresaOptional.get();
        produto.setEmpresa(empresa);

        return salvarProduto(produto, imagemProduto);
    }
}