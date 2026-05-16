package com.amex.wearables.repository;

import com.amex.wearables.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card>       findByMemberId(Long memberId);
    Optional<Card>   findByCardNumber(String cardNumber);
}