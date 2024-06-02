package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.util.dtos.response.PecaResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.VendedorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.com.mecanopecas.mecanopecas.util.dtos.request.VendedorRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import br.com.mecanopecas.mecanopecas.services.VendedorService;

import java.util.List;

@RestController
@RequestMapping("/api/vendedores")
public class VendedorController {

    private final VendedorService vendedorService;

    @Autowired
    public VendedorController(final VendedorService vendedorService) {
        this.vendedorService = vendedorService;
    }

    @PostMapping("/")
    public ResponseEntity<VendedorResponseDTO> createVendedor(@RequestBody VendedorRequestDTO vendedorRequestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(vendedorService.create(vendedorRequestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendedorResponseDTO> readVendedor(@PathVariable Long id) {
        return ResponseEntity.ok(vendedorService.read(id));
    }

    @GetMapping("/")
    public ResponseEntity<List<VendedorResponseDTO>> readAllVendedores() {
        return ResponseEntity.ok(vendedorService.readAll());
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<VendedorResponseDTO>> readAllVendedoresAtivos() {
        return ResponseEntity.ok(vendedorService.readAllAtivos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<VendedorResponseDTO> updateVendedor(@PathVariable Long id, @RequestBody VendedorRequestDTO vendedorRequestDTO){
        return ResponseEntity.ok(vendedorService.update(id, vendedorRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendedor(@PathVariable Long id) {
        vendedorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
