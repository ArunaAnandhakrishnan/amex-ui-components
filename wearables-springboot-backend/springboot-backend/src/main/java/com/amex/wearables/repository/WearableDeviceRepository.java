package com.amex.wearables.repository;

import com.amex.wearables.model.entity.WearableDeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WearableDeviceRepository extends JpaRepository<WearableDeviceEntity, Long> {
    List<WearableDeviceEntity> findByCard_CardNumber(String cardNumber);
}