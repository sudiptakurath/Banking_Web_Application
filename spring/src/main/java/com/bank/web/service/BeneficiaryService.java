package com.bank.web.service;

import com.bank.web.entity.Beneficiary;
import com.bank.web.entity.User;
import com.bank.web.repository.BeneficiaryRepository;
import com.bank.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeneficiaryService {

    @Autowired
    private BeneficiaryRepository beneficiaryRepository;
    @Autowired
    private UserRepository userRepository;

    public void addBeneficiaryForUser(int userId, Beneficiary beneficiary) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));
        beneficiary.setUser(user);
        beneficiaryRepository.save(beneficiary);
    }

    public boolean checkBeneficiaryExists(Integer userId, Long accountNumber) {
        return beneficiaryRepository.existsByUserUserIdAndAccountNumber(userId, accountNumber);
    }

    public List<Beneficiary> getAllBeneficiariesForUser(Integer userId) {
        return beneficiaryRepository.findByUserUserId(userId);
    }
}