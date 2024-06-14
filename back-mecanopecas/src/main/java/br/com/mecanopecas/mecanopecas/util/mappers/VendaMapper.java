package br.com.mecanopecas.mecanopecas.util.mappers;

import br.com.mecanopecas.mecanopecas.model.Venda;
import br.com.mecanopecas.mecanopecas.util.dtos.response.VendaResponseDTO;

public class VendaMapper {

    public static VendaResponseDTO toDto(Venda venda) {
        return new VendaResponseDTO(
                venda.getId(),
                venda.getDataVenda(),
                venda.getValorFinal()
        );
    }
}
