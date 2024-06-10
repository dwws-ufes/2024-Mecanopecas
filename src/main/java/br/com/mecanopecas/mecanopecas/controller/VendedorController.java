package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.model.Roles;
import br.com.mecanopecas.mecanopecas.services.VendedorService;
import br.com.mecanopecas.mecanopecas.util.dtos.request.VendedorRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.VendedorResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/vendedores")
public class VendedorController extends BaseController {

    private final VendedorService vendedorService;

    @Autowired
    public VendedorController(VendedorService vendedorService, @Qualifier("jwtDecoder") JwtDecoder jwtDecoder) {
        super(jwtDecoder);
        this.vendedorService = vendedorService;
    }

    @PostMapping()
    public ResponseEntity<VendedorResponseDTO> createVendedor(@RequestHeader("Authorization") String auth, @Valid @RequestBody VendedorRequestDTO vendedorRequestDTO){
        if (userInRoles(auth, List.of(Roles.GERENTE, Roles.ADMIN))) {
            return ResponseEntity.status(HttpStatus.CREATED).body(vendedorService.create(vendedorRequestDTO));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendedorResponseDTO> readVendedor(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (userInRoles(auth, List.of(Roles.GERENTE, Roles.ADMIN))) {
            return ResponseEntity.ok(vendedorService.read(id));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<VendedorResponseDTO>> readAllVendedores(@RequestHeader("Authorization") String auth) {
        if (userInRoles(auth, List.of(Roles.GERENTE, Roles.ADMIN))) {
            return ResponseEntity.ok(vendedorService.readAll());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<VendedorResponseDTO>> readAllVendedoresAtivos(@RequestHeader("Authorization") String auth) {
        if (userInRoles(auth, List.of(Roles.GERENTE, Roles.ADMIN))) {
            return ResponseEntity.ok(vendedorService.readAllAtivos());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<VendedorResponseDTO> updateVendedor(@RequestHeader("Authorization") String auth, @PathVariable Long id, @Valid @RequestBody VendedorRequestDTO vendedorRequestDTO){
        if (userInRoles(auth, List.of(Roles.GERENTE, Roles.ADMIN))) {
            return ResponseEntity.ok(vendedorService.update(id, vendedorRequestDTO));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendedor(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (userInRoles(auth, List.of(Roles.GERENTE, Roles.ADMIN))) {
            vendedorService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
