(() => {
  const svg = document.querySelector('.capability-map');
  if (!svg) return;
  // cx, cy, rx, ry. Both layouts keep every connection anchored to HANBO.
  const desktop = {
    hanbo: [580, 350, 126, 92],
    insight: [330, 205, 110, 76], communication: [580, 130, 114, 76], learning: [830, 205, 110, 76],
    presentation: [330, 500, 110, 67], collaboration: [580, 572, 114, 68], execution: [830, 500, 110, 67],
    ai: [125, 365, 88, 53], cross: [1035, 365, 101, 57]
  };
  const compact = {
    hanbo: [300, 500, 105, 85],
    insight: [145, 290, 126, 85], communication: [455, 290, 126, 85], learning: [300, 100, 126, 75],
    presentation: [145, 705, 124, 80], collaboration: [455, 705, 124, 80], execution: [300, 910, 124, 80],
    ai: [110, 1080, 94, 56], cross: [490, 1080, 99, 65]
  };
  let currentLayout;
  function layoutMap() {
    const narrow = svg.clientWidth <= 640;
    if (narrow === currentLayout) return;
    currentLayout = narrow;
    const positions = narrow ? compact : desktop;
    svg.setAttribute('viewBox', narrow ? '0 0 600 1160' : '0 0 1160 700');
    svg.classList.toggle('is-compact', narrow);
    Object.entries(positions).forEach(([id, [x, y, rx, ry]]) => {
      const node = svg.querySelector(`[data-node="${id}"]`);
      node.setAttribute('transform', `translate(${x} ${y})`);
      const ellipse = node.querySelector('ellipse');
      ellipse.setAttribute('rx', rx);
      ellipse.setAttribute('ry', ry);
      if (id === 'hanbo') return;
      const line = svg.querySelector(`[data-link="${id}"]`);
      line.setAttribute('x1', positions.hanbo[0]);
      line.setAttribute('y1', positions.hanbo[1]);
      line.setAttribute('x2', x);
      line.setAttribute('y2', y);
      node.querySelector('.node-name').setAttribute('y', narrow ? -17 : -9);
      node.querySelectorAll('tspan').forEach((span, index) => span.setAttribute('y', narrow ? 17 + index * 27 : 17 + index * 17));
    });
    const caption = svg.querySelector('.center-caption');
    if (narrow) {
      caption.replaceChildren();
      ['Sales ×', 'Communication ×', 'Growth'].forEach((text, index) => {
        const span = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        span.setAttribute('x', 0);
        span.setAttribute('y', 20 + index * 22);
        span.textContent = text;
        caption.append(span);
      });
    } else caption.textContent = 'Sales × Communication × Growth';
  }
  layoutMap();
  if ('ResizeObserver' in window) new ResizeObserver(layoutMap).observe(svg);
  else window.addEventListener('resize', layoutMap);

  // Content is visible without JS; the optional reveal never gates navigation.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || reduced.matches) return;
  const items = [...document.querySelectorAll('.reveal-section')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });
  items.forEach(item => {
    if (item.getBoundingClientRect().top >= innerHeight) {
      item.classList.add('is-pending');
      observer.observe(item);
    }
  });
  reduced.addEventListener('change', event => {
    if (event.matches) { observer.disconnect(); items.forEach(item => item.classList.remove('is-pending')); }
  });
})();
