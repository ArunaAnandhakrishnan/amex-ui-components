package com.example.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

public class AuthDtos {

    @Data
    public static class RegisterRequest {
        @NotBlank
        @Size(min = 3, max = 50)
        private String username;

        @NotBlank
        @Email
        private String email;

        @NotBlank
        @Size(min = 8, max = 100)
        private String password;
    }

    @Data
    public static class LoginRequest {
        @NotBlank
        private String username;

        @NotBlank
        private String password;
    }

    @Data
    public static class RefreshRequest {
        @NotBlank
        private String refreshToken;
    }

    @lombok.Builder
    @Data
    public static class AuthResponse {
        private String accessToken;
        private String refreshToken;
        private String tokenType;
        private long expiresIn;
        private String username;
        private List<String> roles;
    }

    @Data
    public static class TokenValidationResponse {
        private boolean valid;
        private String username;
        private List<String> roles;

        public TokenValidationResponse(boolean valid, String username, List<String> roles) {
            this.valid = valid;
            this.username = username;
            this.roles = roles;
        }

        public static TokenValidationResponse invalid() {
            return new TokenValidationResponse(false, null, null);
        }
    }
}
