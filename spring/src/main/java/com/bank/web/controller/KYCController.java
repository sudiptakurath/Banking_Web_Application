package com.bank.web.controller;

import com.bank.web.entity.KYC;
import com.bank.web.service.KYCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bank/account/kyc")
@CrossOrigin(origins = "http://localhost:3000")
public class KYCController {

    @Autowired
    private KYCService kycService;

    @PostMapping("/{accountId}/createKYC")
    public ResponseEntity<String> createAccountForUser(@PathVariable int accountId, @RequestBody KYC kyc) {
        try {
            kycService.createAccountKYC(accountId, kyc);
            return ResponseEntity.ok("KYC added successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
