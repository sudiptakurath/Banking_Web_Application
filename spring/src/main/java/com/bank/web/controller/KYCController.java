package com.bank.web.controller;

import com.bank.web.entity.KYC;
import com.bank.web.service.KYCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bank-api/account/kyc")
@CrossOrigin(origins = "http://localhost:3000")
public class KYCController {

    @Autowired
    private KYCService kycService;

    @PostMapping("/createKYC")
    public ResponseEntity<String> createAccountKYC(@RequestBody KYC kyc) {
        try {
            kycService.createAccountKYC(kyc.getAccountId(), kyc);
            return ResponseEntity.ok("KYC added successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the account.");
        }
    }
}
