document.addEventListener('DOMContentLoaded', () => {

    // --- MODO OSCURO ---
    const themeSwitch = document.getElementById('darkModeSwitch');
    const htmlElement = document.documentElement;
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
    };
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    themeSwitch.checked = savedTheme === 'dark';
    themeSwitch.addEventListener('change', () => {
        applyTheme(themeSwitch.checked ? 'dark' : 'light');
    });

    // --- NAVBAR DINÁMICA (EFECTO TRANSPARENTE A SÓLIDO) ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- ANIMACIONES AL SCROLLEAR ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: des-observar después de la primera vez para que no se repita
                if (!entry.target.classList.contains('social-sidebar')) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1 
    });

    const itemsToObserve = document.querySelectorAll('.friki-item, .project-list-item, .timeline-container, .social-sidebar');
    itemsToObserve.forEach((item, index) => {
        // Un pequeño retraso para que los elementos aparezcan de forma escalonada
        item.style.transitionDelay = `${Math.min(index * 100, 500)}ms`;
        observer.observe(item);
    });

    // --- INICIALIZACIÓN DE GLIGHTBOX ---
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    });

});