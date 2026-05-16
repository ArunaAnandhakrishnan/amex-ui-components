package com.amex.wearables.controller;

import com.amex.wearables.model.*;
import com.amex.wearables.service.WearablesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * WearablesController  —  base path: /api/wearables
 *
 *  GET  /api/health                              → HealthController
 *  GET  /api/wearables/client/{clientCode}       → member info + cards
 *  GET  /api/wearables/devices/{cardNumber}      → existing devices for a card
 *  POST /api/wearables/issue                     → issue new wearable
 *  POST /api/wearables/action/{serialNo}         → suspend / activate / terminate
 */
@RestController
@RequestMapping("/api/wearables")
@RequiredArgsConstructor
public class WearablesController {

    private final WearablesService wearablesService;

    // ── GET /api/wearables/client/{clientCode} ────────────────────────────────
    @GetMapping("/client/{clientCode}")
    public ResponseEntity<ApiResponse<ClientWearableData>> getClientData(
            @PathVariable String clientCode) {

        ClientWearableData data = wearablesService.getClientData(clientCode);
        return ResponseEntity.ok(ApiResponse.ok(data));
    }

    // ── GET /api/wearables/devices/{cardNumber} ───────────────────────────────
    @GetMapping("/devices/{cardNumber}")
    public ResponseEntity<ApiResponse<Map<String, List<WearableDevice>>>> getDevicesForCard(
            @PathVariable String cardNumber) {

        List<WearableDevice> devices = wearablesService.getDevicesForCard(cardNumber);
        return ResponseEntity.ok(ApiResponse.ok(Map.of("devices", devices)));
    }

    // ── POST /api/wearables/issue ─────────────────────────────────────────────
    @PostMapping("/issue")
    public ResponseEntity<ApiResponse<WearableDevice>> issueWearable(
            @Valid @RequestBody WearableIssuanceRequest request) {

        if (!request.isTcAccepted()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Terms & Conditions must be accepted"));
        }

        WearableDevice issued = wearablesService.issueWearable(request);
        return ResponseEntity.ok(ApiResponse.ok(issued));
    }

    // ── POST /api/wearables/action/{serialNo} ─────────────────────────────────
    // Action: { "action": "SUSPEND" | "ACTIVATE" | "TERMINATE", "reason": "..." }
    @PostMapping("/action/{serialNo}")
    public ResponseEntity<ApiResponse<WearableDevice>> performAction(
            @PathVariable String serialNo,
            @Valid @RequestBody WearableActionRequest request) {

        WearableDevice updated = wearablesService.performAction(serialNo, request);
        return ResponseEntity.ok(ApiResponse.ok(updated));
    }
}