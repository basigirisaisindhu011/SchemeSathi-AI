package com.schemesathi.controller;

import com.schemesathi.entity.Document;
import com.schemesathi.entity.User;
import com.schemesathi.repository.DocumentRepository;
import com.schemesathi.repository.UserRepository;
import com.schemesathi.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/documents")
public class OcrController {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final AiService aiService;

    // Use absolute path inside scratch folder for storing uploaded documents
    private final String uploadDir = "C:/Users/well/.gemini/antigravity/scratch/schemesathi-ai/uploads";

    public OcrController(DocumentRepository documentRepository, UserRepository userRepository, AiService aiService) {
        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
        this.aiService = aiService;
        
        // Ensure upload directory exists
        try {
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }
        } catch (Exception e) {
            // Log folder creation error
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String documentName,
            Principal principal) {
        
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Uploaded file is empty"));
        }

        try {
            // Save file
            String origFilename = file.getOriginalFilename();
            String fileExt = origFilename.substring(origFilename.lastIndexOf("."));
            String savedFilename = UUID.randomUUID().toString() + fileExt;
            Path filePath = Paths.get(uploadDir, savedFilename);
            Files.write(filePath, file.getBytes());

            // Run OCR / Verify details
            Map<String, Object> ocrResult = aiService.verifyDocumentOcr(file.getBytes(), documentName, user);
            String verificationStatus = ocrResult.get("status").toString();

            Document doc = Document.builder()
                    .user(user)
                    .name(documentName)
                    .filePath(filePath.toString())
                    .uploadStatus(verificationStatus)
                    .extractedData(ocrResult.get("verificationNotes").toString())
                    .build();

            documentRepository.save(doc);

            Map<String, Object> res = new HashMap<>();
            res.put("id", doc.getId());
            res.put("name", doc.getName());
            res.put("status", doc.getUploadStatus());
            res.put("extractedData", ocrResult);

            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to upload: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getMyDocuments(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        List<Document> docs = documentRepository.findByUserId(user.getId());

        List<Map<String, Object>> mapped = docs.stream().map(d -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", d.getId());
            map.put("name", d.getName());
            map.put("status", d.getUploadStatus());
            map.put("extractedData", d.getExtractedData());
            map.put("uploadedAt", d.getUploadedAt());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(mapped);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        return documentRepository.findById(id).map(doc -> {
            if (!doc.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
            }
            try {
                // Delete physical file
                Files.deleteIfExists(Paths.get(doc.getFilePath()));
            } catch (Exception e) {
                // ignore or log
            }
            documentRepository.delete(doc);
            return ResponseEntity.ok(Map.of("message", "Document deleted successfully"));
        }).orElse(ResponseEntity.notFound().build());
    }
}
