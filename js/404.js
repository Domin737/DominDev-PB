/**
 * PATRYK.BARABACH - 404 Error Page
 * Blueprint Error Animation Sequence
 *
 * Professional engineering-style error visualization
 * with technical readouts and animated diagnostics.
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        searchDuration: 2500,      // Fake search duration in ms
        barAnimationSpeed: 30,     // Progress bar update interval
        logMessages: [
            'SEARCHING_RESOURCE...',
            'PATH_NOT_FOUND...',
            'CHECKING_REDIRECTS...',
            'VERIFYING_CACHE...',
            'ERROR_CONFIRMED'
        ],
        logInterval: 500           // Time between log messages
    };

    // DOM Elements
    let errorVisual, errorBar, errorBarFill, systemLog, pathDisplay;
    let currentProgress = 0;
    let logIndex = 0;

    /**
     * Initialize error page
     */
    function init() {
        // Get DOM elements
        errorVisual = document.querySelector('.error-visual');
        errorBar = document.querySelector('.error-bar');
        errorBarFill = document.querySelector('.error-bar-fill');
        systemLog = document.querySelector('.system-log');
        pathDisplay = document.querySelector('.path-display');

        // Display current path
        if (pathDisplay) {
            const path = window.location.pathname || '/unknown';
            pathDisplay.textContent = path.length > 30
                ? '...' + path.slice(-27)
                : path;
        }

        // Start visual animations
        if (errorVisual) {
            errorVisual.classList.add('animating');
        }

        // Start progress bar animation
        startProgressAnimation();

        // Start system log sequence
        startLogSequence();
    }

    /**
     * Animate progress bar (fake search)
     */
    function startProgressAnimation() {
        if (!errorBarFill) return;

        const targetProgress = 100;
        const duration = CONFIG.searchDuration;
        const startTime = Date.now();

        function updateBar() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / duration) * 100, targetProgress);

            // Ease-out effect
            const easedProgress = easeOutQuad(progress / 100) * 100;

            errorBarFill.style.width = easedProgress + '%';
            currentProgress = easedProgress;

            if (progress < targetProgress) {
                requestAnimationFrame(updateBar);
            } else {
                // Complete - show error state
                errorBarFill.style.width = '100%';
            }
        }

        requestAnimationFrame(updateBar);
    }

    /**
     * Easing function
     */
    function easeOutQuad(t) {
        return t * (2 - t);
    }

    /**
     * Cycle through system log messages
     */
    function startLogSequence() {
        if (!systemLog) return;

        function nextLog() {
            if (logIndex >= CONFIG.logMessages.length) {
                logIndex = CONFIG.logMessages.length - 1;
                return;
            }

            // Flicker effect
            systemLog.style.opacity = '0.3';

            setTimeout(() => {
                systemLog.textContent = CONFIG.logMessages[logIndex];
                systemLog.style.opacity = '1';
                logIndex++;

                if (logIndex < CONFIG.logMessages.length) {
                    setTimeout(nextLog, CONFIG.logInterval);
                }
            }, 50);
        }

        // Start with first message
        systemLog.textContent = CONFIG.logMessages[0];
        logIndex = 1;

        setTimeout(nextLog, CONFIG.logInterval);
    }

    /**
     * Check for reduced motion preference
     */
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
