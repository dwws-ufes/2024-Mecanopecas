package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.model.Roles;
import br.com.mecanopecas.mecanopecas.util.dtos.request.ClienteRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.ClienteResponseDTO;
import br.com.mecanopecas.mecanopecas.services.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController extends BaseController {

    private final ClienteService clienteService;

    @Autowired
    public ClienteController(final ClienteService clienteService, @Qualifier("jwtDecoder") JwtDecoder jwtDecoder) {
        super(jwtDecoder);
        this.clienteService = clienteService;
    }

    @PostMapping
    public ResponseEntity<ClienteResponseDTO> createCliente(@RequestHeader("Authorization") String auth,
                                                            @Valid @RequestBody ClienteRequestDTO clienteRequestDTO) {
        if (userInRoles(auth, List.of(Roles.VENDEDOR, Roles.GERENTE, Roles.ADMIN))) {
            return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.create(clienteRequestDTO));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> readCliente(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (userInRoles(auth, List.of(Roles.VENDEDOR, Roles.GERENTE, Roles.ADMIN))) {
            return ResponseEntity.ok(clienteService.read(id));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> readAllClientes(@RequestHeader("Authorization") String auth) {
        if (userInRoles(auth, List.of(Roles.VENDEDOR, Roles.GERENTE, Roles.ADMIN))) {
            return ResponseEntity.ok(clienteService.readAll());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<ClienteResponseDTO>> readAllClientesAtivos(@RequestHeader("Authorization") String auth) {
        if (userInRoles(auth, List.of(Roles.VENDEDOR, Roles.GERENTE, Roles.ADMIN))) {
            return ResponseEntity.ok(clienteService.readAllAtivos());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> updateCliente(@RequestHeader("Authorization") String auth,
                                                            @PathVariable Long id, @Valid @RequestBody ClienteRequestDTO clienteRequestDTO) {
        if (userInRoles(auth, List.of(Roles.VENDEDOR, Roles.GERENTE, Roles.ADMIN))) {
            return ResponseEntity.ok(clienteService.update(id, clienteRequestDTO));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (userInRoles(auth, List.of(Roles.VENDEDOR, Roles.GERENTE, Roles.ADMIN))) {
            clienteService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
