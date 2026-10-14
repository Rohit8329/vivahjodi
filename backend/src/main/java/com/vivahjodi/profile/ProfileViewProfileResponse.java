package com.vivahjodi.profile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class ProfileViewProfileResponse {

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

    private Integer heightCm;
    private Integer weightKg;

    private String bloodGroup;
    private String bodyType;
    private String complexion;

    private String maritalStatus;
    private String motherTongue;

    private Integer numberOfChildren;

    private String eatingHabits;
    private String drinkingHabits;
    private String smokingHabits;

    private boolean physicalDisability;
    private String disabilityDetails;

    // =========================================================
    // RELIGIOUS INFORMATION
    // =========================================================

    private String religion;
    private String caste;
    private String subCaste;

    private String gotra;
    private String zodiacSign;
    private String nakshatra;
    private String manglikStatus;

    // =========================================================
    // FAMILY INFORMATION
    // =========================================================

    private ProfileViewFamilyResponse family;

    // =========================================================
    // EDUCATION
    // =========================================================

    private ProfileViewEducationResponse education;

    // =========================================================
    // OCCUPATION
    // =========================================================

    private ProfileViewOccupationResponse occupation;

    // =========================================================
    // CURRENT LOCATION
    // =========================================================

    private String currentCountry;
    private String currentAddress;
    private String currentPincode;

    private String currentState;
    private String currentDistrict;
    private String currentTaluka;
    private String currentCity;

    // =========================================================
    // NATIVE LOCATION
    // =========================================================

    private String nativeCountry;
    private String nativePlace;

    private String nativeState;
    private String nativeDistrict;
    private String nativeTaluka;
    private String nativeCity;

    // =========================================================
    // NRI
    // =========================================================

    private boolean nri;
    private String livingCountry;
    private String nriAddress;

    // =========================================================
    // ABOUT ME
    // =========================================================

    private String aboutMe;

    // =========================================================
    // PARTNER PREFERENCES
    // =========================================================

    private Integer partnerMinAge;
    private Integer partnerMaxAge;

    private Integer partnerMinHeightCm;
    private Integer partnerMaxHeightCm;

    private String partnerMotherTongue;
    private String partnerMaritalStatus;

    private String partnerReligion;
    private String partnerCaste;
    private String partnerSubCaste;

    private String partnerManglikStatus;
    private String partnerNakshatra;
    private String partnerZodiacSign;

    private String partnerEducation;
    private String partnerOccupation;

    private BigDecimal partnerMinIncome;
    private BigDecimal partnerMaxIncome;

    private String partnerAbout;

    // =========================================================
    // GETTERS / SETTERS
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

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getBodyType() {
        return bodyType;
    }

    public void setBodyType(String bodyType) {
        this.bodyType = bodyType;
    }

    public String getComplexion() {
        return complexion;
    }

    public void setComplexion(String complexion) {
        this.complexion = complexion;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getMotherTongue() {
        return motherTongue;
    }

    public void setMotherTongue(String motherTongue) {
        this.motherTongue = motherTongue;
    }

    public Integer getNumberOfChildren() {
        return numberOfChildren;
    }

    public void setNumberOfChildren(Integer numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
    }

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

    public boolean isPhysicalDisability() {
        return physicalDisability;
    }

    public void setPhysicalDisability(boolean physicalDisability) {
        this.physicalDisability = physicalDisability;
    }

    public String getDisabilityDetails() {
        return disabilityDetails;
    }

    public void setDisabilityDetails(String disabilityDetails) {
        this.disabilityDetails = disabilityDetails;
    }

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

public ProfileViewFamilyResponse getFamily() {
    return family;
}

public void setFamily(ProfileViewFamilyResponse family) {
    this.family = family;
}

public ProfileViewEducationResponse getEducation() {
    return education;
}

public void setEducation(ProfileViewEducationResponse education) {
    this.education = education;
}

public ProfileViewOccupationResponse getOccupation() {
    return occupation;
}

public void setOccupation(ProfileViewOccupationResponse occupation) {
    this.occupation = occupation;
}

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

    public String getCurrentState() {
        return currentState;
    }

    public void setCurrentState(String currentState) {
        this.currentState = currentState;
    }

    public String getCurrentDistrict() {
        return currentDistrict;
    }

    public void setCurrentDistrict(String currentDistrict) {
        this.currentDistrict = currentDistrict;
    }

    public String getCurrentTaluka() {
        return currentTaluka;
    }

    public void setCurrentTaluka(String currentTaluka) {
        this.currentTaluka = currentTaluka;
    }

    public String getCurrentCity() {
        return currentCity;
    }

    public void setCurrentCity(String currentCity) {
        this.currentCity = currentCity;
    }

    public String getNativeCountry() {
        return nativeCountry;
    }

    public void setNativeCountry(String nativeCountry) {
        this.nativeCountry = nativeCountry;
    }

    public String getNativePlace() {
        return nativePlace;
    }

    public void setNativePlace(String nativePlace) {
        this.nativePlace = nativePlace;
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

    public boolean isNri() {
        return nri;
    }

    public void setNri(boolean nri) {
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

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public Integer getPartnerMinAge() {
        return partnerMinAge;
    }

    public void setPartnerMinAge(Integer partnerMinAge) {
        this.partnerMinAge = partnerMinAge;
    }

    public Integer getPartnerMaxAge() {
        return partnerMaxAge;
    }

    public void setPartnerMaxAge(Integer partnerMaxAge) {
        this.partnerMaxAge = partnerMaxAge;
    }

    public Integer getPartnerMinHeightCm() {
        return partnerMinHeightCm;
    }

    public void setPartnerMinHeightCm(Integer partnerMinHeightCm) {
        this.partnerMinHeightCm = partnerMinHeightCm;
    }

    public Integer getPartnerMaxHeightCm() {
        return partnerMaxHeightCm;
    }

    public void setPartnerMaxHeightCm(Integer partnerMaxHeightCm) {
        this.partnerMaxHeightCm = partnerMaxHeightCm;
    }

    public String getPartnerMotherTongue() {
        return partnerMotherTongue;
    }

    public void setPartnerMotherTongue(String partnerMotherTongue) {
        this.partnerMotherTongue = partnerMotherTongue;
    }

    public String getPartnerMaritalStatus() {
        return partnerMaritalStatus;
    }

    public void setPartnerMaritalStatus(String partnerMaritalStatus) {
        this.partnerMaritalStatus = partnerMaritalStatus;
    }

    public String getPartnerReligion() {
        return partnerReligion;
    }

    public void setPartnerReligion(String partnerReligion) {
        this.partnerReligion = partnerReligion;
    }

    public String getPartnerCaste() {
        return partnerCaste;
    }

    public void setPartnerCaste(String partnerCaste) {
        this.partnerCaste = partnerCaste;
    }

    public String getPartnerSubCaste() {
        return partnerSubCaste;
    }

    public void setPartnerSubCaste(String partnerSubCaste) {
        this.partnerSubCaste = partnerSubCaste;
    }

    public String getPartnerManglikStatus() {
        return partnerManglikStatus;
    }

    public void setPartnerManglikStatus(String partnerManglikStatus) {
        this.partnerManglikStatus = partnerManglikStatus;
    }

    public String getPartnerNakshatra() {
        return partnerNakshatra;
    }

    public void setPartnerNakshatra(String partnerNakshatra) {
        this.partnerNakshatra = partnerNakshatra;
    }

    public String getPartnerZodiacSign() {
        return partnerZodiacSign;
    }

    public void setPartnerZodiacSign(String partnerZodiacSign) {
        this.partnerZodiacSign = partnerZodiacSign;
    }

    public String getPartnerEducation() {
        return partnerEducation;
    }

    public void setPartnerEducation(String partnerEducation) {
        this.partnerEducation = partnerEducation;
    }

    public String getPartnerOccupation() {
        return partnerOccupation;
    }

    public void setPartnerOccupation(String partnerOccupation) {
        this.partnerOccupation = partnerOccupation;
    }

    public BigDecimal getPartnerMinIncome() {
        return partnerMinIncome;
    }

    public void setPartnerMinIncome(BigDecimal partnerMinIncome) {
        this.partnerMinIncome = partnerMinIncome;
    }

    public BigDecimal getPartnerMaxIncome() {
        return partnerMaxIncome;
    }

    public void setPartnerMaxIncome(BigDecimal partnerMaxIncome) {
        this.partnerMaxIncome = partnerMaxIncome;
    }

    public String getPartnerAbout() {
        return partnerAbout;
    }

    public void setPartnerAbout(String partnerAbout) {
        this.partnerAbout = partnerAbout;
    }
}