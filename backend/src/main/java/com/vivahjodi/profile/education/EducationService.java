package com.vivahjodi.profile.education;

import com.vivahjodi.profile.Profile;
import com.vivahjodi.profile.ProfileRepository;
import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class EducationService {

    private final EducationDetailRepository educationDetailRepository;
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public EducationService(
            EducationDetailRepository educationDetailRepository,
            ProfileRepository profileRepository,
            UserRepository userRepository) {

        this.educationDetailRepository = educationDetailRepository;
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public EducationDetailResponse addEducation(
            String email,
            EducationDetailRequest request) {

        Profile profile = getMyProfile(email);

        /*
         * A profile has one main education section.
         *
         * If education already exists for this profile,
         * update that record instead of creating another row.
         */
        EducationDetail education =
                educationDetailRepository
                        .findByProfileIdOrderByCreatedAtAsc(profile.getId())
                        .stream()
                        .findFirst()
                        .orElse(null);

        OffsetDateTime now = OffsetDateTime.now();

        if (education == null) {
            education = new EducationDetail();

            education.setProfile(profile);
            education.setCreatedAt(now);
        }

        education.setEducationLevel(
                normalizeOptional(request.getEducationLevel())
        );

        education.setEducationStream(
                normalizeOptional(request.getEducationStream())
        );

        education.setQualification(
                normalizeOptional(request.getQualification())
        );

        education.setSpecialization(
                normalizeOptional(request.getSpecialization())
        );

        education.setInstituteName(
                normalizeOptional(request.getInstituteName())
        );

        education.setPassingYear(
                request.getPassingYear()
        );

        education.setUpdatedAt(now);

        EducationDetail saved =
                educationDetailRepository.save(education);

        return toResponse(saved);
    }

    public List<EducationDetailResponse> getMyEducation(
            String email) {

        Profile profile = getMyProfile(email);

        return educationDetailRepository
                .findByProfileIdOrderByCreatedAtAsc(profile.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public EducationDetailResponse updateEducation(
            String email,
            UUID educationId,
            EducationDetailRequest request) {

        Profile profile = getMyProfile(email);

        EducationDetail education =
                educationDetailRepository.findById(educationId)
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Education record not found"
                        ));

        if (!education.getProfile().getId().equals(profile.getId())) {
            throw new IllegalArgumentException(
                    "You are not allowed to modify this education record"
            );
        }

        education.setEducationLevel(
                normalizeOptional(request.getEducationLevel())
        );

        education.setEducationStream(
                normalizeOptional(request.getEducationStream())
        );

        education.setQualification(
                normalizeOptional(request.getQualification())
        );

        education.setSpecialization(
                normalizeOptional(request.getSpecialization())
        );

        education.setInstituteName(
                normalizeOptional(request.getInstituteName())
        );

        education.setPassingYear(
                request.getPassingYear()
        );

        education.setUpdatedAt(
                OffsetDateTime.now()
        );

        EducationDetail updated =
                educationDetailRepository.save(education);

        return toResponse(updated);
    }

    public void deleteEducation(
            String email,
            UUID educationId) {

        Profile profile = getMyProfile(email);

        EducationDetail education =
                educationDetailRepository.findById(educationId)
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Education record not found"
                        ));

        if (!education.getProfile().getId().equals(profile.getId())) {
            throw new IllegalArgumentException(
                    "You are not allowed to delete this education record"
            );
        }

        educationDetailRepository.delete(education);
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

    private EducationDetailResponse toResponse(
            EducationDetail education) {

        EducationDetailResponse response =
                new EducationDetailResponse();

        response.setId(education.getId());

        response.setEducationLevel(
                education.getEducationLevel()
        );

        response.setEducationStream(
                education.getEducationStream()
        );

        response.setQualification(
                education.getQualification()
        );

        response.setSpecialization(
                education.getSpecialization()
        );

        response.setInstituteName(
                education.getInstituteName()
        );

        response.setPassingYear(
                education.getPassingYear()
        );

        response.setCreatedAt(
                education.getCreatedAt()
        );

        response.setUpdatedAt(
                education.getUpdatedAt()
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