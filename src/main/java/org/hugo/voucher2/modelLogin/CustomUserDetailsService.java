package org.hugo.voucher2.modelLogin;

import org.hugo.voucher2.model.Empresa;
import org.hugo.voucher2.model.EmpresaUserDetails;
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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Busca empresa pelo CNPJ ou Email
        Empresa empresa = empresaRepository.findByEmailOrCnpj(username, username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com email ou CNPJ: " + username));
        return new EmpresaUserDetails(empresa);
    }
}
