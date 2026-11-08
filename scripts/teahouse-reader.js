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
  const cover = document.getElementById('reader-cover');
  const downloadStatus = document.getElementById('reader-download-status');
  const downloadHtmlButton = document.getElementById('download-html');
  const downloadEpubButton = document.getElementById('download-epub');
  const downloadPdfButton = document.getElementById('download-pdf');

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
  let epubCover = null;

  const coverImages = {
    'as': 'https://file.garden/aNtAfG887DiA_7lO/stories/as.png',
    'as-it-is-when-it-was': 'https://file.garden/aNtAfG887DiA_7lO/stories/aiiwiw.png',
    'brandemburgo': 'https://file.garden/aNtAfG887DiA_7lO/brandemburgo.png',
    'cidada-do-terceiro-milenio': 'https://file.garden/aNtAfG887DiA_7lO/cidad%C3%A3%20do%20terceiro%20mil%C3%AAnio.png',
    'entao-voce-acredita-em-milagres': 'https://i.imgur.com/tozI9ow.png',
    'guanabara-s-a': 'https://i.imgur.com/4h551pT.jpeg',
    'half-a-person': 'https://file.garden/aNtAfG887DiA_7lO/stories/hap.png',
    'i-never-even-asked-for-light': 'https://file.garden/aNtAfG887DiA_7lO/stories/ineafl.png',
    'is-this-pain-our-pleasure': 'https://file.garden/aNtAfG887DiA_7lO/stories/itpop.png',
    'known-unknowns': 'https://file.garden/aNtAfG887DiA_7lO/stories/ku.png',
    'mothers-pride': 'https://file.garden/aNtAfG887DiA_7lO/stories/mp.png',
    'segunda-opcao': 'https://i.imgur.com/haiYZGH.png',
    'silence-of-the-squirrels': 'https://file.garden/aNtAfG887DiA_7lO/stories/sots.png',
    'spinning-the-wheel': 'https://file.garden/aNtAfG887DiA_7lO/stories/stw.png',
    'ten-to-twenty': 'https://file.garden/aNtAfG887DiA_7lO/stories/t3.png',
    'the-road-to-mandalay': 'https://file.garden/aNtAfG887DiA_7lO/stories/trtm.png',
    'what-is-hard-to-brie-lieve': 'https://file.garden/aNtAfG887DiA_7lO/stories/wihtb.png',
    'wish-fulfillment': 'https://file.garden/aNtAfG887DiA_7lO/stories/wf.png',
    'yesterday-when-i-was-mad': 'https://file.garden/aNtAfG887DiA_7lO/stories/ywiwm.png'
  };
  activeWork.cover = activeWork.cover || coverImages[activeWork.slug];

  document.title = `${activeWork.title} | The Teahouse Reader`;
  title.textContent = activeWork.title;
  summary.textContent = activeWork.summary;
  status.textContent = `${activeWork.category} · ${activeWork.fandom}`;
  if (cover && activeWork.cover) {
    cover.src = activeWork.cover;
    cover.alt = `Cover for ${activeWork.title}`;
    cover.hidden = false;
  }

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

  if (downloadHtmlButton) downloadHtmlButton.addEventListener('click', () => downloadBook('html'));
  if (downloadEpubButton) downloadEpubButton.addEventListener('click', () => downloadBook('epub'));
  if (downloadPdfButton) downloadPdfButton.addEventListener('click', printBook);

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

  async function getAllChapters() {
    return Promise.all(activeWork.chapters.map(chapter => fetchChapter(chapter.src)));
  }

  function setDownloadStatus(message) {
    if (downloadStatus) downloadStatus.textContent = message;
  }

  function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function downloadBook(format) {
    const button = format === 'html' ? downloadHtmlButton : downloadEpubButton;
    if (button) button.disabled = true;
    setDownloadStatus('Preparing download...');
    try {
      const chapters = await getAllChapters();
      if (format === 'html') {
        saveBlob(new Blob([buildHtmlBook(chapters)], { type: 'text/html;charset=utf-8' }), `${activeWork.slug}.html`);
      } else {
        epubCover = await fetchCover();
        saveBlob(buildEpub(chapters), `${downloadName()}.epub`);
      }
      setDownloadStatus('Download ready.');
    } catch (error) {
      console.error('Failed to prepare download:', error);
      setDownloadStatus('The download could not be prepared. Please try again.');
    } finally {
      if (button) button.disabled = false;
    }
  }

  function buildHtmlBook(chapters) {
    const chapterMarkup = chapters.map((html, index) =>
      `<section><h2>${escapeHTML(activeWork.chapters[index].title || `Chapter ${index + 1}`)}</h2>${html}</section>`
    ).join('');
    const coverMarkup = activeWork.cover ? `<img class="cover" src="${escapeHTML(activeWork.cover)}" alt="Cover for ${escapeHTML(activeWork.title)}">` : '';
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escapeHTML(activeWork.title)}</title>
      <style>body{font:18px/1.7 Georgia,serif;max-width:48rem;margin:2rem auto;padding:0 1rem;color:#222}
      .cover{display:block;max-width:18rem;max-height:24rem;margin:0 auto 2rem}h1{text-align:center}section{page-break-before:always}
      img{max-width:100%;height:auto}</style></head><body><header>${coverMarkup}<h1>${escapeHTML(activeWork.title)}</h1>
      <p>${escapeHTML(activeWork.summary)}</p></header>${chapterMarkup}</body></html>`;
  }

  function buildEpub(chapters) {
    const files = [
      { name: 'mimetype', data: 'application/epub+zip' },
      { name: 'META-INF/container.xml', data: '<?xml version="1.0"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>' },
      { name: 'OEBPS/content.opf', data: buildOpf() },
      { name: 'OEBPS/nav.xhtml', data: buildNav() },
      { name: 'OEBPS/cover.xhtml', data: buildCoverPage() }
    ];
    if (epubCover) files.push({ name: `OEBPS/${epubCover.name}`, data: epubCover.data });
    chapters.forEach((html, index) => files.push({
      name: `OEBPS/chapter-${index + 1}.xhtml`,
      data: `<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml"><head><title>${escapeHTML(activeWork.chapters[index].title || `Chapter ${index + 1}`)}</title></head><body>${html}</body></html>`
    }));
    return createZip(files);
  }

  function buildOpf() {
    const subjects = [
      activeWork.category,
      activeWork.rating,
      activeWork.warnings,
      activeWork.fandom,
      ...(activeWork.categories || []),
      ...(activeWork.relationships || []),
      ...(activeWork.characters || []),
      ...(activeWork.tags || [])
    ].filter(Boolean).map(subject => `<dc:subject>${escapeHTML(subject)}</dc:subject>`).join('');
    const creator = escapeHTML(activeWork.author || 'opapeldetrouxa');
    const language = escapeHTML(activeWork.language || 'en').toLowerCase().startsWith('portugu') ? 'pt-BR' : escapeHTML(activeWork.language || 'en');
    const coverItem = epubCover
      ? `<item id="cover-image" href="${escapeHTML(epubCover.name)}" media-type="${epubCover.mime}" properties="cover-image"/>`
      : '';
    const identifier = `urn:uuid:${crypto.randomUUID ? crypto.randomUUID() : `${activeWork.slug}-${Date.now()}`}`;
    const manifest = ['<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>', '<item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>', coverItem]
      .concat(activeWork.chapters.map((_, index) => `<item id="chapter-${index + 1}" href="chapter-${index + 1}.xhtml" media-type="application/xhtml+xml"/>`)).join('');
    const spine = ['<itemref idref="cover"/>'].concat(activeWork.chapters.map((_, index) => `<itemref idref="chapter-${index + 1}"/>`)).join('');
    return `<?xml version="1.0" encoding="UTF-8"?><package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title id="title">${escapeHTML(activeWork.title)}</dc:title><dc:creator id="creator">${creator}</dc:creator><dc:identifier id="book-id">${identifier}</dc:identifier><dc:description>${escapeHTML(activeWork.summary)}</dc:description><dc:publisher>Archive of Our Own</dc:publisher><dc:date>${escapeHTML(activeWork.published || new Date().toISOString())}</dc:date>${subjects}<dc:language>${language}</dc:language><meta refines="#title" property="title-type">main</meta><meta refines="#title" property="file-as">${escapeHTML(activeWork.title)}</meta><meta refines="#creator" property="role" scheme="marc:relators">aut</meta><meta refines="#creator" property="file-as">${creator}</meta><meta name="cover" content="cover-image"/></metadata><manifest>${manifest}</manifest><spine>${spine}</spine></package>`;
  }

  function buildNav() {
    const links = activeWork.chapters.map((chapter, index) => `<li><a href="chapter-${index + 1}.xhtml">${escapeHTML(chapter.title || `Chapter ${index + 1}`)}</a></li>`).join('');
    return `<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><title>Contents</title></head><body><nav epub:type="toc"><h1>${escapeHTML(activeWork.title)}</h1><ol><li><a href="cover.xhtml">Cover</a></li>${links}</ol></nav></body></html>`;
  }

  function buildCoverPage() {
    const image = epubCover ? `<img src="${escapeHTML(epubCover.name)}" alt="Cover for ${escapeHTML(activeWork.title)}"/>` : '';
    return `<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml"><head><title>${escapeHTML(activeWork.title)}</title></head><body><h1>${escapeHTML(activeWork.title)}</h1>${image}<p>${escapeHTML(activeWork.summary)}</p></body></html>`;
  }

  async function fetchCover() {
    if (!activeWork.cover) return null;
    const response = await fetch(activeWork.cover);
    if (!response.ok) throw new Error(`Cover download failed with HTTP ${response.status}`);
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const mime = contentType.split(';', 1)[0].toLowerCase();
    const extension = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
    return {
      data: new Uint8Array(await response.arrayBuffer()),
      mime,
      name: `cover.${extension}`
    };
  }

  function downloadName() {
    const author = activeWork.author || 'opapeldetrouxa';
    return `${activeWork.title} (${author})`.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').trim();
  }

  function createZip(files) {
    const encoder = new TextEncoder();
    const localParts = [], centralParts = [];
    let offset = 0;
    files.forEach(file => {
      const name = encoder.encode(file.name), data = typeof file.data === 'string' ? encoder.encode(file.data) : file.data;
      const crc = crc32(data), local = new Uint8Array(30 + name.length + data.length);
      writeZipHeader(local, 0, 0x04034b50, 20, crc, data.length, name.length);
      local.set(name, 30); local.set(data, 30 + name.length); localParts.push(local);
      const central = new Uint8Array(46 + name.length);
      writeZipHeader(central, 0, 0x02014b50, 20, crc, data.length, name.length);
      new DataView(central.buffer).setUint16(6, 20, true);
      new DataView(central.buffer).setUint32(42, offset, true);
      central.set(name, 46); centralParts.push(central);
      offset += local.length;
    });
    const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
    const end = new Uint8Array(22); new DataView(end.buffer).setUint32(0, 0x06054b50, true);
    new DataView(end.buffer).setUint16(8, files.length, true); new DataView(end.buffer).setUint16(10, files.length, true);
    new DataView(end.buffer).setUint32(12, centralSize, true); new DataView(end.buffer).setUint32(16, offset, true);
    return new Blob([...localParts, ...centralParts, end], { type: 'application/epub+zip' });
  }

  function writeZipHeader(bytes, offset, signature, version, crc, size, nameLength) {
    const view = new DataView(bytes.buffer);
    view.setUint32(offset, signature, true); view.setUint16(offset + 4, version, true);
    view.setUint16(offset + 8, 0, true); view.setUint16(offset + 10, 0, true);
    view.setUint32(offset + 14, crc, true); view.setUint32(offset + 18, size, true); view.setUint32(offset + 22, size, true);
    view.setUint16(offset + 26, nameLength, true); view.setUint16(offset + 28, 0, true);
  }

  function crc32(bytes) {
    let crc = -1;
    for (const byte of bytes) {
      crc ^= byte;
      for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
    return (crc ^ -1) >>> 0;
  }

  function printBook() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      setDownloadStatus('Please allow pop-ups to print this story.');
      return;
    }
    printWindow.document.write('<p>Preparing print view...</p>');
    getAllChapters().then(chapters => {
      printWindow.document.open();
      printWindow.document.write(buildHtmlBook(chapters));
      printWindow.document.close();
      printWindow.focus();
      printWindow.addEventListener('load', () => printWindow.print(), { once: true });
    }).catch(error => {
      console.error('Failed to prepare print view:', error);
      printWindow.close();
      setDownloadStatus('The print view could not be prepared. Please try again.');
    });
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
    if (index < 0 || index >= chapterCount || index === currentChapterIndex) return;

    // instantly abort any ongoing loading fetch to prevent race conditions
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