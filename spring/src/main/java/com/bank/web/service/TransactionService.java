package com.bank.web.service;

import com.bank.web.entity.Account;
import com.bank.web.entity.KYC;
import com.bank.web.entity.Transaction;
import com.bank.web.repository.AccountRepository;
import com.bank.web.repository.KYCRepository;
import com.bank.web.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private KYCRepository kycRepository;

    public boolean performTransaction(int accountId, Integer toAccountNumber, float amount) {
        Account senderAccount = accountRepository.findById(accountId).orElseThrow(() -> new NoSuchElementException("Account not found"));

        Optional<KYC> senderKYC = kycRepository.findByAccountId(accountId);
        if (senderKYC.isEmpty() || !senderKYC.get().getVerified()) {
            return false;
        }

        float senderCurrentBalance = senderAccount.getBalance();
        if (senderCurrentBalance < 1000 || senderCurrentBalance < amount || amount <= 0) {
            return false;
        }

        // Check if the receiver account exists
        if (toAccountNumber != null) {
            Optional<Account> receiverAccountOptional = accountRepository.findByAccountNumber(toAccountNumber);
            if (receiverAccountOptional.isPresent()) {
                Account receiverAccount = receiverAccountOptional.get();

                float receiverCurrentBalance = receiverAccount.getBalance();
                float updatedReceiverBalance = receiverCurrentBalance + amount;
                receiverAccount.setBalance(updatedReceiverBalance);
                accountRepository.save(receiverAccount);

                float updatedSenderBalance = senderCurrentBalance - amount;
                senderAccount.setBalance(updatedSenderBalance);
                accountRepository.save(senderAccount);

                Transaction senderTransaction = new Transaction(senderAccount, -amount);
                transactionRepository.save(senderTransaction);

                Transaction receiverTransaction = new Transaction(receiverAccount, amount);
                transactionRepository.save(receiverTransaction);

                return true;
            }
        }

        float updatedSenderBalance = senderCurrentBalance - amount;
        senderAccount.setBalance(updatedSenderBalance);
        accountRepository.save(senderAccount);

        Transaction senderTransaction = new Transaction(senderAccount, -amount);
        transactionRepository.save(senderTransaction);

        return true;
    }
}