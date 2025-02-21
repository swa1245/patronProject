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
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Toggle menu icon
            const menuIcon = mobileMenu.querySelector('i');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                const menuIcon = mobileMenu.querySelector('i');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                }
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                const menuIcon = mobileMenu.querySelector('i');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                }
            });
        });
    }
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
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            productCards.forEach(card => {
                // Get the category of the card
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else if (cardCategory === filterValue) {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Trigger 'all' filter on page load
    const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilter) {
        allFilter.click();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
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
