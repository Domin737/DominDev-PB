/**
 * PATRYK.BARABACH - Precision Preloader
 * Blueprint Initialization Sequence
 *
 * Professional engineering-style loading animation
 * with technical readouts and CAD-like visuals.
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        minDisplayTime: 2500,    // Minimum display time in ms
        fadeOutDelay: 400,       // Delay before fade out after 100%
        progressSteps: [12, 28, 45, 67, 85, 100], // Progress milestones
        stepDelayMin: 400,       // Min delay between steps
        stepDelayMax: 800        // Max delay between steps
    };

    // System log messages (engineering-style)
    const SYSTEM_LOGS = [
        'INIT_SYSTEM_CORE...',
        'LOADING_ASSETS...',
        'CALIBRATING_GRID...',
        'RENDERING_COMPONENTS...',
        'OPTIMIZING_LAYOUT...',
        'VERIFYING_INTEGRITY...',
        'SYSTEM_READY'
    ];

    // DOM Elements
    let preloader, visual, progressFill, percentDisplay, systemLog;
    let currentProgress = 0;
    let targetProgress = 0;
    let stepIndex = 0;
    let startTime;
    let animationFrame;

    /**
     * Initialize preloader
     */
    function init() {
        preloader = document.getElementById('preloader');
        if (!preloader) return;

        // Lock scroll and hide scrollbar
        document.documentElement.classList.add('preloader-active');

        visual = preloader.querySelector('.loader-visual');
        progressFill = preloader.querySelector('.progress-fill');
        percentDisplay = preloader.querySelector('.progress-percent');
        systemLog = preloader.querySelector('.system-log');

        startTime = Date.now();

        // Start animations
        if (visual) {
            visual.classList.add('animating');
        }

        // Start progress sequence
        startProgressSequence();

        // Start render loop
        animationFrame = requestAnimationFrame(updateProgress);

        // Listen for page load
        window.addEventListener('load', onPageLoad);
    }

    /**
     * Progress step sequence
     */
    function startProgressSequence() {
        advanceStep();
    }

    /**
     * Advance to next progress step
     */
    function advanceStep() {
        if (stepIndex >= CONFIG.progressSteps.length) return;

        targetProgress = CONFIG.progressSteps[stepIndex];

        // Update system log with glitch effect
        if (systemLog && SYSTEM_LOGS[stepIndex]) {
            updateSystemLog(SYSTEM_LOGS[stepIndex]);
        }

        stepIndex++;

        // Schedule next step (random delay for natural feel)
        if (stepIndex < CONFIG.progressSteps.length) {
            const delay = CONFIG.stepDelayMin +
                Math.random() * (CONFIG.stepDelayMax - CONFIG.stepDelayMin);
            setTimeout(advanceStep, delay);
        }
    }

    /**
     * Update system log with typing effect
     */
    function updateSystemLog(message) {
        if (!systemLog) return;

        // Brief flicker effect
        systemLog.style.opacity = '0.3';

        setTimeout(() => {
            systemLog.textContent = message;
            systemLog.style.opacity = '1';
        }, 50);
    }

    /**
     * Smooth progress update (runs every frame)
     */
    function updateProgress() {
        // Ease towards target (smooth interpolation)
        const diff = targetProgress - currentProgress;
        currentProgress += diff * 0.08;

        // Update UI
        if (progressFill) {
            progressFill.style.width = currentProgress + '%';
        }

        if (percentDisplay) {
            // Engineering-style decimal formatting
            percentDisplay.textContent = currentProgress.toFixed(1) + '%';
        }

        // Continue animation
        if (currentProgress < 99.9) {
            animationFrame = requestAnimationFrame(updateProgress);
        } else {
            // Reached 100%
            if (progressFill) progressFill.style.width = '100%';
            if (percentDisplay) percentDisplay.textContent = '100.0%';
            updateSystemLog(SYSTEM_LOGS[SYSTEM_LOGS.length - 1]);
        }
    }

    /**
     * Handle page load complete
     */
    function onPageLoad() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, CONFIG.minDisplayTime - elapsed);

        // Ensure minimum display time, then complete
        setTimeout(() => {
            // Jump to 100% if not already there
            targetProgress = 100;

            // Wait for animation to complete, then hide
            setTimeout(hidePreloader, CONFIG.fadeOutDelay);
        }, remaining);
    }

    /**
     * Hide preloader with transition
     */
    function hidePreloader() {
        if (!preloader) return;

        // Cancel animation frame
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }

        // Add hidden class (CSS handles transition)
        preloader.classList.add('is-hidden');
        preloader.setAttribute('aria-hidden', 'true');

        // Remove from DOM after transition
        setTimeout(() => {
            // Unlock scroll and restore scrollbar
            document.documentElement.classList.remove('preloader-active');

            if (preloader && preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }

            // Dispatch custom event for other scripts
            document.dispatchEvent(new CustomEvent('preloaderComplete'));
        }, 800);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
