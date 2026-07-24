/* ==========================================================================
   TR-069 GUIDE RENDERER MODULE V3 (FLAT LAYOUT + PDF & PRINT)
   ========================================================================== */

const TR069GuideModule = (function() {
    'use strict';

    function init() {
        const selectorContainer = document.getElementById('tr069ModelTabs');
        const contentContainer = document.getElementById('tr069ModelContent');
        const alertContainer = document.getElementById('tr069GlobalAlert');

        if (!selectorContainer || !contentContainer) return;

        // Renderizar Alerta Global
        if (alertContainer && TR069_EQUIPMENT_DATA.globalAlert) {
            alertContainer.innerHTML = `
                <div class="flat-section" style="border-left: 4px solid var(--warning); background: var(--warning-light);">
                    <div style="display: flex; gap: 14px; align-items: flex-start;">
                        <i class="fas fa-exclamation-triangle" style="color: var(--warning); font-size: 20px; margin-top: 2px;"></i>
                        <div>
                            <h3 style="font-weight: 800; font-size: 15px; color: var(--text-heading); margin-bottom: 4px;">${TR069_EQUIPMENT_DATA.globalAlert.title}</h3>
                            <p style="font-size: 14px; color: var(--text-muted); line-height: 1.5;">${TR069_EQUIPMENT_DATA.globalAlert.description}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // Renderizar Botões de Abas dos Modelos
        selectorContainer.innerHTML = TR069_EQUIPMENT_DATA.models.map((model, idx) => `
            <button class="model-tab-btn ${idx === 0 ? 'active' : ''}" data-model-id="${model.id}">
                <i class="fas ${model.icon}"></i> ${model.name}
            </button>
        `).join('');

        // Renderizar Conteúdo dos Modelos em Estrutura Flat
        contentContainer.innerHTML = TR069_EQUIPMENT_DATA.models.map((model, idx) => {
            const stepsHtml = model.steps.map(s => `
                <li class="step-item">
                    <span class="step-num">${s.num}</span>
                    <div class="step-body">
                        <div class="step-title">${s.title}</div>
                        <div class="step-desc">${s.desc}</div>
                    </div>
                </li>
            `).join('');

            const tipHtml = model.tip ? `
                <div style="margin-top: 14px; font-size: 13px; color: var(--text-muted); display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-info-circle" style="color: var(--primary);"></i> ${model.tip}
                </div>
            ` : '';

            return `
                <div id="model-${model.id}" class="model-content-pane ${idx === 0 ? 'active' : ''}" style="display: ${idx === 0 ? 'block' : 'none'};">
                    <div class="flat-section">
                        <div class="flat-header-row">
                             <h2 class="flat-title"><i class="fas ${model.icon}"></i> ${model.name}</h2>
                             <span class="badge badge-primary"><i class="fas fa-file-alt"></i> ${model.pages}</span>
                         </div>

                        <div style="margin-bottom: 20px; font-size: 14px; color: var(--text-muted); display: flex; flex-direction: column; gap: 6px;">
                            <p><strong style="color: var(--text-heading);">Modelos compatíveis:</strong> ${model.compatModels}</p>
                            <p><strong style="color: var(--text-heading);">Caminho da WAN:</strong> <span class="path">${model.wanPath}</span></p>
                            <p><strong style="color: var(--text-heading);">Caminho do ACS:</strong> <span class="path">${model.acsPath}</span></p>
                        </div>

                        <ul class="step-list" style="margin-bottom: 24px;">
                            ${stepsHtml}
                        </ul>

                        <h3 style="font-size: 14.5px; font-weight: 800; color: var(--text-heading); margin-bottom: 10px;">Parâmetros do Servidor ACS:</h3>
                        <div class="parameters-table">
                            <div class="param-row">
                                <span class="param-label">ACS URL</span>
                                <span class="param-value">${TR069_EQUIPMENT_DATA.commonParams.acsUrl}</span>
                                <button class="btn-copy" data-copy="${TR069_EQUIPMENT_DATA.commonParams.acsUrl}"><i class="fas fa-copy"></i> Copiar</button>
                            </div>
                            <div class="param-row">
                                <span class="param-label">ACS User Name</span>
                                <span class="param-value">${TR069_EQUIPMENT_DATA.commonParams.acsUser}</span>
                                <button class="btn-copy" data-copy="${TR069_EQUIPMENT_DATA.commonParams.acsUser}"><i class="fas fa-copy"></i> Copiar</button>
                            </div>
                            <div class="param-row">
                                <span class="param-label">ACS Password</span>
                                <span class="param-value">${TR069_EQUIPMENT_DATA.commonParams.acsPass}</span>
                                <button class="btn-copy" data-copy="${TR069_EQUIPMENT_DATA.commonParams.acsPass}"><i class="fas fa-copy"></i> Copiar</button>
                            </div>
                            <div class="param-row">
                                <span class="param-label">Conn. Request User</span>
                                <span class="param-value">${TR069_EQUIPMENT_DATA.commonParams.connReqUser}</span>
                                <button class="btn-copy" data-copy="${TR069_EQUIPMENT_DATA.commonParams.connReqUser}"><i class="fas fa-copy"></i> Copiar</button>
                            </div>
                            <div class="param-row">
                                <span class="param-label">Conn. Request Pass</span>
                                <span class="param-value">${TR069_EQUIPMENT_DATA.commonParams.connReqPass}</span>
                                <button class="btn-copy" data-copy="${TR069_EQUIPMENT_DATA.commonParams.connReqPass}"><i class="fas fa-copy"></i> Copiar</button>
                            </div>
                            <div class="param-row">
                                <span class="param-label">Periodic Inform Interval</span>
                                <span class="param-value">${TR069_EQUIPMENT_DATA.commonParams.informInterval}</span>
                                <button class="btn-copy" data-copy="${TR069_EQUIPMENT_DATA.commonParams.informInterval}"><i class="fas fa-copy"></i> Copiar</button>
                            </div>
                        </div>

                        ${tipHtml}
                    </div>
                </div>
            `;
        }).join('');

        // Eventos de clique nas abas de modelo
        const modelBtns = selectorContainer.querySelectorAll('.model-tab-btn');
        modelBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-model-id');
                modelBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                document.querySelectorAll('.model-content-pane').forEach(pane => {
                    if (pane.id === `model-${targetId}`) {
                        pane.style.display = 'block';
                    } else {
                        pane.style.display = 'none';
                    }
                });
            });
        });

        // Handlers de PDF e Impressão
        initPdfAndPrintActions();
    }

    function initPdfAndPrintActions() {
        const btnPdf = document.getElementById('btnDownloadPdf');
        const btnPrint = document.getElementById('btnPrintGuide');

        if (btnPdf) {
            btnPdf.addEventListener('click', function() {
                const pdfFile = 'TR-069_MANUAL.pdf';
                const tempLink = document.createElement('a');
                tempLink.href = pdfFile;
                tempLink.download = 'TR-069_MANUAL.pdf';
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            });
        }

        if (btnPrint) {
            btnPrint.addEventListener('click', function() {
                window.print();
            });
        }
    }

    return { init: init };
})();
