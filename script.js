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
