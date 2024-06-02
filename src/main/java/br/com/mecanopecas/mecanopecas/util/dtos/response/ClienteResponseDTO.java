package br.com.mecanopecas.mecanopecas.util.dtos.response;

import java.util.Date;
import java.util.List;

public record ClienteResponseDTO(Long id,
                                 String cpfCnpj,
                                 String nome,
                                 //List<OrcamentoResponseDTO> orcamentos,
                                 Date dataNascimento,
                                 boolean ativo ) { }
