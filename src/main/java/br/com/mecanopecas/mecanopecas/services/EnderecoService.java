package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.model.Endereco;
import br.com.mecanopecas.mecanopecas.util.dtos.request.EnderecoRequestDTO;
import br.com.mecanopecas.mecanopecas.persistence.EnderecoRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService {
    private final EnderecoRepository enderecoRepository;

    @Autowired
    public EnderecoService(EnderecoRepository enderecoRepository) {
        this.enderecoRepository = enderecoRepository;
    }

    public EnderecoRequestDTO create(EnderecoRequestDTO enderecoDto) {
        var endereco = new Endereco();
        BeanUtils.copyProperties(enderecoDto, endereco);
        Endereco enderecoSaved = enderecoRepository.save(endereco);
        return new EnderecoRequestDTO(
                enderecoSaved.getId(),
                enderecoSaved.getCep(),
                enderecoSaved.getBairro(),
                enderecoSaved.getNumero(),
                enderecoSaved.getEndereco(),
                enderecoSaved.getPontoReferencia(),
                enderecoSaved.getComplemento()
        );
    }

}
