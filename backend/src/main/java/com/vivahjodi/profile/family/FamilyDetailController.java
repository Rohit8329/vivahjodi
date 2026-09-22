package com.vivahjodi.profile.family;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles/me/family")
public class FamilyDetailController {

    private final FamilyDetailService familyDetailService;

    public FamilyDetailController(
            FamilyDetailService familyDetailService) {

        this.familyDetailService = familyDetailService;
    }

    @PostMapping
    public ResponseEntity<FamilyDetailResponse> createOrUpdateFamily(
            Authentication authentication,
            @Valid @RequestBody FamilyDetailRequest request) {

        FamilyDetailResponse response =
                familyDetailService.createOrUpdateFamily(
                        authentication.getName(),
                        request
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<FamilyDetailResponse> getMyFamily(
            Authentication authentication) {

        FamilyDetailResponse response =
                familyDetailService.getMyFamily(
                        authentication.getName()
                );

        if (response == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMyFamily(
            Authentication authentication) {

        familyDetailService.deleteMyFamily(
                authentication.getName()
        );

        return ResponseEntity.noContent().build();
    }
}