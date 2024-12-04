package org.hugo.voucher2.controller;

import jakarta.validation.Valid;
import org.hugo.voucher2.model.Empresa;
import org.hugo.voucher2.repository.EmpresaRepository;
import org.hugo.voucher2.service.EmpresaService;
import org.hugo.voucher2.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private ProdutoService produtoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<Empresa> cadastrarEmpresa(
            @Valid @RequestBody Empresa empresa,
            // ou @RequestPart("empresa") String empresaJson,
            @RequestParam(required = false) MultipartFile logo,
            @RequestParam(required = false) MultipartFile fotoEmpresa) {
        try {
            Empresa novaEmpresa = empresaService.criarEmpresa(empresa, logo, fotoEmpresa);
            return ResponseEntity.ok(novaEmpresa);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarEmpresa(
            @PathVariable Long id,
            @Valid @RequestBody Empresa empresaAtualizada,
            @RequestPart(value = "logo", required = false) MultipartFile logo,
            @RequestPart(value = "fotoEmpresa", required = false) MultipartFile fotoEmpresa) {
        Optional<Empresa> empresaOptional = empresaRepository.findById(id);
        if (empresaOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empresa não encontrada.");
        }
        try {
            Empresa empresa = empresaService.atualizarEmpresa(id, empresaAtualizada, logo, fotoEmpresa);
            return ResponseEntity.ok(empresa);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao processar arquivos: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> obterEmpresa(@PathVariable Long id) {
        Optional<Empresa> empresa = empresaRepository.findById(id);
        return empresa.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEmpresa(@PathVariable Long id) {
        if (!empresaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        empresaService.deletarEmpresa(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Empresa> login(
            @RequestParam String cnpj,
            @RequestParam String senha) {
        Empresa empresa = empresaService.autenticarEmpresa(cnpj, senha);
        if (empresa != null) {
            return ResponseEntity.ok(empresa);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
