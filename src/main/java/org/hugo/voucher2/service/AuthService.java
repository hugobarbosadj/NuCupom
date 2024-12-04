//package org.hugo.voucher2.service;
//
//import org.hugo.voucher2.model.Empresa;
//import org.hugo.voucher2.repository.EmpresaRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AuthService {
//
//    @Autowired
//    private EmpresaRepository empresaRepository;
//
//    public boolean autenticarEmpresa(String email, String senha) {
//        // Buscando a empresa pelo email
//        Empresa empresa = empresaRepository.findByEmail(email);
//
//        if (empresa == null) {
//            return false; // Empresa não encontrada
//        }
//
//        // Comparando a senha informada com a senha criptografada
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        return encoder.matches(senha, empresa.getSenha());
//    }
//}
