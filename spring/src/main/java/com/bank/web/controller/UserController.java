package com.bank.web.controller;

import com.bank.web.entity.User;
import com.bank.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bank-api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public ResponseEntity<Integer> addUser(@RequestBody User user) {
        try {
            Integer userId = userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getUser/{email}")
    public ResponseEntity<User> findUser(@PathVariable String email) {
        try {
            User user = userService.getUserByEmail(email);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/checkEmail/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
        try {
            boolean emailExists = userService.checkUserEmail(email);
            return ResponseEntity.ok(emailExists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Fetch in Profile Component

    @GetMapping("/getUserByUserId/{userId}")
    public ResponseEntity<User> findUserByUserId(@PathVariable int userId) {
        try {
            User user = userService.getUserByUserId(userId);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}