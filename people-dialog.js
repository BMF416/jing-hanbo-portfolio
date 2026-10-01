(() => {
  const trigger = document.querySelector('.people-trigger');
  if (!trigger) return;

  Object.assign(t.zh, { 'tools.two': '我关注的人' });
  Object.assign(t.en, { 'tools.two': 'PEOPLE I FOLLOW' });
  trigger.querySelector('[data-i18n="tools.two"]').textContent =
    document.documentElement.lang === 'en' ? t.en['tools.two'] : t.zh['tools.two'];

  const dialog = document.createElement('dialog');
  dialog.id = 'people-dialog';
  dialog.className = 'people-dialog';
  dialog.lang = 'zh-CN';
  dialog.setAttribute('aria-labelledby', 'people-dialog-title');
  dialog.innerHTML = `
    <div class="people-dialog-header">
      <h2 id="people-dialog-title">我关注的人</h2>
      <button class="people-dialog-close" type="button" aria-label="关闭窗口">×</button>
    </div>
    <div class="people-cards">
      <a class="people-card" href="https://x.com/lennysan" target="_blank" rel="noopener noreferrer">
        <strong class="people-card-name">Lenny Rachitsky</strong>
        <span class="people-card-handle">@lennysan</span>
        <p class="people-card-description">分享产品增长与职业发展的实用方法。</p>
        <i class="people-card-arrow" aria-hidden="true">↗</i>
      </a>
      <a class="people-card" href="https://x.com/zarazhangrui" target="_blank" rel="noopener noreferrer">
        <strong class="people-card-name">张咋啦 Zara</strong>
        <span class="people-card-handle">@zarazhangrui</span>
        <p class="people-card-description">坚持长期主义的文科 AI 创作者，分享学习与实践 AI 的过程。</p>
        <i class="people-card-arrow" aria-hidden="true">↗</i>
      </a>
      <a class="people-card" href="https://x.com/sama" target="_blank" rel="noopener noreferrer">
        <strong class="people-card-name">Sam Altman</strong>
        <span class="people-card-handle">@sama</span>
        <p class="people-card-description">OpenAI 联合创始人；关注他对 AI 产品与行业方向的思考。</p>
        <i class="people-card-arrow" aria-hidden="true">↗</i>
      </a>
      <a class="people-card" href="https://x.com/joshwoodward" target="_blank" rel="noopener noreferrer">
        <strong class="people-card-name">Josh Woodward</strong>
        <span class="people-card-handle">@joshwoodward</span>
        <p class="people-card-description">Google Labs、Gemini 应用及 AI Studio 副总裁，分享 Google AI 产品的进展。</p>
        <i class="people-card-arrow" aria-hidden="true">↗</i>
      </a>
      <a class="people-card" href="https://x.com/petergyang" target="_blank" rel="noopener noreferrer">
        <strong class="people-card-name">Peter Yang</strong>
        <span class="people-card-handle">@petergyang</span>
        <p class="people-card-description">用幽默易懂的语言讲解 AI 与优质产品的打造。</p>
        <i class="people-card-arrow" aria-hidden="true">↗</i>
      </a>
    </div>`;
  document.body.append(dialog);

  const close = dialog.querySelector('.people-dialog-close');
  const root = document.documentElement;
  let previousOverflow;
  let previousPadding;
  let backdropStart = false;

  trigger.addEventListener('click', () => {
    if (dialog.open) return;
    previousOverflow = root.style.overflow;
    previousPadding = root.style.paddingRight;
    const scrollbar = innerWidth - root.clientWidth;
    if (scrollbar > 0) {
      root.style.paddingRight = `${parseFloat(getComputedStyle(root).paddingRight) + scrollbar}px`;
    }
    root.style.overflow = 'hidden';
    dialog.showModal();
    close.focus({ preventScroll: true });
  });

  close.addEventListener('click', () => dialog.close());
  function isBackdrop(event) {
    const bounds = dialog.getBoundingClientRect();
    return event.target === dialog && (
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom
    );
  }
  dialog.addEventListener('pointerdown', event => { backdropStart = isBackdrop(event); });
  dialog.addEventListener('click', event => {
    if (backdropStart && isBackdrop(event)) dialog.close();
    backdropStart = false;
  });
  dialog.addEventListener('close', () => {
    root.style.overflow = previousOverflow;
    root.style.paddingRight = previousPadding;
    trigger.focus({ preventScroll: true });
  });
})();
