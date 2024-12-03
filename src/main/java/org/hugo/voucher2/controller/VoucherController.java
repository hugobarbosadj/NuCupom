package org.hugo.voucher2.controller;

import org.hugo.voucher2.modelVoucher.Voucher;
import org.hugo.voucher2.modelVoucher.VoucherRequest;
import org.hugo.voucher2.service.SnsService;
import org.hugo.voucher2.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/vouchers")
public class VoucherController {
    private final VoucherService voucherService;
    private final SnsService snsService;

    // Injeção de dependência via construtor
    @Autowired
    public VoucherController(VoucherService voucherService, SnsService snsService) {
        this.voucherService = voucherService;
        this.snsService = snsService;
    }

    @PostMapping
    public ResponseEntity<Voucher> criarVoucher(@RequestBody Voucher voucher) {
        Voucher novoVoucher = voucherService.salvarVoucher(voucher);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoVoucher);
    }

    @GetMapping("/produto/{produtoId}")
    public ResponseEntity<List<Voucher>> obterVouchersPorProduto(@PathVariable Long produtoId) {
        List<Voucher> vouchers = voucherService.obterVouchersPorProduto(produtoId);
        return ResponseEntity.ok(vouchers);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVoucher(@PathVariable Long id) {
        voucherService.deletarVoucher(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/verificar/{id}")
    public ResponseEntity<String> verificarDisponibilidade(@PathVariable Long id) {
        String mensagem = voucherService.verificarDisponibilidadeVoucher(id);
        return ResponseEntity.ok(mensagem);
    }

    @PostMapping("/obtain")
    public ResponseEntity<String> obterVoucher(@RequestBody VoucherRequest request) {
        boolean sucesso = voucherService.obterVoucher(
                request.getVoucherId(),
                request.getNome(),
                request.getSobrenome(),
                request.getCpf(),
                request.getCelular()
        );

        if (sucesso) {
            return ResponseEntity.ok("Voucher obtido com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao obter voucher ou quantidade insuficiente.");
        }
    }
}
