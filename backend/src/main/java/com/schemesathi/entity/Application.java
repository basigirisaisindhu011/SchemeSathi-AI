package com.schemesathi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "scheme_id"})})
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scheme_id", nullable = false)
    private Scheme scheme;

    @Column(length = 50, nullable = false)
    private String status = "APPLIED"; // APPLIED, SUBMITTED, UNDER_VERIFICATION, APPROVED, REJECTED, BENEFITS_RELEASED

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(name = "applied_date", updatable = false)
    private LocalDateTime appliedDate = LocalDateTime.now();

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated = LocalDateTime.now();

    public Application() {}

    public Application(Long id, User user, Scheme scheme, String status, String remarks, LocalDateTime appliedDate, LocalDateTime lastUpdated) {
        this.id = id;
        this.user = user;
        this.scheme = scheme;
        this.status = status != null ? status : "APPLIED";
        this.remarks = remarks;
        this.appliedDate = appliedDate != null ? appliedDate : LocalDateTime.now();
        this.lastUpdated = lastUpdated != null ? lastUpdated : LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        appliedDate = LocalDateTime.now();
        lastUpdated = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Scheme getScheme() { return scheme; }
    public void setScheme(Scheme scheme) { this.scheme = scheme; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status != null ? status : "APPLIED"; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public LocalDateTime getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDateTime appliedDate) { this.appliedDate = appliedDate; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }

    public static ApplicationBuilder builder() {
        return new ApplicationBuilder();
    }

    public static class ApplicationBuilder {
        private Long id;
        private User user;
        private Scheme scheme;
        private String status = "APPLIED";
        private String remarks;
        private LocalDateTime appliedDate;
        private LocalDateTime lastUpdated;

        public ApplicationBuilder id(Long id) { this.id = id; return this; }
        public ApplicationBuilder user(User user) { this.user = user; return this; }
        public ApplicationBuilder scheme(Scheme scheme) { this.scheme = scheme; return this; }
        public ApplicationBuilder status(String status) { this.status = status; return this; }
        public ApplicationBuilder remarks(String remarks) { this.remarks = remarks; return this; }
        public ApplicationBuilder appliedDate(LocalDateTime appliedDate) { this.appliedDate = appliedDate; return this; }
        public ApplicationBuilder lastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; return this; }

        public Application build() {
            return new Application(id, user, scheme, status, remarks, appliedDate, lastUpdated);
        }
    }
}
