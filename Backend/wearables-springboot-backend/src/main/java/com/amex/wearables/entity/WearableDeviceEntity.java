package com.amex.wearables.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "wearable_devices")
public class WearableDeviceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", nullable = false)
    private Card card;

    @Column(name = "serial_no",      nullable = false, unique = true)
    private String serialNo;

    @Column(name = "device_type",    nullable = false)
    private String deviceType;

    @Column(name = "color_selected")
    private String colorSelected;

    @Column(name = "wearable_name")
    private String wearableName;

    @Column(name = "status",         nullable = false)
    private String status;          // Issued | Suspended | Terminated

    @Column(name = "nfc_enabled",    nullable = false)
    private boolean nfcEnabled;

    @Column(name = "issue_date",     nullable = false)
    private String issueDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    void prePersist() { this.createdAt = LocalDateTime.now(); }
}