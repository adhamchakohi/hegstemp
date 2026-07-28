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

  /* Horizontal drink carousels — one per page.
     nested:true keeps horizontal swipes from moving the outer
     vertical pager (and vice versa). loop:true wraps around, so
     the chevrons never disable — consistent with autoplay, which
     pauses on touch and resumes (disableOnInteraction: false).
     Position shows as a minimal "2 / 4" fraction. */
  var carousels = Array.prototype.map.call(
    document.querySelectorAll('.swiper--drinks'),
    function (el) {
      return new Swiper(el, {
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
          : { delay: 4500, disableOnInteraction: false },
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          type: 'fraction'
        }
      });
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
