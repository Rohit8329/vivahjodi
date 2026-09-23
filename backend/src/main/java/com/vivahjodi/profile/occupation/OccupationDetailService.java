package com.vivahjodi.profile.occupation;

import com.vivahjodi.profile.Profile;
import com.vivahjodi.profile.ProfileRepository;
import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.UUID;

import java.math.BigDecimal;

@Service
public class OccupationDetailService {

    private final OccupationDetailRepository occupationDetailRepository;
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public OccupationDetailService(
            OccupationDetailRepository occupationDetailRepository,
            ProfileRepository profileRepository,
            UserRepository userRepository) {

        this.occupationDetailRepository = occupationDetailRepository;
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public OccupationDetailResponse createOrUpdateOccupation(
            String email,
            OccupationDetailRequest request) {

        Profile profile = getMyProfile(email);

        OccupationDetail occupation =
                occupationDetailRepository
                        .findByProfileId(profile.getId())
                        .orElse(null);

        OffsetDateTime now = OffsetDateTime.now();

        if (occupation == null) {
            occupation = new OccupationDetail();
            occupation.setProfile(profile);
            occupation.setCreatedAt(now);
        }

        applyRequest(occupation, request);

        occupation.setUpdatedAt(now);

        OccupationDetail saved =
                occupationDetailRepository.save(occupation);

        return toResponse(saved);
    }

    public OccupationDetailResponse getMyOccupation(
            String email) {

        Profile profile = getMyProfile(email);

        return occupationDetailRepository
                .findByProfileId(profile.getId())
                .map(this::toResponse)
                .orElse(null);
    }

    public void deleteMyOccupation(
            String email) {

        Profile profile = getMyProfile(email);

        occupationDetailRepository
                .findByProfileId(profile.getId())
                .ifPresent(
                        occupationDetailRepository::delete
                );
    }

    private void applyRequest(
            OccupationDetail occupation,
            OccupationDetailRequest request) {

        occupation.setOccupation(
                normalizeOptional(
                        request.getOccupation()
                )
        );

        occupation.setDesignation(
                normalizeOptional(
                        request.getDesignation()
                )
        );

        occupation.setCompanyName(
                normalizeOptional(
                        request.getCompanyName()
                )
        );

        occupation.setEmploymentType(
                normalizeOptional(
                        request.getEmploymentType()
                )
        );

        occupation.setWorkCity(
                normalizeOptional(
                        request.getWorkCity()
                )
        );

        occupation.setWorkState(
                normalizeOptional(
                        request.getWorkState()
                )
        );

        occupation.setAnnualIncomeInr(
                request.getAnnualIncomeInr() != null
                        ? BigDecimal.valueOf(request.getAnnualIncomeInr())
                        : null
);

        occupation.setBusinessDetails(
                normalizeOptional(
                        request.getBusinessDetails()
                )
        );

        occupation.setSubOccupation(
                normalizeOptional(
                        request.getSubOccupation()
                )
        );

        occupation.setEmployedIn(
                normalizeOptional(
                        request.getEmployedIn()
                )
        );

        occupation.setWorkLocation(
                normalizeOptional(
                        request.getWorkLocation()
                )
        );

        occupation.setAnnualIncome(
                parseAnnualIncome(
                        request.getAnnualIncome()
                )
        );

        occupation.setIncomeCurrency(
                normalizeOptional(
                        request.getIncomeCurrency()
                ) != null
                        ? normalizeOptional(
                                request.getIncomeCurrency()
                        )
                        : "INR"
        );
    }

    private Profile getMyProfile(
            String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new IllegalArgumentException(
                                        "Authenticated user not found"
                                )
                        );

        return profileRepository
                .findByUserId(user.getId())
                .orElseThrow(
                        () -> new IllegalArgumentException(
                                "Profile not found for this account"
                        )
                );
    }

    private OccupationDetailResponse toResponse(
            OccupationDetail occupation) {

        OccupationDetailResponse response =
                new OccupationDetailResponse();

        response.setId(
                occupation.getId()
        );

        response.setProfileId(
                occupation.getProfile().getId()
        );

        response.setOccupation(
                occupation.getOccupation()
        );

        response.setDesignation(
                occupation.getDesignation()
        );

        response.setCompanyName(
                occupation.getCompanyName()
        );

        response.setEmploymentType(
                occupation.getEmploymentType()
        );

        response.setWorkCity(
                occupation.getWorkCity()
        );

        response.setWorkState(
                occupation.getWorkState()
        );

        response.setAnnualIncomeInr(
                occupation.getAnnualIncomeInr() != null
                        ? occupation.getAnnualIncomeInr().longValue()
                        : null
);

        response.setBusinessDetails(
                occupation.getBusinessDetails()
        );

        response.setSubOccupation(
                occupation.getSubOccupation()
        );

        response.setEmployedIn(
                occupation.getEmployedIn()
        );

        response.setWorkLocation(
                occupation.getWorkLocation()
        );

        response.setAnnualIncome(
                occupation.getAnnualIncome() != null
                        ? occupation.getAnnualIncome().toPlainString()
                        : null
        );

        response.setIncomeCurrency(
                occupation.getIncomeCurrency()
        );

        response.setCreatedAt(
                occupation.getCreatedAt()
        );

        response.setUpdatedAt(
                occupation.getUpdatedAt()
        );

        return response;
    }


    private BigDecimal parseAnnualIncome(String value) {

    if (value == null || value.isBlank()) {
        return null;
    }

    try {
        return new BigDecimal(value.trim());
    } catch (NumberFormatException ex) {
        throw new IllegalArgumentException(
                "Annual income must be a valid number"
        );
    }
}


    private String normalizeOptional(
            String value) {

        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}