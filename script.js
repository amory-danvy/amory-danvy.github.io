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
// Scroll-scrubbed cinematic sequence
// Frames attendues dans /assets/sequence/frame_NNNN.webp (4 digits, 1..FRAME_COUNT).
// Si la frame 0001 retourne 404, la section s'auto-masque (zéro impact visible).
// =============================================
(function initCinematicSequence() {
  var canvas = document.getElementById('sequence-canvas');
  if (!canvas) return;

  // Skip mobile : CSS cache déjà la section, on évite tout préchargement.
  if (window.matchMedia('(max-width: 768px)').matches) return;

  // Respect prefers-reduced-motion : on n'anime pas le scrubbing,
  // on cache la section (250vh de scroll inutile sinon).
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var sec = canvas.closest('.cinematic-sequence');
    if (sec) sec.style.display = 'none';
    return;
  }

  var section = canvas.closest('.cinematic-sequence');
  if (!section) return;

  var ctx = canvas.getContext('2d');
  var FRAME_COUNT = 192;
  var pad = function (i) { return ('0000' + i).slice(-4); };
  var FRAME_PATH = function (i) { return 'assets/sequence/frame_' + pad(i) + '.webp'; };

  var images = new Array(FRAME_COUNT);
  var currentFrame = 0;
  var firstFrameOK = false;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    var rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    // setTransform reset puis applique — pas d'accumulation à chaque resize.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (firstFrameOK) render(currentFrame);
  }

  function render(frameIndex) {
    var img = images[frameIndex];
    if (!img || !img.complete || !img.naturalWidth) return;
    var rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    // Cover : remplir tout le canvas en gardant l'aspect.
    var scale = Math.max(rect.width / img.naturalWidth, rect.height / img.naturalHeight);
    var w = img.naturalWidth * scale;
    var h = img.naturalHeight * scale;
    var x = (rect.width - w) / 2;
    var y = (rect.height - h) / 2;
    ctx.drawImage(img, x, y, w, h);
    currentFrame = frameIndex;
  }

  function preloadBatch(start, end) {
    for (var i = start; i <= end && i <= FRAME_COUNT; i++) {
      (function (idx) {
        var img = new Image();
        img.src = FRAME_PATH(idx);
        img.onload = function () {
          if (idx === 1 && !firstFrameOK) {
            firstFrameOK = true;
            render(0);
          }
        };
        img.onerror = function () {
          if (idx === 1) {
            // Frame 0001 absente → la séquence n'a pas de matière, on
            // masque la section pour ne pas créer un trou de 250vh.
            section.style.display = 'none';
          }
        };
        images[idx - 1] = img;
      })(i);
    }
  }

  // Throttle scroll → 1 frame par rAF.
  var rafScheduled = false;
  function onScroll() {
    if (rafScheduled) return;
    rafScheduled = true;
    requestAnimationFrame(function () {
      rafScheduled = false;
      if (!firstFrameOK) return;
      var rect = section.getBoundingClientRect();
      var total = section.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      var scrolled = -rect.top;
      var progress = Math.min(1, Math.max(0, scrolled / total));
      var frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
      if (frameIndex !== currentFrame) render(frameIndex);
    });
  }

  resizeCanvas();
  preloadBatch(1, 30);

  window.addEventListener('load', function () {
    preloadBatch(31, FRAME_COUNT);
  });
  window.addEventListener('resize', resizeCanvas);
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
