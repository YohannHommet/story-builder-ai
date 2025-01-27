export const CONFIG = {
    API: {
        GEMINI_KEY: 'AIzaSyBXEgwzPVaUCLbz7IbcK2Lz2dtqwZoZXRM',
        GEMINI_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
        DEEPSEEK_KEY: 'sk-45dd64333d2345688b3d770cc78bd43b',
        DEEPSEEK_URL: 'https://api.deepseek.com/chat/completions'
    },
    ANIMATION: {
        SUCCESS_DURATION: 1500,
        STORY_APPEAR_DURATION: 500
    },
    STORY: {
        MAX_LENGTH: 250,
        TARGET_AGE: '3-6',
        getFileName: () => {
            const date = new Date();
            const formattedDate = date.toISOString().split('T')[0];

            return `story_${formattedDate}.txt`;
        }
    },
    DOM: {
        SELECTORS: {
            GENERATE_BUTTON: '#generate-story',
            STORY_OUTPUT: '#story-output',
            STORY_TEXT: '#story-text',
            ACTION_BUTTONS: '.action-button',
            INPUTS: {
                NOUNS: '#nouns',
                VERBS: '#verbs',
                ADJECTIVES: '#adjectives'
            }
        },
        CLASSES: {
            HIDDEN: 'hidden',
            SHOW: 'show',
            SUCCESS: 'success'
        }
    }
};

/**
 * Story Generation Prompt Template
 */
export const PROMPT_TEMPLATE = ({ nouns, verbs, adjectives }, theme = 'fantasy') => `You are a master storyteller specializing in creating interactive stories for young children (ages ${CONFIG.STORY.TARGET_AGE}). 

Context:
Theme: ${theme}
Elements to weave into the story:
- Characters & Objects: ${nouns.join(', ')}
- Actions & Adventures: ${verbs.join(', ')}
- Magical Qualities: ${adjectives.join(', ')}

Storytelling Guidelines:
1. Craft an immersive story that matches the selected theme
2. Create memorable characters with distinct personalities
3. Include interactive moments where children can:
   - Make sound effects
   - Do simple movements or gestures
   - Answer questions or make predictions
4. Include gentle humor and playful moments
5. Create opportunities for learning (counting, colors, emotions, etc.)
6. Use varied sentence rhythms to maintain engagement
7. Add simple repetitive phrases children can remember and say along

Style Requirements:
- Length: Around ${CONFIG.STORY.MAX_LENGTH} words, with natural paragraph breaks
- Tone: Warm and engaging, with a sense of wonder
- Language: Age-appropriate but not oversimplified
- Structure: Clear beginning, middle, and end with a satisfying resolution
- Pacing: Dynamic, with quiet moments and exciting parts

Safety Guidelines:
- Keep content gentle and non-threatening
- Avoid complex themes or scary elements
- Focus on positive messages and outcomes
- Filter out any inappropriate concepts or w

Remember to naturally incorporate all provided words while maintaining the story's flow and engagement. Story should be unique, creative, and engaging.`;
