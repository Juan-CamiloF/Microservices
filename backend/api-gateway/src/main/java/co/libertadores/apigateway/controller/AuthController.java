package co.libertadores.apigateway.controller;

import co.libertadores.apigateway.controller.request.RequestAuthUser;
import co.libertadores.apigateway.controller.response.ResponseAuthUser;
import co.libertadores.apigateway.security.jwt.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtProvider jwtProvider;

    public AuthController(AuthenticationManager authenticationManager, JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping
    public ResponseEntity<ResponseAuthUser> authUser(@Valid @RequestBody RequestAuthUser requestAuthUser) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(requestAuthUser.getEmail(), requestAuthUser.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        ResponseAuthUser response = new ResponseAuthUser(jwtProvider.generateToken(authentication));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
