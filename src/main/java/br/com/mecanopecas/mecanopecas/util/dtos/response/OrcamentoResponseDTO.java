package br.com.mecanopecas.mecanopecas.util.dtos.response;

import java.time.LocalDateTime;

public record OrcamentoResponseDTO(Long id, String codigo, String clienteNome, LocalDateTime DataOrcamento, LocalDateTime dataExpiracao, String status) {
}