package br.com.mecanopecas.mecanopecas.util.dtos.response;

public record PecaResponseDTO(Long id, String nome, double preco, int qtdEstoque, String marca, String modelo, boolean ativo) { }
