package br.com.mecanopecas.mecanopecas.model;

import jakarta.persistence.*;

@Entity
@Table(name = "pecas")
public class Peca {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;
    private double preco;

    @Column(name = "qtd_estoque")
    private int qtdEstoque;

    private boolean ativo;

    public Long getId() { return id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public double getPreco() { return preco; }
    public void setPreco(double preco) { this.preco = preco; }

    public int getQtdEstoque() { return qtdEstoque; }
    public void setQtdEstoque(int qtdEstoque) { this.qtdEstoque = qtdEstoque; }

    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean ativo) { this.ativo = ativo; }
}
