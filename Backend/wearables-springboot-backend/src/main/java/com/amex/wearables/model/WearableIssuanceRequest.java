package com.amex.wearables.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class WearableIssuanceRequest {

    @NotBlank(message = "clientCode is required")
    private String clientCode;

    @NotBlank(message = "selectedCard is required")
    private String selectedCard;

    @NotBlank(message = "wearableType is required")
    private String wearableType;   // bracelet | band | ring

    private String colorSelected;
    private String wearableName;
    private boolean tcAccepted;
}
