import { CONFIG, PROMPT_TEMPLATE } from './config/index.js';
import { StoryAPI } from './services/api.js';
import { DOMUtils } from './utils/dom.js';
import { ThemeManager } from './managers/ThemeManager.js';

class StoryBuilder {
    constructor() {
        this.generateButton = document.querySelector(CONFIG.DOM.SELECTORS.GENERATE_BUTTON);
        this.actionButtons = document.querySelectorAll(CONFIG.DOM.SELECTORS.ACTION_BUTTONS);
        
        if (!this.generateButton) {
            console.error('Generate button not found');
            return;
        }
        
        this.initializeThemeManager();
        this.initializeEventListeners();
    }

    /**
     * Initialize the theme manager
     */
    initializeThemeManager() {
        this.themeManager = new ThemeManager();
        
        // Listen for theme changes
        document.addEventListener('themechange', (e) => {
            this.handleThemeChange(e.detail);
        });
    }

    /**
     * Handle theme change event
     * @param {Object} detail - Theme change event detail
     */
    handleThemeChange({ themeId, theme }) {
        // Update placeholders with theme-specific suggestions
        const inputs = {
            nouns: document.querySelector('#nouns'),
            verbs: document.querySelector('#verbs'),
            adjectives: document.querySelector('#adjectives')
        };

        Object.entries(inputs).forEach(([type, input]) => {
            const suggestions = theme.suggestions[type].slice(0, 3).join(', ') + '...';
            input.placeholder = suggestions;
        });
    }

    /**
     * Sets up event listeners for the generate and action buttons.
     * - Attaches a click event listener to the generate button to handle story generation.
     * - Attaches click event listeners to action buttons to handle specific actions (e.g., copy, share, download).
     * Logs a message upon successful initialization or an error if initialization fails.
     */
    initializeEventListeners() {
        try {
            this.generateButton.addEventListener('click', () => this.handleStoryGeneration());
            
            this.actionButtons.forEach(button => {
                button.addEventListener('click', (e) => this.handleAction(e));
            });
        } catch (error) {
            console.error('Failed to initialize event listeners:', error);
        }
    }

    /**
     * Handles story generation by gathering input values, validating them, generating a story
     * using the StoryAPI, and updating the story output in the DOM.
     * Logs a message upon successful story generation or an error if generation fails.
     */
    async handleStoryGeneration() {
        const words = DOMUtils.getInputValues();

        if (!this.validateInputs(words)) {
            alert("Please fill in all fields.");
            return;
        }

        DOMUtils.updateButtonState(this.generateButton, true);
        try {
            const story = await StoryAPI.generateStory(PROMPT_TEMPLATE(words));
            DOMUtils.updateStoryOutput(story);
        } catch (error) {
            this.handleError(error);
        } finally {
            DOMUtils.updateButtonState(this.generateButton, false);
        }
    }

    /**
     * Validates the input words to ensure that all fields (nouns, verbs, adjectives) have at least one entry.
     * Logs a message indicating the validation result.
     * @param {Object} words - Object containing the input values for nouns, verbs, and adjectives.
     * @returns {boolean} - true if all fields have at least one entry, false otherwise.
     */
    validateInputs(words) {
        return words.nouns.length > 0 && 
               words.verbs.length > 0 && 
               words.adjectives.length > 0;
    }

    handleError(error) {
        const messages = {
            401: "Invalid API key. Please check your configuration.",
            403: "Access forbidden. Please check your API permissions.",
            429: "Too many requests. Please try again in a moment.",
            500: "Server error. Please try again later."
        };
        
        const errorMessage = `Failed to generate story. ${messages[error.status] || error.message || "Please try again later."}`;
        alert(errorMessage);
        DOMUtils.hideStoryOutput();
    }

    async handleAction(event) {
        const button = event.currentTarget;
        const action = button.getAttribute('data-action');
        const storyText = document.querySelector(CONFIG.DOM.SELECTORS.STORY_TEXT)?.textContent;

        if (!storyText) {
            return alert('No story text found');
        }

        switch (action) {
            case 'copy':
                await DOMUtils.copyToClipboard(storyText);
                break;

            case 'share':
                await DOMUtils.shareStory(storyText);
                break;

            case 'download':
                DOMUtils.downloadStory(storyText);
                break;

            default:
                console.warn('Unknown action:', action);
                return;
        }

        await DOMUtils.showSuccess(button, button.innerHTML);
    }
}

// Console Banner
const displayConsoleBanner = () => {
    const styles = [
        'color: #FFD6E7',
        'font-size: 12px',
        'font-weight: bold',
    ].join(';');

    console.log(`%c
    ███████╗████████╗ ██████╗ ██████╗ ██╗   ██╗    ██████╗ ██╗   ██╗██╗██╗     ██████╗ ███████╗██████╗ 
    ██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝    ██╔══██╗██║   ██║██║██║     ██╔══██╗██╔════╝██╔══██╗
    ███████╗   ██║   ██║   ██║██████╔╝ ╚████╔╝     ██████╔╝██║   ██║██║██║     ██║  ██║█████╗  ██████╔╝
    ╚════██║   ██║   ██║   ██║██╔══██╗  ╚██╔╝      ██╔══██╗██║   ██║██║██║     ██║  ██║██╔══╝  ██╔══██╗
    ███████║   ██║   ╚██████╔╝██║  ██║   ██║       ██████╔╝╚██████╔╝██║███████╗██████╔╝███████╗██║  ██║
    ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝       ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝
    `, styles);

    console.log('%c🌟 Story Builder AI - Version 1.0.0', [
        'color: #FFD6E7',
        'background: #2D3748',
        'font-size: 14px',
        'padding: 8px 12px',
        'margin: 4px 0',
        'border-radius: 4px',
        'font-weight: bold'
    ].join(';'));
};

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        displayConsoleBanner();
        window.storyBuilder = new StoryBuilder();
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});
