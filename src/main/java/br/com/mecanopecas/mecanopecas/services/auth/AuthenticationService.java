package br.com.mecanopecas.mecanopecas.services.auth;

import br.com.mecanopecas.mecanopecas.model.Admin;
import br.com.mecanopecas.mecanopecas.model.Gerente;
import br.com.mecanopecas.mecanopecas.model.Vendedor;
import br.com.mecanopecas.mecanopecas.model.user.Role;
import br.com.mecanopecas.mecanopecas.persistence.AdminRepository;
import br.com.mecanopecas.mecanopecas.persistence.GerenteRepository;
import br.com.mecanopecas.mecanopecas.persistence.VendedorRepository;
import br.com.mecanopecas.mecanopecas.services.user.JwtService;
import br.com.mecanopecas.mecanopecas.util.dtos.request.AuthenticateRequestDTO;
import br.com.mecanopecas.mecanopecas.util.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.EnumSet;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final JwtService jwtService;
    private final VendedorRepository vendedorRepository;
    private final AdminRepository adminRepository;
    private final JwtEncoder jwtEncoder;
    private final GerenteRepository gerenteRepository;


    @Autowired
    public AuthenticationService(JwtService jwtService, VendedorRepository vendedorRepository, AdminRepository adminRepository, JwtEncoder jwtEncoder, GerenteRepository gerenteRepository) {
        this.jwtService = jwtService;
        this.vendedorRepository = vendedorRepository;
        this.adminRepository = adminRepository;
        this.jwtEncoder = jwtEncoder;
        this.gerenteRepository = gerenteRepository;
    }

//    public String authenticate(Authentication auth){
//        return jwtService.generateToken(auth);
//    }

    public String authenticate(AuthenticateRequestDTO authenticateRequestDTO){
        Optional<Admin> admin = adminRepository.findByEmailInstitucional(authenticateRequestDTO.email());
        if (admin.isPresent()) {
            if (admin.get().getPassword().equals(authenticateRequestDTO.password()) ) {
                return generateToken(admin.get().getId(), Role.ADMIN);
            }
        }

        Optional<Vendedor> vendedor = vendedorRepository.findByEmailInstitucional(authenticateRequestDTO.email());
        if (vendedor.isPresent()) {
            Optional<Gerente> gerente = gerenteRepository.findByVendedor(vendedor.get());
            if (vendedor.get().getPassword().equals(authenticateRequestDTO.password()) ) {
                return generateToken(vendedor.get().getId(), Role.VENDEDOR);
            } else if (gerente.isPresent()) {
                return generateToken(gerente.get().getId(), Role.GERENTE);
            }
        }
        throw new BadRequestException("Invalid email or password");
    }

    public String generateToken(Long id, Role role) {
        Instant now = Instant.now();
        long expiry = 3600L;

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("Mecanopecas")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject("Mecanopecas")
                .claim("role", role)
                .claim("id", id)
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

}
