package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.model.Roles;
import br.com.mecanopecas.mecanopecas.services.OrcamentoService;
import br.com.mecanopecas.mecanopecas.util.dtos.request.OrcamentoPecaRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.request.OrcamentoRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoDetailResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.VendaResponseDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/orcamentos")
public class OrcamentoController {

    private final OrcamentoService orcamentoService;
    private final JwtDecoder jwtDecoder;

    public OrcamentoController(OrcamentoService orcamentoService, @Qualifier("jwtDecoder") JwtDecoder jwtDecoder) {
        this.orcamentoService = orcamentoService;
        this.jwtDecoder = jwtDecoder;
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
    public ResponseEntity<OrcamentoResponseDTO> createOrcamento(@RequestHeader("Authorization") String auth, @Valid @RequestBody OrcamentoRequestDTO orcamentoRequestDTO) {
        // obter gerenteId do token
        if (auth != null && auth.startsWith("Bearer ")) {
            String token = auth.substring(7);
            Jwt jwt = jwtDecoder.decode(token);
            Long vendedorId = jwt.getClaim("vendedorId");
            return ResponseEntity.status(HttpStatus.CREATED).body(orcamentoService.createOrcamento(1L, orcamentoRequestDTO));
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token invalido");
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
    public ResponseEntity<OrcamentoDetailResponseDTO> applyDescontoOrcamento(@RequestHeader("Authorization") String auth , @PathVariable Long id, @RequestParam double descontoPercentual) {
        //obter gerenteId do token
        if (auth != null && auth.startsWith("Bearer ")) {
            String token = auth.substring(7);
            Jwt jwt = jwtDecoder.decode(token);
            Long gerenteId = jwt.getClaim("gerenteId");
            return ResponseEntity.ok(orcamentoService.applyDescontoOrcamento(id, gerenteId, descontoPercentual));
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token invalido");
    }
}
