package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.util.dtos.request.ClienteRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.ClienteResponseDTO;
import br.com.mecanopecas.mecanopecas.model.Cliente;
import br.com.mecanopecas.mecanopecas.persistence.ClienteRepository;
import br.com.mecanopecas.mecanopecas.util.mappers.ClienteMapper;
import br.com.mecanopecas.mecanopecas.util.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public ClienteResponseDTO create(ClienteRequestDTO clienteRequestDTO) {
        Cliente cliente = new Cliente();

        BeanUtils.copyProperties(clienteRequestDTO, cliente);
        cliente.setAtivo(true);
        Cliente clienteSaved = clienteRepository.save(cliente);

        return ClienteMapper.toDto(clienteSaved);
    }

    public ClienteResponseDTO read(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Cliente não encontrado."));
        return ClienteMapper.toDto(cliente);
    }

    public List<ClienteResponseDTO> readAll() {
        List<Cliente> clientes = clienteRepository.findAll();
        return ClienteMapper.toDtoList(clientes);
    }

    public List<ClienteResponseDTO> readAllAtivos() {
        List<Cliente> clientes = clienteRepository.findAll()
                .stream().filter(Cliente::isAtivo)
                .toList();

        return ClienteMapper.toDtoList(clientes);
    }

    public ClienteResponseDTO update(Long id, ClienteRequestDTO clienteRequestDTO) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Cliente não encontrado."));
        BeanUtils.copyProperties(clienteRequestDTO, cliente);
        Cliente clienteUpdated = clienteRepository.save(cliente);
        return ClienteMapper.toDto(clienteUpdated);
    }

    public void delete(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Cliente não encontrado."));

        cliente.setAtivo(false);

        clienteRepository.save(cliente);
    }
}
