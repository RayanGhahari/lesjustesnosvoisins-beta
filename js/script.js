document.addEventListener("DOMContentLoaded", function() {
    // Gestion de la classe 'active' pour les liens de navigation
    var path = window.location.pathname;
    var page = path.split("/").pop(); 
    
    var navLinks = document.querySelectorAll("nav a");
    for (var i = 0; i < navLinks.length; i++) {
        var href = navLinks[i].getAttribute("href");
        if (page === href || (page === "" && href === "index.html")) {
            navLinks[i].classList.add("active");
            break;
        }
    }

    // Gestion de la transparence du header lors du scroll
    var header = document.querySelector("header");


    header.classList.add("transparent");
    // Gestion de la couleur des liens en haut de la page
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.add("top");
    }

    window.addEventListener("scroll", function() {
        if (window.scrollY > 0) {
            header.classList.remove("transparent");
            for (var i = 0; i < navLinks.length; i++) {
                navLinks[i].classList.remove("top");
            }
        } else {
            header.classList.add("transparent");
            for (var i = 0; i < navLinks.length; i++) {
                navLinks[i].classList.add("top");
            }
        }
    });
});