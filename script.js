// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = '';
            });
            if (navLink) {
                navLink.style.color = 'var(--primary-color)';
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category, .education-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});


// Skill tags animation on hover
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Project cards tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Profile Photo and Orbiting Icons Interactivity
const profilePhoto = document.querySelector('.profile-photo');
const orbitIcons = document.querySelectorAll('.orbit-icon');
const profileWrapper = document.querySelector('.profile-photo-wrapper');

// Add mouse tracking effect to profile photo
if (profilePhoto) {
    profilePhoto.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    profilePhoto.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// Enhanced icon interactions
orbitIcons.forEach((icon, index) => {
    icon.addEventListener('mouseenter', function() {
        const orbit = this.closest('.orbit');
        if (orbit) {
            const orbitClass = orbit.className.split(' ')[1];
            const baseTransforms = {
                'orbit-1': 'translate(-50%, -50%)',
                'orbit-2': 'translate(-50%, 50%)',
                'orbit-3': 'translate(50%, -50%)',
                'orbit-4': 'translate(-50%, -50%)',
                'orbit-5': 'translate(50%, -50%)',
                'orbit-6': 'translate(-50%, 50%)'
            };
            const baseTransform = baseTransforms[orbitClass] || '';
            this.style.transform = baseTransform + ' scale(1.3)';
        }
        this.style.zIndex = '100';
        
        // Add a glow effect
        this.style.boxShadow = '0 8px 35px rgba(0, 0, 0, 0.5), 0 0 50px rgba(99, 102, 241, 0.7)';
        this.style.filter = 'brightness(1.1)';
    });
    
    icon.addEventListener('mouseleave', function() {
        // Reset transform based on orbit position
        const orbit = this.closest('.orbit');
        if (orbit) {
            const orbitClass = orbit.className.split(' ')[1];
            const transforms = {
                'orbit-1': 'translate(-50%, -50%)',
                'orbit-2': 'translate(-50%, 50%)',
                'orbit-3': 'translate(50%, -50%)',
                'orbit-4': 'translate(-50%, -50%)',
                'orbit-5': 'translate(50%, -50%)',
                'orbit-6': 'translate(-50%, 50%)'
            };
            this.style.transform = transforms[orbitClass] || '';
        }
        this.style.zIndex = '';
        this.style.boxShadow = '';
        this.style.filter = '';
    });
    
    // Add click effect
    icon.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 100);
    });
});

// Parallax effect on scroll for profile container
if (profileWrapper) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroTop = heroSection.offsetTop;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrolled >= heroTop && scrolled <= heroTop + heroHeight) {
                const parallax = (scrolled - heroTop) * 0.5;
                profileWrapper.style.transform = `translateY(${parallax}px)`;
            }
        }
    });
}

// Add entrance animation for icons
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const iconObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, index * 100);
        }
    });
}, observerOptions);

orbitIcons.forEach(icon => {
    icon.style.opacity = '0';
    icon.style.transform = 'scale(0)';
    icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    iconObserver.observe(icon);
});

// Console message
console.log('%c👋 Welcome to my portfolio!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #6b7280; font-size: 14px;');
console.log('%cDeployed on AWS S3 + CloudFront', 'color: #10b981; font-size: 14px;');

