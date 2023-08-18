package com.bank.web.controller;

import com.bank.web.entity.Beneficiary;
import com.bank.web.service.BeneficiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bank-api/beneficiaries")
@CrossOrigin(origins = "http://localhost:3000")

public class BeneficiaryController {
    @Autowired
    private BeneficiaryService beneficiaryService;

    @PostMapping("/addBeneficiary/{accountId}")
    public ResponseEntity<String> addBeneficiaryForUser(@PathVariable Integer accountId, @RequestBody Beneficiary beneficiary) {
        try {
            beneficiaryService.addBeneficiaryForUser(accountId, beneficiary);
            return ResponseEntity.ok("Beneficiary added successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the beneficiary.");
        }
    }

    @GetMapping("/checkBeneficiary/{accountId}/{accountNumber}")
    public ResponseEntity<Boolean> checkBeneficiaryExists(@PathVariable Integer accountId, @PathVariable Long accountNumber) {
        try {
            boolean beneficiaryExists = beneficiaryService.checkBeneficiaryExists(accountId, accountNumber);
            return ResponseEntity.ok(beneficiaryExists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

    @GetMapping("/getBeneficiary/{accountId}")
    public ResponseEntity<List<Beneficiary>> getAllBeneficiariesForUser(@PathVariable Integer accountId) {
        try {
            List<Beneficiary> beneficiaries = beneficiaryService.getAllBeneficiariesForUser(accountId);
            if (beneficiaries.isEmpty()) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.ok(beneficiaries);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}