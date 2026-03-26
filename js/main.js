document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. HAMBURGER MENU LOGIC
  // ==========================================
  const hamburger = document.querySelector('.navbar-toggle');
  const navMenu = document.querySelector('.navbar-nav');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      const isOpen = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    document.querySelectorAll('.navbar-nav a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

// ==========================================
  // 2. SMART SECTION-BY-SECTION ELEVATOR
  // ==========================================
  const navContainer = document.getElementById('navContainer');
  const backToTopBtn = document.getElementById('backToTop');
  const scrollDownBtn = document.getElementById('scrollDown');

  const sectionIds = ['home', 'projects', 'about', 'contact', 'blog'];
  const sectionNames = {
    'home': 'the top',
    'projects': 'projects',
    'about': 'about',
    'contact': 'contact',
    'blog': 'blog'
  };

  if (navContainer && backToTopBtn && scrollDownBtn) {
    let targetSectionUp = null;
    let targetSectionDown = null;

    window.addEventListener('scroll', () => {
      // 1. Show the whole container once the user starts scrolling down a tiny bit
      if (window.scrollY > 150) {
        navContainer.classList.add('show');
      } else {
        navContainer.classList.remove('show');
      }

      // 2. Find all active sections
      const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(el => el !== null);

      let currentSectionIndex = 0;

      // 3. Figure out what we are currently looking at
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top < 150) {
          currentSectionIndex = i;
          break;
        }
      }

      // 4. Calculate targets
      const targetUpIndex = Math.max(0, currentSectionIndex - 1);
      targetSectionUp = sections[targetUpIndex];
      
      const targetDownIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
      targetSectionDown = sections[targetDownIndex];

      // 5. Update UP Button text & visibility
      if (currentSectionIndex === 0 && window.scrollY < 150) {
        backToTopBtn.style.display = 'none'; // Hide if at very top
      } else {
        backToTopBtn.style.display = 'flex';
        const upId = targetSectionUp ? targetSectionUp.id : 'home';
        backToTopBtn.innerText = `▲ ${sectionNames[upId]}`;
      }

      // 6. Update DOWN Button text & visibility
      // Check if we hit the very bottom of the entire webpage
      const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;
      
      if (currentSectionIndex === sections.length - 1 || isAtBottom) {
         scrollDownBtn.style.display = 'none'; // Hide if at very bottom
      } else {
         scrollDownBtn.style.display = 'flex';
         const downId = targetSectionDown ? targetSectionDown.id : 'blog';
         scrollDownBtn.innerText = `▼ ${sectionNames[downId]}`;
      }
    });

    // Handle Clicks
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (targetSectionUp) {
        targetSectionUp.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      }
    });

    scrollDownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (targetSectionDown) {
        targetSectionDown.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}); 