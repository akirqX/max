/* ==========================================================================
   THEME SWITCHER MODULE
   ========================================================================== */

const ThemeModule = (function() {
    'use strict';

    const STORAGE_KEY = 'maximidia_theme_preference';

    function init() {
        const desktopBtn = document.getElementById('themeToggleBtn');
        const mobileBtn = document.getElementById('mobileThemeBtn');
        const body = document.body;

        function applyTheme(isDark) {
            if (isDark) {
                body.classList.add('dark-mode');
                if (desktopBtn) desktopBtn.innerHTML = '<i class="fas fa-sun"></i> Tema Claro';
                if (mobileBtn) mobileBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                body.classList.remove('dark-mode');
                if (desktopBtn) desktopBtn.innerHTML = '<i class="fas fa-moon"></i> Tema Escuro';
                if (mobileBtn) mobileBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
            localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
        }

        const savedTheme = localStorage.getItem(STORAGE_KEY);
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        applyTheme(shouldBeDark);

        if (desktopBtn) {
            desktopBtn.addEventListener('click', function() {
                applyTheme(!body.classList.contains('dark-mode'));
            });
        }

        if (mobileBtn) {
            mobileBtn.addEventListener('click', function() {
                applyTheme(!body.classList.contains('dark-mode'));
            });
        }
    }

    return { init: init };
})();
