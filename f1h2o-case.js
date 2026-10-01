/* Each photo opens its own unmodified source; native dialog handles focus trapping. */
(() => {
  const dialog = document.querySelector('#photo-lightbox');
  const preview = dialog.querySelector('.lightbox-image');
  const caption = dialog.querySelector('.lightbox-caption');
  const closeButton = dialog.querySelector('.lightbox-close');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let trigger = null;
  let previousOverflow = '';
  let previousBodyOverflow = '';
  let closeTimer;
  let pointerStartedOnBackdrop = false;

  document.querySelectorAll('.photo-trigger').forEach(button => {
    button.addEventListener('click', () => {
      if (dialog.open) return;
      const image = button.querySelector('img');
      trigger = button;
      preview.src = image.currentSrc || image.src;
      preview.alt = image.alt;
      caption.textContent = button.closest('figure').querySelector('figcaption').textContent.trim();
      previousOverflow = document.documentElement.style.overflow;
      previousBodyOverflow = document.body.style.overflow;
      dialog.classList.remove('is-closing');
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    });
  });

  function closePreview() {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    dialog.classList.add('is-closing');
    closeTimer = setTimeout(() => dialog.close(), reduceMotion.matches ? 0 : 250);
  }
  closeButton.addEventListener('click', closePreview);
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closePreview();
  });
  dialog.addEventListener('pointerdown', event => {
    pointerStartedOnBackdrop = event.target === dialog;
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog && pointerStartedOnBackdrop) closePreview();
    pointerStartedOnBackdrop = false;
  });
  dialog.addEventListener('close', () => {
    clearTimeout(closeTimer);
    dialog.classList.remove('is-closing');
    document.documentElement.style.overflow = previousOverflow;
    document.body.style.overflow = previousBodyOverflow;
    preview.removeAttribute('src');
    trigger?.focus({ preventScroll:true });
  });
})();
