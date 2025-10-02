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
    // Custom player controls
    const btnPlayPause = document.getElementById('btnPlayPause');
    const btnMute = document.getElementById('btnMute');
    const btnSpeed = document.getElementById('btnSpeed');
    const btnPiP = document.getElementById('btnPiP');
    const btnFullscreen = document.getElementById('btnFullscreen');
    const seekBar = document.getElementById('seekBar');
    const volumeBar = document.getElementById('volumeBar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    
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
                // Handle missing table gracefully
                if (error.code === 'PGRST205' || (error.message && error.message.includes("Could not find the table 'public.videos'"))) {
                    console.warn('Videos table not found. Displaying empty state.');
                    displayEmptyState();
                    return;
                }
                console.warn('Non-fatal error loading videos:', error);
                showError('Failed to load videos. Please try again later.');
                return;
            }
            
            displayVideos(videos || []);
            
        } catch (error) {
            showError('Failed to load videos. Please try again later.');
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

        // Update duration when metadata is loaded
        videoPlayer.addEventListener('loadedmetadata', function handleMeta() {
            durationEl.textContent = formatDuration(videoPlayer.duration);
            seekBar.max = Math.floor(videoPlayer.duration || 0);
            videoPlayer.removeEventListener('loadedmetadata', handleMeta);
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

    // ----- Custom Controls Logic -----
    function togglePlayPause() {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }
    
    function updatePlayPauseButton() {
        if (videoPlayer.paused) {
            btnPlayPause.textContent = '▶';
        } else {
            btnPlayPause.textContent = '❚❚';
        }
    }

    function toggleMute() {
        videoPlayer.muted = !videoPlayer.muted;
        btnMute.textContent = videoPlayer.muted ? '🔇' : '🔊';
    }

    function changeSpeed() {
        const speeds = [1, 1.25, 1.5, 1.75, 2];
        const idx = speeds.indexOf(videoPlayer.playbackRate);
        const next = speeds[(idx + 1) % speeds.length];
        videoPlayer.playbackRate = next;
        btnSpeed.textContent = next + 'x';
    }

    async function togglePiP() {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled && !videoPlayer.disablePictureInPicture) {
                await videoPlayer.requestPictureInPicture();
            }
        } catch (e) {
            console.warn('PiP not available', e);
        }
    }

    function toggleFullscreen() {
        const container = document.querySelector('.video-player-container');
        if (!document.fullscreenElement) {
            container.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    }

    function updateSeekBar() {
        if (!isNaN(videoPlayer.duration)) {
            seekBar.value = Math.floor(videoPlayer.currentTime);
            currentTimeEl.textContent = formatDuration(videoPlayer.currentTime);
        }
    }

    function seekTo(e) {
        const value = Number(e.target.value);
        if (!isNaN(value)) {
            videoPlayer.currentTime = value;
        }
    }

    function setVolume(e) {
        const value = Number(e.target.value);
        if (!isNaN(value)) {
            videoPlayer.volume = value;
            videoPlayer.muted = value === 0;
            btnMute.textContent = videoPlayer.muted ? '🔇' : '🔊';
        }
    }

    // Keyboard shortcuts inside modal
    document.addEventListener('keydown', function(e) {
        if (!videoModal.classList.contains('active')) return;
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        switch (e.key) {
            case ' ': // Space
            case 'k':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'm':
                toggleMute();
                break;
            case 'f':
                toggleFullscreen();
                break;
            case 'p':
                togglePiP();
                break;
            case 'ArrowRight':
                videoPlayer.currentTime = Math.min(videoPlayer.currentTime + 5, videoPlayer.duration || videoPlayer.currentTime);
                break;
            case 'ArrowLeft':
                videoPlayer.currentTime = Math.max(videoPlayer.currentTime - 5, 0);
                break;
            case 'ArrowUp':
                e.preventDefault();
                videoPlayer.volume = Math.min(1, videoPlayer.volume + 0.05);
                volumeBar.value = videoPlayer.volume.toFixed(2);
                break;
            case 'ArrowDown':
                e.preventDefault();
                videoPlayer.volume = Math.max(0, videoPlayer.volume - 0.05);
                volumeBar.value = videoPlayer.volume.toFixed(2);
                break;
        }
    });

    // Wire up events if controls exist
    if (btnPlayPause) {
        btnPlayPause.addEventListener('click', togglePlayPause);
        videoPlayer.addEventListener('play', updatePlayPauseButton);
        videoPlayer.addEventListener('pause', updatePlayPauseButton);
    }
    if (btnMute) btnMute.addEventListener('click', toggleMute);
    if (btnSpeed) btnSpeed.addEventListener('click', changeSpeed);
    if (btnPiP) btnPiP.addEventListener('click', togglePiP);
    if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);
    if (seekBar) {
        videoPlayer.addEventListener('timeupdate', updateSeekBar);
        seekBar.addEventListener('input', seekTo);
    }
    if (volumeBar) volumeBar.addEventListener('input', setVolume);
    
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
