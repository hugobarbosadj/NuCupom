package org.hugo.voucher2.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import com.amazonaws.services.sns.model.PublishRequest;
import com.amazonaws.services.sns.model.PublishResult;
import org.hugo.voucher2.modelVoucher.Voucher;
import org.hugo.voucher2.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    public Voucher criarVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    public Voucher obterVoucher(Long id) {
        return voucherRepository.findById(id).orElseThrow(() -> new RuntimeException("Voucher não encontrado"));
    }

    public Voucher salvarVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    public List<Voucher> obterVouchersPorProduto(Long produtoId) {
        return voucherRepository.findByProdutoId(produtoId);
    }

    public boolean existsById(Long id) {
        return voucherRepository.existsById(id);
    }

    public Voucher atualizarVoucher(Long id, Voucher voucherAtualizado) {
        Voucher voucherExistente = voucherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voucher não encontrado"));

        voucherExistente.setProduto(voucherAtualizado.getProduto());
        voucherExistente.setQuantidade(voucherAtualizado.getQuantidade());
        voucherExistente.setDataInicial(voucherAtualizado.getDataInicial());
        voucherExistente.setDataFinal(voucherAtualizado.getDataFinal());
        voucherExistente.setEsgotado(voucherAtualizado.isEsgotado());

        return voucherRepository.save(voucherExistente);
    }

    public void deletarVoucher(Long id) {
        voucherRepository.deleteById(id);
    }
}
