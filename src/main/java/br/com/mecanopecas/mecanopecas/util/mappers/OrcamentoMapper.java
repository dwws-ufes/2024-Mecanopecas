package br.com.mecanopecas.mecanopecas.util.mappers;

import br.com.mecanopecas.mecanopecas.model.Orcamento;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoDetailResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoResponseDTO;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class OrcamentoMapper {

    public static OrcamentoResponseDTO toDto(Orcamento orcamento) {
        return new OrcamentoResponseDTO(
                orcamento.getId(),
                orcamento.getCodigo(),
                orcamento.getCliente().getNome(),
                orcamento.getDataOrcamento(),
                orcamento.getDataExpiracao(),
                orcamento.getStatus()
        );
    }
    public static List<OrcamentoResponseDTO> toDtoList(List<Orcamento> orcamentos) {
        if (orcamentos == null) {
            return Collections.emptyList();
        }

        return orcamentos.stream()
                .map(OrcamentoMapper::toDto)
                .collect(Collectors.toList());
    }

   public static OrcamentoDetailResponseDTO toDtoDetail(Orcamento orcamento) {
            return new OrcamentoDetailResponseDTO(
                    orcamento.getId(),
                    orcamento.getCodigo(),
                    orcamento.getCliente().getNome(),
                    orcamento.getVendedor().getNome(),
                    orcamento.getDataOrcamento(),
                    orcamento.getDataExpiracao(),
                    orcamento.getValor(),
                    orcamento.getPercentualDesconto(),
                    orcamento.getValorTotal(),
                    orcamento.getOrcamentoPecas().stream()
                            .map(OrcamentoPecaMapper::toDto)
                            .collect(Collectors.toList()),
                    orcamento.getStatus()
            );
        }
    }