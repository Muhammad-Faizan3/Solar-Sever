/* ============================================================
   SOLAR SAVER - FULLY RESPONSIVE JAVASCRIPT
   Mobile First approach with all original functionality preserved
   Changes marked with [RESPONSIVE JS CHANGE] comments
   ============================================================ */

// === HERO WORD REVEAL (ORIGINAL, preserved with responsive delay tweak) ===
window.addEventListener("DOMContentLoaded", () => {
  const words = document.querySelectorAll("#hero-heading .word");
  words.forEach((el, i) => {
    el.style.animationDelay = (0.2 + i * 0.15) + "s";
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
  });
  requestAnimationFrame(() => {
    words.forEach((el) => {
      el.style.animation = "wordReveal 0.6s ease forwards";
    });
  });

  // [RESPONSIVE JS CHANGE 1] Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const nav = document.querySelector("header nav");
    const hamburger = document.querySelector(".hamburger");
    const menu = nav?.querySelector("ul");
    if (!hamburger || !menu) return;
    // Only on mobile (hamburger visible)
    if (window.getComputedStyle(hamburger).display !== "flex") return;
    const isClickInsideNav = nav.contains(e.target);
    if (!isClickInsideNav && menu.classList.contains("show")) {
      menu.classList.remove("show");
      hamburger.classList.remove("active");
    }
  });

  // [RESPONSIVE JS CHANGE 2] Re-init slider position on window resize
  // Ensures Before/After divider stays correctly positioned after orientation change
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reset before/after slider to 50%
      const sliderSection = document.querySelector(".before-after-container");
      const afterWrapper = document.querySelector(".after-wrapper");
      const divider = document.querySelector(".divider");
      if (sliderSection && afterWrapper && divider) {
        const w = sliderSection.offsetWidth;
        const pos = w * 0.5;
        afterWrapper.style.left = pos + "px";
        divider.style.left = pos + "px";
        afterWrapper.style.width = "50%";
      }
      // Reset testimonial pagination
      goToTestPage(0);
    }, 150);
  });
});

// === HERO IMAGE 3D TILT (ORIGINAL, preserved) ===
const heroImgContainer = document.getElementById("hero-image-3d");
const heroImgEl = heroImgContainer?.querySelector("img");
if (heroImgContainer && heroImgEl) {
  heroImgContainer.addEventListener("mousemove", (e) => {
    const rect = heroImgContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    heroImgEl.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  heroImgContainer.addEventListener("mouseleave", () => {
    heroImgEl.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
}

// === STICKY NAVBAR WITH SHRINK (ORIGINAL, preserved) ===
const navbar = document.querySelector("header nav");
const navLogo = navbar?.querySelector("img");
const navHeight = navbar?.offsetHeight || 80;

window.addEventListener("scroll", () => {
  if (window.scrollY > navHeight) {
    navbar?.classList.add("sticky");
  } else {
    navbar?.classList.remove("sticky");
  }
});

// === SCROLL PROGRESS BAR (ORIGINAL, preserved) ===
const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";
});

// === BACK TO TOP (ORIGINAL, preserved) ===
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backToTop?.classList.toggle("show", window.scrollY > 500);
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === SCROLL REVEAL ANIMATIONS (ORIGINAL, preserved) ===
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
);

revealElements.forEach((el) => revealObserver.observe(el));

// === ACTIVE NAV LINK ON SCROLL (ORIGINAL, preserved) ===
const sections = document.querySelectorAll("section[id], div[id], header[id]");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active-link");
    }
  });
});

// === BEFORE / AFTER SLIDER (ORIGINAL + responsive bug fixes) ===
const sliderSection = document.querySelector(".before-after-container");
const afterWrapper = document.querySelector(".after-wrapper");
const divider = document.querySelector(".divider");

let isDragging = false;
let sliderAutoPlay = null;

function setSliderPosition(percent) {
  if (!sliderSection) return;
  const w = sliderSection.offsetWidth;
  const pos = (percent / 100) * w;
  afterWrapper.style.left = pos + "px";
  divider.style.left = pos + "px";
  afterWrapper.style.width = (100 - percent) + "%";
}

function moveSlider(x) {
  if (!sliderSection) return;
  const rect = sliderSection.getBoundingClientRect();
  let pos = x - rect.left;
  if (pos < 0) pos = 0;
  if (pos > rect.width) pos = rect.width;
  const pct = (pos / rect.width) * 100;
  afterWrapper.style.left = pos + "px";
  divider.style.left = pos + "px";
  afterWrapper.style.width = (100 - pct) + "%";
}

// [RESPONSIVE JS CHANGE 3] Auto-play slider uses smaller step on mobile to avoid jerky motion
function startSliderAutoPlay() {
  let forward = true;
  sliderAutoPlay = setInterval(() => {
    if (!sliderSection) return;
    const w = sliderSection.offsetWidth;
    const left = parseFloat(afterWrapper.style.left) || w / 2;
    // Smaller step for smaller screens (mobile step ≈ 0.5% of width)
    const mobile = window.innerWidth < 768;
    const step = mobile ? w * 0.004 : w * 0.008;
    let newLeft = forward ? left + step : left - step;
    if (newLeft >= w * 0.9) { newLeft = w * 0.9; forward = false; }
    if (newLeft <= w * 0.1) { newLeft = w * 0.1; forward = true; }
    const pct = (newLeft / w) * 100;
    afterWrapper.style.left = newLeft + "px";
    divider.style.left = newLeft + "px";
    afterWrapper.style.width = (100 - pct) + "%";
  }, 30);
}

function stopSliderAutoPlay() {
  clearInterval(sliderAutoPlay);
}

function resumeSliderAutoPlay() {
  stopSliderAutoPlay();
  setTimeout(startSliderAutoPlay, 3000);
}

if (divider) {
  divider.addEventListener("mousedown", () => {
    isDragging = true;
    stopSliderAutoPlay();
  });
  window.addEventListener("mouseup", () => {
    isDragging = false;
    resumeSliderAutoPlay();
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    moveSlider(e.clientX);
  });
  divider.addEventListener("touchstart", (e) => {
    isDragging = true;
    stopSliderAutoPlay();
    e.preventDefault();
  });
  window.addEventListener("touchend", () => {
    isDragging = false;
    resumeSliderAutoPlay();
  });
  window.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      moveSlider(e.touches[0].clientX);
      e.preventDefault();
    },
    { passive: false }
  );
  // Init at 50% and start auto-play
  setSliderPosition(50);
  startSliderAutoPlay();
}

// === SMOOTH SCROLLING (ORIGINAL + responsive menu close) ===
document
  .querySelectorAll('nav a[href^="#"], footer a[href^="#"]')
  .forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      // [RESPONSIVE JS CHANGE 4] Close hamburger menu on mobile after anchor click
      const nav = document.querySelector("header nav");
      const hamburger = document.querySelector(".hamburger");
      const ul = nav?.querySelector("ul");
      if (ul?.classList.contains("show")) {
        ul.classList.remove("show");
        hamburger?.classList.remove("active");
      }
      // Small delay so menu close animation runs before scroll
      setTimeout(() => {
        if (target) {
          // [RESPONSIVE JS CHANGE 5] Account for sticky navbar height when scrolling to anchor
          const stickyNav = document.querySelector("header nav.sticky") || navbar;
          const navOffset = stickyNav?.offsetHeight || 70;
          const targetTop = target.getBoundingClientRect().top + window.scrollY - navOffset - 10;
          window.scrollTo({ top: targetTop, behavior: "smooth" });
        }
      }, 100);
    });
  });

// ============================================================
// [RESPONSIVE JS CHANGE 6] HAMBURGER MENU - proper styling override
// Inserted via JS so we don't rely on inline styles conflicting with CSS media queries
// We remove the inline styles and let CSS in style.css handle the display toggling
// ============================================================
const nav = document.querySelector("header nav");
const existingHamburger = document.querySelector(".hamburger");

// Only create if it doesn't exist (prevents double-insert on DOMContentLoaded reruns if any)
if (!existingHamburger && nav) {
  const hamburger = document.createElement("div");
  hamburger.className = "hamburger";
  hamburger.setAttribute("aria-label", "Toggle navigation menu");
  hamburger.setAttribute("role", "button");
  hamburger.setAttribute("tabindex", "0");
  hamburger.innerHTML = "<span></span><span></span><span></span>";
  // [RESPONSIVE JS] Do NOT inline display/span styles - CSS handles breakpoint toggle
  // We just add it to the DOM, styles come from style.css
  nav.insertBefore(hamburger, nav.querySelector("ul"));

  hamburger.addEventListener("click", () => {
    const ul = nav.querySelector("ul");
    ul?.classList.toggle("show");
    hamburger.classList.toggle("active");
  });

  // [RESPONSIVE JS] Keyboard accessibility for hamburger
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const ul = nav.querySelector("ul");
      ul?.classList.toggle("show");
      hamburger.classList.toggle("active");
    }
    if (e.key === "Escape") {
      const ul = nav.querySelector("ul");
      ul?.classList.remove("show");
      hamburger.classList.remove("active");
    }
  });
} else if (existingHamburger) {
  // If hamburger was already present, ensure inline styles removed so CSS media queries work
  existingHamburger.style.removeProperty("display");
  existingHamburger.style.removeProperty("flex-direction");
  existingHamburger.style.removeProperty("cursor");
  existingHamburger.style.removeProperty("padding");
  existingHamburger.style.removeProperty("z-index");
  existingHamburger.style.removeProperty("margin-right");
  existingHamburger.querySelectorAll("span").forEach((s) => {
    s.style.removeProperty("width");
    s.style.removeProperty("height");
    s.style.removeProperty("background");
    s.style.removeProperty("margin");
    s.style.removeProperty("border-radius");
    s.style.removeProperty("transition");
  });
}

// === CALCULATE SOLAR BUTTONS (ORIGINAL, preserved) ===
document.querySelectorAll("button").forEach((btn) => {
  if (btn.textContent.includes("Calculate Solar")) {
    btn.addEventListener("click", () => {
      document.getElementById("calculator-overlay")?.classList.add("show");
    });
  }
});

// === SOLAR SAVINGS CALCULATOR (ORIGINAL, preserved) ===
const overlay = document.getElementById("calculator-overlay");
const modal = document.getElementById("calculator-modal");
const closeBtn = document.getElementById("calc-close");
const calcBtn = document.getElementById("calc-btn");
const billInput = document.getElementById("bill-input");
const sizeInput = document.getElementById("size-input");
const resultDiv = document.getElementById("calc-result");

closeBtn?.addEventListener("click", () => overlay?.classList.remove("show"));
overlay?.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.classList.remove("show");
});

calcBtn?.addEventListener("click", () => {
  const bill = parseFloat(billInput?.value) || 200;
  const size = parseFloat(sizeInput?.value) || 7;
  const solarGeneration = size * 120;
  const savings = Math.min(bill, (solarGeneration * 0.12)).toFixed(2);
  const yearly = (savings * 12).toFixed(2);
  const payback = (size * 2500 / (savings * 12)).toFixed(1);
  resultDiv.innerHTML = `
    <p>Estimated Monthly Savings: <span>$${savings}</span></p>
    <p>Yearly Savings: <span>$${yearly}</span></p>
    <p>Estimated Payback Period: <span>${payback} years</span></p>
  `;
  resultDiv.classList.add("show");
});

// === TOOL CARD 3D TILT (ORIGINAL, preserved - only on pointer devices) ===
// [RESPONSIVE JS CHANGE 7] Skip 3D tilt on touch devices to avoid scroll jank
const isTouchDevice = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);

if (!isTouchDevice) {
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });
  });
}

// === TOOL CARD MODAL (ORIGINAL, preserved) ===
const toolOverlay = document.getElementById('tool-modal-overlay');
const toolClose = document.getElementById('tool-modal-close');
const toolModalIcon = document.getElementById('tool-modal-icon').querySelector('img');
const toolModalTitle = document.getElementById('tool-modal-title');
const toolModalDesc = document.getElementById('tool-modal-desc');
const toolModalFeatures = document.getElementById('tool-modal-features');

const toolData = [
  { title: 'Real-Time Production Estimates', desc: 'Accurate, up-to-the-minute solar production estimates powered by real-time weather data and system specifications. Close more deals with instant, trustworthy numbers.', features: ['Real-time weather integration', 'Instant calculation engine', 'Exportable PDF reports', 'Historical production tracking'] },
  { title: 'Quick Sales Training', desc: 'Get new sales representatives up to speed in record time with our streamlined training platform. Reduce onboarding from weeks to days.', features: ['Interactive learning modules', 'Progress tracking dashboard', 'Certification-ready assessments', 'Role-play simulation scenarios'] },
  { title: 'Proposal Designer', desc: 'Homeowner-focused proposal design that communicates value clearly and drives conversions. Stand out with stunning, professional proposals.', features: ['Drag-and-drop proposal editor', 'Custom branding templates', 'Client-ready PDF exports', 'Visual savings comparisons'] },
  { title: 'Customizable Sales Tools', desc: 'Fully customizable solar sales tools that adapt to each representative\'s unique style and needs. One size does not fit all in solar sales.', features: ['Modular dashboard layout', 'Custom workflow builders', 'Performance analytics', 'Team-wide template sharing'] },
  { title: 'Rapid Proposal Generation', desc: 'Generate quick and accurate solar sales proposals that impress customers and close deals faster. Speed without sacrificing quality.', features: ['AI-powered system sizing', 'Instant quote generation', 'Multi-package plan options', 'Financing integration'] },
  { title: 'Team Coordination', desc: 'Smart management features for effective team coordination and streamlined workflow. Keep your entire sales team in sync.', features: ['Automated task assignment', 'Real-time status updates', 'Team performance analytics', 'Central communication hub'] }
];

document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('click', () => {
    const idx = parseInt(card.dataset.tool) - 1;
    const data = toolData[idx];
    if (!data) return;
    toolModalIcon.src = card.querySelector('.icon img').src;
    toolModalIcon.alt = data.title;
    toolModalTitle.textContent = data.title;
    toolModalDesc.textContent = data.desc;
    toolModalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    toolOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

toolClose?.addEventListener('click', () => {
  toolOverlay.classList.remove('show');
  document.body.style.overflow = '';
});

toolOverlay?.addEventListener('click', e => {
  if (e.target === toolOverlay) {
    toolOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }
});

// === STAGGERED SCROLL ANIMATION (ORIGINAL, preserved) ===
const toolCards = document.querySelectorAll('.tool-card');
const toolObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = Array.from(toolCards).indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 120);
      toolObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

toolCards.forEach(card => toolObserver.observe(card));

// === PRICING 3D TILT (ORIGINAL, preserved - disabled on touch for performance) ===
if (!isTouchDevice) {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = card.classList.contains("popular")
        ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
        : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = card.classList.contains("popular")
        ? "scale(1.05)"
        : "rotateX(0deg) rotateY(0deg)";
    });
  });
}

// === ABOUT STATS COUNTER (ORIGINAL, preserved) ===
const statNumbers = document.querySelectorAll(".stat-number");
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute("data-target"));
    const increment = target / 60;
    let current = 0;
    const update = () => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        statsObserver.unobserve(el);
        return;
      }
      el.textContent = Math.floor(current);
      requestAnimationFrame(update);
    };
    update();
  });
}, { threshold: 0.5 });
statNumbers.forEach((el) => statsObserver.observe(el));

// === ABOUT IMAGE 3D TILT (ORIGINAL, preserved - disabled on touch) ===
const aboutImgBox = document.getElementById("about-image-3d");
if (aboutImgBox && !isTouchDevice) {
  const aboutImg = aboutImgBox.querySelector("img");
  aboutImgBox.addEventListener("mousemove", (e) => {
    if (!aboutImg) return;
    const rect = aboutImgBox.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    aboutImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  aboutImgBox.addEventListener("mouseleave", () => {
    if (aboutImg) aboutImg.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
}

// === AI SECTION ANIMATION (ORIGINAL, preserved) ===
const aiSection = document.querySelector(".ai-section");
const aiCounts = aiSection?.querySelectorAll(".count-num");
const aiDecs = aiSection?.querySelectorAll(".count-dec");
const aiBars = aiSection?.querySelectorAll(".ai-bar-fill");
const aiObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    aiBars.forEach((bar) => {
      const w = bar.style.width;
      bar.style.width = "0%";
      setTimeout(() => { bar.style.width = w; }, 200);
    });
    aiCounts.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"));
      let current = 0;
      const step = Math.ceil(target / 50);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 30);
    });
    aiDecs.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"));
      el.textContent = target.toString().padStart(2, "0");
    });
    aiObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });
if (aiSection) aiObserver.observe(aiSection);

// === EQUIPMENT 3D TILT (ORIGINAL, preserved - disabled on touch) ===
if (!isTouchDevice) {
  document.querySelectorAll(".equip-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -6;
      const ry = ((x - cx) / cx) * 6;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-12px) scale(1.02)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
    });
  });
}

// === COVERAGE STATS COUNTER (ORIGINAL, preserved) ===
const covNums = document.querySelectorAll(".cov-num");
const covObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute("data-target"));
    let current = 0;
    const step = Math.ceil(target / 50);
    const t = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(t); }
      el.textContent = current;
    }, 25);
    covObserver.unobserve(el);
  });
}, { threshold: 0.5 });
covNums.forEach((el) => covObserver.observe(el));

// === MAP TOGGLE (ORIGINAL, preserved) ===
const mapToggle = document.querySelector(".map-toggle-btn");
const covMap = document.querySelector(".coverage-map");
if (mapToggle && covMap) {
  mapToggle.addEventListener("click", () => {
    if (covMap.style.display === "none") {
      covMap.style.display = "block";
      mapToggle.textContent = "Map View";
    } else {
      covMap.style.display = "none";
      mapToggle.textContent = "Show Map";
    }
  });
}

// === STEPS CAROUSEL (ORIGINAL, preserved) ===
const stepCards = document.querySelectorAll(".step-card");
const stepDots = document.querySelectorAll(".step-dots .dot");
const stepPrev = document.getElementById("step-prev");
const stepNext = document.getElementById("step-next");
let curStep = 0;

function goToStep(i) {
  stepCards.forEach((c, idx) => {
    c.classList.toggle("active", idx === i);
    stepDots[idx]?.classList.toggle("active", idx === i);
  });
  curStep = i;
}
if (stepNext) stepNext.addEventListener("click", () => goToStep((curStep + 1) % stepCards.length));
if (stepPrev) stepPrev.addEventListener("click", () => goToStep((curStep - 1 + stepCards.length) % stepCards.length));
stepDots.forEach((dot, i) => dot.addEventListener("click", () => goToStep(i)));

// === TESTIMONIAL SLIDER (ORIGINAL + responsive page calculation fix) ===
const testSlider = document.querySelector(".testimonial-slider");
const testTrack = document.querySelector(".testimonial-track");
const testCards = document.querySelectorAll(".testimonial-card");
const testDots = document.querySelectorAll(".testimonial-dots .dot");
const testPrev = document.getElementById("test-prev");
const testNext = document.getElementById("test-next");
let testPage = 0;

function getCardWidth() {
  if (testCards.length === 0) return 375;
  const card = testCards[0];
  return card.offsetWidth + 20; // +20 matches default gap
}
function getMaxPage() {
  const visible = testSlider ? testSlider.offsetWidth : 1200;
  const cw = getCardWidth();
  const total = cw * testCards.length - 20;
  const pages = Math.ceil(Math.max(0, (total - visible)) / cw) + 1;
  return Math.max(0, pages - 1);
}
// [RESPONSIVE JS CHANGE 8] Named function so resize handler and interval can both call it
function goToTestPage(p) {
  if (testCards.length === 0) return;
  const max = getMaxPage();
  testPage = Math.max(0, Math.min(p, max));
  const offset = -(testPage * getCardWidth());
  if (testTrack) testTrack.style.transform = `translateX(${offset}px)`;
  // Update dots - hide if only one page, match active dot
  testDots.forEach((d, idx) => {
    // Dots only meaningful if multi-page
    if (max <= 0) {
      d.style.display = "none";
      d.classList.remove("active");
    } else {
      d.style.display = "inline-block";
      d.classList.toggle("active", idx === testPage || (max > 0 && idx === Math.min(testPage, testDots.length - 1)));
    }
  });
  // Mark the active card for visual highlight
  const visibleCards = Math.max(1, Math.round((testSlider?.offsetWidth || 1200) / getCardWidth()));
  const startIdx = testPage;
  testCards.forEach((c, idx) => c.classList.toggle("active", idx === startIdx));
}
if (testNext) testNext.addEventListener("click", () => goToTestPage(testPage + 1));
if (testPrev) testPrev.addEventListener("click", () => goToTestPage(testPage - 1));
testDots.forEach((dot, i) => dot.addEventListener("click", () => goToTestPage(i)));
// Init and auto-rotate
window.addEventListener("load", () => {
  setTimeout(() => goToTestPage(0), 100);
});
// Auto rotate every 5s, reset on resize already handled at top of file
setInterval(() => {
  const max = getMaxPage();
  goToTestPage(testPage + 1 > max ? 0 : testPage + 1);
}, 5000);

// === FAQ ACCORDION (ORIGINAL, preserved) ===
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    const active = item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("active"));
    if (!active) item.classList.add("active");
  });
});

// === KEYBOARD SHORTCUTS (ORIGINAL, preserved + mobile menu escape) ===
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close calculator modal
    overlay?.classList.remove("show");
    // Close tool modal
    toolOverlay?.classList.remove("show");
    document.body.style.overflow = '';
    // [RESPONSIVE JS CHANGE 9] Close hamburger menu on ESC
    const navBar = document.querySelector("header nav");
    const ham = document.querySelector(".hamburger");
    const ul = navBar?.querySelector("ul");
    ul?.classList.remove("show");
    ham?.classList.remove("active");
  }
  // Scroll to top on Home key
  if (e.key === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
});

// [RESPONSIVE JS CHANGE 10] Prevent horizontal scroll overflow from transient offscreen transforms
// Catch last-minute overflow issues on initial paint
window.addEventListener("load", () => {
  document.body.scrollLeft = 0;
  if (window.scrollX > 0) window.scrollTo({ left: 0 });
});
