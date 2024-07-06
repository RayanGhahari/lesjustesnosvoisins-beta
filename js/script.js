document.addEventListener("DOMContentLoaded", function() {
    
    var path = window.location.pathname;
    var page = path.split("/").pop(); 

    
    var navLinks = document.querySelectorAll("nav a");
    for (var i = 0; i < navLinks.length; i++) {
        var href = navLinks[i].getAttribute("href");
        if (page === href|| (page === "" && href === "index.html")) {
            navLinks[i].classList.add("active");
            break;
        }
    }
});