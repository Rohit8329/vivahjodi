package com.vivahjodi.profile.occupation;

import com.vivahjodi.profile.Profile;
import jakarta.persistence.*;

import java.time.OffsetDateTime;
import java.util.UUID;

import java.math.BigDecimal;

@Entity
@Table(name = "occupation_details")
public class OccupationDetail {

    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "profile_id", nullable = false, unique = true)
    private Profile profile;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "designation")
    private String designation;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "employment_type")
    private String employmentType;

    @Column(name = "work_city")
    private String workCity;

    @Column(name = "work_state")
    private String workState;

    @Column(name = "annual_income_inr")
    private BigDecimal annualIncomeInr;

    @Column(name = "business_details")
    private String businessDetails;

    @Column(name = "sub_occupation")
    private String subOccupation;

    @Column(name = "employed_in")
    private String employedIn;

    @Column(name = "work_location")
    private String workLocation;

    @Column(name = "annual_income")
    private BigDecimal annualIncome;

    @Column(name = "income_currency")
    private String incomeCurrency = "INR";

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
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

    public BigDecimal getAnnualIncomeInr() {
        return annualIncomeInr;
    }

    public void setAnnualIncomeInr(BigDecimal annualIncomeInr) {
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

    public BigDecimal getAnnualIncome() {
        return annualIncome;
    }

    public void setAnnualIncome(BigDecimal annualIncome) {
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