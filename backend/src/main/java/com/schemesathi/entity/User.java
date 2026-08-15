package com.schemesathi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    // Profile Details
    private Integer age;
    private String gender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id")
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id")
    private District district;

    @Column(name = "rural_urban", length = 20)
    private String ruralUrban; // RURAL, URBAN

    private String occupation;

    @Column(name = "annual_income")
    private Double annualIncome;

    private String education;

    @Column(name = "marital_status")
    private String maritalStatus;

    private String category; // GENERAL, OBC, SC, ST, EWS

    @Column(name = "is_farmer")
    private Boolean isFarmer = false;

    @Column(name = "is_student")
    private Boolean isStudent = false;

    @Column(name = "is_business_owner")
    private Boolean isBusinessOwner = false;

    @Column(name = "is_senior_citizen")
    private Boolean isSeniorCitizen = false;

    @Column(name = "has_disability")
    private Boolean hasDisability = false;

    @Column(name = "disability_percentage")
    private Double disabilityPercentage;

    @Column(name = "is_pregnant")
    private Boolean isPregnant = false;

    @Column(name = "is_widow")
    private Boolean isWidow = false;

    @Column(name = "is_veteran")
    private Boolean isVeteran = false;

    @Column(name = "children_count")
    private Integer childrenCount = 0;

    @Column(name = "aadhaar_masked", length = 20)
    private String aadhaarMasked;

    @Column(name = "mobile_number", length = 15)
    private String mobileNumber;

    @Column(name = "profile_picture_url")
    private String profilePictureUrl;

    @Column(name = "preferred_language", length = 10)
    private String preferredLanguage = "EN";

    private Boolean enabled = true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    public User() {}

    public User(Long id, String email, String password, String fullName, Integer age, String gender,
                State state, District district, String ruralUrban, String occupation, Double annualIncome,
                String education, String maritalStatus, String category, Boolean isFarmer, Boolean isStudent,
                Boolean isBusinessOwner, Boolean isSeniorCitizen, Boolean hasDisability, Double disabilityPercentage,
                Boolean isPregnant, Boolean isWidow, Boolean isVeteran, Integer childrenCount, String aadhaarMasked,
                String mobileNumber, String profilePictureUrl, String preferredLanguage, Boolean enabled, Set<Role> roles) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
        this.state = state;
        this.district = district;
        this.ruralUrban = ruralUrban;
        this.occupation = occupation;
        this.annualIncome = annualIncome;
        this.education = education;
        this.maritalStatus = maritalStatus;
        this.category = category;
        this.isFarmer = isFarmer != null ? isFarmer : false;
        this.isStudent = isStudent != null ? isStudent : false;
        this.isBusinessOwner = isBusinessOwner != null ? isBusinessOwner : false;
        this.isSeniorCitizen = isSeniorCitizen != null ? isSeniorCitizen : false;
        this.hasDisability = hasDisability != null ? hasDisability : false;
        this.disabilityPercentage = disabilityPercentage;
        this.isPregnant = isPregnant != null ? isPregnant : false;
        this.isWidow = isWidow != null ? isWidow : false;
        this.isVeteran = isVeteran != null ? isVeteran : false;
        this.childrenCount = childrenCount != null ? childrenCount : 0;
        this.aadhaarMasked = aadhaarMasked;
        this.mobileNumber = mobileNumber;
        this.profilePictureUrl = profilePictureUrl;
        this.preferredLanguage = preferredLanguage != null ? preferredLanguage : "EN";
        this.enabled = enabled != null ? enabled : true;
        this.roles = roles != null ? roles : new HashSet<>();
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public State getState() { return state; }
    public void setState(State state) { this.state = state; }

    public District getDistrict() { return district; }
    public void setDistrict(District district) { this.district = district; }

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
    public void setIsFarmer(Boolean farmer) { isFarmer = farmer != null ? farmer : false; }

    public Boolean getIsStudent() { return isStudent; }
    public void setIsStudent(Boolean student) { isStudent = student != null ? student : false; }

    public Boolean getIsBusinessOwner() { return isBusinessOwner; }
    public void setIsBusinessOwner(Boolean businessOwner) { isBusinessOwner = businessOwner != null ? businessOwner : false; }

    public Boolean getIsSeniorCitizen() { return isSeniorCitizen; }
    public void setIsSeniorCitizen(Boolean seniorCitizen) { isSeniorCitizen = seniorCitizen != null ? seniorCitizen : false; }

    public Boolean getHasDisability() { return hasDisability; }
    public void setHasDisability(Boolean disability) { hasDisability = disability != null ? disability : false; }

    public Double getDisabilityPercentage() { return disabilityPercentage; }
    public void setDisabilityPercentage(Double disabilityPercentage) { this.disabilityPercentage = disabilityPercentage; }

    public Boolean getIsPregnant() { return isPregnant; }
    public void setIsPregnant(Boolean pregnant) { isPregnant = pregnant != null ? pregnant : false; }

    public Boolean getIsWidow() { return isWidow; }
    public void setIsWidow(Boolean widow) { isWidow = widow != null ? widow : false; }

    public Boolean getIsVeteran() { return isVeteran; }
    public void setIsVeteran(Boolean veteran) { isVeteran = veteran != null ? veteran : false; }

    public Integer getChildrenCount() { return childrenCount; }
    public void setChildrenCount(Integer childrenCount) { this.childrenCount = childrenCount != null ? childrenCount : 0; }

    public String getAadhaarMasked() { return aadhaarMasked; }
    public void setAadhaarMasked(String aadhaarMasked) { this.aadhaarMasked = aadhaarMasked; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

    public String getProfilePictureUrl() { return profilePictureUrl; }
    public void setProfilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; }

    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage != null ? preferredLanguage : "EN"; }

    public Boolean getEnabled() { return enabled; }
    public void setEnabled(Boolean enabled) { this.enabled = enabled != null ? enabled : true; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private Long id;
        private String email;
        private String password;
        private String fullName;
        private Integer age;
        private String gender;
        private State state;
        private District district;
        private String ruralUrban;
        private String occupation;
        private Double annualIncome;
        private String education;
        private String maritalStatus;
        private String category;
        private Boolean isFarmer = false;
        private Boolean isStudent = false;
        private Boolean isBusinessOwner = false;
        private Boolean isSeniorCitizen = false;
        private Boolean hasDisability = false;
        private Double disabilityPercentage;
        private Boolean isPregnant = false;
        private Boolean isWidow = false;
        private Boolean isVeteran = false;
        private Integer childrenCount = 0;
        private String aadhaarMasked;
        private String mobileNumber;
        private String profilePictureUrl;
        private String preferredLanguage = "EN";
        private Boolean enabled = true;
        private Set<Role> roles = new HashSet<>();

        public UserBuilder id(Long id) { this.id = id; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserBuilder age(Integer age) { this.age = age; return this; }
        public UserBuilder gender(String gender) { this.gender = gender; return this; }
        public UserBuilder state(State state) { this.state = state; return this; }
        public UserBuilder district(District district) { this.district = district; return this; }
        public UserBuilder ruralUrban(String ruralUrban) { this.ruralUrban = ruralUrban; return this; }
        public UserBuilder occupation(String occupation) { this.occupation = occupation; return this; }
        public UserBuilder annualIncome(Double annualIncome) { this.annualIncome = annualIncome; return this; }
        public UserBuilder education(String education) { this.education = education; return this; }
        public UserBuilder maritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; return this; }
        public UserBuilder category(String category) { this.category = category; return this; }
        public UserBuilder isFarmer(Boolean isFarmer) { this.isFarmer = isFarmer; return this; }
        public UserBuilder isStudent(Boolean isStudent) { this.isStudent = isStudent; return this; }
        public UserBuilder isBusinessOwner(Boolean isBusinessOwner) { this.isBusinessOwner = isBusinessOwner; return this; }
        public UserBuilder isSeniorCitizen(Boolean isSeniorCitizen) { this.isSeniorCitizen = isSeniorCitizen; return this; }
        public UserBuilder hasDisability(Boolean hasDisability) { this.hasDisability = hasDisability; return this; }
        public UserBuilder disabilityPercentage(Double disabilityPercentage) { this.disabilityPercentage = disabilityPercentage; return this; }
        public UserBuilder isPregnant(Boolean isPregnant) { this.isPregnant = isPregnant; return this; }
        public UserBuilder isWidow(Boolean isWidow) { this.isWidow = isWidow; return this; }
        public UserBuilder isVeteran(Boolean isVeteran) { this.isVeteran = isVeteran; return this; }
        public UserBuilder childrenCount(Integer childrenCount) { this.childrenCount = childrenCount; return this; }
        public UserBuilder aadhaarMasked(String aadhaarMasked) { this.aadhaarMasked = aadhaarMasked; return this; }
        public UserBuilder mobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; return this; }
        public UserBuilder profilePictureUrl(String profilePictureUrl) { this.profilePictureUrl = profilePictureUrl; return this; }
        public UserBuilder preferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; return this; }
        public UserBuilder enabled(Boolean enabled) { this.enabled = enabled; return this; }
        public UserBuilder roles(Set<Role> roles) { this.roles = roles; return this; }

        public User build() {
            return new User(id, email, password, fullName, age, gender, state, district, ruralUrban, occupation,
                    annualIncome, education, maritalStatus, category, isFarmer, isStudent, isBusinessOwner,
                    isSeniorCitizen, hasDisability, disabilityPercentage, isPregnant, isWidow, isVeteran,
                    childrenCount, aadhaarMasked, mobileNumber, profilePictureUrl, preferredLanguage, enabled, roles);
        }
    }
}
