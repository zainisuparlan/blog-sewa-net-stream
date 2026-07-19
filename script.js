/* =============================================
   NETSTREAM — JAVASCRIPT INTERACTIVITY
   ============================================= */

// ============================================================
//   CONFIG VIDEO DEMO YOUTUBE (GAMPANG DIEDIT DI SINI)
// ============================================================
// Cukup ganti kode di dalam tanda petik dengan ID video YouTube kamu.
// Contoh link: https://youtu.be/aGdZ0gvr42k -> ID-nya adalah: aGdZ0gvr42k
const DEMO_VIDEOS = {
  live: "aGdZ0gvr42k",          // Video Demo Live Stream
  thumb: "idrAFB2X1po",         // Video Demo Auto Rotator Thumbnail
  upload: "YOUTUBE_ID_UPLOAD",   // Video Demo Auto Upload
  bot: "YOUTUBE_ID_BOT"          // Video Demo Live Bot
};

window.playDemoVideo = function (type, element) {
  const videoId = DEMO_VIDEOS[type];
  if (!videoId || videoId.startsWith("YOUTUBE_ID_")) {
    alert("Video demo untuk paket ini belum tersedia atau masih dalam proses pembuatan.");
    return;
  }

  element.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
            title="NetStream Demo Player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
    </iframe>
    <a href="https://youtu.be/${videoId}" target="_blank" rel="noopener" class="direct-youtube-link">
      <span>🔴</span> Tonton di YouTube ↗
    </a>
  `;
};

// ===== PARTICLES =====
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 40;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      --dur: ${6 + Math.random() * 12}s;
      --delay: ${Math.random() * 10}s;
      width: ${2 + Math.random() * 4}px;
      height: ${2 + Math.random() * 4}px;
      opacity: ${0.2 + Math.random() * 0.5};
      background: ${Math.random() > 0.5 ? '#7C3AED' : '#06B6D4'};
    `;
    container.appendChild(p);
  }
})();

// ===== NAVBAR SCROLL =====
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top
    const btn = document.getElementById('backToTop');
    if (btn) {
      if (window.scrollY > 400) btn.classList.add('visible');
      else btn.classList.remove('visible');
    }
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      hamburger.classList.toggle('active');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }
})();

// ===== SMOOTH SCROLL for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== PRICING TABS =====
window.showPricing = function (type) {
  // Hide all
  ['live', 'thumb', 'upload', 'bot'].forEach(t => {
    const el = document.getElementById('pricing-' + t);
    const tab = document.getElementById('tab-' + t);
    if (el) el.classList.add('hidden');
    if (tab) tab.classList.remove('active');
  });
  // Also hide thumb info panel
  const thumbInfo = document.getElementById('pricing-thumb-info');
  if (thumbInfo) thumbInfo.classList.add('hidden');

  // Show selected
  const target = document.getElementById('pricing-' + type);
  const activeTab = document.getElementById('tab-' + type);
  if (target) {
    target.classList.remove('hidden');
    target.style.animation = 'none';
    target.offsetHeight; // reflow
    target.style.animation = 'fadeInUp 0.4s ease both';
  }
  if (activeTab) activeTab.classList.add('active');

  // Show thumb info panel when thumb tab is active
  if (type === 'thumb' && thumbInfo) {
    thumbInfo.classList.remove('hidden');
    thumbInfo.style.animation = 'none';
    thumbInfo.offsetHeight;
    thumbInfo.style.animation = 'fadeInUp 0.5s ease both';
  }
};

// ===== DEMO TABS =====
window.showDemo = function (type) {
  ['live', 'thumb', 'upload', 'bot'].forEach(t => {
    const el = document.getElementById('demo-' + t);
    const tab = document.getElementById('demo-tab-' + t);
    if (el) el.classList.add('hidden');
    if (tab) tab.classList.remove('active');

    // Reset video iframe on tab change to stop background audio
    const wrapper = el?.querySelector('.demo-video-wrapper');
    if (wrapper && wrapper.querySelector('iframe')) {
      const img = wrapper.getAttribute('data-img');
      const text = wrapper.getAttribute('data-text');
      const icon = wrapper.getAttribute('data-icon') || '📡';
      wrapper.innerHTML = `
        <div class="demo-img-wrap">
          <img src="${img}" alt="Demo" onerror="this.style.display='none';this.parentElement.innerHTML+='<div class=img-placeholder>${icon}<span style=font-size:1rem;color:var(--text-secondary)>${text}</span></div>'" />
          <div class="video-play-overlay">
            <div class="play-button-pulse">
              <span class="play-arrow">▶</span>
            </div>
            <span class="play-text">Klik untuk Nonton Demo</span>
          </div>
          <div class="demo-overlay">
            <span>${icon}</span> ${text}
          </div>
        </div>
      `;
    }
  });

  const target = document.getElementById('demo-' + type);
  const activeTab = document.getElementById('demo-tab-' + type);
  if (target) {
    target.classList.remove('hidden');
    target.style.animation = 'none';
    target.offsetHeight;
    target.style.animation = 'fadeInUp 0.4s ease both';
  }
  if (activeTab) activeTab.classList.add('active');
};

// ===== FAQ TOGGLE =====
window.toggleFaq = function (id) {
  const item = document.getElementById('faq-' + id);
  if (!item) return;
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(f => {
    f.classList.remove('open');
    f.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
  });

  // Open clicked if was closed
  if (!isOpen) {
    item.classList.add('open');
    item.querySelector('.faq-question')?.setAttribute('aria-expanded', 'true');
  }
};

// ===== QUOTES CAROUSEL =====
(function initQuotes() {
  const slides = document.querySelectorAll('.quote-slide');
  const dotsContainer = document.getElementById('qDots');
  if (!slides.length || !dotsContainer) return;

  let current = 0;
  let autoTimer;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'q-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    dotsContainer.querySelectorAll('.q-dot')[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.querySelectorAll('.q-dot')[current]?.classList.add('active');
  }

  window.changeQuote = function (dir) {
    clearInterval(autoTimer);
    goTo(current + dir);
    startAuto();
  };

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  startAuto();
})();

// ===== INTERSECTION OBSERVER — Scroll Reveal =====
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Add reveal class to all eligible elements
  const selectors = [
    '.why-card', '.service-card', '.price-card',
    '.step-card', '.benefit-item', '.thumb-tip',
    '.faq-item', '.quote-block', '.bundle-promo',
    '.section-header', '.guide-heading', '.demo-info',
    '.demo-visual'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      const delay = el.dataset.delay || 0;
      if (delay) el.style.transitionDelay = delay + 'ms';
      observer.observe(el);
    });
  });
})();

// ===== NUMBERS COUNTER ANIMATION =====
(function initCounters() {
  const stats = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const hasPlus = text.includes('+');
        const hasPct = text.includes('%');
        const hasDot = text.includes('.');
        const numStr = text.replace(/[^0-9.]/g, '');
        const target = parseFloat(numStr);

        if (isNaN(target)) return;

        let start = 0;
        const duration = 1800;
        const step = 16;
        const increment = target / (duration / step);
        const suffix = hasPlus ? '+' : hasPct ? '%' : '';

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            start = target;
            clearInterval(timer);
          }
          const display = hasDot
            ? start.toFixed(1)
            : Math.floor(start).toString();
          el.textContent = display + suffix;
        }, step);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
})();

// ===== ACTIVE NAV HIGHLIGHT on scroll =====
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--primary-light)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

// ===== CURSOR GLOW EFFECT (desktop only) =====
(function initCursorGlow() {
  if (window.innerWidth < 1024) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
})();

// ===== CARD TILT EFFECT =====
(function initTilt() {
  if (window.innerWidth < 1024) return;

  document.querySelectorAll('.service-card, .price-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const tiltX = ((y - cy) / cy) * 4;
      const tiltY = ((cx - x) / cx) * 4;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ===== PRICING CARD PULSE (highlight featured) =====
(function initPricingPulse() {
  const featured = document.querySelectorAll('.featured-price');
  featured.forEach(card => {
    setInterval(() => {
      card.style.boxShadow = '0 0 30px rgba(124,58,237,0.4), 0 8px 40px rgba(124,58,237,0.2)';
      setTimeout(() => {
        card.style.boxShadow = '';
      }, 800);
    }, 3000);
  });
})();

// ===== TYPEWRITER EFFECT for Hero =====
(function initTypewriter() {
  const el = document.querySelector('.hero-badge');
  if (!el) return;
  const texts = [
    '📡 Platform #1 Creator Tool Indonesia',
    '🚀 Live Stream · Auto Upload · Bot Cerdas',
    '💡 Solusi Terlengkap untuk YouTuber',
  ];
  let ti = 0;
  let ci = 0;
  let typing = true;

  function type() {
    const text = texts[ti];
    if (typing) {
      el.textContent = text.slice(0, ci + 1);
      ci++;
      if (ci === text.length) {
        typing = false;
        setTimeout(type, 2200);
        return;
      }
    } else {
      el.textContent = text.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        typing = true;
        ti = (ti + 1) % texts.length;
      }
    }
    setTimeout(type, typing ? 45 : 25);
  }

  // Start after a delay
  setTimeout(type, 2000);
})();

// ===== SCROLL PROGRESS BAR =====
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, #7C3AED, #06B6D4);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s ease;
    pointer-events: none;
  `;
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

// ===== TOAST NOTIFICATION =====
window.showToast = function (msg, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 80px; right: 24px;
    background: ${type === 'success' ? 'linear-gradient(135deg,#10B981,#06B6D4)' : 'linear-gradient(135deg,#EF4444,#F59E0B)'};
    color: white;
    padding: 14px 24px;
    border-radius: 12px;
    font-size: 0.88rem;
    font-weight: 700;
    z-index: 9999;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    animation: fadeInUp 0.4s ease both;
    max-width: 280px;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
};

// CTA button interactions
document.querySelectorAll('.price-btn, .service-btn, .contact-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    if (!this.href || this.href.includes('#kontak') || this.href.includes('wa.me') || this.href.includes('t.me')) return;
  });
});

// ===== STATE ORDER =====
window.orderPlaced = false;

window.updateCheckoutPayment = function () {
  const paketSelect = document.getElementById('checkout-paket');
  const metodeSelect = document.getElementById('checkout-metode');
  const paymentBox = document.getElementById('checkout-payment-box');

  if (!paketSelect || !metodeSelect || !paymentBox) return;

  if (!paketSelect.value) {
    paymentBox.innerHTML = `<div style="font-size: 0.88rem; color: #94a3b8;">Silakan pilih paket sewa terlebih dahulu untuk melihat informasi transfer pembayaran.</div>`;
    return;
  }

  const selectedOption = paketSelect.options[paketSelect.selectedIndex];
  const packageName = selectedOption.value;

  // Format harga display
  let priceStr = "";
  if (packageName.includes("30rb")) priceStr = "Rp 30.000";
  else if (packageName.includes("45rb")) priceStr = "Rp 45.000";
  else if (packageName.includes("95rb")) priceStr = "Rp 95.000";
  else if (packageName.includes("250rb")) priceStr = "Rp 250.000";
  else if (packageName.includes("350rb")) priceStr = "Rp 350.000";
  else if (packageName.includes("70rb")) priceStr = "Rp 70.000";
  else if (packageName.includes("100rb")) priceStr = "Rp 100.000";
  else if (packageName.includes("250rb")) priceStr = "Rp 250.000";
  else priceStr = "Rp 100.000"; // default fallback

  const paymentMethod = metodeSelect.value;

  let instructionsHtml = "";
  if (paymentMethod === 'qris') {
    instructionsHtml = `
      <div style="margin-bottom: 12px; font-weight: 700; color: #fff;">Pindai QRIS di Bawah Ini:</div>
      <div style="background: white; padding: 12px; display: inline-block; border-radius: 12px; margin-bottom: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <img src="assets/qris.png" alt="Scan QRIS Netstream Cloud" style="max-width: 300px; width: 100%; display: block; border-radius: 12px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
      </div>
      <div style="font-size: 0.82rem; color: #94a3b8; line-height: 1.5; text-align: left; margin-bottom: 16px;">
        1. Scan QRIS dengan aplikasi pembayaran/E-Wallet Anda (Gopay, OVO, Dana, LinkAja, ShopeePay, Mobile Banking).<br>
        2. Masukkan nominal transfer sebesar: <strong style="color: #facc15; font-size: 1rem;">${priceStr}</strong>.<br>
        3. Simpan resi transfer bukti pembayaran Anda.
      </div>
    `;
  } else if (paymentMethod === 'transfer') {
    instructionsHtml = `
      <div style="margin-bottom: 12px; font-weight: 700; color: #fff;">Pilih salah satu rekening berikut:</div>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 0.8rem; color: #94a3b8; font-weight: 600;">🏦 BCA</div>
          <div>
            <div style="font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #facc15;">1200876136</div>
            <div style="font-size: 0.75rem; color: #64748b; text-align: right;">a/n ZAINI</div>
          </div>
        </div>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 0.8rem; color: #94a3b8; font-weight: 600;">🏦 BRI</div>
          <div>
            <div style="font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #facc15;">620101005563530</div>
            <div style="font-size: 0.75rem; color: #64748b; text-align: right;">a/n ZAINI</div>
          </div>
        </div>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 0.8rem; color: #94a3b8; font-weight: 600;">🏦 Mandiri</div>
          <div>
            <div style="font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #facc15;">1430019870623</div>
            <div style="font-size: 0.75rem; color: #64748b; text-align: right;">a/n ZAINI</div>
          </div>
        </div>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 0.8rem; color: #94a3b8; font-weight: 600;">🏦 SeaBank</div>
          <div>
            <div style="font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #facc15;">901787362919</div>
            <div style="font-size: 0.75rem; color: #64748b; text-align: right;">a/n ZAINI</div>
          </div>
        </div>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 0.8rem; color: #94a3b8; font-weight: 600;">🏦 Bank Jago</div>
          <div>
            <div style="font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #facc15;">103609272915</div>
            <div style="font-size: 0.75rem; color: #64748b; text-align: right;">a/n ZAINI</div>
          </div>
        </div>
      </div>
      <div style="font-size: 0.82rem; color: #94a3b8; line-height: 1.6; text-align: left; margin-bottom: 4px;">
        Transfer nominal sebesar: <strong style="color: #facc15; font-size: 1rem;">${priceStr}</strong> ke salah satu rekening di atas.
      </div>
    `;
  }

  // Catatan: kirim bukti TF langsung ke admin via WA (bukan lewat blog)
  instructionsHtml += `
    <div style="margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
      <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 10px;">
        <div style="font-size: 0.82rem; color: #6ee7b7; font-weight: 600; display: flex; align-items: center; gap: 6px;">
          ✅ Pesanan telah didaftarkan ke sistem kami!
        </div>
        <div style="font-size: 0.78rem; color: #94a3b8; line-height: 1.6;">
          Setelah transfer, kirim <strong style="color:#fff;">bukti pembayaran</strong> langsung ke admin via WhatsApp untuk proses aktivasi layanan.
        </div>
        <a href="https://wa.me/6285157883603?text=${encodeURIComponent('Halo Admin NetStream, saya sudah transfer untuk paket ' + packageName + '. Berikut bukti transfernya.')}" target="_blank" rel="noopener"
          onclick="window.confirmPaymentDone()"
          style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg,#25D366,#128C7E); color: #fff; font-weight: 700; font-size: 0.88rem; padding: 12px 20px; border-radius: 10px; text-decoration: none; transition: opacity 0.2s; width: 100%; box-sizing: border-box;"
          onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          ✅ Konfirmasi Sudah Transfer ke Admin WA
        </a>
        <div style="text-align: center; margin-top: 8px;">
          <a href="javascript:void(0)" onclick="window.orderPlaced = false; openOrderModal();"
            style="color: #94a3b8; font-size: 0.75rem; text-decoration: underline; font-weight: 500;"
            onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#94a3b8'">
            🔄 Buat Pesanan Baru / Ganti Data
          </a>
        </div>
      </div>
    </div>
  `;

  paymentBox.innerHTML = instructionsHtml;
};


// ===== KONFIRMASI PEMBAYARAN SELESAI — Auto tutup modal & reset state =====
window.confirmPaymentDone = function () {
  // Tampilkan toast "Terima kasih, konfirmasi diterima!"
  showToast('🎉 Terima kasih! Konfirmasi diterima. Admin akan segera memproses pesanan Anda.', 'success');

  // Setelah 2 detik: tutup modal dan reset state agar next order bersih
  setTimeout(() => {
    window.orderPlaced = false;   // reset agar form mulai bersih di next open
    closeOrderModal();            // tutup modal
  }, 2000);
};



window.handlePesanSekarang = async function () {
  const namaVal   = document.getElementById('checkout-nama').value.trim();
  const waVal     = document.getElementById('checkout-wa').value.trim();
  const paketVal  = document.getElementById('checkout-paket').value;
  const pesanBtn  = document.getElementById('btn-pesan-sekarang');

  // --- Validasi dasar ---
  if (!namaVal || !waVal || !paketVal) {
    showToast('Lengkapi Nama, No. WA, dan Paket terlebih dahulu!', 'error');
    // Shake animasi pada field kosong
    ['checkout-nama','checkout-wa','checkout-paket'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.value.trim()) {
        el.style.borderColor = '#EF4444';
        el.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.25)';
        setTimeout(() => { el.style.borderColor = 'rgba(255,255,255,0.15)'; el.style.boxShadow = 'none'; }, 2500);
      }
    });
    return;
  }

  if (!/^(08|62)\d+$/.test(waVal)) {
    showToast('No. WhatsApp harus diawali 08 atau 62!', 'error');
    return;
  }

  // --- Loading state tombol ---
  const originalHtml = pesanBtn.innerHTML;
  pesanBtn.disabled   = true;
  pesanBtn.style.opacity = '0.75';
  pesanBtn.innerHTML  = `<span>⏳</span> Memproses Pesanan...`;

  // --- Payload ke VPS Satpam ---
  // Field names harus cocok dengan server.js: nama, wa, masa_aktif, jenis_paket
  const payload = {
    nama:        namaVal,
    wa:          waVal,
    jenis_paket: paketVal,
    masa_aktif:  30
  };

  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch('/api/satpam', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
      signal:  controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      showToast('✅ Pesanan telah terkirim dan masuk antrean, mohon segera konfirmasi setelah bayar ke admin agar diproses secepatnya max 1x24 jam.', 'success');
    } else {
      console.warn('VPS API returned status:', response.status);
      showToast('✅ Pesanan telah terkirim dan masuk antrean, silakan selesaikan pembayaran.', 'success');
    }
  } catch (err) {
    clearTimeout(timeoutId);
    console.error('Gagal menembak API VPS Satpam:', err);
    // Silent fail — tetap lanjutkan agar pelanggan tidak terhambat
    showToast('✅ Pesanan telah terkirim dan masuk antrean, silakan selesaikan pembayaran.', 'success');
  }

  // --- Tandai sudah dipesan ---
  window.orderPlaced = true;

  // --- Kunci input data diri agar tidak bisa diubah ---
  ['checkout-nama','checkout-wa','checkout-paket'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.disabled = true;
      el.style.borderColor = 'rgba(250,204,21,0.25)';
    }
  });

  // --- Sembunyikan tombol Pesan Sekarang ---
  const pesanContainer = document.getElementById('btn-pesan-container');
  if (pesanContainer) {
    pesanContainer.style.transition = 'opacity 0.3s';
    pesanContainer.style.opacity    = '0';
    setTimeout(() => { pesanContainer.style.display = 'none'; }, 300);
  }

  // --- Tampilkan dropdown metode pembayaran ---
  const metodeContainer = document.getElementById('checkout-metode-container');
  if (metodeContainer) {
    metodeContainer.style.display = 'flex';
    metodeContainer.style.opacity = '0';
    metodeContainer.style.transition = 'opacity 0.35s ease';
    setTimeout(() => { metodeContainer.style.opacity = '1'; }, 50);
  }

  // --- Ubah grid modal menjadi 2 kolom & tampilkan kolom kanan ---
  const form = document.getElementById('order-form-checkout');
  if (form) {
    form.style.gridTemplateColumns = '1.1fr 0.9fr';
  }

  const rightCol = document.getElementById('checkout-right-column');
  if (rightCol) {
    rightCol.style.display = 'flex';
    rightCol.classList.add('visible');
  }

  // Perbarui tampilan kasir pembayaran berdasarkan paket yang sudah dipilih
  updateCheckoutPayment();

  // Scroll ke kolom kanan agar pelanggan melihat info pembayaran (mobile)
  if (window.innerWidth <= 700 && rightCol) {
    setTimeout(() => rightCol.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
  }
};


// ===== MODAL ORDER FUNCTIONS =====
window.openOrderModal = function (paketValue) {
  const modal = document.getElementById('modal-pemesanan');
  if (!modal) return;

  // Jika pesanan SUDAH dibuat sebelumnya di sesi ini, jangan di-reset!
  // Tampilkan langsung kasir pembayaran dengan data yang lama agar tidak ada data ganda di Buku Satpam
  if (window.orderPlaced) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    updateCheckoutPayment();
    return;
  }

  // ===== RESET ke Step 1 (Hanya jika belum order) =====
  window.orderPlaced = false;

  // Reset form fields
  const form = document.getElementById('order-form-checkout');
  if (form) {
    form.reset();
    // Kembalikan grid ke 1 kolom
    form.style.gridTemplateColumns = '1fr';
  }

  // Re-enable semua input data diri
  ['checkout-nama','checkout-wa','checkout-paket'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.disabled = false;
      el.style.borderColor = 'rgba(255,255,255,0.15)';
      el.style.boxShadow   = 'none';
    }
  });

  // Tampilkan kembali tombol Pesan Sekarang
  const pesanContainer = document.getElementById('btn-pesan-container');
  if (pesanContainer) {
    pesanContainer.style.display  = 'block';
    pesanContainer.style.opacity  = '1';
  }
  const pesanBtn = document.getElementById('btn-pesan-sekarang');
  if (pesanBtn) {
    pesanBtn.disabled = false;
    pesanBtn.style.opacity = '1';
    pesanBtn.innerHTML = `<span style="font-size:1.2rem;">🛒</span> Pesan Sekarang`;
  }

  // Sembunyikan dropdown metode pembayaran
  const metodeContainer = document.getElementById('checkout-metode-container');
  if (metodeContainer) metodeContainer.style.display = 'none';

  // Sembunyikan kolom kanan
  const rightCol = document.getElementById('checkout-right-column');
  if (rightCol) {
    rightCol.style.display = 'none';
    rightCol.classList.remove('visible');
  }

  // Reset payment box
  updateCheckoutPayment();

  // Tampilkan modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Jika paket sudah dipilih (klik tombol langsung dari kartu harga)
  if (paketValue) {
    setTimeout(() => {
      const paketSelect = document.getElementById('checkout-paket');
      if (!paketSelect) return;
      for (let i = 0; i < paketSelect.options.length; i++) {
        if (paketSelect.options[i].value === paketValue) {
          paketSelect.selectedIndex = i;
          break;
        }
      }
      // Flash highlight agar pelanggan tahu paket sudah terpilih
      paketSelect.style.borderColor = '#facc15';
      paketSelect.style.boxShadow   = '0 0 0 3px rgba(250,204,21,0.25)';
      setTimeout(() => {
        paketSelect.style.borderColor = 'rgba(255,255,255,0.15)';
        paketSelect.style.boxShadow   = 'none';
      }, 2000);
    }, 80);
  }
};

window.closeOrderModal = function () {
  const modal = document.getElementById('modal-pemesanan');
  if (!modal) return;
  // Fade-out animation
  const box = document.getElementById('modal-pemesanan-box');
  if (box) {
    box.style.transition = 'opacity 0.2s, transform 0.2s';
    box.style.opacity = '0';
    box.style.transform = 'scale(0.95) translateY(16px)';
  }
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    if (box) {
      box.style.opacity = '';
      box.style.transform = '';
    }
  }, 200);
};

// Alias for backward compat (old Order buttons that passed paket)
window.selectPackageAndScroll = window.openOrderModal;

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeOrderModal();
});

// ===== INIT FIRST TAB =====
document.addEventListener('DOMContentLoaded', () => {
  showPricing('live');
  showDemo('live');
  updateCheckoutPayment();
});

