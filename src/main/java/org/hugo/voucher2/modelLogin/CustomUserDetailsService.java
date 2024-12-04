//package org.hugo.voucher2.modelLogin;
//
//import org.hugo.voucher2.model.Empresa;
//import org.hugo.voucher2.model.EmpresaUserDetails;
//import org.hugo.voucher2.repository.EmpresaRepository;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    private final EmpresaRepository empresaRepository;
//
//    public CustomUserDetailsService(EmpresaRepository empresaRepository) {
//        this.empresaRepository = empresaRepository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Empresa empresa = empresaRepository.findByEmailOrCnpj(username, username)
//                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com email ou CNPJ: " + username));
//        return new EmpresaUserDetails(empresa);
//    }
//
//}
//
