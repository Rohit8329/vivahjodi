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
    private final EducationLevelRepository educationLevelRepository;
    private final EducationStreamRepository educationStreamRepository;
    private final OccupationCategoryRepository occupationCategoryRepository;
    private final OccupationRepository occupationRepository;
    private final EmploymentTypeRepository employmentTypeRepository;
    private final EmploymentSectorRepository employmentSectorRepository;

    public MasterDataController(
            StateRepository stateRepository,
            DistrictRepository districtRepository,
            TalukaRepository talukaRepository,
            CityRepository cityRepository,
            EducationLevelRepository educationLevelRepository,
            EducationStreamRepository educationStreamRepository,
            OccupationCategoryRepository occupationCategoryRepository,
            OccupationRepository occupationRepository,
            EmploymentTypeRepository employmentTypeRepository,
            EmploymentSectorRepository employmentSectorRepository
    ) {
        this.stateRepository = stateRepository;
        this.districtRepository = districtRepository;
        this.talukaRepository = talukaRepository;
        this.cityRepository = cityRepository;
        this.educationLevelRepository = educationLevelRepository;
        this.educationStreamRepository = educationStreamRepository;
        this.occupationCategoryRepository = occupationCategoryRepository;
        this.occupationRepository = occupationRepository;
        this.employmentTypeRepository = employmentTypeRepository;
        this.employmentSectorRepository = employmentSectorRepository;
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
                districtRepository.findByStateIdAndActiveTrueOrderByNameAsc(
                        stateId
                )
        );
    }

    @GetMapping("/districts/{districtId}/talukas")
    public ResponseEntity<List<Taluka>> getTalukas(
            @PathVariable UUID districtId
    ) {
        return ResponseEntity.ok(
                talukaRepository.findByDistrictIdAndActiveTrueOrderByNameAsc(
                        districtId
                )
        );
    }

    @GetMapping("/talukas/{talukaId}/cities")
    public ResponseEntity<List<City>> getCities(
            @PathVariable UUID talukaId
    ) {
        return ResponseEntity.ok(
                cityRepository.findByTalukaIdAndActiveTrueOrderByNameAsc(
                        talukaId
                )
        );
    }

    @GetMapping("/education-levels")
    public ResponseEntity<List<EducationLevel>> getEducationLevels() {
        return ResponseEntity.ok(
                educationLevelRepository
                        .findByActiveTrueOrderByDisplayOrderAsc()
        );
    }

    @GetMapping("/education-streams")
    public ResponseEntity<List<EducationStream>> getEducationStreams() {
        return ResponseEntity.ok(
                educationStreamRepository
                        .findByActiveTrueOrderByDisplayOrderAsc()
        );
    }

    @GetMapping("/occupation-categories")
    public ResponseEntity<List<OccupationCategory>> getOccupationCategories() {
        return ResponseEntity.ok(
                occupationCategoryRepository
                        .findByActiveTrueOrderByDisplayOrderAsc()
        );
    }

    @GetMapping("/occupation-categories/{categoryId}/occupations")
    public ResponseEntity<List<Occupation>> getOccupations(
            @PathVariable UUID categoryId
    ) {
        return ResponseEntity.ok(
                occupationRepository
                        .findByCategoryIdAndActiveTrueOrderByDisplayOrderAsc(
                                categoryId
                        )
        );
    }


    @GetMapping("/occupations")
    public ResponseEntity<List<Occupation>> getAllOccupations() {
        return ResponseEntity.ok(
            occupationRepository
                    .findByActiveTrueOrderByDisplayOrderAsc()
        );
    }





    @GetMapping("/employment-types")
    public ResponseEntity<List<EmploymentType>> getEmploymentTypes() {
        return ResponseEntity.ok(
                employmentTypeRepository
                        .findByActiveTrueOrderByDisplayOrderAsc()
        );
    }

    @GetMapping("/employment-sectors")
    public ResponseEntity<List<EmploymentSector>> getEmploymentSectors() {
        return ResponseEntity.ok(
                employmentSectorRepository
                        .findByActiveTrueOrderByDisplayOrderAsc()
        );
    }
}