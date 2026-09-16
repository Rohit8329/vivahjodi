package com.vivahjodi.membership;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/memberships")
public class MembershipController {

    private final MembershipService membershipService;

    public MembershipController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    @PostMapping
    public ResponseEntity<MembershipResponse> createMembership(
            Authentication authentication,
            @Valid @RequestBody MembershipRequest request) {

        Membership membership = membershipService.createMembership(
                authentication.getName(),
                request.planCode()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(toResponse(membership));
    }

    @GetMapping("/me")
    public ResponseEntity<MembershipResponse> getMyMembership(
            Authentication authentication) {

        Membership membership =
                membershipService.getLatestMembership(
                        authentication.getName()
                );

        return ResponseEntity.ok(toResponse(membership));
    }

    private MembershipResponse toResponse(Membership membership) {

        return new MembershipResponse(
                membership.getId(),
                membership.getUser().getId(),
                membership.getPlanCode(),
                membership.getPlanName(),
                membership.getAmountInr(),
                membership.getMembershipStatus(),
                membership.getStartedAt(),
                membership.getExpiresAt(),
                membership.getCreatedAt(),
                membership.getUpdatedAt()
        );
    }

    public record MembershipRequest(

            @NotBlank(message = "Plan code is required")
            String planCode

    ) {
    }

    public record MembershipResponse(

            UUID id,
            UUID userId,
            String planCode,
            String planName,
            BigDecimal amountInr,
            String membershipStatus,
            OffsetDateTime startedAt,
            OffsetDateTime expiresAt,
            OffsetDateTime createdAt,
            OffsetDateTime updatedAt
    ) {
    }
}