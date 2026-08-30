package com.schemesathi.controller;

import com.schemesathi.dto.AuthResponse;
import com.schemesathi.dto.LoginRequest;
import com.schemesathi.dto.RegisterRequest;
import com.schemesathi.dto.UpdateProfileRequest;
import com.schemesathi.entity.Role;
import com.schemesathi.entity.User;
import com.schemesathi.repository.DistrictRepository;
import com.schemesathi.repository.RoleRepository;
import com.schemesathi.repository.StateRepository;
import com.schemesathi.repository.UserRepository;
import com.schemesathi.security.JwtTokenProvider;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StateRepository stateRepository;
    private final DistrictRepository districtRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          RoleRepository roleRepository, StateRepository stateRepository,
                          DistrictRepository districtRepository, PasswordEncoder passwordEncoder,
                          JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.stateRepository = stateRepository;
        this.districtRepository = districtRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/register")
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        String email = registerRequest.getEmail() != null ? registerRequest.getEmail().trim().toLowerCase() : "";
        if (email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email address is required."));
        }
        if (userRepository.existsByEmailIgnoreCase(email) || userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email address is already in use."));
        }

        Role userRole = roleRepository.findByName("ROLE_CITIZEN")
                .orElseGet(() -> roleRepository.save(Role.builder().name("ROLE_CITIZEN").build()));

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .fullName(registerRequest.getFullName() != null ? registerRequest.getFullName().trim() : "Citizen")
                .roles(Collections.singleton(userRole))
                .enabled(true)
                .isFarmer(false)
                .isStudent(false)
                .isBusinessOwner(false)
                .isSeniorCitizen(false)
                .hasDisability(false)
                .isPregnant(false)
                .isWidow(false)
                .isVeteran(false)
                .build();

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully. You can now login."));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail() != null ? loginRequest.getEmail().trim().toLowerCase() : "";
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmailIgnoreCase(userDetails.getUsername())
                .orElseGet(() -> userRepository.findByEmail(email).orElseThrow());
        Set<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        return ResponseEntity.ok(new AuthResponse(jwt, "Bearer", user.getEmail(), user.getFullName(), roles, user.getPreferredLanguage()));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Logged in user not found"));

        return ResponseEntity.ok(mapToProfileMap(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileRequest req, Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Logged in user not found"));

        if (req.getFullName() != null) user.setFullName(req.getFullName());
        if (req.getAge() != null) user.setAge(req.getAge());
        if (req.getGender() != null) user.setGender(req.getGender());
        if (req.getRuralUrban() != null) user.setRuralUrban(req.getRuralUrban());
        if (req.getOccupation() != null) user.setOccupation(req.getOccupation());
        if (req.getAnnualIncome() != null) user.setAnnualIncome(req.getAnnualIncome());
        if (req.getEducation() != null) user.setEducation(req.getEducation());
        if (req.getMaritalStatus() != null) user.setMaritalStatus(req.getMaritalStatus());
        if (req.getCategory() != null) user.setCategory(req.getCategory());
        if (req.getIsFarmer() != null) user.setIsFarmer(req.getIsFarmer());
        if (req.getIsStudent() != null) user.setIsStudent(req.getIsStudent());
        if (req.getIsBusinessOwner() != null) user.setIsBusinessOwner(req.getIsBusinessOwner());
        if (req.getIsSeniorCitizen() != null) user.setIsSeniorCitizen(req.getIsSeniorCitizen());
        if (req.getHasDisability() != null) user.setHasDisability(req.getHasDisability());
        if (req.getDisabilityPercentage() != null) user.setDisabilityPercentage(req.getDisabilityPercentage());
        if (req.getIsPregnant() != null) user.setIsPregnant(req.getIsPregnant());
        if (req.getIsWidow() != null) user.setIsWidow(req.getIsWidow());
        if (req.getIsVeteran() != null) user.setIsVeteran(req.getIsVeteran());
        if (req.getChildrenCount() != null) user.setChildrenCount(req.getChildrenCount());
        if (req.getAadhaarMasked() != null) user.setAadhaarMasked(req.getAadhaarMasked());
        if (req.getMobileNumber() != null) user.setMobileNumber(req.getMobileNumber());
        if (req.getProfilePictureUrl() != null) user.setProfilePictureUrl(req.getProfilePictureUrl());
        if (req.getPreferredLanguage() != null) user.setPreferredLanguage(req.getPreferredLanguage());

        if (req.getStateId() != null) {
            user.setState(stateRepository.findById(req.getStateId()).orElse(null));
        }
        if (req.getDistrictId() != null) {
            user.setDistrict(districtRepository.findById(req.getDistrictId()).orElse(null));
        }

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Profile updated successfully", "profile", mapToProfileMap(user)));
    }

    private Map<String, Object> mapToProfileMap(User user) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", user.getId());
        map.put("email", user.getEmail());
        map.put("fullName", user.getFullName());
        map.put("age", user.getAge());
        map.put("gender", user.getGender());
        map.put("stateId", user.getState() != null ? user.getState().getId() : null);
        map.put("stateName", user.getState() != null ? user.getState().getName() : null);
        map.put("districtId", user.getDistrict() != null ? user.getDistrict().getId() : null);
        map.put("districtName", user.getDistrict() != null ? user.getDistrict().getName() : null);
        map.put("ruralUrban", user.getRuralUrban());
        map.put("occupation", user.getOccupation());
        map.put("annualIncome", user.getAnnualIncome());
        map.put("education", user.getEducation());
        map.put("maritalStatus", user.getMaritalStatus());
        map.put("category", user.getCategory());
        map.put("isFarmer", user.getIsFarmer());
        map.put("isStudent", user.getIsStudent());
        map.put("isBusinessOwner", user.getIsBusinessOwner());
        map.put("isSeniorCitizen", user.getIsSeniorCitizen());
        map.put("hasDisability", user.getHasDisability());
        map.put("disabilityPercentage", user.getDisabilityPercentage());
        map.put("isPregnant", user.getIsPregnant());
        map.put("isWidow", user.getIsWidow());
        map.put("isVeteran", user.getIsVeteran());
        map.put("childrenCount", user.getChildrenCount());
        map.put("aadhaarMasked", user.getAadhaarMasked());
        map.put("mobileNumber", user.getMobileNumber());
        map.put("profilePictureUrl", user.getProfilePictureUrl());
        map.put("preferredLanguage", user.getPreferredLanguage());
        map.put("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()));
        return map;
    }
}
