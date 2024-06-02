package br.com.mecanopecas.mecanopecas.model.enums;

public enum TipoClienteEnum {
    PF(1, "Pessoa Física"),
    PJ(2, "Pessoa Jurídica");

    private int codigo;
    private String descricao;

    private TipoClienteEnum(int codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    public int getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }
}