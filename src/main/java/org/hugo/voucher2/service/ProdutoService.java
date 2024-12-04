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

    public Produto cadastrarProduto(Long empresaId, Produto produto, MultipartFile imagemProduto) throws IOException {
        Empresa empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
        produto.setEmpresa(empresa);

        return salvarProduto(produto, imagemProduto);
    }

    //Salvar imagem do produto tem que ser na pasta de imagem do produto para uma pasta do imagensProdutos.
    public Produto salvarProduto(Produto produto, MultipartFile imagemProduto) throws IOException {
        if (imagemProduto != null && !imagemProduto.isEmpty()) {
            String fileName = imagemProduto.getOriginalFilename();
            Path diretorio = Paths.get("uploads/produtos/");
            Files.createDirectories(diretorio);
            Path caminhoCompleto = diretorio.resolve(fileName);
            Files.copy(imagemProduto.getInputStream(), caminhoCompleto, StandardCopyOption.REPLACE_EXISTING);
            produto.setImagemProdutoUrl("/uploads/produtos/" + fileName);
        }

        return produtoRepository.save(produto);
    }

    public Produto atualizarProduto(Long id, Produto produtoAtualizado, MultipartFile imagemProduto) throws IOException {
        Produto produtoExistente = getProdutoById(id);

        produtoExistente.setNome(produtoAtualizado.getNome());
        produtoExistente.setDescricao(produtoAtualizado.getDescricao());
        produtoExistente.setPreco(produtoAtualizado.getPreco());
        produtoExistente.setCategoria(produtoAtualizado.getCategoria());

        return salvarProduto(produtoExistente, imagemProduto);
    }

    //no front-end trocar categorias por filtro na categorias//
    public Produto getProdutoById(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    public List<Produto> buscarProdutosPorEmpresa(Long empresaId) {
        return produtoRepository.findByEmpresaId(empresaId);
    }
}
