/* GRC Engineering Club — Singapore Chapter
   Progressive enhancement only: the page is fully readable without this file. */
(function () {
  'use strict';

  /* ---- Sticky header state ------------------------------------------- */
  var header = document.getElementById('siteHeader');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 12);
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile navigation --------------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) closeNav();
    });
  }

  /* ---- Reveal on scroll ---------------------------------------------- */
  var items = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!items.length) return;

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  Array.prototype.forEach.call(items, function (el, i) {
    el.style.transitionDelay = Math.min(i % 5, 4) * 60 + 'ms';
    observer.observe(el);
  });
})();
