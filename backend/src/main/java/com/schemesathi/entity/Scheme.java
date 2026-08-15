package com.schemesathi.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "schemes")
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "is_central", nullable = false)
    private Boolean isCentral = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id")
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id")
    private District district;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String benefits;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String eligibility;

    @Column(name = "income_limit")
    private Double incomeLimit;

    @Column(name = "age_min")
    private Integer ageMin;

    @Column(name = "age_max")
    private Integer ageMax;

    @Column(name = "gender_restriction", length = 20)
    private String genderRestriction = "ALL"; // ALL, MALE, FEMALE

    @Column(name = "occupation_restriction", length = 100)
    private String occupationRestriction = "ALL";

    @Column(name = "required_documents", columnDefinition = "TEXT")
    private String requiredDocuments;

    @Column(name = "application_process", columnDefinition = "TEXT")
    private String applicationProcess;

    @Column(name = "application_mode", length = 50)
    private String applicationMode = "ONLINE"; // ONLINE, OFFLINE, HYBRID

    @Column(name = "official_website")
    private String officialWebsite;

    private String helpline;

    private LocalDate deadline;

    @Column(length = 50)
    private String status = "ACTIVE"; // ACTIVE, INACTIVE

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Scheme() {}

    public Scheme(Long id, String name, Boolean isCentral, State state, District district, Category category,
                  String description, String benefits, String eligibility, Double incomeLimit, Integer ageMin,
                  Integer ageMax, String genderRestriction, String occupationRestriction, String requiredDocuments,
                  String applicationProcess, String applicationMode, String officialWebsite, String helpline,
                  LocalDate deadline, String status) {
        this.id = id;
        this.name = name;
        this.isCentral = isCentral != null ? isCentral : true;
        this.state = state;
        this.district = district;
        this.category = category;
        this.description = description;
        this.benefits = benefits;
        this.eligibility = eligibility;
        this.incomeLimit = incomeLimit;
        this.ageMin = ageMin;
        this.ageMax = ageMax;
        this.genderRestriction = genderRestriction != null ? genderRestriction : "ALL";
        this.occupationRestriction = occupationRestriction != null ? occupationRestriction : "ALL";
        this.requiredDocuments = requiredDocuments;
        this.applicationProcess = applicationProcess;
        this.applicationMode = applicationMode != null ? applicationMode : "ONLINE";
        this.officialWebsite = officialWebsite;
        this.helpline = helpline;
        this.deadline = deadline;
        this.status = status != null ? status : "ACTIVE";
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Boolean getIsCentral() { return isCentral; }
    public void setIsCentral(Boolean central) { isCentral = central != null ? central : true; }

    public State getState() { return state; }
    public void setState(State state) { this.state = state; }

    public District getDistrict() { return district; }
    public void setDistrict(District district) { this.district = district; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBenefits() { return benefits; }
    public void setBenefits(String benefits) { this.benefits = benefits; }

    public String getEligibility() { return eligibility; }
    public void setEligibility(String eligibility) { this.eligibility = eligibility; }

    public Double getIncomeLimit() { return incomeLimit; }
    public void setIncomeLimit(Double incomeLimit) { this.incomeLimit = incomeLimit; }

    public Integer getAgeMin() { return ageMin; }
    public void setAgeMin(Integer ageMin) { this.ageMin = ageMin; }

    public Integer getAgeMax() { return ageMax; }
    public void setAgeMax(Integer ageMax) { this.ageMax = ageMax; }

    public String getGenderRestriction() { return genderRestriction; }
    public void setGenderRestriction(String genderRestriction) { this.genderRestriction = genderRestriction != null ? genderRestriction : "ALL"; }

    public String getOccupationRestriction() { return occupationRestriction; }
    public void setOccupationRestriction(String occupationRestriction) { this.occupationRestriction = occupationRestriction != null ? occupationRestriction : "ALL"; }

    public String getRequiredDocuments() { return requiredDocuments; }
    public void setRequiredDocuments(String requiredDocuments) { this.requiredDocuments = requiredDocuments; }

    public String getApplicationProcess() { return applicationProcess; }
    public void setApplicationProcess(String applicationProcess) { this.applicationProcess = applicationProcess; }

    public String getApplicationMode() { return applicationMode; }
    public void setApplicationMode(String applicationMode) { this.applicationMode = applicationMode != null ? applicationMode : "ONLINE"; }

    public String getOfficialWebsite() { return officialWebsite; }
    public void setOfficialWebsite(String officialWebsite) { this.officialWebsite = officialWebsite; }

    public String getHelpline() { return helpline; }
    public void setHelpline(String helpline) { this.helpline = helpline; }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status != null ? status : "ACTIVE"; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public static SchemeBuilder builder() {
        return new SchemeBuilder();
    }

    public static class SchemeBuilder {
        private Long id;
        private String name;
        private Boolean isCentral = true;
        private State state;
        private District district;
        private Category category;
        private String description;
        private String benefits;
        private String eligibility;
        private Double incomeLimit;
        private Integer ageMin;
        private Integer ageMax;
        private String genderRestriction = "ALL";
        private String occupationRestriction = "ALL";
        private String requiredDocuments;
        private String applicationProcess;
        private String applicationMode = "ONLINE";
        private String officialWebsite;
        private String helpline;
        private LocalDate deadline;
        private String status = "ACTIVE";

        public SchemeBuilder id(Long id) { this.id = id; return this; }
        public SchemeBuilder name(String name) { this.name = name; return this; }
        public SchemeBuilder isCentral(Boolean isCentral) { this.isCentral = isCentral; return this; }
        public SchemeBuilder state(State state) { this.state = state; return this; }
        public SchemeBuilder district(District district) { this.district = district; return this; }
        public SchemeBuilder category(Category category) { this.category = category; return this; }
        public SchemeBuilder description(String description) { this.description = description; return this; }
        public SchemeBuilder benefits(String benefits) { this.benefits = benefits; return this; }
        public SchemeBuilder eligibility(String eligibility) { this.eligibility = eligibility; return this; }
        public SchemeBuilder incomeLimit(Double incomeLimit) { this.incomeLimit = incomeLimit; return this; }
        public SchemeBuilder ageMin(Integer ageMin) { this.ageMin = ageMin; return this; }
        public SchemeBuilder ageMax(Integer ageMax) { this.ageMax = ageMax; return this; }
        public SchemeBuilder genderRestriction(String genderRestriction) { this.genderRestriction = genderRestriction; return this; }
        public SchemeBuilder occupationRestriction(String occupationRestriction) { this.occupationRestriction = occupationRestriction; return this; }
        public SchemeBuilder requiredDocuments(String requiredDocuments) { this.requiredDocuments = requiredDocuments; return this; }
        public SchemeBuilder applicationProcess(String applicationProcess) { this.applicationProcess = applicationProcess; return this; }
        public SchemeBuilder applicationMode(String applicationMode) { this.applicationMode = applicationMode; return this; }
        public SchemeBuilder officialWebsite(String officialWebsite) { this.officialWebsite = officialWebsite; return this; }
        public SchemeBuilder helpline(String helpline) { this.helpline = helpline; return this; }
        public SchemeBuilder deadline(LocalDate deadline) { this.deadline = deadline; return this; }
        public SchemeBuilder status(String status) { this.status = status; return this; }

        public Scheme build() {
            return new Scheme(id, name, isCentral, state, district, category, description, benefits, eligibility,
                    incomeLimit, ageMin, ageMax, genderRestriction, occupationRestriction, requiredDocuments,
                    applicationProcess, applicationMode, officialWebsite, helpline, deadline, status);
        }
    }
}
