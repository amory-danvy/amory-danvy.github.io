// Ajoute une classe pour les animations de scroll
const sections = document.querySelectorAll("section");

const options = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});
