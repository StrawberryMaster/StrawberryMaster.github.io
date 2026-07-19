// For the collections page
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.collection-card');

  // pre-cache metadata to prevent layout reads during runtime click events
  const cachedCards = Array.from(cards).map(card => ({
    element: card,
    category: card.getAttribute('data-category')
  }));

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      const updateDOM = () => {
        // update button visual state
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // filter the cards
        cachedCards.forEach(({ element, category }) => {
          if (filterValue === 'all' || category === filterValue) {
            element.classList.remove('hidden');
          } else {
            element.classList.add('hidden');
          }
        });
      };

      // animate layout updates in browsers that support View Transitions
      if (document.startViewTransition) {
        document.startViewTransition(updateDOM);
      } else {
        updateDOM();
      }
    });
  });
});