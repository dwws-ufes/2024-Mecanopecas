package br.com.mecanopecas.mecanopecas.util.dtos.request;

import java.time.LocalDate;

public record VendedorRequestDTO(Long id,
                                 String nome,
                                 String cpf,
                                 String telefone,
                                 String emailInstitucional,
                                 String password,
                                 LocalDate dataNascimento
) {

    public VendedorRequestDTO(Long id, String nome, String cpf, String telefone, String emailInstitucional, String password, LocalDate dataNascimento) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.emailInstitucional = emailInstitucional;
        this.password = password;
        this.dataNascimento = dataNascimento;
    }
}
