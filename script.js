/* ══════════════════════════════════════════════
   ETHIRAJ STORE — WHOLESALE GROCERY WEBSITE JS
   ══════════════════════════════════════════════ */

'use strict';

/* ── PRODUCTS DATA ── */
const products = [
  { name: 'Basmati Rice (India Gate)', category: 'Rice & Grains', emoji: '🌾', info: '25 kg sack · Premium Grade A', tag: 'Best Seller', status: '● In Stock' },
  { name: 'Sona Masoori Rice', category: 'Rice & Grains', emoji: '🌾', info: '25 kg sack · Double Polished', tag: 'Popular', status: '● In Stock' },
  { name: 'Toor Dal (Arhar)', category: 'Pulses & Lentils', emoji: '🫘', info: '25 kg bag · Clean & Bold', tag: 'Best Seller', status: '● In Stock' },
  { name: 'Moong Dal (Split)', category: 'Pulses & Lentils', emoji: '🫘', info: '25 kg bag · Machine Cleaned', tag: 'Popular', status: '● In Stock' },
  { name: 'Kashmiri Chilli Powder', category: 'Spices & Masala', emoji: '🌶️', info: '10 kg box · Extra-Hot Grade', tag: 'Top Pick', status: '● In Stock' },
  { name: 'Turmeric Powder', category: 'Spices & Masala', emoji: '🟡', info: '10 kg · High Curcumin 4%+', tag: 'Best Seller', status: '● In Stock' },
  { name: 'Sundrop Sunflower Oil', category: 'Cooking Oils', emoji: '🫒', info: '15 L tin · Refined Grade', tag: 'Popular', status: '● In Stock' },
  { name: 'Cold-Press Groundnut Oil', category: 'Cooking Oils', emoji: '🫒', info: '15 kg tin · Wood-pressed', tag: 'Premium', status: '● In Stock' },
  { name: 'Whole Wheat Atta (Aashirvaad)', category: 'Flour & Atta', emoji: '🌾', info: '50 kg sack · Stone Ground', tag: 'Best Seller', status: '● In Stock' },
  { name: 'Besan (Gram Flour)', category: 'Flour & Atta', emoji: '🟤', info: '25 kg bag · Fine Sifted', tag: 'Popular', status: '● In Stock' },
  { name: 'Refined White Sugar (M30)', category: 'Sugar & Salt', emoji: '🍬', info: '50 kg sack · FSSAI Certified', tag: 'Bulk', status: '● In Stock' },
  { name: 'Iodized Table Salt', category: 'Sugar & Salt', emoji: '🧂', info: '25 kg bag · Double Refined', tag: 'Staple', status: '● In Stock' },
  { name: 'Premium Cashews (W240)', category: 'Dry Fruits', emoji: '🥜', info: '5 kg box · Whole Grade W240', tag: 'Premium', status: '● In Stock' },
  { name: 'California Almonds', category: 'Dry Fruits', emoji: '🥜', info: '5 kg box · Extra Large', tag: 'Premium', status: '● In Stock' },
  { name: 'Brooke Bond Red Label Tea', category: 'Beverages', emoji: '☕', info: '10 kg box · Bulk Pack', tag: 'Best Seller', status: '● In Stock' },
  { name: 'Filter Coffee Powder (80:20)', category: 'Beverages', emoji: '☕', info: '5 kg pack · 80% Coffee:20% Chicory', tag: 'Popular', status: '● In Stock' },
  { name: 'Haldiram Mixture', category: 'Snacks', emoji: '🍿', info: '10 kg · Assorted Namkeen', tag: 'Fast Moving', status: '● In Stock' },
  { name: 'Rice Murukku (Bulk)', category: 'Snacks', emoji: '🌀', info: '5 kg · Crispy Thin Variety', tag: 'Popular', status: '● In Stock' },
  { name: 'Vim Dishwash Bar', category: 'Cleaning Essentials', emoji: '🧴', info: 'Carton of 96 bars · 400g each', tag: 'Bulk', status: '● In Stock' },
  { name: 'Surf Excel Detergent', category: 'Cleaning Essentials', emoji: '🫧', info: '5 kg pouch · Matic Top Load', tag: 'Best Seller', status: '● In Stock' },
];

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
    }
    // Trigger initial fade-in for hero
    triggerVisibleFades();
    animateCounters();
  }, 1600);
});

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // Scroll-to-top button
  const btn = document.getElementById('scrollTop');
  if (window.scrollY > 400) btn.classList.add('visible');
  else btn.classList.remove('visible');
});

document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── PRODUCTS GRID ── */
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  if (!list.length) {
    grid.innerHTML = '<p class="no-results">No products found. Try a different search term.</p>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <div class="product-card fade-up">
      <div class="product-img">${p.emoji}</div>
      <div class="product-body">
        <h4>${p.name}</h4>
        <p>${p.info}</p>
        <div class="product-meta">
          <span class="product-tag">${p.category}</span>
          <span class="product-status">${p.status}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Re-observe new cards
  grid.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

renderProducts(products);

/* ── PRODUCT SEARCH ── */
const searchInput = document.getElementById('productSearch');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    const filtered = q
      ? products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.info.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q)
        )
      : products;
    renderProducts(filtered);
  });
}

function clearSearch() {
  if (searchInput) {
    searchInput.value = '';
    renderProducts(products);
  }
}

/* ── INTERSECTION OBSERVER (SCROLL ANIMATIONS) ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function triggerVisibleFades() {
  document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
    observer.observe(el);
  });
}

triggerVisibleFades();

/* ── COUNTER ANIMATION ── */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let current = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      counter.textContent = Math.floor(current);
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      }
    }, 30);
  });
}

/* ── FAQ TOGGLE ── */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-a');
  const isOpen = btn.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-q.open').forEach(q => {
    q.classList.remove('open');
    q.closest('.faq-item').querySelector('.faq-a').classList.remove('open');
  });

  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

/* ── CONTACT FORM VALIDATION ── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    form.querySelectorAll('.err-msg').forEach(m => m.classList.remove('show'));
    form.querySelectorAll('input, select, textarea').forEach(el => el.classList.remove('invalid'));

    // Validate required fields
    form.querySelectorAll('[required]').forEach(field => {
      const errMsg = field.closest('.form-group').querySelector('.err-msg');
      if (!field.value.trim()) {
        field.classList.add('invalid');
        if (errMsg) errMsg.classList.add('show');
        valid = false;
      } else if (field.type === 'tel' && !/^[0-9+\s\-]{10,15}$/.test(field.value.trim())) {
        field.classList.add('invalid');
        if (errMsg) errMsg.classList.add('show');
        valid = false;
      }
    });

    // Validate email if filled
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value.trim()) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(emailField.value.trim())) {
        emailField.classList.add('invalid');
        const errMsg = emailField.closest('.form-group').querySelector('.err-msg');
        if (errMsg) errMsg.classList.add('show');
        valid = false;
      }
    }

    if (!valid) return;

    // Simulate submission
    const btn     = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoad = document.getElementById('btnLoader');

    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoad.style.display = 'block';

    setTimeout(() => {
      btn.disabled = false;
      btnText.style.display = 'block';
      btnLoad.style.display = 'none';
      form.reset();
      const success = document.getElementById('formSuccess');
      if (success) {
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 6000);
      }
    }, 2000);
  });

  // Live validation clearing
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('invalid');
      const errMsg = field.closest('.form-group').querySelector('.err-msg');
      if (errMsg) errMsg.classList.remove('show');
    });
  });
}

/* ── SMOOTH SCROLL FOR NAV ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navA     = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navA.forEach(a => {
        a.style.fontWeight = a.getAttribute('href') === `#${id}` ? '700' : '';
        a.style.color      = a.getAttribute('href') === `#${id}` ? 'var(--green-dark)' : '';
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));
