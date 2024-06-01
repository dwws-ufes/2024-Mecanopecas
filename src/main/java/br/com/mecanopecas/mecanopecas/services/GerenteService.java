package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.util.dtos.response.GerenteResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.request.GerenteRequestDTO;
import br.com.mecanopecas.mecanopecas.model.Gerente;
import br.com.mecanopecas.mecanopecas.persistence.GerenteRepository;
import br.com.mecanopecas.mecanopecas.util.exceptions.ResourceNotFoundException;
import br.com.mecanopecas.mecanopecas.util.mappers.GerenteMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GerenteService {

    private final GerenteRepository gerenteRepository;

    @Autowired
    public GerenteService(GerenteRepository gerenteRepository) {
        this.gerenteRepository = gerenteRepository;
    }

    public GerenteResponseDTO create(GerenteRequestDTO gerenteRequestDTO) {
        Gerente gerente = new Gerente();
        BeanUtils.copyProperties(gerenteRequestDTO, gerente);
        Gerente gerenteSaved = gerenteRepository.save(gerente);
        return GerenteMapper.toDto(gerenteSaved);
    }

    public GerenteResponseDTO read(Long id) {
        Gerente gerente = gerenteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gerente não encontrado."));
        return GerenteMapper.toDto(gerente);
    }

    public List<GerenteResponseDTO> readAll() {
        List<Gerente> gerentes = gerenteRepository.findAll();
        return GerenteMapper.toDtoList(gerentes);
    }

    public GerenteResponseDTO update(Long id, GerenteRequestDTO gerenteRequestDTO) {
        Gerente gerente = gerenteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gerente não encontrado."));
        BeanUtils.copyProperties(gerenteRequestDTO, gerente);
        Gerente gerenteUpdated = gerenteRepository.save(gerente);
        return GerenteMapper.toDto(gerenteUpdated);
    }

    public void delete(Long id) {
        Gerente gerente = gerenteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gerente não encontrado."));
        gerenteRepository.delete(gerente);
    }
}
