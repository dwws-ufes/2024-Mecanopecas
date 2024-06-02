package br.com.mecanopecas.mecanopecas.util.dtos.response;

import java.time.LocalDateTime;

public record VendaResponseDTO(Long id, LocalDateTime dataVenda, Double valorTotal) { }
