package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.util.dtos.request.EnderecoRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.EnderecoResponseDTO;
import br.com.mecanopecas.mecanopecas.services.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes/{clienteId}/enderecos")
public class EnderecoController {

    private final EnderecoService enderecoService;

    @Autowired
    public EnderecoController(final EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }

    @GetMapping("/")
    public ResponseEntity<List<EnderecoResponseDTO>> readAllEnderecosByCliente(@PathVariable Long clienteId) {
        return ResponseEntity.ok(enderecoService.readAllByCliente(clienteId));
    }

    @PostMapping("/")
    public ResponseEntity<EnderecoResponseDTO> createEnderecoForCliente(@PathVariable Long clienteId, @RequestBody EnderecoRequestDTO enderecoRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(enderecoService.createForCliente(clienteId, enderecoRequestDTO));
    }

    @DeleteMapping("/{enderecoId}")
    public ResponseEntity<Void> deleteEnderecoForCliente(@PathVariable Long clienteId, @PathVariable Long enderecoId) {
        enderecoService.delete(clienteId, enderecoId);
        return ResponseEntity.noContent().build();
    }
}
