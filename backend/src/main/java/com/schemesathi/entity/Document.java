package com.schemesathi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(length = 100, nullable = false)
    private String name; // Aadhaar, Income Certificate, etc.

    @Column(name = "file_path", nullable = false)
    private String filePath;

    @Column(name = "upload_status", length = 50, nullable = false)
    private String uploadStatus = "PENDING"; // PENDING, VERIFIED, REJECTED

    @Column(name = "extracted_data", columnDefinition = "TEXT")
    private String extractedData; // JSON or plain text output from OCR

    @Column(name = "uploaded_at", updatable = false)
    private LocalDateTime uploadedAt = LocalDateTime.now();

    public Document() {}

    public Document(Long id, User user, String name, String filePath, String uploadStatus, String extractedData, LocalDateTime uploadedAt) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.filePath = filePath;
        this.uploadStatus = uploadStatus != null ? uploadStatus : "PENDING";
        this.extractedData = extractedData;
        this.uploadedAt = uploadedAt != null ? uploadedAt : LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        uploadedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public String getUploadStatus() { return uploadStatus; }
    public void setUploadStatus(String uploadStatus) { this.uploadStatus = uploadStatus != null ? uploadStatus : "PENDING"; }

    public String getExtractedData() { return extractedData; }
    public void setExtractedData(String extractedData) { this.extractedData = extractedData; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    public static DocumentBuilder builder() {
        return new DocumentBuilder();
    }

    public static class DocumentBuilder {
        private Long id;
        private User user;
        private String name;
        private String filePath;
        private String uploadStatus = "PENDING";
        private String extractedData;
        private LocalDateTime uploadedAt;

        public DocumentBuilder id(Long id) { this.id = id; return this; }
        public DocumentBuilder user(User user) { this.user = user; return this; }
        public DocumentBuilder name(String name) { this.name = name; return this; }
        public DocumentBuilder filePath(String filePath) { this.filePath = filePath; return this; }
        public DocumentBuilder uploadStatus(String uploadStatus) { this.uploadStatus = uploadStatus; return this; }
        public DocumentBuilder extractedData(String extractedData) { this.extractedData = extractedData; return this; }
        public DocumentBuilder uploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; return this; }

        public Document build() {
            return new Document(id, user, name, filePath, uploadStatus, extractedData, uploadedAt);
        }
    }
}
