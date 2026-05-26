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
        msg.setSubject("Password Reset");
        msg.setText(

                "Hi,\n\n" +

                        "Your Username is: " + username + "\n" +

                        "Your Temporary Password is: "
                        + tempPassword +

                        "\n\nPlease change your password after first login.\n\n"

                        + "Thank you"

        );

        mailSender.send(msg);

    }
}