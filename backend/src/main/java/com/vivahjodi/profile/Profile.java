package com.vivahjodi.profile;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    private com.vivahjodi.user.User user;

    // =========================================================
    // PROFILE IDENTITY
    // =========================================================

    @Column(
            name = "profile_code",
            unique = true,
            length = 20
    )
    private String profileCode;

    // =========================================================
    // BASIC INFORMATION
    // =========================================================

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "middle_name", length = 100)
    private String middleName;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(name = "gender", nullable = false, length = 20)
    private String gender;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "time_of_birth")
    private LocalTime timeOfBirth;

    @Column(name = "birth_place", length = 150)
    private String birthPlace;

    @Column(name = "marital_status", nullable = false, length = 30)
    private String maritalStatus;

    @Column(name = "number_of_children")
    private Integer numberOfChildren;

    @Column(name = "height_cm")
    private Integer heightCm;

    @Column(name = "weight_kg")
    private Integer weightKg;

    @Column(name = "mother_tongue", length = 50)
    private String motherTongue;

    @Column(name = "blood_group", length = 20)
    private String bloodGroup;

    @Column(name = "complexion", length = 50)
    private String complexion;

    @Column(name = "body_type", length = 50)
    private String bodyType;

    // =========================================================
    // RELIGION / COMMUNITY INFORMATION
    // =========================================================

    @Column(name = "religion", length = 50)
    private String religion;

    @Column(name = "caste", length = 100)
    private String caste;

    @Column(name = "sub_caste", length = 100)
    private String subCaste;

    @Column(name = "gotra", length = 100)
    private String gotra;

    @Column(name = "zodiac_sign", length = 50)
    private String zodiacSign;

    @Column(name = "nakshatra", length = 100)
    private String nakshatra;

    @Column(name = "manglik_status", length = 50)
    private String manglikStatus;

    // =========================================================
    // PHYSICAL DISABILITY
    // =========================================================

    @Column(
            name = "physical_disability",
            nullable = false
    )
    private boolean physicalDisability = false;

    @Column(name = "disability_details", length = 500)
    private String disabilityDetails;

    // =========================================================
    // LIFESTYLE
    // =========================================================

    @Column(name = "eating_habits", length = 50)
    private String eatingHabits;

    @Column(name = "drinking_habits", length = 50)
    private String drinkingHabits;

    @Column(name = "smoking_habits", length = 50)
    private String smokingHabits;

    // =========================================================
    // CURRENT LOCATION
    // =========================================================

    @Column(
            name = "current_country",
            nullable = false,
            length = 100
    )
    private String currentCountry = "India";

    @Column(name = "current_address", length = 500)
    private String currentAddress;

    @Column(name = "current_pincode", length = 20)
    private String currentPincode;

    // =========================================================
    // NATIVE PLACE
    // =========================================================

    @Column(
            name = "native_country",
            nullable = false,
            length = 100
    )
    private String nativeCountry = "India";

    @Column(name = "native_state", length = 100)
    private String nativeState;

    @Column(name = "native_district", length = 100)
    private String nativeDistrict;

    @Column(name = "native_taluka", length = 100)
    private String nativeTaluka;

    @Column(name = "native_city", length = 100)
    private String nativeCity;

    // =========================================================
    // NRI INFORMATION
    // =========================================================

    @Column(
            name = "is_nri",
            nullable = false
    )
    private boolean nri = false;

    @Column(name = "living_country", length = 100)
    private String livingCountry;

    @Column(name = "nri_address", length = 500)
    private String nriAddress;

    // =========================================================
    // LEGACY / PRIMARY LOCATION FIELDS
    //
    // Kept because these fields already exist in V5 and are
    // currently used by the existing profile API.
    // =========================================================

    @Column(name = "native_place", length = 150)
    private String nativePlace;

    @Column(name = "state", length = 100)
    private String state;

    @Column(name = "district", length = 100)
    private String district;

    @Column(name = "taluka", length = 100)
    private String taluka;

    @Column(name = "city", length = 100)
    private String city;

    // =========================================================
    // ABOUT ME
    // =========================================================

    @Column(name = "about_me", columnDefinition = "TEXT")
    private String aboutMe;

    // =========================================================
    // VISIBILITY / REVIEW STATUS
    // =========================================================

    @Column(
            name = "visibility",
            nullable = false,
            length = 30
    )
    private String visibility = "PRIVATE";

    @Column(name = "submitted_at")
    private OffsetDateTime submittedAt;

    @Column(name = "verified_at")
    private OffsetDateTime verifiedAt;

    @Column(name = "rejection_reason", length = 500)
    private String rejectionReason;

    // =========================================================
    // PROFILE STATUS / TIMESTAMPS
    // =========================================================

    @Column(
            name = "profile_status",
            nullable = false,
            length = 30
    )
    private String profileStatus;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public Profile() {
    }

    // =========================================================
    // GETTERS AND SETTERS
    // =========================================================

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public com.vivahjodi.user.User getUser() {
        return user;
    }

    public void setUser(com.vivahjodi.user.User user) {
        this.user = user;
    }

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

    public Integer getNumberOfChildren() {
        return numberOfChildren;
    }

    public void setNumberOfChildren(Integer numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
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

    public String getNativePlace() {
        return nativePlace;
    }

    public void setNativePlace(String nativePlace) {
        this.nativePlace = nativePlace;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
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

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

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

    public String getProfileStatus() {
        return profileStatus;
    }

    public void setProfileStatus(String profileStatus) {
        this.profileStatus = profileStatus;
    }

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