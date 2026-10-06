package com.vivahjodi.search;

public class ProfileSearchRequest {
    private String religion;

    private String gender;

    private String maritalStatus;

    private String motherTongue;

    private String complexion;

    private String bodyType;

    private Integer minHeightCm;

    private Integer maxHeightCm;

    private Boolean physicalDisability;

    private Integer minAge;

    private Integer maxAge;

    private String caste;

    private String subCaste;

    private String education;

    private String city;

    private String occupation;

    private java.math.BigDecimal minIncome;

    private java.math.BigDecimal maxIncome;

    private String zodiacSign;

    private String manglikStatus;

    private String eatingHabits;

    private String smokingHabits;

    private String drinkingHabits;

    private Boolean nri;

    private String nriCountry;

    private String currentCountry;

    private String currentAddress;

    private String currentPincode;

    private String currentState;

    private String currentDistrict;

    private String currentTaluka;

    private String currentCity;
    
    private String nativeState;

    private String nativeDistrict;

    private String nativeTaluka;

    private String nativeCity;

    private String nakshatra;

    private Integer page = 0;

    private Integer size = 20;


    public Boolean getNri() {
        return nri;
    }

    public void setNri(Boolean nri) {
        this.nri = nri;
    }

    public String getNriCountry() {
        return nriCountry;
    }

    public void setNriCountry(String nriCountry) {
        this.nriCountry = nriCountry;
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




    public void setCurrentPincode(String currentPincode) {
        this.currentPincode = currentPincode;
    }


    public String getReligion() {
       return religion;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Integer getMinAge() {
        return minAge;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public void setMinAge(Integer minAge) {
        this.minAge = minAge;
    }

    public Integer getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(Integer maxAge) {
        this.maxAge = maxAge;
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

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
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

    public Integer getMinHeightCm() {
        return minHeightCm;
    }

    public void setMinHeightCm(Integer minHeightCm) {
        this.minHeightCm = minHeightCm;
    }

    public Integer getMaxHeightCm() {
        return maxHeightCm;
    }

    public void setMaxHeightCm(Integer maxHeightCm) {
        this.maxHeightCm = maxHeightCm;
    }

    public Boolean getPhysicalDisability() {
        return physicalDisability;
    }

    public void setPhysicalDisability(Boolean physicalDisability) {
        this.physicalDisability = physicalDisability;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public java.math.BigDecimal getMinIncome() {
        return minIncome;
    }

    public void setMinIncome(java.math.BigDecimal minIncome) {
        this.minIncome = minIncome;
    }

    public java.math.BigDecimal getMaxIncome() {
        return maxIncome;
    }

    public void setMaxIncome(java.math.BigDecimal maxIncome) {
        this.maxIncome = maxIncome;
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

    public String getEatingHabits() {
        return eatingHabits;
    }

    public void setEatingHabits(String eatingHabits) {
        this.eatingHabits = eatingHabits;
    }


    public String getSmokingHabits() {
        return smokingHabits;
    }

    public void setSmokingHabits(String smokingHabits) {
        this.smokingHabits = smokingHabits;
    }

    public String getDrinkingHabits() {
        return drinkingHabits;
    }

    public void setDrinkingHabits(String drinkingHabits) {
        this.drinkingHabits = drinkingHabits;
    }







    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }
}
