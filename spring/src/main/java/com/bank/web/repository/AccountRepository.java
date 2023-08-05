package com.bank.web.repository;

import com.bank.web.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByAccountNumber(int toAccountNumber);
}