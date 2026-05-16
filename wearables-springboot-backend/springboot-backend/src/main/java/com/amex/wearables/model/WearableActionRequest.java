package com.amex.wearables.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class WearableActionRequest {

    /**
     * Action to perform on the wearable.
     * Allowed values: SUSPEND | ACTIVATE | TERMINATE
     */
    @NotBlank(message = "action is required")
    private String action;

    private String reason;   // optional free-text reason
}