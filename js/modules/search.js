/* ==========================================================================
   GLOBAL SEARCH MODULE
   ========================================================================== */

const SearchModule = (function() {
    'use strict';

    function init() {
        const searchInput = document.getElementById('globalSearchInput');
        if (!searchInput) return;

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.card');

            if (!query) {
                cards.forEach(card => card.style.display = 'block');
                return;
            }

            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    return { init: init };
})();
