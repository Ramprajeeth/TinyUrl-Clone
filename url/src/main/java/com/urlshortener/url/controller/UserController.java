package com.urlshortener.url.controller;

import com.urlshortener.url.dto.request.SignupRequest;
import com.urlshortener.url.dto.request.LoginRequest;
import com.urlshortener.url.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@RestController
@RequestMapping("/auth")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request){
        log.info("Received signup request for username: {}", request.getUsername());
        try{
            userService.signup(request);
            log.info("Signup successful for username: {}", request.getUsername());
            return ResponseEntity.status(HttpStatus.CREATED).body("User has been created!");
        }
        catch(Exception e){
            log.warn("Signup failed for username: {}: {}", request.getUsername(), e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        log.info("Received login request for username: {}", request.getUsername());
        boolean success = userService.login(request);
        if(success){
            log.info("Login successful for username: {}", request.getUsername());
            return ResponseEntity.ok("Login Successful");
        }

        else{
            log.warn("Login failed for username: {}", request.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }



    }
}
