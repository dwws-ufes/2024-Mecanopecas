package br.com.mecanopecas.mecanopecas.model.enums;

public enum TipoFreteEnum {
    CARRO(1, "Carro"),
    CAMINHAO(2, "Caminhão"),
    ONIBUS(3, "Ônibus"),
    VAN(4, "Van"),
    AVIAO(5, "Avião"),
    NAVIO(6, "Navio"),
    BICICLETA(7, "Bicicleta");

    private int codigo;
    private String descricao;

    private TipoFreteEnum(int codigo, String descricao) {
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
