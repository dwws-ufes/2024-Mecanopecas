package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.model.Roles;
import br.com.mecanopecas.mecanopecas.services.PecaService;
import br.com.mecanopecas.mecanopecas.util.dtos.request.PecaRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.PecaResponseDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pecas")
public class PecaController extends BaseController {

    private final PecaService pecaService;

    @Autowired
    public PecaController(final PecaService pecaService, @Qualifier("jwtDecoder") JwtDecoder jwtDecoder) {
        super(jwtDecoder);
        this.pecaService = pecaService;
    }

    @PostMapping
    public ResponseEntity<PecaResponseDTO> createPeca(@RequestHeader("Authorization") String auth, @Valid @RequestBody PecaRequestDTO pecaRequestDTO) {
        if (userInRoles(auth, List.of(Roles.GERENTE, Roles.ADMIN, Roles.VENDEDOR))) {
            return ResponseEntity.status(HttpStatus.CREATED).body(pecaService.create(pecaRequestDTO));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PecaResponseDTO> readPeca(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (userInRoles(auth, List.of(Roles.GERENTE, Roles.ADMIN, Roles.VENDEDOR))) {
            return ResponseEntity.ok(pecaService.read(id));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<PecaResponseDTO>> readAllPecas(@RequestHeader("Authorization") String auth) {
        if (userInRoles(auth, List.of(Roles.GERENTE, Roles.ADMIN, Roles.VENDEDOR))) {
            return ResponseEntity.ok(pecaService.readAll());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/ativas")
    public ResponseEntity<List<PecaResponseDTO>> readAllPecasAtivas(@RequestHeader("Authorization") String auth) {
        if (userInRoles(auth, List.of(Roles.GERENTE, Roles.ADMIN, Roles.VENDEDOR))) {
            return ResponseEntity.ok(pecaService.readAllAtivas());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PecaResponseDTO> updatePeca(@RequestHeader("Authorization") String auth, @PathVariable Long id, @Valid @RequestBody PecaRequestDTO pecaRequestDTO) {
        if (userInRoles(auth, List.of(Roles.GERENTE, Roles.ADMIN, Roles.VENDEDOR))) {
            return ResponseEntity.ok(pecaService.update(id, pecaRequestDTO));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePeca(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (userInRoles(auth, List.of(Roles.GERENTE, Roles.ADMIN, Roles.VENDEDOR))) {
            pecaService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
