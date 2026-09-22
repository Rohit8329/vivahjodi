package com.vivahjodi.profile.family;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class FamilyDetailRequest {

    @Size(max = 255)
    private String fatherName;

    @Size(max = 255)
    private String fatherOccupation;

    @Size(max = 255)
    private String motherName;

    @Size(max = 255)
    private String motherOccupation;

    @Size(max = 100)
    private String familyType;

    @Size(max = 100)
    private String familyValues;

    @Size(max = 100)
    private String familyStatus;

    @Min(0)
    @Max(50)
    private Integer siblingsCount;

    @Min(0)
    @Max(50)
    private Integer brothersCount;

    @Min(0)
    @Max(50)
    private Integer sistersCount;

    @Size(max = 255)
    private String nativePlace;

    @Size(max = 5000)
    private String familyAbout;

    @Min(0)
    @Max(50)
    private Integer numberOfBrothers;

    @Min(0)
    @Max(50)
    private Integer brothersMarried;

    @Min(0)
    @Max(50)
    private Integer numberOfSisters;

    @Min(0)
    @Max(50)
    private Integer sistersMarried;

    @Size(max = 5000)
    private String parentalDetails;

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
}