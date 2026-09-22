package com.vivahjodi.profile;

import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class ProfilePhotoService {

    private final ProfileRepository profileRepository;
    private final ProfilePhotoRepository profilePhotoRepository;
    private final UserRepository userRepository;

    public ProfilePhotoService(
            ProfileRepository profileRepository,
            ProfilePhotoRepository profilePhotoRepository,
            UserRepository userRepository
    ) {
        this.profileRepository = profileRepository;
        this.profilePhotoRepository = profilePhotoRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ProfilePhotoResponse addPhoto(
            String email,
            ProfilePhotoRequest request
    ) {
        Profile profile = getProfileForUser(email);

        long photoCount =
                profilePhotoRepository.countByProfileId(profile.getId());

        if (photoCount >= 6) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "जास्तीत जास्त 6 फोटो अपलोड करता येतील."
            );
        }

        ProfilePhoto photo = new ProfilePhoto();

        photo.setProfile(profile);
        photo.setStoragePath(request.getStoragePath());
        photo.setOriginalFileName(request.getOriginalFileName());
        photo.setMimeType(request.getMimeType());

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
            photo.setDisplayOrder(request.getDisplayOrder());
        } else {
            photo.setDisplayOrder((int) photoCount);
        }

        photo.setStatus("ACTIVE");

        ProfilePhoto saved =
                profilePhotoRepository.save(photo);

        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<ProfilePhotoResponse> getMyPhotos(
            String email
    ) {
        Profile profile = getProfileForUser(email);

        return profilePhotoRepository
                .findByProfileIdOrderByDisplayOrderAsc(profile.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ProfilePhotoResponse updatePhoto(
            String email,
            UUID photoId,
            ProfilePhotoRequest request
    ) {
        Profile profile = getProfileForUser(email);

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
            photo.setStoragePath(request.getStoragePath());
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

    @Transactional
    public void deletePhoto(
            String email,
            UUID photoId
    ) {
        Profile profile = getProfileForUser(email);

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

        profilePhotoRepository.delete(photo);

        if (photo.isPrimary()) {
            List<ProfilePhoto> remainingPhotos =
                    profilePhotoRepository
                            .findByProfileIdOrderByDisplayOrderAsc(
                                    profile.getId()
                            );

            if (!remainingPhotos.isEmpty()) {
                ProfilePhoto newPrimary =
                        remainingPhotos.get(0);

                newPrimary.setPrimary(true);

                profilePhotoRepository.save(newPrimary);
            }
        }
    }

    @Transactional
    public ProfilePhotoResponse setPrimaryPhoto(
            String email,
            UUID photoId
    ) {
        Profile profile = getProfileForUser(email);

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

    private void clearPrimaryPhoto(UUID profileId) {
        profilePhotoRepository
                .findByProfileIdAndPrimaryTrue(profileId)
                .ifPresent(existingPrimary -> {
                    existingPrimary.setPrimary(false);
                    profilePhotoRepository.save(existingPrimary);
                });
    }

    private Profile getProfileForUser(String email) {

        User user = userRepository
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

    private ProfilePhotoResponse toResponse(
            ProfilePhoto photo
    ) {
        ProfilePhotoResponse response =
                new ProfilePhotoResponse();

        response.setId(photo.getId());
        response.setStoragePath(photo.getStoragePath());
        response.setOriginalFileName(
                photo.getOriginalFileName()
        );
        response.setMimeType(photo.getMimeType());
        response.setPrimary(photo.isPrimary());
        response.setDisplayOrder(
                photo.getDisplayOrder()
        );
        response.setStatus(photo.getStatus());
        response.setCreatedAt(
                photo.getCreatedAt()
        );
        response.setUpdatedAt(
                photo.getUpdatedAt()
        );

        return response;
    }
}