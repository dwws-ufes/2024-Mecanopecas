package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.model.Vendedor;
import br.com.mecanopecas.mecanopecas.persistence.VendedorRepository;
import br.com.mecanopecas.mecanopecas.util.dtos.response.GerenteResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.request.GerenteRequestDTO;
import br.com.mecanopecas.mecanopecas.model.Gerente;
import br.com.mecanopecas.mecanopecas.persistence.GerenteRepository;
import br.com.mecanopecas.mecanopecas.util.exceptions.BadRequestException;
import br.com.mecanopecas.mecanopecas.util.exceptions.NotFoundException;
import br.com.mecanopecas.mecanopecas.util.mappers.GerenteMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GerenteService {

    private final GerenteRepository gerenteRepository;
    private final VendedorRepository vendedorRepository;

    @Autowired
    public GerenteService(GerenteRepository gerenteRepository, VendedorRepository vendedorRepository) {
        this.gerenteRepository = gerenteRepository;
        this.vendedorRepository = vendedorRepository;
    }

    public GerenteResponseDTO create(Long vendedorId, GerenteRequestDTO gerenteRequestDTO) {
        Vendedor vendedor = vendedorRepository.findById(vendedorId)
                .orElseThrow(() -> new NotFoundException("Vendedor não encontrado."));

        if (gerenteRepository.existsByVendedorId(vendedorId)) {
            throw new BadRequestException("O vendedor já é um gerente.");
        }

        Gerente gerente = new Gerente();
        gerente.setVendedor(vendedor);
        gerente.setPercentualMaxDesconto(gerenteRequestDTO.percentualMaxDesconto());

        Gerente gerenteSaved = gerenteRepository.save(gerente);
        return GerenteMapper.toDto(gerenteSaved);
    }

    public GerenteResponseDTO read(Long id) {
        Gerente gerente = gerenteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Gerente não encontrado."));
        return GerenteMapper.toDto(gerente);
    }

    public List<GerenteResponseDTO> readAll() {
        List<Gerente> gerentes = gerenteRepository.findAll();
        return GerenteMapper.toDtoList(gerentes);
    }

    public GerenteResponseDTO update(Long id, GerenteRequestDTO gerenteRequestDTO) {
        Gerente gerente = gerenteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Gerente não encontrado."));
        BeanUtils.copyProperties(gerenteRequestDTO, gerente);
        Gerente gerenteUpdated = gerenteRepository.save(gerente);
        return GerenteMapper.toDto(gerenteUpdated);
    }

    public void delete(Long id) {
        Gerente gerente = gerenteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Gerente não encontrado."));
        gerenteRepository.delete(gerente);
    }
}
