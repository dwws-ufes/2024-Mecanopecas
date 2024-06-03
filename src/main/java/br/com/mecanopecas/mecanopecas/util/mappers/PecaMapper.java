package br.com.mecanopecas.mecanopecas.util.mappers;

import br.com.mecanopecas.mecanopecas.model.Peca;
import br.com.mecanopecas.mecanopecas.util.dtos.response.PecaResponseDTO;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class PecaMapper {

    public static PecaResponseDTO toDto(Peca peca) {
        return new PecaResponseDTO(
                peca.getId(),
                peca.getNome(),
                peca.getPreco(),
                peca.getQtdEstoque(),
                peca.isAtivo()
        );
    }

    public static List<PecaResponseDTO> toDtoList(List<Peca> pecas) {
        if (pecas == null) {
            return Collections.emptyList();
        }

        return pecas.stream()
                .map(PecaMapper::toDto)
                .collect(Collectors.toList());
    }
}
