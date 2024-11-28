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

    private final VoucherRepository voucherRepository;

    private final AmazonSNS snsClient;
    @Autowired
    public VoucherService(VoucherRepository voucherRepository) {
        this.voucherRepository = voucherRepository;
        // Inicialize com suas credenciais
        BasicAWSCredentials awsCreds = new BasicAWSCredentials("SEU_ACCESS_KEY", "SEU_SECRET_KEY");
        this.snsClient = AmazonSNSClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .withRegion("us-east-1") // Coloque a região correta
                .build();
    }


    public Voucher salvarVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    public Optional<Voucher> obterVoucherPorId(Long id) {
        return voucherRepository.findById(id);
    }

    public List<Voucher> obterVouchersPorProduto(Long produtoId) {
        return voucherRepository.findByProdutoId(produtoId);
    }

    public void deletarVoucher(Long id) {
        voucherRepository.deleteById(id);
    }

    public String verificarDisponibilidadeVoucher(Long id) {
        Optional<Voucher> optionalVoucher = voucherRepository.findById(id);
        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            if (voucher.getQuantidade() > 0) {
                return "Voucher disponível";
            } else {
                atualizarStatusEsgotado(voucher);
                return "Voucher esgotado";
            }
        }
        return "Voucher não encontrado";
    }

    private void atualizarStatusEsgotado(Voucher voucher) {
        voucher.setEsgotado(true);
        voucherRepository.save(voucher);
    }

    public boolean obterVoucher(Long voucherId, String nome, String sobrenome, String cpf, String celular) {
        Optional<Voucher> optionalVoucher = voucherRepository.findById(voucherId);
        if (optionalVoucher.isEmpty() || optionalVoucher.get().getQuantidade() <= 0) {
            return false;
        }

        Voucher voucher = optionalVoucher.get();
        voucher.setQuantidade(voucher.getQuantidade() - 1);
        voucherRepository.save(voucher);

        String mensagem = String.format("Olá %s %s, seu voucher foi obtido com sucesso! CPF: %s", nome, sobrenome, cpf);
        enviarSMS(celular, mensagem);

        return true;
    }

    private void enviarSMS(String celular, String mensagem) {
        PublishRequest request = new PublishRequest()
                .withMessage(mensagem)
                .withPhoneNumber(celular);
        PublishResult result = snsClient.publish(request);
        System.out.println("Mensagem enviada: " + result.getMessageId());
    }
}
