package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.util.dtos.response.GerenteResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.request.GerenteRequestDTO;
import br.com.mecanopecas.mecanopecas.services.GerenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gerentes")
public class GerenteController {

    private final GerenteService gerenteService;

    @Autowired
    public GerenteController(final GerenteService gerenteService) {
        this.gerenteService = gerenteService;
    }

    @PostMapping("/")
    public ResponseEntity<GerenteResponseDTO> createGerente(@RequestBody GerenteRequestDTO gerenteRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(gerenteService.create(gerenteRequestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GerenteResponseDTO> readGerente(@PathVariable Long id) {
        return ResponseEntity.ok(gerenteService.read(id));
    }

    @GetMapping("/")
    public ResponseEntity<List<GerenteResponseDTO>> readAllGerentes() {
        return ResponseEntity.ok(gerenteService.readAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GerenteResponseDTO> updateGerente(@PathVariable Long id, @RequestBody GerenteRequestDTO gerenteRequestDTO) {
        return ResponseEntity.ok(gerenteService.update(id, gerenteRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGerente(@PathVariable Long id) {
        gerenteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
