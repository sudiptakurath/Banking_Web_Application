package com.bank.web.repository;

import com.bank.web.entity.KYC;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KYCRepository extends JpaRepository<KYC, Integer> {
    Optional<KYC> findByPanNumber(String panNumber);

    Optional<KYC> findByAccountId(Integer accountID);
}
