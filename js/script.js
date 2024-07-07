document.addEventListener("DOMContentLoaded", function() {
    // Gestion des différentes classes utilisées
    var header = document.querySelector("header");
    var navLinks = document.querySelectorAll("nav a");
    var hamburger = document.querySelector('.hamburger-menu');
    var nav = document.querySelector('nav');

    // Gestion de la classe 'active' pour les liens de navigation
    var path = window.location.pathname;
    var page = path.split("/").pop(); 
    
    navLinks.forEach(function(link) {
        var href = link.getAttribute("href");
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
        var isClickInside = nav.contains(event.target) || hamburger.contains(event.target);
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
            navLinks.forEach(function(link) {
                link.classList.add("top");
            });
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
});