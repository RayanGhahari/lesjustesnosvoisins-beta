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
        
        const exceptionPages = [
            'les_Justes',
            'les_vies_sauvees',
            'ils_ont_agi_mais',
            'histoire_et_travail_de_memoire',
            "plus_d'info",
            "plus-d'info/sources",
            "plus-d'info/qui-sommes-nous",
            'accueil',
            "donnees",
            "les-Justes/famille-emmanuelli",
            "les-vies-sauvees/temoignage-de-maurice-dreksler",
            'ils-ont-agi-mais'
        ]; 
        
        const ExceptionPage = exceptionPages.some(page => Position.includes(page));
        const BlancPage = Position.includes("plus-d'info/pour-aller-plus-loin.html");
    
        header.classList.toggle('transparent', Top);
        header.classList.toggle('scrolled', !Top || BlancPage);
    
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

    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('imageAgrandie');
    const span = document.getElementsByClassName('fermer')[0];
    const highlight = document.querySelector('.highlight');

    document.querySelectorAll('.image-clickable').forEach(function (img) {
        img.onclick = function () {
            modal.style.display = 'flex';
            modalImg.src = this.src;

            highlight.style.display = 'block';
            highlight.style.left = '367px';
            highlight.style.top = '107px';
            highlight.style.width = '135px';  
            highlight.style.height = '25px';
        };
    });
    
    document.querySelectorAll('.image-clickable-bis').forEach(function (img) {
        img.onclick = function () {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            highlight.style.display = 'block';
            highlight.style.left = '260px';
            highlight.style.top = '112px';
            highlight.style.width = '128px';  
            highlight.style.height = '25px';
        };
    });
    span.onclick = function () {
        modal.style.display = 'none';
        highlight.style.display = 'none';
    };

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            highlight.style.display = 'none';
        }
    });
});


//Zoom classique


document.addEventListener("DOMContentLoaded", function() {
    // Sélectionne toutes les images cliquables
    var images = document.querySelectorAll(".clickable-img img");
    const modale = document.getElementById("modale-image");
    const modaleImg = document.getElementById("imageAgrandie");
    const span = document.querySelector(".fermer-modale-image");

    images.forEach(function(img) {
        img.onclick = function() {
            modale.classList.add("active");
            modaleImg.src = this.src;
        }
    });
    span.onclick = function() {
        modale.classList.remove("active");
    }
    modale.onclick = function(event) {
        if (event.target == modale) {
            modale.classList.remove("active");
        }
    }
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

// carte intéractive


document.addEventListener("DOMContentLoaded", function() {



    const conteneursMarqueurs = document.querySelectorAll(".marker-container");
    const conteneurCarte = document.querySelector(".carte-outer-container");
    const imageCarte = document.querySelector(".carte-img");
    
    const largeurEcranPetit = 800;
    let timeoutId;

    function estPetitEcran() {
        return window.innerWidth < largeurEcranPetit;
    }

    function afficherInfoBulle(elementInfo, rect, rectConteneur, famille) {
        let positionGauche, positionHaut;

        if (famille === 'emmanuelli') {
            positionGauche = rect.right - rectConteneur.left;
            positionHaut = rect.top - rectConteneur.top;
        } else {
            positionGauche = rect.left - rectConteneur.left;
            positionHaut = rect.bottom - rectConteneur.top;
        }

        if (positionGauche + 300 > rectConteneur.width) {
            positionGauche = rect.left - rectConteneur.left - 300;
        }

        elementInfo.style.left = `${positionGauche}px`;
        elementInfo.style.top = `${positionHaut}px`;
        elementInfo.classList.add('visible');
    }

    function cacherInfoBulle(elementInfo) {
        elementInfo.classList.remove('visible');
    }

    function agrandirCarte() {
        imageCarte.style.transform = "scale(1.02)";
        imageCarte.style.filter = "brightness(0.9)";
    }

    function reinitialiserCarte() {
        imageCarte.style.transform = "scale(1)";
        imageCarte.style.filter = "brightness(1)";
    }

    function gererSurvolMarqueur(conteneur) {
        conteneur.addEventListener("mouseenter", function() {
            if (estPetitEcran()) return;
            
            const famille = this.dataset.family;
            const elementInfo = document.getElementById(`info-${famille}`);
            const rect = this.getBoundingClientRect();
            const rectConteneur = conteneurCarte.getBoundingClientRect();

        // Fermer tous les autres divs
        document.querySelectorAll('.famille-info.visible').forEach(div => {
            if (div !== elementInfo) {
                cacherInfoBulle(div);
            }
        });
            
            clearTimeout(timeoutId);
            afficherInfoBulle(elementInfo, rect, rectConteneur, famille);
            agrandirCarte();

            // Ajouter des écouteurs d'événements à l'info-bulle
            elementInfo.addEventListener("mouseenter", function() {
                clearTimeout(timeoutId);
                this.style.transform = 'scale(1.05)';
            });

            elementInfo.addEventListener("mouseleave", function() {
                this.style.transform = 'scale(1)';
                timeoutId = setTimeout(() => {
                    cacherInfoBulle(elementInfo);
                    reinitialiserCarte();
                }, 100);
            });
        });

        conteneur.addEventListener("mouseleave", function() {
            if (estPetitEcran()) return;
            
            const famille = this.dataset.family;
            const elementInfo = document.getElementById(`info-${famille}`);
            
            timeoutId = setTimeout(() => {
                cacherInfoBulle(elementInfo);
                reinitialiserCarte();
            }, 100);
        });
    }

    function gererClicMarqueur(conteneur) {
        conteneur.addEventListener("click", function(e) {
            const famille = this.dataset.family;
            const elementInfo = document.getElementById(`info-${famille}`);
            
            if (estPetitEcran()) {
                e.preventDefault();
                const elementsInfoVisibles = document.querySelectorAll('.famille-info.visible');
                elementsInfoVisibles.forEach(cacherInfoBulle);
                afficherInfoBulleMobile(elementInfo);
            } else {
                window.location.href = `les-Justes/famille-${famille}.html`;
            }
        });
    }

    function afficherInfoBulleMobile(elementInfo) {
        elementInfo.classList.add('visible');
        elementInfo.style.left = '50%';
        elementInfo.style.top = '50%';
        elementInfo.style.transform = 'translate(-50%, -50%)';
        
        ajouterBoutonFermer(elementInfo);
        gererBoutonDecouvrirMobile(elementInfo);
    }

    function ajouterBoutonFermer(elementInfo) {
        let boutonFermer = elementInfo.querySelector('button');
        if (!boutonFermer) {
            boutonFermer = document.createElement('button');
            boutonFermer.textContent = 'X';
            boutonFermer.style.position = 'absolute';
            boutonFermer.style.top = '10px';
            boutonFermer.style.right = '10px';
            boutonFermer.addEventListener('click', function() {
                cacherInfoBulle(elementInfo);
            });
            elementInfo.appendChild(boutonFermer);
        }
    }

    function gererBoutonDecouvrirMobile(elementInfo) {
        const boutonDecouvrir = elementInfo.querySelector('.btn-decouvrir');
        if (boutonDecouvrir) {
            boutonDecouvrir.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        }
    }

    conteneursMarqueurs.forEach(conteneur => {
        gererSurvolMarqueur(conteneur);
        gererClicMarqueur(conteneur);
    });

    conteneurCarte.addEventListener("mouseleave", function() {
        if (estPetitEcran()) return;
        
        timeoutId = setTimeout(() => {
            const elementsInfo = document.querySelectorAll('.famille-info');
            elementsInfo.forEach(cacherInfoBulle);
            reinitialiserCarte();
        }, 100);
    });

});

// Fonction pour charger le script de smooth scroll
function loadLenisScript(callback) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@latest/bundled/lenis.js';
    script.onload = callback;
    document.head.appendChild(script);
}

// Fonction pour initialiser Lenis
function initLenis() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Mise à jour de Lenis lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        lenis.resize();
    });
}

// Chargement et initialisation de Lenis
loadLenisScript(() => {
    console.log('Lenis script loaded');
    initLenis();
});