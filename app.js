/* ================================
   VALIDEBAĞ TARİH ÇALIŞTAYI
   Main Application JavaScript
   ================================ */

// ========== COUNTDOWN TIMER ==========
function initCountdown() {
  // Target date: 9 Mayıs 2026 00:00 (UTC+3)
  const targetDate = new Date('2026-05-09T00:00:00+03:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    } else {
      // Etkinlik başladı
      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
    }
  }

  // İlk güncelleme
  updateCountdown();

  // Her saniye güncelle
  setInterval(updateCountdown, 1000);
}

// ========== NAVIGATION EFFECTS ==========
function initNavigation() {
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksArray = document.querySelectorAll('.nav-links a');

  // Scroll üzerine sticky nav styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Hamburger menü toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  // Nav link tıklandığında menüyü kapat
  navLinksArray.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Active link güncelle
  updateActiveNavLink();
  window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ========== INTERSECTION OBSERVER (Scroll Animations) ==========
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ========== COMMITTEE MODAL FUNCTIONS ==========
async function loadCommittees() {
  try {
    const response = await fetch('data/committees.json');
    const data = await response.json();
    const grid = document.getElementById('committees-grid');

    if (grid) {
      data.committees.forEach((committee, index) => {
        const card = document.createElement('div');
        card.className = 'card committee-card animate-on-scroll stagger-' + ((index % 5) + 1);
        card.onclick = () => showCommitteeModal(committee);

        card.innerHTML = `
          <h3 style="margin-top: 0;">${committee.name}</h3>
          <p class="text-muted" style="margin-bottom: var(--space-lg); line-height: 1.6;">
            ${committee.description.substring(0, 120)}...
          </p>
          <div style="display: flex; gap: var(--space-md); font-size: 0.9rem;">
            <span style="color: var(--color-accent); font-weight: 600;">👨‍💼 ${committee.moderator.name.split(' ')[0]}</span>
            <span style="color: var(--color-text-secondary);">Moderatör</span>
          </div>
        `;

        grid.appendChild(card);
      });

      // Scroll animasyonlarını yeniden başlat
      initScrollAnimations();
    }
  } catch (error) {
    console.error('Komiteler yüklenirken hata:', error);
  }
}

function showCommitteeModal(committee) {
  const modal = document.getElementById('committee-modal');
  const modalBody = document.getElementById('modal-body');

  if (modal && modalBody) {
    modalBody.innerHTML = `
      <h2 style="margin-top: 0; margin-bottom: var(--space-lg);">${committee.name}</h2>
      
      <p style="line-height: 1.8; margin-bottom: var(--space-lg); color: var(--color-text-primary);">
        ${committee.description}
      </p>

      <h3 style="margin-bottom: var(--space-md);">Komite Yönetimi</h3>
      
      <div class="moderator-list">
        <div class="moderator-item">
          <div class="moderator-name">🎓 ${committee.moderator.name}</div>
          <div class="moderator-title">${committee.moderator.title}</div>
        </div>
        
        <div class="moderator-item">
          <div class="moderator-name">👥 ${committee.assistant_moderator.name}</div>
          <div class="moderator-title">${committee.assistant_moderator.title}</div>
        </div>
      </div>

      <p style="margin-top: var(--space-2xl); font-size: 0.9rem; color: var(--color-text-light); text-align: center;">
        Bu komiteye katılmak için başvuru formunu doldurunuz.
      </p>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('committee-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Modal dışında tıklarsa kapansın
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('committee-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // ESC tuşu ile modal kapatma
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

// ========== SMOOTH SCROLL BEHAVIOR ==========
document.addEventListener('DOMContentLoaded', () => {
  // Countdown'u başlat
  initCountdown();

  // Navigation effects
  initNavigation();

  // Scroll animasyonları
  initScrollAnimations();

  // Komiteleri yükle (sadece committees.html sayfasında)
  if (document.getElementById('committees-grid')) {
    loadCommittees();
  }

  // Smooth scroll behavior (başlık linkleri için)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// ========== UTILITY FUNCTIONS ==========

// Sayfaya scroll atma
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Device'ın mobile olup olmadığını kontrol et
function isMobile() {
  return window.innerWidth <= 768;
}

// Responsive menü for smaller screens
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) hamburger.classList.remove('open');
    if (navLinks) navLinks.classList.remove('open');
  }
});

// Performance: Lazy loading images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Debug mode (console'de app hakkında bilgi)
console.log('Validebağ Tarih Çalıştayı - Website initialized');
console.log('Event Date: 9-10 Mayıs 2026');
console.log('Venue: Validebağ Fen Lisesi, İstanbul');
