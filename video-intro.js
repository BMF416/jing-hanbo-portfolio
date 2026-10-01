(() => {
  const dialog = document.querySelector('#video-dialog');
  const video = dialog?.querySelector('video');
  const posterButton = document.querySelector('.video-window.video-trigger');
  const copy = document.querySelector('.video-copy [data-i18n="video.copy"]');
  if (!dialog || !video || !posterButton || !copy) return;

  t.zh['video.copy'] = '这是一段关于我如何从设计走向商业与全球化领域的自我介绍。';
  t.en['video.copy'] = 'A short introduction to my path from design to business and global work.';

  const syncLanguage = () => {
    const english = document.documentElement.lang === 'en';
    copy.textContent = english ? t.en['video.copy'] : t.zh['video.copy'];
    posterButton.setAttribute('aria-label', english ? 'Play video introduction' : '播放视频介绍');
    dialog.setAttribute('aria-label', english ? 'Video introduction player' : '视频介绍播放器');
    dialog.querySelector('.close-dialog').setAttribute('aria-label', english ? 'Close video player' : '关闭视频播放器');
    video.setAttribute('aria-label', english ? 'Video introduction, about 1 minute 59 seconds' : '视频介绍，约 1 分 59 秒');
  };
  syncLanguage();
  document.querySelectorAll('.language').forEach(button => button.addEventListener('click', syncLanguage));

  let opener = null;
  document.querySelectorAll('#video .video-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => { opener = trigger; });
  });
  dialog.addEventListener('close', () => {
    video.pause();
    try { video.currentTime = 0; } catch { /* Metadata may not have loaded yet. */ }
    opener?.focus({ preventScroll: true });
  });
})();
