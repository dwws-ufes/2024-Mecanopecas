package br.com.mecanopecas.mecanopecas.util.dtos.response;

public record OrcamentoPecaResponseDTO(Long id, String nome, Double preco, int quantidade, Double valorTotal) { }
