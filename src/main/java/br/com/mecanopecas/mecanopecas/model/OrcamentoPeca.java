package br.com.mecanopecas.mecanopecas.model;

import jakarta.persistence.*;

@Entity
@Table(name = "orcamento_pecas")
public class OrcamentoPeca {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(optional = false)
    private Orcamento orcamento;

    @ManyToOne(optional = false)
    private Peca peca;

    private int quantidade;

    public Long getId() {
        return id;
    }

    public Orcamento getOrcamento() {
        return orcamento;
    }

    public void setOrcamento(Orcamento orcamento) {
        this.orcamento = orcamento;
    }

    public Peca getPeca() {
        return peca;
    }

    public void setPeca(Peca peca) {
        this.peca = peca;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}
