package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.model.Roles;
import br.com.mecanopecas.mecanopecas.services.RelatorioService;
import br.com.mecanopecas.mecanopecas.util.dtos.response.EstoqueReportResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoReportResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.VendaReportResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioController extends BaseController {

    private final RelatorioService relatorioService;

    @Autowired
    public RelatorioController(RelatorioService relatorioService, @Qualifier("jwtDecoder") JwtDecoder jwtDecoder) {
        super(jwtDecoder);
        this.relatorioService = relatorioService;
    }

    @GetMapping("/estoque")
    public ResponseEntity<EstoqueReportResponseDTO> getEstoqueReport(@RequestHeader("Authorization") String auth) {
        if (userInRoles(auth, List.of(Roles.GERENTE))) {
            return ResponseEntity.ok(relatorioService.getEstoqueReport(getGerenteId(auth)));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/orcamentos")
    public ResponseEntity<OrcamentoReportResponseDTO> getOrcamentoReport(@RequestHeader("Authorization") String auth,
                                                                         @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
                                                                         @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {
        if (userInRoles(auth, List.of(Roles.GERENTE))) {
            return ResponseEntity.ok(relatorioService.getOrcamentoReport(getGerenteId(auth), dataInicio, dataFim));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/vendas")
    public ResponseEntity<VendaReportResponseDTO> getVendaReport(@RequestHeader("Authorization") String auth,
                                                                 @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
                                                                 @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {
        if (userInRoles(auth, List.of(Roles.GERENTE))) {
            return ResponseEntity.ok(relatorioService.getVendaReport(getGerenteId(auth), dataInicio, dataFim));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
