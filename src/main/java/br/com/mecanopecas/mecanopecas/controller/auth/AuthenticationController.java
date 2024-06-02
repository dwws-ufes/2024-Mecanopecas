package br.com.mecanopecas.mecanopecas.controller.auth;


import br.com.mecanopecas.mecanopecas.util.dtos.request.AuthenticateRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.mecanopecas.mecanopecas.services.auth.AuthenticationService;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping("authenticate")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticateRequestDTO authenticateRequestDTO){
        return ResponseEntity.ok(authenticationService.authenticate(authenticateRequestDTO));
    }
}
