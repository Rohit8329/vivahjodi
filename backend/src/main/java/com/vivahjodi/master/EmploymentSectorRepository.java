package com.vivahjodi.master;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EmploymentSectorRepository
        extends JpaRepository<EmploymentSector, UUID> {

    List<EmploymentSector> findByActiveTrueOrderByDisplayOrderAsc();
}