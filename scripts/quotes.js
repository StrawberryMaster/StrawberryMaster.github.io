// cache management for quotes
const CACHE_KEY = 'quotesCache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

class QuoteManager {
    constructor() {
        this.quotes = [];
        this.availableQuoteIndices = [];
        this.isTransitioning = false;
        this.abortController = null;
    }
    
    // Fisher-Yates shuffle algorithm
    _shuffleIndices() {
        const indices = this.quotes.map((_, i) => i);

        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        
        this.availableQuoteIndices = indices;
    }

    // fetch and cache quotes
    async fetchQuotes() {
        if (this.abortController) {
            this.abortController.abort();
        }
        this.abortController = new AbortController();

        try {
            // check cache first
            const cachedData = this.getFromCache();
            if (cachedData) {
                return cachedData;
            }

            const response = await fetch('/scripts/quotes.json', {
                signal: this.abortController.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            }

            const quotes = await response.json();
            this.saveToCache(quotes);
            return quotes;

        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted.');
            } else {
                console.error('Failed to fetch quotes:', error);
            }
            return this.getFallbackQuotes();
        }
    }

    saveToCache(quotes) {
        try {
            const cacheData = {
                timestamp: Date.now(),
                quotes: quotes
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } catch (error) {
            console.warn('Failed to save to localStorage:', error);
        }
    }

    getFromCache() {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (!cached) return null;

            const { timestamp, quotes } = JSON.parse(cached);
            if (Date.now() - timestamp > CACHE_DURATION) {
                localStorage.removeItem(CACHE_KEY);
                return null;
            }
            return quotes;
        } catch (error) {
            console.warn('Cache read error, removing corrupted item:', error);
            localStorage.removeItem(CACHE_KEY);
            return null;
        }
    }

    async getRandomQuote() {
        if (this.quotes.length === 0) {
            this.quotes = await this.fetchQuotes();
            this._shuffleIndices();
        }

        if (this.availableQuoteIndices.length === 0) {
            this._shuffleIndices();
        }

        const randomIndex = this.availableQuoteIndices.pop();
        return this.quotes[randomIndex];
    }

    getFallbackQuotes() {
        return [
            { 
                quote: "The best preparation for tomorrow is doing your best today.",
                author: "H. Jackson Brown Jr."
            },
            {
                quote: "Life is what happens while you're busy making other plans.",
                author: "John Lennon"
            },
            { 
                quote: "Uhh, let me be clear. This isn't even a real quote, it's only here because we could not load the quotes.json file.",
                author: "Barack Obama"
            }
        ];
    }

    async animateQuoteTransition(newQuote) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
    
        const quoteElement = document.getElementById('actual-quote');
        const authorElement = document.getElementById('quote-author');

        if (!quoteElement || !authorElement) {
            this.isTransitioning = false;
            return;
        }
    
        try {
            // fade out
            await Promise.all([
                this.fadeElement(quoteElement, 'out'),
                this.fadeElement(authorElement, 'out')
            ]);
        
            // update content
            quoteElement.textContent = `${newQuote.quote}`;
            authorElement.textContent = `— ${newQuote.author}`;
        
            // fade in
            await Promise.all([
                this.fadeElement(quoteElement, 'in'),
                this.fadeElement(authorElement, 'in')
            ]);
        } catch (error) {
            console.error('Animation error:', error);
        } finally {
            this.isTransitioning = false;
        }
    }

    fadeElement(element, direction) {
        const opacityStart = direction === 'out' ? 1 : 0;
        const opacityEnd = direction === 'out' ? 0 : 1;

        const animation = element.animate(
            [
                { opacity: opacityStart },
                { opacity: opacityEnd }
            ],
            {
                duration: 400,
                easing: 'ease-in-out',
                fill: 'forwards'
            }
        );

        return animation.finished;
    }
}

const quoteManager = new QuoteManager();

async function displayRandomQuote() {
    try {
        const quote = await quoteManager.getRandomQuote();
        await quoteManager.animateQuoteTransition(quote);
    } catch (error) {
        console.error('Error displaying quote:', error);
        const quoteElement = document.getElementById('actual-quote');
        const authorElement = document.getElementById('quote-author');
        if (quoteElement && authorElement) {
            quoteElement.textContent = "Sometimes the best quote is the one that makes you think.";
            authorElement.textContent = "— Error Handler";
        }
    }
}

// initialize as soon as DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    displayRandomQuote();
    
    const container = document.getElementById('quote-container');
    if (container) {
        // accessibility attributes for interactive container
        container.setAttribute('role', 'button');
        container.setAttribute('tabindex', '0');
        container.setAttribute('title', 'Click to refresh quote');

        const triggerRefresh = () => {
            if (!quoteManager.isTransitioning) {
                displayRandomQuote();
            }
        };

        // click to refresh
        container.addEventListener('click', triggerRefresh);

        // keyboard trigger (Enter or Space)
        container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerRefresh();
            }
        });
    }

    // auto-refresh quote every 5 minutes — though you probably won't be here for that long, right?
    setInterval(() => {
        if (!document.hidden && !quoteManager.isTransitioning) {
            displayRandomQuote();
        }
    }, 5 * 60 * 1000);
});