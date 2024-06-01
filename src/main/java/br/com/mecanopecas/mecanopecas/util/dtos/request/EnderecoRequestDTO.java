package br.com.mecanopecas.mecanopecas.util.dtos.request;

public record EnderecoRequestDTO(
        Long id,
        String cep,
        String bairro,
        String numero,
        String endereco,
        String pontoReferencia,
        String complemento
) {

    public EnderecoRequestDTO(Long id, String cep, String bairro, String numero, String endereco, String pontoReferencia, String complemento) {
        this.id = id;
        this.cep = cep;
        this.bairro = bairro;
        this.numero = numero;
        this.endereco = endereco;
        this.pontoReferencia = pontoReferencia;
        this.complemento = complemento;
    }
}
