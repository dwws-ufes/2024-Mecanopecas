package br.com.mecanopecas.mecanopecas.model;

public enum EntregaEnum {
    RETIRADA(1, "retirada"), DELIVERY(2, "delivery");

    private int codigo;
    private String descricao;

    private EntregaEnum(int codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    public int getCodigo() {
        return this.codigo;
    }

    public String getDescricao() {
        return this.descricao;
    }
}
