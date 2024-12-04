package org.hugo.voucher2.service;

import org.hugo.voucher2.model.Empresa;
import org.hugo.voucher2.model.Endereco;
import org.hugo.voucher2.model.ViaCepResponse;
import org.hugo.voucher2.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Set;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

import java.util.Set;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;



    public Empresa salvarEmpresa(Empresa empresa, MultipartFile logo, MultipartFile fotoEmpresa) throws IOException {
        // Valida a empresa
        validarEmpresa(empresa);

        // Preenche o endereço usando o CEP, se necessário
        if (empresa.getEndereco() != null) {
            empresa.preencherEnderecoPorCep(cepServico);
        }

        // Salva logo e foto da empresa, se fornecidas
        if (logo != null && !logo.isEmpty()) {
            String logoUrl = salvarArquivo(logo, "empresas/logos");
            empresa.setLogoUrl(logoUrl);
        }

        if (fotoEmpresa != null && !fotoEmpresa.isEmpty()) {
            String fotoEmpresaUrl = salvarArquivo(fotoEmpresa, "empresas/fotos");
            empresa.setFotoEmpresaUrl(fotoEmpresaUrl);
        }

        // Salva a empresa no banco de dados
        return empresaRepository.save(empresa);
    }


    public Empresa criarEmpresa(Empresa empresa, MultipartFile logo, MultipartFile fotoEmpresa) throws IOException {
        validarEmpresa(empresa);
        return salvarEmpresa(empresa, logo, fotoEmpresa);
    }


    public Empresa atualizarEmpresa(Long id, Empresa empresaAtualizada, MultipartFile logo, MultipartFile fotoEmpresa) throws IOException {
        Empresa empresaExistente = obterEmpresa(id);

        // Valida os campos da empresa antes de atualizar
        validarEmpresa(empresaAtualizada);

        // Atualiza os atributos básicos
        empresaExistente.setRazaoSocial(empresaAtualizada.getRazaoSocial());
        empresaExistente.setNomeCompletoAdm(empresaAtualizada.getNomeCompletoAdm());
        empresaExistente.setCnpj(empresaAtualizada.getCnpj());
        empresaExistente.setEmail(empresaAtualizada.getEmail());
        empresaExistente.setSenha(empresaAtualizada.getSenha());
        empresaExistente.setTelefone(empresaAtualizada.getTelefone());

        // Atualiza os dados do endereço
        if (empresaAtualizada.getEndereco() != null) {
            empresaExistente.setEndereco(empresaAtualizada.getEndereco());
            // Preenche o endereço usando o CEP, se necessário
            empresaExistente.getEndereco().preencherEnderecoPorCep(cepServico);
        }

        // Atualiza os URLs das imagens, caso sejam fornecidas
        if (logo != null && !logo.isEmpty()) {
            String logoUrl = salvarArquivo(logo, "empresas/logos");
            empresaExistente.setLogoUrl(logoUrl);
        }
        if (fotoEmpresa != null && !fotoEmpresa.isEmpty()) {
            String fotoEmpresaUrl = salvarArquivo(fotoEmpresa, "empresas/fotos");
            empresaExistente.setFotoEmpresaUrl(fotoEmpresaUrl);
        }

        // Salva e retorna a empresa atualizada
        return empresaRepository.save(empresaExistente);
    }


    public Empresa obterEmpresa(Long id) {
        return empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
    }

    public List<Empresa> listarEmpresas() {
        return empresaRepository.findAll();
    }

    public void deletarEmpresa(Long id) {
        empresaRepository.deleteById(id);
    }

    //Tenho que puxar os arquivos de imagem da classe e salvar em uma pasta imagensEmpresas//
    private String salvarArquivo(MultipartFile arquivo, String diretorioBase) throws IOException {
        // Define o caminho base do diretório para salvar os arquivos
        Path diretorio = Paths.get("C:/Users/hugob/Desktop/8° Termo/TCC/voucher-2/src/main/java/org/hugo/voucher2/repository/imagensEmpresas/" + diretorioBase);
        Files.createDirectories(diretorio);

        // Define o caminho completo do arquivo
        Path caminhoCompleto = diretorio.resolve(arquivo.getOriginalFilename());

        // Salva o arquivo no diretório especificado
        Files.copy(arquivo.getInputStream(), caminhoCompleto, StandardCopyOption.REPLACE_EXISTING);

        // Retorna o caminho relativo (que pode ser usado na URL, se necessário)
        return "/uploads/" + diretorioBase + "/" + arquivo.getOriginalFilename();
    }


    @Autowired
    private CepServico cepServico;

    @GetMapping("/buscar-cep/{cep}")
    public ResponseEntity<ViaCepResponse> buscarCep(@PathVariable String cep) {
        try {
            ViaCepResponse response = cepServico.buscarCep(cep);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Autowired
    private Validator validator;

    private void validarEmpresa(Empresa empresa) {
        Set<ConstraintViolation<Empresa>> violacoes = validator.validate(empresa);
        if (!violacoes.isEmpty()) {
            StringBuilder mensagemErro = new StringBuilder("Erro(s) de validação: ");
            for (ConstraintViolation<Empresa> violacao : violacoes) {
                mensagemErro.append(violacao.getMessage()).append("; ");
            }
            throw new IllegalArgumentException(mensagemErro.toString());
        }
    }

    public Empresa autenticarEmpresa(String cnpj, String senha) {
        Empresa empresa = empresaRepository.findByCnpj(cnpj);
        if (empresa != null && empresa.getSenha().equals(senha)) {
            return empresa;
        }
        throw new RuntimeException("CNPJ ou senha inválidos");
    }

}
