package br.com.mecanopecas.mecanopecas.controller;


import br.com.mecanopecas.mecanopecas.util.dtos.request.AuthenticateRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.mecanopecas.mecanopecas.services.AuthenticationService;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticateRequestDTO authenticateRequestDTO){
        return ResponseEntity.ok(authenticationService.authenticate(authenticateRequestDTO));
    }
}
