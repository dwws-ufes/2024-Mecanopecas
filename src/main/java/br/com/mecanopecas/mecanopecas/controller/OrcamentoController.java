package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.services.OrcamentoService;
import br.com.mecanopecas.mecanopecas.util.dtos.request.OrcamentoPecaRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.request.OrcamentoRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoDetailResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.VendaResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orcamentos")
public class OrcamentoController {

    private final OrcamentoService orcamentoService;

    public OrcamentoController(OrcamentoService orcamentoService) {
        this.orcamentoService = orcamentoService;
    }

    @GetMapping
    public ResponseEntity<List<OrcamentoResponseDTO>> readAllOrcamentos() {
        return ResponseEntity.ok(orcamentoService.getAllOrcamentos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrcamentoDetailResponseDTO> readOrcamento(@PathVariable Long id) {
        return ResponseEntity.ok(orcamentoService.getOrcamentoById(id));
    }

    @PostMapping
    public ResponseEntity<OrcamentoResponseDTO> createOrcamento(@RequestBody OrcamentoRequestDTO orcamentoRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orcamentoService.createOrcamento(orcamentoRequestDTO));
    }

    @PostMapping("/{id}/venda")
    public ResponseEntity<VendaResponseDTO> createVenda(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orcamentoService.createVenda(id));
    }

    @PutMapping("{id}/pecas")
    public ResponseEntity<OrcamentoDetailResponseDTO> createOrcamentoPeca(@PathVariable Long id, @RequestBody OrcamentoPecaRequestDTO orcamentoPecaRequestDTO) {
        return ResponseEntity.ok(orcamentoService.createOrcamentoPeca(id, orcamentoPecaRequestDTO));
    }

    @PutMapping("/{id}/desconto")
    public ResponseEntity<OrcamentoDetailResponseDTO> applyDescontoOrcamento(@PathVariable Long id, @RequestParam double desconto) {
        return ResponseEntity.ok(orcamentoService.applyDescontoOrcamento(id, desconto));
    }
}
