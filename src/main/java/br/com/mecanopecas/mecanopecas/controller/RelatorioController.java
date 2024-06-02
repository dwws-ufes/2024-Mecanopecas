package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.services.RelatorioService;
import br.com.mecanopecas.mecanopecas.util.dtos.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

    private final RelatorioService relatorioService;

    @Autowired
    public RelatorioController(RelatorioService relatorioService) {
        this.relatorioService = relatorioService;
    }

    @GetMapping("/estoque")
    public ResponseEntity<EstoqueReportResponseDTO> getEstoqueReport() {
        //obter gerenteId do token
        Long gerenteId = 1L;

        return ResponseEntity.ok(relatorioService.getEstoqueReport(gerenteId));
    }

    @GetMapping("/orcamentos")
    public ResponseEntity<OrcamentoReportResponseDTO> getOrcamentoReport(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {
        //obter gerenteId do token
        Long gerenteId = 1L;

        return ResponseEntity.ok(relatorioService.getOrcamentoReport(gerenteId, dataInicio, dataFim));
    }

    @GetMapping("/vendas")
    public ResponseEntity<VendaReportResponseDTO> getVendaReport(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {
        //obter gerenteId do token
        Long gerenteId = 1L;

        return ResponseEntity.ok(relatorioService.getVendaReport(gerenteId, dataInicio, dataFim));
    }
}
