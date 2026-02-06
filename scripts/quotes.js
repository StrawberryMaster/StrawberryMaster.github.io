// cache management for quotes
const CACHE_KEY = 'quotesCache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

class QuoteManager {
    constructor() {
        this.quotes = [];
        this.availableQuoteIndices = [];
        this.isTransitioning = false;
    }
    
    // helper method to shuffle the indices
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
        try {
            // checking the cache first
            const cachedData = this.getFromCache();
            if (cachedData) {
                return cachedData;
            }

            const response = await fetch('/scripts/quotes.json', {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });

            if (!response.ok) {
                throw new Error(`Yikes! An HTTP error. Status: ${response.status}`);
            }

            const quotes = await response.json();
            this.saveToCache(quotes);
            return quotes;

        } catch (error) {
            console.error('Jinkies. Failed to fetch quotes:', error);
            // if available, fallback to embedded quotes
            return this.getFallbackQuotes();
        }
    }

    // cache management
    saveToCache(quotes) {
        const cacheData = {
            timestamp: Date.now(),
            quotes: quotes
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
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
            console.warn('Jeepers! Cache read error, removing corrupted item:', error);
            localStorage.removeItem(CACHE_KEY);
            return null;
        }
    }

    // get a truly random quote that hasn't been used recently
    async getRandomQuote() {
        if (this.quotes.length === 0) {
            this.quotes = await this.fetchQuotes();
            this._shuffleIndices();
        }

        // we've shown all quotes? reshuffle the deck
        if (this.availableQuoteIndices.length === 0) {
            this._shuffleIndices();
        }

        // get the next index from our quotes list
        const randomIndex = this.availableQuoteIndices.pop();
        return this.quotes[randomIndex];
    }

    // sample, fallback quotes in case of network failure
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
                quote: "Uhh, let me be clear. This isn't even a real quote, it's only here because we could not load the quotes.json file. Developing is hard.",
                author: "Barack Obama"
            }
        ];
    }

    // animate quote transition
    async animateQuoteTransition(newQuote) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
    
        const quoteElement = document.getElementById('actual-quote');
        const authorElement = document.getElementById('quote-author');
    
        // fade out!
        await Promise.all([
            this.fadeElement(quoteElement, 'out'),
            this.fadeElement(authorElement, 'out')
        ]);
    
        // update content
        quoteElement.textContent = `“${newQuote.quote}”`;
        authorElement.textContent = `— ${newQuote.author}`;
    
        // fade in!
        await Promise.all([
            this.fadeElement(quoteElement, 'in'),
            this.fadeElement(authorElement, 'in')
        ]);
    
        this.isTransitioning = false;
    }

    // fade helper function
    async fadeElement(element, direction) {
        const duration = 500;
        
        return new Promise(resolve => {
            const onTransitionEnd = () => {
                element.removeEventListener('transitionend', onTransitionEnd);
                resolve();
            };
            element.addEventListener('transitionend', onTransitionEnd);
            
            element.style.transition = `opacity ${duration}ms ease-in-out`;
            element.style.opacity = direction === 'out' ? 0 : 1;
        });
    }
}

// initialize and set up the quote system
const quoteManager = new QuoteManager();

async function displayRandomQuote() {
    try {
        const quote = await quoteManager.getRandomQuote();
        await quoteManager.animateQuoteTransition(quote);
    } catch (error) {
        console.error('Error displaying quote:', error);
        // display fallback quote with error styling
        const quoteElement = document.getElementById('actual-quote');
        const authorElement = document.getElementById('quote-author');
        quoteElement.textContent = "Sometimes the best quote is the one that makes you think.";
        authorElement.textContent = "— Error Handler";
        quoteElement.style.color = '#ff6b6b';
    }
}

// initialize quote display
window.addEventListener('load', () => {
    displayRandomQuote();
    
    // click-to-refresh functionality
    document.getElementById('quote-footer').addEventListener('click', () => {
        if (!quoteManager.isTransitioning) {
            displayRandomQuote();
        }
    });

    // auto-refresh quote every 5 minutes — though you probably won't be here for that long, right?
    setInterval(() => {
        if (!document.hidden && !quoteManager.isTransitioning) {
            displayRandomQuote();
        }
    }, 5 * 60 * 1000);
});