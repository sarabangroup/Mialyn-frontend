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

function changeSlide(direction) {
    const items = document.querySelectorAll('.testimonial-item');
    items[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + items.length) % items.length; // Wrap around
    items[currentSlide].classList.add('active');
}

// Automatically change slide every 5 seconds
setInterval(() => changeSlide(1), 5000);

document.getElementById('reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const star = document.querySelector('input[name="star"]:checked').value;
    const reviewText = document.getElementById('reviewText').value;

    try {
        const response = await fetch('http://16.171.149.128:5000/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ star, reviewText }),
        });

        const result = await response.json();
        if (result.success) {
            document.getElementById('responseMessage').innerText = "Review submitted successfully!";
            fetchReviews(); // Refresh reviews after submission
        } else {
            document.getElementById('responseMessage').innerText = "Review submitted successfully!";
        }
    } catch (error) {
        console.error("Error submitting review:", error);
        document.getElementById('responseMessage').innerText = "Error submitting review.";
    }
});

// Fetch reviews and display them in the slider
async function fetchReviews() {
    try {
        const response = await fetch('http://16.171.149.128:5000/api/reviews');
        const reviews = await response.json();
        const reviewsContainer = document.getElementById('reviewsContainer');

        reviewsContainer.innerHTML = ''; // Clear existing reviews

        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review-slide');
            reviewElement.innerHTML = `
                <div class="stars">${renderStars(review.star)}</div>
                <p>${review.reviewText}</p>
                <small>${new Date(review.createdAt).toLocaleDateString()}</small>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
    }
}

// Function to render stars in gold
function renderStars(starCount) {
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < starCount) {
            starsHtml += '<span class="gold-star">&#9733;</span>';
        } else {
            starsHtml += '<span class="grey-star">&#9733;</span>';
        }
    }
    return starsHtml;
}

// Initial fetching of reviews on page load
fetchReviews();

// Optional: Slide movement logic for review slider

function moveSlide(n) {
    const slides = document.getElementsByClassName('review-slide');
    if (slides.length === 0) return;

    currentSlide = (currentSlide + n + slides.length) % slides.length;
    Array.from(slides).forEach((slide, index) => {
        slide.style.display = index === currentSlide ? 'block' : 'none';
    });
}

// Show the first slide initially
setTimeout(() => moveSlide(0), 500); // Delay to wait for fetch to complete
