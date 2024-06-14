package br.com.mecanopecas.mecanopecas.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orcamentos")
public class Orcamento {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String codigo;

    @Column(name = "percentual_desconto")
    private double percentualDesconto;

    @CreationTimestamp
    @Column(name = "data_orcamento")
    private LocalDateTime dataOrcamento;

    @Column(name = "data_expiracao")
    private LocalDateTime dataExpiracao;

    @ManyToOne(optional = false)
    private Vendedor vendedor;

    @ManyToOne(optional = false)
    private Cliente cliente;

    @OneToMany(mappedBy = "orcamento", cascade = CascadeType.ALL)
    private List<OrcamentoPeca> orcamentoPecas;

    @OneToOne(mappedBy = "orcamento")
    private Venda venda;

    public Long getId() { return id; }

    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public double getPercentualDesconto() { return percentualDesconto; }
    public void setPercentualDesconto(double percentualDesconto) { this.percentualDesconto = percentualDesconto; }

    public LocalDateTime getDataOrcamento() { return dataOrcamento; }

    public LocalDateTime getDataExpiracao() { return dataExpiracao; }
    public void setDataExpiracao(LocalDateTime dataExpiracao) { this.dataExpiracao = dataExpiracao; }

    public Vendedor getVendedor() { return vendedor; }
    public void setVendedor(Vendedor vendedor) { this.vendedor = vendedor; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public List<OrcamentoPeca> getOrcamentoPecas() { return orcamentoPecas; }
    public void setOrcamentoPecas(List<OrcamentoPeca> orcamentoPecas) { this.orcamentoPecas = orcamentoPecas; }

    public Venda getVenda() { return venda; }
    public void setVenda(Venda venda) { this.venda = venda; }

    public String getStatus() {
        LocalDateTime now = LocalDateTime.now();
        if (dataExpiracao != null && now.isAfter(dataExpiracao)) {
            return "Expirado";
        } else if (venda != null) {
            return "Finalizado";
        } else {
            return "Aberto";
        }
    }

    public double getValor() {
        return orcamentoPecas.stream()
                .mapToDouble(orcamentoPeca -> orcamentoPeca.getPeca().getPreco() * orcamentoPeca.getQuantidade())
                .sum();
    }

    public double getValorTotal() {
        double valor = getValor();
        return valor - (valor * percentualDesconto / 100.0);
    }
}
