package br.com.mecanopecas.mecanopecas.util.dtos.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record OrcamentoReportResponseDTO(
        String titulo,
        String solicitante,
        LocalDateTime dataGeracao,
        LocalDate dataInicio,
        LocalDate dataFim,
        List<OrcamentoResponseDTO> dados
) {}
