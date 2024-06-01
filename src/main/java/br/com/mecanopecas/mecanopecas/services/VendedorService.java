package br.com.mecanopecas.mecanopecas.services;

import org.springframework.beans.BeanUtils;
import br.com.mecanopecas.mecanopecas.model.Vendedor;
import br.com.mecanopecas.mecanopecas.dtos.VendedorRecordDto;
import br.com.mecanopecas.mecanopecas.persistence.VendedorRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
public class VendedorService {

    private final VendedorRepository vendedorRepository;

    @Autowired
    public VendedorService(VendedorRepository vendedorRepository) {
        this.vendedorRepository = vendedorRepository;
    }

    public class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }


    public VendedorRecordDto create(VendedorRecordDto vendedorRecordDto) {
        var vendedor = new Vendedor();
        BeanUtils.copyProperties(vendedorRecordDto, vendedor);
        Vendedor vendedorSaved = vendedorRepository.save(vendedor);
        return new VendedorRecordDto(
                vendedorSaved.getId(),
                vendedorSaved.getNome()
        );
    }

    public VendedorRecordDto read(Long id) {
        Vendedor vendedor = vendedorRepository.findById(id)
                                                .orElseThrow(() -> new ResourceNotFoundException("Não encontrado"));
        return new VendedorRecordDto(
                vendedor.getId(),
                vendedor.getNome()
        );
    }

    public VendedorRecordDto atualiza(Long id, VendedorRecordDto vendedorRecordDto) {
        Vendedor vendedorRecord = vendedorRepository.findById(id)
                                                        .orElseThrow(() -> new ResourceNotFoundException("Não encontrado"));
        BeanUtils.copyProperties(vendedorRecordDto, vendedorRecord);
        Vendedor updatedVendedor = vendedorRepository.save(vendedorRecord);
        return new VendedorRecordDto(
                updatedVendedor.getId(),
                updatedVendedor.getNome()
        );
    }


}
