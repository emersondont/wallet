package com.example.walletapi.controllers;

import com.example.walletapi.dtos.AuthenticationRecordDto;
import com.example.walletapi.dtos.LoginResponseRecordDto;
import com.example.walletapi.dtos.RegisterRecordDto;
import com.example.walletapi.infra.security.TokenService;
import com.example.walletapi.models.UserModel;
import com.example.walletapi.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationRecordDto data) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            var token = tokenService.generateToken((UserModel) auth.getPrincipal());

            return ResponseEntity.ok(new LoginResponseRecordDto(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Usuário não encontrado ou senha incorreta.\"}");
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterRecordDto data) {
        try {
            if (this.userRepository.findByEmail(data.email()) != null)
                return ResponseEntity.badRequest().body("{\"error\": \"Já existe uma conta associada a este email.\"}");

            String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

            UserModel newUser = new UserModel(data.email(), data.name(), encryptedPassword);

            this.userRepository.save(newUser);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Erro ao cadastrar usuário.\"}");
        }
    }
}
