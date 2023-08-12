package com.bank.web.service;

import com.bank.web.entity.User;
import com.bank.web.repository.AdminRepository;
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

}
