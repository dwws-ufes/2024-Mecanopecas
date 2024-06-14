package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.model.Roles;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import java.util.List;

public class BaseController {

    private final JwtDecoder jwtDecoder;

    public BaseController(@Qualifier("jwtDecoder") JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    protected boolean userInRoles(String authHeader, List<Roles> roles) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Jwt jwt = jwtDecoder.decode(token);

            String userRole = jwt.getClaim("role");

            for (Roles role : roles) {
                if (role.name().equals(userRole)) {
                    return true;
                }
            }
        }
        return false;
    }

    protected Long getVendedorId(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Jwt jwt = jwtDecoder.decode(token);

            return jwt.getClaim("vendedorId");
        }
        return null;
    }

    protected Long getGerenteId(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Jwt jwt = jwtDecoder.decode(token);

            return jwt.getClaim("gerenteId");
        }
        return null;
    }
}