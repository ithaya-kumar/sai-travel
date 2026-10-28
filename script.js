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
  initializeParallax();
  initializeCounters();
  initializeTimeline();
  initializeGallery();
  initializeLightbox();
  initializeMapMarkers();
  initializeContactForm();
  initializeReviewForm();
});

/* ============================================================
   1. LOADER
   ============================================================ */
function initializeLoader() {
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
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
      }, 500);
    }
  }, 100);
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

  const hoverElements = document.querySelectorAll('a, button, .gallery__item, .dest-card, .story-card, .map__marker');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ============================================================
   3. NAVBAR
   ============================================================ */
function initializeNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.navbar__link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link update
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ============================================================
   4. MOBILE MENU
   ============================================================ */
function initializeMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('.mobile-menu__link');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
}

/* ============================================================
   5. SCROLL ANIMATIONS
   ============================================================ */
function initializeScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(el => observer.observe(el));
}

/* ============================================================
   6. PARALLAX
   ============================================================ */
function initializeParallax() {
  const parallaxImg = document.querySelector('.parallax-img');
  if (!parallaxImg) return;
  
  if (window.matchMedia("(pointer: coarse)").matches) return; // Skip on mobile

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    parallaxImg.style.transform = `translateY(${scroll * 0.2}px)`;
  });
}

/* ============================================================
   7. COUNTERS
   ============================================================ */
function initializeCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 2000;
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
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* ============================================================
   8. TIMELINE
   ============================================================ */
function initializeTimeline() {
  const progress = document.getElementById('timelineProgress');
  const timeline = document.querySelector('.timeline');
  if (!progress || !timeline) return;

  const isMobile = window.innerWidth <= 768;

  window.addEventListener('scroll', () => {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight && rect.bottom > 0) {
      let scrollPct = (windowHeight - rect.top) / (rect.height + windowHeight) * 100;
      scrollPct = Math.min(100, Math.max(0, scrollPct));
      
      if (isMobile) {
        progress.style.height = `${scrollPct}%`;
        progress.style.width = '100%';
      } else {
        progress.style.width = `${scrollPct}%`;
        progress.style.height = '100%';
      }
    }
  });
}

/* ============================================================
   9. GALLERY SETUP
   ============================================================ */
function initializeGallery() {
  // Setup images inside gallery item to populate the lightbox array later
}

/* ============================================================
   10. LIGHTBOX
   ============================================================ */
function initializeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  const items = document.querySelectorAll('.gallery__item img');
  
  if (!lightbox) return;

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
    img.src = images[currentIndex];
    counter.innerText = `${currentIndex + 1} / ${images.length}`;
  }

  items.forEach((item, index) => {
    item.parentElement.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateLightbox();
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateLightbox();
  });
}

/* ============================================================
   11. MAP MARKERS
   ============================================================ */
const mapData = {
  madurai: {
    title: "Madurai",
    date: "OCTOBER 2024",
    desc: "The city of ancient temples and cultural heritage.",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80"
  },
  rameswaram: {
    title: "Rameswaram",
    date: "NOVEMBER 2024",
    desc: "A sacred island known for its iconic bridge.",
    img: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400&q=80"
  },
  kanyakumari: {
    title: "Kanyakumari",
    date: "MARCH 2026",
    desc: "The southernmost tip where three beautiful oceans meet.",
    img: "https://images.unsplash.com/photo-1626015365107-e943e65cbb69?w=400&q=80"
  },
  ooty: {
    title: "Ooty",
    date: "JANUARY 2025",
    desc: "Rolling hills, tea gardens, and misty mountains.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
  },
  kerala: {
    title: "Kerala",
    date: "JUNE 2025",
    desc: "Serene backwaters and lush green landscapes.",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80"
  },
  goa: {
    title: "Goa",
    date: "AUGUST 2025",
    desc: "Golden beaches, beautiful sunsets, and endless coastlines.",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80"
  }
};

function initializeMapMarkers() {
  const markers = document.querySelectorAll('.map__marker');
  const popup = document.getElementById('mapPopup');
  const popupImg = document.getElementById('popupImg');
  const popupTitle = document.getElementById('popupTitle');
  const popupDate = document.getElementById('popupDate');
  const popupDesc = document.getElementById('popupDesc');
  const popupClose = document.getElementById('popupClose');

  if (!popup) return;

  markers.forEach(marker => {
    marker.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = marker.getAttribute('data-id');
      const data = mapData[id];
      
      if (data) {
        popupImg.src = data.img;
        popupTitle.innerText = data.title;
        popupDate.innerText = data.date;
        popupDesc.innerText = data.desc;
        popup.removeAttribute('hidden');
      }
    });
  });

  popupClose.addEventListener('click', () => {
    popup.setAttribute('hidden', '');
  });

  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target) && !e.target.closest('.map__marker')) {
      popup.setAttribute('hidden', '');
    }
  });
}

/* ============================================================
   12. CONTACT FORM
   ============================================================ */
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('contactSuccess');
  
  if (!form) return;

  // Form submission handler
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
    }, 600);
  });
}


/* ============================================================
   REVIEW FORM & LOCAL STORAGE REVIEWS
   ============================================================ */
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
      const selected = parseInt(ratingInput ? ratingInput.value : 0);
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

  // Load previously submitted reviews from localStorage
  loadStoredReviews();
}

function loadStoredReviews() {
  const grid = document.getElementById('reviewsGrid') || document.querySelector('.reviews-grid');
  if (!grid) return;

  try {
    const stored = JSON.parse(localStorage.getItem('sai_travels_reviews') || '[]');
    // Render from oldest to newest so newest ends up at the top
    stored.slice().reverse().forEach(review => {
      renderReviewCard(review, false);
    });
  } catch (err) {
    console.error('Error loading stored reviews:', err);
  }
}

function renderReviewCard(review, isNew = false) {
  const grid = document.getElementById('reviewsGrid') || document.querySelector('.reviews-grid');
  if (!grid) return;

  const initial = (review.name && review.name.trim().charAt(0).toUpperCase()) || 'C';
  const ratingNum = Math.min(5, Math.max(1, parseInt(review.rating) || 5));
  const starsStr = '★'.repeat(ratingNum) + '☆'.repeat(5 - ratingNum);
  const dateStr = review.date || 'Verified Client';

  const card = document.createElement('div');
  card.className = 'review-card reveal-up active';
  if (isNew) {
    card.style.borderColor = 'rgba(221, 71, 70, 0.6)';
    card.style.boxShadow = '0 10px 30px rgba(221, 71, 70, 0.25)';
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

  // Prepend to reviews grid so the newly submitted review appears right at the top
  grid.prepend(card);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

function submitReview(e) {
  e.preventDefault();
  const nameInput = document.getElementById('reviewName');
  const ratingInput = document.getElementById('reviewRating');
  const commentInput = document.getElementById('reviewComment');

  const name = (nameInput?.value || '').trim();
  const rating = ratingInput?.value || '0';
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

  const now = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateStr = `${months[now.getMonth()]} ${now.getFullYear()}`;

  const newReview = {
    name: name,
    rating: parseInt(rating),
    comment: comment,
    date: dateStr
  };

  // 1. Save to localStorage
  try {
    const stored = JSON.parse(localStorage.getItem('sai_travels_reviews') || '[]');
    stored.unshift(newReview);
    localStorage.setItem('sai_travels_reviews', JSON.stringify(stored));
  } catch (err) {
    console.error('Error saving review to localStorage:', err);
  }

  // 2. Add review card directly to "WHAT OUR CLIENTS SAY" page grid
  renderReviewCard(newReview, true);

  // 3. Show success message
  const form = document.getElementById('reviewForm');
  const success = document.getElementById('reviewSuccess');
  if (form) form.style.display = 'none';
  if (success) success.style.display = 'block';

  // 4. Smooth scroll up to "WHAT OUR CLIENTS SAY" section so customer sees their review live
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


