package br.com.mecanopecas.mecanopecas.entity;

import jakarta.persistence.Column;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "gerentes")
@PrimaryKeyJoinColumn(name = "vendedorId")
public class Gerente extends Vendedor {

    @Column(nullable = false, name = "data_promovido")
    private LocalDate dataPromocao;

    @Column(name = "codigo_desconto")
    private Double codigoDesconto;

    @Column(name = "percentual_maximo_desconto")
    private Double percentualMaxDesconto;

    public Gerente() {}
    public Gerente(LocalDate dataPromocao, Double codigoDesconto, Double percentualMaxDesconto) {
        this.dataPromocao = dataPromocao;
        this.codigoDesconto = codigoDesconto;
        this.percentualMaxDesconto = percentualMaxDesconto;
    }

    public LocalDate getDataPromocao() {
        return dataPromocao;
    }

    public void setDataPromocao(LocalDate dataPromocao) {
        this.dataPromocao = dataPromocao;
    }

    public Double getCodigoDesconto() {
        return codigoDesconto;
    }

    public void setCodigoDesconto(Double codigoDesconto) {
        this.codigoDesconto = codigoDesconto;
    }

    public Double getPercentualMaxDesconto() {
        return percentualMaxDesconto;
    }

    public void setPercentualMaxDesconto(Double percentualMaxDesconto) {
        this.percentualMaxDesconto = percentualMaxDesconto;
    }
}
