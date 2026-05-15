package com.amex.wearables.service;

import com.amex.wearables.model.ClientWearableData;
import com.amex.wearables.model.WearableDevice;
import com.amex.wearables.model.WearableIssuanceRequest;
import com.amex.wearables.model.entity.CardEntity;
import com.amex.wearables.model.entity.MemberEntity;
import com.amex.wearables.model.entity.WearableDeviceEntity;
import com.amex.wearables.repository.CardRepository;
import com.amex.wearables.repository.MemberRepository;
import com.amex.wearables.repository.WearableDeviceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WearablesService {

    private static final DateTimeFormatter DATE_FMT =
            DateTimeFormatter.ofPattern("dd MMM yyyy");

    private final MemberRepository         memberRepository;
    private final CardRepository           cardRepository;
    private final WearableDeviceRepository deviceRepository;

    @Transactional(readOnly = true)
    public ClientWearableData getClientData(String clientCode) {
        MemberEntity member = memberRepository.findByClientCode(clientCode)
                .orElse(null);

        if (member == null) {
            return ClientWearableData.builder()
                    .clientCode(clientCode)
                    .memberName("Unknown Member")
                    .cards(List.of())
                    .build();
        }

        List<ClientWearableData.CardInfo> cards = cardRepository
                .findByMember_ClientCode(clientCode)
                .stream()
                .map(c -> new ClientWearableData.CardInfo(
                        c.getCardNumber(), c.getCardType(), c.getStatus()))
                .toList();

        return ClientWearableData.builder()
                .clientCode(clientCode)
                .memberName(member.getMemberName())
                .cards(cards)
                .build();
    }

    @Transactional(readOnly = true)
    public List<WearableDevice> getDevicesForCard(String cardNumber) {
        return deviceRepository.findByCard_CardNumber(cardNumber)
                .stream()
                .map(this::toDeviceDto)
                .toList();
    }

    @Transactional
    public WearableDevice issueWearable(WearableIssuanceRequest request) {
        CardEntity card = cardRepository.findByCardNumber(request.getSelectedCard())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Card not found: " + request.getSelectedCard()));

        String typeLabel = switch (request.getWearableType().toLowerCase()) {
            case "bracelet" -> "Bracelet";
            case "band"     -> "Band";
            case "ring"     -> "Ring";
            default         -> request.getWearableType();
        };

        WearableDeviceEntity saved = deviceRepository.save(
                WearableDeviceEntity.builder()
                        .card(card)
                        .deviceType(typeLabel)
                        .status("Issued")
                        .issueDate(LocalDate.now())
                        .serialNo("SN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                        .nfcEnabled(true)
                        .build()
        );

        return toDeviceDto(saved);
    }

    private WearableDevice toDeviceDto(WearableDeviceEntity e) {
        return WearableDevice.builder()
                .deviceType(e.getDeviceType())
                .status(e.getStatus())
                .cardLinked(e.getCard().getCardNumber())
                .issueDate(e.getIssueDate().format(DATE_FMT))
                .serialNo(e.getSerialNo())
                .nfcEnabled(e.isNfcEnabled())
                .build();
    }
}