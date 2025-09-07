// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('analysis-modal');
const modalClose = document.getElementById('modal-close');
const startAnalysisButtons = document.querySelectorAll('#start-analysis, #start-analysis-cta');
const demoButton = document.getElementById('demo-btn');
const chatFileInput = document.getElementById('chat-file');
const analyzeButton = document.getElementById('analyze-btn');
const uploadLabel = document.querySelector('.upload-label');

// Navigation Toggle
navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = navToggle.querySelector('i');
  
  if (navMenu.classList.contains('active')) {
    icon.className = 'fas fa-times';
    navMenu.style.display = 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.left = '0';
    navMenu.style.right = '0';
    navMenu.style.background = 'rgba(255, 255, 255, 0.98)';
    navMenu.style.backdropFilter = 'blur(10px)';
    navMenu.style.padding = '2rem';
    navMenu.style.borderTop = '1px solid var(--gray-200)';
    navMenu.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
  } else {
    icon.className = 'fas fa-bars';
    navMenu.style.display = '';
    navMenu.style.flexDirection = '';
    navMenu.style.position = '';
    navMenu.style.top = '';
    navMenu.style.left = '';
    navMenu.style.right = '';
    navMenu.style.background = '';
    navMenu.style.backdropFilter = '';
    navMenu.style.padding = '';
    navMenu.style.borderTop = '';
    navMenu.style.boxShadow = '';
  }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (navMenu.classList.contains('active')) {
        navToggle.click();
      }
    }
  });
});

// Header Scroll Effect
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
  }
  
  // Hide/show header on scroll
  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollY = currentScrollY;
});

// Modal Functionality
function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  
  // Reset form
  chatFileInput.value = '';
  analyzeButton.disabled = true;
  updateUploadLabel();
}

// Open modal when clicking start analysis buttons
startAnalysisButtons.forEach(button => {
  button.addEventListener('click', openModal);
});

// Close modal
modalClose?.addEventListener('click', closeModal);

// Close modal when clicking outside
modal?.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Demo Button Functionality
demoButton?.addEventListener('click', () => {
  // Scroll to features section for demo
  const featuresSection = document.getElementById('como-funciona');
  if (featuresSection) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = featuresSection.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
  
  // Show demo animation
  showDemoAnimation();
});

function showDemoAnimation() {
  const phoneScreen = document.querySelector('.phone-screen');
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  
  if (!phoneScreen || !progressFill || !progressText) return;
  
  // Reset animation
  progressFill.style.animation = 'none';
  progressFill.offsetHeight; // Trigger reflow
  progressFill.style.animation = '';
  
  const messages = [
    'Analizando patrones de tiempo...',
    'Detectando cambios de comportamiento...',
    'Examinando frecuencia de mensajes...',
    'Identificando contactos sospechosos...',
    'Generando reporte final...',
    '¡Análisis completado!'
  ];
  
  let messageIndex = 0;
  const messageInterval = setInterval(() => {
    progressText.textContent = messages[messageIndex];
    messageIndex++;
    
    if (messageIndex >= messages.length) {
      clearInterval(messageInterval);
      setTimeout(() => {
        progressText.textContent = 'Detectando patrones sospechosos...';
      }, 2000);
    }
  }, 1000);
}

// File Upload Functionality
function updateUploadLabel(fileName = null) {
  const label = uploadLabel.querySelector('span') || uploadLabel;
  const icon = uploadLabel.querySelector('i');
  
  if (fileName) {
    if (icon) icon.className = 'fas fa-file-alt';
    label.innerHTML = `<i class="fas fa-file-alt"></i> ${fileName}`;
    uploadLabel.style.background = 'var(--primary-light)';
    uploadLabel.style.borderColor = 'var(--primary)';
    uploadLabel.style.color = 'var(--primary)';
  } else {
    if (icon) icon.className = 'fas fa-cloud-upload-alt';
    label.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Seleccionar archivo de chat';
    uploadLabel.style.background = '';
    uploadLabel.style.borderColor = '';
    uploadLabel.style.color = '';
  }
}

chatFileInput?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  
  if (file) {
    updateUploadLabel(file.name);
    analyzeButton.disabled = false;
    
    // Validate file type
    if (!file.name.endsWith('.txt')) {
      showNotification('Por favor, selecciona un archivo .txt válido.', 'warning');
      analyzeButton.disabled = true;
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showNotification('El archivo es demasiado grande. Máximo 10MB.', 'error');
      analyzeButton.disabled = true;
      return;
    }
    
    showNotification('Archivo cargado correctamente', 'success');
  } else {
    updateUploadLabel();
    analyzeButton.disabled = true;
  }
});

// Analyze Button Functionality
analyzeButton?.addEventListener('click', () => {
  const file = chatFileInput.files[0];
  
  if (!file) {
    showNotification('Por favor, selecciona un archivo primero.', 'warning');
    return;
  }
  
  // Start analysis simulation
  startAnalysisSimulation();
});

function startAnalysisSimulation() {
  // Update button to show loading state
  analyzeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analizando...';
  analyzeButton.disabled = true;
  
  // Simulate analysis process
  setTimeout(() => {
    showAnalysisResults();
  }, 5000);
  
  // Show progress updates
  const updates = [
    { delay: 1000, message: 'Procesando archivo...' },
    { delay: 2000, message: 'Analizando patrones...' },
    { delay: 3500, message: 'Detectando anomalías...' },
    { delay: 4500, message: 'Generando reporte...' }
  ];
  
  updates.forEach(update => {
    setTimeout(() => {
      showNotification(update.message, 'info');
    }, update.delay);
  });
}

function showAnalysisResults() {
  // Close modal
  closeModal();
  
  // Show success notification
  showNotification('¡Análisis completado! Revisa tu email para el reporte completo.', 'success');
  
  // Reset button
  analyzeButton.innerHTML = '<i class="fas fa-search"></i> Analizar Conversación';
  analyzeButton.disabled = false;
  
  // Scroll to pricing section
  setTimeout(() => {
    const pricingSection = document.getElementById('precios');
    if (pricingSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = pricingSection.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  const icon = getNotificationIcon(type);
  notification.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: getNotificationColor(type),
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    zIndex: '3000',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    maxWidth: '400px',
    animation: 'slideInRight 0.3s ease-out'
  });
  
  // Add close functionality
  const closeButton = notification.querySelector('.notification-close');
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.color = 'white';
  closeButton.style.cursor = 'pointer';
  closeButton.style.padding = '0.25rem';
  closeButton.style.borderRadius = '0.25rem';
  closeButton.style.opacity = '0.8';
  
  closeButton.addEventListener('click', () => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => notification.remove(), 300);
  });
  
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  };
  return icons[type] || icons.info;
}

function getNotificationColor(type) {
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };
  return colors[type] || colors.info;
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;
document.head.appendChild(notificationStyles);

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial-card');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

// Pricing Card Hover Effects
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = card.classList.contains('featured') 
      ? 'translateY(-8px) scale(1.05)' 
      : 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = card.classList.contains('featured') 
      ? 'scale(1.05)' 
      : '';
  });
});

// Statistics Animation
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = stat.textContent.replace(/[^\d]/g, '');
    const isPercentage = stat.textContent.includes('%');
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      stat.textContent = isPercentage 
        ? Math.floor(current) + '%'
        : Math.floor(current).toLocaleString() + '+';
    }, 40);
  });
}

// Trigger stats animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      heroObserver.unobserve(entry.target);
    }
  });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroObserver.observe(heroSection);
}

// Form Validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Contact Form (if needed)
const contactForms = document.querySelectorAll('form[data-contact]');
contactForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const email = formData.get('email');
    
    if (email && !validateEmail(email)) {
      showNotification('Por favor, ingresa un email válido.', 'warning');
      return;
    }
    
    // Simulate form submission
    showNotification('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
    form.reset();
  });
});

// Performance Optimizations
// Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// Preload critical resources
const preloadLinks = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

preloadLinks.forEach(href => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.onload = function() {
    this.onload = null;
    this.rel = 'stylesheet';
  };
  document.head.appendChild(link);
});

// Service Worker Registration (if available)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// PWA Install Prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show install button or notification
  showInstallPrompt();
});

function showInstallPrompt() {
  const installNotification = document.createElement('div');
  installNotification.innerHTML = `
    <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: var(--primary); color: white; padding: 1rem; border-radius: 0.75rem; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); z-index: 3000; display: flex; align-items: center; justify-content: space-between; max-width: 400px; margin: 0 auto;">
      <div>
        <strong>¡Instala ChillDetector!</strong>
        <p style="margin: 0; opacity: 0.9; font-size: 0.875rem;">Accede rápidamente desde tu dispositivo</p>
      </div>
      <div>
        <button id="install-button" style="background: white; color: var(--primary); border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; margin-right: 0.5rem; cursor: pointer;">Instalar</button>
        <button id="dismiss-install" style="background: none; color: white; border: none; padding: 0.5rem; cursor: pointer; opacity: 0.8;">✕</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(installNotification);
  
  document.getElementById('install-button').addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        deferredPrompt = null;
        installNotification.remove();
      });
    }
  });
  
  document.getElementById('dismiss-install').addEventListener('click', () => {
    installNotification.remove();
  });
  
  // Auto-dismiss after 10 seconds
  setTimeout(() => {
    if (installNotification.parentNode) {
      installNotification.remove();
    }
  }, 10000);
}

// Error Handling
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
  // Don't show error notifications to users in production
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
  e.preventDefault();
});

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  console.log('ChillDetector loaded successfully!');
  
  // Add any initialization code here
  updateUploadLabel();
  
  // Set up any additional event listeners or initialization
  setupKeyboardNavigation();
});

// Keyboard Navigation
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Tab navigation improvements
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
}

// Add keyboard navigation styles
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
  .keyboard-navigation *:focus {
    outline: 2px solid var(--primary) !important;
    outline-offset: 2px !important;
  }
  
  .keyboard-navigation button:focus,
  .keyboard-navigation a:focus,
  .keyboard-navigation input:focus,
  .keyboard-navigation textarea:focus,
  .keyboard-navigation select:focus {
    box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.3) !important;
  }
`;
document.head.appendChild(keyboardStyles);