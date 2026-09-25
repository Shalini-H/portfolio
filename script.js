/* ==========================================================================
   Shalini H - Professional Portfolio JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Placement-focused Typewriter for Hero
  const typedTextSpan = document.getElementById('typedText');
  const textArray = [
    'Computer Engineering Student',
    'DSA & OOPs Enthusiast',
    'Software Engineer Aspirant',
    'Problem Solver & Quick Learner'
  ];
  const typingDelay = 75;
  const erasingDelay = 35;
  const newTextDelay = 1800;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 300);
    }
  }

  if (typedTextSpan && textArray.length) {
    setTimeout(type, 300);
  }

  // 2. Dynamic Copyright Year
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 4. Navbar Elevation on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)';
      navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.8)';
    } else {
      navbar.style.borderBottomColor = 'var(--border-subtle)';
      navbar.style.boxShadow = 'none';
    }
  });

  // 5. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.style.color = 'var(--primary-sky)';
        } else {
          targetNav.style.color = '';
        }
      }
    });
  });
});
