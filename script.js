(() => {
  // ===== Image Slider =====
  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...document.querySelectorAll('.slide-dots .dot')];
  let current = 0;
  let autoSlide;
  function showSlide(index) {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  }
  function startAutoSlide() {
    stopAutoSlide();
    if (slides.length > 1) {
      autoSlide = setInterval(() => {
        showSlide(current + 1);
      }, 5000);
    }
  }
  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
  }
  document.querySelector('.prev')?.addEventListener('click', () => {
    showSlide(current - 1);
    startAutoSlide();
  });
  document.querySelector('.next')?.addEventListener('click', () => {
    showSlide(current + 1);
    startAutoSlide();
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startAutoSlide();
    });
  });
  const hero = document.querySelector('.hero');
  hero?.addEventListener('mouseenter', stopAutoSlide);
  hero?.addEventListener('mouseleave', startAutoSlide);
  showSlide(0);
  startAutoSlide();
  // ===== Mobile Menu =====
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  toggle?.addEventListener('click', () => {
    if (!nav) return;
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute(
      'aria-label',
      open ? 'Menü schließen' : 'Menü öffnen'
    );
  });
  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.setAttribute('aria-label', 'Menü öffnen');
    });
  });
  // ===== Search =====
  const panel = document.querySelector('.search-panel');
  const searchToggle = document.querySelector('.search-toggle');
  const searchForm = document.querySelector('.search-panel form');
  searchToggle?.addEventListener('click', () => {
    if (!panel) return;
    panel.hidden = !panel.hidden;
    if (!panel.hidden) {
      panel.querySelector('input')?.focus();
    }
  });
  searchForm?.addEventListener('submit', event => {
    event.preventDefault();
    const input = searchForm.querySelector('input');
    const query = input?.value.trim().toLocaleLowerCase('de');
    if (!query) return;
    const elements = [
      ...document.querySelectorAll(
        'main h1, main h2, main h3, main p, main li, main td'
      )
    ];
    const found = elements.find(element =>
      element.textContent.toLocaleLowerCase('de').includes(query)
    );
    if (found) {
      found.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      found.setAttribute('tabindex', '-1');
      found.focus({ preventScroll: true });
      found.style.outline = '2px solid #b87836';
      setTimeout(() => {
        found.style.removeProperty('outline');
        found.removeAttribute('tabindex');
      }, 2500);
    } else {
      alert('Auf dieser Seite wurde kein passender Text gefunden.');
    }
  });
  // ===== Back to Top =====
  const backTop = document.querySelector('.back-top');
  if (backTop) {
    const updateBackTop = () => {
      backTop.classList.toggle('visible', window.scrollY > 300);
    };
    window.addEventListener('scroll', updateBackTop, {
      passive: true
    });
    backTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    updateBackTop();
  }
})();