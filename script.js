/* ==========================================================================
   Shalini H - Systems Portfolio JavaScript
   Apple Minimalism & CookPilot Editorial Theme Interaction Driver
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Active Scroll Spy on Navigation Links
  const sections = document.querySelectorAll('section[id]');
  const siteHeader = document.getElementById('siteHeader');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (matchingLink) {
        if (scrollPosition >= top && scrollPosition < top + height) {
          navLinks.forEach(link => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });

    if (siteHeader) {
      if (window.scrollY > 20) {
        siteHeader.style.borderBottomColor = 'var(--border-warm-strong)';
      } else {
        siteHeader.style.borderBottomColor = 'var(--border-warm)';
      }
    }
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // 3. Project Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab, .filter-btn');
  const projectItems = document.querySelectorAll('.project-showcase, .project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      projectItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. Toast Notification
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toastNotice || !toastMessage) return;

    if (toastTimer) clearTimeout(toastTimer);

    toastMessage.textContent = message;
    toastNotice.removeAttribute('hidden');

    toastTimer = setTimeout(() => {
      toastNotice.setAttribute('hidden', '');
    }, 2800);
  }

  // 5. One-Click Copy Email Action
  const copyButtons = document.querySelectorAll('.copy-email-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-email') || 'shalinih6363841526@gmail.com';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        const label = btn.querySelector('.copy-label');
        if (label) {
          const original = label.textContent;
          label.textContent = 'Copied!';
          setTimeout(() => {
            label.textContent = original;
          }, 2000);
        }

        showToast(`Copied ${email} to clipboard`);
      } catch (err) {
        showToast(`Email: ${email}`);
      }
    });
  });

  // 6. Architecture Specification Modals
  const specButtons = document.querySelectorAll('[data-modal]');
  const specModals = document.querySelectorAll('.spec-modal');
  let lastFocusedElement = null;

  specButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);

      if (targetModal) {
        lastFocusedElement = btn;
        targetModal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';

        const closeBtn = targetModal.querySelector('.modal-close, .modal-close-btn');
        if (closeBtn) closeBtn.focus();
      }
    });
  });

  function closeModal(modal) {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  specModals.forEach(modal => {
    const closeTriggers = modal.querySelectorAll('[data-close-modal]');
    closeTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => closeModal(modal));
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      specModals.forEach(modal => {
        if (!modal.hasAttribute('hidden')) {
          closeModal(modal);
        }
      });
    }
  });
});
