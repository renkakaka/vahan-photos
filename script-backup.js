/**
 * Modern Architecture Portfolio Website
 * Interactive features, smooth animations, and responsive design
 */

// ========================================
// GLOBAL VARIABLES
// ========================================
let isScrolling = false;
let scrollTimeout;
let currentImageIndex = 0;
let portfolioItems = [];

// Portfolio data with local images
const portfolioData = [
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
    }
];

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
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
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
// PORTFOLIO FUNCTIONS
// ========================================

/**
 * Generate portfolio grid items
 */
function generatePortfolioItems() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = '';
    
    portfolioData.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-index', index);
        portfolioItem.setAttribute('data-category', item.category.toLowerCase());
        
        // Set grid row span based on size
        if (item.size === 'large') {
            portfolioItem.style.gridRow = 'span 2';
        }
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
            <div class="portfolio-overlay">
                <h3 class="portfolio-title">${item.title}</h3>
                <span class="portfolio-category">${item.category}</span>
            </div>
        `;
        
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
        portfolioItems.push(portfolioItem);
    });
}

/**
 * Initialize portfolio animations
 */
function initPortfolioAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1}s`;
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    portfolioItems.forEach(item => {
        observer.observe(item);
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
    
    if (!lightbox) return;
    
    currentImageIndex = index;
    
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
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
        currentImageIndex = portfolioData.length - 1;
    } else if (currentImageIndex >= portfolioData.length) {
        currentImageIndex = 0;
    }
    
    const item = portfolioData[currentImageIndex];
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
}

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
// SCROLL ANIMATIONS
// ========================================

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-stats .stat, .contact-info, .contact-form');
    
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
// FORM HANDLING
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
// PERFORMANCE OPTIMIZATIONS
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

/**
 * Initialize performance monitoring
 */
function initPerformanceMonitoring() {
    // Monitor scroll performance
    let scrollCount = 0;
    const scrollHandler = debounce(() => {
        scrollCount++;
        if (scrollCount % 10 === 0) {
            console.log(`Scroll performance: ${scrollCount} events processed`);
        }
    }, 16); // ~60fps
    
    window.addEventListener('scroll', scrollHandler);
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
// INITIALIZATION
// ========================================

/**
 * Initialize all functionality
 */
function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    try {
        // Initialize all modules
        initNavigation();
        generatePortfolioItems();
        initPortfolioAnimations();
        initLightbox();
        initScrollAnimations();
        initParallax();
        initContactForm();
        initLazyLoading();
        initPerformanceMonitoring();
        handleResponsiveChanges();
        
        // Add loaded class for CSS animations
        document.body.classList.add('loaded');
        
        console.log('Architecture Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// ========================================
// EXPORT FOR EXTERNAL USE
// ========================================
window.ArchitecturePortfolio = {
    init,
    openLightbox,
    closeLightbox,
    navigateLightbox,
    smoothScrollTo
};

// Auto-initialize
init();
