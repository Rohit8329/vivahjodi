package com.vivahjodi.profile;

public class ProfileViewEducationResponse {

    private String educationLevel;
    private String educationStream;
    private String qualification;
    private String specialization;
    private String instituteName;
    private Integer passingYear;

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