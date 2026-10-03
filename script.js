// ============================================================
// Mobile Navigation Toggle
// ============================================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================================
// Navbar scroll effect
// ============================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '';
    }
});

// ============================================================
// Smooth scrolling with navbar offset
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 68;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ============================================================
// Active navigation link highlighting
// ============================================================
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveSection, { passive: true });
highlightActiveSection();

// ============================================================
// Intersection Observer — fade-in on scroll
// ============================================================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('section, .project-card, .skill-flip-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    fadeObserver.observe(el);
});

// ============================================================
// Profile photo — subtle mouse tracking
// ============================================================
const profilePhoto = document.querySelector('.profile-photo');

if (profilePhoto) {
    profilePhoto.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
        this.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.04)`;
    });

    profilePhoto.addEventListener('mouseleave', function () {
        // Let CSS animation take over again
        this.style.transform = '';
    });
}

// ============================================================
// Orbit icon interactions
// ============================================================
const orbitIconTransforms = {
    'orbit-1': 'translate(-50%, -50%)',
    'orbit-2': 'translate(-50%, 50%)',
    'orbit-3': 'translate(50%, -50%)',
    'orbit-4': 'translate(-50%, -50%)',
    'orbit-5': 'translate(50%, -50%)',
    'orbit-6': 'translate(-50%, 50%)',
    'orbit-7': 'translate(-50%, 50%)',
    'orbit-8': 'translate(-50%, -50%)',
    'orbit-9': 'translate(50%, 50%)'
};

document.querySelectorAll('.orbit-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        const orbit = this.closest('.orbit');
        if (orbit) {
            const key = [...orbit.classList].find(c => c.startsWith('orbit-'));
            const base = orbitIconTransforms[key] || '';
            this.style.transform = base + ' scale(1.25)';
        }
        this.style.zIndex = '50';
    });

    icon.addEventListener('mouseleave', function () {
        const orbit = this.closest('.orbit');
        if (orbit) {
            const key = [...orbit.classList].find(c => c.startsWith('orbit-'));
            this.style.transform = orbitIconTransforms[key] || '';
        }
        this.style.zIndex = '';
    });
});

// ============================================================
// Entrance animation for orbit icons
// ============================================================
const iconObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = orbitIconTransforms[
                    [...entry.target.closest('.orbit').classList].find(c => c.startsWith('orbit-'))
                ] || '';
            }, index * 80);
            iconObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.orbit-icon').forEach(icon => {
    icon.style.opacity = '0';
    icon.style.transition = 'opacity 0.4s ease, transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease';
    iconObserver.observe(icon);
});

// ============================================================
// Theme Toggle — Dark / Light Mode
// ============================================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const html        = document.documentElement;

function applyTheme(theme) {
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        html.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
    localStorage.setItem('madcloud-theme', theme);
}

// Initialise from saved preference (attribute may already be set by inline script)
(function initTheme() {
    var saved = localStorage.getItem('madcloud-theme');
    if (saved === 'dark') {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
})();

themeToggle.addEventListener('click', () => {
    var isDark = html.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
});

// ============================================================
// Console greeting
// ============================================================
console.log('%c👋 Welcome to my portfolio!', 'color: #6366f1; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS & JavaScript', 'color: #6b7280; font-size: 13px;');
console.log('%cDeployed on AWS S3 + CloudFront', 'color: #10b981; font-size: 13px;');

// ============================================================
// Skills — 3D Flip Cards
// ============================================================
document.querySelectorAll('.skill-flip-card').forEach(card => {
    // Click / tap
    card.addEventListener('click', () => toggleFlip(card));

    // Keyboard: Enter or Space
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFlip(card);
        }
    });
});

function toggleFlip(card) {
    const isFlipped = card.classList.toggle('flipped');
    card.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
}
