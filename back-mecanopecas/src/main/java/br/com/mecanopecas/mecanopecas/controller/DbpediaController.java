package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.services.DbpediaService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dbpedia")
public class DbpediaController extends BaseController {

    private final DbpediaService dbpediaService;

    @Autowired
    public DbpediaController(final DbpediaService dbpediaService, @Qualifier("jwtDecoder") JwtDecoder jwtDecoder) {
        super(jwtDecoder);
        this.dbpediaService = dbpediaService;
    }

    @GetMapping("/marcas")
    public List<String> searchMarcas(@RequestParam String marca) {
        return dbpediaService.searchMarcas(marca);
    }

    @GetMapping("/marcas/{marca}/modelos")
    public List<String> searchModelosByMarca(@PathVariable String marca, @RequestParam String modelo) {
        return dbpediaService.searchModelosByMarca(marca, modelo);
    }
}
