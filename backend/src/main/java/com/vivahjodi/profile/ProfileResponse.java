package com.vivahjodi.profile;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.UUID;

public class ProfileResponse {

    private UUID id;
    private UUID userId;

    // =========================================================
    // BASIC INFORMATION
    // =========================================================

    private String profileCode;

    private String firstName;
    private String middleName;
    private String lastName;

    private String gender;
    private LocalDate dateOfBirth;
    private LocalTime timeOfBirth;
    private String birthPlace;

    private String maritalStatus;

    private Integer heightCm;
    private Integer weightKg;

    private Integer numberOfChildren;

    private String motherTongue;

    private String bloodGroup;
    private String complexion;
    private String bodyType;

    private Boolean physicalDisability;
    private String disabilityDetails;


    // =========================================================
    // RELIGION / COMMUNITY INFORMATION
    // =========================================================

    private String religion;
    private String caste;
    private String subCaste;

    private String gotra;
    private String zodiacSign;
    private String nakshatra;
    private String manglikStatus;


    // =========================================================
    // LIFESTYLE INFORMATION
    // =========================================================

    private String eatingHabits;
    private String drinkingHabits;
    private String smokingHabits;


    // =========================================================
    // CURRENT LOCATION INFORMATION
    // =========================================================

    private String currentCountry;
    private String currentAddress;
    private String currentPincode;


    // =========================================================
    // NATIVE PLACE INFORMATION
    // =========================================================

    private String nativePlace;

    private String nativeCountry;
    private String nativeState;
    private String nativeDistrict;
    private String nativeTaluka;
    private String nativeCity;

    /*
     * Legacy location fields retained for compatibility
     * with the existing profile contract.
     */
    private String state;
    private String district;
    private String taluka;
    private String city;


    // =========================================================
    // NRI INFORMATION
    // =========================================================

    private Boolean nri;

    private String livingCountry;
    private String nriAddress;


    // =========================================================
    // PROFILE VISIBILITY / REVIEW INFORMATION
    // =========================================================

    private String visibility;

    private OffsetDateTime submittedAt;
    private OffsetDateTime verifiedAt;

    private String rejectionReason;


    // =========================================================
    // ABOUT / STATUS
    // =========================================================

    private String aboutMe;
    private String profileStatus;


    // =========================================================
    // TIMESTAMPS
    // =========================================================

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;


    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public ProfileResponse() {
    }


    // =========================================================
    // ID
    // =========================================================

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }


    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }


    // =========================================================
    // BASIC INFORMATION
    // =========================================================

    public String getProfileCode() {
        return profileCode;
    }

    public void setProfileCode(String profileCode) {
        this.profileCode = profileCode;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }


    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }


    public LocalTime getTimeOfBirth() {
        return timeOfBirth;
    }

    public void setTimeOfBirth(LocalTime timeOfBirth) {
        this.timeOfBirth = timeOfBirth;
    }


    public String getBirthPlace() {
        return birthPlace;
    }

    public void setBirthPlace(String birthPlace) {
        this.birthPlace = birthPlace;
    }


    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }


    public Integer getHeightCm() {
        return heightCm;
    }

    public void setHeightCm(Integer heightCm) {
        this.heightCm = heightCm;
    }


    public Integer getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(Integer weightKg) {
        this.weightKg = weightKg;
    }


    public Integer getNumberOfChildren() {
        return numberOfChildren;
    }

    public void setNumberOfChildren(Integer numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
    }


    public String getMotherTongue() {
        return motherTongue;
    }

    public void setMotherTongue(String motherTongue) {
        this.motherTongue = motherTongue;
    }


    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }


    public String getComplexion() {
        return complexion;
    }

    public void setComplexion(String complexion) {
        this.complexion = complexion;
    }


    public String getBodyType() {
        return bodyType;
    }

    public void setBodyType(String bodyType) {
        this.bodyType = bodyType;
    }


    public Boolean getPhysicalDisability() {
        return physicalDisability;
    }

    public void setPhysicalDisability(Boolean physicalDisability) {
        this.physicalDisability = physicalDisability;
    }


    public String getDisabilityDetails() {
        return disabilityDetails;
    }

    public void setDisabilityDetails(String disabilityDetails) {
        this.disabilityDetails = disabilityDetails;
    }


    // =========================================================
    // RELIGION / COMMUNITY INFORMATION
    // =========================================================

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }


    public String getCaste() {
        return caste;
    }

    public void setCaste(String caste) {
        this.caste = caste;
    }


    public String getSubCaste() {
        return subCaste;
    }

    public void setSubCaste(String subCaste) {
        this.subCaste = subCaste;
    }


    public String getGotra() {
        return gotra;
    }

    public void setGotra(String gotra) {
        this.gotra = gotra;
    }


    public String getZodiacSign() {
        return zodiacSign;
    }

    public void setZodiacSign(String zodiacSign) {
        this.zodiacSign = zodiacSign;
    }


    public String getNakshatra() {
        return nakshatra;
    }

    public void setNakshatra(String nakshatra) {
        this.nakshatra = nakshatra;
    }


    public String getManglikStatus() {
        return manglikStatus;
    }

    public void setManglikStatus(String manglikStatus) {
        this.manglikStatus = manglikStatus;
    }


    // =========================================================
    // LIFESTYLE INFORMATION
    // =========================================================

    public String getEatingHabits() {
        return eatingHabits;
    }

    public void setEatingHabits(String eatingHabits) {
        this.eatingHabits = eatingHabits;
    }


    public String getDrinkingHabits() {
        return drinkingHabits;
    }

    public void setDrinkingHabits(String drinkingHabits) {
        this.drinkingHabits = drinkingHabits;
    }


    public String getSmokingHabits() {
        return smokingHabits;
    }

    public void setSmokingHabits(String smokingHabits) {
        this.smokingHabits = smokingHabits;
    }


    // =========================================================
    // CURRENT LOCATION INFORMATION
    // =========================================================

    public String getCurrentCountry() {
        return currentCountry;
    }

    public void setCurrentCountry(String currentCountry) {
        this.currentCountry = currentCountry;
    }


    public String getCurrentAddress() {
        return currentAddress;
    }

    public void setCurrentAddress(String currentAddress) {
        this.currentAddress = currentAddress;
    }


    public String getCurrentPincode() {
        return currentPincode;
    }

    public void setCurrentPincode(String currentPincode) {
        this.currentPincode = currentPincode;
    }


    // =========================================================
    // NATIVE PLACE INFORMATION
    // =========================================================

    public String getNativePlace() {
        return nativePlace;
    }

    public void setNativePlace(String nativePlace) {
        this.nativePlace = nativePlace;
    }


    public String getNativeCountry() {
        return nativeCountry;
    }

    public void setNativeCountry(String nativeCountry) {
        this.nativeCountry = nativeCountry;
    }


    public String getNativeState() {
        return nativeState;
    }

    public void setNativeState(String nativeState) {
        this.nativeState = nativeState;
    }


    public String getNativeDistrict() {
        return nativeDistrict;
    }

    public void setNativeDistrict(String nativeDistrict) {
        this.nativeDistrict = nativeDistrict;
    }


    public String getNativeTaluka() {
        return nativeTaluka;
    }

    public void setNativeTaluka(String nativeTaluka) {
        this.nativeTaluka = nativeTaluka;
    }


    public String getNativeCity() {
        return nativeCity;
    }

    public void setNativeCity(String nativeCity) {
        this.nativeCity = nativeCity;
    }


    // =========================================================
    // LEGACY LOCATION INFORMATION
    // =========================================================

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }


    public String getTaluka() {
        return taluka;
    }

    public void setTaluka(String taluka) {
        this.taluka = taluka;
    }


    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    // =========================================================
    // NRI INFORMATION
    // =========================================================

    public Boolean getNri() {
        return nri;
    }

    public void setNri(Boolean nri) {
        this.nri = nri;
    }


    public String getLivingCountry() {
        return livingCountry;
    }

    public void setLivingCountry(String livingCountry) {
        this.livingCountry = livingCountry;
    }


    public String getNriAddress() {
        return nriAddress;
    }

    public void setNriAddress(String nriAddress) {
        this.nriAddress = nriAddress;
    }


    // =========================================================
    // PROFILE VISIBILITY / REVIEW INFORMATION
    // =========================================================

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }


    public OffsetDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(OffsetDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }


    public OffsetDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public void setVerifiedAt(OffsetDateTime verifiedAt) {
        this.verifiedAt = verifiedAt;
    }


    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }


    // =========================================================
    // ABOUT / STATUS
    // =========================================================

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }


    public String getProfileStatus() {
        return profileStatus;
    }

    public void setProfileStatus(String profileStatus) {
        this.profileStatus = profileStatus;
    }


    // =========================================================
    // TIMESTAMPS
    // =========================================================

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }


    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}