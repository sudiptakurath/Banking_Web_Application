package com.bank.web.controller;

import com.bank.web.entity.Transaction;
import com.bank.web.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bank/account/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/transfer/{accountId}")
    public ResponseEntity<String> performTransaction(@PathVariable int accountId, @RequestBody Transaction transaction) {
        boolean transactionResult = transactionService.performTransaction(accountId, transaction.getToAccountNumber(), transaction.getAmount());

        if (transactionResult) {
            return ResponseEntity.ok("Transaction successful!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Transaction failed!");
        }
    }
}
