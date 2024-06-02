package br.com.mecanopecas.mecanopecas.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "vendas")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_venda")
    private Date dataVenda;

    @Column(name = "valor_final")
    private double valorFinal;

    @OneToOne(optional = false)
    @JoinColumn(name = "orcamento_id", unique = true)
    private Orcamento orcamento;

    public Long getId() { return id; }

    public Date getDataVenda() { return dataVenda; }
    public void setDataVenda(Date dataVenda) { this.dataVenda = dataVenda; }

    public double getValorFinal() { return valorFinal; }
    public void setValorFinal(double valorFinal) { this.valorFinal = valorFinal; }

    public Orcamento getOrcamento() { return orcamento; }
    public void setOrcamento(Orcamento orcamento) { this.orcamento = orcamento; }
}
