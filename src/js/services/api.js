import { CONFIG } from '../config/index.js';

class APIError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'APIError';
        this.status = status;
    }
}

export class StoryAPI {
    static async generateStory(prompt) {
        try {
            const response = await fetch(`${CONFIG.API.GEMINI_URL}?key=${CONFIG.API.GEMINI_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new APIError(
                    errorData.error?.message || `API call failed with status: ${response.status}`,
                    response.status
                );
            }

            const data = await response.json();
            
            if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new APIError('Invalid response format from API', 500);
            }

            return data.candidates[0].content.parts[0].text.trim();
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            throw new APIError(error.message, 500);
        }
    }
} 