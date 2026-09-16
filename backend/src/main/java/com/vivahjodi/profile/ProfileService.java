package com.vivahjodi.profile;

import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository,
                          UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    // =========================================================
    // CREATE PROFILE
    // =========================================================

    public ProfileResponse createProfile(String email, ProfileRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Authenticated user not found"));

        if (profileRepository.existsByUserId(user.getId())) {
            throw new IllegalArgumentException(
                    "A profile already exists for this account");
        }

        Profile profile = new Profile();

        profile.setUser(user);

        // -----------------------------------------------------
        // BASIC INFORMATION
        // -----------------------------------------------------

        profile.setFirstName(request.getFirstName().trim());
        profile.setMiddleName(normalizeOptional(request.getMiddleName()));
        profile.setLastName(request.getLastName().trim());
        profile.setGender(request.getGender().trim());
        profile.setDateOfBirth(request.getDateOfBirth());

        String maritalStatus =
                normalizeOptional(request.getMaritalStatus());

        profile.setMaritalStatus(
                maritalStatus == null
                        ? "NEVER_MARRIED"
                        : maritalStatus
        );

        profile.setHeightCm(request.getHeightCm());
        profile.setWeightKg(request.getWeightKg());
        profile.setMotherTongue(
                normalizeOptional(request.getMotherTongue())
        );

        // -----------------------------------------------------
        // RELIGION / COMMUNITY
        // -----------------------------------------------------

        profile.setReligion(
                normalizeOptional(request.getReligion())
        );

        profile.setCaste(
                normalizeOptional(request.getCaste())
        );

        profile.setSubCaste(
                normalizeOptional(request.getSubCaste())
        );

        profile.setGotra(
                normalizeOptional(request.getGotra())
        );

        profile.setZodiacSign(
                normalizeOptional(request.getZodiacSign())
        );

        profile.setNakshatra(
                normalizeOptional(request.getNakshatra())
        );

        profile.setManglikStatus(
                normalizeOptional(request.getManglikStatus())
        );

        // -----------------------------------------------------
        // LOCATION
        // -----------------------------------------------------

        profile.setNativePlace(
                normalizeOptional(request.getNativePlace())
        );

        profile.setState(
                normalizeOptional(request.getState())
        );

        profile.setDistrict(
                normalizeOptional(request.getDistrict())
        );

        profile.setTaluka(
                normalizeOptional(request.getTaluka())
        );

        profile.setCity(
                normalizeOptional(request.getCity())
        );

        // -----------------------------------------------------
        // ABOUT ME
        // -----------------------------------------------------

        profile.setAboutMe(
                normalizeOptional(request.getAboutMe())
        );

        // -----------------------------------------------------
        // PROFILE STATUS
        // -----------------------------------------------------

        profile.setProfileStatus("DRAFT");

        OffsetDateTime now = OffsetDateTime.now();

        profile.setCreatedAt(now);
        profile.setUpdatedAt(now);

        Profile savedProfile =
                profileRepository.save(profile);

        return toResponse(savedProfile);
    }


    // =========================================================
    // GET MY PROFILE
    // =========================================================

    public ProfileResponse getMyProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Authenticated user not found"));

        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Profile not found for this account"));

        return toResponse(profile);
    }


    // =========================================================
    // UPDATE MY PROFILE
    // =========================================================

    public ProfileResponse updateMyProfile(
            String email,
            ProfileRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Authenticated user not found"));

        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Profile not found for this account"));

        // -----------------------------------------------------
        // BASIC INFORMATION
        // -----------------------------------------------------

        profile.setFirstName(request.getFirstName().trim());
        profile.setMiddleName(
                normalizeOptional(request.getMiddleName())
        );

        profile.setLastName(request.getLastName().trim());
        profile.setGender(request.getGender().trim());
        profile.setDateOfBirth(request.getDateOfBirth());

        String maritalStatus =
                normalizeOptional(request.getMaritalStatus());

        profile.setMaritalStatus(
                maritalStatus == null
                        ? "NEVER_MARRIED"
                        : maritalStatus
        );

        profile.setHeightCm(request.getHeightCm());
        profile.setWeightKg(request.getWeightKg());

        profile.setMotherTongue(
                normalizeOptional(request.getMotherTongue())
        );

        // -----------------------------------------------------
        // RELIGION / COMMUNITY
        // -----------------------------------------------------

        profile.setReligion(
                normalizeOptional(request.getReligion())
        );

        profile.setCaste(
                normalizeOptional(request.getCaste())
        );

        profile.setSubCaste(
                normalizeOptional(request.getSubCaste())
        );

        profile.setGotra(
                normalizeOptional(request.getGotra())
        );

        profile.setZodiacSign(
                normalizeOptional(request.getZodiacSign())
        );

        profile.setNakshatra(
                normalizeOptional(request.getNakshatra())
        );

        profile.setManglikStatus(
                normalizeOptional(request.getManglikStatus())
        );

        // -----------------------------------------------------
        // LOCATION
        // -----------------------------------------------------

        profile.setNativePlace(
                normalizeOptional(request.getNativePlace())
        );

        profile.setState(
                normalizeOptional(request.getState())
        );

        profile.setDistrict(
                normalizeOptional(request.getDistrict())
        );

        profile.setTaluka(
                normalizeOptional(request.getTaluka())
        );

        profile.setCity(
                normalizeOptional(request.getCity())
        );

        // -----------------------------------------------------
        // ABOUT ME
        // -----------------------------------------------------

        profile.setAboutMe(
                normalizeOptional(request.getAboutMe())
        );

        profile.setUpdatedAt(OffsetDateTime.now());

        Profile updatedProfile =
                profileRepository.save(profile);

        return toResponse(updatedProfile);
    }


    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private ProfileResponse toResponse(Profile profile) {

        ProfileResponse response = new ProfileResponse();

        response.setId(profile.getId());
        response.setUserId(profile.getUser().getId());

        // -----------------------------------------------------
        // BASIC INFORMATION
        // -----------------------------------------------------

        response.setFirstName(profile.getFirstName());
        response.setMiddleName(profile.getMiddleName());
        response.setLastName(profile.getLastName());

        response.setGender(profile.getGender());
        response.setDateOfBirth(profile.getDateOfBirth());
        response.setMaritalStatus(profile.getMaritalStatus());

        response.setHeightCm(profile.getHeightCm());
        response.setWeightKg(profile.getWeightKg());
        response.setMotherTongue(profile.getMotherTongue());

        // -----------------------------------------------------
        // RELIGION / COMMUNITY
        // -----------------------------------------------------

        response.setReligion(profile.getReligion());
        response.setCaste(profile.getCaste());
        response.setSubCaste(profile.getSubCaste());

        response.setGotra(profile.getGotra());
        response.setZodiacSign(profile.getZodiacSign());
        response.setNakshatra(profile.getNakshatra());
        response.setManglikStatus(profile.getManglikStatus());

        // -----------------------------------------------------
        // LOCATION
        // -----------------------------------------------------

        response.setNativePlace(profile.getNativePlace());
        response.setState(profile.getState());
        response.setDistrict(profile.getDistrict());
        response.setTaluka(profile.getTaluka());
        response.setCity(profile.getCity());

        // -----------------------------------------------------
        // ABOUT ME
        // -----------------------------------------------------

        response.setAboutMe(profile.getAboutMe());

        // -----------------------------------------------------
        // STATUS / TIMESTAMPS
        // -----------------------------------------------------

        response.setProfileStatus(profile.getProfileStatus());

        response.setCreatedAt(profile.getCreatedAt());
        response.setUpdatedAt(profile.getUpdatedAt());

        return response;
    }


    // =========================================================
    // OPTIONAL VALUE NORMALIZATION
    // =========================================================

    private String normalizeOptional(String value) {

        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}