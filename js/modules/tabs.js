/* ==========================================================================
   TAB NAVIGATION MODULE V3
   ========================================================================== */

const TabsModule = (function() {
    'use strict';

    const SECTION_TITLES = {
        'tab-tr069': { 
            title: '<i class="fas fa-sliders-h" style="color: var(--primary);"></i> Parâmetros & Guia TR-069', 
            subtitle: 'Especificações de gerência unificada por modelo de ONT e Roteador.' 
        },
        'tab-suporte': { 
            title: '<i class="fas fa-headset" style="color: var(--primary);"></i> Tutoriais & Wi-Fi Dual Band', 
            subtitle: 'Guia de frequência 2.4GHz vs 5GHz, diagnósticos avançados e solução de problemas.' 
        },
        'tab-provedor': { 
            title: '<i class="fas fa-network-wired" style="color: var(--primary);"></i> Autorização de ONUs IXC ERP', 
            subtitle: 'Roteiro de 6 etapas para provisionamento de ONUs na OLT.' 
        },
        'tab-calculadora': { 
            title: '<i class="fas fa-tools" style="color: var(--primary);"></i> Calculadoras Ópticas & IP', 
            subtitle: 'Orçamento de enlace óptico (Link Budget), validador de sub-rede IP e medidor de sinal RX.' 
        }
    };

    function init() {
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
        const tabSections = document.querySelectorAll('.tab-section');
        const titleElem = document.getElementById('sectionTitle');
        const subtitleElem = document.getElementById('sectionSubtitle');

        function switchSection(targetId) {
            navLinks.forEach(link => {
                const linkTarget = link.getAttribute('data-tab');
                link.classList.toggle('active', linkTarget === targetId);
            });

            mobileNavBtns.forEach(btn => {
                const btnTarget = btn.getAttribute('data-tab');
                btn.classList.toggle('active', btnTarget === targetId);
            });

            tabSections.forEach(section => {
                section.classList.toggle('active', section.id === targetId);
            });

            if (SECTION_TITLES[targetId] && titleElem && subtitleElem) {
                titleElem.innerHTML = SECTION_TITLES[targetId].title;
                subtitleElem.textContent = SECTION_TITLES[targetId].subtitle;
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('data-tab');
                if (target) switchSection(target);
            });
        });

        mobileNavBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('data-tab');
                if (target) switchSection(target);
            });
        });
    }

    return { init: init };
})();
