package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.util.dtos.response.VendedorResponseDTO;
import br.com.mecanopecas.mecanopecas.util.exceptions.BadRequestException;
import br.com.mecanopecas.mecanopecas.util.exceptions.NotFoundException;
import br.com.mecanopecas.mecanopecas.util.mappers.VendedorMapper;
import org.springframework.beans.BeanUtils;
import br.com.mecanopecas.mecanopecas.model.Vendedor;
import br.com.mecanopecas.mecanopecas.util.dtos.request.VendedorRequestDTO;
import br.com.mecanopecas.mecanopecas.persistence.VendedorRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class VendedorService {

    private final VendedorRepository vendedorRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public VendedorService(VendedorRepository vendedorRepository, PasswordEncoder passwordEncoder) {
        this.vendedorRepository = vendedorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public VendedorResponseDTO create(VendedorRequestDTO vendedorRequestDTO) {
        if (vendedorRepository.existsByCpf(vendedorRequestDTO.cpf())) {
            throw new BadRequestException("Já existe um vendedor com o mesmo CPF");
        }

        if (vendedorRepository.existsByEmailInstitucional(vendedorRequestDTO.emailInstitucional())) {
            throw new BadRequestException("Já existe um vendedor com o mesmo email institucional");
        }

        var vendedor = new Vendedor();

        BeanUtils.copyProperties(vendedorRequestDTO, vendedor);
        vendedor.setAtivo(true);
        vendedor.setPassword(passwordEncoder.encode(vendedorRequestDTO.password()));
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

        if (vendedorRepository.existsByCpf(vendedorRequestDTO.cpf())) {
            throw new BadRequestException("Já existe um vendedor com o mesmo CPF");
        }

        if (vendedorRepository.existsByEmailInstitucional(vendedorRequestDTO.emailInstitucional())) {
            throw new BadRequestException("Já existe um vendedor com o mesmo email institucional");
        }

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
