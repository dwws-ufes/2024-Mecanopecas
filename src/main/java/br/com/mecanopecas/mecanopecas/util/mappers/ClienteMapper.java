package br.com.mecanopecas.mecanopecas.util.mappers;

import br.com.mecanopecas.mecanopecas.model.Cliente;
import br.com.mecanopecas.mecanopecas.util.dtos.response.ClienteResponseDTO;

import java.util.List;
import java.util.stream.Collectors;

public class ClienteMapper {

    public static ClienteResponseDTO toDto(Cliente cliente) {
        return new ClienteResponseDTO(
                cliente.getId(),
                cliente.getCpfCnpj(),
                cliente.getNome(),
                OrcamentoMapper.toDtoList(cliente.getOrcamentos()),
                cliente.getDataNascimento(),
                cliente.isAtivo()
        );
    }

    public static List<ClienteResponseDTO> toDtoList(List<Cliente> clientes) {
        return clientes.stream()
                .map(ClienteMapper::toDto)
                .collect(Collectors.toList());
    }
}

