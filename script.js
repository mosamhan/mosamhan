document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Reveal (IntersectionObserver) ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // Stagger skill tags within the skills grid
        if (entry.target.id === 'skillsGrid') {
          entry.target.querySelectorAll('.skill-tag').forEach((tag, i) => {
            setTimeout(() => tag.classList.add('visible'), i * 50);
          });
        }

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // --- Nav Background on Scroll ---
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');

  const updateNav = () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // --- Active Nav Link Tracking ---
  const sections = document.querySelectorAll('main .section, main .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveLink = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 200;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      link.classList.toggle('active', href === current);
    });
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // --- Mobile Menu Toggle ---
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  const closeMenu = () => {
    toggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      toggle.classList.add('active');
      mobileMenu.classList.add('active');
      document.body.classList.add('no-scroll');
    }
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Hide Scroll CTA After Scrolling ---
  const scrollCta = document.querySelector('.scroll-cta');
  if (scrollCta) {
    const hideOnScroll = () => {
      if (window.scrollY > 200) {
        scrollCta.style.opacity = '0';
        scrollCta.style.pointerEvents = 'none';
      } else {
        scrollCta.style.opacity = '';
        scrollCta.style.pointerEvents = '';
      }
    };
    window.addEventListener('scroll', hideOnScroll, { passive: true });
  }
});
