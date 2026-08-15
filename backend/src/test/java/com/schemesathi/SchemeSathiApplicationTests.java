package com.schemesathi;

import com.schemesathi.entity.Scheme;
import com.schemesathi.entity.User;
import com.schemesathi.service.AiService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class SchemeSathiApplicationTests {

    @Autowired
    private AiService aiService;

    @Test
    void contextLoads() {
        assertThat(aiService).isNotNull();
    }

    @Test
    void testRuleBasedFallbackRecommendation() {
        User user = User.builder()
                .fullName("Test Citizen")
                .age(30)
                .gender("MALE")
                .annualIncome(150000.0)
                .preferredLanguage("HI")
                .build();

        Scheme scheme = Scheme.builder()
                .id(1L)
                .name("PM-KISAN")
                .benefits("₹6,000 / year")
                .eligibility("Farmer with cultivable land")
                .isCentral(true)
                .build();

        List<Map<String, Object>> recs = aiService.recommendSchemes(user, List.of(scheme));
        assertThat(recs).isNotEmpty();
        assertThat(recs.get(0).get("schemeName")).isEqualTo("PM-KISAN");
        assertThat(recs.get(0).get("eligibilityScore")).isNotNull();
    }

    @Test
    void testFallbackChatbotResponse() {
        User user = User.builder()
                .fullName("Ramesh Kumar")
                .preferredLanguage("EN")
                .build();

        String response = aiService.chatWithBot(user, "", "What is PM Kisan?", "EN");
        assertThat(response).contains("SchemeSathi AI");
        assertThat(response).contains("Ramesh Kumar");
    }
}
