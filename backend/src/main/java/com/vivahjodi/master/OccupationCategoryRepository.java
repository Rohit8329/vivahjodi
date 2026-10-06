package com.vivahjodi.master;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OccupationCategoryRepository
        extends JpaRepository<OccupationCategory, UUID> {

    List<OccupationCategory> findByActiveTrueOrderByDisplayOrderAsc();
}