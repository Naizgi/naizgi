// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.innerHTML = nav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Fade-in Animation on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 150) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();

    // Project Modal Functionality
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const projectModals = document.querySelectorAll('.project-modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Open modal
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const modal = document.getElementById(`projectModal${projectId}`);
            
            if (modal) {
                // Close any open modals
                projectModals.forEach(m => m.classList.remove('active'));
                // Open new modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Initialize video for robotics project (project 5)
                if (projectId === '5') {
                    initRoboticsVideo();
                }
            }
        });
    });

    // Close modal
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.project-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Pause video if playing
                const video = modal.querySelector('video');
                if (video) {
                    video.pause();
                }
            }
        });
    });

    // Close modal when clicking outside
    projectModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            projectModals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu
                if (nav) nav.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Simple video initialization for robotics project
function initRoboticsVideo() {
    const video = document.querySelector('#projectModal5 video');
    if (video) {
        // Reset video to beginning when modal opens
        video.currentTime = 0;
    }
}


// Enhanced mobile hero section functionality
function optimizeHeroForMobile() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const codeAnimation = document.querySelector('.code-animation');
    const techIcons = document.querySelector('.tech-icons');
    
    if (window.innerWidth <= 768) {
        // Add mobile-specific classes
        hero.classList.add('mobile-optimized');
        
        // Reorder elements for better mobile flow
        if (heroContent && codeAnimation && techIcons) {
            const heroContainer = hero.querySelector('.container');
            if (heroContainer) {
                // Clear existing content
                heroContainer.innerHTML = '';
                
                // Rebuild in mobile-optimized order
                heroContainer.appendChild(heroContent);
                heroContainer.appendChild(techIcons);
                heroContainer.appendChild(codeAnimation);
            }
        }
        
        // Add touch-friendly animations
        document.querySelectorAll('.tech-icon').forEach(icon => {
            icon.style.animation = 'mobileBounce 2s infinite ease-in-out';
        });
    }
}

// Initialize on load and resize
document.addEventListener('DOMContentLoaded', function() {
    optimizeHeroForMobile();
    window.addEventListener('resize', optimizeHeroForMobile);
    
    // Add loading animation
    const hero = document.querySelector('.hero');
    hero.classList.add('loading');
    
    setTimeout(() => {
        hero.classList.remove('loading');
        hero.classList.add('loaded');
    }, 100);
});

// Add smooth scrolling for mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const nav = document.getElementById('nav');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});
