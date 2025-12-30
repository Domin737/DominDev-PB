/**
 * PRECISION ROOFING - Main JavaScript
 * Concept: "The Living Blueprint"
 *
 * Features:
 * - Scroll progress indicator
 * - Accordion (offer section)
 * - Count-up animation (statistics)
 * - Parallax effect (hero image)
 * - Magnetic button effect
 * - Reveal on scroll animations
 * - Mobile hamburger menu
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================================================
    // SCROLL PROGRESS INDICATOR
    // ==========================================================================
    const progressLine = document.querySelector('.scroll-progress');

    if (progressLine) {
        const updateProgress = () => {
            const scrolled = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const percentage = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
            progressLine.style.height = `${percentage}%`;
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // Initial call
    }

    // ==========================================================================
    // ACCORDION (OFFER SECTION)
    // ==========================================================================
    const accItems = document.querySelectorAll('.acc-item');

    accItems.forEach(item => {
        const header = item.querySelector('.acc-header');

        if (header) {
            header.addEventListener('click', () => {
                // Close other items
                accItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });

            // Keyboard accessibility
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });

            // Make header focusable
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');

            // Update aria-expanded on toggle
            const observer = new MutationObserver(() => {
                const isActive = item.classList.contains('active');
                header.setAttribute('aria-expanded', isActive.toString());
            });

            observer.observe(item, { attributes: true, attributeFilter: ['class'] });
        }
    });

    // ==========================================================================
    // COUNT-UP ANIMATION (STATISTICS)
    // ==========================================================================
    const counters = document.querySelectorAll('.count-up');

    if (counters.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-val'), 10);

                    if (isNaN(target)) return;

                    let count = 0;
                    const duration = 1500; // ms
                    const stepTime = 16; // ~60fps
                    const totalSteps = duration / stepTime;
                    const step = target / totalSteps;

                    const timer = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            el.textContent = target;
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(count);
                        }
                    }, stepTime);

                    counterObserver.unobserve(el);
                }
            });
        }, observerOptions);

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ==========================================================================
    // PARALLAX EFFECT (HERO IMAGE)
    // ==========================================================================
    const heroImg = document.querySelector('.parallax-img');

    if (heroImg) {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            let ticking = false;

            const updateParallax = () => {
                const speed = 0.3;
                const yPos = window.scrollY * speed;
                heroImg.style.transform = `translateY(${yPos}px)`;
                ticking = false;
            };

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            }, { passive: true });
        }
    }

    // ==========================================================================
    // MAGNETIC BUTTON EFFECT
    // ==========================================================================
    const magneticBtn = document.querySelector('.btn-magnetic');

    if (magneticBtn) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            magneticBtn.addEventListener('mousemove', (e) => {
                const rect = magneticBtn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                magneticBtn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            magneticBtn.addEventListener('mouseleave', () => {
                magneticBtn.style.transform = 'translate(0, 0)';
            });
        }
    }

    // ==========================================================================
    // REVEAL ON SCROLL ANIMATIONS
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal-box');

    if (revealElements.length > 0) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // If reduced motion, just show elements immediately
            revealElements.forEach(el => {
                el.classList.add('visible');
            });
        } else {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(el => revealObserver.observe(el));
        }
    }

    // ==========================================================================
    // HAMBURGER MENU (MOBILE)
    // ==========================================================================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

    if (hamburger && mobileMenu) {
        const toggleMenu = () => {
            const isActive = hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', isActive.toString());
            mobileMenu.setAttribute('aria-hidden', (!isActive).toString());
            hamburger.setAttribute('aria-label', isActive ? 'Zamknij menu' : 'Otwórz menu');

            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
        };

        hamburger.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMenu();
                hamburger.focus();
            }
        });

        // Close menu when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // ==========================================================================
    // FORM HANDLING
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const phone = formData.get('phone');

            // Basic validation
            if (!name || !phone) {
                alert('Proszę wypełnić wszystkie pola.');
                return;
            }

            // Placeholder for form submission
            // In production, this would send data to a backend
            console.log('Form submitted:', { name, phone });

            // Show success message
            alert('Dziękujemy za zgłoszenie! Skontaktujemy się w ciągu 24h.');

            // Reset form
            contactForm.reset();
        });
    }

    // ==========================================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const navHeight = document.querySelector('.nav-mix')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
