package com.vivahjodi.profile;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProfilePhotoRepository
        extends JpaRepository<ProfilePhoto, UUID> {

    List<ProfilePhoto> findByProfileIdOrderByDisplayOrderAsc(UUID profileId);

    Optional<ProfilePhoto> findByIdAndProfileId(
            UUID id,
            UUID profileId
    );

    Optional<ProfilePhoto> findByProfileIdAndPrimaryTrue(
            UUID profileId
    );

    long countByProfileId(UUID profileId);
}
