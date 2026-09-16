package com.vivahjodi.profile.education;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/profiles/me/education")
public class EducationController {

    private final EducationService educationService;

    public EducationController(
            EducationService educationService) {

        this.educationService = educationService;
    }

    @PostMapping
    public ResponseEntity<EducationDetailResponse> addEducation(
            Authentication authentication,
            @Valid @RequestBody EducationDetailRequest request) {

        EducationDetailResponse response =
                educationService.addEducation(
                        authentication.getName(),
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<EducationDetailResponse>> getMyEducation(
            Authentication authentication) {

        List<EducationDetailResponse> response =
                educationService.getMyEducation(
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{educationId}")
    public ResponseEntity<EducationDetailResponse> updateEducation(
            Authentication authentication,
            @PathVariable UUID educationId,
            @Valid @RequestBody EducationDetailRequest request) {

        EducationDetailResponse response =
                educationService.updateEducation(
                        authentication.getName(),
                        educationId,
                        request
                );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{educationId}")
    public ResponseEntity<Void> deleteEducation(
            Authentication authentication,
            @PathVariable UUID educationId) {

        educationService.deleteEducation(
                authentication.getName(),
                educationId
        );

        return ResponseEntity.noContent().build();
    }
}
