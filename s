[1mdiff --git a/src/main/java/org/hugo/voucher2/modelLogin/SecurityConfig.java b/src/main/java/org/hugo/voucher2/modelLogin/SecurityConfig.java[m
[1mindex f4a3ad3..72cfb73 100644[m
[1m--- a/src/main/java/org/hugo/voucher2/modelLogin/SecurityConfig.java[m
[1m+++ b/src/main/java/org/hugo/voucher2/modelLogin/SecurityConfig.java[m
[36m@@ -1,79 +1,86 @@[m
 package org.hugo.voucher2.modelLogin;[m
 [m
[31m-//import org.springframework.context.annotation.Bean;[m
[31m-import org.springframework.context.annotation.Configuration;[m
[31m-//import org.springframework.security.authentication.AuthenticationManager;[m
[31m-//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;[m
[31m-//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;[m
[31m-//import org.springframework.security.config.annotation.web.builders.HttpSecurity;[m
[31m-//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;[m
[31m-//import org.springframework.security.config.http.SessionCreationPolicy;[m
[31m-//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;[m
[31m-//import org.springframework.security.crypto.password.PasswordEncoder;[m
[31m-//import org.springframework.security.web.SecurityFilterChain;[m
[31m-//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;[m
[31m-[m
[32m+[m[32mimport org.springframework.context.annotation.Bean;[m
 import org.springframework.context.annotation.Configuration;[m
[32m+[m[32mimport org.springframework.security.authentication.AuthenticationManager;[m
[32m+[m[32mimport org.springframework.security.authentication.dao.DaoAuthenticationProvider;[m
[32m+[m[32mimport org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;[m
 import org.springframework.security.config.annotation.web.builders.HttpSecurity;[m
 import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;[m
[31m-import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;[m
[32m+[m[32mimport org.springframework.security.config.http.SessionCreationPolicy;[m
[32m+[m[32mimport org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;[m
[32m+[m[32mimport org.springframework.security.crypto.password.PasswordEncoder;[m
[32m+[m[32mimport org.springframework.security.web.SecurityFilterChain;[m
[32m+[m[32mimport org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;[m
 [m
 @Configuration[m
 @EnableWebSecurity[m
[31m-public class SecurityConfig extends WebSecurityConfigurerAdapter {[m
[32m+[m[32mpublic class SecurityConfig {[m
[32m+[m
[32m+[m[32m    private final JwtAuthenticationFilter jwtAuthenticationFilter;[m
[32m+[m[32m    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;[m
[32m+[m[32m    private final CustomUserDetailsService customUserDetailsService;[m
[32m+[m
[32m+[m[32m    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,[m
[32m+[m[32m                          JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,[m
[32m+[m[32m                          CustomUserDetailsService customUserDetailsService) {[m
[32m+[m[32m        this.jwtAuthenticationFilter = jwtAuthenticationFilter;[m
[32m+[m[32m        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;[m
[32m+[m[32m        this.customUserDetailsService = customUserDetailsService;[m
[32m+[m[32m    }[m
 [m
[31m-    @Override[m
[31m-    protected void configure(HttpSecurity http) throws Exception {[m
[31m-        http.csrf().disable() // Desativa CSRF[m
[31m-                .authorizeRequests()[m
[31m-                .anyRequest().permitAll(); // Permite todas as requisições[m
[32m+[m[32m    @Bean[m
[32m+[m[32m    public PasswordEncoder passwordEncoder() {[m
[32m+[m[32m        return new BCryptPasswordEncoder();[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    @Bean[m
[32m+[m[32m    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {[m
[32m+[m[32m        return authenticationConfiguration.getAuthenticationManager();[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    @Bean[m
[32m+[m[32m    public DaoAuthenticationProvider authenticationProvider() {[m
[32m+[m[32m        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();[m
[32m+[m[32m        authProvider.setUserDetailsService(customUserDetailsService); // Configura o UserDetailsService[m
[32m+[m[32m        authProvider.setPasswordEncoder(passwordEncoder());          // Configura o PasswordEncoder[m
[32m+[m[32m        return authProvider;[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m
[32m+[m[32m    @Bean[m
[32m+[m[32m    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {[m
[32m+[m[32m        http.csrf(csrf -> csrf.disable()) // Atualizado para usar a nova API[m
[32m+[m[32m                .authorizeHttpRequests(auth -> auth[m
[32m+[m[32m                        .requestMatchers([m
[32m+[m[32m                                "/api/auth/**",[m
[32m+[m[32m                                "/register",[m
[32m+[m[32m                                "/api/empresas/login",[m
[32m+[m[32m                                "/api/empresas/cadastrar",[m
[32m+[m[32m                                "/api/cep/**"[m
[32m+[m[32m                        ).permitAll()[m
[32m+[m[32m                        .requestMatchers("/api/{empresaId}/produto/cadastrar",[m
[32m+[m[32m                                "/api/empresas/info",[m
[32m+[m[32m                                "/api/empresas/{id}",[m
[32m+[m[32m                                "/api/empresas/",[m
[32m+[m[32m                                "/api/produtos/**",[m
[32m+[m[32m                                "/api/vouchers/verificar/{id}",[m
[32m+[m[32m                                "/api/vouchers/produto{id}",[m
[32m+[m[32m                                "/api/vouchers/{id}",[m
[32m+[m[32m                                "/api/vouchers/criar").authenticated() // Exigem token[m
[32m+[m
[32m+[m[32m                        .anyRequest().authenticated()[m
[32m+[m[32m                )[m
[32m+[m[32m                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))[m
[32m+[m[32m                .exceptionHandling(ex -> ex.authenticationEntryPoint(jwtAuthenticationEntryPoint))[m
[32m+[m[32m                .authenticationProvider(authenticationProvider()); // Adiciona o authProvider[m
[32m+[m
[32m+[m[32m        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);[m
[32m+[m
[32m+[m[32m        return http.build();[m
     }[m
 }[m
[31m-//[m
[31m-//    private final JwtAuthenticationFilter jwtAuthenticationFilter;[m
[31m-//    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;[m
[31m-//    private final CustomUserDetailsService customUserDetailsService;[m
[31m-//[m
[31m-//    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,[m
[31m-//                          JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,[m
[31m-//                          CustomUserDetailsService customUserDetailsService) {[m
[31m-//        this.jwtAuthenticationFilter = jwtAuthenticationFilter;[m
[31m-//        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;[m
[31m-//        this.customUserDetailsService = customUserDetailsService;[m
[31m-//    }[m
[31m-//[m
[31m-//    @Bean[m
[31m-//    public PasswordEncoder passwordEncoder() {[m
[31m-//        return new BCryptPasswordEncoder();[m
[31m-//    }[m
[31m-//[m
[31m-//    @Bean[m
[31m-//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {[m
[31m-//        return authenticationConfiguration.getAuthenticationManager();[m
[31m-//    }[m
[31m-//[m
[31m-//    @Bean[m
[31m-//    public DaoAuthenticationProvider authenticationProvider() {[m
[31m-//        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();[m
[31m-//        authProvider.setUserDetailsService(customUserDetailsService); // Configura o UserDetailsService[m
[31m-//        authProvider.setPasswordEncoder(passwordEncoder());          // Configura o PasswordEncoder[m
[31m-//        return authProvider;[m
[31m-//    }[m
[31m-//[m
[31m-//[m
[31m-//    @Bean[m
[31m-//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {[m
[31m-//        http.csrf(csrf -> csrf.disable()) // Desabilita o CSRF[m
[31m-//                .authorizeHttpRequests(auth -> auth[m
[31m-//                        .requestMatchers("/api/**").permitAll()[m
[31m-//                        .anyRequest().permitAll()) // Permite todos os acessos[m
[31m-//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Configuração padrão, sem sessões[m
[31m-//[m
[31m-//        return http.build();[m
[31m-//    }[m
[31m-//[m
[31m-//}[m
[31m-//[m
[31m-//[m
[31m-//[m
[31m-//[m
[41m+[m
[41m+[m
[41m+[m
[41m+[m
