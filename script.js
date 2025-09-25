// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
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
fadeInOnScroll(); // Check on load

// Project Modal Functionality
const viewProjectButtons = document.querySelectorAll('.view-project');
const projectModals = document.querySelectorAll('.project-modal');
const closeButtons = document.querySelectorAll('.modal-close');

viewProjectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = button.getAttribute('data-project');
        const modal = document.getElementById(`projectModal${projectId}`);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.project-modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside content
projectModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
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
            nav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


// Robotics Project Specific JavaScript
function initRoboticsProject() {
    // TikTok video functionality
    const tiktokPlaceholder = document.querySelector('.tiktok-video-placeholder');
    if (tiktokPlaceholder) {
        tiktokPlaceholder.addEventListener('click', function(e) {
            e.preventDefault();
            const videoUrl = this.getAttribute('data-video-url');
            openTikTokVideo(videoUrl);
        });
    }
    
    // Image modal functionality
    const screenshotImages = document.querySelectorAll('.screenshot-item img');
    screenshotImages.forEach(img => {
        img.addEventListener('click', function() {
            openImageModal(this.src, this.alt);
        });
    });
}

function openTikTokVideo(videoUrl) {
    // Create video modal
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal active';
    videoModal.innerHTML = `
        <div class="video-modal-content">
            <button class="video-modal-close"><i class="fas fa-times"></i></button>
            <div class="video-loading">
                <i class="fas fa-robot fa-spin"></i>
                <p>Loading robotics demo...</p>
            </div>
            <div class="video-container">
                <iframe src="" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="video-fallback">
                <p>Unable to load video. <a href="${videoUrl}" target="_blank">Open in TikTok</a></p>
            </div>
        </div>
    `;
    
    document.body.appendChild(videoModal);
    document.body.style.overflow = 'hidden';
    
    const iframe = videoModal.querySelector('iframe');
    const embedUrl = convertTiktokToEmbed(videoUrl);
    
    if (embedUrl) {
        iframe.src = embedUrl;
        iframe.onload = () => {
            videoModal.querySelector('.video-loading').style.display = 'none';
        };
    } else {
        videoModal.querySelector('.video-loading').style.display = 'none';
        videoModal.querySelector('.video-fallback').style.display = 'block';
    }
    
    // Close functionality
    const closeBtn = videoModal.querySelector('.video-modal-close');
    closeBtn.addEventListener('click', () => {
        videoModal.remove();
        document.body.style.overflow = 'auto';
    });
    
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

function openImageModal(src, alt = '') {
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const imageCaption = document.getElementById('imageCaption');
    
    modalImage.src = src;
    imageCaption.textContent = alt;
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close functionality
    const closeBtn = imageModal.querySelector('.image-modal-close');
    closeBtn.addEventListener('click', closeImageModal);
    
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeImageModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

function closeImageModal() {
    const imageModal = document.getElementById('imageModal');
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize when project modal is opened
document.querySelectorAll('.view-project[data-project="6"]').forEach(button => {
    button.addEventListener('click', function() {
        setTimeout(initRoboticsProject, 100);
    });
});

// TikTok URL conversion function
function convertTiktokToEmbed(url) {
    try {
        if (url.includes('/video/')) {
            const videoId = url.split('/video/')[1].split('?')[0];
            if (videoId) {
                return `https://www.tiktok.com/embed/v2/${videoId}`;
            }
        }
    } catch (error) {
        console.error('Error converting TikTok URL:', error);
    }
    return null;
}
