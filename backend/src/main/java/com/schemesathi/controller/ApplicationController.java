package com.schemesathi.controller;

import com.schemesathi.entity.Application;
import com.schemesathi.entity.Scheme;
import com.schemesathi.entity.User;
import com.schemesathi.repository.ApplicationRepository;
import com.schemesathi.repository.SchemeRepository;
import com.schemesathi.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final SchemeRepository schemeRepository;

    public ApplicationController(ApplicationRepository applicationRepository, UserRepository userRepository,
                                 SchemeRepository schemeRepository) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.schemeRepository = schemeRepository;
    }

    @PostMapping("/apply/{schemeId}")
    public ResponseEntity<?> applyForScheme(@PathVariable Long schemeId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        Scheme scheme = schemeRepository.findById(schemeId)
                .orElseThrow(() -> new RuntimeException("Scheme not found"));

        if (applicationRepository.findByUserIdAndSchemeId(user.getId(), schemeId).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "You have already applied for this scheme."));
        }

        Application application = Application.builder()
                .user(user)
                .scheme(scheme)
                .status("APPLIED")
                .remarks("Application initialized by user.")
                .build();

        applicationRepository.save(application);
        return ResponseEntity.ok(Map.of("message", "Successfully applied for the scheme", "applicationId", application.getId()));
    }

    @GetMapping("/my-applications")
    public ResponseEntity<List<Map<String, Object>>> getMyApplications(Principal principal) {
        if (principal == null) {
            return ResponseEntity.badRequest().build();
        }
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        List<Application> apps = applicationRepository.findByUserId(user.getId());

        return ResponseEntity.ok(apps.stream().map(this::mapToApplicationMap).collect(Collectors.toList()));
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> getAllApplicationsForAdmin() {
        List<Application> apps = applicationRepository.findAll();
        return ResponseEntity.ok(apps.stream().map(this::mapToApplicationMap).collect(Collectors.toList()));
    }

    @PutMapping("/admin/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        return applicationRepository.findById(id).map(app -> {
            String newStatus = body.get("status").toString();
            String remarks = body.getOrDefault("remarks", "").toString();
            
            app.setStatus(newStatus);
            app.setRemarks(remarks);
            applicationRepository.save(app);

            return ResponseEntity.ok(Map.of("message", "Application status updated successfully"));
        }).orElse(ResponseEntity.notFound().build());
    }

    private Map<String, Object> mapToApplicationMap(Application app) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", app.getId());
        map.put("schemeId", app.getScheme().getId());
        map.put("schemeName", app.getScheme().getName());
        map.put("categoryName", app.getScheme().getCategory().getName());
        map.put("applicantName", app.getUser().getFullName());
        map.put("applicantEmail", app.getUser().getEmail());
        map.put("status", app.getStatus());
        map.put("remarks", app.getRemarks());
        map.put("appliedDate", app.getAppliedDate());
        map.put("lastUpdated", app.getLastUpdated());
        return map;
    }
}
