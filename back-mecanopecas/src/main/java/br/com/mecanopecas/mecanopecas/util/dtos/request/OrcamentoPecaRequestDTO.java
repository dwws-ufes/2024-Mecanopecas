package br.com.mecanopecas.mecanopecas.util.dtos.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record OrcamentoPecaRequestDTO(
        @NotNull(message = "ID da Peça é obrigatório")
        String pecaId,

        @Min(value = 1, message = "Quantidade deve ser pelo menos 1")
        int quantidade
) {}
