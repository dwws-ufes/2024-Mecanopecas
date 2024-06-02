
package br.com.mecanopecas.mecanopecas.util.dtos.request;

import java.util.Date;

public record OrcamentoRequestDTO(String codigo, Date dataExpiracao, Long vendedorId, Long clienteId) {
}

