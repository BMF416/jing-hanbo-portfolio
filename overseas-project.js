(() => {
  const section = document.querySelector('#insight.export-project');
  const card = section?.querySelector('.ep-case-card');
  if (!card) return;

  // Keep the existing navigation label in sync with the case section.
  Object.assign(t.zh, { 'nav.insight': '出海实践' });
  Object.assign(t.en, { 'nav.insight': 'GLOBAL PRACTICE' });
  setLanguage(document.documentElement.lang === 'en' ? 'en' : 'zh');

  const dialog = document.createElement('dialog');
  dialog.id = 'project-detail-dialog';
  dialog.lang = 'zh-CN';
  dialog.setAttribute('aria-label', '海外客户开发模拟案例');
  dialog.innerHTML = `
    <div class="ep-dialog-header">
      <span class="ep-dialog-index">04 / 出海实践 · 海外客户开发模拟案例</span>
      <button class="ep-close" type="button" aria-label="关闭案例">×</button>
    </div>
    <iframe class="ep-case-frame"
      title="海外客户开发模拟案例完整内容"
      src="assets/overseas/overseas-case-content.html"></iframe>`;
  document.body.append(dialog);

  const close = dialog.querySelector('.ep-close');
  const frame = dialog.querySelector('.ep-case-frame');
  const root = document.documentElement;
  let opener;
  let oldOverflow;
  let oldPadding;
  let backdropStart = false;

  card.addEventListener('click', () => {
    if (dialog.open) return;
    opener = card;
    oldOverflow = root.style.overflow;
    oldPadding = root.style.paddingRight;
    const scrollbar = innerWidth - root.clientWidth;
    if (scrollbar > 0) {
      root.style.paddingRight = `${parseFloat(getComputedStyle(root).paddingRight) + scrollbar}px`;
    }
    root.style.overflow = 'hidden';
    dialog.showModal();
    close.focus({ preventScroll: true });
  });

  close.addEventListener('click', () => dialog.close());
  window.addEventListener('message', event => {
    if (event.source === frame.contentWindow &&
        event.data?.type === 'overseas-case:escape' &&
        dialog.open) {
      dialog.close();
    }
  });
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
    root.style.paddingRight = oldPadding;
    opener?.focus({ preventScroll: true });
  });
})();
