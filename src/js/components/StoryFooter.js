export class StoryFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            <style>
                :host {
                    display: block;
                }
                
                .footer-custom {
                    background-color: var(--color-footer);
                    color: #fff;
                    padding: 2rem 0;
                    margin-top: 2rem;
                    position: relative;
                    z-index: 2;
                    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
                }

                .footer-custom::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, 
                        transparent,
                        rgba(255, 255, 255, 0.3),
                        transparent
                    );
                }

                .footer-custom::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        to bottom,
                        rgba(255, 255, 255, 0.05),
                        transparent
                    );
                    pointer-events: none;
                }

                .container {
                    max-width: 64rem;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .footer-grid {
                    display: grid;
                    gap: 3rem;
                    text-align: center;
                }

                .footer-section h3 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    color: rgba(255, 255, 255, 0.95);
                }

                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    align-items: center;
                }

                .footer-link {
                    color: rgba(255, 255, 255, 0.9);
                    text-decoration: none;
                    padding: 0.25rem 0;
                    position: relative;
                    display: inline-block;
                    transition: all 0.3s ease;
                }

                .footer-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: var(--color-primary);
                    opacity: 0.8;
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.3s ease;
                }

                .footer-link:hover {
                    color: var(--color-primary);
                }

                .footer-link:hover::after {
                    transform: scaleX(1);
                    transform-origin: left;
                }

                .text-gray-400 {
                    color: rgba(255, 255, 255, 0.7);
                }

                .copyright {
                    text-align: center;
                    margin-top: 3rem;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                .copyright-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .contact-info {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-top: 0.5rem;
                    font-size: 0.9rem;
                }

                .social-links {
                    display: flex;
                    gap: 1.5rem;
                    margin-top: 0.5rem;
                }

                .social-link {
                    color: rgba(255, 255, 255, 0.9);
                    text-decoration: none;
                    font-size: 1.5rem;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                }

                .social-link:hover {
                    color: var(--color-primary);
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                }

                .social-link i {
                    transition: transform 0.3s ease;
                }

                .social-link:hover i {
                    transform: scale(1.1);
                }

                @media (min-width: 768px) {
                    .footer-grid {
                        grid-template-columns: repeat(2, 1fr);
                        text-align: left;
                    }

                    .footer-links {
                        align-items: flex-start;
                    }

                    .footer-grid > div:last-child .footer-links {
                        align-items: flex-end;
                    }

                    .copyright-content {
                        flex-direction: row;
                        justify-content: space-between;
                    }

                    .contact-info {
                        margin-top: 0;
                    }
                }
            </style>

            <footer class="footer-custom" role="contentinfo">
                <div class="container">
                    <div class="footer-grid">
                        <!-- Navigation -->
                        <div class="footer-section">
                            <nav class="footer-links" aria-label="Footer navigation">
                                <a href="/" class="footer-link">Home</a>
                                <a href="/about.html" class="footer-link">About</a>
                                <a href="/privacy.html" class="footer-link">Privacy Policy</a>
                                <a href="/terms.html" class="footer-link">Terms of Service</a>
                            </nav>
                        </div>

                        <!-- Social -->
                        <div class="footer-section">
                            <div class="footer-links">
                                <p class="text-gray-400">Powered by Deepseek</p>
                                <div class="social-links">
                                    <a href="https://twitter.com/storybuildai" 
                                       class="social-link" 
                                       aria-label="Visit our Twitter">
                                        <i class="fa-brands fa-x-twitter"></i>
                                    </a>
                                    <a href="https://github.com/YohannHommet/story-builder-ai" 
                                       class="social-link" 
                                       aria-label="Visit our GitHub">
                                        <i class="fa-brands fa-github"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Copyright and Contact -->
                    <div class="copyright">
                        <div class="copyright-content">
                            <p>© ${new Date().getFullYear()} Story Builder AI. All rights reserved.</p>
                            <div class="contact-info">
                                <p class="text-gray-400">Built with ❤️ by Yohann</p>
                                <a href="mailto:contact@storybuilder.ai" class="footer-link">
                                    contact@storybuilder.ai
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('story-footer', StoryFooter); 