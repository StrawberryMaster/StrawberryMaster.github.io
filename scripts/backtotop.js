/* for the analysis page */
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return; // don't run if the button isn't on the page.

    // create a dummy sentinel element
    const topSentinel = document.createElement('div');
    topSentinel.style.position = 'absolute';
    topSentinel.style.top = '300px';
    topSentinel.style.height = '1px';
    topSentinel.style.width = '1px';
    topSentinel.style.pointerEvents = 'none';
    document.body.prepend(topSentinel);

    // observe when this point leaves/enters the screen
    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        backToTopButton.classList.toggle('show', !entry.isIntersecting);
    });

    observer.observe(topSentinel);

    // click handler
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});