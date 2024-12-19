/**
 * Theme configuration for Story Builder
 * Each theme contains:
 * - id: unique identifier
 * - name: display name
 * - description: short description of the theme
 * - emoji: theme icon
 * - style: visual style configuration
 * - suggestions: word suggestions for each category
 */

// Default theme ID
export const DEFAULT_THEME_ID = 'fantasy';

// Store the current theme ID
let currentThemeId = localStorage.getItem('selectedTheme') || DEFAULT_THEME_ID;

export const THEMES = {
    fantasy: {
        id: 'fantasy',
        name: 'Fantasy',
        description: 'Magical worlds full of wonder and adventure',
        emoji: 'fa-solid fa-dragon',
        style: {
            primary: '#FFD6E7',
            secondary: '#B8E1FF',
            accent: '#BFFFDD',
            background: 'linear-gradient(135deg, rgba(255, 214, 231, 0.2), rgba(199, 233, 255, 0.2))',
            text: '#786B82',
            'text-light': 'rgba(120, 107, 130, 0.8)'
        },
        suggestions: {
            nouns: [
                'dragon', 'wizard', 'unicorn', 'castle', 'fairy',
                'knight', 'princess', 'wand', 'potion', 'spell',
                'forest', 'treasure', 'crystal', 'phoenix', 'elf'
            ],
            verbs: [
                'fly', 'cast', 'enchant', 'transform', 'sparkle',
                'quest', 'battle', 'explore', 'discover', 'protect',
                'magic', 'dream', 'soar', 'adventure', 'rescue'
            ],
            adjectives: [
                'magical', 'mystical', 'enchanted', 'brave', 'ancient',
                'glowing', 'mysterious', 'powerful', 'wise', 'noble',
                'shimmering', 'legendary', 'majestic', 'fantastic', 'whimsical'
            ]
        }
    },
    
    space: {
        id: 'space',
        name: 'Space Adventure',
        description: 'Explore the vast wonders of the cosmos',
        emoji: 'fa-solid fa-rocket',
        style: {
            primary: '#E5D4FF',
            secondary: '#FDFCDC',
            accent: '#E5D4FF',
            background: 'linear-gradient(135deg, rgba(229, 212, 255, 0.2), rgba(199, 233, 255, 0.2))',
            text: '#786B82',
            'text-light': 'rgba(120, 107, 130, 0.8)'
        },
        suggestions: {
            nouns: [
                'rocket', 'astronaut', 'planet', 'star', 'alien',
                'spaceship', 'meteor', 'galaxy', 'comet', 'satellite',
                'moon', 'asteroid', 'telescope', 'robot', 'nebula'
            ],
            verbs: [
                'launch', 'explore', 'discover', 'float', 'orbit',
                'navigate', 'beam', 'travel', 'investigate', 'pilot',
                'zoom', 'land', 'blast', 'hover', 'research'
            ],
            adjectives: [
                'cosmic', 'stellar', 'galactic', 'astronomical', 'interstellar',
                'weightless', 'infinite', 'distant', 'mysterious', 'futuristic',
                'shining', 'floating', 'alien', 'advanced', 'celestial'
            ]
        }
    },

    ocean: {
        id: 'ocean',
        name: 'Ocean Adventure',
        description: 'Dive into underwater mysteries',
        emoji: 'fa-solid fa-fish',
        style: {
            primary: '#BFFFDD',
            secondary: '#5DA9E9',
            accent: '#FFD6E7',
            background: 'linear-gradient(135deg, rgba(191, 255, 221, 0.2), rgba(199, 233, 255, 0.2))',
            text: '#786B82',
            'text-light': 'rgba(120, 107, 130, 0.8)'
        },
        suggestions: {
            nouns: [
                'dolphin', 'mermaid', 'whale', 'fish', 'shark',
                'coral', 'treasure', 'shell', 'octopus', 'submarine',
                'reef', 'pearl', 'seaweed', 'turtle', 'starfish'
            ],
            verbs: [
                'swim', 'dive', 'splash', 'explore', 'discover',
                'float', 'glide', 'bubble', 'wave', 'surf',
                'dance', 'play', 'jump', 'race', 'rescue'
            ],
            adjectives: [
                'deep', 'blue', 'sparkling', 'mysterious', 'colorful',
                'flowing', 'peaceful', 'playful', 'gentle', 'tropical',
                'shimmering', 'magical', 'underwater', 'marine', 'aquatic'
            ]
        }
    },

    jungle: {
        id: 'jungle',
        name: 'Jungle Adventure',
        description: 'Explore wild and exotic places',
        emoji: 'fa-solid fa-leaf',
        style: {
            primary: '#BFFFDD',
            secondary: '#FFD6E7',
            accent: '#C7E9FF',
            background: 'linear-gradient(135deg, rgba(191, 255, 221, 0.2), rgba(255, 214, 231, 0.2))',
            text: '#786B82',
            'text-light': 'rgba(120, 107, 130, 0.8)'
        },
        suggestions: {
            nouns: [
                'monkey', 'tiger', 'parrot', 'elephant', 'snake',
                'tree', 'waterfall', 'flower', 'butterfly', 'river',
                'vine', 'leaf', 'fruit', 'bridge', 'map'
            ],
            verbs: [
                'swing', 'climb', 'jump', 'explore', 'discover',
                'hide', 'search', 'adventure', 'trek', 'observe',
                'collect', 'protect', 'rescue', 'learn', 'grow'
            ],
            adjectives: [
                'wild', 'exotic', 'tropical', 'colorful', 'lush',
                'mysterious', 'amazing', 'natural', 'peaceful', 'vibrant',
                'ancient', 'magical', 'hidden', 'beautiful', 'adventurous'
            ]
        }
    }
};

/**
 * Get the current theme ID
 * @returns {string} Current theme ID
 */
export const getCurrentTheme = () => currentThemeId;

/**
 * Set the current theme and save it to localStorage
 * @param {string} themeId - The theme identifier to set as current
 * @returns {Object} The newly set theme configuration
 */
export const setCurrentTheme = (themeId) => {
    if (!THEMES[themeId]) {
        console.warn(`Theme ${themeId} not found, using default theme`);
        themeId = DEFAULT_THEME_ID;
    }
    
    currentThemeId = themeId;
    localStorage.setItem('selectedTheme', themeId);
    return THEMES[themeId];
};

/**
 * Get a random selection of words from a theme's category
 * @param {string} themeId - The theme identifier
 * @param {string} category - The word category (nouns, verbs, adjectives)
 * @param {number} count - Number of words to return
 * @returns {string[]} Array of random words from the category
 */
export const getRandomSuggestions = (themeId = currentThemeId, category, count = 3) => {
    const theme = THEMES[themeId];
    if (!theme || !theme.suggestions[category]) {
        return [];
    }

    const words = theme.suggestions[category];
    const suggestions = new Set();

    while (suggestions.size < count && suggestions.size < words.length) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        suggestions.add(randomWord);
    }

    return Array.from(suggestions);
};

/**
 * Get theme style configuration
 * @param {string} themeId - The theme identifier
 * @returns {Object} Theme style configuration
 */
export const getThemeStyle = (themeId = currentThemeId) => {
    return THEMES[themeId]?.style || THEMES[DEFAULT_THEME_ID].style;
};

/**
 * Get all available themes
 * @returns {Array} Array of theme objects with basic info and current selection
 */
export const getAllThemes = () => {
    return Object.values(THEMES).map(({ id, name, description, emoji }) => ({
        id,
        name,
        description,
        emoji,
        isSelected: id === currentThemeId
    }));
}; 