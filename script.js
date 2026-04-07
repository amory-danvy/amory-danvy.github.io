// script.js - Logique d'interface utilisateur

document.addEventListener('DOMContentLoaded', () => {

    // 1. Gestion du menu mobile (Hamburger Menu)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Ferme le menu mobile lorsqu'un lien est cliqué
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. Transparence de la barre de navigation au défilement
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Utilisateur scrolle vers le bas
            navbar.classList.add('shadow-lg', 'bg-dark/95', 'border-gray-800');
            navbar.classList.remove('bg-dark/80', 'border-transparent');
        } else {
            // Utilisateur est tout en haut
            navbar.classList.add('bg-dark/80', 'border-transparent');
            navbar.classList.remove('shadow-lg', 'bg-dark/95', 'border-gray-800');
        }
    });

    // 3. (Optionnel) Ajout d'une petite animation d'apparition au scroll pour les sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les en-têtes de section pour les animer
    document.querySelectorAll('section h2').forEach(heading => {
        // Prepare element for animation by resetting opacity if needed
        heading.style.opacity = '0';
        sectionObserver.observe(heading);
    });
});
