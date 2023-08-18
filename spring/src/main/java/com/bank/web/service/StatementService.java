package com.bank.web.service;

import com.bank.web.entity.Beneficiary;
import com.bank.web.entity.Statement;
import com.bank.web.repository.BeneficiaryRepository;
import com.bank.web.repository.StatementRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class StatementService {
    @Autowired
    private StatementRepository statementRepository;
    public List<Statement> getAllStatementForAccount(Integer accountId) {
        return statementRepository.getAllStatementForAccount(accountId);
    }
}