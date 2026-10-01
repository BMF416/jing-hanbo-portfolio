(() => {
  const entries = document.querySelectorAll('#about .about-entry');
  if (!entries.length) return;
  Object.assign(t.zh, { 'about.entry.life': '爱好生活', 'about.entry.role': '集体中<br>扮演的角色' });
  Object.assign(t.en, { 'about.entry.life': 'Life, observed', 'about.entry.role': 'Roles within<br>the collective' });
  setLanguage(document.documentElement.lang === 'en' ? 'en' : 'zh');

  const details = {
    observer: {
      number: '01',
      titleId: 'about-observer-title',
      title: { zh: '爱好生活', en: 'Life, observed' },
      zh: [
        ['观察 / 生活', '从日常场景与细节出发，留意人与环境之间的联系。'],
        ['摄影 / 记录', '用镜头记录光线、风景与生活中的片刻，也记录自己的视角。'],
        ['摩托 / 旅行 / 探索', '从骑行、旅行、自然与人文场景中寻找新的观察角度，让好奇心延伸到日常之外。']
      ],
      en: [
        ['OBSERVE / EVERYDAY LIFE', 'Notice everyday details and the connections between people and their surroundings.'],
        ['PHOTOGRAPH / DOCUMENT', 'Record light, landscapes, and passing moments through a personal lens.'],
        ['MOTORCYCLING / TRAVEL / EXPLORE', 'Find fresh perspectives through motorcycling, travel, nature, and cultural places.']
      ]
    },
    collaborator: {
      number: '02',
      titleId: 'about-collaborator-title',
      title: { zh: '集体中扮演的角色', en: 'Roles within the collective' },
      zh: [
        ['团队 / 协作', '在团队里承担衔接与沟通，让信息和行动保持一致。'],
        ['项目 / 组织', '从活动与赛事现场出发，关注人员配合、信息确认和现场安排。'],
        ['执行 / 设计', '把设计表达与实际工作连接起来，关注每一个从想法走向落地的环节。']
      ],
      en: [
        ['TEAM / COLLABORATE', 'Connect people and keep communication aligned with action.'],
        ['PROJECTS / ORGANIZE', 'Focus on coordination, clear information, and on-site arrangements at events.'],
        ['EXECUTE / DESIGN', 'Connect visual expression with practical work, following ideas through to delivery.']
      ]
    }
  };

  // Same native <dialog>/showModal interaction used by the existing video entry.
  const modal = document.createElement('dialog');
  modal.id = 'about-detail-dialog';
  modal.setAttribute('aria-labelledby', 'about-detail-title');
  modal.innerHTML = `<header class="about-detail-header"><p class="section-label"></p><button type="button" class="close-dialog" aria-label="关闭详情">×</button></header>
    <div class="about-detail-body"><h2 id="about-detail-title"></h2><p class="about-detail-intro"></p><img class="about-detail-art" alt=""><div class="about-detail-topics"></div></div>`;
  document.body.append(modal);
  const close = modal.querySelector('button');
  const root = document.documentElement;
  let opener;
  let previousOverflow;
  let previousPadding;
  let backdropStart = false;

  function render(button) {
    const detail = details[button.dataset.aboutDetail];
    const english = root.lang === 'en';
    const title = document.getElementById(detail.titleId);
    modal.querySelector('.section-label').textContent = `${detail.number} / ${english ? 'ABOUT ME' : '关于我'}`;
    modal.querySelector('h2').textContent = detail.title[english ? 'en' : 'zh'];
    modal.querySelector('.about-detail-intro').textContent = title.nextElementSibling.textContent;
    close.setAttribute('aria-label', english ? 'Close details' : '关闭详情');
    const image = button.querySelector('img');
    const full = modal.querySelector('.about-detail-art');
    full.src = image.currentSrc || image.src;
    full.alt = image.alt;
    const topics = detail[english ? 'en' : 'zh'].map(([heading, copy]) => {
      const article = document.createElement('article');
      const h3 = document.createElement('h3');
      const p = document.createElement('p');
      h3.textContent = heading;
      p.textContent = copy;
      article.append(h3, p);
      return article;
    });
    modal.querySelector('.about-detail-topics').replaceChildren(...topics);
  }

  entries.forEach(button => button.addEventListener('click', () => {
    if (modal.open) return;
    opener = button;
    render(button);
    previousOverflow = root.style.overflow;
    previousPadding = root.style.paddingRight;
    const scrollbar = window.innerWidth - root.clientWidth;
    if (scrollbar > 0) root.style.paddingRight = `${parseFloat(getComputedStyle(root).paddingRight) + scrollbar}px`;
    root.style.overflow = 'hidden';
    modal.showModal();
    modal.scrollTop = 0;
    close.focus({ preventScroll: true });
  }));
  close.addEventListener('click', () => modal.close());
  function outside(event) {
    const bounds = modal.getBoundingClientRect();
    return event.target === modal && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom);
  }
  modal.addEventListener('pointerdown', event => { backdropStart = outside(event); });
  modal.addEventListener('click', event => {
    if (backdropStart && outside(event)) modal.close();
    backdropStart = false;
  });
  // Escape, focus trapping, and keyboard activation are provided natively.
  modal.addEventListener('close', () => {
    root.style.overflow = previousOverflow;
    root.style.paddingRight = previousPadding;
    opener?.focus({ preventScroll: true });
  });
})();
