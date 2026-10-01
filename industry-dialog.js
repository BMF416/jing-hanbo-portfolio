(() => {
  const trigger = document.querySelector('.industry-trigger');
  if (!trigger) return;

  Object.assign(t.zh, { 'tools.three': '行业学习清单' });
  Object.assign(t.en, { 'tools.three': 'INDUSTRY LEARNING LIST' });
  trigger.querySelector('[data-i18n="tools.three"]').textContent =
    document.documentElement.lang === 'en' ? t.en['tools.three'] : t.zh['tools.three'];

  const dialog = document.createElement('dialog');
  dialog.id = 'industry-dialog';
  dialog.className = 'industry-dialog';
  dialog.lang = 'zh-CN';
  dialog.setAttribute('aria-labelledby', 'industry-dialog-title');
  dialog.innerHTML = `
    <div class="industry-dialog-header">
      <h2 id="industry-dialog-title">行业学习清单</h2>
      <button class="industry-dialog-close" type="button" aria-label="关闭窗口">×</button>
    </div>
    <div class="industry-cards">
      <a class="industry-card" href="https://www.youtube.com/watch?v=THyra3asywg" target="_blank" rel="noopener noreferrer">
        <strong class="industry-card-title">如何比较产品在不同市场的出口潜力</strong>
        <span class="industry-card-source">YouTube · International Trade Centre</span>
        <p class="industry-card-focus"><span>关注点</span>选目标市场时，先看哪些数据？</p>
        <i class="industry-card-arrow" aria-hidden="true">↗</i>
      </a>
      <a class="industry-card" href="https://www.youtube.com/watch?v=awJm1GgkSRI" target="_blank" rel="noopener noreferrer">
        <strong class="industry-card-title">2026—2027 年世界贸易展望</strong>
        <span class="industry-card-source">YouTube · World Trade Organization</span>
        <p class="industry-card-focus"><span>关注点</span>市场环境变化会怎样影响出口判断？</p>
        <i class="industry-card-arrow" aria-hidden="true">↗</i>
      </a>
      <a class="industry-card" href="https://www.youtube.com/watch?v=7g7IC4IzjDM" target="_blank" rel="noopener noreferrer">
        <strong class="industry-card-title">Incoterms® 2020 讲解</strong>
        <span class="industry-card-source">YouTube · IncoDocs</span>
        <p class="industry-card-focus"><span>关注点</span>报价前，需要弄清买卖双方各承担哪些费用和责任？</p>
        <i class="industry-card-arrow" aria-hidden="true">↗</i>
      </a>
    </div>`;
  document.body.append(dialog);

  const close = dialog.querySelector('.industry-dialog-close');
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
