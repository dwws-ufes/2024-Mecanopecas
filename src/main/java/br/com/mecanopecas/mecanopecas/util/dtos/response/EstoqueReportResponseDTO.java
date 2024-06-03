package br.com.mecanopecas.mecanopecas.util.dtos.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record EstoqueReportResponseDTO(
        String titulo,
        String solicitante,
        LocalDateTime dataGeracao,
        List<PecaResponseDTO> dados
) {}
