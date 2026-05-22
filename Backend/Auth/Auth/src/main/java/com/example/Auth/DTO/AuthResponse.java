package com.example.Auth.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data

public class AuthResponse {

    private String username;
    private String role;
    private String token;
    private String message;

    public AuthResponse(String username, String role, String token, String message) {
        this.username = username;
        this.role     = role;
        this.token    = token;
        this.message  = message;
    }
}