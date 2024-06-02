package br.com.mecanopecas.mecanopecas.util.mappers;

import br.com.mecanopecas.mecanopecas.model.OrcamentoPeca;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoPecaResponseDTO;

public class OrcamentoPecaMapper {

    public static OrcamentoPecaResponseDTO toDto(OrcamentoPeca orcamentoPeca) {
        return new OrcamentoPecaResponseDTO(
                orcamentoPeca.getId(),
                orcamentoPeca.getPeca().getNome(),
                orcamentoPeca.getPeca().getPreco(),
                orcamentoPeca.getQuantidade(),
                orcamentoPeca.getPeca().getPreco() * orcamentoPeca.getQuantidade()
        );
    }
}
