package com.amex.wearables.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class CorsConfig {
    // CORS handled entirely by the API Gateway.
    // Leaving CORS config here causes duplicate Access-Control-Allow-Origin
    // headers when routed through the gateway, which breaks browser requests.
}