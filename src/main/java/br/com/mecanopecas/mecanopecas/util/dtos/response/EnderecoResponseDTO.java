package br.com.mecanopecas.mecanopecas.util.dtos.response;

public record EnderecoResponseDTO(Long id, String cep, String bairro, String numero, String endereco, String pontoReferencia, String complemento) {
}
