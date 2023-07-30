package com.bank.web.controller;

import com.bank.web.entity.User;
import com.bank.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bank")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public Integer addUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @GetMapping("/getUser/{email}")
    public User findUser(@PathVariable String email){
        return userService.getUserByEmail(email);
    }

    @GetMapping("/checkEmail/{email}")
    public boolean checkEmail(@PathVariable String email){
        return userService.checkUserEmail(email);
    }
}
