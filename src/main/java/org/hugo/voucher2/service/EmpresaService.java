package org.hugo.voucher2.service;

import org.hugo.voucher2.model.Empresa;
import org.hugo.voucher2.model.ViaCepResponse;
import org.hugo.voucher2.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Substitui BCryptPasswordEncoder diretamente

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private CepServico cepServico;

    public Empresa salvarEmpresa(Empresa empresa, MultipartFile logo, MultipartFile fotoEmpresa) throws IOException {
        if (logo != null && !logo.isEmpty()) {
            String logoUrl = salvarArquivo(logo);
            empresa.setLogoUrl(logoUrl);
        }

        if (fotoEmpresa != null && !fotoEmpresa.isEmpty()) {
            String fotoEmpresaUrl = salvarArquivo(fotoEmpresa);
            empresa.setFotoEmpresaUrl(fotoEmpresaUrl);
        }

        // Criptografar a senha antes de salvar
        empresa.setSenha(passwordEncoder.encode(empresa.getSenha()));

        return empresaRepository.save(empresa);
    }

    private String salvarArquivo(MultipartFile arquivo) throws IOException {
        String diretorio = "C:\\Users\\hugob\\Desktop\\8° Termo\\TCC\\voucher-2\\src\\main\\java\\org\\hugo\\voucher2\\repository\\imagensSalvas";
        File pasta = new File(diretorio);

        // Verifica se o diretório existe, se não, cria
        if (!pasta.exists()) {
            pasta.mkdirs();
        }

        // Define o caminho completo do arquivo
        String caminhoCompleto = diretorio + File.separator + arquivo.getOriginalFilename();

        // Salva o arquivo
        arquivo.transferTo(new File(caminhoCompleto));

        return caminhoCompleto; // Retorna o caminho completo do arquivo
    }


    public Empresa atualizarEmpresa(Long id, Empresa empresaAtualizada, MultipartFile logo, MultipartFile fotoEmpresa) throws IOException {
        Empresa empresaExistente = obterEmpresa(id);

        empresaExistente.setRazaoSocial(empresaAtualizada.getRazaoSocial());
        empresaExistente.setNomeCompletoAdm(empresaAtualizada.getNomeCompletoAdm());
        empresaExistente.setCnpj(empresaAtualizada.getCnpj());
        empresaExistente.setEndereco(empresaAtualizada.getEndereco());
        empresaExistente.setTelefone(empresaAtualizada.getTelefone());

        return salvarEmpresa(empresaExistente, logo, fotoEmpresa);
    }

    public Empresa obterEmpresa(Long id) {
        return empresaRepository.findById(id).orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
    }

    public void deletarEmpresa(Long id) {
        empresaRepository.deleteById(id);
    }

    public String obterEnderecoPorCep(String cep) {
        try {
            ViaCepResponse response = cepServico.buscarCep(cep);
            return response.getLogradouro() + ", " + response.getBairro() + ", " + response.getLocalidade() + " - " + response.getUf();
        } catch (RuntimeException e) {
            throw new IllegalArgumentException("Erro ao buscar o CEP: " + cep);
        }
    }

}
