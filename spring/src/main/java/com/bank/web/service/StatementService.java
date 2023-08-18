package com.bank.web.service;

import com.bank.web.entity.Transaction;
import com.bank.web.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatementService {
    @Autowired
    private TransactionRepository transactionRepository;
    public List<Transaction> getAccountStatement(Integer accountID) {
        return transactionRepository.findTransactionsByAccountId(accountID);
    }
}