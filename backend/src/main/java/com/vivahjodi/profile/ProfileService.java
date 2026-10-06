package com.vivahjodi.profile;

import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import com.vivahjodi.payment.PaymentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.OffsetDateTime;
import java.util.UUID;
import com.vivahjodi.profile.education.EducationDetail;
import com.vivahjodi.profile.education.EducationDetailRepository;
import com.vivahjodi.profile.education.EducationDetailResponse;
import com.vivahjodi.profile.family.FamilyDetail;
import com.vivahjodi.profile.family.FamilyDetailRepository;
import com.vivahjodi.profile.family.FamilyDetailResponse;
import com.vivahjodi.profile.occupation.OccupationDetail;
import com.vivahjodi.profile.occupation.OccupationDetailRepository;
import com.vivahjodi.profile.occupation.OccupationDetailResponse;

@Service
public class ProfileService {

private final ProfileRepository profileRepository;
private final UserRepository userRepository;
private final PaymentRepository paymentRepository;
private final EducationDetailRepository educationDetailRepository;
private final FamilyDetailRepository familyDetailRepository;
private final OccupationDetailRepository occupationDetailRepository;


public ProfileService(
        ProfileRepository profileRepository,
        UserRepository userRepository,
        PaymentRepository paymentRepository,
        EducationDetailRepository educationDetailRepository,
        FamilyDetailRepository familyDetailRepository,
        OccupationDetailRepository occupationDetailRepository) {

    this.profileRepository = profileRepository;
    this.userRepository = userRepository;
    this.paymentRepository = paymentRepository;
    this.educationDetailRepository = educationDetailRepository;
    this.familyDetailRepository = familyDetailRepository;
    this.occupationDetailRepository = occupationDetailRepository;
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

        profile.setCurrentState(
                normalizeOptional(request.getCurrentState()));

        profile.setCurrentDistrict(
                normalizeOptional(request.getCurrentDistrict()));

        profile.setCurrentTaluka(
                normalizeOptional(request.getCurrentTaluka()));

        profile.setCurrentCity(
                normalizeOptional(request.getCurrentCity()));        


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


        profile.setPartnerMinAge(request.getPartnerMinAge());
profile.setPartnerMaxAge(request.getPartnerMaxAge());
profile.setPartnerMinHeightCm(request.getPartnerMinHeightCm());
profile.setPartnerMaxHeightCm(request.getPartnerMaxHeightCm());

profile.setPartnerMaritalStatus(
        normalizeOptional(request.getPartnerMaritalStatus())
);
profile.setPartnerMotherTongue(
        normalizeOptional(request.getPartnerMotherTongue())
);
profile.setPartnerReligion(
        normalizeOptional(request.getPartnerReligion())
);
profile.setPartnerCaste(
        normalizeOptional(request.getPartnerCaste())
);
profile.setPartnerSubCaste(
        normalizeOptional(request.getPartnerSubCaste())
);
profile.setPartnerZodiacSign(
        normalizeOptional(request.getPartnerZodiacSign())
);
profile.setPartnerNakshatra(
        normalizeOptional(request.getPartnerNakshatra())
);
profile.setPartnerManglikStatus(
        normalizeOptional(request.getPartnerManglikStatus())
);

profile.setPartnerEducation(
        normalizeOptional(request.getPartnerEducation())
);
profile.setPartnerOccupation(
        normalizeOptional(request.getPartnerOccupation())
);

profile.setPartnerMinIncome(request.getPartnerMinIncome());
profile.setPartnerMaxIncome(request.getPartnerMaxIncome());

profile.setPartnerAbout(
        normalizeOptional(request.getPartnerAbout())
);


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

        profile.setCurrentState(
                normalizeOptional(request.getCurrentState()));

        profile.setCurrentDistrict(
                normalizeOptional(request.getCurrentDistrict()));

        profile.setCurrentTaluka(
                normalizeOptional(request.getCurrentTaluka()));

        profile.setCurrentCity(
                normalizeOptional(request.getCurrentCity()));


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


        profile.setPartnerMinAge(request.getPartnerMinAge());
profile.setPartnerMaxAge(request.getPartnerMaxAge());
profile.setPartnerMinHeightCm(request.getPartnerMinHeightCm());
profile.setPartnerMaxHeightCm(request.getPartnerMaxHeightCm());

profile.setPartnerMaritalStatus(
        normalizeOptional(request.getPartnerMaritalStatus())
);
profile.setPartnerMotherTongue(
        normalizeOptional(request.getPartnerMotherTongue())
);
profile.setPartnerReligion(
        normalizeOptional(request.getPartnerReligion())
);
profile.setPartnerCaste(
        normalizeOptional(request.getPartnerCaste())
);
profile.setPartnerSubCaste(
        normalizeOptional(request.getPartnerSubCaste())
);
profile.setPartnerZodiacSign(
        normalizeOptional(request.getPartnerZodiacSign())
);
profile.setPartnerNakshatra(
        normalizeOptional(request.getPartnerNakshatra())
);
profile.setPartnerManglikStatus(
        normalizeOptional(request.getPartnerManglikStatus())
);

profile.setPartnerEducation(
        normalizeOptional(request.getPartnerEducation())
);
profile.setPartnerOccupation(
        normalizeOptional(request.getPartnerOccupation())
);

profile.setPartnerMinIncome(request.getPartnerMinIncome());
profile.setPartnerMaxIncome(request.getPartnerMaxIncome());

profile.setPartnerAbout(
        normalizeOptional(request.getPartnerAbout())
);        


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
    // SUBMIT MY PROFILE FOR VERIFICATION
    // =========================================================

    public ProfileResponse submitMyProfileForVerification(
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Authenticated user not found"));

        Profile profile =
                profileRepository.findByUserId(user.getId())
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Profile not found for this account"));

                String currentStatus = profile.getProfileStatus();

                if ("PENDING_VERIFICATION".equals(currentStatus)) {
                return toResponse(profile);
                }

                if (!"DRAFT".equals(currentStatus)
                        && !"REJECTED".equals(currentStatus)
                        && !"ACTIVE".equals(currentStatus)) {

                throw new IllegalArgumentException(
                        "Profile cannot be submitted in its current status"
                );
                }

        OffsetDateTime now =
                OffsetDateTime.now();

        profile.setProfileStatus(
                "PENDING_VERIFICATION");

        profile.setSubmittedAt(now);

        profile.setVerifiedAt(null);

        profile.setRejectionReason(null);

        profile.setUpdatedAt(now);

        Profile submittedProfile =
                profileRepository.save(profile);

        return toResponse(submittedProfile);
    }





// =========================================================
// GET PENDING PROFILES FOR ADMIN REVIEW
// =========================================================

public List<ProfileResponse> getPendingProfilesForAdmin() {

    List<Profile> profiles =
            profileRepository
                    .findByProfileStatusAndUser_RoleOrderBySubmittedAtAsc(
                            "PENDING_VERIFICATION",
                            "USER"
                    );

    return profiles.stream()
            .map(this::toResponse)
            .toList();
}




// =========================================================
// ADMIN APPROVE PROFILE
// =========================================================

public ProfileResponse approveProfileForAdmin(UUID profileId) {

    Profile profile =
            profileRepository.findById(profileId)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Profile not found"
                    ));

    if (!"PENDING_VERIFICATION".equals(profile.getProfileStatus())) {
        throw new IllegalArgumentException(
                "Profile cannot be approved in its current status"
        );
    }



     // =====================================================
    // PAYMENT CHECK
    // =====================================================

    boolean paymentSuccessful =
            paymentRepository
                    .findTopByUserIdOrderByCreatedAtDesc(
                            profile.getUser().getId()
                    )
                    .map(payment ->
                            "SUCCESS".equals(
                                    payment.getPaymentStatus()
                            )
                    )
                    .orElse(false);

    if (!paymentSuccessful) {
        throw new IllegalArgumentException(
                "Payment is required before profile approval"
        );
    }


    OffsetDateTime now = OffsetDateTime.now();

    profile.setProfileStatus("ACTIVE");
    profile.setVerifiedAt(now);
    profile.setRejectionReason(null);
    profile.setUpdatedAt(now);

User user =
        userRepository.findById(profile.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found for this profile"
                ));

user.setAccountStatus("ACTIVE");
user.setUpdatedAt(now);

userRepository.save(user);

Profile approvedProfile =
        profileRepository.save(profile);

return toResponse(approvedProfile);
}


public ProfileResponse rejectProfileForAdmin(
        UUID profileId,
        String reason
) {

    Profile profile =
            profileRepository.findById(profileId)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Profile not found"
                    ));

    if (!"PENDING_VERIFICATION".equals(
            profile.getProfileStatus()
    )) {
        throw new IllegalArgumentException(
                "Profile cannot be rejected in its current status"
        );
    }

    if (reason == null || reason.trim().isEmpty()) {
        throw new IllegalArgumentException(
                "Rejection reason is required"
        );
    }

    OffsetDateTime now =
            OffsetDateTime.now();

    profile.setProfileStatus("REJECTED");
    profile.setRejectionReason(
            reason.trim()
    );
    profile.setVerifiedAt(null);
    profile.setUpdatedAt(now);

    Profile rejectedProfile =
            profileRepository.save(profile);

    return toResponse(rejectedProfile);
}






    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private ProfileResponse toResponse(Profile profile) {

        ProfileResponse response =
                new ProfileResponse();

        EducationDetail education =
        educationDetailRepository
                .findByProfileIdOrderByCreatedAtAsc(
                        profile.getId()
                )
                .stream()
                .findFirst()
                .orElse(null);

if (education != null) {

    EducationDetailResponse educationResponse =
            new EducationDetailResponse();

    educationResponse.setId(
            education.getId());

    educationResponse.setEducationLevel(
            education.getEducationLevel());

    educationResponse.setEducationStream(
            education.getEducationStream());

    educationResponse.setQualification(
            education.getQualification());

    educationResponse.setSpecialization(
            education.getSpecialization());

    educationResponse.setInstituteName(
            education.getInstituteName());

    educationResponse.setPassingYear(
            education.getPassingYear());

    educationResponse.setCreatedAt(
            education.getCreatedAt());

    educationResponse.setUpdatedAt(
            education.getUpdatedAt());

    response.setEducation(
            educationResponse);
}

    FamilyDetail family =
    familyDetailRepository
        .findByProfileId(profile.getId())
        .orElse(null);

if (family != null) {
    FamilyDetailResponse familyResponse =
        new FamilyDetailResponse();

    familyResponse.setId(family.getId());
    familyResponse.setProfileId(family.getProfile().getId());

    familyResponse.setFatherName(family.getFatherName());
    familyResponse.setFatherOccupation(family.getFatherOccupation());

    familyResponse.setMotherName(family.getMotherName());
    familyResponse.setMotherOccupation(family.getMotherOccupation());

    familyResponse.setFamilyType(family.getFamilyType());
    familyResponse.setFamilyValues(family.getFamilyValues());
    familyResponse.setFamilyStatus(family.getFamilyStatus());

    familyResponse.setSiblingsCount(family.getSiblingsCount());
    familyResponse.setBrothersCount(family.getBrothersCount());
    familyResponse.setSistersCount(family.getSistersCount());

    familyResponse.setNativePlace(family.getNativePlace());
    familyResponse.setFamilyAbout(family.getFamilyAbout());

    familyResponse.setNumberOfBrothers(family.getNumberOfBrothers());
    familyResponse.setBrothersMarried(family.getBrothersMarried());

    familyResponse.setNumberOfSisters(family.getNumberOfSisters());
    familyResponse.setSistersMarried(family.getSistersMarried());

    familyResponse.setParentalDetails(family.getParentalDetails());

    familyResponse.setCreatedAt(family.getCreatedAt());
    familyResponse.setUpdatedAt(family.getUpdatedAt());

    response.setFamily(familyResponse);
}

        OccupationDetail occupation =
                occupationDetailRepository
                        .findByProfileId(profile.getId())
                        .orElse(null);

        if (occupation != null) {

            OccupationDetailResponse occupationResponse =
                    new OccupationDetailResponse();

            occupationResponse.setId(
                    occupation.getId());

            occupationResponse.setProfileId(
                    occupation.getProfile().getId());

            occupationResponse.setOccupation(
                    occupation.getOccupation());

            occupationResponse.setDesignation(
                    occupation.getDesignation());

            occupationResponse.setCompanyName(
                    occupation.getCompanyName());

            occupationResponse.setEmploymentType(
                    occupation.getEmploymentType());

            occupationResponse.setWorkCity(
                    occupation.getWorkCity());

            occupationResponse.setWorkState(
                    occupation.getWorkState());

            occupationResponse.setAnnualIncomeInr(
                occupation.getAnnualIncomeInr() != null
                        ? occupation.getAnnualIncomeInr().longValue()
                        : null);

            occupationResponse.setBusinessDetails(
                    occupation.getBusinessDetails());

            occupationResponse.setSubOccupation(
                    occupation.getSubOccupation());

            occupationResponse.setEmployedIn(
                    occupation.getEmployedIn());

            occupationResponse.setWorkLocation(
                    occupation.getWorkLocation());

            occupationResponse.setAnnualIncome(
                occupation.getAnnualIncome() != null
                        ? occupation.getAnnualIncome().toPlainString()
                        : null);

            occupationResponse.setIncomeCurrency(
                    occupation.getIncomeCurrency());

            occupationResponse.setCreatedAt(
                    occupation.getCreatedAt());

            occupationResponse.setUpdatedAt(
                    occupation.getUpdatedAt());

            response.setOccupation(
                    occupationResponse);
        }




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

        response.setCurrentState(
                profile.getCurrentState());

        response.setCurrentDistrict(
                profile.getCurrentDistrict());

        response.setCurrentTaluka(
                profile.getCurrentTaluka());

        response.setCurrentCity(
                profile.getCurrentCity());        


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


        response.setPartnerMinAge(profile.getPartnerMinAge());
        response.setPartnerMaxAge(profile.getPartnerMaxAge());
        response.setPartnerMinHeightCm(profile.getPartnerMinHeightCm());
        response.setPartnerMaxHeightCm(profile.getPartnerMaxHeightCm());

        response.setPartnerMaritalStatus(profile.getPartnerMaritalStatus());
        response.setPartnerMotherTongue(profile.getPartnerMotherTongue());
        response.setPartnerReligion(profile.getPartnerReligion());
        response.setPartnerCaste(profile.getPartnerCaste());
        response.setPartnerSubCaste(profile.getPartnerSubCaste());
        response.setPartnerZodiacSign(profile.getPartnerZodiacSign());
        response.setPartnerNakshatra(profile.getPartnerNakshatra());
        response.setPartnerManglikStatus(profile.getPartnerManglikStatus());

        response.setPartnerEducation(profile.getPartnerEducation());
        response.setPartnerOccupation(profile.getPartnerOccupation());

        response.setPartnerMinIncome(profile.getPartnerMinIncome());
        response.setPartnerMaxIncome(profile.getPartnerMaxIncome());

        response.setPartnerAbout(profile.getPartnerAbout());
       

        response.setProfileStatus(
                profile.getProfileStatus());

        response.setPaymentStatus(
        paymentRepository
                .findTopByUserIdOrderByCreatedAtDesc(
                        profile.getUser().getId()
                )
                .map(payment -> payment.getPaymentStatus())
                .orElse("PENDING")
        );




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