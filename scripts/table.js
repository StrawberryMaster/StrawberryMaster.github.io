// For the card grid on the main page
(function() {
    const grid = document.getElementById('reading-list-grid');
    const sortControls = document.querySelector('.sort-controls');
    if (!grid || !sortControls) return;

    const buttons = Array.from(sortControls.querySelectorAll('button[data-sort-by]'));
    let cards = Array.from(grid.querySelectorAll('.book-card'));

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const sortKey = button.dataset.sortBy;
            const sortType = button.dataset.sortType || 'text';
            const currentlyActive = button.classList.contains('active');
            const currentDir = button.classList.contains('desc') ? 'asc' : 'desc';
            
            // if it's the active button, flip direction. if not, start with ascending
            const dir = currentlyActive ? currentDir : 'asc';

            // reset all buttons
            buttons.forEach(btn => {
                btn.classList.remove('active', 'asc', 'desc');
            });

            // set state on the clicked button
            button.classList.add('active', dir);

            // sort the cards array
            cards.sort((a, b) => {
                const valA = a.dataset[sortKey];
                const valB = b.dataset[sortKey];

                let comparison = 0;

                if (sortType === 'date') {
                    comparison = new Date(valA) - new Date(valB);
                } else {
                    comparison = valA.localeCompare(valB, undefined, { sensitivity: 'base' });
                }

                return (dir === 'asc') ? comparison : -comparison;
            });
            
            // re-append cards to the grid in the new order
            const frag = document.createDocumentFragment();
            cards.forEach(card => frag.appendChild(card));
            grid.innerHTML = ''; // clear the grid
            grid.appendChild(frag); // append the sorted cards
        });
    });
})();