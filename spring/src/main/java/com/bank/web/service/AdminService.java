package com.bank.web.service;

import com.bank.web.entity.Account;
import com.bank.web.entity.Transaction;
import com.bank.web.entity.User;
import com.bank.web.repository.AccountRepository;
import com.bank.web.repository.AdminRepository;
import com.bank.web.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    TransactionRepository transactionRepository;

    public List<User> getUserList() {
        return adminRepository.findAll();
    }

    public List<User> getUsersByUserType() {
        return adminRepository.findUsersByUserType(1);
    }

    public List<User> getUsersByUserRequest() {
        return adminRepository.findUsersByUserRequest(0);
    }

//    public Admin updateUsersByUserType(Admin admin){
//        Admin updateusertype = adminRepository.save(admin);
//        return updateusertype;
//    }

    public ResponseEntity<String> updateUserStatus(int id, Map<String, Integer> userType) {
        Optional<User> optionalUser = adminRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUserType(userType.get("usertype"));
            adminRepository.save(user);
            return ResponseEntity.ok("User updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public List<Account> getAccountDetailsByUserId(int userId){
        Optional<User> optionalUser = adminRepository.findById(userId);
        List<Account> accountList = null;
        if (optionalUser.isPresent()) {
            accountList = accountRepository.findAccountByUserId(userId);
        }
        return accountList;
    }

    public List<Transaction> getTransactionDetailsByAccountId(int accountId){
        Optional<Account> optionalAccount = accountRepository.findById(accountId);
        List<Transaction> transactionList = null;
        if (optionalAccount.isPresent()) {
            transactionList = transactionRepository.findTransactionsByAccountId(accountId);
        }
        return transactionList;
    }
}
