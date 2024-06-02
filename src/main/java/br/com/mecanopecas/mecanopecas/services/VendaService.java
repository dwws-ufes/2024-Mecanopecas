package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.model.Venda;
import br.com.mecanopecas.mecanopecas.persistence.VendaRepository;
import br.com.mecanopecas.mecanopecas.util.dtos.response.VendaResponseDTO;
import br.com.mecanopecas.mecanopecas.util.mappers.VendaMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendaService {

    private final VendaRepository vendaRepository;

    public VendaService(VendaRepository vendaRepository) {
        this.vendaRepository = vendaRepository;
    }

    public List<VendaResponseDTO> getVendasWithinDateRange(LocalDate dataInicio, LocalDate dataFim) {
        List<Venda> vendas = vendaRepository.findAllByDataVendaBetween(dataInicio.atStartOfDay(), dataFim.atStartOfDay().plusHours(23).plusMinutes(59).plusSeconds(59));
        return vendas.stream()
                .map(VendaMapper::toDto)
                .collect(Collectors.toList());
    }
}
