// Mobile Menu Toggle
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
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Fade-in Animation on Scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
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

viewProjectButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        const modal = document.getElementById(`projectModal${projectId}`);
        if (modal) {
            // Close any open modals first
            projectModals.forEach(m => m.classList.remove('active'));
            
            // Open the selected modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Initialize TikTok functionality for project 6
            if (projectId === '6') {
                setTimeout(initRoboticsTikTok, 100);
            }
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.project-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Also close video modal if open
        const videoModal = document.getElementById('videoModal');
        if (videoModal) {
            videoModal.classList.remove('active');
        }
    });
});

// Close modals when clicking outside
projectModals.forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// TikTok Video Handler for Robotics Project
function initRoboticsTikTok() {
    const videoTrigger = document.getElementById('roboticsVideoTrigger');
    const videoModal = document.getElementById('videoModal');
    const videoModalClose = document.getElementById('videoModalClose');
    
    if (videoTrigger && videoModal && videoModalClose) {
        // Remove any existing event listeners to prevent duplicates
        videoTrigger.replaceWith(videoTrigger.cloneNode(true));
        const newVideoTrigger = document.getElementById('roboticsVideoTrigger');
        
        // Add click event to video placeholder
        newVideoTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            videoModal.classList.add('active');
        });
        
        // Close video modal
        videoModalClose.addEventListener('click', function() {
            videoModal.classList.remove('active');
        });
        
        // Close video modal when clicking outside
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
            }
        });
    }
}

// Close video modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const videoModal = document.getElementById('videoModal');
        if (videoModal && videoModal.classList.contains('active')) {
            videoModal.classList.remove('active');
        }
        
        // Also close project modals
        projectModals.forEach(modal => {
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (nav) {
                nav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if robotics modal is already open (for page reloads)
    const project6Modal = document.getElementById('projectModal6');
    if (project6Modal && project6Modal.classList.contains('active')) {
        initRoboticsTikTok();
    }
});
