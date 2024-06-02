package br.com.mecanopecas.mecanopecas.util.dtos.request;

public record EnderecoRequestDTO(String cep, String bairro, String numero, String endereco, String pontoReferencia, String complemento) {
}
