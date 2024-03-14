document.addEventListener("DOMContentLoaded", function () {
    const hamburgerIcon = document.querySelector(".hamburger-icon");
    const navLinks = document.querySelector(".nav-links");

    hamburgerIcon.addEventListener("click", function () {
        // Toggle the 'active' class on the .nav-links
        navLinks.classList.toggle("active");
    });
});
