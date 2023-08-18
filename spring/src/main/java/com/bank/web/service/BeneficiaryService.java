package com.bank.web.service;

import com.bank.web.entity.Account;
import com.bank.web.entity.Beneficiary;
import com.bank.web.repository.AccountRepository;
import com.bank.web.repository.BeneficiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeneficiaryService {

    @Autowired
    private BeneficiaryRepository beneficiaryRepository;
    @Autowired
    private AccountRepository accountRepository;

    public void addBeneficiaryForUser(Integer accountId, Beneficiary beneficiary) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account with ID " + accountId + " not found"));
        beneficiary.setAccount(account);
        beneficiaryRepository.save(beneficiary);
    }

    public boolean checkBeneficiaryExists(Integer accountId, Long accountNumber) {
        return beneficiaryRepository.existsByAccountAccountIdAndAccountNumber(accountId, accountNumber);
    }

    public List<Beneficiary> getAllBeneficiariesForUser(Integer accountId) {
        return beneficiaryRepository.findByAccountAccountId(accountId);
    }
}