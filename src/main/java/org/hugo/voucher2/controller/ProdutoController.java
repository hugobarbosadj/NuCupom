package org.hugo.voucher2.controller;

import org.hugo.voucher2.modelProduto.Categoria;
import org.hugo.voucher2.modelProduto.Produto;
import org.hugo.voucher2.repository.ProdutoRepository;
import org.hugo.voucher2.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "http://localhost:3000")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ProdutoService produtoService;

    @PostMapping("/{empresaId}/produtos")
    public ResponseEntity<?> cadastrarProduto(
            @RequestPart("produto") Produto produto,
            @RequestPart(value = "imagemProduto", required = false) MultipartFile imagemProduto) {
        try {
            Produto novoProduto = produtoService.salvarProduto(produto, imagemProduto);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao salvar o produto: " + e.getMessage());
        }
    }

    @GetMapping("/empresa/{empresaId}")
    public ResponseEntity<List<Produto>> listarProdutosPorEmpresa(@PathVariable Long empresaId) {
        List<Produto> produtos = produtoService.buscarProdutosPorEmpresa(empresaId);
        return ResponseEntity.ok(produtos);
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editarProduto(
            @PathVariable Long id,
            @RequestPart("produto") Produto produtoAtualizado,
            @RequestPart(value = "imagemProduto", required = false) MultipartFile imagemProduto) {
        try {
            Produto produto = produtoService.atualizarProduto(id, produtoAtualizado, imagemProduto);
            return ResponseEntity.ok(produto);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar o produto: " + e.getMessage());
        }
    }


    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<Void> excluirProduto(@PathVariable Long id) {
        if (!produtoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        produtoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
