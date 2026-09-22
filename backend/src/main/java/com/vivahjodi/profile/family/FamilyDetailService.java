package com.vivahjodi.profile.family;

import com.vivahjodi.profile.Profile;
import com.vivahjodi.profile.ProfileRepository;
import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class FamilyDetailService {

    private final FamilyDetailRepository familyDetailRepository;
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public FamilyDetailService(
            FamilyDetailRepository familyDetailRepository,
            ProfileRepository profileRepository,
            UserRepository userRepository
    ) {
        this.familyDetailRepository = familyDetailRepository;
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public FamilyDetailResponse getMyFamily(String email) {

        Profile profile = getProfileForUser(email);

        return familyDetailRepository
                .findByProfileId(profile.getId())
                .map(this::toResponse)
                .orElse(null);
    }

    public FamilyDetailResponse createOrUpdateFamily(
            String email,
            FamilyDetailRequest request
    ) {

        Profile profile = getProfileForUser(email);

        FamilyDetail familyDetail =
                familyDetailRepository
                        .findByProfileId(profile.getId())
                        .orElseGet(FamilyDetail::new);

        familyDetail.setProfile(profile);

        applyRequest(familyDetail, request);

        FamilyDetail saved =
                familyDetailRepository.save(familyDetail);

        return toResponse(saved);
    }

    public void deleteMyFamily(String email) {

        Profile profile = getProfileForUser(email);

        familyDetailRepository
                .findByProfileId(profile.getId())
                .ifPresent(familyDetail ->
                        familyDetailRepository.delete(familyDetail)
                );
    }

    private Profile getProfileForUser(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "वापरकर्ता सापडला नाही."
                        )
                );

        return profileRepository.findByUserId(user.getId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "प्रोफाइल सापडली नाही."
                        )
                );
    }

    private void applyRequest(
            FamilyDetail familyDetail,
            FamilyDetailRequest request
    ) {

        familyDetail.setFatherName(
                request.getFatherName()
        );

        familyDetail.setFatherOccupation(
                request.getFatherOccupation()
        );

        familyDetail.setMotherName(
                request.getMotherName()
        );

        familyDetail.setMotherOccupation(
                request.getMotherOccupation()
        );

        familyDetail.setFamilyType(
                request.getFamilyType()
        );

        familyDetail.setFamilyValues(
                request.getFamilyValues()
        );

        familyDetail.setFamilyStatus(
                request.getFamilyStatus()
        );

        familyDetail.setSiblingsCount(
                request.getSiblingsCount()
        );

        familyDetail.setBrothersCount(
                request.getBrothersCount()
        );

        familyDetail.setSistersCount(
                request.getSistersCount()
        );

        familyDetail.setNativePlace(
                request.getNativePlace()
        );

        familyDetail.setFamilyAbout(
                request.getFamilyAbout()
        );

        familyDetail.setNumberOfBrothers(
                request.getNumberOfBrothers()
        );

        familyDetail.setBrothersMarried(
                request.getBrothersMarried()
        );

        familyDetail.setNumberOfSisters(
                request.getNumberOfSisters()
        );

        familyDetail.setSistersMarried(
                request.getSistersMarried()
        );

        familyDetail.setParentalDetails(
                request.getParentalDetails()
        );
    }

    private FamilyDetailResponse toResponse(
            FamilyDetail familyDetail
    ) {

        FamilyDetailResponse response =
                new FamilyDetailResponse();

        response.setId(
                familyDetail.getId()
        );

        response.setProfileId(
                familyDetail.getProfile().getId()
        );

        response.setFatherName(
                familyDetail.getFatherName()
        );

        response.setFatherOccupation(
                familyDetail.getFatherOccupation()
        );

        response.setMotherName(
                familyDetail.getMotherName()
        );

        response.setMotherOccupation(
                familyDetail.getMotherOccupation()
        );

        response.setFamilyType(
                familyDetail.getFamilyType()
        );

        response.setFamilyValues(
                familyDetail.getFamilyValues()
        );

        response.setFamilyStatus(
                familyDetail.getFamilyStatus()
        );

        response.setSiblingsCount(
                familyDetail.getSiblingsCount()
        );

        response.setBrothersCount(
                familyDetail.getBrothersCount()
        );

        response.setSistersCount(
                familyDetail.getSistersCount()
        );

        response.setNativePlace(
                familyDetail.getNativePlace()
        );

        response.setFamilyAbout(
                familyDetail.getFamilyAbout()
        );

        response.setNumberOfBrothers(
                familyDetail.getNumberOfBrothers()
        );

        response.setBrothersMarried(
                familyDetail.getBrothersMarried()
        );

        response.setNumberOfSisters(
                familyDetail.getNumberOfSisters()
        );

        response.setSistersMarried(
                familyDetail.getSistersMarried()
        );

        response.setParentalDetails(
                familyDetail.getParentalDetails()
        );

        response.setCreatedAt(
                familyDetail.getCreatedAt()
        );

        response.setUpdatedAt(
                familyDetail.getUpdatedAt()
        );

        return response;
    }
}