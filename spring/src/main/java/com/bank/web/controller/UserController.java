package com.bank.web.controller;

import com.bank.web.entity.User;
import com.bank.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bank")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public ResponseEntity<Integer> addUser(@RequestBody User user) {
        Integer userId = userService.saveUser(user);
        if (userId != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(userId);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getUser/{email}")
    public ResponseEntity<User> findUser(@PathVariable String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/checkEmail/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
        boolean emailExists = userService.checkUserEmail(email);
        return ResponseEntity.ok(emailExists);
    }
}
