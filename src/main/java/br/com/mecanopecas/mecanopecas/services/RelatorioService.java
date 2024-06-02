package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.model.Gerente;
import br.com.mecanopecas.mecanopecas.persistence.GerenteRepository;
import br.com.mecanopecas.mecanopecas.util.dtos.response.*;
import br.com.mecanopecas.mecanopecas.util.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RelatorioService {

    private final GerenteRepository gerenteRepository;

    private final PecaService pecaService;
    private final OrcamentoService orcamentoService;
    private final VendaService vendaService;

    @Autowired
    public RelatorioService(GerenteRepository gerenteRepository, PecaService pecaService, OrcamentoService orcamentoService, VendaService vendaService) {
        this.gerenteRepository = gerenteRepository;
        this.pecaService = pecaService;
        this.orcamentoService = orcamentoService;
        this.vendaService = vendaService;
    }

    public EstoqueReportResponseDTO getEstoqueReport(Long gerenteId) {
        List<PecaResponseDTO> pecas = pecaService.readAll();
        return new EstoqueReportResponseDTO("Relatório de Estoque", getGerenteNome(gerenteId), LocalDateTime.now(), pecas);
    }

    public OrcamentoReportResponseDTO getOrcamentoReport(Long gerenteId, LocalDate dataInicio, LocalDate dataFim) {
        List<OrcamentoResponseDTO> orcamentos = orcamentoService.getOrcamentosWithinDateRange(dataInicio, dataFim);
        return new OrcamentoReportResponseDTO("Relatório de Orçamento", getGerenteNome(gerenteId), LocalDateTime.now(), dataInicio, dataFim, orcamentos);
    }

    public VendaReportResponseDTO getVendaReport(Long gerenteId, LocalDate dataInicio, LocalDate dataFim) {
        List<VendaResponseDTO> vendas = vendaService.getVendasWithinDateRange(dataInicio, dataFim);
        return new VendaReportResponseDTO("Relatório de Venda", getGerenteNome(gerenteId), LocalDateTime.now(), dataInicio, dataFim, vendas);
    }

    private String getGerenteNome(Long gerenteId)
    {
        Gerente gerente = gerenteRepository.findById(gerenteId)
                .orElseThrow(() -> new NotFoundException("Gerente não encontrado."));

        return gerente.getVendedor().getNome();
    }
}
