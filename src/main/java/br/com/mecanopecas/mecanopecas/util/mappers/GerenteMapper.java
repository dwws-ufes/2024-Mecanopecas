package br.com.mecanopecas.mecanopecas.util.mappers;

import br.com.mecanopecas.mecanopecas.model.Gerente;
import br.com.mecanopecas.mecanopecas.util.dtos.response.GerenteResponseDTO;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class GerenteMapper {

    public static GerenteResponseDTO toDto(Gerente gerente) {
        return new GerenteResponseDTO(
                gerente.getId(),
                gerente.getVendedor().getNome(),
                gerente.getVendedor().getCpf(),
                gerente.getVendedor().getEmailInstitucional(),
                gerente.getDataPromovido(),
                gerente.getPercentualMaxDesconto()
        );
    }

    public static List<GerenteResponseDTO> toDtoList(List<Gerente> gerentes) {
        if (gerentes == null) {
            return Collections.emptyList();
        }

        return gerentes.stream()
                .map(GerenteMapper::toDto)
                .collect(Collectors.toList());
    }
}
