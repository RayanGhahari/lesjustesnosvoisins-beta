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

})


//Zoom 

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('imageAgrandie');
    const span = document.querySelector('.fermer');
    const highlight = document.querySelector('.highlight');

    // Vérifie si les éléments nécessaires existent avant d'ajouter les "écouteurs"
    if (modal && modalImg && highlight) {
        const setupImageClick = (selector, highlightConfig) => {
            document.querySelectorAll(selector).forEach(function(img) {
                img.addEventListener('click', function() {
                    modal.style.display = 'flex';
                    modalImg.src = this.src;
                    
                    highlight.style.display = 'block';
                    Object.assign(highlight.style, highlightConfig);
                });
            });
        };

        // Configuration pour les images clickables normales
        setupImageClick('.image-clickable', {
            left: '367px',
            top: '107px',
            width: '135px',
            height: '25px'
        });

        // Configuration pour les images clickables "bis"
        setupImageClick('.image-clickable-bis', {
            left: '260px',
            top: '112px',
            width: '128px',
            height: '25px'
        });

        // Gestion de la fermeture de la modale
        if (span) {
            span.addEventListener('click', function() {
                modal.style.display = 'none';
                highlight.style.display = 'none';
            });
        }

        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                highlight.style.display = 'none';
            }
        });
    }

    // Code pour la deuxième modale (Générale)
    const modale = document.getElementById("modale-image");
    const modaleImg = document.getElementById("imageAgrandie");
    const spanFermer = document.querySelector(".fermer-modale-image");
    
    if (modale && modaleImg) {
        document.querySelectorAll(".clickable-img img").forEach(function(img) {
            img.addEventListener('click', function() {
                modale.classList.add("active");
                modaleImg.src = this.src;
            });
        });

        if (spanFermer) {
            spanFermer.addEventListener('click', function() {
                modale.classList.remove("active");
            });
        }

        modale.addEventListener('click', function(event) {
            if (event.target === modale) {
                modale.classList.remove("active");
            }
        });
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
                if (!elementInfo.matches(':hover')) {
                    cacherInfoBulle(elementInfo);
                    reinitialiserCarte();
                }
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

    function gererClicDocument(event) {
        if (estPetitEcran()) {
            const elementsInfo = document.querySelectorAll('.famille-info.visible');
            elementsInfo.forEach(elementInfo => {
                if (!elementInfo.contains(event.target) && !event.target.closest('.marker-container')) {
                    cacherInfoBulle(elementInfo);
                    elementInfo.style.transform = 'scale(0)';
                }
            });
        }
    }
    
    document.addEventListener('click', gererClicDocument);

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
            elementsInfo.forEach(elementInfo => {
                if (!elementInfo.matches(':hover')) {
                    cacherInfoBulle(elementInfo);
                    elementInfo.style.transform = 'scale(1)'; // Réinitialiser l'échelle
                    reinitialiserCarte();
                }
            });
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