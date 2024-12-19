import { CONFIG } from '../config/index.js';

export class DOMUtils {
    static getInputValues() {
        const nouns = document.querySelector(CONFIG.DOM.SELECTORS.INPUTS.NOUNS).value;
        const verbs = document.querySelector(CONFIG.DOM.SELECTORS.INPUTS.VERBS).value;
        const adjectives = document.querySelector(CONFIG.DOM.SELECTORS.INPUTS.ADJECTIVES).value;

        return {
            nouns: this.parseInputValue(nouns),
            verbs: this.parseInputValue(verbs),
            adjectives: this.parseInputValue(adjectives)
        };
    }

    static parseInputValue(value) {
        return value.split(',')
            .map(word => word.trim())
            .filter(word => word.length > 0);
    }

    static updateStoryOutput(story) {
        const storyOutput = document.querySelector(CONFIG.DOM.SELECTORS.STORY_OUTPUT);
        document.querySelector(CONFIG.DOM.SELECTORS.STORY_TEXT).textContent = story;
        
        storyOutput.classList.remove(CONFIG.DOM.CLASSES.HIDDEN);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                storyOutput.classList.add(CONFIG.DOM.CLASSES.SHOW);
            });
        });
    }

    static hideStoryOutput() {
        const storyOutput = document.querySelector(CONFIG.DOM.SELECTORS.STORY_OUTPUT);
        storyOutput.classList.remove(CONFIG.DOM.CLASSES.SHOW);
        storyOutput.classList.add(CONFIG.DOM.CLASSES.HIDDEN);
    }

    static updateButtonState(button, isLoading) {
        button.disabled = isLoading;
        button.textContent = isLoading ? 'Generating...' : 'Generate Story';
    }

    static async showSuccess(button, originalEmoji) {
        button.innerHTML = '✓';
        button.classList.add(CONFIG.DOM.CLASSES.SUCCESS);

        await new Promise(resolve => setTimeout(resolve, CONFIG.ANIMATION.SUCCESS_DURATION));
        
        button.innerHTML = originalEmoji;
        button.classList.remove(CONFIG.DOM.CLASSES.SUCCESS);
    }

    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    }

    static async shareStory(story) {
        if (!navigator.share) {
            return await this.copyToClipboard(story);
        }

        try {
            await navigator.share({
                title: 'My Generated Story',
                text: story
            });
            return true;
        } catch (err) {
            if (err.name === 'AbortError') return false;
            console.error('Failed to share:', err);
            return await this.copyToClipboard(story);
        }
    }

    /**
     * Downloads the given story as a text file.
     * @param {string} story The story to download
     * @returns {boolean} true if the story was successfully downloaded, false otherwise
     */
    static downloadStory(story) {
        try {
            const blob = new Blob([story], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = CONFIG.STORY.getFileName();
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            return true;
        } catch (err) {
            console.error('Failed to download:', err);
            return false;
        }
    }
} 