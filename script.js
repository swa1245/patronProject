// Initialize Swiper
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    effect: 'fade',
    speed: 1500,
    grabCursor: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Fade effect settings
    fadeEffect: {
        crossFade: true
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Work Slider
const workSlider = new Swiper('.work-slider', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: '.work-pagination',
        clickable: true,
        type: 'bullets',
    },
    navigation: {
        nextEl: '.work-next',
        prevEl: '.work-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 30
        }
    },
    on: {
        init: function() {
            updateSlideClasses(this);
        },
        slideChange: function() {
            updateSlideClasses(this);
        }
    }
});

// Function to update slide classes for animations
function updateSlideClasses(swiper) {
    const slides = swiper.slides;
    slides.forEach((slide, index) => {
        if (index === swiper.activeIndex) {
            slide.classList.add('active');
            animateSlideContent(slide, true);
        } else {
            slide.classList.remove('active');
            animateSlideContent(slide, false);
        }
    });
}

// Simple and clean content animation
function animateSlideContent(slide, isActive) {
    const elements = [
        slide.querySelector('.work-category'),
        slide.querySelector('h3'),
        slide.querySelector('p'),
        slide.querySelector('.work-link')
    ];

    elements.forEach((el, index) => {
        if (!el) return;
        
        if (isActive) {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 300 + (index * 150));
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        }
    });
}

// Simple image loading
document.querySelectorAll('.work-image').forEach(container => {
    const img = container.querySelector('img');
    if (img) {
        container.classList.add('loading');
        
        if (img.complete) {
            container.classList.remove('loading');
        } else {
            img.onload = () => container.classList.remove('loading');
        }
        
        img.onerror = () => {
            container.classList.remove('loading');
            container.classList.add('error');
        };
    }
});

// Product Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Reset animation
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = null;
                    // Add fade in animation
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Handle inquiry form submission
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your inquiry. We will get back to you soon!');
        this.reset();
    });
}

// Handle inquiry buttons
document.querySelectorAll('.inquiry-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const productName = btn.closest('.product-card').querySelector('h3').textContent;
        const inquirySection = document.querySelector('.inquiry-section');
        const messageField = document.getElementById('message');
        
        // Scroll to inquiry form
        inquirySection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill message with product name
        messageField.value = `I am interested in learning more about ${productName}. Please provide additional information.`;
    });
});
