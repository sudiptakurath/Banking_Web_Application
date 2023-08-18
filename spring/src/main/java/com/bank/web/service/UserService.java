package com.bank.web.service;

import com.bank.web.entity.User;
import com.bank.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Integer saveUser(User user) {
        var resp = userRepository.save(user);
        if (resp != null) {
            return 1;
        } else {
            return 0;
        }
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User getUserByUserId(int userId){
        return userRepository.findByUserId(userId).orElse(null);
    }

    public boolean checkUserEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent();
    }
}