package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.util.dtos.request.ClienteRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.ClienteResponseDTO;
import br.com.mecanopecas.mecanopecas.services.ClienteService;
import br.com.mecanopecas.mecanopecas.util.dtos.response.VendedorResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    @Autowired
    public ClienteController(final ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping()
    public ResponseEntity<ClienteResponseDTO> createCliente(@RequestBody ClienteRequestDTO clienteRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.create(clienteRequestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> readCliente(@PathVariable Long id) {
        return ResponseEntity.ok(clienteService.read(id));
    }

    @GetMapping()
    public ResponseEntity<List<ClienteResponseDTO>> readAllClientes() {
        return ResponseEntity.ok(clienteService.readAll());
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<ClienteResponseDTO>> readAllClientesAtivos() {
        return ResponseEntity.ok(clienteService.readAllAtivos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> updateCliente(@PathVariable Long id, @RequestBody ClienteRequestDTO clienteRequestDTO) {
        return ResponseEntity.ok(clienteService.update(id, clienteRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        clienteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
