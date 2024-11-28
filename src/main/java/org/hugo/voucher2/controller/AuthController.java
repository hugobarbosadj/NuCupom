package org.hugo.voucher2.controller;

import org.hugo.voucher2.model.Empresa;
import org.hugo.voucher2.modelLogin.JwtUtil;
import org.hugo.voucher2.modelLogin.LoginRequest;
import org.hugo.voucher2.modelLogin.LoginResponse;
import org.hugo.voucher2.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmpresaService empresaService; // Injeção do EmpresaService

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getLogin(), loginRequest.getSenha()
                    )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwtToken = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new LoginResponse(jwtToken));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Login ou senha incorretos.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Empresa empresa) {
        try {
            Empresa empresaSalva = empresaService.salvarEmpresa(empresa, null, null);
            return ResponseEntity.ok("Cadastro realizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao cadastrar empresa: " + e.getMessage());
        }
    }
}
