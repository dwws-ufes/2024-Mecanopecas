package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.util.dtos.response.VendedorResponseDTO;
import br.com.mecanopecas.mecanopecas.util.exceptions.NotFoundException;
import br.com.mecanopecas.mecanopecas.util.mappers.VendedorMapper;
import org.springframework.beans.BeanUtils;
import br.com.mecanopecas.mecanopecas.model.Vendedor;
import br.com.mecanopecas.mecanopecas.util.dtos.request.VendedorRequestDTO;
import br.com.mecanopecas.mecanopecas.persistence.VendedorRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class VendedorService {

    private final VendedorRepository vendedorRepository;

    @Autowired
    public VendedorService(VendedorRepository vendedorRepository) {
        this.vendedorRepository = vendedorRepository;
    }

    public VendedorResponseDTO create(VendedorRequestDTO vendedorRequestDTO) {
        var vendedor = new Vendedor();

        BeanUtils.copyProperties(vendedorRequestDTO, vendedor);
        vendedor.setAtivo(true);
        Vendedor vendedorSaved = vendedorRepository.save(vendedor);

        return VendedorMapper.toDto(vendedorSaved);
    }

    public VendedorResponseDTO read(Long id) {
        Vendedor vendedor = vendedorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Vendedor não encontrado."));

        return VendedorMapper.toDto(vendedor);
    }

    public List<VendedorResponseDTO> readAll() {
        List<Vendedor> vendedores = vendedorRepository.findAll();

        return VendedorMapper.toDtoList(vendedores);
    }

    public List<VendedorResponseDTO> readAllAtivos() {
        List<Vendedor> vendedores = vendedorRepository.findAll()
                .stream().filter(Vendedor::isAtivo)
                .toList();

        return VendedorMapper.toDtoList(vendedores);
    }

    public VendedorResponseDTO update(Long id, VendedorRequestDTO vendedorRequestDTO) {
        Vendedor vendedor = vendedorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Vendedor não encontrado."));

        BeanUtils.copyProperties(vendedorRequestDTO, vendedor);
        Vendedor vendedorUpdated = vendedorRepository.save(vendedor);

        return VendedorMapper.toDto(vendedorUpdated);
    }

    public void delete(Long id) {
        Vendedor vendedor = vendedorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Vendedor não encontrado."));

        vendedor.setAtivo(false);

        vendedorRepository.save(vendedor);
    }
}
