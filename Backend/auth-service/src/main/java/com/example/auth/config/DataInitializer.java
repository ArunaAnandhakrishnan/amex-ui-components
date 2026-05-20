package com.example.auth.config;

import com.example.auth.model.User;
import com.example.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            // Admin user
            userRepository.save(User.builder()
                    .username("admin")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .roles(Set.of("ROLE_USER", "ROLE_ADMIN"))
                    .build());

            // Regular user
            userRepository.save(User.builder()
                    .username("alice")
                    .email("alice@example.com")
                    .password(passwordEncoder.encode("Alice@123"))
                    .roles(Set.of("ROLE_USER"))
                    .build());

            log.info("Seeded default users: admin / alice");
        }
    }
}
