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
        Account senderAccount = accountRepository.findById(accountId).orElseThrow(() -> new NoSuchElementException("Sender account not found"));

        Optional<KYC> senderKYC = kycRepository.findByAccountId(accountId);
        if (senderKYC.isEmpty() || !senderKYC.get().getVerified()) {
            throw new IllegalStateException("Your account is not KYC verified");
        }

        float senderCurrentBalance = senderAccount.getBalance();
        if (senderCurrentBalance < 1000) {
            throw new IllegalStateException("Your account must have a minimum balance of 1000");
        }

        if (amount <= 0) {
            throw new IllegalArgumentException("Amount should be greater than 0");
        }

        if (senderCurrentBalance < amount) {
            throw new IllegalStateException("Insufficient balance in your account");
        }

        if (toAccountNumber != null) {
            Optional<Account> receiverAccountOptional = accountRepository.findByAccountNumber(toAccountNumber);
            if (receiverAccountOptional.isPresent()) {
                Account receiverAccount = receiverAccountOptional.get();

                float receiverCurrentBalance = receiverAccount.getBalance();
                float updatedReceiverBalance = receiverCurrentBalance + amount;
                receiverAccount.setBalance(updatedReceiverBalance);
                accountRepository.save(receiverAccount);

                float updatedSenderBalance = senderCurrentBalance - amount;
                if (updatedSenderBalance >= 1000) {
                    senderAccount.setBalance(updatedSenderBalance);
                    accountRepository.save(senderAccount);

                    Transaction senderTransaction = new Transaction(senderAccount, -amount);
                    transactionRepository.save(senderTransaction);

                    Transaction receiverTransaction = new Transaction(receiverAccount, amount);
                    transactionRepository.save(receiverTransaction);

                    return true;
                } else {
                    // Rollback the transaction, as the minimum balance of 1000 is not maintained
                    receiverAccount.setBalance(receiverCurrentBalance);
                    accountRepository.save(receiverAccount);
                    throw new IllegalStateException("Transaction failed! Your account must have a minimum balance of 1000");
                }
            } else {
                // Receiver account does not exist, only deduct the amount from the sender's account
                float updatedSenderBalance = senderCurrentBalance - amount;
                if (updatedSenderBalance >= 1000) {
                    senderAccount.setBalance(updatedSenderBalance);
                    accountRepository.save(senderAccount);

                    Transaction senderTransaction = new Transaction(senderAccount, -amount);
                    transactionRepository.save(senderTransaction);

                    return true;
                } else {
                    throw new IllegalStateException("Transaction failed! Your account must have a minimum balance of 1000");
                }
            }
        } else {
            // No receiver account specified, only deduct the amount from the sender's account
            float updatedSenderBalance = senderCurrentBalance - amount;
            if (updatedSenderBalance >= 1000) {
                senderAccount.setBalance(updatedSenderBalance);
                accountRepository.save(senderAccount);

                Transaction senderTransaction = new Transaction(senderAccount, -amount);
                transactionRepository.save(senderTransaction);

                return true;
            } else {
                throw new IllegalStateException("Transaction failed! Your account must have a minimum balance of 1000");
            }
        }
    }
}