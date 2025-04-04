// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Detect if user is on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Material You Theme Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // Dynamic theming based on Material You principles
    function applyTheme(isDark) {
        if (isDark) {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.body.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        
        // Add transition class to body for smooth theme changes
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 1000);
    }
    
    // Initial theme setup
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }
    
    // Mobile-optimized event listener based on device
    function addOptimizedEventListener(element, events, callback) {
        if (isMobile) {
            // For mobile devices
            events.touch.forEach(event => {
                element.addEventListener(event, callback);
            });
        } else {
            // For desktop devices
            events.mouse.forEach(event => {
                element.addEventListener(event, callback);
            });
        }
    }
    
    // Define event types
    const eventTypes = {
        click: {
            mouse: ['click'],
            touch: ['touchstart']
        },
        hover: {
            mouse: ['mouseenter', 'mouseleave'],
            touch: ['touchstart', 'touchend']
        }
    };
    
    // Toggle theme when button is clicked
    addOptimizedEventListener(themeToggle, eventTypes.click, function(event) {
        if (event.type === 'touchstart') {
            event.preventDefault(); // Prevent double-tap zoom on mobile
        }
        
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        applyTheme(!isDark);
        
        // Add ripple effect
        createRipple(event, this);
    });
    
    // Material You Ripple Effect
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        
        const size = Math.max(rect.width, rect.height);
        
        // Handle both mouse and touch events
        let clientX, clientY;
        if (event.type.startsWith('touch') && event.touches && event.touches[0]) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        
        const x = clientX - rect.left - size / 2;
        const y = clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');
        
        const existingRipple = element.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        element.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple effect to all buttons
    document.querySelectorAll('.btn, .download-btn, .cta-btn, .view-project').forEach(button => {
        addOptimizedEventListener(button, eventTypes.click, function(e) {
            if (e.type === 'touchstart') {
                e.preventDefault(); // Prevent double-tap zoom
            }
            createRipple(e, this);
        });
    });
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        addOptimizedEventListener(hamburger, eventTypes.click, function(e) {
            if (e.type === 'touchstart') {
                e.preventDefault(); // Prevent double-tap zoom
            }
            
            navLinks.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            if (navLinks.classList.contains('active')) {
                this.setAttribute('aria-expanded', 'true');
                document.body.classList.add('menu-open'); // Prevent scrolling when menu is open
            } else {
                this.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
            
            // Add ripple effect
            createRipple(e, this);
            
            // Prevent event propagation
            e.stopPropagation();
        });
    }
    
    // Add animation delay to nav links for staggered animation
    document.querySelectorAll('.nav-links li').forEach((link, index) => {
        link.style.setProperty('--i', index);
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (navLinks && navLinks.classList.contains('active')) {
                // Small delay to allow the click to register before closing menu
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    
                    if (hamburger) {
                        hamburger.setAttribute('aria-expanded', 'false');
                        
                        // Reset hamburger icon
                        const spans = hamburger.querySelectorAll('span');
                        spans.forEach(span => span.classList.remove('active'));
                    }
                    
                    document.body.classList.remove('menu-open');
                }, 100);
            }
        });
        
        // Enhanced touch handling for mobile menu items
        if (isMobile) {
            // Add touch feedback effect
            link.addEventListener('touchstart', function(e) {
                // Create visual feedback
                this.classList.add('touch-active');
                
                // Don't prevent default here to allow the normal touch behavior
            });
            
            link.addEventListener('touchend', function(e) {
                // Remove visual feedback
                this.classList.remove('touch-active');
                
                // Get the current href
                const href = this.getAttribute('href');
                
                // If menu is active, handle navigation manually
                if (navLinks && navLinks.classList.contains('active') && href) {
                    e.preventDefault();
                    
                    // Close the menu
                    navLinks.classList.remove('active');
                    if (hamburger) {
                        hamburger.setAttribute('aria-expanded', 'false');
                        const spans = hamburger.querySelectorAll('span');
                        spans.forEach(span => span.classList.remove('active'));
                    }
                    document.body.classList.remove('menu-open');
                    
                    // Navigate after a short delay
                    setTimeout(() => {
                        window.location.href = href;
                    }, 100);
                }
            });
            
            // Handle touchcancel
            link.addEventListener('touchcancel', function() {
                this.classList.remove('touch-active');
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active')) {
            // Check if click is outside the navigation
            if (!e.target.closest('#main-nav')) {
                navLinks.classList.remove('active');
                
                if (hamburger) {
                    hamburger.setAttribute('aria-expanded', 'false');
                    
                    // Reset hamburger icon
                    const spans = hamburger.querySelectorAll('span');
                    spans.forEach(span => span.classList.remove('active'));
                }
                
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Project Modal Functionality with Material You Animation
    const projectCards = document.querySelectorAll('.project-card');
    const viewButtons = document.querySelectorAll('.view-project');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Direct event listeners for view-project buttons
    viewButtons.forEach(button => {
        addOptimizedEventListener(button, eventTypes.click, function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (e.type === 'touchstart') {
                e.preventDefault(); // Prevent double-tap zoom
            }
            
            // Add visual feedback
            this.classList.add('active');
            
            // Get the project ID from the parent card
            const projectCard = this.closest('.project-card');
            const projectId = projectCard.getAttribute('data-project');
            const modal = document.getElementById(`${projectId}-modal`);
            
            // Show modal
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                
                // Add entrance animation to modal content
                const modalContent = modal.querySelector('.modal-content');
                modalContent.classList.add('modal-animate-in');
                
                setTimeout(() => {
                    modalContent.classList.remove('modal-animate-in');
                }, 500);
            }
            
            // Add ripple effect
            createRipple(e, this);
            
            // Remove active state after a delay
            setTimeout(() => {
                this.classList.remove('active');
            }, 300);
        });
    });
    
    // Open modal with Material You animation when project card is clicked (backup)
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if clicking on the card but not on the button directly
            // This serves as a fallback but lets the button handle its own clicks
            if (!e.target.classList.contains('view-project') && !e.target.closest('.view-project')) {
                const viewButton = this.querySelector('.view-project');
                if (viewButton) {
                    // Simulate a click on the view button
                    viewButton.click();
                }
            }
        });
    });
    
    // Close modal with Material You animation
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const modal = this.closest('.modal');
            const modalContent = modal.querySelector('.modal-content');
            
            // Add exit animation
            modalContent.classList.add('modal-animate-out');
            
            setTimeout(() => {
                modal.classList.remove('show');
                document.body.style.overflow = ''; // Re-enable scrolling
                modalContent.classList.remove('modal-animate-out');
            }, 300);
            
            // Add ripple effect to close button
            createRipple(e, this);
        });
    });
    
    // Close modal when clicking outside of modal content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                const modalContent = this.querySelector('.modal-content');
                
                // Add exit animation
                modalContent.classList.add('modal-animate-out');
                
                setTimeout(() => {
                    this.classList.remove('show');
                    document.body.style.overflow = ''; // Re-enable scrolling
                    modalContent.classList.remove('modal-animate-out');
                }, 300);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    const modalContent = modal.querySelector('.modal-content');
                    
                    // Add exit animation
                    modalContent.classList.add('modal-animate-out');
                    
                    setTimeout(() => {
                        modal.classList.remove('show');
                        document.body.style.overflow = ''; // Re-enable scrolling
                        modalContent.classList.remove('modal-animate-out');
                    }, 300);
                }
            });
        }
    });
    
    // Material You Parallax Effect for Hero Section
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function parallaxEffect() {
        // Skip parallax on mobile devices for better performance
        if (isMobile) return;
        
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            element.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
    
    // Only apply parallax on desktop devices
    if (window.innerWidth > 768 && parallaxElements.length > 0) {
        window.addEventListener('scroll', parallaxEffect);
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add active class to nav links based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Material You Animation for Page Elements
    function animateOnScroll() {
        const elementsToAnimate = document.querySelectorAll('.fade-in');
        
        elementsToAnimate.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.animation = 'fadeIn 1s forwards';
            }
        });
    }
    
    // Add fade-in class to important elements
    const elementsToFadeIn = document.querySelectorAll('.project-card, .skill-item, .timeline-item, .contact-item');
    elementsToFadeIn.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on initial load
    animateOnScroll();
    
    // Remove any existing wave dividers
    document.querySelectorAll('.wave-divider').forEach(divider => {
        divider.remove();
    });
    
    // Add touch-friendly interaction for project cards on mobile
    if (isMobile) {
        document.querySelectorAll('.project-card').forEach(card => {
            // Add active state visual feedback for mobile touches
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
            
            card.addEventListener('touchcancel', function() {
                this.classList.remove('touch-active');
            });
        });
    }
    
    // Lazy load images for better mobile performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }
});

// Add CSS to support ripple effect
document.head.insertAdjacentHTML('beforeend', `
<style>
.ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.theme-transition {
    transition: background-color 0.5s ease, color 0.5s ease;
}

.modal-animate-in {
    animation: modal-in 0.3s ease-out;
}

.modal-animate-out {
    animation: modal-out 0.3s ease-in;
}

@keyframes modal-in {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes modal-out {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.8);
    }
}
</style>
`); 