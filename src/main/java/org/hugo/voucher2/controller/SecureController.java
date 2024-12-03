package org.hugo.voucher2.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
    @RequestMapping("/api/secure")
    public class SecureController {

        @GetMapping
        public ResponseEntity<String> secureEndpoint() {
            return ResponseEntity.ok("Você acessou um endpoint protegido!");
        }
    }
