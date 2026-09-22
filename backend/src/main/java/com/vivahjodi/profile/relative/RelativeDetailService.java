package com.vivahjodi.profile.relative;

import com.vivahjodi.profile.Profile;
import com.vivahjodi.profile.ProfileRepository;
import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class RelativeDetailService {

    private final RelativeRepository relativeRepository;
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public RelativeDetailService(
            RelativeRepository relativeRepository,
            ProfileRepository profileRepository,
            UserRepository userRepository) {

        this.relativeRepository = relativeRepository;
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public RelativeDetailResponse addRelative(
            String email,
            RelativeDetailRequest request) {

        Profile profile = getMyProfile(email);

        Relative relative = new Relative();
        relative.setProfile(profile);

        applyRequest(relative, request);

        OffsetDateTime now = OffsetDateTime.now();
        relative.setCreatedAt(now);
        relative.setUpdatedAt(now);

        Relative saved = relativeRepository.save(relative);

        return toResponse(saved);
    }

    public List<RelativeDetailResponse> getMyRelatives(
            String email) {

        Profile profile = getMyProfile(email);

        return relativeRepository
                .findByProfileIdOrderByCreatedAtAsc(profile.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public RelativeDetailResponse updateRelative(
            String email,
            UUID relativeId,
            RelativeDetailRequest request) {

        Profile profile = getMyProfile(email);

        Relative relative = relativeRepository
                .findById(relativeId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Relative record not found"
                ));

        if (!relative.getProfile().getId().equals(profile.getId())) {
            throw new IllegalArgumentException(
                    "You are not allowed to modify this relative record"
            );
        }

        applyRequest(relative, request);
        relative.setUpdatedAt(OffsetDateTime.now());

        Relative updated = relativeRepository.save(relative);

        return toResponse(updated);
    }

    public void deleteRelative(
            String email,
            UUID relativeId) {

        Profile profile = getMyProfile(email);

        Relative relative = relativeRepository
                .findById(relativeId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Relative record not found"
                ));

        if (!relative.getProfile().getId().equals(profile.getId())) {
            throw new IllegalArgumentException(
                    "You are not allowed to delete this relative record"
            );
        }

        relativeRepository.delete(relative);
    }

    private void applyRequest(
            Relative relative,
            RelativeDetailRequest request) {

        relative.setName(
                normalizeOptional(request.getName())
        );

        relative.setRelation(
                normalizeOptional(request.getRelation())
        );

        relative.setSurname(
                normalizeOptional(request.getSurname())
        );

        relative.setCity(
                normalizeOptional(request.getCity())
        );

        relative.setOccupation(
                normalizeOptional(request.getOccupation())
        );

        relative.setLocation(
                normalizeOptional(request.getLocation())
        );

        relative.setNotes(
                normalizeOptional(request.getNotes())
        );

        relative.setContactVisible(
                request.getContactVisible() != null
                        ? request.getContactVisible()
                        : false
        );
    }

    private Profile getMyProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Authenticated user not found"
                ));

        return profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Profile not found for this account"
                ));
    }

    private RelativeDetailResponse toResponse(
            Relative relative) {

        RelativeDetailResponse response =
                new RelativeDetailResponse();

        response.setId(relative.getId());
        response.setProfileId(
                relative.getProfile().getId()
        );

        response.setName(relative.getName());
        response.setRelation(relative.getRelation());
        response.setSurname(relative.getSurname());
        response.setCity(relative.getCity());
        response.setOccupation(relative.getOccupation());
        response.setLocation(relative.getLocation());
        response.setNotes(relative.getNotes());
        response.setContactVisible(
                relative.getContactVisible()
        );

        response.setCreatedAt(
                relative.getCreatedAt()
        );

        response.setUpdatedAt(
                relative.getUpdatedAt()
        );

        return response;
    }

    private String normalizeOptional(String value) {

        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}