package com.urlshortener.url;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



import java.util.ArrayList;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User signup(SignupRequest request){
        if(userRepository.findByUsername(request.getUsername()).isPresent()){
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUrls(new ArrayList<>());

        return userRepository.save(user);

    }

    public boolean login(LoginRequest request){
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if(userOpt.isEmpty()) return false;

        User user = userOpt.get();
        return passwordEncoder.matches(request.getPassword(), user.getPassword());
    }

}
