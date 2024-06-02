package br.com.mecanopecas.mecanopecas.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "gerentes")
public class Gerente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "vendedor_id", referencedColumnName = "id", nullable = false)
    private Vendedor vendedor;

    @CreationTimestamp
    @Column(nullable = false, name = "data_promovido")
    private LocalDateTime dataPromovido;

    @Column(name = "percentual_maximo_desconto")
    private Double percentualMaxDesconto;

    public Long getId() { return id; }

    public Vendedor getVendedor() { return vendedor; }
    public void setVendedor(Vendedor vendedor) { this.vendedor = vendedor; }

    public LocalDateTime getDataPromovido() { return dataPromovido; }

    public Double getPercentualMaxDesconto() { return percentualMaxDesconto; }
    public void setPercentualMaxDesconto(Double percentualMaxDesconto) { this.percentualMaxDesconto = percentualMaxDesconto; }
}
