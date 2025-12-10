package com.coderex.backend;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    @Autowired
    private RestTemplate restTemplate;

    @org.springframework.beans.factory.annotation.Value("${ai.engine.url:http://127.0.0.1:8000/generate}")
    private String aiEngineUrl;

    // private final String AI_ENGINE_URL = "http://127.0.0.1:8000/generate";

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> payload) {
        String userMessage = payload.get("message");

        // Call AI Engine
        Map<String, String> request = new HashMap<>();
        request.put("message", userMessage);

        try {
            Map<String, String> aiResponse = restTemplate.postForObject(aiEngineUrl, request, Map.class);
            return aiResponse;
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("response", "Error communicating with AI Engine: " + e.getMessage());
            return errorResponse;
        }
    }
}
