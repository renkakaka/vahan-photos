/**
 * VAHAN PHOTOS - Simple Version without Firebase
 * Uses local images for now
 */

// Global variables
let portfolioItems = [];
let currentImageIndex = 0;

// ========================================
// PORTFOLIO DATA - ADD YOUR PHOTOS HERE
// ========================================
// 
// HOW TO ADD PHOTOS:
// 1. Add your photo to img/ folder (e.g., img/21.jpg)
// 2. Copy the template below and paste it in the array
// 3. Update the details (id, title, category, description, image path)
// 4. Save the file and refresh the website
//
// TEMPLATE FOR SINGLE PHOTO:
// {
//     id: 21,                    // Unique number (next available)
//     title: "Your Photo Title", // Photo title
//     category: "Architecture",  // Category (Architecture, Interior, etc.)
//     description: "Description", // Photo description
//     image: "img/21.jpg",       // Path to your image
//     size: "large"              // Size: "large" or "medium"
// }
//
// TEMPLATE FOR INSTAGRAM CAROUSEL:
// {
//     id: 22,
//     title: "Instagram Post Title",
//     category: "Social",
//     description: "Instagram carousel post",
//     image: "img/22-1.jpg",     // First image of carousel
//     size: "large",
//     isCarousel: true,          // Mark as carousel
//     carouselImages: [          // Array of all carousel images
//         "img/22-1.jpg",
//         "img/22-2.jpg",
//         "img/22-3.jpg",
//         "img/22-4.jpg"
//     ]
// }
//
// INSTAGRAM URL EXAMPLES:
// - Single photo: https://www.instagram.com/p/ABC123/
// - Carousel: https://www.instagram.com/p/ABC123/?img_index=1
// - Story: https://www.instagram.com/stories/username/123456789/
//
// ========================================

const portfolioData = [
    // EXISTING PHOTOS - DO NOT MODIFY
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
    },
    {
        id: 6,
        title: "Minimalist House",
        category: "Residential",
        description: "Clean geometric design with emphasis on natural light.",
        image: "img/6.jpg",
        size: "medium"
    },
    {
        id: 7,
        title: "Cultural Center",
        category: "Cultural",
        description: "Multi-purpose venue with dynamic spatial relationships.",
        image: "img/7.jpg",
        size: "large"
    },
    {
        id: 8,
        title: "Waterfront Villa",
        category: "Residential",
        description: "Luxury home with panoramic ocean views and outdoor living.",
        image: "img/8.jpg",
        size: "medium"
    },
    {
        id: 9,
        title: "Steel Structure",
        category: "Commercial",
        description: "Innovative office complex with exposed steel framework.",
        image: "img/9.jpg",
        size: "large"
    },
    {
        id: 10,
        title: "Garden Pavilion",
        category: "Cultural",
        description: "Temporary exhibition space with organic forms.",
        image: "img/10.jpg",
        size: "medium"
    },
    {
        id: 11,
        title: "Sky Bridge",
        category: "Infrastructure",
        description: "Pedestrian connection between buildings with dramatic views.",
        image: "img/11.jpg",
        size: "large"
    },
    {
        id: 12,
        title: "Cantilever House",
        category: "Residential",
        description: "Dramatic overhang design with panoramic city views.",
        image: "img/12.jpg",
        size: "medium"
    },
    {
        id: 13,
        title: "Art Gallery",
        category: "Cultural",
        description: "Contemporary exhibition space with flexible layouts.",
        image: "img/13.jpg",
        size: "large"
    },
    {
        id: 14,
        title: "Modular Office",
        category: "Commercial",
        description: "Adaptable workspace with sustainable design principles.",
        image: "img/14.jpg",
        size: "medium"
    },
    {
        id: 15,
        title: "Floating House",
        category: "Residential",
        description: "Water-based residence with innovative foundation system.",
        image: "img/15.jpg",
        size: "large"
    },
    {
        id: 16,
        title: "Concrete Block",
        category: "Commercial",
        description: "Monolithic office building with textured concrete facade.",
        image: "img/16.jpg",
        size: "medium"
    },
    {
        id: 17,
        title: "Green Roof",
        category: "Sustainable",
        description: "Eco-friendly building with integrated vegetation systems.",
        image: "img/17.jpg",
        size: "large"
    },
    {
        id: 18,
        title: "Glass House",
        category: "Residential",
        description: "Transparent residence with seamless indoor-outdoor connection.",
        image: "img/18.jpg",
        size: "medium"
    },
    {
        id: 19,
        title: "Cultural Hub",
        category: "Cultural",
        description: "Community center with flexible performance and exhibition spaces.",
        image: "img/19.jpg",
        size: "large"
    },
    {
        id: 20,
        title: "Modern Library",
        category: "Educational",
        description: "Contemporary learning space with innovative shelving systems.",
        image: "img/20.jpg",
        size: "medium"
    },
    
    // ========================================
    // ADD YOUR NEW PHOTOS HERE
    // ========================================
    
    // EXAMPLE: Single photo from Instagram
    // {
    //     id: 21,
    //     title: "My Instagram Photo",
    //     category: "Architecture",
    //     description: "Beautiful architectural shot from Instagram",
    //     image: "img/21.jpg",
    //     size: "large"
    // },
    
    // EXAMPLE: Instagram carousel post
    // {
    //     id: 22,
    //     title: "Instagram Carousel Post",
    //     category: "Social",
    //     description: "Multiple photos from Instagram post",
    //     image: "img/22-1.jpg",
    //     size: "large",
    //     isCarousel: true,
    //     carouselImages: [
    //         "img/22-1.jpg",
    //         "img/22-2.jpg",
    //         "img/22-3.jpg",
    //         "img/22-4.jpg"
    //     ]
    // },
    
    // ADD MORE PHOTOS BELOW THIS LINE...
    
    // INSTAGRAM CAROUSEL - https://www.instagram.com/p/DKVh0SGSlDy/?img_index=1
    {
        id: 21,
        title: "Instagram Post DKVh0SGSlDy",
        category: "Social",
        description: "Instagram carousel post with multiple architectural photos",
        image: "img/1.jpg",
        size: "large",
        isCarousel: true,
        carouselImages: [
            "img/1.jpg",
            "img/2.jpg",
            "img/3.jpg",
            "img/4.jpg",
            "img/5.jpg"
        ]
    },
    
];

// ========================================
// PORTFOLIO FUNCTIONS
// ========================================

/**
 * Generate portfolio grid items
 */
function generatePortfolioItems() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = '';
    portfolioItems = portfolioData; // Use local data
    
    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-index', index);
        portfolioItem.setAttribute('data-category', item.category.toLowerCase());
        
        // Set grid row span based on size
        if (item.size === 'large') {
            portfolioItem.style.gridRow = 'span 2';
        }
        
        // Check if it's a carousel
        if (item.isCarousel && item.carouselImages) {
            portfolioItem.innerHTML = `
                <div class="carousel-container">
                    <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" onerror="handleImageError(this)">
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
                <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" onerror="handleImageError(this)">
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
        
        // Add hover effects
        portfolioItem.addEventListener('mouseenter', () => {
            portfolioItem.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        portfolioItem.addEventListener('mouseleave', () => {
            portfolioItem.style.transform = 'translateY(0) scale(1)';
        });
        
        portfolioGrid.appendChild(portfolioItem);
    });
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
 * Initialize portfolio animations - DISABLED
 */
function initPortfolioAnimations() {
    // Animation disabled - elements appear immediately
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        // Remove any animation classes and make visible immediately
        item.classList.remove('animate-fade-in-up');
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
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
    if (item.isCarousel && item.carouselImages) {
        // Show carousel
        lightboxCarousel.style.display = 'block';
        lightboxImage.style.display = 'none';
        
        // Generate carousel HTML
        lightboxCarousel.innerHTML = `
            <div class="carousel-track">
                ${item.carouselImages.map((img, idx) => `
                    <div class="carousel-slide ${idx === 0 ? 'active' : ''}">
                        <img src="${img}" alt="${item.title} - Image ${idx + 1}" loading="lazy">
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
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScrollTo(target);
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', debounce(() => {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, 10));
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

/**
 * Initialize scroll animations - DISABLED
 */
function initScrollAnimations() {
    // Animation disabled - elements appear immediately
    const animatedElements = document.querySelectorAll('.contact-info, .contact-form');
    
    animatedElements.forEach(element => {
        // Remove any animation classes and make visible immediately
        element.classList.remove('animate-fade-in-up');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
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
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.style.background = '#666';
        
        try {
            // Send data to server
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Success state
                submitButton.textContent = 'Message Sent! ✓';
                submitButton.style.background = '#4CAF50';
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form after delay
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                    form.reset();
                }, 3000);
                
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            
            // Error state
            submitButton.textContent = 'Error - Try Again';
            submitButton.style.background = '#f44336';
            
            showNotification('Failed to send message. Please try again.', 'error');
            
            // Reset button after delay
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
        }
    });
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// ========================================
// LAZY LOADING
// ========================================

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
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
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize the website
 */
function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    try {
        // Generate portfolio items
        generatePortfolioItems();
        
        // Initialize other functionality
        initNavigation();
        initPortfolioAnimations();
        initLightbox();
        initScrollAnimations();
        initParallax();
        initContactForm();
        initLazyLoading();
        handleResponsiveChanges();
        
        // Add loaded class for CSS animations
        document.body.classList.add('loaded');
        
        console.log('VAHAN PHOTOS website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
}

// Auto-initialize
init();
