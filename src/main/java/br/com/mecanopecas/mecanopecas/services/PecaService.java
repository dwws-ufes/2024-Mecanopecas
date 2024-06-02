package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.util.dtos.request.PecaRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.PecaResponseDTO;
import br.com.mecanopecas.mecanopecas.model.Peca;
import br.com.mecanopecas.mecanopecas.persistence.PecaRepository;
import br.com.mecanopecas.mecanopecas.util.mappers.PecaMapper;
import br.com.mecanopecas.mecanopecas.util.exceptions.ResourceNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PecaService {

    private final PecaRepository pecaRepository;

    @Autowired
    public PecaService(PecaRepository pecaRepository) {
        this.pecaRepository = pecaRepository;
    }

    public PecaResponseDTO create(PecaRequestDTO pecaRequestDTO) {
        Peca peca = new Peca();
        BeanUtils.copyProperties(pecaRequestDTO, peca);
        Peca pecaSaved = pecaRepository.save(peca);
        return PecaMapper.toDto(pecaSaved);
    }

    public PecaResponseDTO read(Long id) {
        Peca peca = pecaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Peca não encontrada."));
        return PecaMapper.toDto(peca);
    }

    public List<PecaResponseDTO> readAll() {
        List<Peca> pecas = pecaRepository.findAll();
        return PecaMapper.toDtoList(pecas);
    }

    public PecaResponseDTO update(Long id, PecaRequestDTO pecaRequestDTO) {
        Peca peca = pecaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Peca não encontrada."));
        BeanUtils.copyProperties(pecaRequestDTO, peca);
        Peca pecaUpdated = pecaRepository.save(peca);
        return PecaMapper.toDto(pecaUpdated);
    }

    public void delete(Long id) {
        Peca peca = pecaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Peca não encontrada."));
        pecaRepository.delete(peca);
    }
}
