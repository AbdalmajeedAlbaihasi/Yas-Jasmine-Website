// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all category cards and product cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.category-card, .product-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Add hover effects for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.add('clicked');
            setTimeout(() => {
                card.classList.remove('clicked');
            }, 200);
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation
    document.body.classList.add('loaded');

    // Initialize modal functionality
    initializeModal();
});

// Modal functionality for product details
function initializeModal() {
    // Create modal HTML
    const modalHTML = `
        <div id="productModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="modal-body">
                    <img id="modalImage" src="" alt="">
                    <div class="modal-info">
                        <h2 id="modalTitle"></h2>
                        <p id="modalDescription"></p>
                        <div class="modal-actions">
                            <a href="https://wa.me/+966550936364" target="_blank" class="contact-btn whatsapp">
                                <i class="fab fa-whatsapp"></i>
                                اطلب عبر الواتساب
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Get modal elements
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.close');

    // Add event listeners to all view buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const title = button.getAttribute('data-title');
            const description = button.getAttribute('data-description');
            const image = button.closest('.product-card').querySelector('img');
            
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalImage.src = image.src;
            modalImage.alt = title;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Add sparkle effect on hover
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkles on category card hover
document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.category-card');
    if (card && Math.random() > 0.9) {
        createSparkle(e.clientX, e.clientY);
    }
});



// Floating Hearts Animation
function createFloatingHeart() {
    const heartsContainer = document.getElementById('floatingHearts');
    if (!heartsContainer) return;
    
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 2000);

// Sparkle Trail Effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-trail';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Enhanced Category Card Interactions
document.addEventListener('DOMContentLoaded', () => {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.05)';
            card.style.boxShadow = '0 25px 50px rgba(139, 92, 246, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Typewriter effect for hero description
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        typewriterElement.style.borderRight = '2px solid #8b5cf6';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typewriterElement.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Enhanced shimmer effect for links
    const shimmerElements = document.querySelectorAll('.shimmer');
    shimmerElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('shimmer');
        });
    });
});

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Enhanced ripple effect
document.querySelectorAll('.ripple').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(139, 92, 246, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

