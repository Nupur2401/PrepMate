/**
 * PrepMate AI & Cache Engine
 * Handles dynamic content fetching with local redundancy [cite: 115, 243]
 */

const state = {
    apiKey: localStorage.getItem('pm_api_key'),
    model: "gemini-1.5-flash"
};

async function getPrepMateContent(subject, chapter, tab) {
    // 1. Generate a unique cache key for this specific request 
    const cacheKey = `pm_${subject}_${chapter}_${tab}`.toLowerCase().replace(/\s+/g, '_');
    
    // 2. Check if content already exists in LocalStorage 
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        console.log("Loading from cache...");
        return JSON.parse(cachedData);
    }

    // 3. If not cached, prepare the API call [cite: 126]
    if (!state.apiKey) return "Error: Please set your API Key in settings.";

    // Select the correct prompt template based on your LLD [cite: 173, 200, 208]
    const prompts = {
        notes: `Generate detailed CBSE Class 10 ${subject} notes for Chapter: ${chapter}. Use clear, student-friendly language and bullet points. [cite: 174-175]`,
        revision: `Generate concise revision notes for CBSE Class 10 ${subject}, Chapter: ${chapter}. Focus on key formulas and concepts in 8-10 points. [cite: 200-201]`,
        test: `Generate a unit test for CBSE Class 10 ${subject}, Chapter: ${chapter} with 20 mixed difficulty questions. [cite: 208-209]`
    };

    const prompt = prompts[tab] || `Tell me about ${subject} ${chapter}`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${state.model}:generateContent?key=${state.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || "API Failure");
        }

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text; [cite: 127]

        // 4. Save the successful response to cache for next time [cite: 243]
        localStorage.setItem(cacheKey, JSON.stringify(aiText));
        
        return aiText;

    } catch (error) {
        console.error("PrepMate Fetch Error:", error);
        return "Content not available, please try again."; [cite: 249]
    }
}
