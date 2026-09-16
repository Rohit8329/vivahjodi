package com.vivahjodi.profile.education;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class EducationDetailRequest {

    @Size(max = 100)
    private String educationLevel;

    @Size(max = 100)
    private String educationStream;

    @Size(max = 200)
    private String qualification;

    @Size(max = 200)
    private String specialization;

    @Size(max = 250)
    private String instituteName;

    @Min(1900)
    @Max(2100)
    private Integer passingYear;

    public EducationDetailRequest() {
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public String getEducationStream() {
        return educationStream;
    }

    public void setEducationStream(String educationStream) {
        this.educationStream = educationStream;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getInstituteName() {
        return instituteName;
    }

    public void setInstituteName(String instituteName) {
        this.instituteName = instituteName;
    }

    public Integer getPassingYear() {
        return passingYear;
    }

    public void setPassingYear(Integer passingYear) {
        this.passingYear = passingYear;
    }
}
