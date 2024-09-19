// Script to add smooth scrolling effect and highlight active sections
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Add 'active' class when section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const link = document.querySelector(`nav ul li a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                link.classList.add('active');
            } else {
                entry.target.classList.remove('active');
                link.classList.remove('active');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
