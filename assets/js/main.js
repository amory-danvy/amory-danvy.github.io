/**
 * Portfolio BTS SIO SLAM - JavaScript Principal
 * Gestion des interactions et animations
 */

// ========================================
// Configuration et Variables Globales
// ========================================

const CONFIG = {
    scrollOffset: 100,
    animationDuration: 1000,
    formSubmitDelay: 5000,
    scrollTopThreshold: 300
};

// ========================================
// Initialisation
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initNavigation();
    initMobileMenu();
    initScrollToTop();
    initContactForm();
    initSmoothScroll();
    initSkillsAnimation();
    initProjectFilters();
    initTypingEffect();
    initParallax();
});

// ========================================
// Animation On Scroll (AOS)
// ========================================

function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: CONFIG.animationDuration,
            once: true,
            offset: CONFIG.scrollOffset,
            easing: 'ease-in-out'
        });
    }
}

// ========================================
// Navigation
// ========================================

function initNavigation() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Ajouter/retirer l'ombre de la navigation
        if (currentScroll > 50) {
            nav.classList.add('shadow-xl', 'nav-fixed');
        } else {
            nav.classList.remove('shadow-xl', 'nav-fixed');
        }
        
        // Navigation cachée au scroll vers le bas
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-purple-600', 'font-bold');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('text-purple-600', 'font-bold');
            }
        });
    });
}

// ========================================
// Menu Mobile
// ========================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuBtn?.querySelector('i');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            // Fermer le menu
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        } else {
            // Ouvrir le menu
            mobileMenu.classList.remove('hidden');
            mobileMenuIcon.classList.remove('fa-bars');
            mobileMenuIcon.classList.add('fa-times');
        }
    });
    
    // Fermer le menu lors du clic sur un lien
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        });
    });
    
    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        }
    });
}

// ========================================
// Bouton Retour en Haut
// ========================================

function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > CONFIG.scrollTopThreshold) {
            scrollTopBtn.classList.remove('hidden');
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.add('hidden');
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Formulaire de Contact
// ========================================

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = contactForm?.querySelector('button[type="submit"]');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Désactiver le bouton pendant l'envoi
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Envoi en cours...';
        }
        
        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulation d'envoi (remplacer par un vrai envoi en production)
        setTimeout(() => {
            // Afficher le message de succès
            if (formMessage) {
                formMessage.classList.remove('hidden');
                formMessage.innerHTML = `
                    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded fade-in-up">
                        <i class="fas fa-check-circle mr-2"></i>
                        Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
                    </div>
                `;
            }
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Réactiver le bouton
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Envoyer le message';
            }
            
            // Masquer le message après 5 secondes
            setTimeout(() => {
                if (formMessage) {
                    formMessage.classList.add('hidden');
                }
            }, CONFIG.formSubmitDelay);
        }, 1500);
    });
    
    // Validation en temps réel
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    const name = input.name;
    
    // Retirer les classes d'erreur existantes
    input.classList.remove('border-red-500');
    
    // Validation basique
    if (value === '') {
        input.classList.add('border-red-500');
        return false;
    }
    
    // Validation email
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            input.classList.add('border-red-500');
            return false;
        }
    }
    
    return true;
}

// ========================================
// Smooth Scroll
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Animation des Compétences
// ========================================

function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    if (skillBars.length === 0) return;
    
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || '0%';
                bar.style.width = width;
                observer.unobserve(bar);
            }
        });
    };
    
    const observer = new IntersectionObserver(animateSkills, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// ========================================
// Filtres de Projets
// ========================================

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projects = document.querySelectorAll('[data-category]');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-purple-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            button.classList.remove('bg-gray-200', 'text-gray-700');
            button.classList.add('bg-purple-600', 'text-white');
            
            // Filtrer les projets
            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    project.style.display = 'block';
                    project.classList.add('fade-in-up');
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

// ========================================
// Effet de Frappe (Typing Effect)
// ========================================

function initTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    
    if (!typingElement) return;
    
    const texts = [
        'Développeur Web',
        'Étudiant BTS SIO SLAM',
        'Passionné de Code',
        'Créateur d\'Applications'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// ========================================
// Effet Parallax
// ========================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ========================================
// Utilitaires
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Export des fonctions (si modules)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAOS,
        initNavigation,
        initMobileMenu,
        initScrollToTop,
        initContactForm,
        initSmoothScroll,
        initSkillsAnimation,
        initProjectFilters,
        initTypingEffect,
        initParallax
    };
}