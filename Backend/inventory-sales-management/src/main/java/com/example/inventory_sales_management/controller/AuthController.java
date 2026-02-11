package com.example.inventory_sales_management.controller;

import com.example.inventory_sales_management.model.User;
import com.example.inventory_sales_management.security.JwtUtil;
import com.example.inventory_sales_management.service.AuthService;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User dbUser = authService.authenticate(
                user.getUsername(), user.getPassword()
        );

        if (dbUser == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(
                dbUser.getUsername(),
                dbUser.getRole().name()
        );

        return ResponseEntity.ok(
                Map.of("token", token)
        );

    }
}
