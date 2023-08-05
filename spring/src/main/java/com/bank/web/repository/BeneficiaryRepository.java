package com.bank.web.repository;

import com.bank.web.entity.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Integer> {
    List<Beneficiary> findByAccountAccountId(Integer accountId);

    boolean existsByAccountAccountIdAndAccountNumber(Integer accountId, Long accountNumber);
}