package br.com.mecanopecas.mecanopecas.util.mappers;

import br.com.mecanopecas.mecanopecas.model.Peca;
import br.com.mecanopecas.mecanopecas.util.dtos.response.PecaResponseDTO;

import java.util.List;
import java.util.stream.Collectors;

public class PecaMapper {

    public static PecaResponseDTO toDto(Peca peca) {
        return new PecaResponseDTO(
                peca.getId(),
                peca.getNome(),
                peca.getPreco(),
                peca.getQtdEstoque()
        );
    }

    public static List<PecaResponseDTO> toDtoList(List<Peca> pecas) {
        return pecas.stream()
                .map(PecaMapper::toDto)
                .collect(Collectors.toList());
    }
}
