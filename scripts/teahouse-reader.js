(function () {
  const works = window.TEAHOUSE_WORKS || {};
  const workEntries = Object.values(works);
  const content = document.getElementById('reader-content');
  const status = document.getElementById('reader-status');
  const title = document.getElementById('reader-title');
  const summary = document.getElementById('reader-summary');
  const metadataGrid = document.getElementById('reader-meta-grid');
  const notesSection = document.getElementById('reader-notes-section');
  const notes = document.getElementById('reader-notes');
  const chapterSelect = document.getElementById('chapter-select');
  const prevButton = document.getElementById('prev-chapter');
  const nextButton = document.getElementById('next-chapter');
  const chapterStatus = document.getElementById('chapter-status');
  const tocPanel = document.getElementById('toc-panel');
  const tocToggle = document.getElementById('toc-toggle');
  const tocList = document.getElementById('reader-toc-list');
  const tocTitle = document.getElementById('reader-toc-title');
  const tocSummary = document.getElementById('reader-toc-summary');
  const tocStatus = document.getElementById('reader-toc-status');
  const backLinkTop = document.getElementById('reader-back-link-top');
  const ao3LinkTop = document.getElementById('reader-ao3-link-top');
  const backLink = document.getElementById('reader-back-link');
  const ao3Link = document.getElementById('reader-ao3-link');

  if (!content || !title || !chapterSelect || !prevButton || !nextButton) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedSlug = normalizeSlug(params.get('work') || params.get('slug'));
  const activeWork = works[requestedSlug] || workEntries[0];

  if (!activeWork) {
    content.innerHTML = '<div class="reader-empty">No imported works are available yet.</div>';
    return;
  }

  const chapterCache = new Map();
  let currentChapterIndex = -1;
  let isInitialLoad = true;
  let isLoading = false;
  let abortController = null;

  document.title = `${activeWork.title} | The Teahouse Reader`;
  title.textContent = activeWork.title;
  summary.textContent = activeWork.summary;
  status.textContent = `${activeWork.category} · ${activeWork.fandom}`;

  if (tocTitle) tocTitle.textContent = activeWork.title;
  if (tocSummary) tocSummary.textContent = activeWork.summary;
  if (tocStatus) tocStatus.textContent = `${activeWork.category} · ${activeWork.fandom}`;

  if (backLinkTop) backLinkTop.href = '../teahouse';
  if (ao3LinkTop) ao3LinkTop.href = activeWork.sourceUrl;
  if (backLink) backLink.href = '../teahouse';
  if (ao3Link) ao3Link.href = activeWork.sourceUrl;

  metadataGrid.innerHTML = [
    renderMetaBlock('Rating', activeWork.rating),
    renderMetaBlock('Warnings', activeWork.warnings),
    renderMetaBlock('Published', activeWork.published),
    renderMetaBlock('Words', activeWork.words),
    renderMetaBlock('Language', activeWork.language),
    renderMetaBlock('Fandom', activeWork.fandom)
  ].join('');

  if (notesSection && notes && activeWork.notes) {
    notes.innerHTML = activeWork.notes;
    notesSection.style.display = 'block';
  }

  const tocItems = activeWork.chapters.map((chapter, index) => {
    const li = document.createElement('li');
    if (index > 0) li.className = 'sub';
    
    const a = document.createElement('a');
    a.href = '#';
    a.setAttribute('data-chapter-index', index);
    a.textContent = chapter.title || `Chapter ${index + 1}`;
    
    li.appendChild(a);
    return li;
  });
  tocList.replaceChildren(...tocItems);

  const selectOptions = activeWork.chapters.map((chapter, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = chapter.title || `Chapter ${index + 1}`;
    return option;
  });
  chapterSelect.replaceChildren(...selectOptions);

  if (tocToggle && tocPanel) {
    tocToggle.addEventListener('click', () => {
      const isOpen = tocPanel.classList.toggle('open');
      tocToggle.setAttribute('aria-expanded', String(isOpen));
      tocPanel.setAttribute('aria-hidden', String(!isOpen));
    });
    tocPanel.querySelectorAll('a:not([data-chapter-index])').forEach(link => {
      link.addEventListener('click', () => {
        tocPanel.classList.remove('open');
        tocToggle.setAttribute('aria-expanded', 'false');
        tocPanel.setAttribute('aria-hidden', 'true');
      });
    });
  }

  if (tocList) {
    tocList.addEventListener('click', event => {
      const link = event.target.closest('a[data-chapter-index]');
      if (!link) return;
      event.preventDefault();
      const index = Number(link.getAttribute('data-chapter-index'));
      if (!Number.isNaN(index)) loadChapter(index);
      if (tocPanel) {
        tocPanel.classList.remove('open');
        if (tocToggle) tocToggle.setAttribute('aria-expanded', 'false');
        tocPanel.setAttribute('aria-hidden', 'true');
      }
    });
  }

  chapterSelect.addEventListener('change', () => loadChapter(Number(chapterSelect.value)));
  prevButton.addEventListener('click', () => loadChapter(currentChapterIndex - 1));
  nextButton.addEventListener('click', () => loadChapter(currentChapterIndex + 1));

  window.addEventListener('popstate', (event) => {
    const stateIndex = event.state && typeof event.state.chapterIndex === 'number' 
      ? event.state.chapterIndex 
      : null;
      
    if (stateIndex !== null) {
      loadChapter(stateIndex, false);
    } else {
      const freshParams = new URLSearchParams(window.location.search);
      const reqChapter = parseInt(freshParams.get('chapter'), 10);
      const targetIdx = (reqChapter > 0 && reqChapter <= activeWork.chapters.length) 
        ? reqChapter - 1 
        : 0;
      loadChapter(targetIdx, false);
    }
  });

  document.addEventListener('keydown', event => {
    const activeEl = document.activeElement;
    if (activeEl && (
      activeEl.tagName === 'INPUT' || 
      activeEl.tagName === 'TEXTAREA' || 
      activeEl.tagName === 'SELECT' || 
      activeEl.isContentEditable
    )) {
      return;
    }
    if (event.key === 'ArrowLeft') {
      loadChapter(currentChapterIndex - 1);
    } else if (event.key === 'ArrowRight') {
      loadChapter(currentChapterIndex + 1);
    }
  });

  const requestedChapter = parseInt(params.get('chapter'), 10);
  const startChapter = (requestedChapter > 0 && requestedChapter <= activeWork.chapters.length) 
    ? requestedChapter - 1 
    : 0;
    
  loadChapter(startChapter);

  function normalizeSlug(value) {
    return (value || '')
      .toLowerCase()
      .trim()
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '-');
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderMetaBlock(label, value) {
    if (!value) return '';
    const safeValue = Array.isArray(value) 
      ? value.map(escapeHTML).join(', ') 
      : escapeHTML(value);
    return `
      <div class="reader-meta-block">
        <div class="reader-meta-label">${escapeHTML(label)}</div>
        <div class="reader-meta-value">${safeValue}</div>
      </div>
    `;
  }

  function highlightActiveTocItem() {
    if (!tocList) return;
    tocList.querySelectorAll('a[data-chapter-index]').forEach(link => {
      const idx = Number(link.getAttribute('data-chapter-index'));
      if (idx === currentChapterIndex) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  function updateControls(shouldPushState = true) {
    const chapterCount = activeWork.chapters.length;
    prevButton.disabled = currentChapterIndex <= 0;
    nextButton.disabled = currentChapterIndex >= chapterCount - 1;
    chapterSelect.value = String(currentChapterIndex);
    chapterStatus.textContent = `Chapter ${currentChapterIndex + 1} of ${chapterCount}`;
    
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('work', activeWork.slug);
    newUrl.searchParams.set('chapter', currentChapterIndex + 1);

    if (shouldPushState) {
      window.history.pushState({ chapterIndex: currentChapterIndex }, '', newUrl);
    } else {
      window.history.replaceState({ chapterIndex: currentChapterIndex }, '', newUrl);
    }

    highlightActiveTocItem();
  }

  async function loadChapter(index, updateHistory = true) {
    const chapterCount = activeWork.chapters.length;
    if (index < 0 || index >= chapterCount || index === currentChapterIndex || isLoading) return;

    // instantly abort any ongoing loading fetches to prevent race conditions
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();
    isLoading = true;

    currentChapterIndex = index;
    
    const shouldPush = updateHistory && !isInitialLoad;
    updateControls(shouldPush);
    isInitialLoad = false;
    
    const chapter = activeWork.chapters[index];
    if (!chapterCache.has(chapter.src)) {
       content.innerHTML = '<p class="reader-status">Loading chapter...</p>';
    }

    try {
      const html = await fetchChapter(chapter.src, abortController.signal);
      
      requestAnimationFrame(() => {
        content.innerHTML = html;
        
        const topControls = document.querySelector('section.reader-controls');
        if (topControls) {
          topControls.scrollIntoView({ behavior: 'instant', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      });

      if (index + 1 < chapterCount) {
        preloadChapter(activeWork.chapters[index + 1].src);
      }
      
    } catch (error) {
      if (error.name === 'AbortError') {
         console.log('Chapter load aborted.');
         return;
      }
      console.error('Failed to load chapter:', error);
      content.innerHTML = `
        <div class="reader-empty">
          <p>Zoinks! We could not load this chapter right now.</p>
          <p><a href="${activeWork.sourceUrl}" target="_blank" rel="noopener noreferrer">Read this story externally instead</a></p>
        </div>
      `;
    } finally {
      isLoading = false;
    }
  }

  async function fetchChapter(src, signal) {
    if (chapterCache.has(src)) return chapterCache.get(src);

    const response = await fetch(src, { signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const html = await response.text();
    chapterCache.set(src, html);
    return html;
  }

  function preloadChapter(src) {
    if (!chapterCache.has(src)) {
      fetch(src)
        .then(res => res.ok ? res.text() : null)
        .then(html => {
            if (html) chapterCache.set(src, html);
        })
        .catch(() => {});
    }
  }
})();