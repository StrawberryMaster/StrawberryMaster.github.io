// For the recommended reading section
(function() {
    const grid = document.getElementById('reading-list-grid');
    const sortControls = document.querySelector('.sort-controls');
    if (!grid || !sortControls) return;

    // inject styles for carousel & view toggle button
    const styleHeader = document.createElement('style');
    styleHeader.textContent = `
        .view-toggle-btn {
            margin-left: auto;
            background-color: var(--accent-color) !important;
            color: var(--primary-bg) !important;
        }
        .wheel-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.6);
            color: var(--accent-color);
            border: 1px solid var(--accent-color);
            border-radius: 50%;
            width: 38px;
            height: 38px;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        .wheel-nav-btn:hover {
            background: var(--accent-color);
            color: var(--primary-bg);
            scale: 1.1;
        }
        .wheel-nav-btn.prev-btn { left: 10px; }
        .wheel-nav-btn.next-btn { right: 10px; }
        .wheel-counter {
            position: absolute;
            bottom: 12px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.7);
            color: var(--text-color);
            padding: 2px 10px;
            border-radius: 12px;
            font-size: 0.8rem;
            border: 1px solid color-mix(in srgb, var(--accent-color), transparent 70%);
            z-index: 20;
            pointer-events: none;
        }
        .book-wheel-container:focus {
            outline: 2px solid var(--accent-color);
            outline-offset: 4px;
        }
    `;
    document.head.appendChild(styleHeader);

    // grab cards
    let cards = Array.from(grid.querySelectorAll('.book-card'));
    cards.forEach((card, index) => {
        card.style.viewTransitionName = `book-card-${index}`;
    });

    // parse book data for the carousel
    let bookData = cards.map((card, index) => ({
        title: card.querySelector('h3').innerHTML,
        author: card.querySelector('.author').textContent,
        img: card.querySelector('img').src,
        detailsHtml: card.querySelector('.book-card-details').innerHTML,
        sortTitle: card.getAttribute('data-title') || '',
        sortAuthor: card.getAttribute('data-author') || '',
        sortDate: card.getAttribute('data-date') || '',
        cardElement: card
    }));

    // build carousel DOM shell
    const wheelContainer = document.createElement('div');
    wheelContainer.className = 'book-wheel-container';
    wheelContainer.setAttribute('tabindex', '0');
    wheelContainer.setAttribute('role', 'region');
    wheelContainer.setAttribute('aria-label', 'Interactive book carousel');
    wheelContainer.style.touchAction = 'pan-y';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'wheel-nav-btn prev-btn';
    prevBtn.innerHTML = '&#10094;';
    prevBtn.setAttribute('aria-label', 'Previous book');

    const nextBtn = document.createElement('button');
    nextBtn.className = 'wheel-nav-btn next-btn';
    nextBtn.innerHTML = '&#10095;';
    nextBtn.setAttribute('aria-label', 'Next book');

    const counter = document.createElement('div');
    counter.className = 'wheel-counter';

    const infoPanel = document.createElement('div');
    infoPanel.className = 'book-wheel-info-panel';

    const wheel = document.createElement('div');
    wheel.className = 'book-wheel';

    wheelContainer.appendChild(prevBtn);
    wheelContainer.appendChild(infoPanel);
    wheelContainer.appendChild(wheel);
    wheelContainer.appendChild(nextBtn);
    wheelContainer.appendChild(counter);
    grid.parentNode.insertBefore(wheelContainer, grid);

    let isGridView = true;
    grid.style.display = 'grid';
    wheelContainer.style.display = 'none';

    // toggle view button
    const viewToggleBtn = document.createElement('button');
    viewToggleBtn.className = 'view-toggle-btn';
    viewToggleBtn.innerHTML = 'Carousel view';
    sortControls.appendChild(viewToggleBtn);

    viewToggleBtn.addEventListener('click', () => {
        isGridView = !isGridView;
        if (isGridView) {
            grid.style.display = 'grid';
            wheelContainer.style.display = 'none';
            viewToggleBtn.innerHTML = 'Carousel view';
        } else {
            grid.style.display = 'none';
            wheelContainer.style.display = 'flex';
            viewToggleBtn.innerHTML = 'Grid view';
            updateWheelItems();
        }
    });

    // carousel state
    let activeIndex = 0;
    let currentRotation = -90;
    let isDragging = false;
    let startX = 0;
    let startAngle = 0;
    let cachedItems = [];
    let infoTimeoutId = null;

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
            
            item.addEventListener('click', (e) => {
                if (isDragging) return;
                e.stopPropagation();
                setActiveBook(i);
            });
            
            return item;
        });

        cachedItems = items;
        wheel.replaceChildren(...items);
        updateWheelItems();
    }

    function updateWheelItems() {
        const N = bookData.length;
        if (N === 0) return;

        wheel.style.setProperty('--parent-rotation', currentRotation);
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        cachedItems.forEach(item => {
            const idx = parseInt(item.dataset.index, 10);
            let diff = Math.abs(idx - activeIndex);
            let distance = Math.min(diff, N - diff);
            
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

        counter.textContent = `${activeIndex + 1} / ${N}`;

        if (infoTimeoutId) clearTimeout(infoTimeoutId);
        infoPanel.style.opacity = '0';
        infoPanel.style.transform = 'scale(0.95)';
        
        infoTimeoutId = setTimeout(() => {
            const activeBook = bookData[activeIndex];
            if (!activeBook) return;
            
            infoPanel.innerHTML = `
              <h3 class="info-title"></h3>
              <p class="author"></p>
              <div class="book-card-details"></div>
            `;
            
            infoPanel.querySelector('.info-title').innerHTML = activeBook.title;
            infoPanel.querySelector('.author').textContent = activeBook.author;
            infoPanel.querySelector('.book-card-details').innerHTML = activeBook.detailsHtml;

            infoPanel.style.opacity = '1';
            infoPanel.style.transform = 'scale(1)';
        }, 120);
    }

    function setActiveBook(index) {
        const N = bookData.length;
        if (N === 0) return;

        const targetIndex = (index + N) % N;
        const oldIndex = activeIndex;
        activeIndex = targetIndex;
        
        let diff = (activeIndex - oldIndex) % N;
        if (diff > N / 2) diff -= N;
        if (diff < -N / 2) diff += N;
        
        currentRotation -= diff * (360 / N);
        updateWheelItems();
    }

    buildWheel();

    // Carousel navigation listeners
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); setActiveBook(activeIndex - 1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); setActiveBook(activeIndex + 1); });

    wheelContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveBook(activeIndex - 1);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveBook(activeIndex + 1);
        } else if (e.key === 'Home') {
            e.preventDefault();
            setActiveBook(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            setActiveBook(bookData.length - 1);
        }
    });

    let isWheeling = false;
    wheelContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (isWheeling) return;
        isWheeling = true;
        if (e.deltaY > 0 || e.deltaX > 0) setActiveBook(activeIndex + 1);
        else setActiveBook(activeIndex - 1);
        setTimeout(() => { isWheeling = false; }, 180);
    }, { passive: false });

    wheelContainer.addEventListener('pointerdown', dragStart);
    wheelContainer.addEventListener('pointermove', dragMove);
    wheelContainer.addEventListener('pointerup', dragEnd);
    wheelContainer.addEventListener('pointercancel', dragEnd);

    function dragStart(e) {
        if (e.target.tagName === 'A' || e.target.closest('a') || e.target.closest('.wheel-nav-btn')) return;
        isDragging = true;
        startX = e.clientX;
        startAngle = currentRotation;
        if (wheelContainer.setPointerCapture) {
            try { wheelContainer.setPointerCapture(e.pointerId); } catch (err) {}
        }
        wheel.style.transition = 'none';
    }

    function dragMove(e) {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        currentRotation = startAngle + (deltaX * 0.45);
        wheel.style.setProperty('--parent-rotation', currentRotation);
        wheel.style.transform = `rotate(${currentRotation}deg)`;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        if (e && wheelContainer.releasePointerCapture) {
            try { wheelContainer.releasePointerCapture(e.pointerId); } catch (err) {}
        }
        wheel.style.transition = '';
        
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

    // sort controls + view transitions
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

            const activeBook = bookData[activeIndex];

            // re-sort the cards array
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

            // keep bookData synchronized with the cards order
            bookData.sort((a, b) => cards.indexOf(a.cardElement) - cards.indexOf(b.cardElement));

            const updateDOM = () => {
                const frag = document.createDocumentFragment();
                cards.forEach(card => frag.appendChild(card));
                grid.innerHTML = '';
                grid.appendChild(frag);
            };

            if (document.startViewTransition && isGridView) {
                document.startViewTransition(updateDOM);
            } else {
                updateDOM();
            }

            // sync active index and rebuild wheel in background
            const newIndex = bookData.indexOf(activeBook);
            activeIndex = newIndex >= 0 ? newIndex : 0;
            const N = bookData.length;
            currentRotation = -90 - activeIndex * (360 / N);
            buildWheel();
        });
    });
})();
