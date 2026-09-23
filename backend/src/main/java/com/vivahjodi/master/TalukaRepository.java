package com.vivahjodi.master;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TalukaRepository extends JpaRepository<Taluka, UUID> {

    List<Taluka> findByDistrictIdAndActiveTrueOrderByNameAsc(UUID districtId);
}