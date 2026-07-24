/* ==========================================================================
   FLAT TROUBLESHOOTER & SUPPORT TUTORIALS MODULE V3
   ========================================================================== */

const TroubleshooterModule = (function() {
    'use strict';

    function init() {
        renderWifiBandGuide();
        renderIXCFlow();
        renderScenarios();
        initInteractiveWizard();
    }

    // Renderizar Guia Comparativo Wi-Fi 2.4GHz vs 5GHz
    function renderWifiBandGuide() {
        const container = document.getElementById('wifiBandGuideContainer');
        if (!container) return;

        const data = SUPPORT_TUTORIALS_DATA.wifiBandGuide;
        const bandsHtml = data.bands.map(b => `
            <div style="flex: 1; min-width: 280px; background: var(--bg-subtle); border-radius: 10px; padding: 18px; border: 1px solid var(--border-flat);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                    <h4 style="font-size: 15px; font-weight: 800; color: var(--text-heading);">${b.name}</h4>
                    <span class="badge ${b.badgeType}">${b.badge}</span>
                </div>
                <ul style="font-size: 13.5px; color: var(--text-muted); list-style: none; display: flex; flex-direction: column; gap: 8px;">
                    <li><i class="fas fa-tachometer-alt" style="color: var(--primary);"></i> <strong style="color: var(--text-heading);">Velocidade Máxima:</strong> ${b.speedCap}</li>
                    <li><i class="fas fa-expand-arrows-alt" style="color: var(--primary);"></i> <strong style="color: var(--text-heading);">Alcance & Cobertura:</strong> ${b.range}</li>
                    <li><i class="fas fa-signal" style="color: var(--primary);"></i> <strong style="color: var(--text-heading);">Interferência:</strong> ${b.interference}</li>
                    <li><i class="fas fa-bullseye" style="color: var(--primary);"></i> <strong style="color: var(--text-heading);">Recomendado Para:</strong> ${b.bestFor}</li>
                </ul>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="flat-section" style="border-left: 4px solid var(--cyan);">
                <div class="flat-header-row">
                    <h3 class="flat-title"><i class="fas fa-wifi" style="color: var(--cyan);"></i> ${data.title}</h3>
                    <span class="badge badge-wifi-6">Wi-Fi Dual Band</span>
                </div>
                <p style="font-size: 14.5px; color: var(--text-muted); margin-bottom: 16px;">${data.summary}</p>
                <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                    ${bandsHtml}
                </div>
            </div>
        `;
    }

    // Renderizar o Roteiro do IXC ERP
    function renderIXCFlow() {
        const ixcContainer = document.getElementById('ixcAuthorizationContainer');
        if (!ixcContainer) return;

        const data = SUPPORT_TUTORIALS_DATA.ixcAuthorizationFlow;
        const stepsHtml = data.steps.map(s => `
            <li class="step-item">
                <span class="step-num">${s.num}</span>
                <div class="step-body">
                    <div class="step-title">${s.title}</div>
                    <div class="step-desc">${s.desc}</div>
                </div>
            </li>
        `).join('');

        ixcContainer.innerHTML = `
            <div class="flat-section">
                <div class="flat-header-row">
                    <h2 class="flat-title"><i class="fas fa-check-circle"></i> ${data.title}</h2>
                    <span class="path">${data.menuPath}</span>
                </div>
                <p style="font-size: 14.5px; color: var(--text-muted); margin-bottom: 20px;">${data.summary}</p>
                <ul class="step-list">
                    ${stepsHtml}
                </ul>
            </div>
        `;
    }

    // Renderizar os Tutoriais de Situações de Suporte (Sem VoIP)
    function renderScenarios() {
        const container = document.getElementById('supportScenariosContainer');
        if (!container) return;

        container.innerHTML = SUPPORT_TUTORIALS_DATA.scenarios.map(scen => {
            const badgeClass = scen.severity === 'danger' ? 'badge-danger' : (scen.severity === 'warning' ? 'badge-warning' : 'badge-primary');
            const symptomsList = scen.symptoms.map(sym => `<li>${sym}</li>`).join('');
            const checklistList = scen.checklist.map(chk => `<li><i class="fas fa-check-square" style="color: var(--primary);"></i> ${chk}</li>`).join('');
            const wifiBadge = scen.wifiTag ? `<span class="badge badge-wifi-5g" style="margin-left: 8px;">${scen.wifiTag}</span>` : '';

            return `
                <div class="accordion-item">
                    <button class="accordion-header" onclick="this.nextElementSibling.classList.toggle('active')">
                        <span><i class="fas fa-wrench" style="margin-right: 10px;"></i> ${scen.title} ${wifiBadge}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="accordion-content">
                        <div style="margin-bottom: 16px;">
                            <h4 style="font-size: 12.5px; font-weight: 800; color: var(--text-heading); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Sintomas Relatados:</h4>
                            <ul style="font-size: 14px; color: var(--text-muted); padding-left: 20px; line-height: 1.5;">
                                ${symptomsList}
                            </ul>
                        </div>
                        <div style="margin-bottom: 16px; background: var(--bg-surface); padding: 14px; border-radius: 8px; border: 1px solid var(--border-flat);">
                            <h4 style="font-size: 12.5px; font-weight: 800; color: var(--text-heading); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Checklist de Triagem Rápida:</h4>
                            <ul style="font-size: 13.5px; color: var(--text-body); list-style: none; display: flex; flex-direction: column; gap: 6px;">
                                ${checklistList}
                            </ul>
                        </div>
                        <div>
                            <h4 style="font-size: 12.5px; font-weight: 800; color: var(--text-heading); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Procedimento de Solução:</h4>
                            <div style="font-size: 14px; color: var(--text-body); line-height: 1.6; white-space: pre-line; background: var(--bg-surface); padding: 14px; border-radius: 8px; border: 1px solid var(--border-flat);">
                                ${scen.resolutionProcedure}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Simulador Interativo do Suporte
    function initInteractiveWizard() {
        const selectSymptom = document.getElementById('wizardSymptomSelect');
        const outputResult = document.getElementById('wizardOutput');

        if (!selectSymptom || !outputResult) return;

        selectSymptom.addEventListener('change', function() {
            const val = this.value;
            if (!val) {
                outputResult.style.display = 'none';
                return;
            }

            let title = "", steps = "";

            if (val === 'wifi-slow') {
                title = "Lentidão Wi-Fi: Frequência 2.4GHz Presa ou Incompatível";
                steps = "1. Verifique se o smartphone do cliente está conectado no Wi-Fi '5G'.\n2. Explique que o 2.4GHz atinge no máximo 70 Mega devido à interferência de redes vizinhas.\n3. Separe as redes nas configurações da ONT: crie 'NomeRede_2.4G' e 'NomeRede_5G'.";
            } else if (val === 'los-red') {
                title = "Luz LOS Vermelha Acesa / Rompimento de Drop Óptico";
                steps = "1. Cabo drop óptico quebrado na rua ou conector SC/APC solto na ONT.\n2. Verifique se o cordão amarelo foi dobrado no móvel.\n3. Ação: Encaminhar Ordem de Serviço de Reparo de Fibra.";
            } else if (val === 'pon-flash') {
                title = "Luz PON Piscando sem Parar";
                steps = "1. ONT tentando sincronizar com a OLT mas o sinal está fraco.\n2. Verifique se o conector verde SC/APC está totalmente encaixado.\n3. Limpe a ponta do conector com álcool isopropílico ou abra OS para atenuação em CTO.";
            } else if (val === 'mac-lock') {
                title = "Erro de Autenticação PPPoE / Trava de MAC (Port-Limit-Reached)";
                steps = "1. No IXC Provedor › Logins, clique em 'Limpar MAC / Desconectar'.\n2. Peça ao cliente para desligar o roteador da tomada por 30 segundos.\n3. Ao ligar novamente, a sessão PPPoE autenticará normalmente.";
            }

            outputResult.style.display = 'block';
            outputResult.innerHTML = `
                <div style="background: var(--primary-light); padding: 16px; border-radius: 8px; border: 1px solid rgba(37, 99, 235, 0.2); margin-top: 14px;">
                    <h4 style="font-size: 15px; font-weight: 800; color: var(--primary); margin-bottom: 6px;"><i class="fas fa-stethoscope"></i> Diagnóstico: ${title}</h4>
                    <p style="font-size: 14px; color: var(--text-body); white-space: pre-line; line-height: 1.6;">${steps}</p>
                </div>
            `;
        });
    }

    return { init: init };
})();
