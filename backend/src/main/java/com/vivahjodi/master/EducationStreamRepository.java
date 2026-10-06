package com.vivahjodi.master;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EducationStreamRepository
        extends JpaRepository<EducationStream, UUID> {

    List<EducationStream> findByActiveTrueOrderByDisplayOrderAsc();
}