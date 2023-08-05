package com.bank.web.controller;

import com.bank.web.entity.Account;
import com.bank.web.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bank/account")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping("/{userId}/createAccount")
    public ResponseEntity<String> createAccountForUser(@PathVariable int userId, @RequestBody Account account) {
        try {
            accountService.createAccountForUser(userId, account);
            return ResponseEntity.ok("Account created successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}