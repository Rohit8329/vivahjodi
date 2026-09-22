package com.vivahjodi.profile;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/profiles/me/photos")
public class ProfilePhotoController {

    private final ProfilePhotoService profilePhotoService;

    public ProfilePhotoController(
            ProfilePhotoService profilePhotoService
    ) {
        this.profilePhotoService = profilePhotoService;
    }

    @PostMapping
    public ResponseEntity<ProfilePhotoResponse> addPhoto(
            Authentication authentication,
            @Valid @RequestBody ProfilePhotoRequest request
    ) {
        ProfilePhotoResponse response =
                profilePhotoService.addPhoto(
                        authentication.getName(),
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProfilePhotoResponse>> getMyPhotos(
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                profilePhotoService.getMyPhotos(
                        authentication.getName()
                )
        );
    }

    @PutMapping("/{photoId}")
    public ResponseEntity<ProfilePhotoResponse> updatePhoto(
            Authentication authentication,
            @PathVariable UUID photoId,
            @Valid @RequestBody ProfilePhotoRequest request
    ) {
        return ResponseEntity.ok(
                profilePhotoService.updatePhoto(
                        authentication.getName(),
                        photoId,
                        request
                )
        );
    }

    @PutMapping("/{photoId}/primary")
    public ResponseEntity<ProfilePhotoResponse> setPrimaryPhoto(
            Authentication authentication,
            @PathVariable UUID photoId
    ) {
        return ResponseEntity.ok(
                profilePhotoService.setPrimaryPhoto(
                        authentication.getName(),
                        photoId
                )
        );
    }

    @DeleteMapping("/{photoId}")
    public ResponseEntity<Void> deletePhoto(
            Authentication authentication,
            @PathVariable UUID photoId
    ) {
        profilePhotoService.deletePhoto(
                authentication.getName(),
                photoId
        );

        return ResponseEntity.noContent().build();
    }
}