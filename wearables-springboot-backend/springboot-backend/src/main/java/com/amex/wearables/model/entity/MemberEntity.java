package com.amex.wearables.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "members")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class MemberEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_code", nullable = false, unique = true, length = 20)
    private String clientCode;

    @Column(name = "member_name", nullable = false, length = 100)
    private String memberName;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private List<CardEntity> cards;
}