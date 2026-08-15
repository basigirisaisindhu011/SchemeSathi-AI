package com.schemesathi.controller;

import com.schemesathi.entity.Category;
import com.schemesathi.entity.District;
import com.schemesathi.entity.Scheme;
import com.schemesathi.entity.State;
import com.schemesathi.entity.User;
import com.schemesathi.repository.CategoryRepository;
import com.schemesathi.repository.DistrictRepository;
import com.schemesathi.repository.SchemeRepository;
import com.schemesathi.repository.StateRepository;
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
@RequestMapping("/api/schemes")
public class SchemeController {

    private final SchemeRepository schemeRepository;
    private final UserRepository userRepository;
    private final StateRepository stateRepository;
    private final DistrictRepository districtRepository;
    private final CategoryRepository categoryRepository;

    public SchemeController(SchemeRepository schemeRepository, UserRepository userRepository,
                            StateRepository stateRepository, DistrictRepository districtRepository,
                            CategoryRepository categoryRepository) {
        this.schemeRepository = schemeRepository;
        this.userRepository = userRepository;
        this.stateRepository = stateRepository;
        this.districtRepository = districtRepository;
        this.categoryRepository = categoryRepository;
    }

    // Public / Shared endpoints
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllSchemes(
            @RequestParam(required = false) Integer stateId,
            @RequestParam(required = false) Integer categoryId) {
        
        List<Scheme> schemes;
        if (stateId != null && categoryId != null) {
            schemes = schemeRepository.findByStateOrCentralAndCategory(stateId, categoryId);
        } else if (stateId != null) {
            schemes = schemeRepository.findByStateOrCentral(stateId);
        } else if (categoryId != null) {
            schemes = schemeRepository.findByCategoryIdAndStatus(categoryId, "ACTIVE");
        } else {
            schemes = schemeRepository.findByStatus("ACTIVE");
        }

        return ResponseEntity.ok(schemes.stream().map(this::mapToSchemeMap).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSchemeById(@PathVariable Long id) {
        return schemeRepository.findById(id)
                .map(scheme -> ResponseEntity.ok(mapToSchemeMap(scheme)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/states")
    public ResponseEntity<List<State>> getStates() {
        return ResponseEntity.ok(stateRepository.findAll());
    }

    @GetMapping("/districts")
    public ResponseEntity<List<Map<String, Object>>> getDistricts(@RequestParam Integer stateId) {
        List<District> districts = districtRepository.findByStateId(stateId);
        return ResponseEntity.ok(districts.stream().map(d -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", d.getId());
            map.put("name", d.getName());
            return map;
        }).collect(Collectors.toList()));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    // Citizen specific: Get schemes matched based on state and basic profile
    @GetMapping("/my-recommendations")
    public ResponseEntity<?> getRecommendationsForUser(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        List<Scheme> schemes;
        if (user.getState() != null) {
            schemes = schemeRepository.findByStateOrCentral(user.getState().getId());
        } else {
            schemes = schemeRepository.findByStatus("ACTIVE");
        }

        // Apply basic filter on gender and age
        List<Map<String, Object>> filtered = schemes.stream()
                .filter(s -> {
                    // Filter Gender
                    if (s.getGenderRestriction() != null && !s.getGenderRestriction().equalsIgnoreCase("ALL")) {
                        if (user.getGender() != null && !user.getGender().equalsIgnoreCase(s.getGenderRestriction())) {
                            return false;
                        }
                    }
                    // Filter Age
                    if (user.getAge() != null) {
                        if (s.getAgeMin() != null && user.getAge() < s.getAgeMin()) return false;
                        if (s.getAgeMax() != null && user.getAge() > s.getAgeMax()) return false;
                    }
                    // Filter Income
                    if (user.getAnnualIncome() != null && s.getIncomeLimit() != null) {
                        if (user.getAnnualIncome() > s.getIncomeLimit()) return false;
                    }
                    return true;
                })
                .map(this::mapToSchemeMap)
                .collect(Collectors.toList());

        return ResponseEntity.ok(filtered);
    }

    // Admin endpoints
    @PostMapping("/admin")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> createScheme(@RequestBody Map<String, Object> body) {
        try {
            Scheme scheme = buildSchemeFromMap(body);
            schemeRepository.save(scheme);
            return ResponseEntity.ok(Map.of("message", "Scheme created successfully", "id", scheme.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to create scheme: " + e.getMessage()));
        }
    }

    @PutMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> updateScheme(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        return schemeRepository.findById(id).map(scheme -> {
            try {
                updateSchemeFromMap(scheme, body);
                schemeRepository.save(scheme);
                return ResponseEntity.ok(Map.of("message", "Scheme updated successfully"));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(Map.of("message", "Failed to update: " + e.getMessage()));
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> deleteScheme(@PathVariable Long id) {
        return schemeRepository.findById(id).map(scheme -> {
            schemeRepository.delete(scheme);
            return ResponseEntity.ok(Map.of("message", "Scheme deleted successfully"));
        }).orElse(ResponseEntity.notFound().build());
    }

    private Map<String, Object> mapToSchemeMap(Scheme s) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", s.getId());
        map.put("name", s.getName());
        map.put("isCentral", s.getIsCentral());
        map.put("stateId", s.getState() != null ? s.getState().getId() : null);
        map.put("stateName", s.getState() != null ? s.getState().getName() : null);
        map.put("districtId", s.getDistrict() != null ? s.getDistrict().getId() : null);
        map.put("districtName", s.getDistrict() != null ? s.getDistrict().getName() : null);
        map.put("categoryId", s.getCategory().getId());
        map.put("categoryName", s.getCategory().getName());
        map.put("description", s.getDescription());
        map.put("benefits", s.getBenefits());
        map.put("eligibility", s.getEligibility());
        map.put("incomeLimit", s.getIncomeLimit());
        map.put("ageMin", s.getAgeMin());
        map.put("ageMax", s.getAgeMax());
        map.put("genderRestriction", s.getGenderRestriction());
        map.put("occupationRestriction", s.getOccupationRestriction());
        map.put("requiredDocuments", s.getRequiredDocuments());
        map.put("applicationProcess", s.getApplicationProcess());
        map.put("applicationMode", s.getApplicationMode());
        map.put("officialWebsite", s.getOfficialWebsite());
        map.put("helpline", s.getHelpline());
        map.put("deadline", s.getDeadline());
        map.put("status", s.getStatus());
        return map;
    }

    private Scheme buildSchemeFromMap(Map<String, Object> body) {
        Category cat = categoryRepository.findById(Integer.parseInt(body.get("categoryId").toString())).orElseThrow();
        Scheme.SchemeBuilder builder = Scheme.builder()
                .name(body.get("name").toString())
                .isCentral(Boolean.parseBoolean(body.get("isCentral").toString()))
                .category(cat)
                .description(body.get("description").toString())
                .benefits(body.get("benefits").toString())
                .eligibility(body.get("eligibility").toString())
                .genderRestriction(body.getOrDefault("genderRestriction", "ALL").toString())
                .occupationRestriction(body.getOrDefault("occupationRestriction", "ALL").toString())
                .applicationMode(body.getOrDefault("applicationMode", "ONLINE").toString())
                .officialWebsite(body.getOrDefault("officialWebsite", "").toString())
                .helpline(body.getOrDefault("helpline", "").toString())
                .requiredDocuments(body.getOrDefault("requiredDocuments", "").toString())
                .applicationProcess(body.getOrDefault("applicationProcess", "").toString())
                .status(body.getOrDefault("status", "ACTIVE").toString());

        if (body.get("stateId") != null) {
            builder.state(stateRepository.findById(Integer.parseInt(body.get("stateId").toString())).orElse(null));
        }
        if (body.get("districtId") != null) {
            builder.district(districtRepository.findById(Integer.parseInt(body.get("districtId").toString())).orElse(null));
        }
        if (body.get("incomeLimit") != null && !body.get("incomeLimit").toString().isEmpty()) {
            builder.incomeLimit(Double.parseDouble(body.get("incomeLimit").toString()));
        }
        if (body.get("ageMin") != null && !body.get("ageMin").toString().isEmpty()) {
            builder.ageMin(Integer.parseInt(body.get("ageMin").toString()));
        }
        if (body.get("ageMax") != null && !body.get("ageMax").toString().isEmpty()) {
            builder.ageMax(Integer.parseInt(body.get("ageMax").toString()));
        }
        
        return builder.build();
    }

    private void updateSchemeFromMap(Scheme scheme, Map<String, Object> body) {
        if (body.get("name") != null) scheme.setName(body.get("name").toString());
        if (body.get("isCentral") != null) scheme.setIsCentral(Boolean.parseBoolean(body.get("isCentral").toString()));
        if (body.get("description") != null) scheme.setDescription(body.get("description").toString());
        if (body.get("benefits") != null) scheme.setBenefits(body.get("benefits").toString());
        if (body.get("eligibility") != null) scheme.setEligibility(body.get("eligibility").toString());
        if (body.get("genderRestriction") != null) scheme.setGenderRestriction(body.get("genderRestriction").toString());
        if (body.get("occupationRestriction") != null) scheme.setOccupationRestriction(body.get("occupationRestriction").toString());
        if (body.get("applicationMode") != null) scheme.setApplicationMode(body.get("applicationMode").toString());
        if (body.get("officialWebsite") != null) scheme.setOfficialWebsite(body.get("officialWebsite").toString());
        if (body.get("helpline") != null) scheme.setHelpline(body.get("helpline").toString());
        if (body.get("requiredDocuments") != null) scheme.setRequiredDocuments(body.get("requiredDocuments").toString());
        if (body.get("applicationProcess") != null) scheme.setApplicationProcess(body.get("applicationProcess").toString());
        if (body.get("status") != null) scheme.setStatus(body.get("status").toString());

        if (body.get("categoryId") != null) {
            scheme.setCategory(categoryRepository.findById(Integer.parseInt(body.get("categoryId").toString())).orElseThrow());
        }
        if (body.get("stateId") != null) {
            scheme.setState(stateRepository.findById(Integer.parseInt(body.get("stateId").toString())).orElse(null));
        } else if (body.containsKey("stateId")) {
            scheme.setState(null);
        }
        if (body.get("districtId") != null) {
            scheme.setDistrict(districtRepository.findById(Integer.parseInt(body.get("districtId").toString())).orElse(null));
        } else if (body.containsKey("districtId")) {
            scheme.setDistrict(null);
        }
        if (body.containsKey("incomeLimit")) {
            scheme.setIncomeLimit(body.get("incomeLimit") == null || body.get("incomeLimit").toString().isEmpty() ? null : Double.parseDouble(body.get("incomeLimit").toString()));
        }
        if (body.containsKey("ageMin")) {
            scheme.setAgeMin(body.get("ageMin") == null || body.get("ageMin").toString().isEmpty() ? null : Integer.parseInt(body.get("ageMin").toString()));
        }
        if (body.containsKey("ageMax")) {
            scheme.setAgeMax(body.get("ageMax") == null || body.get("ageMax").toString().isEmpty() ? null : Integer.parseInt(body.get("ageMax").toString()));
        }
    }
}
