package br.com.mecanopecas.mecanopecas.util.dtos.request;

import java.time.LocalDate;

public record GerenteRequestDTO(LocalDate dataPromocao,
                                Double codigoDesconto,
                                Double percentualMaxDesconto) {
}
