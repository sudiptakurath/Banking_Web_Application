package com.bank.web.repository;

import com.bank.web.entity.Account;
import com.bank.web.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByAccountNumber(int toAccountNumber);

    @Query(value = "SELECT * FROM accounts_tb WHERE fk_user_id = :userId", nativeQuery = true)
    List<Account> findAccountByUserId(@Param("userId") int userId);

}