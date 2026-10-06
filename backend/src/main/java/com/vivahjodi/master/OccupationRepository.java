package com.vivahjodi.master;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OccupationRepository
        extends JpaRepository<Occupation, UUID> {

    List<Occupation> findByCategoryIdAndActiveTrueOrderByDisplayOrderAsc(
            UUID categoryId
    );

    List<Occupation> findByActiveTrueOrderByDisplayOrderAsc();
}