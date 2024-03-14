document.addEventListener("DOMContentLoaded", function () {
    const hamburgerIcon = document.querySelector(".hamburger-icon");
    const navLinks = document.querySelector(".nav-links");

    hamburgerIcon.addEventListener("click", function () {
        navLinks.classList.toggle("active"); // Toggle the 'active' class on click
    });
});
