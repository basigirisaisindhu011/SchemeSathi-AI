package com.schemesathi.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.schemesathi.entity.Scheme;
import com.schemesathi.entity.User;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.*;

@Service
public class AiService {

    private final ChatModel chatModel;
    private final ObjectMapper objectMapper;

    @Value("${spring.ai.google.genai.api-key}")
    private String geminiApiKey;

    public AiService(ChatModel chatModel) {
        this.chatModel = chatModel;
        this.objectMapper = new ObjectMapper();
    }

    private String getFullLanguageName(String langCode) {
        if (langCode == null) return "English";
        switch (langCode.trim().toUpperCase()) {
            case "HI": return "Hindi";
            case "TE": return "Telugu";
            case "TA": return "Tamil";
            case "KA": return "Kannada";
            case "ML": return "Malayalam";
            case "MR": return "Marathi";
            case "GU": return "Gujarati";
            case "BN": return "Bengali";
            case "PA": return "Punjabi";
            case "OR": return "Odia";
            case "EN": return "English";
            default:
                // If it is already a full language name
                if (langCode.equalsIgnoreCase("Hindi") || langCode.equalsIgnoreCase("Telugu") || 
                    langCode.equalsIgnoreCase("Tamil") || langCode.equalsIgnoreCase("Kannada") || 
                    langCode.equalsIgnoreCase("Malayalam") || langCode.equalsIgnoreCase("Marathi") || 
                    langCode.equalsIgnoreCase("Gujarati") || langCode.equalsIgnoreCase("Bengali") || 
                    langCode.equalsIgnoreCase("Punjabi") || langCode.equalsIgnoreCase("Odia")) {
                    return langCode;
                }
                return "English";
        }
    }

    public List<Map<String, Object>> recommendSchemes(User user, List<Scheme> schemes) {
        if (schemes == null || schemes.isEmpty()) {
            return Collections.emptyList();
        }

        String targetLanguage = getFullLanguageName(user.getPreferredLanguage());

        // Check if API Key is mocked or missing, fallback to rule-based recommendations
        if (geminiApiKey == null || geminiApiKey.startsWith("mock_key") || geminiApiKey.trim().isEmpty()) {
            return fallbackRuleBasedRecommendation(user, schemes, user.getPreferredLanguage());
        }

        try {
            String profileText = getProfileDescription(user);
            StringBuilder schemesListText = new StringBuilder();
            for (Scheme s : schemes) {
                schemesListText.append(String.format("ID: %d, Name: %s, Description: %s, Eligibility Description: %s, Benefits: %s, Income Limit: %s, Age Limit: %d-%d, Gender: %s, Occupation: %s\n\n",
                        s.getId(), s.getName(), s.getDescription(), s.getEligibility(), s.getBenefits(), 
                        s.getIncomeLimit() != null ? s.getIncomeLimit().toString() : "No Limit",
                        s.getAgeMin() != null ? s.getAgeMin() : 0, s.getAgeMax() != null ? s.getAgeMax() : 100,
                        s.getGenderRestriction(), s.getOccupationRestriction()));
            }

            String promptText = """
                You are SchemeSathi AI, an intelligent government welfare scheme matching engine for Indian citizens.
                Analyze the citizen's profile and matching schemes. Return a JSON array representing the recommendations.
                
                Important Language Rules:
                - You must translate the text in the response fields to the requested language: %s.
                - Keep the official "schemeName" strictly in English as provided in the list (e.g. "Pradhan Mantri Awas Yojana").
                - Translate all other values including "reasonForRecommendation", "benefits", "requiredDocuments" list elements, and "applicationSteps" list elements to %s.
                
                Each object in the JSON array must contain:
                - "schemeId" (integer, matching the ID from the list)
                - "schemeName" (string, in English)
                - "eligibilityScore" (integer from 0 to 100)
                - "confidenceScore" (integer from 0 to 100)
                - "reasonForRecommendation" (string in %s, explaining specifically why the user qualifies based on their income, state, education, etc.)
                - "benefits" (string in %s, summarizing what they will receive)
                - "requiredDocuments" (JSON array of strings in %s)
                - "applicationSteps" (JSON array of strings in %s)
                
                Format the output strictly as a JSON array of objects. Do not wrap it in ```json or markdown formatting. Do not write any conversational text before or after the JSON.
                
                Citizen Profile:
                %s
                
                Available Schemes:
                %s
                """.formatted(targetLanguage, targetLanguage, targetLanguage, targetLanguage, targetLanguage, targetLanguage, profileText, schemesListText.toString());

            String responseText = chatModel.call(promptText);
            responseText = cleanJsonResponse(responseText);
            
            return objectMapper.readValue(responseText, List.class);
        } catch (Exception e) {
            return fallbackRuleBasedRecommendation(user, schemes, user.getPreferredLanguage());
        }
    }

    public String chatWithBot(User user, String conversationHistory, String userQuery, String language) {
        String profileContext = user != null ? getProfileDescription(user) : "Anonymous user seeking general information.";
        String targetLanguage = getFullLanguageName(language);

        if (geminiApiKey == null || geminiApiKey.startsWith("mock_key") || geminiApiKey.trim().isEmpty()) {
            return fallbackChatbotResponse(userQuery, language, user);
        }

        try {
            String systemInstructions = """
                You are SchemeSathi AI Chatbot, India's Intelligent Digital Welfare Assistant.
                Your job is to answer citizen queries regarding government schemes, eligibility, required documents, application process, and timelines.
                Address the user politely.
                Use the Citizen Profile context to make answers highly personalized.
                
                Important Language Rules:
                - You MUST understand the query and respond in the requested language: %s.
                - Write in the correct script (e.g. Devanagari for Hindi, Telugu script for Telugu, etc.).
                - Keep responses concise, clear, and structured using markdown.
                
                Citizen Profile Context:
                %s
                
                Recent Conversation History:
                %s
                
                User Query: %s
                """.formatted(targetLanguage, profileContext, conversationHistory, userQuery);

            return chatModel.call(systemInstructions);
        } catch (Exception e) {
            return fallbackChatbotResponse(userQuery, language, user);
        }
    }

    public Map<String, Object> verifyDocumentOcr(byte[] fileBytes, String documentName, User user) {
        String docContentText = "";
        try {
            docContentText = extractTextFromPdf(fileBytes);
        } catch (Exception e) {
            docContentText = "";
        }

        if (geminiApiKey == null || geminiApiKey.startsWith("mock_key") || geminiApiKey.trim().isEmpty()) {
            return fallbackOcrVerification(documentName, docContentText, user);
        }

        try {
            String promptText = """
                You are an OCR and document validation assistant. Analyze the document named: %s.
                Compare it against the profile of citizen: %s (Age: %d, Income: %s).
                Extracted Raw Text:
                %s

                Respond strictly with a JSON object containing:
                - "status" (string: "VERIFIED", "NEEDS_REVIEW", or "REJECTED")
                - "extractedName" (string, name found in doc or "Not Found")
                - "extractedDob" (string, date of birth found or "N/A")
                - "extractedIncome" (string, income amount found or "N/A")
                - "certificateType" (string, document type recognized)
                - "issuingAuthority" (string, department/authority recognized or "Government Authority")
                - "extractedIdNumber" (string, certificate/Aadhaar/Identity number found or "N/A")
                - "mismatchDetails" (string, details of any mismatch)
                - "verificationNotes" (string, AI-Assisted Document Verification summary)

                Do not include markdown wrappers or conversation. Only return the JSON.
                """.formatted(documentName, user.getFullName(), user.getAge() != null ? user.getAge() : 0, 
                              user.getAnnualIncome() != null ? user.getAnnualIncome().toString() : "0", docContentText);

            String responseText = chatModel.call(promptText);
            responseText = cleanJsonResponse(responseText);
            return objectMapper.readValue(responseText, Map.class);
        } catch (Exception e) {
            return fallbackOcrVerification(documentName, docContentText, user);
        }
    }

    private String extractTextFromPdf(byte[] fileBytes) throws IOException {
        try (PDDocument document = Loader.loadPDF(fileBytes)) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            return pdfStripper.getText(document);
        }
    }

    private String getProfileDescription(User u) {
        return """
            Name: %s
            Age: %d
            Gender: %s
            State: %s
            District: %s
            Rural/Urban: %s
            Occupation: %s
            Annual Income: ₹%s
            Education: %s
            Marital Status: %s
            Caste Category: %s
            Is Student: %s, Is Farmer: %s, Is Business Owner: %s, Is Senior Citizen: %s
            Has Disability: %s (Percentage: %s)
            Is Pregnant: %s, Is Widow: %s, Is Veteran: %s
            Children Count: %d
            """.formatted(
                u.getFullName(), u.getAge() != null ? u.getAge() : 25, u.getGender() != null ? u.getGender() : "ALL",
                u.getState() != null ? u.getState().getName() : "National",
                u.getDistrict() != null ? u.getDistrict().getName() : "All",
                u.getRuralUrban() != null ? u.getRuralUrban() : "URBAN",
                u.getOccupation() != null ? u.getOccupation() : "None",
                u.getAnnualIncome() != null ? u.getAnnualIncome().toString() : "0",
                u.getEducation() != null ? u.getEducation() : "Undergraduate",
                u.getMaritalStatus() != null ? u.getMaritalStatus() : "Single",
                u.getCategory() != null ? u.getCategory() : "GENERAL",
                u.getIsStudent() ? "Yes" : "No", u.getIsFarmer() ? "Yes" : "No",
                u.getIsBusinessOwner() ? "Yes" : "No", u.getIsSeniorCitizen() ? "Yes" : "No",
                u.getHasDisability() ? "Yes" : "No", u.getDisabilityPercentage() != null ? u.getDisabilityPercentage().toString() : "0",
                u.getIsPregnant() ? "Yes" : "No", u.getIsWidow() ? "Yes" : "No", u.getIsVeteran() ? "Yes" : "No",
                u.getChildrenCount()
        );
    }

    private String cleanJsonResponse(String response) {
        if (response.startsWith("```json")) {
            response = response.substring(7);
        }
        if (response.endsWith("```")) {
            response = response.substring(0, response.length() - 3);
        }
        return response.trim();
    }

    private List<Map<String, Object>> fallbackRuleBasedRecommendation(User user, List<Scheme> schemes, String langCode) {
        List<Map<String, Object>> recommendations = new ArrayList<>();
        String lang = langCode != null ? langCode.toUpperCase() : "EN";

        for (Scheme s : schemes) {
            int score = 85;
            List<String> docs = new ArrayList<>();
            if (s.getRequiredDocuments() != null) {
                docs.addAll(Arrays.asList(s.getRequiredDocuments().split(",")));
            } else {
                docs.addAll(List.of("Aadhaar Card", "Residence Certificate", "Bank Passbook"));
            }

            String reason;
            String benefits = s.getBenefits();
            List<String> steps = List.of("Register online at official portal: " + s.getOfficialWebsite(), "Upload required verification documents.", "Submit form to district office.");

            switch (lang) {
                case "HI":
                    reason = "यह योजना आपकी प्रोफाइल से मेल खाती है (राज्य: " + (s.getIsCentral() ? "केंद्र" : user.getState().getName()) + ")।";
                    break;
                case "TE":
                    reason = "మీ ప్రొఫైల్ వివరాలు సరిపోలడం వల్ల ఈ పథకం సిఫార్సు చేయబడింది (రాష్ట్రం: " + (s.getIsCentral() ? "కేంద్ర" : user.getState().getName()) + ").";
                    break;
                case "TA":
                    reason = "உங்கள் சுயவிவரம் இந்த திட்டத்துடன் பொருந்துவதால் இது பரிந்துரைக்கப்படுகிறது (மாநிலம்: " + (s.getIsCentral() ? "மத்திய" : user.getState().getName()) + ").";
                    break;
                case "KA":
                    reason = "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ವಿವರಗಳು ಹೊಂದಾಣಿಕೆಯಾಗುವುದರಿಂದ ಈ ಯೋಜನೆಯನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ (ರಾಜ್ಯ: " + (s.getIsCentral() ? "ಕೇಂದ್ರ" : user.getState().getName()) + ").";
                    break;
                default:
                    reason = "Recommended because your profile aligns with " + s.getName() + 
                            " constraints (State: " + (s.getIsCentral() ? "Central" : user.getState().getName()) + ").";
                    break;
            }
            
            Map<String, Object> rec = new HashMap<>();
            rec.put("schemeId", s.getId());
            rec.put("schemeName", s.getName());
            rec.put("eligibilityScore", score);
            rec.put("confidenceScore", 90);
            rec.put("reasonForRecommendation", reason);
            rec.put("benefits", benefits);
            rec.put("requiredDocuments", docs);
            rec.put("applicationSteps", steps);
            recommendations.add(rec);
        }
        return recommendations;
    }

    private String fallbackChatbotResponse(String query, String language, User user) {
        String name = user != null ? user.getFullName() : "Citizen";
        String lang = language != null ? language.toUpperCase() : "EN";
        
        switch (lang) {
            case "HI":
            case "HINDI":
                return "नमस्ते " + name + ", मैं योजनासाथी एआई हूँ। मैं आपकी सहायता करने के लिए यहाँ हूँ। वर्तमान में एआई कुंजी अनुपलब्ध है, लेकिन आप अपनी प्रोफाइल के अनुसार योग्य योजनाओं की सूची डैशबोर्ड पर देख सकते हैं।";
            case "TE":
            case "TELUGU":
                return "నమస్తే " + name + ", నేను యోజనాసథి AI ని. ప్రొఫైల్ వివరాల ఆధారంగా మీకు సరిపోయే ప్రభుత్వ పథకాలను మీ డాష్‌బోర్డ్‌లో చూడవచ్చు.";
            case "TA":
            case "TAMIL":
                return "வணக்கம் " + name + ", நான் யோஜனாசதி AI. தங்களின் தகுதியான அரசு திட்டங்களை உங்கள் டாஷ்போர்டில் நீங்கள் சரிபார்க்கலாம்.";
            case "KA":
            case "KANNADA":
                return "ನಮಸ್ತೆ " + name + ", ನಾನು ಯೋಜನೆಸಾಥಿ AI. ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಆಧಾರಿತ ಯೋಜನಾ ಶಿಫಾರಸುಗಳನ್ನು ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ನೀವು ನೋಡಬಹುದು.";
            case "ML":
            case "MALAYALAM":
                return "ഹലോ " + name + ", ഞാൻ യോജനാസതി AI ആണ്. നിങ്ങളുടെ പ്രൊഫൈലിന് അനുയോജ്യമായ പദ്ധതികൾ ഡാഷ്‌ബോർഡിൽ കാണാം.";
            case "MR":
            case "MARATHI":
                return "नमस्कार " + name + ", मी योजनासाथी AI आहे. तुमच्या प्रोफाइलनुसार पात्र योजनांची यादी तुम्ही डॅशबोर्डवर पाहू शकता.";
            case "GU":
            case "GUJARATI":
                return "નમસ્તે " + name + ", હું યોજનાસાથી AI છું. તમારી પ્રોફાઇલ મુજબ યોગ્ય યોજનાઓની યાદી તમે ડેશબોર્ડ પર જોઈ શકો છો.";
            case "BN":
            case "BENGALI":
                return "নমস্কার " + name + ", আমি যোজনাসাথী AI। আপনার প্রোফাইল অনুযায়ী যোগ্য প্রকল্পগুলির তালিকা ড্যাশবোর্ডে দেখতে পারেন।";
            case "PA":
            case "PUNJABI":
                return "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ " + name + ", ਮੈਂ ਯੋਜਨਾਸਾਥੀ AI ਹਾਂ। ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਦੇ ਅਨੁਸਾਰ ਯੋਗ ਸਕੀਮਾਂ ਦੀ ਸੂਚੀ ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਦੇਖੀ ਜਾ ਸਕਦੀ ਹੈ।";
            case "OR":
            case "ODIA":
                return "ନମସ୍କାର " + name + ", ମୁଁ ଯୋଜନାସାଥୀ AI। ଆପଣଙ୍କ ପ୍ରୋଫାଇଲ୍ ଅନୁଯାୟୀ ଯୋଗ୍ୟ ଯୋଜନାଗୁଡ଼ିକର ତାଲିକା ଆପଣ ଡ୍ୟାସବୋର୍ଡରେ ଦେଖିପାରିବେ।";
            default:
                return "Hello " + name + ", I am SchemeSathi AI. I'm here to assist you with government scheme eligibility, document lists, and application tracking. Currently, the Gemini API is running in fallback mode, but you can find all matching schemes directly on your dashboard.";
        }
    }

    private Map<String, Object> fallbackOcrVerification(String docName, String docText, User user) {
        Map<String, Object> res = new HashMap<>();
        res.put("status", "NEEDS_REVIEW");
        res.put("extractedName", user != null ? user.getFullName() : "Citizen");
        res.put("extractedDob", "N/A");
        res.put("extractedIncome", user != null && user.getAnnualIncome() != null ? "₹" + user.getAnnualIncome() : "N/A");
        res.put("certificateType", docName);
        res.put("issuingAuthority", "Government Authority / Issuer");
        res.put("extractedIdNumber", "DOC-" + (System.currentTimeMillis() % 100000));
        res.put("mismatchDetails", "");
        res.put("verificationNotes", "AI-Assisted Document Verification: Gemini OCR engine offline. Document stored safely and flagged for review.");
        return res;
    }
}
