package br.com.mecanopecas.mecanopecas.model;


import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "fretes")
public class Frete {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, name = "valor_seguro")
    private BigDecimal valorSeguro;

    @Column(nullable = false, name = "valor_base")
    private BigDecimal valorBase;

    @Column(name = "tipo_frete")
    private int tipoFrete;

    @OneToOne
    @JoinColumn(name = "entrega_id")
    private Entrega entrega;

    public Long getId() {
        return id;
    }

    public BigDecimal getValorSeguro() {
        return valorSeguro;
    }
    public void setValorSeguro(BigDecimal valorSeguro) {
        this.valorSeguro = valorSeguro;
    }

    public BigDecimal getValorBase() {
        return valorBase;
    }
    public void setValorBase(BigDecimal valorBase) {
        this.valorBase = valorBase;
    }

    public int getTipoFrete() {
        return tipoFrete;
    }
    public void setTipoFrete(int tipoFrete) {
        this.tipoFrete = tipoFrete;
    }
}
