package com.amex.wearables.controller;

import com.amex.wearables.model.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    /**
     * Simple health check — Angular wearables component calls this on init
     * to check if the backend is reachable and display the status indicator.
     *
     * GET /api/health
     * Response: { "success": true, "message": "OK", "data": { "status": "UP", "timestamp": "..." } }
     */
    @GetMapping("/health")
    public ApiResponse<Map<String, String>> health() {
        return ApiResponse.ok(Map.of(
                "status",    "UP",
                "service",   "wearables-backend",
                "timestamp", LocalDateTime.now().toString()
        ));
    }
}
