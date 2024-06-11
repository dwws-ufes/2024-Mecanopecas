package br.com.mecanopecas.mecanopecas.util.dtos.response;

import java.time.LocalDate;

public record VendedorResponseDTO(Long id,
                                  String nome,
                                  String cpf,
                                  String telefone,
                                  String emailInstitucional,
                                  LocalDate dataNascimento,
                                  boolean ativo) {  }

