const profileButton = document.getElementById('profileButton');
const profileMenu = document.getElementById('profileMenu');

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('home.html')) {
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
        
        // Loader Animation
        setTimeout(function() {
          const loader = document.getElementById('loader');
          const mainContent = document.getElementById('main-content');
          
          // Fade out loader
          loader.style.opacity = '0';
          
          // Show main content
          mainContent.style.opacity = '1';
          
          // Remove loader after animation completes
          setTimeout(function() {
            loader.style.display = 'none';
            AOS.init();
          }, 800);
        }, 2000); // Minimum 2 seconds display time for loader

        // Display username if logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.username) {
            const profileButton = document.getElementById('profileButton');
            profileButton.textContent = `👤 ${currentUser.username}`;
        }

        // Custom cursor
        const cursor = document.getElementById('custom-cursor');
        document.addEventListener('mousemove', e => {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top  = e.clientY + 'px';
        });

        // Projects data
        const projects = [
          { title:"Porsche 971",    location:"Beijing", image:"../images/car-yellow.jpg" },
          { title:"Cayenne", location:"Shanghai", image:"../images/car-black.jpg" },
          { title:"Manaco Model Y",      location:"Shenzhen", image:"../images/car-white.jpg" },
          { title:"911 Carrera",      location:"Guangzhou", image:"../images/car-red.jpg" },
          { title:"Porsche Panamera",            location:"Chengdu", image:"../images/car-green.jpg" },
          { title:"Taycan Porsche",             location:"Hangzhou", image:"../images/car-blue.jpg" }
        ];

        // Elements
        const circleGallery   = document.getElementById('circle-gallery');
        const featuredImage   = document.getElementById('featured-image');
        const projectTitle    = document.querySelector('.project-title');
        const projectLocation = document.querySelector('.project-location');
        const projectCategory = document.getElementById('project-category');

        // 3D circle setup
        const numImages = 20, radius = 400;
        let rotationOffset = 3;

        function positionItems() {
          const centerX = 450;
          const centerY = 450;
          circleGallery.querySelectorAll('.gallery-item').forEach((item, i) => {
            const angle = (i/numImages)*2*Math.PI + rotationOffset;
            const x = centerX + radius*Math.cos(angle);
            const y = centerY + radius*Math.sin(angle);
            item.style.left = (x - 60) + 'px';
            item.style.top  = (y - 40) + 'px';
            const inclineX = -80 + Math.sin(angle)*15;
            const inclineY = Math.cos(angle)*15;
            const inclineZ = Math.sin(angle*2)*10;
            const rotZ     = (angle*180/Math.PI) + 90;
            const tz       = 30 + Math.sin(angle*3)*20;
            item.style.transform =
              `rotate(${rotZ}deg)
               rotateX(${inclineX}deg)
               rotateY(${inclineY}deg)
               rotateZ(${inclineZ}deg)
               translateZ(${tz}px)`;
          });
          circleGallery.style.transform = 
            `rotateX(60deg) rotateZ(${rotationOffset*180/Math.PI}deg)`;
        }

        // Build gallery items
        for (let i = 0; i < numImages; i++) {
          const idx  = i % projects.length;
          const proj = projects[idx];
          const item = document.createElement('div');
          item.className = 'gallery-item';
          item.dataset.index    = i;
          item.dataset.title    = proj.title;
          item.dataset.location = proj.location;
          item.dataset.image    = proj.image;

          const img = document.createElement('img');
          img.src = proj.image;
          img.alt = proj.title;
          item.appendChild(img);

          item.addEventListener('mouseenter', function() {
            // Remove default-logo class so shadow returns
            featuredImage.classList.remove('default-logo');
            projectTitle.textContent    = this.dataset.title;
            projectLocation.textContent = ''; // Do not show location
            projectCategory.textContent = '';
            featuredImage.src           = this.dataset.image;
            highlight(this.dataset.index);
          });

          circleGallery.appendChild(item);
        }

        function highlight(selected) {
          circleGallery.querySelectorAll('.gallery-item').forEach((itm, j) => {
            itm.style.opacity = (j==selected? '1':'0.3');
            itm.style.zIndex  = (j==selected? '10':'1');
            if (j==selected) {
              itm.style.transform = 
                itm.style.transform.replace(/translateZ\([^)]+\)/, 'translateZ(70px)');
            }
          });
        }

        // When pointer leaves, reset to default logo (no shadow)
        circleGallery.addEventListener('mouseleave', function() {
          projectTitle.textContent = ''; // Keep title empty when not hovering
          projectLocation.textContent = ''; // Do not show location
          projectCategory.textContent = ''; // Clear category
          featuredImage.src = '../images/logo1.png';
          featuredImage.classList.add('default-logo');
          circleGallery.querySelectorAll('.gallery-item').forEach(itm => {
            itm.style.opacity = '1';
            itm.style.zIndex = '1';
          });
        });

        // Start with default logo state
        featuredImage.classList.add('default-logo');

        // Rotation loop (unchanged)
        let lastX=0, lastY=0, moving=false;
        const rect = document.getElementById('gallery-container')
          .getBoundingClientRect();
        const cx = rect.left + rect.width/2;
        const cy = rect.top  + rect.height/2;
        document.addEventListener('mousemove', e => {
          moving = true; lastX = e.clientX; lastY = e.clientY;
        });
        (function animate() {
          if (moving) {
            const dx = lastX - cx, dy = lastY - cy;
            rotationOffset += Math.atan2(dy,dx)*0.0005;
            positionItems();
          }
          requestAnimationFrame(animate);
        })();
        
        // Video Player Setup
        const video = document.getElementById('promoVideo');
        const videoBtn = document.getElementById('videoToggle');
        
        if (video && videoBtn) {
          // Make sure video plays
          video.play().catch(error => {
            console.log("Video playback prevented by browser:", error);
            videoBtn.textContent = 'Play Video';
          });
          
          videoBtn.addEventListener('click', () => {
            if (video.paused) {
              video.play();
              videoBtn.textContent = 'Pause Video';
            } else {
              video.pause();
              videoBtn.textContent = 'Play Video';
            }
          });
        }
        
        // Add smooth fade-in for page load
        document.body.classList.add('loaded');
        
        // Profile menu
        if (profileButton && profileMenu) {
          profileButton.addEventListener('click', toggleProfileMenu);
          
          // Close profile menu when clicking outside
          document.addEventListener('click', function(e) {
            if (!profileButton.contains(e.target) && !profileMenu.contains(e.target)) {
              profileMenu.style.display = 'none';
            }
          });
          
          // Menu links
          const manageListings = document.getElementById('manageListings');
          if (manageListings) {
            manageListings.addEventListener('click', function(e) {
              e.preventDefault();
              if (typeof filteredCars !== 'undefined' && typeof allCars !== 'undefined' && typeof currentUser !== 'undefined') {
                filteredCars = allCars.filter(car => car.ownerEmail === currentUser.email);
                renderCars();
              }
              profileMenu.style.display = 'none';
            });
          }
          
          const favoritesLink = document.getElementById('favoritesLink');
          if (favoritesLink) {
            favoritesLink.addEventListener('click', function(e) {
              e.preventDefault();
              if (typeof filteredCars !== 'undefined' && typeof allCars !== 'undefined' && typeof favorites !== 'undefined') {
                filteredCars = allCars.filter(car => favorites.includes(car.id));
                renderCars();
              }
              profileMenu.style.display = 'none';
            });
          }
          
          const logoutLink = document.getElementById('logoutLink');
          if (logoutLink) {
            logoutLink.addEventListener('click', function(e) {
              e.preventDefault();
              // In a real app, this would log the user out
              if (typeof showAlert !== 'undefined') {
                showAlert('Logout functionality would be implemented in a real app', 'info');
              }
              profileMenu.style.display = 'none';
            });
          }
        }
        
        // Car color change function
        const carImage = document.getElementById('carImage');
        if (carImage) {
          window.changeCarColor = function(color) {
            carImage.src = `../images/car-${color}.jpg`;
          };
        }
        
        // Scroll Animation
        function reveal() {
          const reveals = document.querySelectorAll('.reveal');
          
          for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const revealTop = reveals[i].getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
              reveals[i].classList.add('active');
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
        
        if (testimonialSlide && testimonials.length > 0 && prevBtn && nextBtn) {
          let currentIndex = 0;
          
          // Set initial position
          function updateSlider() {
            testimonialSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
          }
          
          // Previous button click
          prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
            updateSlider();
          });
          
          // Next button click
          nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
          });
          
          // Auto slide every 5 seconds
          let slideInterval = setInterval(() => {
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
              const navLinks = document.querySelector('.nav-links');
              if (navLinks) {
                navLinks.classList.remove('active');
              }
              
              // Smooth scroll to target
              window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
              });
            }
          });
        });
    }
});

// Helper function for profile menu
function toggleProfileMenu() {
  if (profileMenu) {
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
  }
}