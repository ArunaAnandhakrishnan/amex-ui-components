package com.example.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendForgotPasswordMail(String to, String username, String tempPassword) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("ISO8583 Validator — Password Reset");
        msg.setText(
                "Hi " + username + ",\n\n" +
                        "Your temporary password is: " + tempPassword + "\n\n" +
                        "Please log in and change your password immediately.\n\n" +
                        "ISO8583 Validator Team"
        );
        mailSender.send(msg);
    }
}