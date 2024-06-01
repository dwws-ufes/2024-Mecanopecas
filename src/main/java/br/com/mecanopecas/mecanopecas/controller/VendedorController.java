package br.com.mecanopecas.mecanopecas.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.com.mecanopecas.mecanopecas.dtos.VendedorRecordDto;
import org.springframework.beans.factory.annotation.Autowired;
import br.com.mecanopecas.mecanopecas.services.VendedorService;

@RestController
@RequestMapping("/api/vendedores") // Melhor prática para URLs RESTful
public class VendedorController {

    private final VendedorService vendedorService;


    @Autowired
    public VendedorController(final VendedorService vendedorService) {
        this.vendedorService = vendedorService;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<VendedorRecordDto> cadastroVendedor(@RequestBody VendedorRecordDto vendedorRecordDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(vendedorService.create(vendedorRecordDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendedorRecordDto> buscarVendedor(@PathVariable Long id) {
        return ResponseEntity.ok(vendedorService.read(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VendedorRecordDto> atualizaVendedor(@PathVariable Long id, @RequestBody VendedorRecordDto vendedorRecordDto){
        return ResponseEntity.ok(vendedorService.atualiza(id, vendedorRecordDto));
    }

}
