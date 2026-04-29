// ==========================================================
// Amory Danvy — Portfolio
// JS minimal : Lenis smooth scroll + nav mobile + nav scroll state
// ==========================================================

(function () {
  'use strict';

  // --- Lenis smooth scroll ---
  // Si Lenis n'a pas chargé (offline / CDN down), on garde scroll-behavior CSS.
  let lenis = null;
  if (typeof window.Lenis === 'function') {
    lenis = new window.Lenis({
      duration: 1.05,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });
    window.__lenis = lenis;

    var raf = function (time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  // --- Anchor links : smooth scroll vers l'ancre, offset nav ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      var target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 56;
      var offset = -navH - 8;

      if (lenis) {
        lenis.scrollTo(target, { offset: offset, duration: 1.1 });
      } else {
        var top = target.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Nav mobile toggle ---
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');

  if (navToggle && navMobile) {
    var setMenuState = function (open) {
      navToggle.setAttribute('aria-expanded', String(open));
      navMobile.hidden = !open;
      var icon = navToggle.querySelector('i');
      if (icon) {
        icon.className = open ? 'ph ph-x' : 'ph ph-list';
      }
      navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    };

    setMenuState(false);

    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      setMenuState(!expanded);
    });

    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuState(false);
      });
    });

    // Fermer le menu au resize desktop
    var mq = window.matchMedia('(min-width: 861px)');
    var handleMQ = function (e) {
      if (e.matches) setMenuState(false);
    };
    if (mq.addEventListener) {
      mq.addEventListener('change', handleMQ);
    } else if (mq.addListener) {
      mq.addListener(handleMQ);
    }
  }

  // --- Nav scrolled state ---
  var nav = document.getElementById('nav');
  if (nav) {
    var isScrolled = false;
    var updateNav = function () {
      var scrolled = window.scrollY > 8;
      if (scrolled !== isScrolled) {
        isScrolled = scrolled;
        nav.classList.toggle('nav--scrolled', scrolled);
      }
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // --- Active section highlight in nav (scrollspy léger) ---
  var navLinks = document.querySelectorAll('.nav__list a[href^="#"], .nav__mobile a[href^="#"]');
  var sectionIds = Array.from(navLinks)
    .map(function (a) { return a.getAttribute('href').slice(1); })
    .filter(Boolean);
  var sections = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var setActive = function (id) {
      navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        var match = href === '#' + id;
        link.classList.toggle('is-active', match);
        if (match) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };

    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    sections.forEach(function (s) { spyObs.observe(s); });
  }

})();


// =============================================
// Cinematic corridor (was: cinematic-sequence)
// ----------------------------------------------------------------
// Section 600vh contenant :
//   - un canvas pinned 100vh qui scrub à travers /assets/sequence/frame_NNNN.webp
//   - 5 overlays (hero text + 3 teasers projets + transition finale) dont
//     l'opacity / translateY / scale sont pilotés par la position du scroll
//   - un dimmer noir qui se renforce quand un teaser est >50% visible
//
// Mobile (<768px) et prefers-reduced-motion : tout est rendu en stack par
// le CSS, on bail dès l'init pour ne rien animer.
// =============================================
(function initCinematicCorridor() {
  var canvas = document.getElementById('sequence-canvas');
  var section = document.querySelector('.cinematic-corridor');
  if (!canvas || !section) return;

  // Mobile : CSS gère le rendu en stack, JS reste en retrait.
  if (window.matchMedia('(max-width: 768px)').matches) return;

  // prefers-reduced-motion : idem, le CSS rend les overlays en flow normal.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ====== Canvas / frame scrubbing ======
  var ctx = canvas.getContext('2d');
  var FRAME_COUNT = 192;
  var pad = function (i) { return ('0000' + i).slice(-4); };
  var FRAME_PATH = function (i) { return 'assets/sequence/frame_' + pad(i) + '.webp'; };

  var images = new Array(FRAME_COUNT);
  var currentFrame = -1;
  var firstFrameOK = false;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    var rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (firstFrameOK && currentFrame >= 0) renderFrame(currentFrame);
  }

  function renderFrame(idx) {
    var img = images[idx];
    if (!img || !img.complete || !img.naturalWidth) return;
    var rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    var scale = Math.max(rect.width / img.naturalWidth, rect.height / img.naturalHeight);
    var w = img.naturalWidth * scale;
    var h = img.naturalHeight * scale;
    var x = (rect.width - w) / 2;
    var y = (rect.height - h) / 2;
    ctx.drawImage(img, x, y, w, h);
    currentFrame = idx;
  }

  function preloadBatch(start, end) {
    for (var i = start; i <= end && i <= FRAME_COUNT; i++) {
      (function (idx) {
        var img = new Image();
        img.src = FRAME_PATH(idx);
        img.onload = function () {
          if (idx === 1 && !firstFrameOK) {
            firstFrameOK = true;
            renderFrame(0);
          }
        };
        // pas d'auto-hide ici : si les frames manquent, le couloir reste vide
        // mais les overlays jouent quand même (hero text + teasers visibles).
        images[idx - 1] = img;
      })(i);
    }
  }

  // ====== Overlays ======
  // Fenêtres de fade par overlay, exprimées en progress 0..1 sur la section.
  // Reprend exactement le timing du brief.
  var dimmerEl = section.querySelector('.corridor-dimmer');
  var overlays = [
    { el: section.querySelector('[data-overlay="hero"]'),       inStart: 0,    inEnd: 0,    outStart: 0.12, outEnd: 0.15, isCard: false },
    { el: section.querySelector('[data-overlay="cv"]'),         inStart: 0.22, inEnd: 0.26, outStart: 0.33, outEnd: 0.37, isCard: true  },
    { el: section.querySelector('[data-overlay="newshunter"]'), inStart: 0.44, inEnd: 0.48, outStart: 0.55, outEnd: 0.59, isCard: true  },
    { el: section.querySelector('[data-overlay="vintgen"]'),    inStart: 0.66, inEnd: 0.70, outStart: 0.77, outEnd: 0.81, isCard: true  },
    { el: section.querySelector('[data-overlay="end"]'),        inStart: 0.90, inEnd: 0.94, outStart: 1.01, outEnd: 1.02, isCard: true  }
  ].filter(function (o) { return o.el; });

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  // Calcule { p, y, s } selon la position de scroll. Pas de transition :
  // l'opacity et le transform suivent linéairement la fenêtre de fade.
  function computeOverlayState(progress, range) {
    if (progress < range.inStart)  return { p: 0, y:  40, s: 0.96 };
    if (progress >= range.outEnd)  return { p: 0, y: -40, s: 1.02 };

    if (progress < range.inEnd) {
      // entrée : 0 → 1
      var t = (progress - range.inStart) / Math.max(0.0001, range.inEnd - range.inStart);
      return { p: t, y: lerp(40, 0, t), s: lerp(0.96, 1, t) };
    }
    if (progress < range.outStart) {
      // stable
      return { p: 1, y: 0, s: 1 };
    }
    // sortie : 1 → 0
    var t2 = (progress - range.outStart) / Math.max(0.0001, range.outEnd - range.outStart);
    return { p: 1 - t2, y: lerp(0, -40, t2), s: lerp(1, 1.02, t2) };
  }

  // État précédent par overlay → on évite d'écrire le DOM si rien n'a bougé.
  var lastState = overlays.map(function () { return { p: -1, y: 0, s: 1, active: false }; });

  function applyOverlays(progress) {
    var maxCardP = 0;

    for (var i = 0; i < overlays.length; i++) {
      var ov = overlays[i];
      var st = computeOverlayState(progress, ov);
      var prev = lastState[i];

      // Threshold pour limiter le nombre d'écritures style.setProperty (perf).
      if (Math.abs(st.p - prev.p) > 0.005 ||
          Math.abs(st.y - prev.y) > 0.5 ||
          Math.abs(st.s - prev.s) > 0.005) {
        ov.el.style.setProperty('--p', st.p.toFixed(3));
        ov.el.style.setProperty('--y', st.y.toFixed(1) + 'px');
        ov.el.style.setProperty('--s', st.s.toFixed(3));
        prev.p = st.p; prev.y = st.y; prev.s = st.s;
      }

      // a11y : retire l'overlay du tab order quand il est invisible.
      var nowActive = st.p > 0.5;
      if (nowActive !== prev.active) {
        if (nowActive) ov.el.removeAttribute('inert');
        else ov.el.setAttribute('inert', '');
        prev.active = nowActive;
      }

      if (ov.isCard && st.p > maxCardP) maxCardP = st.p;
    }

    // Dimmer : quand une card est >50% visible, monte vers 0.3 opacity.
    // (linear ramp de p=0.5 → dim=0 jusqu'à p=1 → dim=0.3)
    if (dimmerEl) {
      var dim = Math.max(0, (maxCardP - 0.5) * 2) * 0.3;
      dimmerEl.style.setProperty('--dim', dim.toFixed(3));
    }
  }

  // ====== Scroll loop : un seul rAF pour canvas + overlays ======
  var rafScheduled = false;
  var lastProgress = -1;

  function onScroll() {
    if (rafScheduled) return;
    rafScheduled = true;
    requestAnimationFrame(function () {
      rafScheduled = false;

      var rect = section.getBoundingClientRect();
      var total = section.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      var progress = clamp01(-rect.top / total);

      if (progress === lastProgress) return;
      lastProgress = progress;

      // Frame canvas
      if (firstFrameOK) {
        var idx = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
        if (idx !== currentFrame) renderFrame(idx);
      }

      // Overlays + dimmer
      applyOverlays(progress);
    });
  }

  // ====== Init ======
  resizeCanvas();
  preloadBatch(1, 30);
  // état initial des overlays (avant tout scroll)
  applyOverlays(0);

  window.addEventListener('load', function () {
    preloadBatch(31, FRAME_COUNT);
  });
  window.addEventListener('resize', function () {
    resizeCanvas();
    // forcer un recalcul d'overlay au resize (les fenêtres de progress
    // dépendent de section.offsetHeight qui peut bouger en responsive)
    lastProgress = -1;
    onScroll();
  });
  window.addEventListener('scroll', onScroll, { passive: true });
})();


// =============================================
// Project dialogs (HTML5 <dialog>, native focus trap + Esc to close)
// Lenis smooth-scroll is paused while a dialog is open so the wheel
// can scroll the modal body instead of the page underneath.
// =============================================
(function initProjectDialogs() {
  function pauseLenis() {
    if (window.__lenis && typeof window.__lenis.stop === 'function') {
      window.__lenis.stop();
    }
  }
  function resumeLenis() {
    if (window.__lenis && typeof window.__lenis.start === 'function') {
      window.__lenis.start();
    }
  }

  function openDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      // Very old browsers without HTMLDialogElement support
      dialog.setAttribute('open', '');
      dialog.classList.add('is-open-fallback');
    }
    pauseLenis();
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  // Open : click on a card (or any element with data-open-dialog="<dialog-id>")
  document.querySelectorAll('[data-open-dialog]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var id = trigger.getAttribute('data-open-dialog');
      openDialog(document.getElementById(id));
    });
  });

  // Close : × icon and footer "Fermer" button
  document.querySelectorAll('dialog [data-close-dialog]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeDialog(btn.closest('dialog'));
    });
  });

  document.querySelectorAll('dialog.project-dialog').forEach(function (dialog) {
    // Click on the backdrop (i.e. the dialog element itself, not its inner)
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) closeDialog(dialog);
    });
    // Native 'close' event fires for: .close(), Esc key, backdrop click.
    // We resume Lenis here, in one place, regardless of which closer triggered.
    dialog.addEventListener('close', resumeLenis);
  });
})();
