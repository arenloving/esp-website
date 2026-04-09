// Scroll-triggered animations
document.addEventListener('DOMContentLoaded', function() {

  // Nav transparency on scroll
  var nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Auto-tag elements for animation
  const selectors = [
    '.section',
    '.team-card',
    '.lecture-card',
    '.offering-banner',
    '.resource-item',
    '.event-card',
    '.forum-placeholder',
    '.home-painting',
    '.home-closing',
    '.home-mission',
    '.team-section-title'
  ];

  const elements = document.querySelectorAll(selectors.join(', '));

  elements.forEach(function(el, i) {
    if (!el.classList.contains('animate-on-scroll')) {
      el.classList.add('animate-on-scroll');
    }
    // Stagger team cards and grid items
    if (el.classList.contains('team-card') || 
        el.classList.contains('resource-item') || 
        el.classList.contains('event-card')) {
      const siblings = Array.from(el.parentElement.children);
      const idx = siblings.indexOf(el);
      el.classList.add('delay-' + Math.min(idx + 1, 5));
    }
  });

  // Intersection Observer for scroll reveal
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
    observer.observe(el);
  });
});
