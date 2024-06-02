package br.com.mecanopecas.mecanopecas.util.dtos.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PecaRequestDTO(
        @NotBlank(message = "Nome é obrigatório")
        String nome,

        @NotNull(message = "Preço é obrigatório")
        @Min(value = 0, message = "Preço deve ser maior ou igual a 0")
        double preco,

        @Min(value = 0, message = "Quantidade em estoque deve ser maior ou igual a 0")
        int qtdEstoque,

        boolean ativo
) {}
