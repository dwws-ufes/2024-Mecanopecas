package br.com.mecanopecas.mecanopecas.util.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.Date;

public record ClienteRequestDTO(
        @NotBlank(message = "CPF/CNPJ é obrigatório")
        @Pattern(regexp = "^[0-9]{11}$|^[0-9]{14}$", message = "Formato de CPF/CNPJ inválido")
        String cpfCnpj,

        @NotBlank(message = "Nome é obrigatório")
        @Size(max = 100, message = "Nome não pode exceder 100 caracteres")
        String nome,

        @NotNull(message = "Data de Nascimento é obrigatória")
        @Past(message = "Data de Nascimento deve ser no passado")
        Date dataNascimento,

        boolean ativo
) {
}
