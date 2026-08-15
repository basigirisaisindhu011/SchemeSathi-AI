package com.schemesathi.controller;

import com.schemesathi.entity.Scheme;
import com.schemesathi.entity.User;
import com.schemesathi.repository.SchemeRepository;
import com.schemesathi.repository.UserRepository;
import com.schemesathi.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final UserRepository userRepository;
    private final SchemeRepository schemeRepository;
    private final AiService aiService;

    public RecommendationController(UserRepository userRepository, SchemeRepository schemeRepository, AiService aiService) {
        this.userRepository = userRepository;
        this.schemeRepository = schemeRepository;
        this.aiService = aiService;
    }

    @GetMapping
    public ResponseEntity<?> getAiRecommendations(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        List<Scheme> eligibleSchemes;
        if (user.getState() != null) {
            eligibleSchemes = schemeRepository.findByStateOrCentral(user.getState().getId());
        } else {
            eligibleSchemes = schemeRepository.findByStatus("ACTIVE");
        }

        if (eligibleSchemes.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<Map<String, Object>> recommendations = aiService.recommendSchemes(user, eligibleSchemes);
        return ResponseEntity.ok(recommendations);
    }
}
