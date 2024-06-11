package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.util.dtos.request.PecaRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.PecaResponseDTO;
import br.com.mecanopecas.mecanopecas.model.Peca;
import br.com.mecanopecas.mecanopecas.persistence.PecaRepository;
import br.com.mecanopecas.mecanopecas.util.mappers.PecaMapper;
import br.com.mecanopecas.mecanopecas.util.exceptions.NotFoundException;
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
        peca.setAtivo(true);
        Peca pecaSaved = pecaRepository.save(peca);

        return PecaMapper.toDto(pecaSaved);
    }

    public PecaResponseDTO read(Long id) {
        Peca peca = pecaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Peca não encontrada."));
        return PecaMapper.toDto(peca);
    }

    public List<PecaResponseDTO> readAll() {
        List<Peca> pecas = pecaRepository.findAll();
        return PecaMapper.toDtoList(pecas);
    }

    public List<PecaResponseDTO> readAllAtivas() {
        List<Peca> pecas = pecaRepository.findAll()
                .stream().filter(Peca::isAtivo)
                .toList();

        return PecaMapper.toDtoList(pecas);
    }

    public PecaResponseDTO update(Long id, PecaRequestDTO pecaRequestDTO) {
        Peca peca = pecaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Peca não encontrada."));
        BeanUtils.copyProperties(pecaRequestDTO, peca);
        Peca pecaUpdated = pecaRepository.save(peca);
        return PecaMapper.toDto(pecaUpdated);
    }

    public void delete(Long id) {
        Peca peca = pecaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Peca não encontrada."));

        peca.setAtivo(false);

        pecaRepository.save(peca);
    }
}
