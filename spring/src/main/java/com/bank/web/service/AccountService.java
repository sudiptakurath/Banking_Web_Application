package com.bank.web.service;

import com.bank.web.entity.Account;
import com.bank.web.entity.KYC;
import com.bank.web.entity.Transaction;
import com.bank.web.entity.User;
import com.bank.web.repository.AccountRepository;
import com.bank.web.repository.KYCRepository;
import com.bank.web.repository.TransactionRepository;
import com.bank.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private KYCRepository kycRepository;
    @Autowired
    private TransactionRepository transactionRepository;

    public void createAccountForUser(int userId, Account account) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));
        account.setUserId(user.getUserId());
        account.setUser(user);
        accountRepository.save(account);
    }

    public List<Account> getAccount(List<Integer> users){
        return accountRepository.findAllById(users);
    }
    public Account getAccountById(int userId){
        return accountRepository.findById(userId).orElse(null);
    }

    public void addMoneyToAccount(int accountId, float amount) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new IllegalArgumentException("Account with ID " + accountId + " not found"));

        Optional<KYC> kyc = kycRepository.findByAccountId(accountId);
        if (kyc.isEmpty() || !kyc.get().getVerified()) {
            return;
        }

        float currentBalance = account.getBalance();

        if (amount <= 0) {
            throw new IllegalArgumentException("Amount should be greater than 0");
        }

        float updatedBalance = currentBalance + amount;
        account.setBalance(updatedBalance);
        accountRepository.save(account);

        Transaction transaction = new Transaction(account, amount);
        transactionRepository.save(transaction);
    }
}