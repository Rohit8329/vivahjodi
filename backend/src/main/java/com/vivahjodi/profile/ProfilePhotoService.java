package com.vivahjodi.profile;

import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.vivahjodi.profile.review.ProfileReviewSnapshotService;

import java.util.List;
import java.util.UUID;

@Service
public class ProfilePhotoService {

    private final ProfileRepository profileRepository;
    private final ProfilePhotoRepository profilePhotoRepository;
    private final UserRepository userRepository;
    private final SupabaseStorageService supabaseStorageService;
    private final ProfileReviewSnapshotService profileReviewSnapshotService;

    public ProfilePhotoService(
            ProfileRepository profileRepository,
            ProfilePhotoRepository profilePhotoRepository,
            UserRepository userRepository,
            SupabaseStorageService supabaseStorageService,
            ProfileReviewSnapshotService profileReviewSnapshotService
    ) {
        this.profileRepository = profileRepository;
        this.profilePhotoRepository = profilePhotoRepository;
        this.userRepository = userRepository;
        this.supabaseStorageService = supabaseStorageService;
        this.profileReviewSnapshotService = profileReviewSnapshotService;
    }

    /**
     * Upload a real image file to Supabase Storage
     * and create the corresponding profile_photos database record.
     */
    @Transactional
    public ProfilePhotoResponse uploadPhoto(
            String email,
            MultipartFile file,
            Boolean primary,
            Integer displayOrder
    ) {
        Profile profile = getProfileForUser(email);
        profileReviewSnapshotService.captureBeforeChange(profile);

        long photoCount =
                profilePhotoRepository.countByProfileId(
                        profile.getId()
                );

        if (photoCount >= 6) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "जास्तीत जास्त 6 फोटो अपलोड करता येतील."
            );
        }

        /*
         * Upload the actual file to Supabase Storage.
         * This returns the generated storage path.
         */
        String storagePath =
                supabaseStorageService.uploadProfilePhoto(
                        profile.getId(),
                        file
                );

        ProfilePhoto photo = new ProfilePhoto();

        photo.setProfile(profile);
        photo.setStoragePath(storagePath);

        photo.setOriginalFileName(
                file.getOriginalFilename()
        );

        photo.setMimeType(
                file.getContentType()
        );

        /*
         * If the caller explicitly requested primary=true,
         * make this photo primary.
         *
         * The first uploaded photo is automatically primary
         * even if primary was not supplied.
         */
        boolean makePrimary =
                Boolean.TRUE.equals(primary);

        if (photoCount == 0) {
            makePrimary = true;
        }

        if (makePrimary) {
            clearPrimaryPhoto(profile.getId());
        }

        photo.setPrimary(makePrimary);

        /*
         * Use the requested display order if supplied.
         * Otherwise append the photo after existing photos.
         */
        if (displayOrder != null) {
            photo.setDisplayOrder(displayOrder);
        } else {
            photo.setDisplayOrder((int) photoCount);
        }

        photo.setStatus("ACTIVE");

        ProfilePhoto saved =
                profilePhotoRepository.save(photo);

        return toResponse(saved);
    }

    /**
     * Existing JSON-based photo metadata creation method.
     */
    @Transactional
    public ProfilePhotoResponse addPhoto(
            String email,
            ProfilePhotoRequest request
    ) {
        Profile profile = getProfileForUser(email);
        profileReviewSnapshotService.captureBeforeChange(profile);

        long photoCount =
                profilePhotoRepository.countByProfileId(
                        profile.getId()
                );

        if (photoCount >= 6) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "जास्तीत जास्त 6 फोटो अपलोड करता येतील."
            );
        }

        ProfilePhoto photo = new ProfilePhoto();

        photo.setProfile(profile);
        photo.setStoragePath(request.getStoragePath());
        photo.setOriginalFileName(
                request.getOriginalFileName()
        );
        photo.setMimeType(
                request.getMimeType()
        );

        boolean makePrimary =
                Boolean.TRUE.equals(request.getPrimary());

        if (photoCount == 0) {
            makePrimary = true;
        }

        if (makePrimary) {
            clearPrimaryPhoto(profile.getId());
        }

        photo.setPrimary(makePrimary);

        if (request.getDisplayOrder() != null) {
            photo.setDisplayOrder(
                    request.getDisplayOrder()
            );
        } else {
            photo.setDisplayOrder((int) photoCount);
        }

        photo.setStatus("ACTIVE");

        ProfilePhoto saved =
                profilePhotoRepository.save(photo);

        return toResponse(saved);
    }

    /**
     * Get all photos belonging to the logged-in user's profile.
     */
    @Transactional(readOnly = true)
    public List<ProfilePhotoResponse> getMyPhotos(
            String email
    ) {
        Profile profile = getProfileForUser(email);

        return profilePhotoRepository
                .findByProfileIdOrderByDisplayOrderAsc(
                        profile.getId()
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
        public List<ProfileViewPhotoResponse> getPhotosForProfile(UUID profileId) {

        return profilePhotoRepository
                .findByProfileIdAndStatusOrderByDisplayOrderAsc(
                        profileId,
                        "ACTIVE"
                )
                .stream()
                .map(this::toViewResponse)
                .toList();
        }

    /**
     * Update photo metadata.
     */
    @Transactional
    public ProfilePhotoResponse updatePhoto(
            String email,
            UUID photoId,
            ProfilePhotoRequest request
    ) {
        Profile profile = getProfileForUser(email);
        profileReviewSnapshotService.captureBeforeChange(profile);

        ProfilePhoto photo =
                profilePhotoRepository
                        .findByIdAndProfileId(
                                photoId,
                                profile.getId()
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "फोटो सापडला नाही."
                                )
                        );

        if (request.getStoragePath() != null
                && !request.getStoragePath().isBlank()) {

            photo.setStoragePath(
                    request.getStoragePath()
            );
        }

        if (request.getOriginalFileName() != null) {
            photo.setOriginalFileName(
                    request.getOriginalFileName()
            );
        }

        if (request.getMimeType() != null) {
            photo.setMimeType(
                    request.getMimeType()
            );
        }

        if (request.getDisplayOrder() != null) {
            photo.setDisplayOrder(
                    request.getDisplayOrder()
            );
        }

        if (Boolean.TRUE.equals(request.getPrimary())) {
            clearPrimaryPhoto(profile.getId());
            photo.setPrimary(true);
        }

        ProfilePhoto saved =
                profilePhotoRepository.save(photo);

        return toResponse(saved);
    }

    /**
     * Delete a photo database record.
     */
    @Transactional
    public void deletePhoto(
            String email,
            UUID photoId
    ) {
        Profile profile = getProfileForUser(email);
        profileReviewSnapshotService.captureBeforeChange(profile);

        ProfilePhoto photo =
                profilePhotoRepository
                        .findByIdAndProfileId(
                                photoId,
                                profile.getId()
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "फोटो सापडला नाही."
                                )
                        );

        boolean wasPrimary = photo.isPrimary();

        String storagePath = photo.getStoragePath();

        supabaseStorageService.deleteProfilePhoto(
                storagePath
        );

        profilePhotoRepository.delete(photo);

        /*
         * If the deleted photo was primary,
         * automatically make the first remaining photo primary.
         */
        if (wasPrimary) {

            List<ProfilePhoto> remainingPhotos =
                    profilePhotoRepository
                            .findByProfileIdOrderByDisplayOrderAsc(
                                    profile.getId()
                            );

            if (!remainingPhotos.isEmpty()) {

                ProfilePhoto newPrimary =
                        remainingPhotos.get(0);

                newPrimary.setPrimary(true);

                profilePhotoRepository.save(
                        newPrimary
                );
            }
        }
    }

    /**
     * Make a specific photo the primary profile photo.
     */
    @Transactional
    public ProfilePhotoResponse setPrimaryPhoto(
            String email,
            UUID photoId
    ) {
        Profile profile = getProfileForUser(email);
        profileReviewSnapshotService.captureBeforeChange(profile);

        ProfilePhoto photo =
                profilePhotoRepository
                        .findByIdAndProfileId(
                                photoId,
                                profile.getId()
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "फोटो सापडला नाही."
                                )
                        );

        clearPrimaryPhoto(profile.getId());

        photo.setPrimary(true);

        ProfilePhoto saved =
                profilePhotoRepository.save(photo);

        return toResponse(saved);
    }

    /**
     * Clear the current primary photo for a profile.
     */
    private void clearPrimaryPhoto(
            UUID profileId
    ) {
        profilePhotoRepository
                .findByProfileIdAndPrimaryTrue(
                        profileId
                )
                .ifPresent(existingPrimary -> {

                    existingPrimary.setPrimary(false);

                    profilePhotoRepository.save(
                            existingPrimary
                    );
                });
    }

    /**
     * Find the profile belonging to the authenticated user.
     */
    private Profile getProfileForUser(
            String email
    ) {
        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "वापरकर्ता सापडला नाही."
                                )
                        );

        return profileRepository
                .findByUserId(user.getId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "प्रोफाइल सापडले नाही. आधी प्रोफाइल तयार करा."
                        )
                );
    }

    /**
     * Convert ProfilePhoto entity to API response.
     */
    private ProfilePhotoResponse toResponse(
            ProfilePhoto photo
    ) {
        ProfilePhotoResponse response =
                new ProfilePhotoResponse();

        response.setId(photo.getId());

        response.setStoragePath(
                photo.getStoragePath()
        );

        if (photo.getStoragePath() != null
                && !photo.getStoragePath().isBlank()) {

                response.setPhotoUrl(
                        supabaseStorageService.createSignedUrl(
                                photo.getStoragePath()
                        )
                );
                }




        response.setOriginalFileName(
                photo.getOriginalFileName()
        );

        response.setMimeType(
                photo.getMimeType()
        );

        response.setPrimary(
                photo.isPrimary()
        );

        response.setDisplayOrder(
                photo.getDisplayOrder()
        );

        response.setStatus(
                photo.getStatus()
        );

        response.setCreatedAt(
                photo.getCreatedAt()
        );

        response.setUpdatedAt(
                photo.getUpdatedAt()
        );

        return response;
    }



        private ProfileViewPhotoResponse toViewResponse(ProfilePhoto photo) {

    ProfileViewPhotoResponse response =
            new ProfileViewPhotoResponse();

    response.setId(photo.getId());
    response.setOriginalFileName(
            photo.getOriginalFileName()
    );
    response.setMimeType(photo.getMimeType());
    response.setPrimary(photo.isPrimary());
    response.setDisplayOrder(photo.getDisplayOrder());

    if (photo.getStoragePath() != null
            && !photo.getStoragePath().isBlank()) {

        response.setPhotoUrl(
                supabaseStorageService.createSignedUrl(
                        photo.getStoragePath()
                )
        );
    }

    response.setCreatedAt(photo.getCreatedAt());

    return response;
}

}