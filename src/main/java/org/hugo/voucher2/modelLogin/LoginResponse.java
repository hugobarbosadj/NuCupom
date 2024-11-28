package org.hugo.voucher2.modelLogin;

/**
 * Classe que representa a resposta do login, contendo o token JWT.
 * Usada para retornar o token JWT para o cliente após um login bem-sucedido.
 */
public class LoginResponse {

    private String jwt; // Token JWT gerado após o login bem-sucedido.

    // Construtor com parâmetro para inicializar o jwt
    public LoginResponse(String jwt) {
        if (jwt == null || jwt.isEmpty()) {
            throw new IllegalArgumentException("O token JWT não pode ser nulo ou vazio.");
        }
        this.jwt = jwt;
    }

    // Construtor sem parâmetros (caso você precise de uma instância vazia para setar o JWT depois)
    public LoginResponse() {
    }

    // Getter para o token JWT
    public String getJwt() {
        return jwt;
    }

    // Setter para o token JWT
    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "jwt='" + jwt + '\'' +
                '}';
    }
}
