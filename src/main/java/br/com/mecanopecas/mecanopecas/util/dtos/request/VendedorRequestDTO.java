package br.com.mecanopecas.mecanopecas.util.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDate;

public record VendedorRequestDTO(
        @NotBlank(message = "Nome é obrigatório")
        String nome,

        @NotBlank(message = "CPF é obrigatório")
        @Pattern(regexp = "^[0-9]{11}$", message = "Formato de CPF inválido")
        String cpf,

        @NotBlank(message = "Telefone é obrigatório")
        @Pattern(regexp = "^\\(?(\\d{2})\\)?[- ]?(\\d{4,5})[- ]?(\\d{4})$", message = "Formato de Telefone inválido")
        String telefone,

        @NotBlank(message = "Email Institucional é obrigatório")
        @Email(message = "Formato de email inválido")
        String emailInstitucional,

        @NotBlank(message = "Senha é obrigatória")
        String password,

        @NotNull(message = "Data de Nascimento é obrigatória")
        @Past(message = "Data de Nascimento deve ser no passado")
        LocalDate dataNascimento,

        boolean ativo
) {}
