package br.com.mecanopecas.mecanopecas.util.dtos.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record GerenteRequestDTO(
        @NotNull(message = "Percentual Máximo de Desconto é obrigatório")
        @DecimalMin(value = "0.0", inclusive = true, message = "Percentual Máximo de Desconto deve ser pelo menos 0.0")
        @DecimalMax(value = "100.0", inclusive = true, message = "Percentual Máximo de Desconto deve ser no máximo 100.0")
        Double percentualMaxDesconto
) {}
