package br.com.mecanopecas.mecanopecas.util.dtos.response;
    public record VendedorResponseDTO(Long id,
                                     String nome
    ) {

        public VendedorResponseDTO(Long id, String nome) {
            this.id = id;
            this.nome = nome;
        }
    }

