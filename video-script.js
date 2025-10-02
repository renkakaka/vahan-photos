// Video Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase client
    const supabase = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY);
    
    // DOM elements
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const videoGrid = document.getElementById('videoGrid');
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoModalClose = document.querySelector('.video-modal-close');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Initialize the page
    init();
    
    async function init() {
        try {
            // Show loading screen
            showLoadingScreen();
            
            // Load videos
            await loadVideos();
            
            // Hide loading screen
            hideLoadingScreen();
            
            // Initialize event listeners
            initEventListeners();
            
        } catch (error) {
            console.error('Error initializing video page:', error);
            hideLoadingScreen();
            showError('Failed to load videos. Please try again later.');
        }
    }
    
    function showLoadingScreen() {
        loadingScreen.classList.remove('hidden');
        mainContent.style.opacity = '0';
    }
    
    function hideLoadingScreen() {
        loadingScreen.classList.add('hidden');
        mainContent.style.opacity = '1';
    }
    
    function initEventListeners() {
        // Video modal close
        videoModalClose.addEventListener('click', closeVideoModal);
        
        // Close modal on background click
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
        
        // Mobile navigation toggle
        if (navToggle) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Contact form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactForm);
        }
    }
    
    async function loadVideos() {
        try {
            const { data: videos, error } = await supabase
                .from('videos')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) {
                console.error('Error loading videos:', error);
                throw error;
            }
            
            displayVideos(videos || []);
            
        } catch (error) {
            console.error('Error loading videos:', error);
            displayEmptyState();
        }
    }
    
    function displayVideos(videos) {
        if (videos.length === 0) {
            displayEmptyState();
            return;
        }
        
        videoGrid.innerHTML = '';
        
        videos.forEach(video => {
            const videoItem = createVideoItem(video);
            videoGrid.appendChild(videoItem);
        });
    }
    
    function createVideoItem(video) {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        // Use default preview image if no thumbnail is provided
        const thumbnailUrl = video.thumbnail_url || 'vahan-preview.jpg';
        videoItem.style.backgroundImage = `url(${thumbnailUrl})`;
        videoItem.setAttribute('data-video-id', video.id);
        videoItem.setAttribute('tabindex', '0');
        videoItem.setAttribute('role', 'button');
        videoItem.setAttribute('aria-label', `Play video: ${video.title}`);
        
        videoItem.innerHTML = `
            <div class="video-duration">${formatDuration(video.duration)}</div>
            <div class="video-play-button" aria-hidden="true"></div>
            <div class="video-info-overlay">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-category">${video.category}</p>
            </div>
        `;
        
        // Add click event
        videoItem.addEventListener('click', function() {
            openVideoModal(video);
        });
        
        // Add keyboard event
        videoItem.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openVideoModal(video);
            }
        });
        
        return videoItem;
    }
    
    function displayEmptyState() {
        videoGrid.innerHTML = `
            <div class="video-empty-state">
                <div class="video-empty-state-icon">🎬</div>
                <h3>No Videos Yet</h3>
                <p>We're working on adding beautiful wedding videos to our collection. Check back soon!</p>
            </div>
        `;
    }
    
    function openVideoModal(video) {
        // Set video source
        videoPlayer.src = video.video_url;
        
        // Set video info
        const videoTitle = document.querySelector('.video-info .video-title');
        const videoDescription = document.querySelector('.video-info .video-description');
        
        if (videoTitle) videoTitle.textContent = video.title;
        if (videoDescription) videoDescription.textContent = video.description || '';
        
        // Show modal
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Play video
        videoPlayer.play().catch(error => {
            console.error('Error playing video:', error);
        });
    }
    
    function closeVideoModal() {
        // Pause video
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        
        // Hide modal
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function formatDuration(seconds) {
        if (!seconds) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    function showError(message) {
        videoGrid.innerHTML = `
            <div class="video-empty-state">
                <div class="video-empty-state-icon">⚠️</div>
                <h3>Error Loading Videos</h3>
                <p>${message}</p>
            </div>
        `;
    }
    
    async function handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Here you would typically send the form data to your backend
        // For now, we'll just show a success message
        alert('Thank you for your message! We\'ll get back to you soon.');
        e.target.reset();
    }
    
    // Lazy loading for video thumbnails
    function initLazyLoading() {
        const videoItems = document.querySelectorAll('.video-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const videoItem = entry.target;
                    const videoId = videoItem.getAttribute('data-video-id');
                    
                    // Load video thumbnail if not already loaded
                    if (!videoItem.style.backgroundImage || videoItem.style.backgroundImage === 'none') {
                        loadVideoThumbnail(videoId, videoItem);
                    }
                    
                    observer.unobserve(videoItem);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        videoItems.forEach(item => observer.observe(item));
    }
    
    async function loadVideoThumbnail(videoId, videoItem) {
        try {
            // This would typically generate a thumbnail from the video
            // For now, we'll use a placeholder or the video URL itself
            const { data: video } = await supabase
                .from('videos')
                .select('thumbnail_url, video_url')
                .eq('id', videoId)
                .single();
            
            if (video) {
                const thumbnailUrl = video.thumbnail_url || video.video_url;
                videoItem.style.backgroundImage = `url(${thumbnailUrl})`;
            }
        } catch (error) {
            console.error('Error loading video thumbnail:', error);
        }
    }
    
    // Initialize lazy loading after videos are loaded
    setTimeout(initLazyLoading, 100);
    
    // Handle video player events
    videoPlayer.addEventListener('loadstart', function() {
        console.log('Video loading started');
    });
    
    videoPlayer.addEventListener('canplay', function() {
        console.log('Video can start playing');
    });
    
    videoPlayer.addEventListener('error', function(e) {
        console.error('Video error:', e);
        alert('Error loading video. Please try again later.');
    });
    
    // Handle window resize for responsive video player
    window.addEventListener('resize', function() {
        if (videoModal.classList.contains('active')) {
            // Adjust video player size if needed
            const container = document.querySelector('.video-player-container');
            if (container) {
                container.style.aspectRatio = '16/9';
            }
        }
    });
    
    // Preload video metadata for better UX
    function preloadVideoMetadata(videoUrl) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = videoUrl;
        
        video.addEventListener('loadedmetadata', function() {
            console.log('Video metadata loaded');
        });
    }
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states for better UX
    function showVideoLoading() {
        videoGrid.innerHTML = `
            <div class="video-loading">
                <div class="video-loading-spinner"></div>
                <span>Loading videos...</span>
            </div>
        `;
    }
    
    // Initialize video loading state
    showVideoLoading();
    
    // Add keyboard navigation for video grid
    let currentVideoIndex = -1;
    const videoItems = document.querySelectorAll('.video-item');
    
    document.addEventListener('keydown', function(e) {
        if (videoModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                currentVideoIndex = Math.min(currentVideoIndex + 1, videoItems.length - 1);
                videoItems[currentVideoIndex]?.focus();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                currentVideoIndex = Math.max(currentVideoIndex - 1, 0);
                videoItems[currentVideoIndex]?.focus();
                break;
        }
    });
    
    // Add touch gestures for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Swipe up to close video modal
        if (videoModal.classList.contains('active') && Math.abs(diffY) > Math.abs(diffX) && diffY > 50) {
            closeVideoModal();
        }
        
        touchStartX = 0;
        touchStartY = 0;
    });
});
