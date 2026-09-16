package com.vivahjodi.profile.education;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EducationDetailRepository
        extends JpaRepository<EducationDetail, UUID> {

    List<EducationDetail> findByProfileIdOrderByCreatedAtAsc(UUID profileId);
}
