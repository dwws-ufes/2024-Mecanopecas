package br.com.mecanopecas.mecanopecas.util.mappers;

import br.com.mecanopecas.mecanopecas.util.dtos.response.VendedorResponseDTO;
import br.com.mecanopecas.mecanopecas.model.Vendedor;

import java.util.List;
import java.util.stream.Collectors;

public class VendedorMapper {

    public static VendedorResponseDTO toDto(Vendedor vendedor) {
        return new VendedorResponseDTO(
                vendedor.getId(),
                vendedor.getNome()
        );
    }

    public static List<VendedorResponseDTO> toDtoList(List<Vendedor> vendedores) {
        return vendedores.stream()
                .map(VendedorMapper::toDto)
                .collect(Collectors.toList());
    }
}