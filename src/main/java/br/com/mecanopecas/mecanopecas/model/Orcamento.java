package br.com.mecanopecas.mecanopecas.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orcamentos")
public class Orcamento {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String codigo;

    @Column(name = "percentual_desconto")
    private double percentualDesconto;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_expiracao")
    private Date dataExpiracao;

    @ManyToOne(optional = false)
    private Vendedor vendedor;

    @ManyToOne(optional = false)
    private Cliente cliente;

    @ManyToMany
    @JoinTable(
            name = "orcamento_peca",
            joinColumns = @JoinColumn(name = "orcamento_id"),
            inverseJoinColumns = @JoinColumn(name = "peca_id")
    )
    private List<Peca> pecas;

    @OneToOne(mappedBy = "orcamento")
    private Venda venda;

    @OneToOne(mappedBy = "orcamento")
    private Entrega entrega;


    public Long getId() { return id; }

    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public double getPercentualDesconto() { return percentualDesconto; }
    public void setPercentualDesconto(double percentualDesconto) { this.percentualDesconto = percentualDesconto; }

    public Date getDataExpiracao() { return dataExpiracao; }
    public void setDataExpiracao(Date dataExpiracao) { this.dataExpiracao = dataExpiracao; }

    public Vendedor getVendedor() { return vendedor; }
    public void setVendedor(Vendedor vendedor) { this.vendedor = vendedor; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public List<Peca> getPecas() { return pecas; }
    public void setPecas(List<Peca> pecas) { this.pecas = pecas; }

    public Venda getVenda() { return venda; }
    public void setVenda(Venda venda) { this.venda = venda; }

    public Entrega getEntrega() { return entrega; }
    public void setEntrega(Entrega entrega) { this.entrega = entrega; }
}
