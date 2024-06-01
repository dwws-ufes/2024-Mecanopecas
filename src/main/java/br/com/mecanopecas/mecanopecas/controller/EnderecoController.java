package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.dtos.EnderecoRecordDto;
import br.com.mecanopecas.mecanopecas.services.EnderecoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/endereco")
public class EnderecoController {
    private final EnderecoService enderecoService;

    @Autowired
    public EnderecoController(final EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }


    @PostMapping("/cadastrar")
    public ResponseEntity<EnderecoRecordDto> cadastrar(@RequestBody EnderecoRecordDto enderecoDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(enderecoService.create(enderecoDto));
    }

}
