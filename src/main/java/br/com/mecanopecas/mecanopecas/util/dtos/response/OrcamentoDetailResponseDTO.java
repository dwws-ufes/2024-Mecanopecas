package br.com.mecanopecas.mecanopecas.util.dtos.response;

import java.time.LocalDateTime;
import java.util.List;

public record OrcamentoDetailResponseDTO(Long id, String codigo, String clienteNome, String vendedorNome, LocalDateTime DataOrcamento, LocalDateTime dataExpiracao, Double valor, Double percentualDesconto, Double valorTotal, List<OrcamentoPecaResponseDTO> pecas, String status) {
}
