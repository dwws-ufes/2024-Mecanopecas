package br.com.mecanopecas.mecanopecas.util.mappers;

import br.com.mecanopecas.mecanopecas.model.Endereco;
import br.com.mecanopecas.mecanopecas.util.dtos.response.EnderecoResponseDTO;

import java.util.List;
import java.util.stream.Collectors;

public class EnderecoMapper {

    public static EnderecoResponseDTO toDto(Endereco endereco) {
        return new EnderecoResponseDTO(
                endereco.getId(),
                endereco.getCep(),
                endereco.getBairro(),
                endereco.getNumero(),
                endereco.getEndereco(),
                endereco.getPontoReferencia(),
                endereco.getComplemento()
        );
    }

    public static List<EnderecoResponseDTO> toDtoList(List<Endereco> enderecos) {
        return enderecos.stream()
                .map(EnderecoMapper::toDto)
                .collect(Collectors.toList());
    }
}
