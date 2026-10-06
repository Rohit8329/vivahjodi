package com.vivahjodi.profile;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProfileRepository extends JpaRepository<Profile, UUID> {

    Optional<Profile> findByUserId(UUID userId);

    boolean existsByUserId(UUID userId);

    List<Profile> findByProfileStatusOrderBySubmittedAtAsc(
            String profileStatus
    );

    List<Profile> findByProfileStatusAndUser_RoleOrderBySubmittedAtAsc(
        String profileStatus,
        String role
    );
}