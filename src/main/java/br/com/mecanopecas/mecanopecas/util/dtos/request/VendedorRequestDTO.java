package br.com.mecanopecas.mecanopecas.util.dtos.request;

import java.time.LocalDate;

public record VendedorRequestDTO(Long id,
                                 String nome,
                                 String cpf,
                                 String telefone,
                                 String emailInstitucional,
                                 String password,
                                 LocalDate dataNascimento,
                                 boolean ativo) { }
