(() => {
  const triggers = document.querySelectorAll('#need-discovery .report-image-trigger, #follow-up [data-report-lightbox]');
  const dialog = document.querySelector('#report-lightbox');
  if (!triggers.length || !dialog) return;
  let opener;
  const image = dialog.querySelector('img');
  const closeButton = dialog.querySelector('button');
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let savedStyles;
  let closing = false;
  let closeTimer;
  let backdropStart = false;

  triggers.forEach(trigger => trigger.addEventListener('click', () => {
    const preview = trigger.querySelector('img');
    if (dialog.open || !preview.complete || !preview.naturalWidth) return;
    opener = trigger;
    image.src = preview.currentSrc || preview.src;
    image.alt = preview.alt;
    dialog.setAttribute('aria-label', trigger.getAttribute('aria-label'));
    closeButton.setAttribute('aria-label', trigger.closest('#follow-up') ? '关闭跟进聊天大图' : '关闭规划报告大图');
    savedStyles = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    const scrollbar = innerWidth - root.clientWidth;
    if (scrollbar > 0) root.style.paddingRight = `${parseFloat(getComputedStyle(root).paddingRight) + scrollbar}px`;
    root.style.overflow = 'hidden';
    closing = false;
    dialog.showModal();
    closeButton.focus({ preventScroll: true });
    // Commit the initial opacity/scale before the enter transition.
    void dialog.offsetWidth;
    requestAnimationFrame(() => {
      if (dialog.open && !closing) dialog.classList.add('is-visible');
    });
  }));

  function closeImage() {
    if (!dialog.open || closing) return;
    closing = true;
    dialog.classList.remove('is-visible');
    if (reducedMotion.matches) dialog.close();
    else closeTimer = setTimeout(() => dialog.close(), 250);
  }
  closeButton.addEventListener('click', closeImage);
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeImage();
  });
  dialog.addEventListener('pointerdown', event => { backdropStart = event.target === dialog; });
  dialog.addEventListener('click', event => {
    if (backdropStart && event.target === dialog) closeImage();
    backdropStart = false;
  });
  dialog.addEventListener('close', () => {
    clearTimeout(closeTimer);
    dialog.classList.remove('is-visible');
    if (savedStyles) {
      root.style.overflow = savedStyles.overflow;
      root.style.paddingRight = savedStyles.paddingRight;
    }
    image.removeAttribute('src');
    closing = false;
    opener.focus({ preventScroll: true });
  });
})();
