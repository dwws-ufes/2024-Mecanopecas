package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.services.OrcamentoService;
import br.com.mecanopecas.mecanopecas.util.dtos.request.OrcamentoPecaRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.request.OrcamentoRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoDetailResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.VendaResponseDTO;
import jakarta.validation.Valid;
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
    public ResponseEntity<OrcamentoResponseDTO> createOrcamento(@Valid @RequestBody OrcamentoRequestDTO orcamentoRequestDTO) {
        //obter vendedorId do token
        Long vendedorId = 1L;
        return ResponseEntity.status(HttpStatus.CREATED).body(orcamentoService.createOrcamento(vendedorId, orcamentoRequestDTO));
    }

    @PostMapping("/{id}/venda")
    public ResponseEntity<VendaResponseDTO> createVenda(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orcamentoService.createVenda(id));
    }

    @PostMapping("{id}/pecas")
    public ResponseEntity<OrcamentoDetailResponseDTO> createOrcamentoPeca(@PathVariable Long id, @Valid @RequestBody OrcamentoPecaRequestDTO orcamentoPecaRequestDTO) {
        return ResponseEntity.ok(orcamentoService.addOrcamentoPeca(id, orcamentoPecaRequestDTO));
    }

    @DeleteMapping("{id}/pecas/{orcamentoPecaId}")
    public ResponseEntity<OrcamentoDetailResponseDTO> removeOrcamentoPeca(@PathVariable Long id, @PathVariable Long orcamentoPecaId) {
        return ResponseEntity.ok(orcamentoService.removeOrcamentoPeca(id, orcamentoPecaId));
    }

    @PutMapping("/{id}/desconto")
    public ResponseEntity<OrcamentoDetailResponseDTO> applyDescontoOrcamento(@PathVariable Long id, @RequestParam double descontoPercentual) {
        //obter gerenteId do token
        Long gerenteId = 1L;
        return ResponseEntity.ok(orcamentoService.applyDescontoOrcamento(id, gerenteId, descontoPercentual));
    }
}
