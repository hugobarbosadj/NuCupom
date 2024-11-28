package org.hugo.voucher2.modelLogin;

import org.hugo.voucher2.model.Empresa;
import org.hugo.voucher2.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Primary
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        // Carrega a empresa por email ou CNPJ
        Empresa empresa = empresaRepository.findByEmailOrCnpj(login, login)
                .orElseThrow(() -> new UsernameNotFoundException("Empresa não encontrada com email ou CNPJ: " + login));

        // Retorna um UserDetails com os dados da empresa
        return new org.springframework.security.core.userdetails.User(
                empresa.getEmail(),
                empresa.getSenha(),
                new ArrayList<>() // Lista vazia de permissões
        );
    }
}
