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

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Produto> cadastrarProduto(
            @RequestPart("produto") Produto produto,
            @RequestPart("imagemProduto") MultipartFile imagemProduto) {

        if (produto.getEmpresa() == null || produto.getEmpresa().getId() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Salva a imagem do produto
        if (!imagemProduto.isEmpty()) {
            String fileName = imagemProduto.getOriginalFilename();
            Path path = Paths.get("uploads/produtos/" + fileName);
            try {
                Files.copy(imagemProduto.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                produto.setImagemProdutoUrl("/uploads/produtos/" + fileName);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        Produto novoProduto = produtoRepository.save(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
    }


    @GetMapping("/produtos/empresa/{empresaId}")
    public ResponseEntity<List<Produto>> getProdutosPorEmpresa(@PathVariable Long empresaId) {
        List<Produto> produtos = produtoService.buscarProdutosPorEmpresa(empresaId);
        if (produtos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Retorna 404 caso não tenha produtos
        }
        return ResponseEntity.ok(produtos); // Retorna 200 caso haja produtos
    }


    @PutMapping("/editar/{id}")
    public ResponseEntity<Produto> editarProduto(
            @PathVariable Long id,
            @RequestPart("produto") Produto produtoAtualizado,
            @RequestPart(value = "imagemProduto", required = false) MultipartFile imagemProduto) {

        Optional<Produto> produtoExistente = produtoRepository.findById(id);

        if (produtoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Produto produto = produtoExistente.get();

        // Atualiza os campos do produto
        produto.setNome(produtoAtualizado.getNome());
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setPreco(produtoAtualizado.getPreco());

        // Lógica para atualizar a imagem, caso uma nova imagem seja fornecida
        if (imagemProduto != null && !imagemProduto.isEmpty()) {
            String fileName = imagemProduto.getOriginalFilename();
            Path path = Paths.get("uploads/produtos/" + fileName);

            try {
                // Cria o diretório se ele não existir
                Files.createDirectories(path.getParent());

                // Copia o arquivo para o diretório especificado
                Files.copy(imagemProduto.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                // Define a URL da imagem no produto
                produto.setImagemProdutoUrl("/uploads/produtos/" + fileName);

            } catch (IOException e) {
                // Retorna um erro em caso de falha no uxpload da imagem
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        // Salva o produto atualizado no banco de dados
        produtoRepository.save(produto);
        return ResponseEntity.ok(produto);
    }


    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<Void> excluirProduto(@PathVariable Long id) {
        if (!produtoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        produtoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/produtos/categoria/{categoria}")
    public List<Produto> getProdutosPorCategoria(@PathVariable Categoria categoria) {
        return produtoService.buscarProdutosPorCategoria(categoria);
    }
    // Endpoint para obter detalhes de um produto específico
    @GetMapping("/{id}")
    public Produto getProdutoById(@PathVariable Long id) {
        return produtoService.getProdutoById(id);
    }
}