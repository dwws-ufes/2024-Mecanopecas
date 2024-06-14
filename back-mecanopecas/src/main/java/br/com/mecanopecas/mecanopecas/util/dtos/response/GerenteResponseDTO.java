package br.com.mecanopecas.mecanopecas.util.dtos.response;

import java.time.LocalDateTime;

public record GerenteResponseDTO(Long id,
                                 String nome,
                                 String cpf,
                                 String emailInstituicional,
                                 LocalDateTime dataPromocao,
                                 Double percentualMaxDesconto) {
}
