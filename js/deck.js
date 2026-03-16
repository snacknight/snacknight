document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.projects-grid');
  const cards = [...grid.querySelectorAll('.project-card')];
  const dots = [...document.querySelectorAll('.deck-dot')];
  const section = document.querySelector('#projects');
  let locked = false;
  let activeIndex = 0;

  function setActive(i) {
    activeIndex = ((i % cards.length) + cards.length) % cards.length; // wraps both directions
    cards.forEach((c, idx) => c.classList.toggle('deck-active', idx === activeIndex));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === activeIndex));
  }

  function lock(startIndex) {
    if (locked) return;
    locked = true;
    grid.classList.add('deck-locked');
    setActive(startIndex);
  }

  function unlock() {
    if (!locked) return;
    locked = false;
    grid.classList.remove('deck-locked');
    cards.forEach(c => c.classList.remove('deck-active'));
    dots.forEach(d => d.classList.remove('active'));
    dots[0].classList.add('active'); // reset for next open
  }

  // Hover any card → lock
  cards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => lock(i));
  });

  // Click active card → navigate
  // Click empty space → unlock
  grid.addEventListener('click', (e) => {
    if (!locked) return;
    const clickedCard = e.target.closest('.project-card');
    if (clickedCard && clickedCard.classList.contains('deck-active')) {
      window.location.href = clickedCard.href;
    } else {
      unlock();
    }
    e.preventDefault();
  });

  // Dot clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => setActive(+dot.dataset.index));
  });

  // Close button
  document.querySelector('.deck-hint').addEventListener('click', () => unlock());

  // Escape key → unlock
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && locked) unlock();
  });

 let wheelCooldown = false;

section.addEventListener('wheel', (e) => {
  if (!locked) return;

  // Dominant axis check with dead zone
  const absX = Math.abs(e.deltaX);
  const absY = Math.abs(e.deltaY);

  if (absY > 30 && absY > absX * 2) {
    // Clearly vertical → unlock
    unlock();
    return;
  }

  if (absX > 5 && absX > absY) {
    // Horizontal → cycle, but debounce
    e.preventDefault();
    if (wheelCooldown) return;
    wheelCooldown = true;
    if (e.deltaX > 0) setActive(activeIndex + 1);
    else setActive(activeIndex - 1);
    setTimeout(() => { wheelCooldown = false; }, 250);
  }
}, { passive: false });

if (window.matchMedia('(max-width: 768px)').matches) {
  const mobileCards = document.querySelectorAll('.project-card');
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
  rootMargin: '-35% 0px -35% 0px'
});

  mobileCards.forEach(card => observer.observe(card));
}

});

