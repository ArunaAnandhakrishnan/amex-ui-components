package com.amex.wearables.repository;

import com.amex.wearables.entity.WearableDeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface WearableDeviceRepository extends JpaRepository<WearableDeviceEntity, Long> {
    List<WearableDeviceEntity>   findByCardId(Long cardId);
    Optional<WearableDeviceEntity> findBySerialNo(String serialNo);

    /** Check if an active wearable of same type already exists on this card */
    boolean existsByCardIdAndDeviceTypeAndStatus(Long cardId, String deviceType, String status);
}