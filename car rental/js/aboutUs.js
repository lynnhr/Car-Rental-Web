// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlayDim');
const openBtn = document.getElementById('openSidebar');
const closeBtn = document.getElementById('closeSidebar');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
}
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
}

openBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

menuToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
});

// Make sure main content is visible immediately on aboutUs page
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.opacity = '1';
    }
    document.body.classList.add('loaded');
});

// Scroll Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
            console.log(`Element revealed: ${reveals[i].className}`); // Debug log
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Testimonial Slider
const testimonialSlide = document.getElementById('testimonialSlide');
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

// Set initial position
function updateSlider() {
    if (testimonialSlide) {
        testimonialSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
}

// Previous button click
prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
    updateSlider();
});

// Next button click
nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
    updateSlider();
});

// Auto slide every 5 seconds
let slideInterval;
if (testimonialSlide) {
    slideInterval = setInterval(() => {
        currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }, 5000);

    // Pause auto slide on hover
    testimonialSlide.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Resume auto slide when not hovering
    testimonialSlide.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }, 5000);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            navLinks?.classList.remove('active');
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Basic validation
        let isValid = true;
        for (const input of this.querySelectorAll('[required]')) {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        }
        
        if (isValid) {
            // Normally would send data to server
            console.log('Contact form submitted:', formValues);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            successMessage.style.color = 'green';
            successMessage.style.marginTop = '1rem';
            successMessage.style.textAlign = 'center';
            
            this.appendChild(successMessage);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                successMessage.remove();
            }, 3000);
        }
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Basic validation
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim()) {
            // Normally would send data to server
            console.log('Newsletter form submitted:', formValues);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for subscribing to our newsletter!';
            successMessage.style.color = 'green';
            successMessage.style.marginTop = '1rem';
            successMessage.style.textAlign = 'center';
            
            this.appendChild(successMessage);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                successMessage.remove();
            }, 3000);
        }
    });
}

// Add dynamic year to copyright
const copyrightYear = document.querySelector('.copyright p');
if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.textContent = copyrightYear.textContent.replace('2025', currentYear);
}

// Updated functionality to display the username on the right beside the button
function displayUsername(username) {
    const profileButton = document.querySelector('.profile');
    if (!profileButton) return;
    
    profileButton.style.display = 'inline-flex'; // Set profile button to inline-flex to align with username
    profileButton.style.alignItems = 'center'; // Align items vertically

    const usernameDisplay = document.createElement('span');
    usernameDisplay.className = 'username-display';
    usernameDisplay.textContent = username;
    usernameDisplay.style.marginLeft = '10px'; // Add spacing between button and username
    usernameDisplay.style.color = 'red'; // Set the color of the username to red
    usernameDisplay.style.display = 'inline'; // Ensure it appears inline
    profileButton.parentNode.insertBefore(usernameDisplay, profileButton.nextSibling);
}

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the current user from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // If a user is logged in, display their username
    if (currentUser && currentUser.username) {
        const profileButton = document.querySelector('.profile');
        if (!profileButton) return;
        
        profileButton.style.display = 'inline-flex'; // Set profile button to inline-flex to align with username
        profileButton.style.alignItems = 'center'; // Align items vertically

        const usernameDisplay = document.createElement('span');
        usernameDisplay.className = 'username-display';
        usernameDisplay.textContent = currentUser.username;
        usernameDisplay.style.marginLeft = '10px'; // Add spacing between button and username
        usernameDisplay.style.color = 'red'; // Set the color of the username to red
        usernameDisplay.style.display = 'inline'; // Ensure it appears inline
        profileButton.parentNode.insertBefore(usernameDisplay, profileButton.nextSibling);
    }
});