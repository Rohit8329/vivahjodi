package com.vivahjodi.profile.review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProfileReviewSnapshotRepository
        extends JpaRepository<ProfileReviewSnapshot, UUID> {

    Optional<ProfileReviewSnapshot> findByProfileId(UUID profileId);
}
