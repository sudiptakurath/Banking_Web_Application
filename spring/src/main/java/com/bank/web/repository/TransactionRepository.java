package com.bank.web.repository;

import com.bank.web.entity.Account;
import com.bank.web.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    @Query(value = "SELECT * FROM transactions_tb WHERE fk_account_id = :accountId", nativeQuery = true)
    List<Transaction> findTransactionsByAccountId(@Param("accountId") int accountId);
}
