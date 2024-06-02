package br.com.mecanopecas.mecanopecas.model.enums;

public enum TipoEntregaEnum {
    RETIRADA(1, "Retirada"),
    DELIVERY(2, "Delivery");

    private int codigo;
    private String descricao;

    private TipoEntregaEnum(int codigo, String descricao) {
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
