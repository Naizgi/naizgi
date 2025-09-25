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

// Video Player Functionality for Robotics Project
function initRoboticsVideoPlayer() {
    const video = document.querySelector('#projectModal6 .project-video');
    const playPauseBtn = document.querySelector('#projectModal6 .video-play-pause');
    const progressBar = document.querySelector('#projectModal6 .progress-bar');
    const progressContainer = document.querySelector('#projectModal6 .video-progress');
    const timeDisplay = document.querySelector('#projectModal6 .video-time');
    const fullscreenBtn = document.querySelector('#projectModal6 .video-fullscreen');
    
    if (!video) return;
    
    // Update play/pause button
    function updatePlayPauseButton() {
        const icon = playPauseBtn.querySelector('i');
        if (video.paused) {
            icon.className = 'fas fa-play';
        } else {
            icon.className = 'fas fa-pause';
        }
    }
    
    // Update progress bar
    function updateProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percent}%`;
        
        // Update time display
        const currentTime = formatTime(video.currentTime);
        const duration = formatTime(video.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
    }
    
    // Format time (seconds to mm:ss)
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Set progress on click
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = video.duration;
        video.currentTime = (clickX / width) * duration;
    }
    
    // Toggle fullscreen
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
    
    // Event listeners
    if (video && playPauseBtn) {
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
        
        playPauseBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }
    
    if (video) {
        video.addEventListener('play', updatePlayPauseButton);
        video.addEventListener('pause', updatePlayPauseButton);
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('loadedmetadata', function() {
            updateProgress();
            // Hide native controls if custom controls are working
            video.removeAttribute('controls');
        });
    }
    
    if (progressContainer) {
        progressContainer.addEventListener('click', setProgress);
    }
    
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    // Initialize button state
    updatePlayPauseButton();
}

// Initialize video player when robotics modal opens
document.querySelectorAll('.view-project[data-project="6"]').forEach(button => {
    button.addEventListener('click', function() {
        setTimeout(initRoboticsVideoPlayer, 100);
    });
});

// Also initialize if modal is already open
const project6Modal = document.getElementById('projectModal6');
if (project6Modal && project6Modal.classList.contains('active')) {
    initRoboticsVideoPlayer();
}

// Keep your existing modal functionality (from previous code)
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
            
            // Initialize video player for project 6
            if (projectId === '6') {
                setTimeout(initRoboticsVideoPlayer, 100);
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
            
            // Pause video when closing modal
            const video = modal.querySelector('.project-video');
            if (video) {
                video.pause();
            }
        }
    });
});
