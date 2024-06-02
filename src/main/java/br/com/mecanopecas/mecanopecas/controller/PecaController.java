package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.util.dtos.request.PecaRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.PecaResponseDTO;
import br.com.mecanopecas.mecanopecas.services.PecaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pecas")
public class PecaController {

    private final PecaService pecaService;

    @Autowired
    public PecaController(final PecaService pecaService) {
        this.pecaService = pecaService;
    }

    @PostMapping("/")
    public ResponseEntity<PecaResponseDTO> createPeca(@RequestBody PecaRequestDTO pecaRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pecaService.create(pecaRequestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PecaResponseDTO> readPeca(@PathVariable Long id) {
        return ResponseEntity.ok(pecaService.read(id));
    }

    @GetMapping("/")
    public ResponseEntity<List<PecaResponseDTO>> readAllPecas() {
        return ResponseEntity.ok(pecaService.readAll());
    }

    @GetMapping("/ativas")
    public ResponseEntity<List<PecaResponseDTO>> readAllPecasAtivas() {
        return ResponseEntity.ok(pecaService.readAllAtivas());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PecaResponseDTO> updatePeca(@PathVariable Long id, @RequestBody PecaRequestDTO pecaRequestDTO) {
        return ResponseEntity.ok(pecaService.update(id, pecaRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePeca(@PathVariable Long id) {
        pecaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
