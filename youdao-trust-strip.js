(() => {
  const story = document.querySelector('#trust-building');
  if (!story) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'trust-lightbox';
  dialog.id = 'trust-lightbox';
  dialog.setAttribute('aria-modal', 'true');
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'trust-lightbox-close';
  close.setAttribute('aria-label', '关闭完整截图');
  close.textContent = '×';
  const fullImage = document.createElement('img');
  fullImage.className = 'trust-lightbox-image';
  dialog.append(close, fullImage);
  story.append(dialog);

  let opener;
  let previousOverflow;
  let previousPadding;
  const root = document.documentElement;
  function openImage(button, image) {
    if (dialog.open || !image.complete || !image.naturalWidth) return;
    opener = button;
    fullImage.src = image.dataset.fullSrc || image.currentSrc;
    fullImage.alt = image.alt;
    dialog.setAttribute('aria-label', button.getAttribute('aria-label'));
    previousOverflow = root.style.overflow;
    previousPadding = root.style.paddingRight;
    const scrollbar = window.innerWidth - root.clientWidth;
    if (scrollbar > 0) root.style.paddingRight = `${parseFloat(getComputedStyle(root).paddingRight) + scrollbar}px`;
    root.style.overflow = 'hidden';
    dialog.showModal();
    close.focus({ preventScroll: true });
  }
  close.addEventListener('click', () => dialog.close());
  let startedOnBackdrop = false;
  dialog.addEventListener('pointerdown', event => { startedOnBackdrop = event.target === dialog; });
  dialog.addEventListener('click', event => {
    if (event.target === dialog && startedOnBackdrop) dialog.close();
    startedOnBackdrop = false;
  });
  // Native <dialog> handles Escape and keeps Tab inside the modal.
  dialog.addEventListener('close', () => {
    root.style.overflow = previousOverflow;
    root.style.paddingRight = previousPadding;
    fullImage.removeAttribute('src');
    opener?.focus({ preventScroll: true });
  });

  story.querySelectorAll('.trust-image').forEach(image => {
    const button = image.closest('.trust-image-link');
    const excerpt = image.closest('.trust-evidence').querySelector('.trust-excerpt');
    button.setAttribute('aria-controls', dialog.id);
    button.addEventListener('click', () => openImage(button, image));
    image.addEventListener('load', () => {
      button.hidden = false;
      excerpt.hidden = true;
    });
    image.addEventListener('error', () => {
      button.hidden = true;
      excerpt.hidden = false;
    });
    image.src = image.dataset.src;
  });
})();
