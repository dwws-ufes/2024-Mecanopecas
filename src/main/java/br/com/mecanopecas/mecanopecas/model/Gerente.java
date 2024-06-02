package br.com.mecanopecas.mecanopecas.model;

import jakarta.persistence.Column;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "gerentes")
@PrimaryKeyJoinColumn(name = "vendedorId")
public class Gerente extends Vendedor {

    @CreationTimestamp
    @Column(nullable = false, name = "data_promovido")
    private LocalDateTime dataPromovido;

    @Column(name = "percentual_maximo_desconto")
    private Double percentualMaxDesconto;

    public Gerente() {}
    public Gerente(LocalDateTime dataPromocao, Double codigoDesconto, Double percentualMaxDesconto) {
        this.dataPromovido = dataPromocao;
        this.percentualMaxDesconto = percentualMaxDesconto;
    }

    public LocalDateTime getDataPromovido() {
        return dataPromovido;
    }

    public Double getPercentualMaxDesconto() {
        return percentualMaxDesconto;
    }
    public void setPercentualMaxDesconto(Double percentualMaxDesconto) {
        this.percentualMaxDesconto = percentualMaxDesconto;
    }
}
