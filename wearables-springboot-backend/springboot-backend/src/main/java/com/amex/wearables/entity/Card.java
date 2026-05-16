package com.amex.wearables.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "cards")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "card_number", nullable = false)
    private String cardNumber;

    @Column(name = "card_type", nullable = false)
    private String cardType;

    @Column(name = "status", nullable = false)
    private String status;   // Active | Inactive

    @OneToMany(mappedBy = "card", fetch = FetchType.LAZY)
    private List<WearableDeviceEntity> devices;
}