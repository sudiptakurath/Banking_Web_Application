package com.bank.web.controller;

import com.bank.web.entity.Transaction;
import com.bank.web.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/bank-api/account/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/transfer/{accountId}")
    public ResponseEntity<String> performTransaction(@PathVariable int accountId, @RequestBody Transaction transaction) {
        try {
            boolean transactionResult = transactionService.performTransaction(accountId, transaction.getToAccountNumber(), transaction.getAmount());

            if (transactionResult) {
                return ResponseEntity.ok("Transaction successful!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Transaction failed! Insufficient balance or account not verified.");
            }
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during the transaction.");
        }
    }
}
