package org.hugo.voucher2.controller;

import org.hugo.voucher2.model.Empresa;
import org.hugo.voucher2.model.Hugo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hugo")
public class HugoController {

    @PostMapping("/teste")
    public ResponseEntity<String> teste(
            @RequestBody Hugo hugo) {
        return ResponseEntity.status(HttpStatus.CREATED).body(hugo.getNome());
    }
}
