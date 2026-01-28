// ========================================
//  LANDING PAGE INVERSIONES DUVAN
//  JavaScript para Interactividad
// ========================================

// ========================================
// HAMBURGER MENU TOGGLE
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu al hacer clic en hamburger
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  // Prevenir scroll del body cuando el menú está abierto
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Cerrar menu al hacer clic en un link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Cerrar menu al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});


// ========================================
// HEADER SHADOW ON SCROLL
// ========================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// ========================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


// ========================================
// FADE-IN ANIMATIONS ON SCROLL
// ========================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Aplicar fade-in a elementos específicos
const fadeElements = document.querySelectorAll('.about-block, .service-card, .section-header');
fadeElements.forEach(element => {
  element.classList.add('fade-in');
  observer.observe(element);
});


// ========================================
// LAZY LOADING DE IMÁGENES
// ========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Si la imagen tiene data-src, usarla
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => imageObserver.observe(img));
}


// ========================================
// ANIMACIÓN DEL BOTÓN WHATSAPP
// ========================================
const whatsappBtn = document.querySelector('.whatsapp-float');

// Agregar efecto de "bounce" cada 10 segundos
setInterval(() => {
  whatsappBtn.style.animation = 'none';
  setTimeout(() => {
    whatsappBtn.style.animation = 'pulse 2s infinite';
  }, 100);
}, 10000);


// ========================================
// PERFORMANCE: Reducir animaciones en móviles lentos
// ========================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Deshabilitar animaciones para usuarios con preferencia de movimiento reducido
  document.querySelectorAll('*').forEach(element => {
    element.style.animation = 'none';
    element.style.transition = 'none';
  });
}


// ========================================
// TRACKING DE EVENTOS (Opcional - Google Analytics)
// ========================================
// Descomentar y configurar si se usa Google Analytics

/*
// Tracking de clics en botones de PDF
document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'download', {
        'event_category': 'PDF',
        'event_label': link.getAttribute('href')
      });
    }
  });
});

// Tracking de clic en WhatsApp
document.querySelector('.whatsapp-float').addEventListener('click', () => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'contact', {
      'event_category': 'WhatsApp',
      'event_label': 'Floating Button'
    });
  }
});
*/


// ========================================
// PREVENIR ERRORES DE IMÁGENES FALTANTES
// ========================================
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    // Si la imagen no carga, agregar placeholder
    this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="30" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
    this.alt = 'Imagen no disponible';
  });
});


// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Landing Page Inversiones Duvan cargada correctamente ✓');
  
  // Agregar clase al body cuando todo está cargado
  document.body.classList.add('loaded');
});


// ========================================
// RESIZE HANDLER (Optimizado con debounce)
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Cerrar menú móvil si se redimensiona a desktop
    if (window.innerWidth >= 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }, 250);
});


// ========================================
// CARRUSEL DE PRODUCTOS
// ========================================
const carouselTrack = document.querySelector('.carousel-track');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');

if (carouselTrack && carouselPrev && carouselNext) {
  const scrollAmount = 340; // Ancho del item + gap

  carouselPrev.addEventListener('click', () => {
    carouselTrack.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  carouselNext.addEventListener('click', () => {
    carouselTrack.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Deshabilitar botones en los extremos
  function updateCarouselButtons() {
    const isAtStart = carouselTrack.scrollLeft === 0;
    const isAtEnd = carouselTrack.scrollLeft >= (carouselTrack.scrollWidth - carouselTrack.clientWidth - 10);

    carouselPrev.style.opacity = isAtStart ? '0.3' : '1';
    carouselPrev.style.pointerEvents = isAtStart ? 'none' : 'auto';
    
    carouselNext.style.opacity = isAtEnd ? '0.3' : '1';
    carouselNext.style.pointerEvents = isAtEnd ? 'none' : 'auto';
  }

  carouselTrack.addEventListener('scroll', updateCarouselButtons);
  updateCarouselButtons(); // Inicializar

  // El scroll nativo del navegador maneja el touch en móviles
  // No se necesita código adicional - el CSS ya está optimizado
}
