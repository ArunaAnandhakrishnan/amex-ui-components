package com.example.Auth.DTO;

import lombok.Data;

@Data
public class ForgotPasswordRequest {

    private String userId;
    private String email;

}
