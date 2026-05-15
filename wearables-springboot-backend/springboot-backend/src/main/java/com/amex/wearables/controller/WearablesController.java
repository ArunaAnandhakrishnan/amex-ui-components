package com.amex.wearables.controller;

import com.amex.wearables.model.ApiResponse;
import com.amex.wearables.model.ClientWearableData;
import com.amex.wearables.model.WearableDevice;
import com.amex.wearables.model.WearableIssuanceRequest;
import com.amex.wearables.service.WearablesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * WearablesController
 *
 * Base path: /api/wearables
 *
 * Endpoints consumed by Angular wearables-portal:
 *
 *   GET  /api/health                              → HealthController (see HealthController.java)
 *   GET  /api/wearables/client/{clientCode}       → client info + cards
 *   GET  /api/wearables/devices/{cardNumber}      → existing devices for a card
 *   POST /api/wearables/issue                     → issue new wearable
 */
@RestController
@RequestMapping("/api/wearables")
@RequiredArgsConstructor
public class WearablesController {

    private final WearablesService wearablesService;

    // ──────────────────────────────────────────────────────────────────────────
    // GET /api/wearables/client/{clientCode}
    // Angular: onSearch(clientCode) → http.get(`${API_BASE}/wearables/client/${clientCode}`)
    // ──────────────────────────────────────────────────────────────────────────
    @GetMapping("/client/{clientCode}")
    public ResponseEntity<ApiResponse<ClientWearableData>> getClientData(
            @PathVariable String clientCode) {

        ClientWearableData data = wearablesService.getClientData(clientCode);
        return ResponseEntity.ok(ApiResponse.ok(data));
    }

    // ──────────────────────────────────────────────────────────────────────────
    // GET /api/wearables/devices/{cardNumber}
    // Angular: onCardSelect(card) → http.get(`${API_BASE}/wearables/devices/${card.cardNumber}`)
    // Note: cardNumber contains spaces e.g. "3744 XXXXXX 9008" so it's
    //       URL-encoded by Angular's HttpClient automatically.
    // ──────────────────────────────────────────────────────────────────────────
    @GetMapping("/devices/{cardNumber}")
    public ResponseEntity<ApiResponse<Map<String, List<WearableDevice>>>> getDevicesForCard(
            @PathVariable String cardNumber) {

        List<WearableDevice> devices = wearablesService.getDevicesForCard(cardNumber);
        return ResponseEntity.ok(ApiResponse.ok(Map.of("devices", devices)));
    }

    // ──────────────────────────────────────────────────────────────────────────
    // POST /api/wearables/issue
    // Angular: confirmIssuance() → http.post(`${API_BASE}/wearables/issue`, form)
    // ──────────────────────────────────────────────────────────────────────────
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
}
