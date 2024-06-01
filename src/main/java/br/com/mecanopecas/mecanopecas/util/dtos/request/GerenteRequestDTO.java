package br.com.mecanopecas.mecanopecas.util.dtos.request;

import java.time.LocalDate;

public record GerenteRequestDTO(Long id,
                                String nome,
                                String cpf,
                                String telefone,
                                String emailInstitucional,
                                String password,
                                LocalDate dataNascimento,
                                LocalDate dataPromocao,
                                Double codigoDesconto,
                                Double percentualMaxDesconto) {
}
