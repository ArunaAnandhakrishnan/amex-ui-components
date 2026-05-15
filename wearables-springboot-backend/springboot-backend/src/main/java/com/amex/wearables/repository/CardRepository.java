package com.amex.wearables.repository;

import com.amex.wearables.model.entity.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<CardEntity, Long> {
    List<CardEntity>       findByMember_ClientCode(String clientCode);
    Optional<CardEntity>   findByCardNumber(String cardNumber);
}