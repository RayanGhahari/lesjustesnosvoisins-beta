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
    let lastScrollPosition = window.scrollY;

// Fonction principale de gestion du défilement
function handleScroll() {
    const currentScrollPosition = window.scrollY;
    const isScrollingDown = currentScrollPosition > lastScrollPosition;
    const isAtTop = currentScrollPosition === 0;
    const currentPath = window.location.pathname;

    // Gestion de l'en-tête
    header.classList.toggle('scrolled', !isAtTop);
    header.classList.toggle('transparent', isAtTop);

    // Gestion des liens de navigation
    const isExceptionPage = currentPath.includes('les_justes') || currentPath.includes('les_vies_sauvees');
    
    navLinks.forEach(link => {
        if (isAtTop && !isExceptionPage) {
            link.classList.add('top');
        } else {
            link.classList.remove('top');
        }
    });

    lastScrollPosition = currentScrollPosition;
}

// Optimisation des performances avec requestAnimationFrame
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
    }
    ticking = true;
}

// Écouteurs d'événements
window.addEventListener('scroll', requestTick, { passive: true });
window.addEventListener('resize', requestTick, { passive: true });
document.addEventListener('DOMContentLoaded', handleScroll);

// Gestion du chargement initial et des changements de page
function init() {
    handleScroll();
    // Réinitialiser l'état au changement de page (pour les applications SPA)
    if ('onpopstate' in window) {
        window.addEventListener('popstate', handleScroll);
    }
}

// Appel de la fonction d'initialisation
init();

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