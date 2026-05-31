package com.example.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.serviceregistry.AutoServiceRegistrationAutoConfiguration;

@SpringBootApplication(
        exclude = {
                // EurekaAutoServiceRegistration references
                // org.springframework.boot.web.server.context.WebServerInitializedEvent
                // which moved from org.springframework.boot.web.context in Spring Boot 3.x
                // to org.springframework.boot.web.server.context in Spring Boot 4.
                // Spring Cloud Netflix 5.0.1 was compiled against the old location.
                // Excluding ONLY the registration auto-config keeps EurekaClient
                // and EurekaDiscoveryClient intact for lb:// routing.
                AutoServiceRegistrationAutoConfiguration.class
        }
)
public class ApigatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApigatewayApplication.class, args);
    }
}