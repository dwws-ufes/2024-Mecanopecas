package br.com.mecanopecas.mecanopecas.util.mappers;

import br.com.mecanopecas.mecanopecas.util.dtos.response.GerenteResponseDTO;
import br.com.mecanopecas.mecanopecas.model.Gerente;

import java.util.List;
import java.util.stream.Collectors;

public class GerenteMapper {

    public static GerenteResponseDTO toDto(Gerente gerente) {
        return new GerenteResponseDTO(
                gerente.getId(),
                gerente.getNome(),
                gerente.getDataPromocao(),
                gerente.getCodigoDesconto(),
                gerente.getPercentualMaxDesconto()
        );
    }

    public static List<GerenteResponseDTO> toDtoList(List<Gerente> gerentes) {
        return gerentes.stream()
                .map(GerenteMapper::toDto)
                .collect(Collectors.toList());
    }
}
