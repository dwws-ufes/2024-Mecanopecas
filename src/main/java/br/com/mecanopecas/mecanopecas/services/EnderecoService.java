package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.util.dtos.request.EnderecoRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.EnderecoResponseDTO;
import br.com.mecanopecas.mecanopecas.model.Cliente;
import br.com.mecanopecas.mecanopecas.model.Endereco;
import br.com.mecanopecas.mecanopecas.persistence.ClienteRepository;
import br.com.mecanopecas.mecanopecas.persistence.EnderecoRepository;
import br.com.mecanopecas.mecanopecas.util.mappers.EnderecoMapper;
import br.com.mecanopecas.mecanopecas.util.exceptions.ResourceNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnderecoService {

    private final EnderecoRepository enderecoRepository;
    private final ClienteRepository clienteRepository;

    @Autowired
    public EnderecoService(EnderecoRepository enderecoRepository, ClienteRepository clienteRepository) {
        this.enderecoRepository = enderecoRepository;
        this.clienteRepository = clienteRepository;
    }

    public List<EnderecoResponseDTO> readAllByCliente(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado."));

        return cliente.getEnderecos().stream()
                .filter(Endereco::isAtivo)
                .map(EnderecoMapper::toDto)
                .collect(Collectors.toList());
    }

    public EnderecoResponseDTO createForCliente(Long clienteId, EnderecoRequestDTO enderecoRequestDTO) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado."));

        Endereco endereco = new Endereco();
        BeanUtils.copyProperties(enderecoRequestDTO, endereco);
        endereco.setAtivo(true);

        cliente.getEnderecos().add(endereco);
        enderecoRepository.save(endereco);
        clienteRepository.save(cliente);

        return EnderecoMapper.toDto(endereco);
    }

    public void delete(Long clienteId, Long enderecoId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado."));

        Endereco endereco = cliente.getEnderecos().stream()
                .filter(e -> e.getId().equals(enderecoId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado para o cliente especificado."));

        endereco.setAtivo(false);
        enderecoRepository.save(endereco);
    }
}
