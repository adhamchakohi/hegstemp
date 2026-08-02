/* ============================================================
   Hegarty's — Drinks Menu
   Generic Swiper wiring only. Zero drink data in this file —
   everything is read from the DOM structure in index.html:
     .swiper--pages   vertical pager (one slide per menu page)
     .swiper--drinks  horizontal carousel inside each page
   Prev/next chevrons and the fraction counter are picked up per
   carousel — adding a page needs no changes here.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Autoplay stops on the first user interaction (disableOnInteraction: true).
     Restart it 10 s after the LAST interaction — but only while this carousel
     is the visible page and the tab is visible (mirrors the syncUi rule). */
  var RESUME_AFTER_MS = 10000;
  var resumeTimers = {};

  function scheduleAutoplayResume(carousel, index) {
    if (reduceMotion || !carousel.autoplay) return;
    clearTimeout(resumeTimers[index]);
    resumeTimers[index] = setTimeout(function () {
      if (index === pages.activeIndex && !document.hidden) {
        carousel.autoplay.start();
      }
    }, RESUME_AFTER_MS);
  }

  /* Horizontal drink carousels — one per page.
     nested:true keeps horizontal swipes from moving the outer
     vertical pager (and vice versa). loop:true wraps around, so
     the chevrons never disable. Autoplay stops on the first user
     interaction (disableOnInteraction: true) and resumes 10 s after
     the last interaction via scheduleAutoplayResume above.
     Position shows as a minimal "2 / 4" fraction. */
  var carousels = Array.prototype.map.call(
    document.querySelectorAll('.swiper--drinks'),
    function (el, index) {
      var swiper = new Swiper(el, {
        nested: true,
        slidesPerView: 1,
        speed: 550,
        loop: true,
        grabCursor: true,
        keyboard: { enabled: true, onlyInViewport: true },
        navigation: {
          prevEl: el.querySelector('.swiper-button-prev'),
          nextEl: el.querySelector('.swiper-button-next')
        },
        autoplay: reduceMotion
          ? false
          : { delay: 4500, disableOnInteraction: true },
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          type: 'fraction'
        }
      });

      /* Any interaction (swipe, chevron tap, arrow key) restarts the
         10 s countdown; autoplay resumes when it elapses. */
      el.addEventListener('pointerdown', function () {
        scheduleAutoplayResume(swiper, index);
      });
      document.addEventListener('keydown', function () {
        if (index === pages.activeIndex) {
          scheduleAutoplayResume(swiper, index);
        }
      });

      return swiper;
    }
  );

  /* Vertical pager — touch flick + mousewheel, TikTok-reels feel */
  var pages = new Swiper('.swiper--pages', {
    direction: 'vertical',
    slidesPerView: 1,
    speed: 700,
    grabCursor: true,
    mousewheel: { forceToAxis: true },
    keyboard: { enabled: true, onlyInViewport: true },
    on: { slideChange: syncUi }
  });

  /* Only the visible page's carousel auto-advances;
     the scroll hint fades out on the last page. */
  function syncUi() {
    document.body.classList.toggle('is-last-page', pages.isEnd);

    carousels.forEach(function (carousel, index) {
      if (!carousel.autoplay) return; /* autoplay disabled (reduced motion) */
      if (index === pages.activeIndex && !document.hidden) {
        carousel.autoplay.start();
      } else {
        carousel.autoplay.stop();
      }
    });
  }

  syncUi();

  /* Pause auto-advance while the tab is hidden, resume on return */
  document.addEventListener('visibilitychange', syncUi);
})();
