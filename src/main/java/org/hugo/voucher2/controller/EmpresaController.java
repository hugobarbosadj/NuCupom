package org.hugo.voucher2.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.hugo.voucher2.model.Empresa;
import org.hugo.voucher2.modelLogin.JwtUtil;
import org.hugo.voucher2.modelLogin.LoginRequest;
import org.hugo.voucher2.modelLogin.LoginResponse;
import org.hugo.voucher2.modelProduto.Produto;
import org.hugo.voucher2.repository.EmpresaRepository;
import org.hugo.voucher2.service.EmpresaService;
import org.hugo.voucher2.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/empresa")
@CrossOrigin(origins = "http://localhost:3000")
public class EmpresaController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarEmpresa(
            @RequestPart("empresa") String empresaJson,
            @RequestPart(value = "logo", required = false) MultipartFile logo,
            @RequestPart(value = "fotoEmpresa", required = false) MultipartFile fotoEmpresa) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            Empresa empresa = mapper.readValue(empresaJson, Empresa.class);

            empresa.getEndereco().preencherEnderecoPorCep(); // Preenche o endereço a partir do CEP
            Empresa novaEmpresa = empresaService.salvarEmpresa(empresa, logo, fotoEmpresa);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaEmpresa);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao processar arquivos. Detalhes: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao salvar empresa. Detalhes: " + e.getMessage());
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao atualizar empresa. Detalhes: " + e.getMessage());
        }
    }


    @GetMapping("/info")
    public ResponseEntity<Empresa> obterEmpresa(@PathVariable Long id) {
        try {
            Empresa empresa = empresaService.obterEmpresa(id);
            return ResponseEntity.ok(empresa);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEmpresa(@PathVariable Long id) {
        try {
            empresaService.deletarEmpresa(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/{empresaId}/produto/cadastrar")
    public ResponseEntity<?> cadastrarProduto(
            @PathVariable Long empresaId,
            @RequestPart("produto") Produto produto,
            @RequestPart(value = "imagemProduto", required = false) MultipartFile imagemProduto) {

        Optional<Empresa> empresaOptional = empresaRepository.findById(empresaId);

        if (empresaOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empresa não encontrada.");
        }

        try {
            produto.setEmpresa(empresaOptional.get());
            Produto produtoSalvo = produtoService.salvarProduto(produto, imagemProduto);
            return ResponseEntity.status(HttpStatus.CREATED).body(produtoSalvo);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao processar imagem do produto: " + e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getLogin(), loginRequest.getSenha())
            );
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getLogin());
            String jwt = jwtUtil.generateToken(userDetails.getUsername());
            return ResponseEntity.ok(new LoginResponse(jwt));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @RestController
    @RequestMapping("/api/cep")
    public static class CepController {

        @GetMapping("/buscar")
        public ResponseEntity<?> buscarCep(@RequestParam String cep) {
            if (cep == null || !cep.matches("\\d{5}-\\d{3}")) {
                return ResponseEntity.badRequest().body("Formato de CEP inválido. Use o formato XXXXX-XXX.");
            }

            String viaCepUrl = "https://viacep.com.br/ws/" + cep + "/json/";
            RestTemplate restTemplate = new RestTemplate();

            try {
                ResponseEntity<String> response = restTemplate.getForEntity(viaCepUrl, String.class);
                if (response.getStatusCode().is2xxSuccessful() && !response.getBody().contains("\"erro\": true")) {
                    return ResponseEntity.ok(response.getBody());
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CEP não encontrado.");
                }
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Erro ao buscar o CEP. Verifique o formato ou tente novamente.");
            }
        }

    }
}
