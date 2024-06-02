package br.com.mecanopecas.mecanopecas.model;

import jakarta.persistence.Column;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "gerentes")
@PrimaryKeyJoinColumn(name = "vendedorId")
public class Gerente extends Vendedor {

    @Column(nullable = false, name = "data_promovido")
    private LocalDate dataPromovido;

    @Column(name = "percentual_maximo_desconto")
    private Double percentualMaxDesconto;

    public Gerente() {}
    public Gerente(LocalDate dataPromocao, Double codigoDesconto, Double percentualMaxDesconto) {
        this.dataPromovido = dataPromocao;
        this.percentualMaxDesconto = percentualMaxDesconto;
    }

    public LocalDate getDataPromovido() {
        return dataPromovido;
    }
    public void setDataPromovido(LocalDate dataPromocao) {
        this.dataPromovido = dataPromocao;
    }

    public Double getPercentualMaxDesconto() {
        return percentualMaxDesconto;
    }
    public void setPercentualMaxDesconto(Double percentualMaxDesconto) {
        this.percentualMaxDesconto = percentualMaxDesconto;
    }
}
