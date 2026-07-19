// For the book grid on the main page
(function() {
    const grid = document.getElementById('reading-list-grid');
    const sortControls = document.querySelector('.sort-controls');
    if (!grid || !sortControls) return;

    // parse the existing book cards from the markup
    const cards = Array.from(grid.querySelectorAll('.book-card'));
    const bookData = cards.map((card, index) => {
        const title = card.querySelector('h3').innerHTML;
        const author = card.querySelector('.author').textContent;
        const img = card.querySelector('img').src;
        const detailsHtml = card.querySelector('.book-card-details').innerHTML;
        
        return {
            title,
            author,
            img,
            detailsHtml,
            sortTitle: card.getAttribute('data-title') || '',
            sortAuthor: card.getAttribute('data-author') || '',
            sortDate: card.getAttribute('data-date') || '',
            originalIndex: index
        };
    });

    // hide original static grid to let circular display load
    grid.style.display = 'none';

    // create interactive elements and append to DOM
    const wheelContainer = document.createElement('div');
    wheelContainer.className = 'book-wheel-container';
    wheelContainer.style.touchAction = 'pan-y'; // enables vertical scroll while locking horizontal drag interference

    const infoPanel = document.createElement('div');
    infoPanel.className = 'book-wheel-info-panel';

    const wheel = document.createElement('div');
    wheel.className = 'book-wheel';

    wheelContainer.appendChild(infoPanel);
    wheelContainer.appendChild(wheel);
    grid.parentNode.insertBefore(wheelContainer, grid);

    let activeIndex = 0;
    let currentRotation = -90; // sets top cover as active
    let isDragging = false;
    let startX = 0;
    let startAngle = 0;
    let cachedItems = [];
    let infoTimeoutId = null;

    // position layout around ring and assign visibility classes based on focus distance
    function buildWheel() {
        const N = bookData.length;
        if (N === 0) {
            wheel.innerHTML = '';
            cachedItems = [];
            return;
        }

        const items = bookData.map((book, i) => {
            const item = document.createElement('div');
            item.className = 'wheel-item';
            item.dataset.index = i;
            
            const angle = i * (360 / N);
            item.style.setProperty('--angle', angle);
            
            item.innerHTML = `<img src="${book.img}" alt="${book.title}" draggable="false" loading="lazy">`;
            
            item.addEventListener('click', () => {
                if (isDragging) return;
                setActiveBook(i);
            });
            
            return item;
        });

        cachedItems = items;
        
        // batch append to DOM atomically
        wheel.replaceChildren(...items);
        
        updateWheelItems();
    }

    function updateWheelItems() {
        const N = bookData.length;
        if (N === 0) return;

        // write the custom property to the parent once
        wheel.style.setProperty('--parent-rotation', currentRotation);
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        cachedItems.forEach(item => {
            const idx = parseInt(item.dataset.index, 10);
            
            // shortest distance wrapping around the circle
            let diff = Math.abs(idx - activeIndex);
            let distance = Math.min(diff, N - diff);
            
            // scale and fade covers hierarchically based on distance from focus center
            if (distance === 0) {
                item.classList.add('active');
                item.style.setProperty('--item-scale', '1.3');
                item.style.setProperty('--item-opacity', '1');
                item.style.setProperty('--item-z-index', '10');
            } else if (distance === 1) {
                item.classList.remove('active');
                item.style.setProperty('--item-scale', '1.05');
                item.style.setProperty('--item-opacity', '0.85');
                item.style.setProperty('--item-z-index', '8');
            } else if (distance === 2) {
                item.classList.remove('active');
                item.style.setProperty('--item-scale', '0.85');
                item.style.setProperty('--item-opacity', '0.6');
                item.style.setProperty('--item-z-index', '6');
            } else if (distance === 3) {
                item.classList.remove('active');
                item.style.setProperty('--item-scale', '0.7');
                item.style.setProperty('--item-opacity', '0.35');
                item.style.setProperty('--item-z-index', '4');
            } else {
                item.classList.remove('active');
                item.style.setProperty('--item-scale', '0.5');
                item.style.setProperty('--item-opacity', '0.08');
                item.style.setProperty('--item-z-index', '1');
            }
        });

        // clear active asynchronous swap timers to avoid race conditions
        if (infoTimeoutId) {
            clearTimeout(infoTimeoutId);
        }

        // brief opacity fade transition on central panel to swap text details
        infoPanel.style.opacity = '0';
        infoPanel.style.transform = 'scale(0.95)';
        
        infoTimeoutId = setTimeout(() => {
            const activeBook = bookData[activeIndex];
            if (!activeBook) return;
            infoPanel.innerHTML = `
              <h3>${activeBook.title}</h3>
              <p class="author">${activeBook.author}</p>
              <div class="book-card-details">
                ${activeBook.detailsHtml}
              </div>
            `;
            infoPanel.style.opacity = '1';
            infoPanel.style.transform = 'scale(1)';
        }, 150);
    }

    function setActiveBook(index) {
        const N = bookData.length;
        const oldIndex = activeIndex;
        activeIndex = index;
        
        let diff = (activeIndex - oldIndex) % N;
        if (diff > N / 2) diff -= N;
        if (diff < -N / 2) diff += N;
        
        currentRotation -= diff * (360 / N);
        updateWheelItems();
    }

    buildWheel();

    // swipe and drag touch-handling
    wheelContainer.addEventListener('pointerdown', dragStart);
    window.addEventListener('pointermove', dragMove);
    window.addEventListener('pointerup', dragEnd);
    window.addEventListener('pointercancel', dragEnd);

    function dragStart(e) {
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        isDragging = true;
        startX = e.clientX;
        startAngle = currentRotation;
        
        // temporarily disable transition for real-time tracking
        wheel.style.transition = 'none'; 
    }

    function dragMove(e) {
        if (!isDragging) return;
        if (e.cancelable) e.preventDefault();
        
        const deltaX = e.clientX - startX;
        
        // convert drag offset into degree change
        const rotationOffset = deltaX * 0.45;
        currentRotation = startAngle + rotationOffset;
        
        wheel.style.setProperty('--parent-rotation', currentRotation);
        wheel.style.transform = `rotate(${currentRotation}deg)`;
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        wheel.style.transition = '';
        
        // snap layout to the cover closest to top (-90deg position)
        const N = bookData.length;
        let closestIndex = activeIndex;
        let minDiff = Infinity;
        
        bookData.forEach((book, i) => {
            const localAngle = i * (360 / N);
            const screenAngle = (localAngle + currentRotation) % 360;
            let diff = (screenAngle + 90) % 360;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;
            
            if (Math.abs(diff) < minDiff) {
                minDiff = Math.abs(diff);
                closestIndex = i;
            }
        });
        
        setActiveBook(closestIndex);
    }

    // handle sorting controls integration
    const buttons = Array.from(sortControls.querySelectorAll('button[data-sort-by]'));
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const sortKey = button.dataset.sortBy;
            const sortType = button.dataset.sortType || 'text';
            const currentlyActive = button.classList.contains('active');
            const currentDir = button.classList.contains('desc') ? 'asc' : 'desc';
            
            const dir = currentlyActive ? currentDir : 'asc';

            buttons.forEach(btn => btn.classList.remove('active', 'asc', 'desc'));
            button.classList.add('active', dir);

            // save reference to active item so focus is not lost during shuffle
            const activeBook = bookData[activeIndex];

            // perform sort on book dataset
            bookData.sort((a, b) => {
                let valA, valB;
                if (sortKey === 'title') {
                    valA = a.sortTitle;
                    valB = b.sortTitle;
                } else if (sortKey === 'author') {
                    valA = a.sortAuthor;
                    valB = b.sortAuthor;
                } else if (sortKey === 'date') {
                    valA = a.sortDate;
                    valB = b.sortDate;
                }

                let comparison = 0;
                if (sortType === 'date') {
                    comparison = new Date(valA) - new Date(valB);
                } else {
                    comparison = valA.localeCompare(valB, undefined, { sensitivity: 'base' });
                }

                return (dir === 'asc') ? comparison : -comparison;
            });

            // locate new index position of previously selected book
            const newIndex = bookData.indexOf(activeBook);
            activeIndex = newIndex >= 0 ? newIndex : 0;
            
            // adjust position so the item stays active and visible
            const N = bookData.length;
            currentRotation = -90 - activeIndex * (360 / N);

            const updateDOM = () => {
                buildWheel();
            };

            if (document.startViewTransition) {
                document.startViewTransition(updateDOM);
            } else {
                updateDOM();
            }
        });
    });
})();