/**
 * VAHAN PHOTOS - Supabase Version
 * Loads photos from Supabase database
 */

// Supabase configuration
const supabaseUrl = window.SUPABASE_URL || 'https://fzqtdybnvctvgkqqyhkl.supabase.co';
const supabaseKey = window.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6cXRkeWJudmN0dmdrcXF5aGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDE2MjMsImV4cCI6MjA3NDM3NzYyM30.F5JH4i8w8I8TeHrXgfqLr0swYCgjHA6VvL53n6PrQR0';

// Global variables
let portfolioItems = [];
let currentImageIndex = 0;
let supabase;

// ========================================
// SUPABASE FUNCTIONS
// ========================================

/**
 * Initialize Supabase client
 */
function initSupabase() {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        return true;
    }
    return false;
}

/**
 * Load photos from Supabase
 */
async function loadPhotosFromSupabase() {
    if (!supabase) {
        console.error('Supabase not initialized');
        return [];
    }

    try {
        const { data: photos, error } = await supabase
            .from('photos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error loading photos:', error);
            return [];
        }

        // Convert Supabase data to portfolio format
        const converted = photos.map(photo => ({
            id: photo.id,
            title: photo.title,
            category: photo.category,
            description: photo.description,
            image: photo.image_url,
            size: photo.size || 'medium', // Default to medium if not set
            isCarousel: photo.is_carousel,
            carouselImages: photo.carousel_images || []
        }));
        
        console.log('Converted photos:', converted);
        return converted;

    } catch (error) {
        console.error('Error loading photos:', error);
        return [];
    }
}

// ========================================
// PORTFOLIO FUNCTIONS
// ========================================

/**
 * Generate portfolio grid items
 */
async function generatePortfolioItems() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = '<div class="loading">Loading photos...</div>';
    
    // Load from Supabase only
    if (initSupabase()) {
        portfolioItems = await loadPhotosFromSupabase();
    } else {
        console.error('Supabase not available');
        portfolioItems = [];
    }
    
    if (portfolioItems.length === 0) {
        portfolioGrid.innerHTML = '<div class="loading">No photos available</div>';
        return;
    }
    
    portfolioGrid.innerHTML = '';
    console.log('Generating portfolio items:', portfolioItems.length);
    
    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-index', index);
        portfolioItem.setAttribute('data-category', item.category.toLowerCase());
        
        // All items are square - Instagram style
        // No size differentiation needed
        
        // Check if it's a carousel
        if (item.isCarousel && item.carouselImages && item.carouselImages.length > 0) {
            portfolioItem.innerHTML = `
                <div class="carousel-container">
                    <img src="${item.image}" alt="${item.title}" loading="eager" decoding="async" onerror="handleImageError(this)">
                    <div class="carousel-indicator">
                        <span class="carousel-count">${item.carouselImages.length}</span>
                        <span class="carousel-icon">📷</span>
                    </div>
                </div>
                <div class="portfolio-overlay">
                    <h3 class="portfolio-title">${item.title}</h3>
                    <span class="portfolio-category">${item.category}</span>
                </div>
            `;
        } else {
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="eager" decoding="async" onerror="handleImageError(this)">
                <div class="portfolio-overlay">
                    <h3 class="portfolio-title">${item.title}</h3>
                    <span class="portfolio-category">${item.category}</span>
                </div>
            `;
        }
        
        // Add click event for lightbox
        portfolioItem.addEventListener('click', () => {
            openLightbox(item, index);
        });
        
        // Add hover effects (only on non-touch devices)
        if (!('ontouchstart' in window)) {
            portfolioItem.addEventListener('mouseenter', () => {
                portfolioItem.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            portfolioItem.addEventListener('mouseleave', () => {
                portfolioItem.style.transform = 'translateY(0) scale(1)';
            });
        }
        
        // Prevent image reloading on iOS
        const img = portfolioItem.querySelector('img');
        if (img) {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            // Prevent re-loading
            img.addEventListener('error', (e) => {
                e.preventDefault();
                handleImageError(img);
            });
        }
        
        portfolioGrid.appendChild(portfolioItem);
        
        // Add to observer if it exists and item hasn't been animated yet
        if (window.portfolioObserver && 
            !portfolioItem.classList.contains('animate-fade-in-up') && 
            !portfolioItem.classList.contains('ios-animated')) {
            window.portfolioObserver.observe(portfolioItem);
        }
    });
}

/**
 * Get local portfolio data (fallback)
 */
function getLocalPortfolioData() {
    return [
        {
            id: 1,
            title: "Modern Residence",
            category: "Residential",
            description: "Contemporary single-family home featuring clean lines and sustainable materials.",
            image: "img/1.jpg",
            size: "large"
        },
        {
            id: 2,
            title: "Glass Pavilion",
            category: "Commercial",
            description: "Transparent office building with innovative structural design.",
            image: "img/2.jpg",
            size: "medium"
        },
        {
            id: 3,
            title: "Curved Facade",
            category: "Cultural",
            description: "Museum extension with flowing architectural forms.",
            image: "img/3.jpg",
            size: "large"
        },
        {
            id: 4,
            title: "Urban Loft",
            category: "Residential",
            description: "Industrial conversion with modern amenities and open spaces.",
            image: "img/4.jpg",
            size: "medium"
        },
        {
            id: 5,
            title: "Concrete Tower",
            category: "Commercial",
            description: "High-rise office building with exposed concrete structure.",
            image: "img/5.jpg",
            size: "large"
        }
    ];
}

/**
 * Handle image loading errors
 */
function handleImageError(img) {
    console.warn('Image failed to load:', img.src);
    img.style.display = 'none';
    
    // Create placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = '📷<br>Image not available';
    placeholder.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: #1a1a1a;
        color: #666;
        font-size: 2rem;
        text-align: center;
    `;
    
    img.parentNode.insertBefore(placeholder, img);
}

/**
 * Initialize portfolio animations
 */
function initPortfolioAnimations() {
    // Only initialize once
    if (window.portfolioObserver) return;
    
    // Detect iOS devices
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // More conservative settings for iOS
    const observerOptions = isIOS ? {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    } : {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    window.portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate-fade-in-up')) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1}s`;
                
                // For iOS, add a permanent class to prevent re-triggering
                if (isIOS) {
                    entry.target.classList.add('ios-animated');
                }
                
                // Unobserve after animation is added to prevent re-triggering
                window.portfolioObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        // Only observe items that haven't been animated yet
        if (!item.classList.contains('animate-fade-in-up') && !item.classList.contains('ios-animated')) {
            window.portfolioObserver.observe(item);
        }
    });
}

// ========================================
// LIGHTBOX FUNCTIONS
// ========================================

/**
 * Open lightbox with image
 */
function openLightbox(item, index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDescription = lightbox.querySelector('.lightbox-description');
    const lightboxCarousel = lightbox.querySelector('.lightbox-carousel');
    
    if (!lightbox) return;
    
    currentImageIndex = index;
    
    // Check if it's a carousel
    if (item.isCarousel && item.carouselImages && item.carouselImages.length > 0) {
        // Show carousel
        lightboxCarousel.style.display = 'block';
        lightboxImage.style.display = 'none';
        
        // Generate carousel HTML
        lightboxCarousel.innerHTML = `
            <div class="carousel-track">
                ${item.carouselImages.map((img, idx) => `
                    <div class="carousel-slide ${idx === 0 ? 'active' : ''}">
                        <img src="${img}" alt="${item.title} - Image ${idx + 1}" loading="eager">
                    </div>
                `).join('')}
            </div>
            <div class="carousel-nav">
                <button class="carousel-prev" onclick="previousCarouselSlide()">‹</button>
                <button class="carousel-next" onclick="nextCarouselSlide()">›</button>
            </div>
            <div class="carousel-dots">
                ${item.carouselImages.map((_, idx) => `
                    <div class="carousel-dot ${idx === 0 ? 'active' : ''}" onclick="goToCarouselSlide(${idx})"></div>
                `).join('')}
            </div>
            <div class="carousel-counter">
                <span id="currentCarouselSlide">1</span> / ${item.carouselImages.length}
            </div>
        `;
        
        // Store carousel data for navigation
        lightbox.dataset.carouselImages = JSON.stringify(item.carouselImages);
        lightbox.dataset.currentCarouselSlide = '0';
        
    } else {
        // Show single image
        lightboxCarousel.style.display = 'none';
        lightboxImage.style.display = 'block';
        
        lightboxImage.src = item.image;
        lightboxImage.alt = item.title;
    }
    
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleLightboxKeyboard);
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleLightboxKeyboard);
}

/**
 * Handle lightbox keyboard navigation
 */
function handleLightboxKeyboard(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
    }
}

/**
 * Navigate lightbox images
 */
function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = portfolioItems.length - 1;
    } else if (currentImageIndex >= portfolioItems.length) {
        currentImageIndex = 0;
    }
    
    const item = portfolioItems[currentImageIndex];
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
}

// ========================================
// CAROUSEL NAVIGATION FUNCTIONS
// ========================================

/**
 * Previous carousel slide
 */
function previousCarouselSlide() {
    const lightbox = document.getElementById('lightbox');
    const currentSlide = parseInt(lightbox.dataset.currentCarouselSlide);
    const carouselImages = JSON.parse(lightbox.dataset.carouselImages);
    
    let newSlide = currentSlide - 1;
    if (newSlide < 0) {
        newSlide = carouselImages.length - 1;
    }
    
    goToCarouselSlide(newSlide);
}

/**
 * Next carousel slide
 */
function nextCarouselSlide() {
    const lightbox = document.getElementById('lightbox');
    const currentSlide = parseInt(lightbox.dataset.currentCarouselSlide);
    const carouselImages = JSON.parse(lightbox.dataset.carouselImages);
    
    let newSlide = currentSlide + 1;
    if (newSlide >= carouselImages.length) {
        newSlide = 0;
    }
    
    goToCarouselSlide(newSlide);
}

/**
 * Go to specific carousel slide
 */
function goToCarouselSlide(slideIndex) {
    const lightbox = document.getElementById('lightbox');
    const carouselImages = JSON.parse(lightbox.dataset.carouselImages);
    
    if (slideIndex < 0 || slideIndex >= carouselImages.length) return;
    
    // Update current slide
    lightbox.dataset.currentCarouselSlide = slideIndex.toString();
    
    // Update slides
    const slides = lightbox.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
    });
    
    // Update dots
    const dots = lightbox.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
    
    // Update counter
    const counter = lightbox.querySelector('#currentCarouselSlide');
    if (counter) {
        counter.textContent = slideIndex + 1;
    }
}

// ========================================
// NAVIGATION FUNCTIONS
// ========================================

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Initializing navigation:', { navToggle, navMenu, navLinks: navLinks.length });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggle clicked');
            
            const isActive = navMenu.classList.contains('active');
            if (isActive) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            } else {
                navMenu.classList.add('active');
                navToggle.classList.add('active');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    } else {
        console.warn('Navigation elements not found:', { navToggle, navMenu });
    }
    
    // Smooth scroll for navigation links (only for internal links)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            
            // Only prevent default for internal anchor links
            if (target && target.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(target);
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
            // For external links (like video.html), let them work normally
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', debounce(() => {
        const nav = document.querySelector('.nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    }, 10));
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.contact-info, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// PARALLAX EFFECTS
// ========================================

/**
 * Initialize parallax scrolling
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (!hero || !heroContent) return;
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    }, 10));
}

// ========================================
// CONTACT FORM
// ========================================

/**
 * Initialize contact form
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.background = '#4CAF50';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// ========================================
// LAZY LOADING
// ========================================

/**
 * Initialize lazy loading for images (disabled for iOS compatibility)
 */
function initLazyLoading() {
    // Disabled lazy loading for iOS compatibility
    // All images are loaded with loading="eager"
    console.log('Lazy loading disabled for iOS compatibility');
}

// ========================================
// RESPONSIVE HANDLING
// ========================================

/**
 * Handle responsive changes
 */
function handleResponsiveChanges() {
    const handleResize = debounce(() => {
        // Recalculate portfolio grid if needed
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            // Force reflow for grid adjustments
            portfolioGrid.style.display = 'none';
            portfolioGrid.offsetHeight; // Trigger reflow
            portfolioGrid.style.display = 'grid';
        }
    }, 250);
    
    window.addEventListener('resize', handleResize);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========================================
// LIGHTBOX INITIALIZATION
// ========================================

/**
 * Initialize lightbox functionality
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeButton = lightbox.querySelector('.lightbox-close');
    
    if (closeButton) {
        closeButton.addEventListener('click', closeLightbox);
    }
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
    
    // Mobile pinch-to-close functionality
    initMobilePinchToClose();
}

/**
 * Initialize mobile pinch-to-close functionality
 */
function initMobilePinchToClose() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const carouselImages = lightbox.querySelectorAll('.carousel-slide img');
    
    if (!lightbox || !lightboxImage) return;
    
    let initialDistance = 0;
    let currentDistance = 0;
    let isPinching = false;
    let startScale = 1;
    let currentScale = 1;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Handle touch start
    function handleTouchStart(e) {
        if (e.touches.length === 2) {
            isPinching = true;
            initialDistance = getDistance(e.touches[0], e.touches[1]);
            startScale = currentScale;
            
            // Get center point
            startX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            startY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            
            e.preventDefault();
        } else if (e.touches.length === 1) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
    }
    
    // Handle touch move
    function handleTouchMove(e) {
        if (isPinching && e.touches.length === 2) {
            currentDistance = getDistance(e.touches[0], e.touches[1]);
            currentScale = startScale * (currentDistance / initialDistance);
            
            // Get current center point
            currentX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            currentY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            
            // Apply transform
            applyTransform(currentScale, currentX - startX, currentY - startY);
            
            e.preventDefault();
        } else if (e.touches.length === 1 && !isPinching) {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        }
    }
    
    // Handle touch end
    function handleTouchEnd(e) {
        if (isPinching) {
            // Check if user is zooming out (scale < 0.8)
            if (currentScale < 0.8) {
                closeLightbox();
            } else {
                // Reset to normal scale
                resetTransform();
            }
            
            isPinching = false;
            currentScale = 1;
        } else if (e.touches.length === 0) {
            // Single finger swipe down to close
            const deltaY = currentY - startY;
            const deltaX = Math.abs(currentX - startX);
            
            if (deltaY > 100 && deltaX < 100) {
                closeLightbox();
            }
        }
    }
    
    // Calculate distance between two touch points
    function getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    // Apply transform to image
    function applyTransform(scale, translateX, translateY) {
        const transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        lightboxImage.style.transform = transform;
        
        // Apply to carousel images too
        carouselImages.forEach(img => {
            img.style.transform = transform;
        });
    }
    
    // Reset transform
    function resetTransform() {
        lightboxImage.style.transform = 'scale(1) translate(0px, 0px)';
        carouselImages.forEach(img => {
            img.style.transform = 'scale(1) translate(0px, 0px)';
        });
    }
    
    // Add event listeners
    lightbox.addEventListener('touchstart', handleTouchStart, { passive: false });
    lightbox.addEventListener('touchmove', handleTouchMove, { passive: false });
    lightbox.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Reset transform when lightbox opens
    const originalOpenLightbox = window.openLightbox;
    window.openLightbox = function(index) {
        originalOpenLightbox(index);
        setTimeout(() => {
            resetTransform();
        }, 100);
    };
}

// ========================================
// iOS SPECIFIC HANDLING
// ========================================

/**
 * Initialize iOS-specific scroll handling
 */
function initIOSScrollHandling() {
    // Detect iOS devices
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    if (!isIOS) return;
    
    let scrollTimeout;
    let isScrolling = false;
    
    // Throttle scroll events on iOS
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            
            // Add class to prevent re-animations during scroll
            document.body.classList.add('ios-scrolling');
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                document.body.classList.remove('ios-scrolling');
            }, 150);
        }
    }, { passive: true });
    
    // Prevent touch events from triggering animations
    document.addEventListener('touchstart', () => {
        document.body.classList.add('ios-touching');
    }, { passive: true });
    
    document.addEventListener('touchend', () => {
        setTimeout(() => {
            document.body.classList.remove('ios-touching');
        }, 100);
    }, { passive: true });
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize the website
 */
async function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    // Show loading screen immediately
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
    }
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    
    try {
        // Generate portfolio items (async)
        await generatePortfolioItems();
        
        // Initialize other functionality (only once)
        if (!window.navigationInitialized) {
            initNavigation();
            window.navigationInitialized = true;
        }
        
        if (!window.lightboxInitialized) {
            initLightbox();
            window.lightboxInitialized = true;
        }
        
        if (!window.scrollInitialized) {
            initScrollAnimations();
            initParallax();
            window.scrollInitialized = true;
        }
        
        if (!window.formInitialized) {
            initContactForm();
            window.formInitialized = true;
        }
        
        if (!window.lazyInitialized) {
            initLazyLoading();
            window.lazyInitialized = true;
        }
        
        if (!window.responsiveInitialized) {
            handleResponsiveChanges();
            window.responsiveInitialized = true;
        }
        
        // Initialize portfolio animations only once
        if (!window.portfolioAnimationsInitialized) {
            initPortfolioAnimations();
            window.portfolioAnimationsInitialized = true;
        }
        
        // Add iOS-specific scroll handling
        initIOSScrollHandling();
        
        // Add loaded class for CSS animations
        document.body.classList.add('loaded');
        
        // Hide loading screen and show main content after minimum delay
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            if (mainContent) {
                mainContent.style.display = 'block';
            }
        }, 1500); // Show loading for at least 1.5 seconds
        
        console.log('VAHAN PHOTOS website initialized successfully with Supabase');
    } catch (error) {
        console.error('Error initializing website:', error);
        
        // Hide loading screen even on error
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            if (mainContent) {
                mainContent.style.display = 'block';
            }
        }, 1000);
    }
}

// Auto-initialize
init();
