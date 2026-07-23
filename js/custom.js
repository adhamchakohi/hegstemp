/* ============================================================
   Hegarty's Irish Pub Bremen — Custom JavaScript
   ============================================================ */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // 1. Menu Data
  // ----------------------------------------------------------
  const menuData = [
    // ----- Featured Beers & Spirits -----
    {
      category: 'Featured Beers & Spirits',
      name: 'Störtebecker United Style Lager',
      image: 'images/united-style-lager.png'
    },
    {
      category: 'Featured Beers & Spirits',
      name: 'Tillman Lager',
      image: 'https://www.beyondbeer.de/media/40/1f/69/1730733057/beyond-beer-tilmans-das-helle-1590001.jpg?ts=1753274617'
    },
    {
      category: 'Featured Beers & Spirits',
      name: 'Dublin Red Ale',
      image: 'https://pintplease.s3.eu-west-1.amazonaws.com/beer/profile/dublin_red_325117-160812153.jpeg'
    },

    // ----- Alcohol-Free Beers -----
    {
      category: 'Alcohol-Free Beers',
      name: 'Maisel IPA Alkoholfrei',
      image: 'https://www.beyondbeer.de/media/c9/df/9e/1730733267/beyond-beer-maisel-friends-alkoholfrei-1760004.jpg'
    },
    {
      category: 'Alcohol-Free Beers',
      name: 'Corona 0.0',
      image: 'https://dcdn-us.mitiendanube.com/stores/006/471/959/products/cerveza-corona-photoroom-4ec0c45b5d8a13f44d17534720963268-640-0.webp'
    },
    {
      category: 'Alcohol-Free Beers',
      name: 'Ratsherrn Pils 0.0',
      image: 'https://www.ratsherrn.shop/media/image/product/11417/md/pilsener-0.png'
    },
    {
      category: 'Alcohol-Free Beers',
      name: 'Störtebecker HefeWeizen Alkoholfrei',
      image: 'images/stoertebeker-hefeweizen-alkoholfrei.png'
    },

    // ----- Alcohol-Free Spirits -----
    {
      category: 'Alcohol-Free Spirits',
      name: 'Tanqueray 0.0%',
      image: 'images/tanqueray-00.png'
    },
    {
      category: 'Alcohol-Free Spirits',
      name: 'Gordons 0.0%',
      image: 'https://m.media-amazon.com/images/I/51OPdQAmelL._AC_SY445_SX342_QL70_ML2_.jpg'
    },
    {
      category: 'Alcohol-Free Spirits',
      name: 'Captain Morgan 0.0%',
      image: 'images/captain-morgan-00.png'
    },
    {
      category: 'Alcohol-Free Spirits',
      name: 'Deja vu aperitivo alc free',
      image: 'https://www.dejavu-aperitif.de/wp-content/uploads/2026/03/Bild12.jpg'
    },

    // ----- Alcohol-Free Cocktails -----
    {
      category: 'Alcohol-Free Cocktails',
      name: 'Alcohol Free Pina Colada',
      image: 'https://cdn11.bigcommerce.com/s-1ly92eod7l/images/stencil/1280x1280/products/3859/8464/_DBevg0070Und_1__09665.1768488077.jpg?c=1'
    },
    {
      category: 'Alcohol-Free Cocktails',
      name: 'London Mule',
      image: 'https://voelkel.bio/media/produkte/voelkel-london-mule-spritz-alkoholfrei-0-2-l_4015533062346_1769006106-307x1024.webp'
    },

    // ----- Irish Whiskey Selection -----
    {
      category: 'Irish Whiskey Selection',
      name: 'Powers',
      image: 'images/powers.png'
    },
    {
      category: 'Irish Whiskey Selection',
      name: 'Jameson black barrel',
      image: 'images/jameson-black-barrel.jpg'
    },
    {
      category: 'Irish Whiskey Selection',
      name: 'The whistler',
      image: 'images/the-whistler.jpg'
    },
    {
      category: 'Irish Whiskey Selection',
      name: 'Skibereen eagle',
      image: 'https://www.whisky.de/shop/out/pictures/generated/product/1/650_650_75/Nx60ximage_WESTCSKEA_1.jpg,q1771039086.pagespeed.ic.lYesjsYpcN.jpg'
    }
  ];

  // ----------------------------------------------------------
  // 2. Category Metadata
  // ----------------------------------------------------------
  const categoryMeta = {
    'Featured Beers & Spirits': {
      id: 'featured-beers-spirits',
      kicker: 'On Tap & In Bottle',
      desc: 'Hand-picked favourites from Germany and Ireland'
    },
    'Alcohol-Free Beers': {
      id: 'alcohol-free-beers',
      kicker: 'Alcohol-Free',
      desc: 'Crisp, refreshing, and zero alcohol'
    },
    'Alcohol-Free Spirits': {
      id: 'alcohol-free-spirits',
      kicker: 'Zero Proof',
      desc: 'Full flavour without the alcohol'
    },
    'Alcohol-Free Cocktails': {
      id: 'alcohol-free-cocktails',
      kicker: 'Mocktails',
      desc: 'Thoughtfully crafted alcohol-free cocktails'
    },
    'Irish Whiskey Selection': {
      id: 'irish-whiskey-selection',
      kicker: 'Pure Gold',
      desc: 'A carefully curated selection of Irish whiskeys'
    }
  };

  // ----------------------------------------------------------
  // 3. State
  // ----------------------------------------------------------
  let carouselInstances = [];
  let reducedMotion = false;

  // ----------------------------------------------------------
  // 4. Detect Reduced Motion
  // ----------------------------------------------------------
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion = motionQuery.matches;

  motionQuery.addEventListener('change', function () {
    reducedMotion = motionQuery.matches;
    // Re-init carousels with updated setting
    carouselInstances.forEach(function (instance) {
      if (instance) {
        const options = getCarouselOptions();
        instance._config.interval = options.interval;
        if (reducedMotion) {
          instance.pause();
        }
      }
    });
  });

  // ----------------------------------------------------------
  // 5. Carousel Options Factory
  // ----------------------------------------------------------
  function getCarouselOptions() {
    return {
      interval: reducedMotion ? false : 5000,
      wrap: true,
      keyboard: false
    };
  }

  // ----------------------------------------------------------
  // 6. Generate Carousels
  // ----------------------------------------------------------
  function buildMenu() {
    const container = document.getElementById('menu-container');
    if (!container) return;

    // Group items by category (preserve order)
    var categories = [];
    var seen = {};

    menuData.forEach(function (item) {
      if (!seen[item.category]) {
        seen[item.category] = true;
        categories.push(item.category);
      }
    });

    // Build a section per category
    categories.forEach(function (catName) {
      var meta = categoryMeta[catName];
      if (!meta) return;

      var items = menuData.filter(function (i) { return i.category === catName; });
      if (items.length === 0) return;

      var section = document.createElement('section');
      section.className = 'category-section';
      section.id = meta.id;

      // Container
      var fluidDiv = document.createElement('div');
      fluidDiv.className = 'container-fluid';

      // Section header
      var header = document.createElement('header');
      header.className = 'section-header text-center';

      var kicker = document.createElement('span');
      kicker.className = 'section-kicker';
      kicker.textContent = meta.kicker;

      var title = document.createElement('h2');
      title.className = 'section-title';
      title.textContent = catName;

      var desc = document.createElement('p');
      desc.className = 'section-desc';
      desc.textContent = meta.desc;

      header.appendChild(kicker);
      header.appendChild(title);
      header.appendChild(desc);

      fluidDiv.appendChild(header);

      // Carousel card wrapper
      var card = document.createElement('div');
      card.className = 'carousel-card';

      // Carousel element
      var carouselId = 'carousel-' + meta.id;
      var carousel = document.createElement('div');
      carousel.id = carouselId;
      carousel.className = 'carousel slide carousel-fade';
      carousel.setAttribute('data-bs-ride', 'carousel');
      carousel.setAttribute('tabindex', '0');
      carousel.setAttribute('aria-roledescription', 'carousel');
      carousel.setAttribute('aria-label', catName);

      // Inner
      var inner = document.createElement('div');
      inner.className = 'carousel-inner';

      // Generate slides
      items.forEach(function (item, idx) {
        var slideDiv = document.createElement('div');
        slideDiv.className = 'carousel-item' + (idx === 0 ? ' active' : '');
        slideDiv.setAttribute('role', 'group');
        slideDiv.setAttribute('aria-roledescription', 'slide');
        slideDiv.setAttribute('aria-label', item.name);

        var content = document.createElement('div');
        content.className = 'slide-content';

        var frame = document.createElement('div');
        frame.className = 'image-frame';

        if (item.image) {
          // Real image
          var img = document.createElement('img');
          img.src = item.image;
          img.alt = item.name;
          img.loading = 'lazy';
          img.classList.add('no-fade'); // start visible; fade-in via load event
          img.style.opacity = '0';

          // Fade in on load
          img.addEventListener('load', function () {
            this.style.opacity = '1';
            this.classList.add('loaded');
            this.classList.remove('no-fade');
          });

          // Image error fallback
          img.addEventListener('error', function () {
            createPlaceholder(frame, item.name);
          });

          frame.appendChild(img);
        } else {
          // No image: create placeholder directly
          createPlaceholder(frame, item.name);
        }

        content.appendChild(frame);

        // Caption
        var caption = document.createElement('div');
        caption.className = 'carousel-caption';

        var heading = document.createElement('h3');
        heading.className = 'product-name';
        heading.textContent = item.name;

        caption.appendChild(heading);
        content.appendChild(caption);

        slideDiv.appendChild(content);
        inner.appendChild(slideDiv);
      });

      carousel.appendChild(inner);

      // Controls: Prev
      var prevBtn = document.createElement('button');
      prevBtn.className = 'carousel-control-prev';
      prevBtn.type = 'button';
      prevBtn.setAttribute('data-bs-target', '#' + carouselId);
      prevBtn.setAttribute('data-bs-slide', 'prev');

      var prevIcon = document.createElement('span');
      prevIcon.className = 'carousel-control-prev-icon';
      prevIcon.setAttribute('aria-hidden', 'true');

      var prevSr = document.createElement('span');
      prevSr.className = 'visually-hidden';
      prevSr.textContent = 'Previous';

      prevBtn.appendChild(prevIcon);
      prevBtn.appendChild(prevSr);

      // Controls: Next
      var nextBtn = document.createElement('button');
      nextBtn.className = 'carousel-control-next';
      nextBtn.type = 'button';
      nextBtn.setAttribute('data-bs-target', '#' + carouselId);
      nextBtn.setAttribute('data-bs-slide', 'next');

      var nextIcon = document.createElement('span');
      nextIcon.className = 'carousel-control-next-icon';
      nextIcon.setAttribute('aria-hidden', 'true');

      var nextSr = document.createElement('span');
      nextSr.className = 'visually-hidden';
      nextSr.textContent = 'Next';

      nextBtn.appendChild(nextIcon);
      nextBtn.appendChild(nextSr);

      carousel.appendChild(prevBtn);
      carousel.appendChild(nextBtn);

      // Indicators
      var indicators = document.createElement('div');
      indicators.className = 'carousel-indicators';

      items.forEach(function (item, idx) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('data-bs-target', '#' + carouselId);
        dot.setAttribute('data-bs-slide-to', String(idx));
        dot.setAttribute('aria-label', item.name + ' slide ' + (idx + 1));
        if (idx === 0) {
          dot.classList.add('active');
          dot.setAttribute('aria-current', 'true');
        }
        indicators.appendChild(dot);
      });

      carousel.appendChild(indicators);
      card.appendChild(carousel);
      fluidDiv.appendChild(card);
      section.appendChild(fluidDiv);
      container.appendChild(section);
    });
  }

  // ----------------------------------------------------------
  // 7. Placeholder Creator (for missing / broken images)
  // ----------------------------------------------------------
  function createPlaceholder(frame, productName) {
    // Remove any existing image in the frame
    var existingImg = frame.querySelector('img');
    if (existingImg) {
      existingImg.remove();
    }

    // Check if placeholder already exists
    if (frame.querySelector('.image-placeholder')) return;

    var placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.textContent = productName;
    frame.appendChild(placeholder);
  }

  // ----------------------------------------------------------
  // 8. Initialize Carousels
  // ----------------------------------------------------------
  function initCarousels() {
    carouselInstances = [];
    var carousels = document.querySelectorAll('.carousel-card .carousel');

    carousels.forEach(function (el) {
      var options = getCarouselOptions();
      var instance = new bootstrap.Carousel(el, options);
      carouselInstances.push(instance);

      // Store instance reference on element for keyboard handler
      el._bsCarousel = instance;
    });
  }

  // ----------------------------------------------------------
  // 9. Custom Keyboard Navigation
  // ----------------------------------------------------------
  function initKeyboardNav() {
    document.addEventListener('keydown', function (e) {
      // Only handle left/right arrows
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

      var active = document.activeElement;
      if (!active) return;

      // Check if the focused element is inside a carousel-card
      var card = active.closest('.carousel-card');
      if (!card) return;

      var carouselEl = card.querySelector('.carousel');
      if (!carouselEl) return;

      var instance = carouselEl._bsCarousel;
      if (!instance) return;

      e.preventDefault();

      if (e.key === 'ArrowLeft') {
        instance.prev();
      } else if (e.key === 'ArrowRight') {
        instance.next();
      }
    });
  }

  // ----------------------------------------------------------
  // 10. IntersectionObserver — Pause off-screen carousels
  // ----------------------------------------------------------
  function initIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var carouselEl = entry.target.querySelector('.carousel');
          if (!carouselEl) return;

          var instance = carouselEl._bsCarousel;
          if (!instance) return;

          if (entry.isIntersecting) {
            // Only cycle if not reduced motion
            if (!reducedMotion) {
              instance.cycle();
            }
          } else {
            instance.pause();
          }
        });
      },
      {
        threshold: 0.25
      }
    );

    var sections = document.querySelectorAll('.category-section');
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ----------------------------------------------------------
  // 11. Section Header Scroll Animation
  // ----------------------------------------------------------
  function initHeaderAnimations() {
    if (reducedMotion) {
      // Make all headers immediately visible
      document.querySelectorAll('.section-header').forEach(function (h) {
        h.classList.add('visible');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.section-header').forEach(function (h) {
        h.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after animate
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    document.querySelectorAll('.section-header').forEach(function (h) {
      observer.observe(h);
    });
  }

  // ----------------------------------------------------------
  // 12. Set Footer Year
  // ----------------------------------------------------------
  function setFooterYear() {
    var yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // ----------------------------------------------------------
  // 13. Bootstrap: Auto-pause on hover (default) – we enhance
  //     by ensuring all have data-bs-pause="hover"
  // ----------------------------------------------------------
  function enhancePauseOnHover() {
    document.querySelectorAll('.carousel-card .carousel').forEach(function (el) {
      if (!el.hasAttribute('data-bs-pause')) {
        el.setAttribute('data-bs-pause', 'hover');
      }
    });
  }

  // ----------------------------------------------------------
  // 14. Bootstrap: Ensure touch targets are ≥44px
  //     (handled in CSS; this is a safety check in JS)
  // ----------------------------------------------------------
  // Already done in CSS with min-width/min-height on indicators
  // and width/height on control buttons.

  // ----------------------------------------------------------
  // 15. Initialization
  // ----------------------------------------------------------
  function init() {
    // Build the DOM
    buildMenu();

    // Enhance carousel markup
    enhancePauseOnHover();

    // Initialize Bootstrap carousels
    initCarousels();

    // Keyboard navigation
    initKeyboardNav();

    // IntersectionObserver for off-screen pausing
    initIntersectionObserver();

    // Section header scroll animations
    initHeaderAnimations();

    // Footer year
    setFooterYear();

    // Log success
    console.log('[Hegarty\'s] Menu loaded successfully.');
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
