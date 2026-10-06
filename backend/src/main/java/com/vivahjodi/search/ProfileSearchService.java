package com.vivahjodi.search;

import com.vivahjodi.profile.Profile;
import com.vivahjodi.profile.education.EducationDetail;
import com.vivahjodi.profile.education.EducationDetailRepository;
import com.vivahjodi.profile.occupation.OccupationDetail;
import com.vivahjodi.profile.occupation.OccupationDetailRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class ProfileSearchService {

    private final ProfileSearchRepository profileSearchRepository;
    private final EducationDetailRepository educationDetailRepository;
    private final OccupationDetailRepository occupationDetailRepository;

    public ProfileSearchService(
            ProfileSearchRepository profileSearchRepository,
            EducationDetailRepository educationDetailRepository,
            OccupationDetailRepository occupationDetailRepository
    ) {
        this.profileSearchRepository = profileSearchRepository;
        this.educationDetailRepository = educationDetailRepository;
        this.occupationDetailRepository = occupationDetailRepository;
    }

    public List<ProfileSearchResponse> search(ProfileSearchRequest request) {

        List<Profile> profiles =
                profileSearchRepository.search(request);

        return profiles.stream()
                .map(this::toResponse)
                .toList();
    }

    private ProfileSearchResponse toResponse(Profile profile) {

        ProfileSearchResponse response =
                new ProfileSearchResponse();

        response.setId(profile.getId());
        response.setProfileCode(profile.getProfileCode());

        response.setFirstName(profile.getFirstName());
        response.setMiddleName(profile.getMiddleName());
        response.setLastName(profile.getLastName());

        response.setGender(profile.getGender());

        response.setDateOfBirth(profile.getDateOfBirth());

        response.setAge(calculateAge(profile.getDateOfBirth()));

        response.setHeightCm(profile.getHeightCm());

        response.setComplexion(profile.getComplexion());

        response.setBodyType(profile.getBodyType());

        response.setPhysicalDisability(profile.isPhysicalDisability());

        response.setZodiacSign(profile.getZodiacSign());

        response.setNakshatra(profile.getNakshatra());

        response.setManglikStatus(profile.getManglikStatus());

        response.setEatingHabits(profile.getEatingHabits());

        response.setSmokingHabits(profile.getSmokingHabits());

        response.setDrinkingHabits(profile.getDrinkingHabits());

        response.setNri(profile.isNri());

        response.setLivingCountry(profile.getLivingCountry());



        response.setMaritalStatus(profile.getMaritalStatus());

        response.setReligion(profile.getReligion());
        response.setCaste(profile.getCaste());
        response.setSubCaste(profile.getSubCaste());

        response.setMotherTongue(profile.getMotherTongue());

        response.setCity(profile.getCity());
        response.setState(profile.getState());

        response.setCurrentState(profile.getCurrentState());

        response.setCurrentDistrict(profile.getCurrentDistrict());

        response.setCurrentTaluka(profile.getCurrentTaluka());

        response.setCurrentCity(profile.getCurrentCity());

        response.setNativeState(profile.getNativeState());

        response.setNativeDistrict(profile.getNativeDistrict());

        response.setNativeTaluka(profile.getNativeTaluka());

        response.setNativeCity(profile.getNativeCity());

        response.setAboutMe(profile.getAboutMe());

        response.setVisibility(profile.getVisibility());

        response.setLastLogin(
                profile.getUser() != null ? profile.getUser().getLastLogin() : null
        );

        /*
         * Education is stored in education_details,
         * not directly inside profiles.
         *
         * For search result display we use the first
         * education record for the profile.
         */
        List<EducationDetail> educationDetails =
                educationDetailRepository
                        .findByProfileIdOrderByCreatedAtAsc(
                                profile.getId()
                        );

        if (!educationDetails.isEmpty()) {

            EducationDetail education =
                    educationDetails.get(0);

            response.setEducation(
                    buildEducationText(education)
            );
        }

        /*
         * Occupation is stored in occupation_details.
         */
        OccupationDetail occupation =
                occupationDetailRepository
                        .findByProfileId(profile.getId())
                        .orElse(null);
        
        if (occupation != null) {
            response.setAnnualIncome(
                occupation.getAnnualIncome()
            );

        }



        if (occupation != null) {

            response.setOccupation(
                    buildOccupationText(occupation)
            );
        }

        return response;
    }

    private Integer calculateAge(LocalDate dateOfBirth) {

        if (dateOfBirth == null) {
            return null;
        }

        return Period.between(
                dateOfBirth,
                LocalDate.now()
        ).getYears();
    }

    private String buildEducationText(
            EducationDetail education
    ) {

        StringBuilder text = new StringBuilder();

        append(text, education.getQualification());
        append(text, education.getSpecialization());
        append(text, education.getEducationStream());
        append(text, education.getEducationLevel());

        return text.length() == 0
                ? null
                : text.toString();
    }

    private String buildOccupationText(
            OccupationDetail occupation
    ) {

        StringBuilder text = new StringBuilder();

        append(text, occupation.getOccupation());
        append(text, occupation.getDesignation());
        append(text, occupation.getCompanyName());

        return text.length() == 0
                ? null
                : text.toString();
    }

    private void append(
            StringBuilder text,
            String value
    ) {

        if (value == null || value.isBlank()) {
            return;
        }

        if (text.length() > 0) {
            text.append(" | ");
        }

        text.append(value.trim());
    }
}