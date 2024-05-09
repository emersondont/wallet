package com.example.walletapi.dtos;

import jakarta.validation.constraints.NotBlank;

public record RegisterRecordDto(@NotBlank String email, @NotBlank String password, @NotBlank String name) {
}
