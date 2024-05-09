package com.example.walletapi.controllers;

import com.example.walletapi.dtos.TransactionRecordDto;
import com.example.walletapi.infra.security.TokenService;
import com.example.walletapi.models.TransactionModel;
import com.example.walletapi.models.UserModel;
import com.example.walletapi.repositories.TransactionRepository;
import com.example.walletapi.repositories.UserRepository;
import jakarta.validation.Valid;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("transaction")
public class TransactionController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    TokenService tokenService;

    @PostMapping("")
    public ResponseEntity saveTransaction(@RequestHeader(name="Authorization") @NotNull String token,
                                          @RequestBody @Valid TransactionRecordDto transactionRecordDto) {
        var email = tokenService.validadeToken(token.replace("Bearer ", ""));
        UserModel user = userRepository.findModelByEmail(email);

        TransactionModel transactionModel = new TransactionModel();
        transactionModel.setDescription(transactionRecordDto.getDescription());
        transactionModel.setValue(transactionRecordDto.getValue());
        transactionModel.setDate(transactionRecordDto.getDate());
        transactionModel.setType(transactionRecordDto.getType());
        transactionModel.setUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(transactionRepository.save(transactionModel));
    }

    @GetMapping("")
    public ResponseEntity getAllTransactions(@RequestHeader(name="Authorization") @NotNull String token) {
        var email = tokenService.validadeToken(token.replace("Bearer ", ""));
        UserModel user = userRepository.findModelByEmail(email);

        List<TransactionModel> listTransaction = user.getTransactions();

        return ResponseEntity.status(HttpStatus.OK).body(listTransaction);
    }

    @GetMapping("/{year}/{month}")
    public ResponseEntity getTransactionsByMonth(@RequestHeader(name="Authorization") @NotNull String token,
                                                 @PathVariable(value = "year") String yearStr,
                                                 @PathVariable(value = "month") String monthStr) {
        var email = tokenService.validadeToken(token.replace("Bearer ", ""));
        UserModel user = userRepository.findModelByEmail(email);

        int year = Integer.parseInt(yearStr);
        int month = Integer.parseInt(monthStr);

        List<TransactionModel> listTransaction = user.getTransactions();
        List<TransactionModel> filteredTransactions = new ArrayList<>();

        // Iterar sobre cada transação e adicionar apenas aquelas que correspondem ao mês e ano especificados
        for (TransactionModel transaction : listTransaction) {
            LocalDate transactionDate = transaction.getDate().toLocalDate();
            if (transactionDate.getYear() == year && transactionDate.getMonthValue() == month) {
                filteredTransactions.add(transaction);
            }
        }

        // Ordenar as transações em ordem crescente de data
        Collections.sort(filteredTransactions,
                Comparator.comparing(transaction -> transaction.getDate().toLocalDate()));

        return ResponseEntity.status(HttpStatus.OK).body(filteredTransactions);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteNote(@RequestHeader(name="Authorization") @NotNull String token,
                                             @PathVariable(value = "id") UUID id) {
        var email = tokenService.validadeToken(token.replace("Bearer ", ""));
        UserModel user = userRepository.findModelByEmail(email);

        Optional<TransactionModel> transactionO = transactionRepository.findById(id);

        if(transactionO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction not found.");
        }
        else if(transactionO.get().getUser() != user) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Operation not permitted.");
        }

        transactionRepository.delete(transactionO.get());
        
        return ResponseEntity.status(HttpStatus.OK).body("Transaction deleted successfully.");
    }
}
