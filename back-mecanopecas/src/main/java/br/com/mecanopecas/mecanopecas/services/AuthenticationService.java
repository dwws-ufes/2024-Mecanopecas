package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.model.Admin;
import br.com.mecanopecas.mecanopecas.model.Gerente;
import br.com.mecanopecas.mecanopecas.model.Vendedor;
import br.com.mecanopecas.mecanopecas.model.Roles;
import br.com.mecanopecas.mecanopecas.persistence.AdminRepository;
import br.com.mecanopecas.mecanopecas.persistence.GerenteRepository;
import br.com.mecanopecas.mecanopecas.persistence.VendedorRepository;
import br.com.mecanopecas.mecanopecas.util.dtos.request.AuthenticateRequestDTO;
import br.com.mecanopecas.mecanopecas.util.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final VendedorRepository vendedorRepository;
    private final AdminRepository adminRepository;
    private final JwtEncoder jwtEncoder;
    private final GerenteRepository gerenteRepository;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public AuthenticationService(VendedorRepository vendedorRepository, AdminRepository adminRepository, JwtEncoder jwtEncoder, GerenteRepository gerenteRepository, PasswordEncoder passwordEncoder) {
        this.vendedorRepository = vendedorRepository;
        this.adminRepository = adminRepository;
        this.jwtEncoder = jwtEncoder;
        this.gerenteRepository = gerenteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String authenticate(AuthenticateRequestDTO authenticateRequestDTO){
        Map<String, Long> roleIds = new HashMap<>();

        Optional<Admin> admin = adminRepository.findByEmailInstitucional(authenticateRequestDTO.email());
        if (admin.isPresent()) {
            if (passwordEncoder.matches(authenticateRequestDTO.password(), admin.get().getPassword())) {
                roleIds.put("adminId", admin.get().getId());
                return generateToken(Roles.ADMIN, roleIds);
            }
        }

        Optional<Vendedor> vendedor = vendedorRepository.findByEmailInstitucional(authenticateRequestDTO.email());
        if (vendedor.isPresent()) {
            if (passwordEncoder.matches(authenticateRequestDTO.password(), vendedor.get().getPassword())) {
                roleIds.put("vendedorId", vendedor.get().getId());

                Optional<Gerente> gerente = gerenteRepository.findByVendedorId(vendedor.get().getId());
                if (gerente.isPresent()) {
                    roleIds.put("gerenteId", gerente.get().getId());
                    return generateToken(Roles.GERENTE, roleIds);
                }
                return generateToken(Roles.VENDEDOR, roleIds);
            }
        }
        throw new BadRequestException("Email ou senha inválidas");
    }

    public String generateToken(Roles roles, Map<String, Long> roleIds) {
        Instant now = Instant.now();
        long expiry = 3600L;

        JwtClaimsSet.Builder claimsBuilder = JwtClaimsSet.builder()
                .issuer("Mecanopecas")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject("Mecanopecas")
                .claim("role", roles);

        roleIds.forEach((roleName, id) -> {
            claimsBuilder.claim(roleName, id);
        });

        JwtClaimsSet claims = claimsBuilder.build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
