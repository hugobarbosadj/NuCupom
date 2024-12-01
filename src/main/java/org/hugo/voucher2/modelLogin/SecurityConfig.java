package org.hugo.voucher2.modelLogin;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtRequestFilter jwtRequestFilter) throws Exception {
        http
                .cors(Customizer.withDefaults()) // Ativa CORS
                .csrf(csrf -> csrf.disable()) // Desativa CSRF
                .authorizeHttpRequests(auth -> auth
                        // Rotas públicas (não requerem autenticação)
                        .requestMatchers("/api/auth/**", "/register", "/api/empresa/login", "/api/empresa/cadastrar", "/api/cep/**").permitAll()
                        // Qualquer outra rota requer autenticação
                        .anyRequest().authenticated()
                )
                // Define como Stateless (sem estado, ideal para JWT)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Adiciona o filtro de autenticação antes do UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
