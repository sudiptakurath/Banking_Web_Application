package com.bank.web.service;

import com.bank.web.entity.Account;
import com.bank.web.entity.KYC;
import com.bank.web.repository.AccountRepository;
import com.bank.web.repository.KYCRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class KYCService {

    @Autowired
    private KYCRepository kycRepository;
    @Autowired
    private AccountRepository accountRepository;
    public void createAccountKYC(int accountId, KYC kyc) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account with ID " + accountId + " not found"));

        if (!isValidPAN(kyc.getPanNumber())) {
            throw new IllegalArgumentException("Invalid PAN Number. Please enter a valid PAN number.");
        }

        if (checkpanNumber(kyc.getPanNumber())) {
            throw new IllegalArgumentException("PAN Number is already registered.");
        }

        kyc.setAccountId(account.getAccountId());
        kyc.setAccount(account);
        kycRepository.save(kyc);
    }

    private boolean isValidPAN(String panNumber) {
        String PAN_REGEX = "^[A-Z]{5}\\d{4}[A-Z]$";
        return panNumber.matches(PAN_REGEX);
    }

    public boolean checkpanNumber(String panNumber){
        Optional<KYC> kyc = kycRepository.findByPanNumber(panNumber);
        return kyc.isPresent();
    }
}
