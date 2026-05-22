package com.example.Auth.Controller;

import com.example.Auth.DTO.AuthResponse;
import com.example.Auth.DTO.ForgotPasswordRequest;
import com.example.Auth.DTO.LoginRequest;
import com.example.Auth.DTO.RegisterRequest;
import com.example.Auth.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login( @RequestBody LoginRequest req) {
        AuthResponse res = authService.login(req);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest req) {
        authService.forgotPassword(req);
        return ResponseEntity.ok(Map.of("message", "Temporary password sent successfully"));
    }

    // POST /api/auth/register
    // Body: { "username": "...", "email": "...", "password": "...", "role": "ROLE_USER" }
    // Returns: { "username": "...", "role": "ROLE_USER", "token": "...", "message": "Registration successful" }
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register( @RequestBody RegisterRequest req) {
        AuthResponse res = authService.register(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
}
