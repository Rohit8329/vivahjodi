package com.vivahjodi.profile.relative;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RelativeRepository
        extends JpaRepository<Relative, UUID> {

    List<Relative> findByProfileIdOrderByCreatedAtAsc(
            UUID profileId
    );
}