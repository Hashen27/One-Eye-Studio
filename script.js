 // Mobile Navigation Toggle
 const mobileNavToggle = document.getElementById('mobile-nav-toggle');
 const navMenu = document.getElementById('nav-menu');
 
 mobileNavToggle.addEventListener('click', () => {
     navMenu.classList.toggle('show');
     mobileNavToggle.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
 });

 // Smooth Scrolling for Navigation Links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         
         if (navMenu.classList.contains('show')) {
             navMenu.classList.remove('show');
             mobileNavToggle.textContent = '☰';
         }
         
         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });

 // Header Scroll Effect
 const header = document.getElementById('header');
 
 window.addEventListener('scroll', () => {
     if (window.scrollY > 100) {
         header.classList.add('scrolled');
     } else {
         header.classList.remove('scrolled');
     }
 });

 // Gallery Filter
 const filterButtons = document.querySelectorAll('.filter-btn');
 const galleryItems = document.querySelectorAll('.gallery-item');
 
 filterButtons.forEach(button => {
     button.addEventListener('click', () => {
         // Remove active class from all buttons
         filterButtons.forEach(btn => btn.classList.remove('active'));
         
         // Add active class to clicked button
         button.classList.add('active');
         
         const filterValue = button.getAttribute('data-filter');
         
         galleryItems.forEach(item => {
             if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                 item.style.display = 'block';
             } else {
                 item.style.display = 'none';
             }
         });
     });
 });

 // Lightbox Functionality
 const lightbox = document.getElementById('lightbox');
 const lightboxImg = document.getElementById('lightbox-img');
 const lightboxClose = document.getElementById('lightbox-close');
 const lightboxPrev = document.getElementById('lightbox-prev');
 const lightboxNext = document.getElementById('lightbox-next');
 let currentImageIndex = 0;
 let visibleItems = [];

 // Open lightbox when clicking on gallery item
 galleryItems.forEach((item, index) => {
     item.addEventListener('click', () => {
         // Get currently visible items based on filter
         visibleItems = Array.from(galleryItems).filter(
             item => item.style.display !== 'none'
         );
         
         // Find index of clicked item in visible items array
         currentImageIndex = visibleItems.indexOf(item);
         
         // Set lightbox image source
         const imgSrc = item.querySelector('img').src;
         lightboxImg.src = imgSrc;
         lightboxImg.alt = item.querySelector('img').alt;
         
         // Show lightbox
         lightbox.style.display = 'flex';
         document.body.style.overflow = 'hidden';
     });
 });

 // Close lightbox
 lightboxClose.addEventListener('click', () => {
     lightbox.style.display = 'none';
     document.body.style.overflow = 'auto';
 });

 lightbox.addEventListener('click', (e) => {
     if (e.target === lightbox) {
         lightbox.style.display = 'none';
         document.body.style.overflow = 'auto';
     }
 });

 // Previous image
 lightboxPrev.addEventListener('click', (e) => {
     e.stopPropagation();
     currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
     const prevImg = visibleItems[currentImageIndex].querySelector('img');
     lightboxImg.src = prevImg.src;
     lightboxImg.alt = prevImg.alt;
 });

 // Next image
 lightboxNext.addEventListener('click', (e) => {
     e.stopPropagation();
     currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
     const nextImg = visibleItems[currentImageIndex].querySelector('img');
     lightboxImg.src = nextImg.src;
     lightboxImg.alt = nextImg.alt;
 });

 // Keyboard navigation for lightbox
 document.addEventListener('keydown', (e) => {
     if (lightbox.style.display === 'flex') {
         if (e.key === 'Escape') {
             lightbox.style.display = 'none';
             document.body.style.overflow = 'auto';
         } else if (e.key === 'ArrowLeft') {
             lightboxPrev.click();
         } else if (e.key === 'ArrowRight') {
             lightboxNext.click();
         }
     }
 });

 // Form submission
 const contactForm = document.getElementById('contact-form');
 
 contactForm.addEventListener('submit', (e) => {
     e.preventDefault();
     
     // Get form data
     const formData = new FormData(contactForm);
     const formObject = Object.fromEntries(formData);
     
     // Here you would typically send the form data to a server
     // For demo purposes, we'll just log it to the console and show an alert
     console.log('Form submitted:', formObject);
     
     // Reset form
     contactForm.reset();
     
     // Show success message
     alert('Thank you for your message! I will get back to you soon.');
 });

 // Animation for elements on scroll
 const animateOnScroll = () => {
     const elements = document.querySelectorAll('.about, .gallery-title, .services-title, .contact-title, .service-card');
     
     elements.forEach(element => {
         const elementPosition = element.getBoundingClientRect().top;
         const screenPosition = window.innerHeight / 1.3;
         
         if (elementPosition < screenPosition) {
             element.style.opacity = '1';
             element.style.transform = 'translateY(0)';
         }
     });
 };

 // Set initial styles for animation
 document.querySelectorAll('.about, .gallery-title, .services-title, .contact-title, .service-card').forEach(element => {
     element.style.opacity = '0';
     element.style.transform = 'translateY(50px)';
     element.style.transition = 'all 0.8s ease';
 });

 // Run animation on scroll
 window.addEventListener('scroll', animateOnScroll);
 
 // Run once on page load
 window.addEventListener('load', animateOnScroll);


 document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.querySelector('.back-to-top a');

    // Smooth scroll + toggle visibility
    window.addEventListener('scroll', () => {
        const visible = window.scrollY > 500;
        backToTopBtn.style.opacity = visible ? '1' : '0';
        backToTopBtn.style.visibility = visible ? 'visible' : 'hidden';
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (/^\S+@\S+\.\S+$/.test(email)) {
                console.log('Subscribed email:', email);
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }

    function showNotification(message, type = 'info') {
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
            Object.assign(container.style, {
                position: 'fixed', top: '20px', right: '20px', zIndex: '9999'
            });
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content"><p>${message}</p></div>
            <button class="notification-close">&times;</button>
        `;

        Object.assign(notification.style, {
            backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
            color: 'white', padding: '12px 24px', marginBottom: '10px',
            borderRadius: '4px', display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', minWidth: '300px', opacity: '0',
            transform: 'translateX(50px)', transition: 'all 0.3s ease'
        });

        const closeBtn = notification.querySelector('.notification-close');
        Object.assign(closeBtn.style, {
            background: 'none', border: 'none', color: 'white',
            fontSize: '20px', cursor: 'pointer', marginLeft: '10px'
        });

        container.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        const timeout = setTimeout(() => removeNotification(notification), 5000);
        closeBtn.addEventListener('click', () => {
            clearTimeout(timeout);
            removeNotification(notification);
        });

        function removeNotification(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateX(50px)';
            setTimeout(() => el.remove(), 300);
            if (!container.hasChildNodes()) container.remove();
        }
    }

    // Intersection animations
    if ('IntersectionObserver' in window) {
        const elements = document.querySelectorAll('.footer-brand, .footer-links, .footer-services, .footer-contact');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(el => observer.observe(el));
    }
});
