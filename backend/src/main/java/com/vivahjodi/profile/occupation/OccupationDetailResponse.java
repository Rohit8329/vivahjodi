package com.vivahjodi.profile.occupation;

import java.time.OffsetDateTime;
import java.util.UUID;

public class OccupationDetailResponse {

    private UUID id;
    private UUID profileId;

    private String occupation;
    private String designation;
    private String companyName;
    private String employmentType;

    private String workCity;
    private String workState;

    private Long annualIncomeInr;

    private String businessDetails;
    private String subOccupation;
    private String employedIn;
    private String workLocation;

    private String annualIncome;
    private String incomeCurrency;

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;


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

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType;
    }

    public String getWorkCity() {
        return workCity;
    }

    public void setWorkCity(String workCity) {
        this.workCity = workCity;
    }

    public String getWorkState() {
        return workState;
    }

    public void setWorkState(String workState) {
        this.workState = workState;
    }

    public Long getAnnualIncomeInr() {
        return annualIncomeInr;
    }

    public void setAnnualIncomeInr(Long annualIncomeInr) {
        this.annualIncomeInr = annualIncomeInr;
    }

    public String getBusinessDetails() {
        return businessDetails;
    }

    public void setBusinessDetails(String businessDetails) {
        this.businessDetails = businessDetails;
    }

    public String getSubOccupation() {
        return subOccupation;
    }

    public void setSubOccupation(String subOccupation) {
        this.subOccupation = subOccupation;
    }

    public String getEmployedIn() {
        return employedIn;
    }

    public void setEmployedIn(String employedIn) {
        this.employedIn = employedIn;
    }

    public String getWorkLocation() {
        return workLocation;
    }

    public void setWorkLocation(String workLocation) {
        this.workLocation = workLocation;
    }

    public String getAnnualIncome() {
        return annualIncome;
    }

    public void setAnnualIncome(String annualIncome) {
        this.annualIncome = annualIncome;
    }

    public String getIncomeCurrency() {
        return incomeCurrency;
    }

    public void setIncomeCurrency(String incomeCurrency) {
        this.incomeCurrency = incomeCurrency;
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