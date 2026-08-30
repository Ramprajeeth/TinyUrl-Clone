package com.urlshortener.url.service;

import com.urlshortener.url.dto.request.SignupRequest;
import com.urlshortener.url.repository.UserRepository;
import com.urlshortener.url.entity.User;
import com.urlshortener.url.dto.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Optional;


@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User signup(SignupRequest request){
        log.info("Attempting signup for username: {}", request.getUsername());
        if(userRepository.findByUsername(request.getUsername()).isPresent()){
            log.warn("Signup failed: Username already exists: {}", request.getUsername());
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUrls(new ArrayList<>());

        User savedUser = userRepository.save(user);
        log.info("Successfully signed up user: {}", request.getUsername());
        return savedUser;

    }

    public boolean login(LoginRequest request){
        log.info("Attempting login for username: {}", request.getUsername());
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if(userOpt.isEmpty()){
            log.warn("Login failed: User not found for username: {}", request.getUsername());
            return false;
        }

        User user = userOpt.get();
        boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (matches) {
            log.info("Login successful for username: {}", request.getUsername());
        } else {
            log.warn("Login failed: Invalid password for username: {}", request.getUsername());
        }
        return matches;
    }

}
