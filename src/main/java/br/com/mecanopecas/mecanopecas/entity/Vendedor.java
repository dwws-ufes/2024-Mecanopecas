package br.com.mecanopecas.mecanopecas.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "vendedores")
@Inheritance(strategy = InheritanceType.JOINED)
public class Vendedor extends Funcionario {}
