package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.model.Roles;
import br.com.mecanopecas.mecanopecas.util.dtos.response.GerenteResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.request.GerenteRequestDTO;
import br.com.mecanopecas.mecanopecas.services.GerenteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gerentes")
public class GerenteController extends BaseController {

    private final GerenteService gerenteService;

    @Autowired
    public GerenteController(final GerenteService gerenteService, @Qualifier("jwtDecoder") JwtDecoder jwtDecoder) {
        super(jwtDecoder);
        this.gerenteService = gerenteService;
    }

    @PostMapping("/{vendedorId}")
    public ResponseEntity<GerenteResponseDTO> createGerente(@RequestHeader("Authorization") String auth,
                                                            @PathVariable Long vendedorId,
                                                            @Valid @RequestBody GerenteRequestDTO gerenteRequestDTO) {
        if (userInRoles(auth, List.of(Roles.ADMIN))) {
            return ResponseEntity.status(HttpStatus.CREATED).body(gerenteService.create(vendedorId, gerenteRequestDTO));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<GerenteResponseDTO> readGerente(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (userInRoles(auth, List.of(Roles.ADMIN))) {
            return ResponseEntity.ok(gerenteService.read(id));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<GerenteResponseDTO>> readAllGerentes(@RequestHeader("Authorization") String auth) {
        if (userInRoles(auth, List.of(Roles.ADMIN))) {
            return ResponseEntity.ok(gerenteService.readAll());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<GerenteResponseDTO> updateGerente(@RequestHeader("Authorization") String auth,
                                                            @PathVariable Long id,
                                                            @Valid @RequestBody GerenteRequestDTO gerenteRequestDTO) {
        if (userInRoles(auth, List.of(Roles.ADMIN))) {
            return ResponseEntity.ok(gerenteService.update(id, gerenteRequestDTO));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGerente(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (userInRoles(auth, List.of(Roles.ADMIN))) {
            gerenteService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
