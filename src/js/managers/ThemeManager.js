import { THEMES, getCurrentTheme, setCurrentTheme, getThemeStyle } from '../config/themes.js';

export class ThemeManager {
    constructor() {
        this.themeContainer = document.querySelector('.theme-list');
        this.template = document.querySelector('#theme-button-template');
        this.currentTheme = getCurrentTheme();
        
        this.init();
    }

    /**
     * Initialize the theme manager
     */
    init() {
        this.createThemeButtons();
        this.setupEventListeners();
        this.applyTheme(this.currentTheme);
    }

    /**
     * Create theme buttons from template
     */
    createThemeButtons() {
        Object.values(THEMES).forEach((theme, index) => {
            const button = this.createThemeButton(theme);
            button.style.animationDelay = `${index * 100}ms`;
            this.themeContainer.appendChild(button);
        });
    }

    /**
     * Create a single theme button
     * @param {Object} theme - Theme configuration
     * @returns {HTMLElement} Theme button element
     */
    createThemeButton(theme) {
        const button = this.template.content.cloneNode(true).children[0];
        const { id, name, emoji } = theme;
        
        // Set content
        const iconElement = button.querySelector('.theme-emoji');
        iconElement.className = `theme-icon ${emoji}`;
        iconElement.textContent = '';  // Clear emoji placeholder
        
        button.querySelector('.theme-label').textContent = name;
        
        // Set attributes
        button.setAttribute('data-theme-id', id);
        button.setAttribute('aria-checked', id === this.currentTheme);
        
        // Add animation class
        button.classList.add('theme-entering');
        
        return button;
    }

    /**
     * Set up event listeners for theme selection
     */
    setupEventListeners() {
        this.themeContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.theme-button');
            if (button) {
                this.handleThemeSelection(button);
            }
        });

        // Keyboard navigation
        this.themeContainer.addEventListener('keydown', (e) => {
            const button = e.target.closest('.theme-button');
            if (button && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                this.handleThemeSelection(button);
            }
        });
    }

    /**
     * Handle theme selection
     * @param {HTMLElement} selectedButton - Selected theme button
     */
    handleThemeSelection(selectedButton) {
        const themeId = selectedButton.dataset.themeId;
        if (themeId === this.currentTheme) return;

        // Update selection state
        this.themeContainer.querySelectorAll('.theme-button').forEach(button => {
            button.setAttribute('aria-checked', button === selectedButton);
        });

        // Apply new theme
        this.applyTheme(themeId);
        
        // Save selection
        this.currentTheme = themeId;
        setCurrentTheme(themeId);

        // Dispatch theme change event
        this.dispatchThemeChangeEvent(themeId);
    }

    /**
     * Apply theme styles to the document
     * @param {string} themeId - Theme identifier
     */
    applyTheme(themeId) {
        const style = getThemeStyle(themeId);
        const root = document.documentElement;

        // Apply CSS variables
        Object.entries(style).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });
    }

    /**
     * Dispatch custom event when theme changes
     * @param {string} themeId - Selected theme identifier
     */
    dispatchThemeChangeEvent(themeId) {
        const event = new CustomEvent('themechange', {
            detail: { themeId, theme: THEMES[themeId] }
        });
        document.dispatchEvent(event);
    }
} 