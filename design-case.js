(() => {
  const dialog = document.querySelector('#design-lightbox');
  if (!dialog) return;

  const preview = dialog.querySelector('.design-lightbox-stage img');
  const stage = dialog.querySelector('.design-lightbox-stage');
  const title = dialog.querySelector('#lightbox-title');
  const zoom = dialog.querySelector('.design-zoom-toggle');
  const close = dialog.querySelector('.design-lightbox-close');
  const root = document.documentElement;
  let opener;
  let oldOverflow;
  let backdropStart = false;

  function setActualSize(actual) {
    dialog.classList.toggle('is-actual', actual);
    zoom.setAttribute('aria-pressed', String(actual));
    zoom.textContent = actual ? '适应窗口' : '查看原尺寸';
    if (actual) {
      requestAnimationFrame(() => {
        stage.scrollLeft = Math.max(0, (stage.scrollWidth - stage.clientWidth) / 2);
        stage.scrollTop = Math.max(0, (stage.scrollHeight - stage.clientHeight) / 2);
      });
    } else {
      stage.scrollLeft = 0;
      stage.scrollTop = 0;
    }
  }

  document.querySelectorAll('.design-image-trigger').forEach(button => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      opener = button;
      oldOverflow = root.style.overflow;
      root.style.overflow = 'hidden';
      title.textContent = button.closest('figure').querySelector('figcaption').textContent;
      preview.src = source.currentSrc || source.src;
      preview.alt = source.alt;
      setActualSize(false);
      dialog.showModal();
      close.focus({ preventScroll: true });
    });
  });

  zoom.addEventListener('click', () => setActualSize(!dialog.classList.contains('is-actual')));
  preview.addEventListener('click', () => setActualSize(!dialog.classList.contains('is-actual')));
  close.addEventListener('click', () => dialog.close());

  function isBackdrop(event) {
    const bounds = dialog.getBoundingClientRect();
    return event.target === dialog && (
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom
    );
  }
  dialog.addEventListener('pointerdown', event => {
    backdropStart = isBackdrop(event);
  });
  dialog.addEventListener('click', event => {
    if (backdropStart && isBackdrop(event)) dialog.close();
    backdropStart = false;
  });
  dialog.addEventListener('close', () => {
    root.style.overflow = oldOverflow;
    opener?.focus({ preventScroll: true });
  });
})();
