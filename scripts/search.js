document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const storyCards = document.querySelectorAll('.story-card');
  const noResults = document.getElementById('no-results');
  const storyGrid = document.querySelector('.story-grid');
  
  // create an array of objects with the card element and its searchable text
  const searchableCards = Array.from(storyCards).map(card => {
      const title = card.querySelector('.story-title').textContent.toLowerCase();
      const meta = card.querySelector('.story-meta')?.textContent.toLowerCase() || '';
      const description = card.querySelector('p').textContent.toLowerCase();
      const links = Array.from(card.querySelectorAll('a'))
          .map(link => link.textContent.toLowerCase())
          .join(' ');
      
      return {
          element: card,
          searchText: `${title} ${meta} ${description} ${links}`
      };
  });
  
  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }
  
  function filterStories() {
      const query = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      storyGrid.classList.toggle('filtered', !!query);
      
      const searchTerms = query.split(/\s+/).filter(Boolean);
      searchableCards.forEach(({ element, searchText }) => {
          const isMatch = searchTerms.every(term => searchText.includes(term));
          
          // toggle visibility based on match
          const shouldBeHidden = !isMatch && searchTerms.length > 0;
          element.classList.toggle('hidden', shouldBeHidden);

          if (!shouldBeHidden) {
              visibleCount++;
          }
      });

      noResults.style.display = (visibleCount === 0 && query) ? 'block' : 'none';
  }

  const searchContainer = document.querySelector('.search-container');
  const clearButton = document.getElementById('clear-search-btn');
  // debouncing to avoid excessive filtering while typing
  const debouncedFilter = debounce(filterStories, 200);
  
  searchContainer.appendChild(clearButton);
  
  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    clearButton.style.display = 'none';
    filterStories();
    searchInput.focus();
  });
  
  searchInput.addEventListener('input', () => {
    clearButton.classList.toggle('hidden', !searchInput.value);
    debouncedFilter();
  });
  
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      clearButton.style.display = 'none';
      filterStories();
    }
  });
  
  filterStories();
});