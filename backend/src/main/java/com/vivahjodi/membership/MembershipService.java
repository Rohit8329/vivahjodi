package com.vivahjodi.membership;

import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Service
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final UserRepository userRepository;

    public MembershipService(
            MembershipRepository membershipRepository,
            UserRepository userRepository) {

        this.membershipRepository = membershipRepository;
        this.userRepository = userRepository;
    }

    public Membership createMembership(
            String email,
            String planCode) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Authenticated user not found"));

        MembershipPlan plan = getPlan(planCode);

        Membership membership = new Membership();

        membership.setUser(user);
        membership.setPlanCode(plan.code());
        membership.setPlanName(plan.name());
        membership.setAmountInr(plan.amountInr());
        membership.setMembershipStatus("PENDING_PAYMENT");

        OffsetDateTime now = OffsetDateTime.now();

        membership.setCreatedAt(now);
        membership.setUpdatedAt(now);

        return membershipRepository.save(membership);
    }

    public Membership getLatestMembership(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Authenticated user not found"));

        return membershipRepository
                .findTopByUserIdOrderByCreatedAtDesc(user.getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "No membership found for this account"));
    }

    private MembershipPlan getPlan(String planCode) {

        if (planCode == null || planCode.isBlank()) {
            throw new IllegalArgumentException(
                    "Membership plan is required");
        }

        return switch (planCode.trim().toUpperCase()) {

            case "BASIC_1_MONTH" ->
                    new MembershipPlan(
                            "BASIC_1_MONTH",
                            "Basic Membership - 1 Month",
                            new BigDecimal("499.00")
                    );

            default ->
                    throw new IllegalArgumentException(
                            "Invalid membership plan: " + planCode);
        };
    }

    private record MembershipPlan(
            String code,
            String name,
            BigDecimal amountInr
    ) {
    }
}