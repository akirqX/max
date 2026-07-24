/* ==========================================================================
   MAIN APPLICATION ENTRY POINT - MAXIMÍDIA DASHBOARD V2
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Inicializar Módulos
    ThemeModule.init();
    TabsModule.init();
    TR069GuideModule.init();
    TroubleshooterModule.init();
    CalculatorsModule.init();

    // Esconder Animação de Abertura (Splash Screen Loader) após carregamento
    setTimeout(function() {
        const splash = document.getElementById('appSplashLoader');
        if (splash) {
            splash.classList.add('hidden');
            setTimeout(() => splash.remove(), 700);
        }
    }, 1800);

    console.log('MaxiMídia Reimagined Dashboard V2 initialized successfully.');
});
