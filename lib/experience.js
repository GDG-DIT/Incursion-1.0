import { REGISTER_URL } from './content';

/** Attach intro-gate, sound, and timeline reveal interactions. */
export function createExperience(root) {
  let disposed = false;
  const controller = new AbortController();
  const listen = (target, event, handler, options = {}) =>
    target?.addEventListener(event, handler, { ...options, signal: controller.signal });
  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => [...root.querySelectorAll(selector)];
  const iv = $('#iv');
  const gate = $('#gate');
  const term = $('#term');
  const skip = $('#skip');
  const soundButton = $('#snd');
  const topButton = $('#top');
  const oldLock = document.documentElement.classList.contains('lock');
  const oldScrollRestoration = history.scrollRestoration;
  const snapshots = [...root.querySelectorAll('*')].map((element) => ({
    element,
    className: element.getAttribute('class'),
    style: element.getAttribute('style'),
    inert: element.inert,
    text: element === soundButton ? element.textContent : null,
    pressed: element === soundButton ? element.getAttribute('aria-pressed') : null,
    target: element.getAttribute('target'),
    rel: element.getAttribute('rel'),
  }));
  const rows = $$('.row');
  let done = false;
  let started = false;
  let soundOn = true;
  let soundtrack = null;

  history.scrollRestoration = 'manual';
  if (window.location.hash) {
    history.replaceState(history.state, '', `${window.location.pathname}${window.location.search}`);
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.documentElement.classList.add('lock');

  function getSoundtrack() {
    if (!soundtrack) {
      soundtrack = new Audio('/media/soundtrack.mp3');
      soundtrack.loop = true;
      soundtrack.preload = 'none';
      soundtrack.volume = 0.3;
    }
    return soundtrack;
  }

  function updateSoundButton() {
    if (!soundButton) return;
    soundButton.textContent = soundOn ? 'Sound on' : 'Sound off';
    soundButton.setAttribute('aria-pressed', String(soundOn));
  }

  function syncSound() {
    if (iv) iv.muted = !soundOn;
    if (!started) return;
    const track = getSoundtrack();
    track.muted = !soundOn;
    if (done && soundOn && !document.hidden) track.play().catch(() => {});
    if (!soundOn) track.pause();
  }

  function finish() {
    if (disposed || done) return;
    done = true;
    iv?.pause();
    skip?.classList.remove('is-visible');
    gate?.classList.add('go');
    if (gate) gate.inert = true;
    document.documentElement.classList.remove('lock');
    term?.classList.add('out');
    if (term) term.inert = true;
    syncSound();
    soundButton?.focus({ preventScroll: true });
  }

  function enter(withSound) {
    if (started) return;
    started = true;
    soundOn = withSound;
    updateSoundButton();
    syncSound();
    gate?.classList.add('go');
    if (gate) gate.inert = true;
    skip?.classList.add('is-visible');
    skip?.focus({ preventScroll: true });
    const play = iv?.play();
    if (play?.catch) play.catch(finish);
  }

  listen($('#enter'), 'click', () => enter(true));
  listen($('#enterq'), 'click', () => enter(false));
  listen(skip, 'click', finish);
  listen(iv, 'ended', finish);
  listen(iv, 'error', finish);
  listen(soundButton, 'click', () => {
    soundOn = !soundOn;
    updateSoundButton();
    syncSound();
  });
  listen(document, 'visibilitychange', () => {
    if (document.hidden) {
      iv?.pause();
      soundtrack?.pause();
    } else if (started && !done) {
      iv?.play().catch(finish);
    } else if (started && done && soundOn && soundtrack) {
      soundtrack.play().catch(() => {});
    }
  });

  const onScroll = () => topButton?.classList.toggle('on', window.scrollY > 500);
  listen(window, 'scroll', onScroll, { passive: true });
  listen(topButton, 'click', () => window.scrollTo({
    top: 0,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  }));
  onScroll();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    rows.forEach((row) => observer.observe(row));
    controller.signal.addEventListener('abort', () => observer.disconnect(), { once: true });
  } else {
    rows.forEach((row) => row.classList.add('is-visible'));
  }

  if (REGISTER_URL) {
    $$('.header-register, .hero-actions .hero-primary, .closing .hero-primary').forEach((link) => {
      link.href = REGISTER_URL;
      link.target = '_blank';
      link.rel = 'noopener';
    });
  }

  return () => {
    disposed = true;
    controller.abort();
    iv?.pause();
    soundtrack?.pause();
    soundtrack?.removeAttribute('src');
    soundtrack?.load();
    document.documentElement.classList.toggle('lock', oldLock);
    history.scrollRestoration = oldScrollRestoration;
    for (const { element, className, style, inert, text, pressed, target, rel } of snapshots) {
      if (className === null) element.removeAttribute('class');
      else element.setAttribute('class', className);
      if (style === null) element.removeAttribute('style');
      else element.setAttribute('style', style);
      element.inert = inert;
      if (text !== null) element.textContent = text;
      if (element === soundButton) {
        if (pressed === null) element.removeAttribute('aria-pressed');
        else element.setAttribute('aria-pressed', pressed);
      }
      if (target === null) element.removeAttribute('target');
      else element.setAttribute('target', target);
      if (rel === null) element.removeAttribute('rel');
      else element.setAttribute('rel', rel);
    }
  };
}
