/**
 * i18n Module - Multilingual support for static HTML
 * Supports: PL (default), EN, NL
 */
const I18n = (function() {
    'use strict';

    const SUPPORTED_LANGS = ['pl', 'en', 'nl'];
    const DEFAULT_LANG = 'pl';
    const STORAGE_KEY = 'preferredLanguage';
    const VERSION = '1.0';

    let translations = {};
    let currentLang = DEFAULT_LANG;
    let isInitialized = false;

    /**
     * Get language from URL query param, localStorage, or browser preference
     */
    function detectLanguage() {
        // 1. Check URL param
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && SUPPORTED_LANGS.includes(urlLang)) {
            return urlLang;
        }

        // 2. Check localStorage
        const storedLang = localStorage.getItem(STORAGE_KEY);
        if (storedLang && SUPPORTED_LANGS.includes(storedLang)) {
            return storedLang;
        }

        // 3. Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (SUPPORTED_LANGS.includes(browserLang)) {
            return browserLang;
        }

        return DEFAULT_LANG;
    }

    /**
     * Load translation file
     */
    async function loadTranslation(lang) {
        try {
            // Use relative path (without leading slash) to work with any base URL
            const response = await fetch(`i18n/${lang}.json?v=${VERSION}`);
            if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
            return await response.json();
        } catch (error) {
            console.error(`i18n: Error loading ${lang}:`, error);
            if (lang !== DEFAULT_LANG) {
                console.log(`i18n: Falling back to ${DEFAULT_LANG}`);
                return loadTranslation(DEFAULT_LANG);
            }
            return {};
        }
    }

    /**
     * Get nested value from object by dot-notation key
     */
    function getNestedValue(obj, key) {
        return key.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : null, obj);
    }

    /**
     * Apply translations to all marked elements
     */
    function applyTranslations() {
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = getNestedValue(translations, key);
            if (value) {
                el.textContent = value;
            }
        });

        // Update HTML content (for elements with markup)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            const value = getNestedValue(translations, key);
            if (value) {
                el.innerHTML = value;
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const value = getNestedValue(translations, key);
            if (value) {
                el.setAttribute('placeholder', value);
            }
        });

        // Update aria-labels
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            const value = getNestedValue(translations, key);
            if (value) {
                el.setAttribute('aria-label', value);
            }
        });

        // Update lists (ul/ol with data-i18n-list)
        document.querySelectorAll('[data-i18n-list]').forEach(el => {
            const key = el.getAttribute('data-i18n-list');
            const value = getNestedValue(translations, key);
            if (value && Array.isArray(value)) {
                el.innerHTML = value.map(item => `<li>${item}</li>`).join('');
            }
        });

        // Update document title
        if (translations.meta && translations.meta.title) {
            document.title = translations.meta.title;
        }

        // Update html lang attribute
        document.documentElement.lang = currentLang;

        // Update meta tags
        updateMetaTags();

        // Update URL without reload
        updateURL();

        // Update language switcher state
        updateLangSwitcher();

        // Mark as ready (removes FOUC)
        document.body.classList.add('i18n-ready');
    }

    /**
     * Update meta tags with translations
     */
    function updateMetaTags() {
        const meta = translations.meta;
        if (!meta) return;

        // Description
        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta && meta.description) {
            descMeta.setAttribute('content', meta.description);
        }

        // OG tags
        if (meta.og) {
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle && meta.og.title) ogTitle.setAttribute('content', meta.og.title);

            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc && meta.og.description) ogDesc.setAttribute('content', meta.og.description);
        }

        // og:locale
        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale && meta.locale) ogLocale.setAttribute('content', meta.locale);

        // Twitter tags
        const twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle && meta.og && meta.og.title) twTitle.setAttribute('content', meta.og.title);

        const twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc && meta.og && meta.og.description) twDesc.setAttribute('content', meta.og.description);

        // Canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            const baseUrl = 'https://patryk-barabach.pl';
            const path = window.location.pathname;
            if (currentLang === DEFAULT_LANG) {
                canonical.href = baseUrl + path;
            } else {
                canonical.href = `${baseUrl}${path}?lang=${currentLang}`;
            }
        }
    }

    /**
     * Update URL with language param (without page reload)
     */
    function updateURL() {
        const url = new URL(window.location);
        if (currentLang === DEFAULT_LANG) {
            url.searchParams.delete('lang');
        } else {
            url.searchParams.set('lang', currentLang);
        }
        history.replaceState({}, '', url);
    }

    /**
     * Update language switcher UI state
     */
    function updateLangSwitcher() {
        // Update current language display (old dropdown style)
        document.querySelectorAll('.lang-switch__current').forEach(el => {
            el.textContent = currentLang.toUpperCase();
        });

        // Update aria-selected states in dropdown (old style)
        document.querySelectorAll('.lang-switch__dropdown button[data-lang]').forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === currentLang;
            btn.setAttribute('aria-selected', isActive.toString());
            btn.classList.toggle('is-active', isActive);
        });

        // Update inline toggle buttons (new style - hero coords, footer)
        document.querySelectorAll('.lang-toggle[data-lang]').forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === currentLang;
            btn.setAttribute('aria-pressed', isActive.toString());
            btn.classList.toggle('is-active', isActive);
        });

        // Update FAB language display
        document.querySelectorAll('.fab-lang-current').forEach(el => {
            el.textContent = currentLang.toUpperCase();
        });

        // Update FAB dropdown buttons
        document.querySelectorAll('.fab-lang-dropdown button[data-lang]').forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === currentLang;
            btn.classList.toggle('is-active', isActive);
        });

    }

    /**
     * Switch to a new language
     */
    async function setLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) return;

        // Skip if already on this language (but still update UI state)
        if (lang === currentLang) {
            updateLangSwitcher();
            return;
        }

        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);

        translations = await loadTranslation(lang);
        applyTranslations();

        // Dispatch custom event for other scripts
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { lang: currentLang }
        }));
    }

    /**
     * Initialize dropdown toggle behavior
     */
    function initDropdowns() {
        // Old dropdown style (if still present)
        document.querySelectorAll('.lang-switch').forEach(switcher => {
            const toggle = switcher.querySelector('.lang-switch__toggle');
            const dropdown = switcher.querySelector('.lang-switch__dropdown');

            if (!toggle || !dropdown) return;

            // Toggle dropdown on click
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = switcher.classList.contains('is-open');

                // Close all other dropdowns first
                document.querySelectorAll('.lang-switch.is-open').forEach(s => {
                    s.classList.remove('is-open');
                    s.querySelector('.lang-switch__toggle').setAttribute('aria-expanded', 'false');
                });

                if (!isOpen) {
                    switcher.classList.add('is-open');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });

            // Handle language selection
            dropdown.querySelectorAll('button[data-lang]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const lang = btn.getAttribute('data-lang');
                    setLanguage(lang);

                    // Close dropdown
                    switcher.classList.remove('is-open');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });

            // Keyboard navigation
            switcher.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    switcher.classList.remove('is-open');
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }
            });
        });

        // New inline toggle buttons (hero coords, footer)
        document.querySelectorAll('.lang-toggle[data-lang]').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                setLanguage(lang);
            });
        });

        // FAB language button
        const fabLangContainer = document.querySelector('.fab-lang-container');
        const fabLang = document.querySelector('.fab-lang');
        const fabLangDropdown = document.querySelector('.fab-lang-dropdown');

        if (fabLang && fabLangDropdown) {
            // Toggle FAB dropdown
            fabLang.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = fabLangContainer.classList.contains('is-open');

                if (isOpen) {
                    fabLangContainer.classList.remove('is-open');
                    fabLang.setAttribute('aria-expanded', 'false');
                    fabLangDropdown.setAttribute('aria-hidden', 'true');
                } else {
                    fabLangContainer.classList.add('is-open');
                    fabLang.setAttribute('aria-expanded', 'true');
                    fabLangDropdown.setAttribute('aria-hidden', 'false');
                }
            });

            // Handle FAB dropdown language selection
            fabLangDropdown.querySelectorAll('button[data-lang]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const lang = btn.getAttribute('data-lang');
                    setLanguage(lang);

                    // Close FAB dropdown
                    fabLangContainer.classList.remove('is-open');
                    fabLang.setAttribute('aria-expanded', 'false');
                    fabLangDropdown.setAttribute('aria-hidden', 'true');
                });
            });

            // Keyboard navigation for FAB
            fabLangContainer.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && fabLangContainer.classList.contains('is-open')) {
                    fabLangContainer.classList.remove('is-open');
                    fabLang.setAttribute('aria-expanded', 'false');
                    fabLangDropdown.setAttribute('aria-hidden', 'true');
                    fabLang.focus();
                }
            });
        }

        // Close all dropdowns when clicking outside
        document.addEventListener('click', () => {
            // Close old dropdowns
            document.querySelectorAll('.lang-switch.is-open').forEach(s => {
                s.classList.remove('is-open');
                const toggle = s.querySelector('.lang-switch__toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            });

            // Close FAB dropdown
            if (fabLangContainer && fabLangContainer.classList.contains('is-open')) {
                fabLangContainer.classList.remove('is-open');
                if (fabLang) fabLang.setAttribute('aria-expanded', 'false');
                if (fabLangDropdown) fabLangDropdown.setAttribute('aria-hidden', 'true');
            }
        });
    }

    /**
     * Initialize i18n system
     */
    async function init() {
        if (isInitialized) return;

        currentLang = detectLanguage();
        translations = await loadTranslation(currentLang);
        applyTranslations();
        initDropdowns();

        isInitialized = true;
    }

    // Public API
    return {
        init,
        setLanguage,
        getCurrentLang: () => currentLang,
        t: (key) => getNestedValue(translations, key) || key,
        getSupportedLangs: () => [...SUPPORTED_LANGS]
    };
})();

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => I18n.init());
} else {
    I18n.init();
}
