package com.vivahjodi.profile.family;

import com.vivahjodi.profile.Profile;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
    name = "family_details",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_family_details_profile",
            columnNames = "profile_id"
        )
    }
)
public class FamilyDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "profile_id",
        nullable = false,
        unique = true
    )
    private Profile profile;

    @Column(name = "father_name", length = 255)
    private String fatherName;

    @Column(name = "father_occupation", length = 255)
    private String fatherOccupation;

    @Column(name = "mother_name", length = 255)
    private String motherName;

    @Column(name = "mother_occupation", length = 255)
    private String motherOccupation;

    @Column(name = "family_type", length = 100)
    private String familyType;

    @Column(name = "family_values", length = 100)
    private String familyValues;

    @Column(name = "family_status", length = 100)
    private String familyStatus;

    @Column(name = "siblings_count")
    private Integer siblingsCount;

    @Column(name = "brothers_count")
    private Integer brothersCount;

    @Column(name = "sisters_count")
    private Integer sistersCount;

    @Column(name = "native_place", length = 255)
    private String nativePlace;

    @Column(name = "family_about", columnDefinition = "TEXT")
    private String familyAbout;

    @Column(name = "number_of_brothers")
    private Integer numberOfBrothers;

    @Column(name = "brothers_married")
    private Integer brothersMarried;

    @Column(name = "number_of_sisters")
    private Integer numberOfSisters;

    @Column(name = "sisters_married")
    private Integer sistersMarried;

    @Column(name = "parental_details", columnDefinition = "TEXT")
    private String parentalDetails;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getFatherOccupation() {
        return fatherOccupation;
    }

    public void setFatherOccupation(String fatherOccupation) {
        this.fatherOccupation = fatherOccupation;
    }

    public String getMotherName() {
        return motherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public String getMotherOccupation() {
        return motherOccupation;
    }

    public void setMotherOccupation(String motherOccupation) {
        this.motherOccupation = motherOccupation;
    }

    public String getFamilyType() {
        return familyType;
    }

    public void setFamilyType(String familyType) {
        this.familyType = familyType;
    }

    public String getFamilyValues() {
        return familyValues;
    }

    public void setFamilyValues(String familyValues) {
        this.familyValues = familyValues;
    }

    public String getFamilyStatus() {
        return familyStatus;
    }

    public void setFamilyStatus(String familyStatus) {
        this.familyStatus = familyStatus;
    }

    public Integer getSiblingsCount() {
        return siblingsCount;
    }

    public void setSiblingsCount(Integer siblingsCount) {
        this.siblingsCount = siblingsCount;
    }

    public Integer getBrothersCount() {
        return brothersCount;
    }

    public void setBrothersCount(Integer brothersCount) {
        this.brothersCount = brothersCount;
    }

    public Integer getSistersCount() {
        return sistersCount;
    }

    public void setSistersCount(Integer sistersCount) {
        this.sistersCount = sistersCount;
    }

    public String getNativePlace() {
        return nativePlace;
    }

    public void setNativePlace(String nativePlace) {
        this.nativePlace = nativePlace;
    }

    public String getFamilyAbout() {
        return familyAbout;
    }

    public void setFamilyAbout(String familyAbout) {
        this.familyAbout = familyAbout;
    }

    public Integer getNumberOfBrothers() {
        return numberOfBrothers;
    }

    public void setNumberOfBrothers(Integer numberOfBrothers) {
        this.numberOfBrothers = numberOfBrothers;
    }

    public Integer getBrothersMarried() {
        return brothersMarried;
    }

    public void setBrothersMarried(Integer brothersMarried) {
        this.brothersMarried = brothersMarried;
    }

    public Integer getNumberOfSisters() {
        return numberOfSisters;
    }

    public void setNumberOfSisters(Integer numberOfSisters) {
        this.numberOfSisters = numberOfSisters;
    }

    public Integer getSistersMarried() {
        return sistersMarried;
    }

    public void setSistersMarried(Integer sistersMarried) {
        this.sistersMarried = sistersMarried;
    }

    public String getParentalDetails() {
        return parentalDetails;
    }

    public void setParentalDetails(String parentalDetails) {
        this.parentalDetails = parentalDetails;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}