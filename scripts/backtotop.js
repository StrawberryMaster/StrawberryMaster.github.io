/* for the analysis page */
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');

    // don't run if the button isn't on the page.
    if (!backToTopButton) {
        return;
    }

    const SCROLL_THRESHOLD = 300;

    // utility function to limit how often the scroll handler runs
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    function toggleVisibility() {
        backToTopButton.classList.toggle('show', window.scrollY > SCROLL_THRESHOLD);
    }

    function scrollToTop(e) {
        e.preventDefault();
        
        // this sends the user's focus to the top of the page along with their viewport.
        document.body.focus({ preventScroll: true });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    toggleVisibility();

    window.addEventListener('scroll', throttle(toggleVisibility, 100));
    backToTopButton.addEventListener('click', scrollToTop);
});