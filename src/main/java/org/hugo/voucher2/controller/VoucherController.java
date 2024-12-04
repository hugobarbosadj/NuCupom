package org.hugo.voucher2.controller;

import org.hugo.voucher2.modelVoucher.Voucher;
import org.hugo.voucher2.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vouchers")
@CrossOrigin(origins = "http://localhost:3000")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/criar")
    public ResponseEntity<Voucher> criarVoucher(@RequestBody Voucher voucher) {
        Voucher novoVoucher = voucherService.salvarVoucher(voucher);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoVoucher);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirVoucher(@PathVariable Long id) {
        if (!voucherService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        voucherService.deletarVoucher(id);
        return ResponseEntity.noContent().build();
    }
}
