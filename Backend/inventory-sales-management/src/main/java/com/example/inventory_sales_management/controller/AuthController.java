package com.example.inventory_sales_management.controller;

import com.example.inventory_sales_management.model.User;
import com.example.inventory_sales_management.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login (@RequestBody User user){
        boolean success = authService.login(user.getUsername(), user.getPassword());
        if(success){
            return ResponseEntity.ok("Login successful");
        }else{
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or Password");
        }
    }
}
