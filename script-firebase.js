/**
 * VAHAN PHOTOS - Main Website with Firebase Integration
 * Loads photos dynamically from Firebase Storage
 */

// Firebase configuration (same as admin panel)
const firebaseConfig = {
    apiKey: "AIzaSyBgRc30Ete_e04pbwTNXvr-N6zGiEmGLMM",
    authDomain: "vahan-photos.firebaseapp.com",
    projectId: "vahan-photos",
    storageBucket: "vahan-photos.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const db = firebase.firestore();
const storage = firebase.storage();

// Global variables
let portfolioItems = [];
let isLoading = true;

// ========================================
// FIREBASE FUNCTIONS
// ========================================

/**
 * Load photos from Firebase
 */
async function loadPhotosFromFirebase() {
    try {
        console.log('Loading photos from Firebase...');
        
        const snapshot = await db.collection('photos')
            .orderBy('uploadedAt', 'desc')
            .get();
        
        portfolioItems = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            portfolioItems.push({
                id: doc.id,
                title: data.filename || 'Untitled',
                category: 'Photography',
                description: 'Professional architectural photography',
                image: data.url,
                size: Math.random() > 0.5 ? 'large' : 'medium' // Random size for variety
            });
        });
        
        console.log(`Loaded ${portfolioItems.length} photos from Firebase`);
        
        // Generate portfolio items
        generatePortfolioItems();
        
        // Initialize animations
        initPortfolioAnimations();
        
        isLoading = false;
        
    } catch (error) {
        console.error('Error loading photos from Firebase:', error);
        
        // Fallback to local images if Firebase fails
        console.log('Falling back to local images...');
        loadLocalImages();
    }
}

/**
 * Fallback to local images
 */
function loadLocalImages() {
    const localImages = [
        { id: 1, title: "Modern Residence", category: "Residential", description: "Contemporary single-family home", image: "img/1.jpg", size: "large" },
        { id: 2, title: "Glass Pavilion", category: "Commercial", description: "Transparent office building", image: "img/2.jpg", size: "medium" },
        { id: 3, title: "Curved Facade", category: "Cultural", description: "Museum extension", image: "img/3.jpg", size: "large" },
        { id: 4, title: "Urban Loft", category: "Residential", description: "Industrial conversion", image: "img/4.jpg", size: "medium" },
        { id: 5, title: "Concrete Tower", category: "Commercial", description: "High-rise office building", image: "img/5.jpg", size: "large" },
        { id: 6, title: "Minimalist House", category: "Residential", description: "Clean geometric design", image: "img/6.jpg", size: "medium" },
        { id: 7, title: "Cultural Center", category: "Cultural", description: "Multi-purpose venue", image: "img/7.jpg", size: "large" },
        { id: 8, title: "Waterfront Villa", category: "Residential", description: "Luxury home", image: "img/8.jpg", size: "medium" },
        { id: 9, title: "Steel Structure", category: "Commercial", description: "Innovative office complex", image: "img/9.jpg", size: "large" },
        { id: 10, title: "Garden Pavilion", category: "Cultural", description: "Temporary exhibition space", image: "img/10.jpg", size: "medium" },
        { id: 11, title: "Sky Bridge", category: "Infrastructure", description: "Pedestrian connection", image: "img/11.jpg", size: "large" },
        { id: 12, title: "Cantilever House", category: "Residential", description: "Dramatic overhang design", image: "img/12.jpg", size: "medium" },
        { id: 13, title: "Art Gallery", category: "Cultural", description: "Contemporary exhibition space", image: "img/13.jpg", size: "large" },
        { id: 14, title: "Modular Office", category: "Commercial", description: "Adaptable workspace", image: "img/14.jpg", size: "medium" },
        { id: 15, title: "Floating House", category: "Residential", description: "Water-based residence", image: "img/15.jpg", size: "large" },
        { id: 16, title: "Concrete Block", category: "Commercial", description: "Monolithic office building", image: "img/16.jpg", size: "medium" },
        { id: 17, title: "Green Roof", category: "Sustainable", description: "Eco-friendly building", image: "img/17.jpg", size: "large" },
        { id: 18, title: "Glass House", category: "Residential", description: "Transparent residence", image: "img/18.jpg", size: "medium" },
        { id: 19, title: "Cultural Hub", category: "Cultural", description: "Community center", image: "img/19.jpg", size: "large" },
        { id: 20, title: "Modern Library", category: "Educational", description: "Contemporary learning space", image: "img/20.jpg", size: "medium" }
    ];
    
    portfolioItems = localImages;
    generatePortfolioItems();
    initPortfolioAnimations();
    isLoading = false;
}

// ========================================
// PORTFOLIO FUNCTIONS (Updated for Firebase)
// ========================================

/**
 * Generate portfolio grid items
 */
function generatePortfolioItems() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = '';
    
    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-index', index);
        portfolioItem.setAttribute('data-category', item.category.toLowerCase());
        
        // Set grid row span based on size
        if (item.size === 'large') {
            portfolioItem.style.gridRow = 'span 2';
        }
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" onerror="handleImageError(this)">
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
    
    const portfolioItems = document.querySelectorAll('.portfolio-item');
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
        // Load photos from Firebase
        loadPhotosFromFirebase();
        
        // Initialize other functionality
        initNavigation();
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

// Include other functions from original script.js
// (Navigation, scroll animations, parallax, contact form, etc.)
// These would be copied from the original script.js file

// Auto-initialize
init();
