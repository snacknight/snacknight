document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.projects-grid');
  const cards = [...grid.querySelectorAll('.project-card')];
  const dots = [...document.querySelectorAll('.deck-dot')];
  const section = document.querySelector('#projects');

  // MOBILE OBSERVER — runs before the desktop-only early return
  if (window.matchMedia('(max-width: 600px)').matches) {
    let currentActive = null;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (currentActive && currentActive !== entry.target) {
            currentActive.classList.remove('mobile-active');
          }
          entry.target.classList.add('mobile-active');
          currentActive = entry.target;
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-25% 0px -55% 0px'
    });
    cards.forEach(card => observer.observe(card));

    // Portrait cards — same scroll-activated effect
    const portraits = [...document.querySelectorAll('.portrait-card')];
    let currentPortrait = null;
    const portraitObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (currentPortrait && currentPortrait !== entry.target) {
            currentPortrait.classList.remove('mobile-active');
          }
          entry.target.classList.add('mobile-active');
          currentPortrait = entry.target;
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-25% 0px -55% 0px'
    });
    portraits.forEach(p => portraitObserver.observe(p));

    return; // exit here on mobile, don't run any desktop code
  }

  // ---- DESKTOP ONLY BELOW ----

  function setActive(i) {
    const idx = ((i % cards.length) + cards.length) % cards.length;
    grid.classList.add('has-hover');
    cards.forEach((c, ci) => c.classList.toggle('deck-active', ci === idx));
    dots.forEach((d, di) => d.classList.toggle('active', di === idx));
  }

  function clearActive() {
    grid.classList.remove('has-hover');
    cards.forEach(c => c.classList.remove('deck-active'));
    dots.forEach(d => d.classList.remove('active'));
    dots[0].classList.add('active'); // reset for next open
  }

  // Hover on any card → activate it
  cards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => setActive(i));
  });

  // Mouse leaves grid entirely → snap back
  grid.addEventListener('mouseleave', () => clearActive());

  // Click active card → navigate to project page
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (card.classList.contains('deck-active')) {
        window.location.href = card.href;
      }
      e.preventDefault();
    });
  });

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => setActive(i));
  });

  // Close button
  document.querySelector('.deck-hint').addEventListener('click', () => clearActive());

  // Escape key → clear
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') clearActive();
  });

  // Wheel: horizontal cycles cards, strong vertical clears
  let wheelCooldown = false;

  section.addEventListener('wheel', (e) => {
    if (!grid.classList.contains('has-hover')) return;

    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);

    if (absY > 30 && absY > absX * 2) {
      clearActive();
      return;
    }

    if (absX > 5 && absX > absY) {
      e.preventDefault();
      if (wheelCooldown) return;
      wheelCooldown = true;
      const currentIdx = cards.findIndex(c => c.classList.contains('deck-active'));
      if (e.deltaX > 0) setActive(currentIdx + 1);
      else setActive(currentIdx - 1);
      setTimeout(() => { wheelCooldown = false; }, 250);
    }
  }, { passive: false });

});