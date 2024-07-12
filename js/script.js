document.addEventListener("DOMContentLoaded", function() {
    // Gestion des différentes classes utilisées
    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll("nav a");
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    // Gestion de la classe 'active' pour les liens de navigation
    const path = window.location.pathname;
    const page = path.split("/").pop(); 
    
    navLinks.forEach(function(link) {
        const href = link.getAttribute("href");
        if (page === href || (page === "" && href === "index.html")) {
            link.classList.add("active");
        }
    });

    // Gestion du menu hamburger
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('open');
        header.classList.toggle('open');
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', function(event) {
        const isClickInside = nav.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInside && nav.classList.contains('open')) {
            nav.classList.remove('open');
            header.classList.remove('open');
        }
    });

    // Gestion de la transparence du header et de la couleur du hamburger lors du scroll
    function handleScroll() {
        const Top = window.scrollY === 0;
        const Position = window.location.pathname;
        const ExceptionPage = Position.includes('les_justes') || Position.includes('les_vies_sauvees');
    
        header.classList.toggle('scrolled', !Top);
        header.classList.toggle('transparent', Top);
    
        navLinks.forEach(link => {
            link.classList.toggle('top', Top && !ExceptionPage);
        });
    }
    
    window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
    window.addEventListener('load', handleScroll);
    handleScroll();

    // Ajustement pour les appareils mobiles
    function checkScreenSize() {
        if (window.innerWidth <= 1024) {
            nav.style.display = 'block';
            hamburger.style.display = 'flex';
        } else {
            nav.style.display = '';
            hamburger.style.display = 'none';
            nav.classList.remove('open');
            header.classList.remove('open');
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize(); // Vérification initiale

    setTimeout(function() {
        document.querySelector('.titre').classList.add('visible');
    }, 300);

    function checkScroll() {
        const elements = document.querySelectorAll('.scroll');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top <= windowHeight * 0.8) {
                el.classList.add('visible');
            }
        });
    }
    function updateScrollProgress() {
        const scrollProgress = document.querySelector('.progress-bar');
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / scrollableHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('load', checkScroll);
});

//optimisation

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));