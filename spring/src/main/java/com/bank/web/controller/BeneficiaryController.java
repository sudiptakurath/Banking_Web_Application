package com.bank.web.controller;

import com.bank.web.entity.Beneficiary;
import com.bank.web.service.BeneficiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bank/beneficiaries")
@CrossOrigin(origins = "http://localhost:3000")

public class BeneficiaryController {
    @Autowired
    private BeneficiaryService beneficiaryService;

    @PostMapping("/addBeneficiary/{accountId}")
    public ResponseEntity<String> addBeneficiaryForUser(@PathVariable int accountId, @RequestBody Beneficiary beneficiary) {
        try {
            beneficiaryService.addBeneficiaryForUser(accountId, beneficiary);
            return ResponseEntity.ok("Beneficiary added successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/checkBeneficiary/{accountId}/{accountNumber}")
    public ResponseEntity<Boolean> checkBeneficiaryExists(@PathVariable Integer accountId, @PathVariable Long accountNumber) {
        boolean beneficiaryExists = beneficiaryService.checkBeneficiaryExists(accountId, accountNumber);
        if (beneficiaryExists) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
    }

    @GetMapping("/getBeneficiary/{userId}")
    public ResponseEntity<List<Beneficiary>> getAllBeneficiariesForUser(@PathVariable Integer userId) {
        List<Beneficiary> beneficiaries = beneficiaryService.getAllBeneficiariesForUser(userId);
        if (beneficiaries.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(beneficiaries);
        }
    }

}