package br.com.mecanopecas.mecanopecas.controller;

import br.com.mecanopecas.mecanopecas.services.DbpediaService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dbpedia")
public class DbpediaController extends BaseController {

    private final DbpediaService dbpediaService;
    public DbpediaController(final DbpediaService dbpediaService, @Qualifier("jwtDecoder") JwtDecoder jwtDecoder) {
        super(jwtDecoder);
        this.dbpediaService = dbpediaService;
    }

    @GetMapping("/marcas/{marca}")
    public List<String> consultarMarcas(@PathVariable String marca){
        return dbpediaService.constultaMarcas(marca);
    }

    @GetMapping("/modelos/{modelo}")
    public List<String> consultarModelos(@PathVariable String modelo){
        return dbpediaService.consultarModelos(modelo);
    }

}
