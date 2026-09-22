package com.vivahjodi.profile.family;

import java.time.Instant;
import java.util.UUID;

public class FamilyDetailResponse {

    private UUID id;
    private UUID profileId;

    private String fatherName;
    private String fatherOccupation;

    private String motherName;
    private String motherOccupation;

    private String familyType;
    private String familyValues;
    private String familyStatus;

    private Integer siblingsCount;
    private Integer brothersCount;
    private Integer sistersCount;

    private String nativePlace;
    private String familyAbout;

    private Integer numberOfBrothers;
    private Integer brothersMarried;

    private Integer numberOfSisters;
    private Integer sistersMarried;

    private String parentalDetails;

    private Instant createdAt;
    private Instant updatedAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getProfileId() {
        return profileId;
    }

    public void setProfileId(UUID profileId) {
        this.profileId = profileId;
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

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}