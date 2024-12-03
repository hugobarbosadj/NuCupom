package org.hugo.voucher2.controller;

import org.hugo.voucher2.model.ExemploModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/exemplo")
public class ExemploController {

    private static final Logger logger = LoggerFactory.getLogger(ExemploController.class);

    @PostMapping("/testar")
    public ResponseEntity<String> testarRequisicao(@RequestBody ExemploModel exemploModel) {
        logger.info("Requisição recebida: {}", exemploModel.getTexto());

        if (exemploModel.getTexto() == null || exemploModel.getTexto().isEmpty()) {
            return ResponseEntity.badRequest().body("O campo 'texto' não pode estar vazio.");
        }

        return ResponseEntity.ok("Texto recebido: " + exemploModel.getTexto());
    }
}


