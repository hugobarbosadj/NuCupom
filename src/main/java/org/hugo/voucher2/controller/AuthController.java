package org.hugo.voucher2.controller;

import org.hugo.voucher2.model.Empresa;
import org.hugo.voucher2.modelLogin.*;
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
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Autenticar
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            // Buscar detalhes do usuário
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginRequest.getUsername());

            // Gerar o token JWT
            String jwt = jwtUtil.generateToken(userDetails.getUsername());

            return ResponseEntity.ok(new AuthResponse(jwt));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Usuário ou senha inválidos.");
        }
    }
}
