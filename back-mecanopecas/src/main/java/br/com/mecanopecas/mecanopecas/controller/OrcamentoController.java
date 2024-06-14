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
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orcamentos")
public class OrcamentoController extends BaseController {

    private final OrcamentoService orcamentoService;

    public OrcamentoController(OrcamentoService orcamentoService, @Qualifier("jwtDecoder") JwtDecoder jwtDecoder) {
        super(jwtDecoder);
        this.orcamentoService = orcamentoService;
    }

    @GetMapping
    public ResponseEntity<List<OrcamentoResponseDTO>> readAllOrcamentos(@RequestHeader("Authorization") String auth) {
        if (userInRoles(auth, List.of(Roles.VENDEDOR, Roles.GERENTE))) {
            return ResponseEntity.ok(orcamentoService.getAllOrcamentos());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrcamentoDetailResponseDTO> readOrcamento(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (userInRoles(auth, List.of(Roles.VENDEDOR, Roles.GERENTE))) {
            return ResponseEntity.ok(orcamentoService.getOrcamentoById(id));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping
    public ResponseEntity<OrcamentoResponseDTO> createOrcamento(@RequestHeader("Authorization") String auth, @Valid @RequestBody OrcamentoRequestDTO orcamentoRequestDTO) {
        if (userInRoles(auth, List.of(Roles.VENDEDOR, Roles.GERENTE))) {
            return ResponseEntity.status(HttpStatus.CREATED).body(orcamentoService.createOrcamento(getVendedorId(auth), orcamentoRequestDTO));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/{id}/venda")
    public ResponseEntity<VendaResponseDTO> createVenda(@RequestHeader("Authorization") String auth, @PathVariable Long id) {
        if (userInRoles(auth, List.of(Roles.VENDEDOR, Roles.GERENTE))) {
            return ResponseEntity.status(HttpStatus.CREATED).body(orcamentoService.createVenda(id));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("{id}/pecas")
    public ResponseEntity<OrcamentoDetailResponseDTO> createOrcamentoPeca(@RequestHeader("Authorization") String auth, @PathVariable Long id, @Valid @RequestBody OrcamentoPecaRequestDTO orcamentoPecaRequestDTO) {
        if (userInRoles(auth, List.of(Roles.VENDEDOR, Roles.GERENTE))) {
            return ResponseEntity.ok(orcamentoService.addOrcamentoPeca(id, orcamentoPecaRequestDTO));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("{id}/pecas/{orcamentoPecaId}")
    public ResponseEntity<OrcamentoDetailResponseDTO> removeOrcamentoPeca(@RequestHeader("Authorization") String auth, @PathVariable Long id, @PathVariable Long orcamentoPecaId) {
        if (userInRoles(auth, List.of(Roles.VENDEDOR, Roles.GERENTE))) {
            return ResponseEntity.ok(orcamentoService.removeOrcamentoPeca(id, orcamentoPecaId));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/{id}/desconto")
    public ResponseEntity<OrcamentoDetailResponseDTO> applyDescontoOrcamento(@RequestHeader("Authorization") String auth, @PathVariable Long id, @RequestParam double descontoPercentual) {
        if (userInRoles(auth, List.of(Roles.GERENTE))) {
            return ResponseEntity.ok(orcamentoService.applyDescontoOrcamento(id, getGerenteId(auth), descontoPercentual));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
