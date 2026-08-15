package com.schemesathi.dto;

public class UpdateProfileRequest {
    private String fullName;
    private Integer age;
    private String gender;
    private Integer stateId;
    private Integer districtId;
    private String ruralUrban;
    private String occupation;
    private Double annualIncome;
    private String education;
    private String maritalStatus;
    private String category;
    private Boolean isFarmer;
    private Boolean isStudent;
    private Boolean isBusinessOwner;
    private Boolean isSeniorCitizen;
    private Boolean hasDisability;
    private Double disabilityPercentage;
    private Boolean isPregnant;
    private Boolean isWidow;
    private Boolean isVeteran;
    private Integer childrenCount;
    private String aadhaarMasked;
    private String mobileNumber;
    private String profilePictureUrl;
    private String preferredLanguage;

    public UpdateProfileRequest() {}

    public UpdateProfileRequest(String fullName, Integer age, String gender, Integer stateId, Integer districtId,
                                String ruralUrban, String occupation, Double annualIncome, String education,
                                String maritalStatus, String category, Boolean isFarmer, Boolean isStudent,
                                Boolean isBusinessOwner, Boolean isSeniorCitizen, Boolean hasDisability,
                                Double disabilityPercentage, Boolean isPregnant, Boolean isWidow, Boolean isVeteran,
                                Integer childrenCount, String aadhaarMasked, String mobileNumber, String profilePictureUrl,
                                String preferredLanguage) {
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
        this.stateId = stateId;
        this.districtId = districtId;
        this.ruralUrban = ruralUrban;
        this.occupation = occupation;
        this.annualIncome = annualIncome;
        this.education = education;
        this.maritalStatus = maritalStatus;
        this.category = category;
        this.isFarmer = isFarmer;
        this.isStudent = isStudent;
        this.isBusinessOwner = isBusinessOwner;
        this.isSeniorCitizen = isSeniorCitizen;
        this.hasDisability = hasDisability;
        this.disabilityPercentage = disabilityPercentage;
        this.isPregnant = isPregnant;
        this.isWidow = isWidow;
        this.isVeteran = isVeteran;
        this.childrenCount = childrenCount;
        this.aadhaarMasked = aadhaarMasked;
        this.mobileNumber = mobileNumber;
        this.profilePictureUrl = profilePictureUrl;
        this.preferredLanguage = preferredLanguage;
    }

    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Integer getStateId() { return stateId; }
    public void setStateId(Integer stateId) { this.stateId = stateId; }

    public Integer getDistrictId() { return districtId; }
    public void setDistrictId(Integer districtId) { this.districtId = districtId; }

    public String getRuralUrban() { return ruralUrban; }
    public void setRuralUrban(String ruralUrban) { this.ruralUrban = ruralUrban; }

    public String getOccupation() { return occupation; }
    public void setOccupation(String occupation) { this.occupation = occupation; }

    public Double getAnnualIncome() { return annualIncome; }
    public void setAnnualIncome(Double annualIncome) { this.annualIncome = annualIncome; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Boolean getIsFarmer() { return isFarmer; }
    public void setIsFarmer(Boolean farmer) { isFarmer = farmer; }

    public Boolean getIsStudent() { return isStudent; }
    public void setIsStudent(Boolean student) { isStudent = student; }

    public Boolean getIsBusinessOwner() { return isBusinessOwner; }
    public void setIsBusinessOwner(Boolean businessOwner) { isBusinessOwner = businessOwner; }

    public Boolean getIsSeniorCitizen() { return isSeniorCitizen; }
    public void setIsSeniorCitizen(Boolean seniorCitizen) { isSeniorCitizen = seniorCitizen; }

    public Boolean getHasDisability() { return hasDisability; }
    public void setHasDisability(Boolean disability) { hasDisability = disability; }

    public Double getDisabilityPercentage() { return disabilityPercentage; }
    public void setDisabilityPercentage(Double disabilityPercentage) { this.disabilityPercentage = disabilityPercentage; }

    public Boolean getIsPregnant() { return isPregnant; }
    public void setIsPregnant(Boolean pregnant) { isPregnant = pregnant; }

    public Boolean getIsWidow() { return isWidow; }
    public void setIsWidow(Boolean widow) { isWidow = widow; }

    public Boolean getIsVeteran() { return isVeteran; }
    public void setIsVeteran(Boolean veteran) { isVeteran = veteran; }

    public Integer getChildrenCount() { return childrenCount; }
    public void setChildrenCount(Integer childrenCount) { this.childrenCount = childrenCount; }

    public String getAadhaarMasked() { return aadhaarMasked; }
    public void setAadhaarMasked(String aadhaarMasked) { this.aadhaarMasked = aadhaarMasked; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

    public String getProfilePictureUrl() { return profilePictureUrl; }
    public void setProfilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; }

    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }

    public static UpdateProfileRequestBuilder builder() {
        return new UpdateProfileRequestBuilder();
    }

    public static class UpdateProfileRequestBuilder {
        private String fullName;
        private Integer age;
        private String gender;
        private Integer stateId;
        private Integer districtId;
        private String ruralUrban;
        private String occupation;
        private Double annualIncome;
        private String education;
        private String maritalStatus;
        private String category;
        private Boolean isFarmer;
        private Boolean isStudent;
        private Boolean isBusinessOwner;
        private Boolean isSeniorCitizen;
        private Boolean hasDisability;
        private Double disabilityPercentage;
        private Boolean isPregnant;
        private Boolean isWidow;
        private Boolean isVeteran;
        private Integer childrenCount;
        private String aadhaarMasked;
        private String mobileNumber;
        private String profilePictureUrl;
        private String preferredLanguage;

        public UpdateProfileRequestBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UpdateProfileRequestBuilder age(Integer age) { this.age = age; return this; }
        public UpdateProfileRequestBuilder gender(String gender) { this.gender = gender; return this; }
        public UpdateProfileRequestBuilder stateId(Integer stateId) { this.stateId = stateId; return this; }
        public UpdateProfileRequestBuilder districtId(Integer districtId) { this.districtId = districtId; return this; }
        public UpdateProfileRequestBuilder ruralUrban(String ruralUrban) { this.ruralUrban = ruralUrban; return this; }
        public UpdateProfileRequestBuilder occupation(String occupation) { this.occupation = occupation; return this; }
        public UpdateProfileRequestBuilder annualIncome(Double annualIncome) { this.annualIncome = annualIncome; return this; }
        public UpdateProfileRequestBuilder education(String education) { this.education = education; return this; }
        public UpdateProfileRequestBuilder maritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; return this; }
        public UpdateProfileRequestBuilder category(String category) { this.category = category; return this; }
        public UpdateProfileRequestBuilder isFarmer(Boolean isFarmer) { this.isFarmer = isFarmer; return this; }
        public UpdateProfileRequestBuilder isStudent(Boolean isStudent) { this.isStudent = isStudent; return this; }
        public UpdateProfileRequestBuilder isBusinessOwner(Boolean isBusinessOwner) { this.isBusinessOwner = isBusinessOwner; return this; }
        public UpdateProfileRequestBuilder isSeniorCitizen(Boolean isSeniorCitizen) { this.isSeniorCitizen = isSeniorCitizen; return this; }
        public UpdateProfileRequestBuilder hasDisability(Boolean hasDisability) { this.hasDisability = hasDisability; return this; }
        public UpdateProfileRequestBuilder disabilityPercentage(Double disabilityPercentage) { this.disabilityPercentage = disabilityPercentage; return this; }
        public UpdateProfileRequestBuilder isPregnant(Boolean isPregnant) { this.isPregnant = isPregnant; return this; }
        public UpdateProfileRequestBuilder isWidow(Boolean isWidow) { this.isWidow = isWidow; return this; }
        public UpdateProfileRequestBuilder isVeteran(Boolean isVeteran) { this.isVeteran = isVeteran; return this; }
        public UpdateProfileRequestBuilder childrenCount(Integer childrenCount) { this.childrenCount = childrenCount; return this; }
        public UpdateProfileRequestBuilder aadhaarMasked(String aadhaarMasked) { this.aadhaarMasked = aadhaarMasked; return this; }
        public UpdateProfileRequestBuilder mobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; return this; }
        public UpdateProfileRequestBuilder profilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; return this; }
        public UpdateProfileRequestBuilder preferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; return this; }

        public UpdateProfileRequest build() {
            return new UpdateProfileRequest(fullName, age, gender, stateId, districtId, ruralUrban, occupation,
                    annualIncome, education, maritalStatus, category, isFarmer, isStudent, isBusinessOwner,
                    isSeniorCitizen, hasDisability, disabilityPercentage, isPregnant, isWidow, isVeteran,
                    childrenCount, aadhaarMasked, mobileNumber, profilePictureUrl, preferredLanguage);
        }
    }
}
