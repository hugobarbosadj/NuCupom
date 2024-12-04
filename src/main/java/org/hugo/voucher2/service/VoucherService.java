package org.hugo.voucher2.service;

//import com.amazonaws.auth.AWSStaticCredentialsProvider;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.services.sns.AmazonSNS;
//import com.amazonaws.services.sns.AmazonSNSClientBuilder;
//import com.amazonaws.services.sns.model.PublishRequest;
//import com.amazonaws.services.sns.model.PublishResult;
import org.hugo.voucher2.modelProduto.Produto;
import org.hugo.voucher2.modelVoucher.Voucher;
import org.hugo.voucher2.modelVoucher.VoucherRequest;
import org.hugo.voucher2.repository.ProdutoRepository;
import org.hugo.voucher2.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    // Criar um voucher para um produto
    public Voucher criarVoucher(Long produtoId, Voucher voucher) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado."));
        voucher.setProduto(produto);
        return voucherRepository.save(voucher);
    }


    // Obter um voucher para resgate (diminui a quantidade)
    public void resgatarVoucher(VoucherRequest voucherRequest) {
        Voucher voucher = voucherRepository.findById(voucherRequest.getVoucherId())
                .orElseThrow(() -> new RuntimeException("Voucher não encontrado."));

        if (voucher.isEsgotado() || voucher.getQuantidade() <= 0) {
            throw new RuntimeException("Voucher esgotado.");
        }

        voucher.setQuantidade(voucher.getQuantidade() - 1);

        if (voucher.getQuantidade() <= 0) {
            voucher.setEsgotado(true);
        }

        voucherRepository.save(voucher);

        // Salvar os dados do resgate (simulando persistência no banco)
        System.out.println("Dados do usuário que resgatou o voucher:");
        System.out.println(voucherRequest);
    }

    // Atualizar um voucher existente
    public Voucher atualizarVoucher(Long id, Voucher voucherAtualizado) {
        Voucher voucherExistente = voucherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voucher não encontrado."));

        voucherExistente.setQuantidade(voucherAtualizado.getQuantidade());
        voucherExistente.setDataInicial(voucherAtualizado.getDataInicial());
        voucherExistente.setDataFinal(voucherAtualizado.getDataFinal());
        voucherExistente.setEsgotado(voucherAtualizado.isEsgotado());

        return voucherRepository.save(voucherExistente);
    }

    public void excluirVoucherDoProduto(Long produtoId, Long id) {
        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voucher não encontrado."));

        // Verificar se o voucher pertence ao produto
        if (!voucher.getProduto().getId().equals(produtoId)) {
            throw new RuntimeException("O voucher não pertence ao produto informado.");
        }

        // Excluir o voucher
        voucherRepository.deleteById(id);
    }
}

