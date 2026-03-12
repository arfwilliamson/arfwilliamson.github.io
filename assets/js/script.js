let lastScrollTop = 0;
const navbar = document.querySelector('.nav-bottom');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Guard against "bounce" scrolling (common on mobile)
    if (scrollTop <= 0) {
        navbar.classList.remove('nav-hidden');
        return;
    }

    if (scrollTop > lastScrollTop) {
        navbar.classList.add('nav-hidden'); // Scrolling down
    } else {
        navbar.classList.remove('nav-hidden'); // Scrolling up
    }
    lastScrollTop = scrollTop;
}, false);
