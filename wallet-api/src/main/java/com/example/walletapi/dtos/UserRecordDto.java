package com.example.walletapi.dtos;

import jakarta.validation.constraints.NotBlank;

public record UserRecordDto(@NotBlank String name, @NotBlank String email, @NotBlank String password) {
}
