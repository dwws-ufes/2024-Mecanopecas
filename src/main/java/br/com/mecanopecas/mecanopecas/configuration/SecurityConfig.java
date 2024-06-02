package br.com.mecanopecas.mecanopecas.configuration;

import br.com.mecanopecas.mecanopecas.model.Roles;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;


import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${jwt.public.key}")
    private RSAPublicKey key;
    @Value("${jwt.private.key}")
    private RSAPrivateKey privateKey;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers("/authenticate").permitAll() // Permitir tudo
                                .requestMatchers("/api/**").permitAll() // Permitir tudo
                                .requestMatchers(HttpMethod.PUT, "/orcamentos/*/desconto").hasAnyRole(Roles.GERENTE.name(), Roles.ADMIN.name())
                                .requestMatchers("/orcamentos").permitAll() // Permitir tudo
//                                .requestMatchers(HttpMethod.POST, "/api/vendedores").hasRole(Role.ADMIN.name())
//                                .requestMatchers("/api/vendedores/**").hasAnyRole(Role.VENDEDOR.name(), Role.GERENTE.name(), Role.ADMIN.name())
//                                .requestMatchers("/admin/**").hasRole(Role.ADMIN.name())
//                                .requestMatchers("/api/gerentes**").hasAnyRole(Role.ADMIN.name(), Role.VENDEDOR.name())
//                                .requestMatchers("/api/pecas**").hasAnyRole(Role.VENDEDOR.name(), Role.GERENTE.name(), Role.ADMIN.name())
                                .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .oauth2ResourceServer(
                        config -> config.jwt(Customizer.withDefaults())
                );
        return http.build();
    }

    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(key).build();
    }

    @Bean
    JwtEncoder jwtEncoder() {
        var jwk = new RSAKey.Builder(key).privateKey(privateKey).build();
        var jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
