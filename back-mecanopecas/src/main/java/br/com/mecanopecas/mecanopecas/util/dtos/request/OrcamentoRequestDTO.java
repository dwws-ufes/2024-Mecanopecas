package br.com.mecanopecas.mecanopecas.util.dtos.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record OrcamentoRequestDTO(
        @NotBlank(message = "Código é obrigatório")
        String codigo,

        @NotNull(message = "Data de Expiração é obrigatória")
        @FutureOrPresent(message = "Data de Expiração deve ser no futuro ou presente")
        LocalDateTime dataExpiracao,

        @NotNull(message = "ID do Cliente é obrigatório")
        String clienteId
) {}
