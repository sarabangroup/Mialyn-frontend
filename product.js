// Function to open the sidebar
function openSidebar() {
    document.getElementById("mySidebar").style.width = "250px";
    document.querySelector(".content").style.marginLeft = "250px";
}

function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
    document.querySelector(".content").style.marginLeft = "0";
}

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = [];

// Create dots for each slide
const dotsContainer = document.createElement('div');
dotsContainer.classList.add('slider-dots');
document.querySelector('.slider-container').appendChild(dotsContainer);

slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
    dots.push(dot);
});

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    const slideWidth = slides[currentSlide].offsetWidth;
    document.querySelector('.slides').style.transform = `translateX(-${currentSlide * slideWidth}px)`; // Use backticks here

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Auto-play the slides every 5 seconds
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Initialize the first slide
showSlide(currentSlide);
