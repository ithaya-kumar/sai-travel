/**
 * WANDER — Premium White Travel Portfolio
 * script.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initializeLoader();
  initializeCustomCursor();
  initializeNavbar();
  initializeMobileMenu();
  initializeScrollAnimations();
  initializeCounters();
  initializeGallery();
  initializeLightbox();
  initializeContactForm();
  initializeReviewForm();
});

/* ============================================================
   1. LOADER
   ============================================================ */
function initializeLoader() {
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  if (!loader) return;
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    if (loaderBar) loaderBar.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      }, 400);
    }
  }, 80);
}

/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
function initializeCustomCursor() {
  // Only enable on desktop/non-touch devices
  if (window.matchMedia("(pointer: coarse)").matches) return;
  
  document.body.classList.add('has-custom-cursor');
  const cursor = document.getElementById('cursor');
  
  if (!cursor) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const hoverElements = document.querySelectorAll('a, button, .gallery__item, .service-card, .star-btn');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Hide custom cursor over form inputs so default text cursor is clearly visible
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.opacity = '0'; });
    el.addEventListener('mouseleave', () => { cursor.style.opacity = '1'; });
  });
}

/* ============================================================
   3. NAVBAR
   ============================================================ */
function initializeNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const links = document.querySelectorAll('.navbar__link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollPos = window.scrollY || window.pageYOffset || 0;
    if (scrollPos > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link update based on currently viewed section
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollPos >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (current && link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ============================================================
   4. MOBILE MENU
   ============================================================ */
function initializeMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('.mobile-menu__link, .mobile-menu a');

  if (!hamburger || !mobileMenu) return;

  const toggleMenu = (open) => {
    const shouldOpen = typeof open === 'boolean' ? open : !mobileMenu.classList.contains('active');
    hamburger.classList.toggle('active', shouldOpen);
    mobileMenu.classList.toggle('active', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : 'auto';
  };

  hamburger.addEventListener('click', () => toggleMenu());

  links.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ============================================================
   5. SCROLL ANIMATIONS
   ============================================================ */
function initializeScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -20px 0px"
  });

  reveals.forEach(el => observer.observe(el));
}

/* ============================================================
   6. COUNTERS
   ============================================================ */
function initializeCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 1800;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            entry.target.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.innerText = target;
          }
        };
        
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => observer.observe(counter));
}

/* ============================================================
   7. GALLERY SETUP & LIGHTBOX
   ============================================================ */
function initializeGallery() {
  // Gallery images are populated in DOM and handled by lightbox
}

function initializeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  const items = document.querySelectorAll('.gallery__item img');
  
  if (!lightbox || !img) return;

  let currentIndex = 0;
  const images = Array.from(items).map(item => item.src);

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = 'auto';
  }

  function updateLightbox() {
    if (!images.length) return;
    img.src = images[currentIndex];
    if (counter) counter.innerText = `${currentIndex + 1} / ${images.length}`;
  }

  items.forEach((item, index) => {
    item.parentElement.addEventListener('click', () => openLightbox(index));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
      updateLightbox();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      updateLightbox();
    });
  }

  // Close on backdrop click (outside the image)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  document.addEventListener('keydown', (e) => {
    if (lightbox.hasAttribute('hidden')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
      updateLightbox();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      updateLightbox();
    }
  });
}

/* ============================================================
   8. CONTACT FORM
   ============================================================ */
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('contactSuccess');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const message = document.getElementById('message')?.value || '';
    
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.innerHTML = `<span>Sending...</span>`;
      btn.style.opacity = '0.85';
      btn.disabled = true;
    }

    // Prefill WhatsApp link with message details
    const waLink = document.querySelector('.contact-success-wa');
    if (waLink) {
      const waText = `Hello Sai Gift Travels,%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Message:* ${encodeURIComponent(message)}`;
      waLink.href = `https://wa.me/917904900899?text=${waText}`;
    }

    setTimeout(() => {
      form.style.display = 'none';
      if (successMsg) {
        successMsg.removeAttribute('hidden');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 500);
  });
}

/* ============================================================
   9. FIREBASE FIRESTORE & REVIEWS SYSTEM
   ============================================================ */
const firebaseConfig = {
  projectId: "number-game-61376",
  appId: "1:654574401281:web:0d3b8e3e14597b5f184d00",
  storageBucket: "number-game-61376.firebasestorage.app",
  apiKey: "AIzaSyD_EgPlJlJDMiTqskXINqd3zyW67gmJHMo",
  authDomain: "number-game-61376.firebaseapp.com",
  messagingSenderId: "654574401281",
  measurementId: "G-RPERBHJENG"
};

let firestoreDb = null;
try {
  if (typeof firebase !== 'undefined' && firebase.initializeApp) {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firestoreDb = firebase.firestore();
  }
} catch (err) {
  console.warn('Firebase init:', err);
}

const loadedReviewFingerprints = new Set();

function getReviewFingerprint(r) {
  const name = (r.name || '').trim().toLowerCase();
  const comment = (r.comment || '').trim().toLowerCase();
  const rating = parseInt(r.rating) || 5;
  return `${name}___${comment}___${rating}`;
}

function initializeReviewForm() {
  const stars = document.querySelectorAll('.star-btn');
  const ratingInput = document.getElementById('reviewRating');

  // Pre-select 5 stars visually by default if set to 5
  if (ratingInput && ratingInput.value === '5') {
    stars.forEach(s => s.classList.add('active'));
  }

  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      const val = parseInt(star.dataset.val);
      stars.forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.val) <= val);
      });
    });

    star.addEventListener('mouseout', () => {
      const selected = parseInt(ratingInput ? ratingInput.value : 5);
      stars.forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.val) <= selected);
      });
    });

    star.addEventListener('click', () => {
      const val = star.dataset.val;
      if (ratingInput) ratingInput.value = val;
      stars.forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.val) <= parseInt(val));
      });
    });
  });

  // Listen & load reviews from Firebase Firestore (with localStorage fallback)
  listenToFirebaseReviews();
}

function listenToFirebaseReviews() {
  if (!firestoreDb) {
    // If Firebase is not connected, load from localStorage fallback
    try {
      const cached = JSON.parse(localStorage.getItem('sai_travels_reviews') || '[]');
      cached.slice().reverse().forEach(r => renderReviewCard(r, false));
    } catch (e) {}
    return;
  }

  try {
    firestoreDb.collection('reviews')
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          localStorage.removeItem('sai_travels_reviews');
          loadedReviewFingerprints.clear();
          showNoReviewsNotice();
          return;
        }

        const list = [];
        snapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });

        // Sort by timestamp (oldest first so prepending puts newest at top)
        list.sort((a, b) => {
          const tA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
          const tB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
          return tA - tB;
        });

        list.forEach(item => {
          renderReviewCard(item, false);
        });
      }, (error) => {
        console.warn('Firestore live listener notice:', error);
        // Fallback to localStorage on error
        try {
          const cached = JSON.parse(localStorage.getItem('sai_travels_reviews') || '[]');
          cached.slice().reverse().forEach(r => renderReviewCard(r, false));
        } catch (e) {}
      });
  } catch (err) {
    console.warn('Firestore connect error:', err);
  }
}

function showNoReviewsNotice() {
  const grid = document.getElementById('reviewsGrid') || document.querySelector('.reviews-grid');
  if (!grid) return;
  if (!document.getElementById('noReviewsNotice') && !grid.querySelector('.review-card')) {
    const notice = document.createElement('div');
    notice.id = 'noReviewsNotice';
    notice.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: rgba(255,255,255,0.6); font-size: 1.05rem; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.15);';
    notice.innerHTML = '⭐ முதல் Review-ஐ நீங்கள் பதிவிடுங்கள்! (Be the first to share your experience)';
    grid.appendChild(notice);
  }
}

function renderReviewCard(review, isNew = false) {
  const grid = document.getElementById('reviewsGrid') || document.querySelector('.reviews-grid');
  if (!grid) return;

  const fingerprint = getReviewFingerprint(review);

  // STRICT DUPLICATE PREVENTION: Never render the same review more than once
  if (loadedReviewFingerprints.has(fingerprint)) {
    return;
  }
  const existingCard = Array.from(grid.children).find(
    c => c.getAttribute && c.getAttribute('data-review-fp') === fingerprint
  );
  if (existingCard) {
    return;
  }

  loadedReviewFingerprints.add(fingerprint);

  // Remove placeholder if present
  const notice = document.getElementById('noReviewsNotice');
  if (notice) notice.remove();

  const initial = (review.name && review.name.trim().charAt(0).toUpperCase()) || 'C';
  const ratingNum = Math.min(5, Math.max(1, parseInt(review.rating) || 5));
  const starsStr = '★'.repeat(ratingNum) + '☆'.repeat(5 - ratingNum);
  const dateStr = review.date || 'Verified Client';

  const card = document.createElement('div');
  card.className = 'review-card reveal-up active';
  card.setAttribute('data-review-fp', fingerprint);

  if (isNew) {
    card.style.borderColor = 'rgba(221, 71, 70, 0.7)';
    card.style.boxShadow = '0 10px 30px rgba(221, 71, 70, 0.28)';
    card.style.transition = 'all 0.5s ease';
  }

  card.innerHTML = `
    <div class="review-card__stars">${starsStr}</div>
    <p class="review-card__text">"${escapeHtml(review.comment)}"</p>
    <div class="review-card__author">
      <div class="review-card__avatar">${initial}</div>
      <div class="review-card__info">
        <h4>${escapeHtml(review.name)}</h4>
        <span>${escapeHtml(dateStr)} • Verified Client</span>
      </div>
    </div>
  `;

  grid.prepend(card);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

async function submitReview(e) {
  e.preventDefault();
  const nameInput = document.getElementById('reviewName');
  const ratingInput = document.getElementById('reviewRating');
  const commentInput = document.getElementById('reviewComment');
  const submitBtn = e.target.querySelector('button[type="submit"]');

  const name = (nameInput?.value || '').trim();
  const rating = ratingInput?.value || '5';
  const comment = (commentInput?.value || '').trim();

  if (!name) {
    alert('தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்! (Please enter your name)');
    nameInput?.focus();
    return;
  }

  if (rating === '0' || !rating) {
    alert('தயவுசெய்து Star Rating தேர்வு செய்யவும்!');
    return;
  }

  if (!comment) {
    alert('தயவுசெய்து உங்கள் கருத்தை உள்ளிடவும்! (Please enter your feedback)');
    commentInput?.focus();
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'சேமிக்கப்படுகிறது...';
  }

  const now = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateStr = `${months[now.getMonth()]} ${now.getFullYear()}`;

  const reviewData = {
    name: name,
    rating: parseInt(rating),
    comment: comment,
    date: dateStr
  };

  // Render immediately for instant user feedback with highlight
  renderReviewCard(reviewData, true);

  // 1. Save to Firebase Firestore Cloud Database with safety timeout
  if (firestoreDb) {
    try {
      const savePromise = firestoreDb.collection('reviews').add({
        ...reviewData,
        createdAt: firebase.firestore.FieldValue ? firebase.firestore.FieldValue.serverTimestamp() : new Date()
      });
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 6000));
      await Promise.race([savePromise, timeoutPromise]);
    } catch (err) {
      console.warn('Firestore write warning:', err);
    }
  }

  // 2. Cache in localStorage without duplicating
  try {
    const stored = JSON.parse(localStorage.getItem('sai_travels_reviews') || '[]');
    const fp = getReviewFingerprint(reviewData);
    if (!stored.some(item => getReviewFingerprint(item) === fp)) {
      stored.unshift(reviewData);
      localStorage.setItem('sai_travels_reviews', JSON.stringify(stored));
    }
  } catch (err) {
    console.error('Error saving review to localStorage:', err);
  }

  // 3. Show success message
  const form = document.getElementById('reviewForm');
  const success = document.getElementById('reviewSuccess');
  if (form) form.style.display = 'none';
  if (success) success.style.display = 'block';

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Submit';
  }

  // 4. Smooth scroll up to "WHAT OUR CLIENTS SAY" section
  const reviewsSection = document.getElementById('reviews') || document.getElementById('reviewsGrid');
  if (reviewsSection) {
    reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function resetReviewForm() {
  const form = document.getElementById('reviewForm');
  const success = document.getElementById('reviewSuccess');
  const nameInput = document.getElementById('reviewName');
  const ratingInput = document.getElementById('reviewRating');
  const commentInput = document.getElementById('reviewComment');
  const stars = document.querySelectorAll('.star-btn');

  if (nameInput) nameInput.value = '';
  if (ratingInput) ratingInput.value = '5';
  if (commentInput) commentInput.value = '';
  stars.forEach(s => s.classList.add('active'));

  if (success) success.style.display = 'none';
  if (form) {
    form.style.display = 'flex';
    nameInput?.focus();
  }
}
