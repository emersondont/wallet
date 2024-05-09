package com.example.walletapi.dtos;

import com.example.walletapi.models.TransactionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

public class TransactionRecordDto {
    @NotBlank
    private String description;

    @NotNull
    private Float value;

    @NotNull
    private Date date;

    @NotNull
    private TransactionType type;

    public TransactionRecordDto(@NotBlank String description, @NotNull Float value, @NotNull String date, @NotNull TransactionType type) {
        this.description = description;
        this.value = value;
        this.date = Date.valueOf(date);
        this.type = type;
    }

    public @NotBlank String getDescription() {
        return description;
    }

    public @NotNull Float getValue() {
        return value;
    }

    public @NotNull Date getDate() {
        return date;
    }

    public @NotNull TransactionType getType() {
        return type;
    }
}