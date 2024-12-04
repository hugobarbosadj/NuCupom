//package org.hugo.voucher2.model;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//import java.util.Collections;
//
//public class EmpresaUserDetails implements UserDetails {
//
//    private final Empresa empresa;
//
//    public EmpresaUserDetails(Empresa empresa) {
//        this.empresa = empresa;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Collections.emptyList(); // Sem permissões específicas
//    }
//
//    @Override
//    public String getPassword() {
//        return empresa.getSenha(); // Retorna a senha da empresa
//    }
//
//    @Override
//    public String getUsername() {
//        return empresa.getCnpj(); // Pode usar o CNPJ ou Email como username
//    }
//
//    public String getEmail() {
//        return empresa.getEmail();
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true; // Conta nunca expira
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true; // Conta nunca é bloqueada
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true; // Credenciais nunca expiram
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true; // Sempre habilitada
//    }
//
//    public Empresa getEmpresa() {
//        return empresa; // Para acessar dados completos da empresa
//    }
//}
