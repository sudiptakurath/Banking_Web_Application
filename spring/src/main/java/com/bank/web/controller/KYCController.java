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

    @PostMapping("/createKYC")
    public ResponseEntity<String> createAccountForUser(@RequestBody KYC kyc) {
        try {
            kycService.createAccountKYC(kyc.getAccountId(), kyc);
            return ResponseEntity.ok("KYC added successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
