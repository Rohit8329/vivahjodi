package com.vivahjodi.profile;

import java.util.UUID;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<ProfileResponse> createProfile(
            Authentication authentication,
            @Valid @RequestBody ProfileRequest request) {

        ProfileResponse response = profileService.createProfile(
                authentication.getName(),
                request
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> getMyProfile(
            Authentication authentication) {

        ProfileResponse response = profileService.getMyProfile(
                authentication.getName()
        );

        return ResponseEntity.ok(response);
    }


    // =========================================================
// GET MEMBER PROFILE FOR VIEW
// =========================================================

@GetMapping("/{profileId}/view")
public ResponseEntity<ProfileViewResponse> getProfileView(
        Authentication authentication,
        @PathVariable UUID profileId) {

    if (profileService.hasFullProfileAccess(
            authentication.getName()
    )) {

        ProfileViewResponse response =
                profileService.getProfileView(profileId);

        return ResponseEntity.ok(response);
    }

    ProfileViewResponse response =
            profileService.getPublicProfileView(profileId);

    return ResponseEntity.ok(response);
}

@GetMapping("/public/{profileId}/view")
public ResponseEntity<ProfileViewResponse> getPublicProfileView(
        @PathVariable UUID profileId) {

    ProfileViewResponse response =
            profileService.getPublicProfileView(profileId);

    return ResponseEntity.ok(response);
}




    @PutMapping("/me")
    public ResponseEntity<ProfileResponse> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody ProfileRequest request) {

        ProfileResponse response = profileService.updateMyProfile(
                authentication.getName(),
                request
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/me/submit")
    public ResponseEntity<ProfileResponse> submitMyProfileForVerification(
            Authentication authentication) {

        ProfileResponse response =
                profileService.submitMyProfileForVerification(
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }
}