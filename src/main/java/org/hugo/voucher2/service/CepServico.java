package org.hugo.voucher2.service;

import org.hugo.voucher2.model.ViaCepResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CepServico {

    public ViaCepResponse buscarCep(String cep) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://viacep.com.br/ws/" + cep + "/json/";

        try {
            ViaCepResponse response = restTemplate.getForObject(url, ViaCepResponse.class);
            if (response == null || response.getCep() == null) {
                throw new RuntimeException("CEP não encontrado: " + cep);
            }
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar informações do CEP: " + cep, e);
        }
    }
}
