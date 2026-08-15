package com.schemesathi.dto;

import java.util.Set;

public class AuthResponse {
    private String token;
    private String tokenType = "Bearer";
    private String email;
    private String fullName;
    private Set<String> roles;
    private String preferredLanguage;

    public AuthResponse() {}

    public AuthResponse(String token, String tokenType, String email, String fullName, Set<String> roles, String preferredLanguage) {
        this.token = token;
        this.tokenType = tokenType != null ? tokenType : "Bearer";
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
        this.preferredLanguage = preferredLanguage != null ? preferredLanguage : "EN";
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType != null ? tokenType : "Bearer";
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
    }

    public static AuthResponseBuilder builder() {
        return new AuthResponseBuilder();
    }

    public static class AuthResponseBuilder {
        private String token;
        private String tokenType = "Bearer";
        private String email;
        private String fullName;
        private Set<String> roles;
        private String preferredLanguage;

        public AuthResponseBuilder token(String token) { this.token = token; return this; }
        public AuthResponseBuilder tokenType(String tokenType) { this.tokenType = tokenType; return this; }
        public AuthResponseBuilder email(String email) { this.email = email; return this; }
        public AuthResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public AuthResponseBuilder roles(Set<String> roles) { this.roles = roles; return this; }
        public AuthResponseBuilder preferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; return this; }

        public AuthResponse build() {
            return new AuthResponse(token, tokenType, email, fullName, roles, preferredLanguage);
        }
    }
}
