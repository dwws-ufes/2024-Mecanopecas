package br.com.mecanopecas.mecanopecas.util.dtos.request;

public record AuthenticateRequestDTO(
        String email,
        String password
) {
}
