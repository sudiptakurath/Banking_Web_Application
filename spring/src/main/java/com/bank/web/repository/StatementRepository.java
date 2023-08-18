package com.bank.web.repository;

import com.bank.web.entity.Account;
import com.bank.web.entity.Statement;

import java.util.List;
import java.util.Optional;

public interface StatementRepository {
    List<Statement> getAllStatementForAccount(int AccountNumber);

}
