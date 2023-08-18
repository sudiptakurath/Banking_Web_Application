package com.bank.web.controller;

import com.bank.web.entity.Account;
import com.bank.web.entity.Transaction;
import com.bank.web.entity.User;
import com.bank.web.repository.AdminRepository;
import com.bank.web.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    AdminRepository adminRepository;
    @Autowired
    private AdminService adminService;

    @GetMapping
    public String display(){
        return "Hello world";
    }

    @GetMapping("/getUserDetails")
    public List<User> getUserList() {
        return adminService.getUserList();

    }

    @GetMapping("/getUsersByUserType")
    public List<User> getUsersByUserType() {
        return adminService.getUsersByUserType();
    }

    @GetMapping("/getUsersByUserRequest")
    public List<User> getUsersByUserRequest() {
        return adminService.getUsersByUserRequest();
    }

//    @PutMapping("/updateUsersByUserType/{id}")
//    public Admin updateUsersByUserType(@RequestBody Admin admin, @PathVariable int id){
//        return adminService.updateUsersByUserType(admin);
//    }

    @PutMapping("/updateUserByUsertype/{id}")
    public ResponseEntity<String> updateUserStatus(@PathVariable int id, @RequestBody Map<String, Integer> userType) {
        return adminService.updateUserStatus(id, userType);
    }

    @GetMapping("/getAccountDetailsByUserId/{id}")
    public List<Account> getAccountDetailsByUserId(@PathVariable int id){
        return adminService.getAccountDetailsByUserId(id);
    }
    @GetMapping("/getTransactionDetailsByAccountId/{accountId}")
    public List<Transaction> getTransactionDetailsByAccountId(@PathVariable int accountId){
        return adminService.getTransactionDetailsByAccountId(accountId);
    }

}
