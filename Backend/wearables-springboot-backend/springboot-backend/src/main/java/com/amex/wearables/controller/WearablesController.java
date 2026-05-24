package com.amex.wearables.controller;

import com.amex.wearables.model.*;
import com.amex.wearables.service.WearablesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wearables")
@RequiredArgsConstructor
public class WearablesController {

    private final WearablesService wearablesService;

    // CSA and ONLS_ADMIN can look up a client's cards
    @GetMapping("/client/{clientCode}")
    @PreAuthorize("hasAnyRole('CSA', 'ONLS_ADMIN')")
    public ResponseEntity<ApiResponse<ClientWearableData>> getClientData(
            @PathVariable String clientCode) {
        ClientWearableData data = wearablesService.getClientData(clientCode);
        return ResponseEntity.ok(ApiResponse.ok(data));
    }

    // CSA and ONLS_ADMIN can view existing devices for a card
    @GetMapping("/devices/{cardNumber}")
    @PreAuthorize("hasAnyRole('CSA', 'ONLS_ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, List<WearableDevice>>>> getDevicesForCard(
            @PathVariable String cardNumber) {
        List<WearableDevice> devices = wearablesService.getDevicesForCard(cardNumber);
        return ResponseEntity.ok(ApiResponse.ok(Map.of("devices", devices)));
    }

    // Only CSA can issue a wearable (matches spec: servicing agents only)
    @PostMapping("/issue")
    @PreAuthorize("hasRole('CSA')")
    public ResponseEntity<ApiResponse<WearableDevice>> issueWearable(
            @Valid @RequestBody WearableIssuanceRequest request) {
        if (!request.isTcAccepted()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Terms & Conditions must be accepted"));
        }
        WearableDevice issued = wearablesService.issueWearable(request);
        return ResponseEntity.ok(ApiResponse.ok(issued));
    }

    // Only CSA can suspend / activate / terminate a wearable
    @PostMapping("/action/{serialNo}")
    @PreAuthorize("hasRole('CSA')")
    public ResponseEntity<ApiResponse<WearableDevice>> performAction(
            @PathVariable String serialNo,
            @Valid @RequestBody WearableActionRequest request) {
        WearableDevice updated = wearablesService.performAction(serialNo, request);
        return ResponseEntity.ok(ApiResponse.ok(updated));
    }
}