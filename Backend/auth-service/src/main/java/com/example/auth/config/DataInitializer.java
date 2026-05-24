package com.example.auth.config;

import com.example.auth.model.User;
import com.example.auth.repository.UserRepository;
import com.example.auth.util.Roles;
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

            // System Administrator — full access, can assign roles
            userRepository.save(User.builder()
                    .username("sys.admin")
                    .email("sysadmin@aeme.com")
                    .password(passwordEncoder.encode("Admin@1234"))
                    .fullName("System Administrator")
                    .avatarInitials("SA")
                    .roles(Set.of(Roles.SYS_ADMIN))
                    .build());

            // Customer Service Agent — ONLS Helper, Wearables, Centurion
            userRepository.save(User.builder()
                    .username("csa.agent")
                    .email("csa@aeme.com")
                    .password(passwordEncoder.encode("Agent@1234"))
                    .fullName("Sarah Al Mansouri")
                    .avatarInitials("SM")
                    .roles(Set.of(Roles.CSA))
                    .build());

            // Risk User — BCRB / AECB Bulk Reporting
            userRepository.save(User.builder()
                    .username("risk.user")
                    .email("risk@aeme.com")
                    .password(passwordEncoder.encode("Risk@1234"))
                    .fullName("Ahmed Khalil")
                    .avatarInitials("AK")
                    .roles(Set.of(Roles.RISK_USER))
                    .build());

            // MRM User — Online Merchant Service
            userRepository.save(User.builder()
                    .username("mrm.user")
                    .email("mrm@aeme.com")
                    .password(passwordEncoder.encode("Mrm@1234"))
                    .fullName("Priya Nair")
                    .avatarInitials("PN")
                    .roles(Set.of(Roles.MRM_USER))
                    .build());

            // Corporate Master Admin — BTA Portal
            userRepository.save(User.builder()
                    .username("corp.admin")
                    .email("corp.admin@aeme.com")
                    .password(passwordEncoder.encode("Corp@1234"))
                    .fullName("Faisal Al Rashid")
                    .avatarInitials("FR")
                    .roles(Set.of(Roles.CORP_MASTER_ADMIN))
                    .build());

            // Travel Agent Master Admin — BTA Portal
            userRepository.save(User.builder()
                    .username("ta.admin")
                    .email("ta.admin@aeme.com")
                    .password(passwordEncoder.encode("Travel@1234"))
                    .fullName("Layla Hassan")
                    .avatarInitials("LH")
                    .roles(Set.of(Roles.TA_MASTER_ADMIN))
                    .build());

            // SOC/ROC Business User
            userRepository.save(User.builder()
                    .username("soc.user")
                    .email("soc@aeme.com")
                    .password(passwordEncoder.encode("Soc@1234"))
                    .fullName("Omar Farooq")
                    .avatarInitials("OF")
                    .roles(Set.of(Roles.SOC_BUSINESS_USER))
                    .build());

            // ONLS Admin — Wearables + Helper Portal read access
            userRepository.save(User.builder()
                    .username("onls.admin")
                    .email("onls.admin@aeme.com")
                    .password(passwordEncoder.encode("Onls@1234"))
                    .fullName("Khalid Al Nasser")
                    .avatarInitials("KN")
                    .roles(Set.of(Roles.ONLS_ADMIN))
                    .build());

            log.info("Seeded 8 AEME users: sys.admin / csa.agent / onls.admin / risk.user / mrm.user / corp.admin / ta.admin / soc.user");
        }
    }
}