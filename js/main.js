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

    // Global reduced motion preference check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==========================================================================
    // SCROLL PROGRESS INDICATOR
    // ==========================================================================
    const progressLine = document.querySelector('.scroll-progress');
    const footer = document.querySelector('.main-footer');

    if (progressLine && footer) {
        const updateProgress = () => {
            const scrolled = window.scrollY;
            const viewportHeight = window.innerHeight;
            const footerTop = footer.offsetTop;

            // Max scroll point is when footer top reaches viewport bottom
            const maxScroll = footerTop - viewportHeight;

            // Calculate progress (0 to 1) based on scroll position
            const progress = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 1;

            // Line height grows from 0 to viewport height based on progress
            const lineHeight = progress * viewportHeight;

            progressLine.style.height = `${Math.max(0, lineHeight)}px`;
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress, { passive: true });
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
    // HERO IMAGE CAROUSEL
    // ==========================================================================
    const heroCarousel = document.querySelector('.hero-carousel');

    if (heroCarousel) {
        const pictures = heroCarousel.querySelectorAll('.hero-picture');
        let currentIndex = 0;
        const intervalTime = 8000; // 8 seconds per image

        const showNextImage = () => {
            pictures[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % pictures.length;
            pictures[currentIndex].classList.add('active');
        };

        // Run carousel (works even with reduced motion since transition handles smoothness)
        if (pictures.length > 1) {
            setInterval(showNextImage, intervalTime);
        }
    }

    // ==========================================================================
    // MAGNETIC BUTTON EFFECT
    // ==========================================================================
    const magneticBtn = document.querySelector('.btn-magnetic');

    if (magneticBtn) {
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
        const fabTop = document.querySelector('.fab-top');

        const toggleMenu = () => {
            const isActive = hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', isActive.toString());
            mobileMenu.setAttribute('aria-hidden', (!isActive).toString());
            hamburger.setAttribute('aria-label', isActive ? 'Zamknij menu' : 'Otwórz menu');

            // Prevent body scroll when menu is open (using class for stronger lock)
            document.documentElement.classList.toggle('mobile-menu-active', isActive);

            // Hide scroll-to-top FAB when menu is open
            if (fabTop) {
                fabTop.classList.toggle('menu-hidden', isActive);
            }
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
    // TECH GALLERY - LOAD MORE
    // ==========================================================================
    const techGallery = document.getElementById('tech-gallery');
    const btnLoadMore = document.getElementById('btn-load-more');

    if (techGallery && btnLoadMore) {
        btnLoadMore.addEventListener('click', () => {
            // Toggle expanded state
            techGallery.classList.add('expanded');

            // Update ARIA
            btnLoadMore.setAttribute('aria-expanded', 'true');

            // Hide button with animation
            const btnContainer = btnLoadMore.closest('.tech-gallery__more');
            if (btnContainer) {
                btnContainer.style.opacity = '0';
                setTimeout(() => {
                    btnContainer.style.display = 'none';
                }, 300);
            }

            // Re-trigger reveal animation for newly visible cards
            const hiddenCards = techGallery.querySelectorAll('.tech-card:not(.visible)');
            hiddenCards.forEach((card, i) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, i * 100);
            });
        });
    }

    // ==========================================================================
    // FORM HANDLING
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formNotification = document.getElementById('form-notification');

    if (contactForm) {
        // Phone number validation regex (Polish format)
        const phoneRegex = /^(\+48)?[\s-]?(\d{2,3})[\s-]?(\d{3})[\s-]?(\d{2,3})[\s-]?(\d{2})?$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Show notification helper
        const showNotification = (type, message) => {
            if (!formNotification) return;

            formNotification.className = 'form-notification show ' + type;
            formNotification.innerHTML = `
                <span class="form-notification-icon">${type === 'success' ? '✓' : '!'}</span>
                <span>${message}</span>
            `;

            // Auto-hide after 5 seconds
            setTimeout(() => {
                formNotification.classList.remove('show');
            }, 5000);
        };

        // Clear field error
        const clearFieldError = (input) => {
            input.classList.remove('error');
            const errorEl = input.parentElement.querySelector('.input-error');
            if (errorEl) errorEl.style.display = 'none';
        };

        // Show field error
        const showFieldError = (input, message) => {
            input.classList.add('error');
            let errorEl = input.parentElement.querySelector('.input-error');
            if (!errorEl) {
                errorEl = document.createElement('span');
                errorEl.className = 'input-error';
                input.parentElement.appendChild(errorEl);
            }
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        };

        // Clear errors on input
        contactForm.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => clearFieldError(input));
        });

        // Clear error on RODO checkbox change
        const rodoInput = contactForm.querySelector('#rodo');
        if (rodoInput) {
            rodoInput.addEventListener('change', () => {
                rodoInput.classList.remove('error');
            });
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const phone = formData.get('phone')?.trim();

            let isValid = true;

            // Validate name
            const nameInput = contactForm.querySelector('#name');
            if (!name || name.length < 2) {
                showFieldError(nameInput, 'Wprowadź imię i nazwisko');
                isValid = false;
            }

            // Validate email
            const emailInput = contactForm.querySelector('#email');
            if (emailInput && email && !emailRegex.test(email)) {
                showFieldError(emailInput, 'Nieprawidłowy format email');
                isValid = false;
            }

            // Validate phone
            const phoneInput = contactForm.querySelector('#phone');
            if (!phone) {
                showFieldError(phoneInput, 'Wprowadź numer telefonu');
                isValid = false;
            } else if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                showFieldError(phoneInput, 'Nieprawidłowy format numeru');
                isValid = false;
            }

            // Validate RODO checkbox
            const rodoCheckbox = contactForm.querySelector('#rodo');
            if (rodoCheckbox && !rodoCheckbox.checked) {
                rodoCheckbox.classList.add('error');
                isValid = false;
            }

            if (!isValid) {
                showNotification('error', 'Popraw błędy w formularzu.');
                return;
            }

            // Placeholder for form submission
            // In production, this would send data to a backend
            console.log('Form submitted:', { name, email, phone, rodo: true });

            // Show success message
            showNotification('success', 'Dziękujemy za zgłoszenie! Skontaktujemy się w ciągu 24h.');

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

    // ==========================================================================
    // FLOATING ACTION BUTTONS (SCROLL TO TOP)
    // ==========================================================================
    const fabTop = document.querySelector('.fab-top');

    if (fabTop) {
        // Show/hide scroll-to-top button based on scroll position
        const toggleFabVisibility = () => {
            const scrollThreshold = 400;
            if (window.scrollY > scrollThreshold) {
                fabTop.classList.add('visible');
            } else {
                fabTop.classList.remove('visible');
            }
        };

        // Initial check
        toggleFabVisibility();

        // Listen for scroll events (throttled via requestAnimationFrame)
        let fabTicking = false;
        window.addEventListener('scroll', () => {
            if (!fabTicking) {
                requestAnimationFrame(() => {
                    toggleFabVisibility();
                    fabTicking = false;
                });
                fabTicking = true;
            }
        });

        // Scroll to top on click
        fabTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });
    }
});
