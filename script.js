// Basculer le thème clair/sombre
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
});

// Animation de section au défilement
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight - 50;
    sections.forEach(section => {
        if (scrollPos > section.offsetTop) {
            section.classList.add('show');
        }
    });
});
