package br.com.mecanopecas.mecanopecas.model;

import jakarta.persistence.*;

@Entity
@Table(name = "admins")
public class Admin extends Funcionario {

    private String emailPessoal;

    public String getEmailPessoal() {
        return emailPessoal;
    }
    public void setEmailPessoal(String emailPessoal) {
        this.emailPessoal = emailPessoal;
    }
}
