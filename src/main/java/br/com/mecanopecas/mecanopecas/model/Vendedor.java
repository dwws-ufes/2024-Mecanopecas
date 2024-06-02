package br.com.mecanopecas.mecanopecas.model;


import jakarta.persistence.*;

@Entity
@Table(name = "vendedores")
@Inheritance(strategy = InheritanceType.JOINED)
public class Vendedor extends Funcionario {

    private boolean ativo;

    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean ativo) { this.ativo = ativo; }
}
