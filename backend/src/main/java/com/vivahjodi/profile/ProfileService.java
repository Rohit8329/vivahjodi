package com.vivahjodi.profile;

import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(
            ProfileRepository profileRepository,
            UserRepository userRepository) {

        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }


    // =========================================================
    // CREATE PROFILE
    // =========================================================

    public ProfileResponse createProfile(
            String email,
            ProfileRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Authenticated user not found"));

        if (profileRepository.existsByUserId(user.getId())) {
            throw new IllegalArgumentException(
                    "A profile already exists for this account");
        }

        Profile profile = new Profile();

        profile.setUser(user);


        // =====================================================
        // BASIC INFORMATION
        // =====================================================

        profile.setFirstName(
                request.getFirstName().trim());

        profile.setMiddleName(
                normalizeOptional(request.getMiddleName()));

        profile.setLastName(
                request.getLastName().trim());

        profile.setGender(
                request.getGender().trim());

        profile.setDateOfBirth(
                request.getDateOfBirth());

        profile.setTimeOfBirth(
                request.getTimeOfBirth());

        profile.setBirthPlace(
                normalizeOptional(request.getBirthPlace()));

        String maritalStatus =
                normalizeOptional(request.getMaritalStatus());

        profile.setMaritalStatus(
                maritalStatus == null
                        ? "NEVER_MARRIED"
                        : maritalStatus);

        profile.setHeightCm(
                request.getHeightCm());

        profile.setWeightKg(
                request.getWeightKg());

        profile.setNumberOfChildren(
                request.getNumberOfChildren());

        profile.setMotherTongue(
                normalizeOptional(request.getMotherTongue()));

        profile.setBloodGroup(
                normalizeOptional(request.getBloodGroup()));

        profile.setComplexion(
                normalizeOptional(request.getComplexion()));

        profile.setBodyType(
                normalizeOptional(request.getBodyType()));

        profile.setPhysicalDisability(
                request.getPhysicalDisability() != null
                        && request.getPhysicalDisability());

        profile.setDisabilityDetails(
                normalizeOptional(request.getDisabilityDetails()));


        // =====================================================
        // RELIGION / COMMUNITY
        // =====================================================

        profile.setReligion(
                normalizeOptional(request.getReligion()));

        profile.setCaste(
                normalizeOptional(request.getCaste()));

        profile.setSubCaste(
                normalizeOptional(request.getSubCaste()));

        profile.setGotra(
                normalizeOptional(request.getGotra()));

        profile.setZodiacSign(
                normalizeOptional(request.getZodiacSign()));

        profile.setNakshatra(
                normalizeOptional(request.getNakshatra()));

        profile.setManglikStatus(
                normalizeOptional(request.getManglikStatus()));


        // =====================================================
        // LIFESTYLE
        // =====================================================

        profile.setEatingHabits(
                normalizeOptional(request.getEatingHabits()));

        profile.setDrinkingHabits(
                normalizeOptional(request.getDrinkingHabits()));

        profile.setSmokingHabits(
                normalizeOptional(request.getSmokingHabits()));


        // =====================================================
        // CURRENT LOCATION
        // =====================================================

        profile.setCurrentCountry(
                defaultIfBlank(
                        request.getCurrentCountry(),
                        "India"));

        profile.setCurrentAddress(
                normalizeOptional(request.getCurrentAddress()));

        profile.setCurrentPincode(
                normalizeOptional(request.getCurrentPincode()));


        // =====================================================
        // NATIVE PLACE
        // =====================================================

        profile.setNativePlace(
                normalizeOptional(request.getNativePlace()));

        profile.setNativeCountry(
                defaultIfBlank(
                        request.getNativeCountry(),
                        "India"));

        profile.setNativeState(
                normalizeOptional(request.getNativeState()));

        profile.setNativeDistrict(
                normalizeOptional(request.getNativeDistrict()));

        profile.setNativeTaluka(
                normalizeOptional(request.getNativeTaluka()));

        profile.setNativeCity(
                normalizeOptional(request.getNativeCity()));


        // =====================================================
        // LEGACY LOCATION FIELDS
        // =====================================================

        profile.setState(
                normalizeOptional(request.getState()));

        profile.setDistrict(
                normalizeOptional(request.getDistrict()));

        profile.setTaluka(
                normalizeOptional(request.getTaluka()));

        profile.setCity(
                normalizeOptional(request.getCity()));


        // =====================================================
        // NRI INFORMATION
        // =====================================================

        profile.setNri(
                request.getNri() != null
                        && request.getNri());

        profile.setLivingCountry(
                normalizeOptional(request.getLivingCountry()));

        profile.setNriAddress(
                normalizeOptional(request.getNriAddress()));


        // =====================================================
        // PROFILE VISIBILITY
        // =====================================================

        profile.setVisibility(
                defaultIfBlank(
                        request.getVisibility(),
                        "PRIVATE"));


        // =====================================================
        // ABOUT ME
        // =====================================================

        profile.setAboutMe(
                normalizeOptional(request.getAboutMe()));


        // =====================================================
        // PROFILE STATUS
        // =====================================================

        profile.setProfileStatus("DRAFT");


        // =====================================================
        // TIMESTAMPS
        // =====================================================

        OffsetDateTime now =
                OffsetDateTime.now();

        profile.setCreatedAt(now);
        profile.setUpdatedAt(now);


        // =====================================================
        // SAVE
        // =====================================================

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

        Profile profile =
                profileRepository.findByUserId(user.getId())
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

        Profile profile =
                profileRepository.findByUserId(user.getId())
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Profile not found for this account"));


        // =====================================================
        // BASIC INFORMATION
        // =====================================================

        profile.setFirstName(
                request.getFirstName().trim());

        profile.setMiddleName(
                normalizeOptional(request.getMiddleName()));

        profile.setLastName(
                request.getLastName().trim());

        profile.setGender(
                request.getGender().trim());

        profile.setDateOfBirth(
                request.getDateOfBirth());

        profile.setTimeOfBirth(
                request.getTimeOfBirth());

        profile.setBirthPlace(
                normalizeOptional(request.getBirthPlace()));

        String maritalStatus =
                normalizeOptional(request.getMaritalStatus());

        profile.setMaritalStatus(
                maritalStatus == null
                        ? "NEVER_MARRIED"
                        : maritalStatus);

        profile.setHeightCm(
                request.getHeightCm());

        profile.setWeightKg(
                request.getWeightKg());

        profile.setNumberOfChildren(
                request.getNumberOfChildren());

        profile.setMotherTongue(
                normalizeOptional(request.getMotherTongue()));

        profile.setBloodGroup(
                normalizeOptional(request.getBloodGroup()));

        profile.setComplexion(
                normalizeOptional(request.getComplexion()));

        profile.setBodyType(
                normalizeOptional(request.getBodyType()));

        profile.setPhysicalDisability(
                request.getPhysicalDisability() != null
                        && request.getPhysicalDisability());

        profile.setDisabilityDetails(
                normalizeOptional(request.getDisabilityDetails()));


        // =====================================================
        // RELIGION / COMMUNITY
        // =====================================================

        profile.setReligion(
                normalizeOptional(request.getReligion()));

        profile.setCaste(
                normalizeOptional(request.getCaste()));

        profile.setSubCaste(
                normalizeOptional(request.getSubCaste()));

        profile.setGotra(
                normalizeOptional(request.getGotra()));

        profile.setZodiacSign(
                normalizeOptional(request.getZodiacSign()));

        profile.setNakshatra(
                normalizeOptional(request.getNakshatra()));

        profile.setManglikStatus(
                normalizeOptional(request.getManglikStatus()));


        // =====================================================
        // LIFESTYLE
        // =====================================================

        profile.setEatingHabits(
                normalizeOptional(request.getEatingHabits()));

        profile.setDrinkingHabits(
                normalizeOptional(request.getDrinkingHabits()));

        profile.setSmokingHabits(
                normalizeOptional(request.getSmokingHabits()));


        // =====================================================
        // CURRENT LOCATION
        // =====================================================

        profile.setCurrentCountry(
                defaultIfBlank(
                        request.getCurrentCountry(),
                        "India"));

        profile.setCurrentAddress(
                normalizeOptional(request.getCurrentAddress()));

        profile.setCurrentPincode(
                normalizeOptional(request.getCurrentPincode()));


        // =====================================================
        // NATIVE PLACE
        // =====================================================

        profile.setNativePlace(
                normalizeOptional(request.getNativePlace()));

        profile.setNativeCountry(
                defaultIfBlank(
                        request.getNativeCountry(),
                        "India"));

        profile.setNativeState(
                normalizeOptional(request.getNativeState()));

        profile.setNativeDistrict(
                normalizeOptional(request.getNativeDistrict()));

        profile.setNativeTaluka(
                normalizeOptional(request.getNativeTaluka()));

        profile.setNativeCity(
                normalizeOptional(request.getNativeCity()));


        // =====================================================
        // LEGACY LOCATION FIELDS
        // =====================================================

        profile.setState(
                normalizeOptional(request.getState()));

        profile.setDistrict(
                normalizeOptional(request.getDistrict()));

        profile.setTaluka(
                normalizeOptional(request.getTaluka()));

        profile.setCity(
                normalizeOptional(request.getCity()));


        // =====================================================
        // NRI INFORMATION
        // =====================================================

        profile.setNri(
                request.getNri() != null
                        && request.getNri());

        profile.setLivingCountry(
                normalizeOptional(request.getLivingCountry()));

        profile.setNriAddress(
                normalizeOptional(request.getNriAddress()));


        // =====================================================
        // PROFILE VISIBILITY
        // =====================================================

        if (request.getVisibility() != null
                && !request.getVisibility().isBlank()) {

            profile.setVisibility(
                    request.getVisibility().trim());
        }


        // =====================================================
        // ABOUT ME
        // =====================================================

        profile.setAboutMe(
                normalizeOptional(request.getAboutMe()));


        // =====================================================
        // TIMESTAMP
        // =====================================================

        profile.setUpdatedAt(
                OffsetDateTime.now());


        // =====================================================
        // SAVE
        // =====================================================

        Profile updatedProfile =
                profileRepository.save(profile);

        return toResponse(updatedProfile);
    }


    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private ProfileResponse toResponse(Profile profile) {

        ProfileResponse response =
                new ProfileResponse();


        // =====================================================
        // ID
        // =====================================================

        response.setId(
                profile.getId());

        response.setUserId(
                profile.getUser().getId());

        response.setProfileCode(
                profile.getProfileCode());


        // =====================================================
        // BASIC INFORMATION
        // =====================================================

        response.setFirstName(
                profile.getFirstName());

        response.setMiddleName(
                profile.getMiddleName());

        response.setLastName(
                profile.getLastName());

        response.setGender(
                profile.getGender());

        response.setDateOfBirth(
                profile.getDateOfBirth());

        response.setTimeOfBirth(
                profile.getTimeOfBirth());

        response.setBirthPlace(
                profile.getBirthPlace());

        response.setMaritalStatus(
                profile.getMaritalStatus());

        response.setHeightCm(
                profile.getHeightCm());

        response.setWeightKg(
                profile.getWeightKg());

        response.setNumberOfChildren(
                profile.getNumberOfChildren());

        response.setMotherTongue(
                profile.getMotherTongue());

        response.setBloodGroup(
                profile.getBloodGroup());

        response.setComplexion(
                profile.getComplexion());

        response.setBodyType(
                profile.getBodyType());

        response.setPhysicalDisability(
                profile.isPhysicalDisability());

        response.setDisabilityDetails(
                profile.getDisabilityDetails());


        // =====================================================
        // RELIGION / COMMUNITY
        // =====================================================

        response.setReligion(
                profile.getReligion());

        response.setCaste(
                profile.getCaste());

        response.setSubCaste(
                profile.getSubCaste());

        response.setGotra(
                profile.getGotra());

        response.setZodiacSign(
                profile.getZodiacSign());

        response.setNakshatra(
                profile.getNakshatra());

        response.setManglikStatus(
                profile.getManglikStatus());


        // =====================================================
        // LIFESTYLE
        // =====================================================

        response.setEatingHabits(
                profile.getEatingHabits());

        response.setDrinkingHabits(
                profile.getDrinkingHabits());

        response.setSmokingHabits(
                profile.getSmokingHabits());


        // =====================================================
        // CURRENT LOCATION
        // =====================================================

        response.setCurrentCountry(
                profile.getCurrentCountry());

        response.setCurrentAddress(
                profile.getCurrentAddress());

        response.setCurrentPincode(
                profile.getCurrentPincode());


        // =====================================================
        // NATIVE PLACE
        // =====================================================

        response.setNativePlace(
                profile.getNativePlace());

        response.setNativeCountry(
                profile.getNativeCountry());

        response.setNativeState(
                profile.getNativeState());

        response.setNativeDistrict(
                profile.getNativeDistrict());

        response.setNativeTaluka(
                profile.getNativeTaluka());

        response.setNativeCity(
                profile.getNativeCity());


        // =====================================================
        // LEGACY LOCATION
        // =====================================================

        response.setState(
                profile.getState());

        response.setDistrict(
                profile.getDistrict());

        response.setTaluka(
                profile.getTaluka());

        response.setCity(
                profile.getCity());


        // =====================================================
        // NRI INFORMATION
        // =====================================================

        response.setNri(
                profile.isNri());

        response.setLivingCountry(
                profile.getLivingCountry());

        response.setNriAddress(
                profile.getNriAddress());


        // =====================================================
        // PROFILE VISIBILITY / REVIEW
        // =====================================================

        response.setVisibility(
                profile.getVisibility());

        response.setSubmittedAt(
                profile.getSubmittedAt());

        response.setVerifiedAt(
                profile.getVerifiedAt());

        response.setRejectionReason(
                profile.getRejectionReason());


        // =====================================================
        // ABOUT / STATUS
        // =====================================================

        response.setAboutMe(
                profile.getAboutMe());

        response.setProfileStatus(
                profile.getProfileStatus());


        // =====================================================
        // TIMESTAMPS
        // =====================================================

        response.setCreatedAt(
                profile.getCreatedAt());

        response.setUpdatedAt(
                profile.getUpdatedAt());


        return response;
    }


    // =========================================================
    // OPTIONAL STRING NORMALIZATION
    // =========================================================

    private String normalizeOptional(String value) {

        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }


    // =========================================================
    // DEFAULT STRING VALUE
    // =========================================================

    private String defaultIfBlank(
            String value,
            String defaultValue) {

        if (value == null || value.isBlank()) {
            return defaultValue;
        }

        return value.trim();
    }
}