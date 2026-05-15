package com.amex.wearables.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "wearable_devices")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class WearableDeviceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", nullable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private CardEntity card;

    @Column(name = "device_type", nullable = false, length = 20)
    private String deviceType;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    @Column(name = "serial_no", nullable = false, unique = true, length = 50)
    private String serialNo;

    @Column(name = "nfc_enabled", nullable = false)
    private boolean nfcEnabled;
}