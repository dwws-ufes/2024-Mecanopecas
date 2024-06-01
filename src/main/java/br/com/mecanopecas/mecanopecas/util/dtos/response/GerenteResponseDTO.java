package br.com.mecanopecas.mecanopecas.util.dtos.response;

import java.time.LocalDate;

public record GerenteResponseDTO(Long id,
                                 String nome,
                                 LocalDate dataPromocao,
                                 Double codigoDesconto,
                                 Double percentualMaxDesconto) {
}
