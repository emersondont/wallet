package com.example.walletapi.dtos;

import jakarta.validation.constraints.NotBlank;

public record AuthenticationRecordDto(@NotBlank String email, @NotBlank String password) {

}
