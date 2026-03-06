document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.navbar-toggle');
  const navMenu = document.querySelector('.navbar-nav');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      // Toggle the active class on both the button and the menu
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Update accessibility attribute
      const isOpen = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Optional: Close the menu automatically if a link is clicked
    document.querySelectorAll('.navbar-nav a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
});