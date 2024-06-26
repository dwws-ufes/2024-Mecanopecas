package br.com.mecanopecas.mecanopecas.util.mappers;

import br.com.mecanopecas.mecanopecas.util.dtos.response.VendedorResponseDTO;
import br.com.mecanopecas.mecanopecas.model.Vendedor;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class VendedorMapper {

    public static VendedorResponseDTO toDto(Vendedor vendedor) {
        return new VendedorResponseDTO(
                vendedor.getId(),
                vendedor.getNome(),
                vendedor.getCpf(),
                vendedor.getTelefone(),
                vendedor.getEmailInstitucional(),
                vendedor.getDataNascimento(),
                vendedor.isAtivo()

        );
    }

    public static List<VendedorResponseDTO> toDtoList(List<Vendedor> vendedores) {
        if (vendedores == null) {
            return Collections.emptyList();
        }

        return vendedores.stream()
                .map(VendedorMapper::toDto)
                .collect(Collectors.toList());
    }
}