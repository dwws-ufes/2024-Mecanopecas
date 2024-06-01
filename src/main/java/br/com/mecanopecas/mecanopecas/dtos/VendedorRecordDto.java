package br.com.mecanopecas.mecanopecas.dtos;

import java.math.BigInteger;
import java.time.LocalDate;

public record VendedorRecordDto(Long id,
                                String nome,
                                String cpf,
                                String telefone,
                                String emailInstitucional,
                                String password,
                                LocalDate dataNascimento
) {

    public VendedorRecordDto(Long id, String nome) {
        this(id, nome, "", "", "", "", null);
    }

    public VendedorRecordDto(Long id, String nome, String cpf, String telefone, String emailInstitucional, String password, LocalDate dataNascimento) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.emailInstitucional = emailInstitucional;
        this.password = password;
        this.dataNascimento = dataNascimento;
    }
}
