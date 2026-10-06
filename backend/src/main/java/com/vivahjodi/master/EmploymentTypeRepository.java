package com.vivahjodi.master;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EmploymentTypeRepository
        extends JpaRepository<EmploymentType, UUID> {

    List<EmploymentType> findByActiveTrueOrderByDisplayOrderAsc();
}