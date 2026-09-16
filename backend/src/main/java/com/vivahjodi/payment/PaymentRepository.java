package com.vivahjodi.payment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    List<Payment> findByUserId(UUID userId);

    List<Payment> findByMembershipId(UUID membershipId);

    Optional<Payment> findTopByUserIdOrderByCreatedAtDesc(UUID userId);

    Optional<Payment> findByGatewayOrderId(String gatewayOrderId);
}