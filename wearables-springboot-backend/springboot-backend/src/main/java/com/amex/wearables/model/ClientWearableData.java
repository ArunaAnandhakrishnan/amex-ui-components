package com.amex.wearables.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientWearableData {

    private String     clientCode;
    private String     memberName;
    private List<CardInfo> cards;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CardInfo {
        private String cardNumber;
        private String cardType;   // Centurion | Platinum | Gold
        private String status;     // Active | Inactive
    }
}
