package com.schemesathi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_history")
public class ChatHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String response;

    @Column(length = 10)
    private String language = "EN";

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public ChatHistory() {}

    public ChatHistory(Long id, User user, String message, String response, String language, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.message = message;
        this.response = response;
        this.language = language != null ? language : "EN";
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language != null ? language : "EN"; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static ChatHistoryBuilder builder() {
        return new ChatHistoryBuilder();
    }

    public static class ChatHistoryBuilder {
        private Long id;
        private User user;
        private String message;
        private String response;
        private String language = "EN";
        private LocalDateTime createdAt;

        public ChatHistoryBuilder id(Long id) { this.id = id; return this; }
        public ChatHistoryBuilder user(User user) { this.user = user; return this; }
        public ChatHistoryBuilder message(String message) { this.message = message; return this; }
        public ChatHistoryBuilder response(String response) { this.response = response; return this; }
        public ChatHistoryBuilder language(String language) { this.language = language; return this; }
        public ChatHistoryBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ChatHistory build() {
            return new ChatHistory(id, user, message, response, language, createdAt);
        }
    }
}
