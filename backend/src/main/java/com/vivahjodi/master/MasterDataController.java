package com.vivahjodi.master;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/master")
public class MasterDataController {

    private final StateRepository stateRepository;
    private final DistrictRepository districtRepository;
    private final TalukaRepository talukaRepository;
    private final CityRepository cityRepository;

    public MasterDataController(
            StateRepository stateRepository,
            DistrictRepository districtRepository,
            TalukaRepository talukaRepository,
            CityRepository cityRepository
    ) {
        this.stateRepository = stateRepository;
        this.districtRepository = districtRepository;
        this.talukaRepository = talukaRepository;
        this.cityRepository = cityRepository;
    }

    @GetMapping("/states")
    public ResponseEntity<List<State>> getStates() {
        return ResponseEntity.ok(
                stateRepository.findByActiveTrueOrderByNameAsc()
        );
    }

    @GetMapping("/states/{stateId}/districts")
    public ResponseEntity<List<District>> getDistricts(
            @PathVariable UUID stateId
    ) {
        return ResponseEntity.ok(
                districtRepository
                        .findByStateIdAndActiveTrueOrderByNameAsc(stateId)
        );
    }

    @GetMapping("/districts/{districtId}/talukas")
    public ResponseEntity<List<Taluka>> getTalukas(
            @PathVariable UUID districtId
    ) {
        return ResponseEntity.ok(
                talukaRepository
                        .findByDistrictIdAndActiveTrueOrderByNameAsc(districtId)
        );
    }

    @GetMapping("/districts/{districtId}/cities")
    public ResponseEntity<List<City>> getCities(
            @PathVariable UUID districtId
    ) {
        return ResponseEntity.ok(
                cityRepository
                        .findByDistrictIdAndActiveTrueOrderByNameAsc(districtId)
        );
    }
}