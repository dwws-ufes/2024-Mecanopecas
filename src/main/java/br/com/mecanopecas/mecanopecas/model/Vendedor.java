package br.com.mecanopecas.mecanopecas.model;


import jakarta.persistence.*;

@Entity
@Table(name = "vendedores")
@Inheritance(strategy = InheritanceType.JOINED)
public class Vendedor extends Funcionario {

}
