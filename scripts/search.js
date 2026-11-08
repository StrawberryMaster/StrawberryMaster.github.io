document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const storyCards = document.querySelectorAll('.story-card');
  const noResults = document.getElementById('no-results');
  const storyGrid = document.querySelector('.story-grid');
  const clearButton = document.getElementById('clear-search-btn');
  
  if (!searchInput || !storyGrid) return;

  // helper to normalize text
  function normalizeText(text) {
    return (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // pre-index cards into JS objects with normalized text
  const searchableCards = Array.from(storyCards).map(card => {
    const title = card.querySelector('.story-title')?.textContent || '';
    const meta = card.querySelector('.story-meta')?.textContent || '';
    const description = card.querySelector('p')?.textContent || '';
    const links = Array.from(card.querySelectorAll('a'))
      .map(link => link.textContent)
      .join(' ');
    
    return {
      element: card,
      searchText: normalizeText(`${title} ${meta} ${description} ${links}`)
    };
  });
  
  // debounce helper
  function debounce(func, delay) {
    let timeout;
    const debounced = function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
    debounced.cancel = () => clearTimeout(timeout);
    return debounced;
  }

  function updateClearButton() {
    if (clearButton) {
      clearButton.classList.toggle('hidden', !searchInput.value.trim());
    }
  }
  
  function filterStories() {
    const rawQuery = searchInput.value.trim();
    const normalizedQuery = normalizeText(rawQuery);
    const searchTerms = normalizedQuery.split(/\s+/).filter(Boolean);
    
    let visibleCount = 0;

    // batch DOM updates in the next animation frame
    requestAnimationFrame(() => {
      storyGrid.classList.toggle('filtered', !!normalizedQuery);
      
      searchableCards.forEach(({ element, searchText }) => {
        // match if *every* term in the query exists in the card's text
        const isMatch = searchTerms.every(term => searchText.includes(term));
        const shouldBeHidden = !isMatch && searchTerms.length > 0;
        
        element.classList.toggle('hidden', shouldBeHidden);

        if (!shouldBeHidden) {
          visibleCount++;
        }
      });

      if (noResults) {
        noResults.style.display = (visibleCount === 0 && normalizedQuery) ? 'block' : 'none';
      }
    });
  }

  const debouncedFilter = debounce(filterStories, 200);

  function resetSearch() {
    debouncedFilter.cancel();
    searchInput.value = '';
    updateClearButton();
    filterStories();
  }

  // event listeners
  searchInput.addEventListener('input', () => {
    updateClearButton();
    debouncedFilter();
  });
  
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      resetSearch();
    }
  });
  
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      resetSearch();
      searchInput.focus();
    });
  }
  
  // initial state setup
  updateClearButton();
  filterStories();
});