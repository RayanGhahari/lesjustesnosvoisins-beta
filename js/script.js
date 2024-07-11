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
        if (window.scrollY > 0) {
            header.classList.remove("transparent");
            header.classList.add("scrolled");
            navLinks.forEach(function(link) {
                link.classList.remove("top");
            });
        } else {
            header.classList.add("transparent");
            header.classList.remove("scrolled");
            
            if (window.location.pathname !== "/les_justes.html") {
                navLinks.forEach(function(link) {
                    link.classList.add("top");
                });
            }
        }
    }

    window.addEventListener("scroll", handleScroll);

    // Vérification initiale au chargement de la page
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