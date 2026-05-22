package com.example.Auth.Service;

import com.example.Auth.DTO.AuthResponse;
import com.example.Auth.DTO.ForgotPasswordRequest;
import com.example.Auth.DTO.LoginRequest;
import com.example.Auth.DTO.RegisterRequest;
import com.example.Auth.Repo.UserRepository;
import com.example.Auth.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;

    private final EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    public void forgotPassword(ForgotPasswordRequest req) {
        User user = userRepo.findByUsernameAndEmail(req.getUserId(), req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid User ID or Email"));
        String tempPassword = generateTempPassword();
        user.setPassword(passwordEncoder.encode(tempPassword));
        userRepo.save(user);
        emailService.sendForgotPasswordMail(user.getEmail(), user.getUsername(), tempPassword);
    }

    private String generateTempPassword() {
        return UUID.randomUUID()
                .toString()
                .substring(0, 8);
    }
    // ── Login ─────────────────────────────────────────────────────────────────
    public AuthResponse login(LoginRequest req) {
        User user = userRepo.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }
        // Simple mock token — replace with JWT if needed
        String token = "onls-token-" + UUID.randomUUID();
        return new AuthResponse(
                user.getUsername(),
                user.getRole(),
                token,
                "Login successful"
        );
    }

    // ── Register ──────────────────────────────────────────────────────────────
    public AuthResponse register(RegisterRequest req) {
        if (userRepo.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already taken");
        }
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        String role = (req.getRole() != null && !req.getRole().isBlank())
                ? req.getRole() : "ROLE_USER";

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(role);
        userRepo.save(user);

        String token = "onls-token-" + UUID.randomUUID();

        return new AuthResponse(
                user.getUsername(),
                user.getRole(),
                token,
                "Registration successful"
        );
    }
}
