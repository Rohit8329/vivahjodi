package com.vivahjodi.profile.family;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface FamilyDetailRepository extends JpaRepository<FamilyDetail, UUID> {

    Optional<FamilyDetail> findByProfileId(UUID profileId);
}