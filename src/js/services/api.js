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
            const response = await fetch(`${CONFIG.API.DEEPSEEK_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.API.DEEPSEEK_KEY}`
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [{
                        role: 'assistant',
                        content: prompt
                    }],
                    temperature: 1.5,
                    stream: false,
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

            if (!data.choices?.[0]?.message?.content) {
                throw new APIError('Invalid response format from API', 500);
            }

            console.log(data.choices[0].message.content.trim());

            return data.choices[0].message.content.trim();
        } catch (error) {
            if (error instanceof APIError)  throw error;
            throw new APIError(error.message, 500);
        }
    }
} 