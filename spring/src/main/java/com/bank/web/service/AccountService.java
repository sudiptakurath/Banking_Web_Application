package com.bank.web.service;

import com.bank.web.entity.Account;
import com.bank.web.entity.User;
import com.bank.web.repository.AccountRepository;
import com.bank.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UserRepository userRepository;

    public void createAccountForUser(int userId, Account account) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));
        account.setUserId(user.getUserId());
        account.setUser(user);
        accountRepository.save(account);
    }
}