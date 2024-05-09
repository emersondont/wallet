package com.example.walletapi.controllers;

import com.example.walletapi.dtos.RegisterRecordDto;
import com.example.walletapi.infra.security.TokenService;
import com.example.walletapi.models.UserModel;
import com.example.walletapi.repositories.TransactionRepository;
import com.example.walletapi.repositories.UserRepository;
import jakarta.validation.Valid;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TokenService tokenService;

    @GetMapping("")
    public ResponseEntity register(@RequestHeader(name="Authorization") @NotNull String token) {
        try {
            var email = tokenService.validadeToken(token.replace("Bearer ", ""));
            UserModel user = userRepository.findModelByEmail(email);

            Map<String, String> userData = new HashMap<>();
            userData.put("name", user.getName());
            userData.put("email", user.getEmail());

            return ResponseEntity.status(HttpStatus.OK).body(userData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Erro ao fazer requisição: " + e.getMessage());
        }
    }
}
