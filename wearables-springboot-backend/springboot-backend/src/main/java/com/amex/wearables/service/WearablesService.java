package com.amex.wearables.service;

import com.amex.wearables.entity.Card;
import com.amex.wearables.entity.Member;
import com.amex.wearables.entity.WearableDeviceEntity;
import com.amex.wearables.model.ClientWearableData;
import com.amex.wearables.model.WearableActionRequest;
import com.amex.wearables.model.WearableDevice;
import com.amex.wearables.model.WearableIssuanceRequest;
import com.amex.wearables.repository.CardRepository;
import com.amex.wearables.repository.MemberRepository;
import com.amex.wearables.repository.WearableDeviceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WearablesService {

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("dd MMM yyyy");

    private final MemberRepository         memberRepo;
    private final CardRepository           cardRepo;
    private final WearableDeviceRepository deviceRepo;

    // ── GET /api/wearables/client/{clientCode} ────────────────────────────────
    public ClientWearableData getClientData(String clientCode) {
        Member member = memberRepo.findByClientCode(clientCode)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No member found for client code: " + clientCode));

        List<Card> cards = cardRepo.findByMemberId(member.getId());

        List<ClientWearableData.CardInfo> cardInfos = cards.stream()
                .map(c -> new ClientWearableData.CardInfo(
                        c.getCardNumber(), c.getCardType(), c.getStatus()))
                .toList();

        return ClientWearableData.builder()
                .clientCode(clientCode)
                .memberName(member.getFullName())
                .cards(cardInfos)
                .build();
    }

    // ── GET /api/wearables/devices/{cardNumber} ───────────────────────────────
    public List<WearableDevice> getDevicesForCard(String cardNumber) {
        Card card = cardRepo.findByCardNumber(cardNumber)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Card not found: " + cardNumber));

        return deviceRepo.findByCardId(card.getId())
                .stream()
                .map(this::toDto)
                .toList();
    }

    // ── POST /api/wearables/issue ─────────────────────────────────────────────
    @Transactional
    public WearableDevice issueWearable(WearableIssuanceRequest request) {

        // 1. Resolve card
        Card card = cardRepo.findByCardNumber(request.getSelectedCard())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Card not found: " + request.getSelectedCard()));

        // 2. Card must be Active
        if (!"Active".equalsIgnoreCase(card.getStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Cannot issue a wearable to an inactive card (" + card.getCardNumber() + ").");
        }

        // 3. Resolve the friendly device type label
        String deviceType = resolveDeviceType(request.getWearableType());

        // 4. No duplicate active wearable of same type on this card
        boolean alreadyExists = deviceRepo.existsByCardIdAndDeviceTypeAndStatus(
                card.getId(), deviceType, "Issued");
        if (alreadyExists) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "An active " + deviceType + " is already issued on card " + card.getCardNumber() + ".");
        }

        // 5. Create and persist
        WearableDeviceEntity entity = new WearableDeviceEntity();
        entity.setCard(card);
        entity.setSerialNo("SN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        entity.setDeviceType(deviceType);
        entity.setColorSelected(request.getColorSelected());
        entity.setWearableName(request.getWearableName());
        entity.setStatus("Issued");
        entity.setNfcEnabled(true);
        entity.setIssueDate(LocalDate.now().format(DATE_FMT));

        WearableDeviceEntity saved = deviceRepo.save(entity);
        return toDto(saved);
    }

    // ── POST /api/wearables/action/{serialNo} ─────────────────────────────────
    @Transactional
    public WearableDevice performAction(String serialNo, WearableActionRequest request) {

        WearableDeviceEntity entity = deviceRepo.findBySerialNo(serialNo)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Wearable not found: " + serialNo));

        String action = request.getAction().toUpperCase();

        switch (action) {
            case "SUSPEND" -> {
                if ("Terminated".equals(entity.getStatus()))
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot suspend a terminated wearable.");
                entity.setStatus("Suspended");
                entity.setNfcEnabled(false);
            }
            case "ACTIVATE" -> {
                if ("Terminated".equals(entity.getStatus()))
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot activate a terminated wearable.");
                entity.setStatus("Issued");
                entity.setNfcEnabled(true);
            }
            case "TERMINATE" -> {
                entity.setStatus("Terminated");
                entity.setNfcEnabled(false);
            }
            default -> throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Unknown action: " + request.getAction() + ". Allowed: SUSPEND, ACTIVATE, TERMINATE");
        }

        return toDto(deviceRepo.save(entity));
    }

    // ── helpers ───────────────────────────────────────────────────────────────

    private String resolveDeviceType(String raw) {
        if (raw == null) return "Watch";
        return switch (raw.toLowerCase()) {
            case "watch"         -> "Leather Watch";
            case "band"          -> "Sport Band";
            case "ring"          -> "Ceramic Ring";
            case "leather watch" -> "Leather Watch";
            case "sport band"    -> "Sport Band";
            case "ceramic ring"  -> "Ceramic Ring";
            case "sport watch"   -> "Sport Watch";
            case "silicone band" -> "Silicone Band";
            case "titanium ring" -> "Titanium Ring";
            default              -> raw;
        };
    }

    private WearableDevice toDto(WearableDeviceEntity e) {
        return WearableDevice.builder()
                .deviceType(e.getDeviceType())
                .status(e.getStatus())
                .cardLinked(e.getCard().getCardNumber())
                .issueDate(e.getIssueDate())
                .serialNo(e.getSerialNo())
                .nfcEnabled(e.isNfcEnabled())
                .build();
    }
}