package br.com.mecanopecas.mecanopecas.model;

public enum FreteEnum {
    CARRO(1, "carro"),
    CAMINHAO(2, "caminhao"),
    ONIBUS(3, "onibus"),
    VAN(4, "van"),
    AVIAO(5, "aviao"),
    NAVIO(6, "navio"),
    BICICLETA(7, "bicicleta");

    private int codigo;
    private String descricao;

    private FreteEnum(int codigo, String descricao) {
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
