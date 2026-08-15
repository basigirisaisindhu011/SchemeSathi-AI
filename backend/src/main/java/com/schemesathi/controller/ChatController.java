package com.schemesathi.controller;

import com.schemesathi.entity.ChatHistory;
import com.schemesathi.entity.User;
import com.schemesathi.repository.ChatHistoryRepository;
import com.schemesathi.repository.UserRepository;
import com.schemesathi.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatHistoryRepository chatHistoryRepository;
    private final UserRepository userRepository;
    private final AiService aiService;

    public ChatController(ChatHistoryRepository chatHistoryRepository, UserRepository userRepository, AiService aiService) {
        this.chatHistoryRepository = chatHistoryRepository;
        this.userRepository = userRepository;
        this.aiService = aiService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendChatMessage(@RequestBody Map<String, String> payload, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        String userMessage = payload.get("message");
        String language = payload.getOrDefault("language", "English");

        // Construct history representation
        List<ChatHistory> pastHistory = chatHistoryRepository.findByUserIdOrderByCreatedAtAsc(user.getId());
        StringBuilder historyBuilder = new StringBuilder();
        int maxContext = Math.max(0, pastHistory.size() - 6); // Last 6 messages context
        for (int i = maxContext; i < pastHistory.size(); i++) {
            ChatHistory item = pastHistory.get(i);
            historyBuilder.append("User: ").append(item.getMessage()).append("\n");
            historyBuilder.append("AI: ").append(item.getResponse()).append("\n");
        }

        // Call Gemini
        String botResponse = aiService.chatWithBot(user, historyBuilder.toString(), userMessage, language);

        // Save to Database
        ChatHistory entry = ChatHistory.builder()
                .user(user)
                .message(userMessage)
                .response(botResponse)
                .language(language)
                .build();
        chatHistoryRepository.save(entry);

        Map<String, Object> map = new HashMap<>();
        map.put("id", entry.getId());
        map.put("message", entry.getMessage());
        map.put("response", entry.getResponse());
        map.put("language", entry.getLanguage());
        map.put("createdAt", entry.getCreatedAt());

        return ResponseEntity.ok(map);
    }

    @GetMapping("/history")
    public ResponseEntity<?> getChatHistory(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        List<ChatHistory> history = chatHistoryRepository.findByUserIdOrderByCreatedAtAsc(user.getId());

        List<Map<String, Object>> mapped = history.stream().map(h -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", h.getId());
            map.put("message", h.getMessage());
            map.put("response", h.getResponse());
            map.put("language", h.getLanguage());
            map.put("createdAt", h.getCreatedAt());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(mapped);
    }
}
