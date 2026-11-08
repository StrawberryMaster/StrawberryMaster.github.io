// For the collections page
document.addEventListener('DOMContentLoaded', () => {
  const filterContainer = document.querySelector('.filter-bar');
  const cards = document.querySelectorAll('.collection-card');

  if (!filterContainer || !cards.length) return;

  // pre-cache card metadata
  const cachedCards = Array.from(cards).map(card => ({
    element: card,
    category: card.dataset.category
  }));

  // track the currently active button
  let activeBtn = filterContainer.querySelector('.filter-btn.active');

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');

    // ignore clicks outside buttons or clicks on the already active button
    if (!btn || btn === activeBtn) return;

    const filterValue = btn.dataset.filter;

    const updateDOM = () => {
      // update active button state
      if (activeBtn) activeBtn.classList.remove('active');
      btn.classList.add('active');
      activeBtn = btn;

      // filter cards
      cachedCards.forEach(({ element, category }) => {
        const isHidden = filterValue !== 'all' && category !== filterValue;
        element.classList.toggle('hidden', isHidden);
      });
    };

    // smooth view transition update
    if (document.startViewTransition) {
      document.startViewTransition(updateDOM);
    } else {
      updateDOM();
    }
  });
});