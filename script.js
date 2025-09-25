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


// TikTok Video Functionality
const tiktokContainers = document.querySelectorAll('.tiktok-video-container');
const videoModal = document.createElement('div');
videoModal.className = 'video-modal';
videoModal.innerHTML = `
    <div class="video-modal-content">
        <button class="video-modal-close"><i class="fas fa-times"></i></button>
        <iframe src="" frameborder="0" allowfullscreen></iframe>
    </div>
`;

document.body.appendChild(videoModal);

// Add click event to TikTok containers
tiktokContainers.forEach(container => {
    container.addEventListener('click', () => {
        // Replace with your actual TikTok video URL
        const tiktokUrl = "https://www.tiktok.com/@yourusername/video/1234567890";
        const videoEmbedUrl = convertTiktokToEmbed(tiktokUrl);
        
        if (videoEmbedUrl) {
            const iframe = videoModal.querySelector('iframe');
            iframe.src = videoEmbedUrl;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            // Fallback: open in new tab
            window.open(tiktokUrl, '_blank');
        }
    });
});

// Close video modal
videoModal.querySelector('.video-modal-close').addEventListener('click', () => {
    videoModal.classList.remove('active');
    const iframe = videoModal.querySelector('iframe');
    iframe.src = '';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        const iframe = videoModal.querySelector('iframe');
        iframe.src = '';
        document.body.style.overflow = 'auto';
    }
});

// Function to convert TikTok URL to embed URL
function convertTiktokToEmbed(url) {
    // This is a simplified version - you might need to adjust based on TikTok's embed requirements
    try {
        const videoId = url.split('/video/')[1];
        if (videoId) {
            return `https://www.tiktok.com/embed/v2/${videoId}`;
        }
    } catch (error) {
        console.error('Error converting TikTok URL:', error);
    }
    return null;
}

// Load TikTok embed script dynamically
function loadTiktokEmbedScript() {
    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
    }
}

// Load TikTok script when modal opens
document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('click', (e) => {
        const projectId = button.getAttribute('data-project');
        if (projectId === '3') {
            setTimeout(loadTiktokEmbedScript, 500);
        }
    });
});
