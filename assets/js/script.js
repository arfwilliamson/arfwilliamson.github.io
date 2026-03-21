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

function openLightbox(imgElement) {
	const lb = document.getElementById('lightbox');
	const lbImg = document.getElementById('lightbox-img');
	const lbCap = document.getElementById('lightbox-caption');
	lbImg.src = imgElement.src;
	lbCap.textContent = imgElement.alt || "";
	lb.style.display = 'flex';
	// Prevent scrolling background while open
	document.body.style.overflow = 'hidden';
}

function closeLightbox() {
	document.getElementById('lightbox').style.display = 'none';
	document.body.style.overflow = 'auto';
}

// Close on 'Escape' key
document.addEventListener('keydown', (e) => {
	if (e.key === "Escape") closeLightbox();
});
