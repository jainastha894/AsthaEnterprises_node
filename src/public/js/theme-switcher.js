// Theme Switcher for Admin Panel
(function() {
    'use strict';

    // Initialize theme from localStorage or default to light
    function initTheme() {
        const savedTheme = localStorage.getItem('adminTheme') || 'light';
        setTheme(savedTheme, false);
    }

    // Set theme
    function setTheme(theme, save = true) {
        const html = document.documentElement;
        
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }

        // Save to localStorage
        if (save) {
            localStorage.setItem('adminTheme', theme);
        }

        // Update toggle button if it exists
        updateToggleButton(theme);
    }

    // Update toggle button appearance
    function updateToggleButton(theme) {
        const toggleBtn = document.getElementById('themeToggle');
        if (!toggleBtn) return;

        const icon = toggleBtn.querySelector('.theme-icon');
        const text = toggleBtn.querySelector('.theme-text');

        if (theme === 'dark') {
            if (icon) icon.textContent = '☀️';
            if (text) text.textContent = 'Light';
            toggleBtn.setAttribute('aria-label', 'Switch to light mode');
            toggleBtn.setAttribute('title', 'Switch to light mode');
        } else {
            if (icon) icon.textContent = '🌙';
            if (text) text.textContent = 'Dark';
            toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
            toggleBtn.setAttribute('title', 'Switch to dark mode');
        }
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Attach toggle handler when button is available
    function attachToggleHandler() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
            // Update button appearance based on current theme
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            updateToggleButton(currentTheme);
        }
    }

    // Try to attach handler immediately and after DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachToggleHandler);
    } else {
        attachToggleHandler();
    }

    // Also try after a short delay to ensure button is rendered
    setTimeout(attachToggleHandler, 100);

    // Expose toggle function globally for inline onclick handlers
    window.toggleAdminTheme = toggleTheme;
})();
