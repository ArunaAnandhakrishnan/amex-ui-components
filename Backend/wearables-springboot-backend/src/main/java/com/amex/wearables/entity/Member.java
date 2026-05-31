package com.amex.wearables.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_code", nullable = false, unique = true)
    private String clientCode;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Card> cards;
}