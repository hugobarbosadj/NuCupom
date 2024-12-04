package org.hugo.voucher2.controller;

import org.hugo.voucher2.modelVoucher.Voucher;
import org.hugo.voucher2.modelVoucher.VoucherRequest;
import org.hugo.voucher2.repository.ProdutoRepository;
import org.hugo.voucher2.repository.VoucherRepository;
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


    @PostMapping("/{produtoId}/criar")
    public ResponseEntity<Voucher> criarVoucher(
            @PathVariable Long produtoId,
            @RequestBody Voucher voucher) {
        Voucher novoVoucher = voucherService.criarVoucher(produtoId, voucher);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoVoucher);
    }

    @PostMapping("/resgatar")
    public ResponseEntity<String> resgatarVoucher(@RequestBody VoucherRequest voucherRequest) {
        try {
            voucherService.resgatarVoucher(voucherRequest);
            return ResponseEntity.ok("Voucher resgatado com sucesso.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{produtoId}/{id}")
    public ResponseEntity<Voucher> atualizarVoucher(
            @PathVariable Long produtoId,
            @PathVariable Long id,
            @RequestBody Voucher voucherAtualizado) {
        Voucher voucherAtualizadoFinal = voucherService.atualizarVoucher(id, voucherAtualizado);
        return ResponseEntity.ok(voucherAtualizadoFinal);
    }


    @DeleteMapping("/{produtoId}/{id}")
    public ResponseEntity<Void> excluirVoucher(
            @PathVariable Long produtoId,
            @PathVariable Long id) {
        try {
            // Delegar a lógica de exclusão ao serviço
            voucherService.excluirVoucherDoProduto(produtoId, id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // Retorna erro em caso de inconsistência
        }
    }

}
