export class StoryHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                .header-custom {
                    background: linear-gradient(135deg, var(--color-primary, #FFD6E7), var(--color-secondary, #C7E9FF));
                    padding: 2rem 1rem 4rem;
                    position: relative;
                    overflow: hidden;
                    z-index: 10;
                }

                .header-content {
                    max-width: 64rem;
                    margin: 0 auto;
                    position: relative;
                }

                .text-content {
                    text-align: center;
                }

                .title-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .logo {
                    width: 48px;
                    height: 48px;
                    object-fit: contain;
                    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
                    transition: transform 0.3s ease;
                }

                .title {
                    font-family: var(--font-primary, 'Comic Sans MS');
                    font-size: 2.5rem;
                    color: #fff;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                    margin: 0;
                    line-height: 1.2;
                }

                .subtitle {
                    font-size: 1.25rem;
                    color: rgba(255, 255, 255, 0.9);
                    max-width: 32rem;
                    margin: 1rem auto;
                }

                .features {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 2rem;
                }

                .feature-tag {
                    padding: 0.5rem 1rem;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(8px);
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    transition: all 0.3s ease;
                }

                .feature-tag:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                }

                /* Shimmer effect */
                .header-custom::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 200%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.2),
                        transparent
                    );
                    animation: shimmer 8s infinite linear;
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(50%);
                    }
                }

                @media (max-width: 768px) {
                    .header-custom {
                        padding: 1.5rem 1rem 3rem;
                    }

                    .title {
                        font-size: 2rem;
                    }
                    
                    .subtitle {
                        font-size: 1rem;
                    }
                    
                    .features {
                        flex-wrap: wrap;
                    }

                    .logo {
                        width: 36px;
                        height: 36px;
                    }
                }
            </style>

            <header class="header-custom" role="banner">
                <div class="header-content">
                    <div class="text-content">
                        <div class="title-container">
                            <img src="/public/images/story_builder.png" 
                                 alt="story builder ai logo" 
                                 class="logo"
                                 aria-hidden="true" 
                            />
                            <h1 class="title">Story Builder</h1>
                        </div>
                        <p class="subtitle">
                            Transform your words into magical stories with AI
                        </p>
                        <div class="features">
                            <span class="feature-tag">AI-Powered ✨</span>
                            <span class="feature-tag">Kid-Friendly 🎈</span>
                            <span class="feature-tag">Educational 📚</span>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
}

customElements.define('story-header', StoryHeader); 