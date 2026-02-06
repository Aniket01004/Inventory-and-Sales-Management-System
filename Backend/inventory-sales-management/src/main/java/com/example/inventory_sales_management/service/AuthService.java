package com.example.inventory_sales_management.service;

import com.example.inventory_sales_management.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;

    private AuthService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public boolean login(String username, String password){
        return userRepository.findByUsername(username)
                .map(user -> user.getPassword().equals(password))
                .orElse(false);
    }
}
