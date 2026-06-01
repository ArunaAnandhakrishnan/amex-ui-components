package com.amex.wearables.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WearableDevice {
    private String deviceType;   // Bracelet | Band | Ring
    private String status;       // Issued | Inactive | Suspended
    private String cardLinked;
    private String issueDate;
    private String serialNo;
    private boolean nfcEnabled;
}
