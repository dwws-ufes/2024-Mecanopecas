package br.com.mecanopecas.mecanopecas.util.dtos.request;

import java.util.Date;

public record ClienteRequestDTO(String cpfCnpj,
                                String nome,
                                Date dataNascimento,
                                boolean ativo) {
}
