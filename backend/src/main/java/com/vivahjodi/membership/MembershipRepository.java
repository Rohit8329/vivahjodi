package com.vivahjodi.membership;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MembershipRepository extends JpaRepository<Membership, UUID> {

    List<Membership> findByUserId(UUID userId);

    Optional<Membership> findTopByUserIdOrderByCreatedAtDesc(UUID userId);
}