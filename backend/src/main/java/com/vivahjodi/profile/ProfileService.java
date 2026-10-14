package com.vivahjodi.profile;

import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import com.vivahjodi.payment.PaymentRepository;
import com.vivahjodi.membership.MembershipRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.OffsetDateTime;
import java.util.UUID;
import java.math.BigDecimal;
import com.vivahjodi.profile.education.EducationDetail;
import com.vivahjodi.profile.education.EducationDetailRepository;
import com.vivahjodi.profile.education.EducationDetailResponse;
import com.vivahjodi.profile.family.FamilyDetail;
import com.vivahjodi.profile.family.FamilyDetailRepository;
import com.vivahjodi.profile.family.FamilyDetailResponse;
import com.vivahjodi.profile.occupation.OccupationDetail;
import com.vivahjodi.profile.occupation.OccupationDetailRepository;
import com.vivahjodi.profile.occupation.OccupationDetailResponse;
import com.vivahjodi.profile.review.ProfileReviewSnapshotService;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

private final ProfileRepository profileRepository;
private final UserRepository userRepository;
private final PaymentRepository paymentRepository;
private final EducationDetailRepository educationDetailRepository;
private final FamilyDetailRepository familyDetailRepository;
private final OccupationDetailRepository occupationDetailRepository;
private final ProfilePhotoService profilePhotoService;
private final MembershipRepository membershipRepository;
private final ProfileReviewSnapshotService profileReviewSnapshotService;


public ProfileService(
        ProfileRepository profileRepository,
        UserRepository userRepository,
        PaymentRepository paymentRepository,
        EducationDetailRepository educationDetailRepository,
        FamilyDetailRepository familyDetailRepository,
        OccupationDetailRepository occupationDetailRepository,
        ProfilePhotoService profilePhotoService,
        MembershipRepository membershipRepository,
        ProfileReviewSnapshotService profileReviewSnapshotService) {

    this.profileRepository = profileRepository;
    this.userRepository = userRepository;
    this.paymentRepository = paymentRepository;
    this.educationDetailRepository = educationDetailRepository;
    this.familyDetailRepository = familyDetailRepository;
    this.occupationDetailRepository = occupationDetailRepository;
    this.profilePhotoService = profilePhotoService;
    this.membershipRepository = membershipRepository;
    this.profileReviewSnapshotService = profileReviewSnapshotService;
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
// GET MEMBER PROFILE FOR VIEW
// =========================================================

public ProfileResponse getProfileForView(UUID profileId) {

    Profile profile =
            profileRepository.findById(profileId)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Profile not found"));

    if (!"ACTIVE".equalsIgnoreCase(profile.getProfileStatus())) {
        throw new IllegalArgumentException(
                "Profile is not available for viewing");
    }

    if (profile.getVisibility() == null
            || (
                !"PUBLIC".equalsIgnoreCase(profile.getVisibility())
                && !"MEMBERS_ONLY".equalsIgnoreCase(profile.getVisibility())
            )) {
        throw new IllegalArgumentException(
                "Profile is not available for viewing");
    }

    return toResponse(profile);
}


public ProfileViewResponse getProfileView(UUID profileId) {

    ProfileResponse profile =
            getProfileForView(profileId);

    ProfileViewResponse response =
            new ProfileViewResponse();

    response.setProfile(
            toProfileViewProfileResponse(profile)
    );

    response.setPhotos(
            profilePhotoService.getPhotosForProfile(profileId)
    );

    return response;
}


public ProfileViewResponse getPublicProfileView(UUID profileId) {

    ProfileResponse profile =
            getProfileForView(profileId);

    if (!"PUBLIC".equalsIgnoreCase(profile.getVisibility())) {
        throw new IllegalArgumentException(
                "Profile is not available for public viewing"
        );
    }

    ProfileViewResponse response =
            new ProfileViewResponse();

    response.setProfile(
            toProfileViewProfileResponse(profile)
    );

    response.setPhotos(
            profilePhotoService.getPhotosForProfile(profileId)
    );

    maskPublicProfile(response.getProfile());

    return response;
}


public boolean hasFullProfileAccess(String email) {

    User user =
            userRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Authenticated user not found"
                    ));

    if ("ADMIN".equalsIgnoreCase(user.getRole())) {
        return true;
    }

    return membershipRepository
            .findTopByUserIdOrderByCreatedAtDesc(user.getId())
            .map(membership ->
                    "ACTIVE".equalsIgnoreCase(
                            membership.getMembershipStatus()
                    )
            )
            .orElse(false);
}




private void maskPublicProfile(
        ProfileViewProfileResponse profile) {

    if (profile == null) {
        return;
    }

    // =========================================================
    // NAME
    // Keep surname visible, mask first/middle name.
    // Example: ******* Kanse
    // =========================================================

    if (profile.getFirstName() != null
            && !profile.getFirstName().isBlank()) {
        profile.setFirstName("*******");
    }

    if (profile.getMiddleName() != null
            && !profile.getMiddleName().isBlank()) {
        profile.setMiddleName("*******");
    }

    // =========================================================
    // CURRENT LOCATION
    // Keep country/state/district/taluka/city visible.
    // Mask exact address and pincode.
    // =========================================================

    if (profile.getCurrentAddress() != null
            && !profile.getCurrentAddress().isBlank()) {
        profile.setCurrentAddress("********");
    }

    if (profile.getCurrentPincode() != null
            && !profile.getCurrentPincode().isBlank()) {
        profile.setCurrentPincode("********");
    }

    // =========================================================
    // NATIVE PLACE
    // Keep structured location visible.
    // Mask exact native place.
    // =========================================================

    if (profile.getNativePlace() != null
            && !profile.getNativePlace().isBlank()) {
        profile.setNativePlace("********");
    }

    // =========================================================
    // NRI
    // =========================================================

    if (profile.getNriAddress() != null
            && !profile.getNriAddress().isBlank()) {
        profile.setNriAddress("********");
    }

    // =========================================================
    // FAMILY
    // =========================================================

    ProfileViewFamilyResponse family =
            profile.getFamily();

    if (family != null) {

        if (family.getFatherName() != null
                && !family.getFatherName().isBlank()) {
            family.setFatherName("********");
        }

        if (family.getMotherName() != null
                && !family.getMotherName().isBlank()) {
            family.setMotherName("********");
        }

        if (family.getNativePlace() != null
                && !family.getNativePlace().isBlank()) {
            family.setNativePlace("********");
        }

        if (family.getFamilyContact() != null
                && !family.getFamilyContact().isBlank()) {
        family.setFamilyContact("********");
        }
    }

    // =========================================================
    // OCCUPATION
    // =========================================================

    ProfileViewOccupationResponse occupation =
            profile.getOccupation();

    if (occupation != null) {

        if (occupation.getEmployedIn() != null
                && !occupation.getEmployedIn().isBlank()) {
            occupation.setEmployedIn("********");
        }
    }
}








private ProfileViewProfileResponse toProfileViewProfileResponse(
        ProfileResponse source) {

    ProfileViewProfileResponse target =
            new ProfileViewProfileResponse();

    target.setProfileCode(source.getProfileCode());
    target.setFirstName(source.getFirstName());
    target.setMiddleName(source.getMiddleName());
    target.setLastName(source.getLastName());
    target.setGender(source.getGender());
    target.setDateOfBirth(source.getDateOfBirth());
    target.setTimeOfBirth(source.getTimeOfBirth());
    target.setBirthPlace(source.getBirthPlace());

    target.setHeightCm(source.getHeightCm());
    target.setWeightKg(source.getWeightKg());
    target.setBloodGroup(source.getBloodGroup());
    target.setBodyType(source.getBodyType());
    target.setComplexion(source.getComplexion());

    target.setMaritalStatus(source.getMaritalStatus());
    target.setMotherTongue(source.getMotherTongue());
    target.setNumberOfChildren(source.getNumberOfChildren());

    target.setEatingHabits(source.getEatingHabits());
    target.setDrinkingHabits(source.getDrinkingHabits());
    target.setSmokingHabits(source.getSmokingHabits());

    target.setPhysicalDisability(
            Boolean.TRUE.equals(source.getPhysicalDisability())
    );
    target.setDisabilityDetails(
            source.getDisabilityDetails()
    );

    target.setReligion(source.getReligion());
    target.setCaste(source.getCaste());
    target.setSubCaste(source.getSubCaste());
    target.setGotra(source.getGotra());
    target.setZodiacSign(source.getZodiacSign());
    target.setNakshatra(source.getNakshatra());
    target.setManglikStatus(source.getManglikStatus());

target.setFamily(
        toProfileViewFamilyResponse(
                source.getFamily()
        )
);

target.setEducation(
        toProfileViewEducationResponse(
                source.getEducation()
        )
);

target.setOccupation(
        toProfileViewOccupationResponse(
                source.getOccupation()
        )
);
    target.setCurrentCountry(source.getCurrentCountry());
    target.setCurrentAddress(source.getCurrentAddress());
    target.setCurrentPincode(source.getCurrentPincode());
    target.setCurrentState(source.getCurrentState());
    target.setCurrentDistrict(source.getCurrentDistrict());
    target.setCurrentTaluka(source.getCurrentTaluka());
    target.setCurrentCity(source.getCurrentCity());

    target.setNativeCountry(source.getNativeCountry());
    target.setNativePlace(source.getNativePlace());
    target.setNativeState(source.getNativeState());
    target.setNativeDistrict(source.getNativeDistrict());
    target.setNativeTaluka(source.getNativeTaluka());
    target.setNativeCity(source.getNativeCity());

    target.setNri(
            Boolean.TRUE.equals(source.getNri())
    );
    target.setLivingCountry(source.getLivingCountry());
    target.setNriAddress(source.getNriAddress());

    target.setAboutMe(source.getAboutMe());

    target.setPartnerMinAge(source.getPartnerMinAge());
    target.setPartnerMaxAge(source.getPartnerMaxAge());
    target.setPartnerMinHeightCm(
            source.getPartnerMinHeightCm()
    );
    target.setPartnerMaxHeightCm(
            source.getPartnerMaxHeightCm()
    );

    target.setPartnerMotherTongue(
            source.getPartnerMotherTongue()
    );
    target.setPartnerMaritalStatus(
            source.getPartnerMaritalStatus()
    );
    target.setPartnerReligion(
            source.getPartnerReligion()
    );
    target.setPartnerCaste(
            source.getPartnerCaste()
    );
    target.setPartnerSubCaste(
            source.getPartnerSubCaste()
    );
    target.setPartnerManglikStatus(
            source.getPartnerManglikStatus()
    );
    target.setPartnerNakshatra(
            source.getPartnerNakshatra()
    );
    target.setPartnerZodiacSign(
            source.getPartnerZodiacSign()
    );
    target.setPartnerEducation(
            source.getPartnerEducation()
    );
    target.setPartnerOccupation(
            source.getPartnerOccupation()
    );
target.setPartnerMinIncome(
        source.getPartnerMinIncome() == null
                ? null
                : BigDecimal.valueOf(
                        source.getPartnerMinIncome()
                )
);

target.setPartnerMaxIncome(
        source.getPartnerMaxIncome() == null
                ? null
                : BigDecimal.valueOf(
                        source.getPartnerMaxIncome()
                )
);
    target.setPartnerAbout(
            source.getPartnerAbout()
    );

    return target;
}

    private ProfileViewEducationResponse toProfileViewEducationResponse(
            EducationDetailResponse source) {

        if (source == null) {
            return null;
        }

        ProfileViewEducationResponse target =
                new ProfileViewEducationResponse();

        target.setEducationLevel(
                source.getEducationLevel()
        );

        target.setEducationStream(
                source.getEducationStream()
        );

        target.setQualification(
                source.getQualification()
        );

        target.setSpecialization(
                source.getSpecialization()
        );

        target.setInstituteName(
                source.getInstituteName()
        );

        target.setPassingYear(
                source.getPassingYear()
        );

        return target;
    }


    private ProfileViewFamilyResponse toProfileViewFamilyResponse(
            FamilyDetailResponse source) {

        if (source == null) {
            return null;
        }

        ProfileViewFamilyResponse target =
                new ProfileViewFamilyResponse();

        target.setFatherName(
                source.getFatherName()
        );

        target.setFatherOccupation(
                source.getFatherOccupation()
        );

        target.setMotherName(
                source.getMotherName()
        );

        target.setMotherOccupation(
                source.getMotherOccupation()
        );

        target.setFamilyType(
                source.getFamilyType()
        );

        target.setFamilyValues(
                source.getFamilyValues()
        );

        target.setFamilyStatus(
                source.getFamilyStatus()
        );

        target.setSiblingsCount(
                source.getSiblingsCount()
        );

        target.setBrothersCount(
                source.getBrothersCount()
        );

        target.setSistersCount(
                source.getSistersCount()
        );

        target.setNativePlace(
                source.getNativePlace()
        );

        target.setFamilyAbout(
                source.getFamilyAbout()
        );

        target.setFamilyContact(
                source.getFamilyContact()
        );

        target.setNumberOfBrothers(
                source.getNumberOfBrothers()
        );

        target.setBrothersMarried(
                source.getBrothersMarried()
        );

        target.setNumberOfSisters(
                source.getNumberOfSisters()
        );

        target.setSistersMarried(
                source.getSistersMarried()
        );

        target.setParentalDetails(
                source.getParentalDetails()
        );

        return target;
    }


    private ProfileViewOccupationResponse toProfileViewOccupationResponse(
            OccupationDetailResponse source) {

        if (source == null) {
            return null;
        }

        ProfileViewOccupationResponse target =
                new ProfileViewOccupationResponse();

        target.setOccupation(
                source.getOccupation()
        );

        target.setDesignation(
                source.getDesignation()
        );

        target.setCompanyName(
                source.getCompanyName()
        );

        target.setEmploymentType(
                source.getEmploymentType()
        );

        target.setWorkCity(
                source.getWorkCity()
        );

        target.setWorkState(
                source.getWorkState()
        );

        target.setAnnualIncomeInr(
                source.getAnnualIncomeInr()
        );

        target.setBusinessDetails(
                source.getBusinessDetails()
        );

        target.setSubOccupation(
                source.getSubOccupation()
        );

        target.setEmployedIn(
                source.getEmployedIn()
        );

        target.setWorkLocation(
                source.getWorkLocation()
        );

        target.setAnnualIncome(
                source.getAnnualIncome()
        );

        target.setIncomeCurrency(
                source.getIncomeCurrency()
        );

        return target;
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

        // Preserve the original profile before any fields are changed.
        profileReviewSnapshotService.captureBeforeChange(profile);

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

                // Capture the current version for the admin's change review.
                profileReviewSnapshotService.captureProposedVersion(profile);

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

@Transactional
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

// Prepare the snapshot for the next review cycle.
profileReviewSnapshotService.finishReviewCycle(approvedProfile);

return toResponse(approvedProfile);
}


@Transactional
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

// Prepare the snapshot for the next review cycle.
profileReviewSnapshotService.finishReviewCycle(rejectedProfile);

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
    familyResponse.setFamilyContact(family.getFamilyContact());

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