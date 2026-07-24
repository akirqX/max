/* ==========================================================================
   USEFUL TOOLS MODULE V3 (OPTICAL GAUGE, LINK BUDGET & IP SUBNET VALIDATOR)
   ========================================================================== */

const CalculatorsModule = (function() {
    'use strict';

    function init() {
        initOpticalCalculatorGauge();
        initOpticalLinkBudgetCalculator();
        initIpSubnetCalculator();
        initGlobalCopyHandler();
    }

    // 1. Calculadora de Sinal Óptico RX (dBm) com Régua Visual
    function initOpticalCalculatorGauge() {
        const input = document.getElementById('opticalInputDbm');
        const badge = document.getElementById('opticalStatusBadge');
        const desc = document.getElementById('opticalDiagnosisDesc');
        const pin = document.getElementById('opticalSpectrumPin');
        const valueNum = document.getElementById('opticalValueNum');

        if (!input || !badge || !desc || !pin || !valueNum) return;

        function updateGauge() {
            const val = parseFloat(input.value);
            if (isNaN(val)) {
                badge.textContent = "Inválido";
                badge.className = "badge badge-danger";
                desc.textContent = "Digite um valor numérico válido (exemplo: -21.5).";
                valueNum.textContent = "--.--";
                return;
            }

            valueNum.textContent = val.toFixed(1);

            const clamped = Math.max(-35, Math.min(0, val));
            const percentage = ((clamped - (-35)) / (0 - (-35))) * 100;
            pin.style.left = `${percentage}%`;

            if (val >= -24.5 && val <= -15.0) {
                badge.textContent = "Excelente (Sinal Ideal)";
                badge.className = "badge badge-success";
                desc.innerHTML = `<i class="fas fa-check-circle" style="color: var(--success);"></i> Potência óptima de operação (-15 a -24.5 dBm). Fibra e conectores em ótimo estado.`;
            } else if (val < -24.5 && val >= -27.0) {
                badge.textContent = "Atenção (Sinal Fraco)";
                badge.className = "badge badge-warning";
                desc.innerHTML = `<i class="fas fa-exclamation-triangle" style="color: var(--warning);"></i> Atenuação moderada (-24.5 a -27 dBm). Verifique sujeira no conector verde SC/APC ou dobras no drop.`;
            } else if (val > -15.0 && val <= -8.0) {
                badge.textContent = "Atenção (Overload)";
                badge.className = "badge badge-warning";
                desc.innerHTML = `<i class="fas fa-exclamation-triangle" style="color: var(--warning);"></i> Sinal excessivamente forte. Considere inserir atenuador óptico.`;
            } else if (val < -27.0) {
                badge.textContent = "Crítico (Sinal Insuficiente)";
                badge.className = "badge badge-danger";
                desc.innerHTML = `<i class="fas fa-times-circle" style="color: var(--danger);"></i> Perda óptica severa (< -27 dBm). Risco de desconexões. Enviar técnico de campo.`;
            } else {
                badge.textContent = "Crítico (Saturação)";
                badge.className = "badge badge-danger";
                desc.innerHTML = `<i class="fas fa-exclamation-circle" style="color: var(--danger);"></i> Risco de dano ao fotodiodo da ONT.`;
            }
        }

        input.addEventListener('input', updateGauge);
        updateGauge();
    }

    // 2. Calculadora de Atenuação e Orçamento de Enlace Óptico (Optical Link Budget)
    function initOpticalLinkBudgetCalculator() {
        const oltTxInput = document.getElementById('budgetOltTx');
        const distanceInput = document.getElementById('budgetDistance');
        const fusionsInput = document.getElementById('budgetFusions');
        const connectorsInput = document.getElementById('budgetConnectors');
        const splitterSelect = document.getElementById('budgetSplitter');
        const resultLoss = document.getElementById('budgetResultLoss');
        const resultRx = document.getElementById('budgetResultRx');
        const resultBadge = document.getElementById('budgetResultBadge');

        if (!oltTxInput || !resultLoss || !resultRx || !resultBadge) return;

        function calculateBudget() {
            const oltTx = parseFloat(oltTxInput.value) || +5.0;
            const distance = parseFloat(distanceInput.value) || 0;
            const fusions = parseInt(fusionsInput.value, 10) || 0;
            const connectors = parseInt(connectorsInput.value, 10) || 0;
            const splitterLoss = parseFloat(splitterSelect.value) || 0;

            // Perdas padrão GPON (1310nm / 1490nm):
            // Fibra: ~0.35 dB/km
            // Fusão: 0.1 dB por fusão
            // Conector: 0.3 dB por par de conectores
            const fiberLoss = distance * 0.35;
            const fusionLoss = fusions * 0.1;
            const connectorLoss = connectors * 0.3;

            const totalInsertionLoss = fiberLoss + fusionLoss + connectorLoss + splitterLoss;
            const predictedRx = oltTx - totalInsertionLoss;

            resultLoss.textContent = `${totalInsertionLoss.toFixed(2)} dB`;
            resultRx.textContent = `${predictedRx.toFixed(2)} dBm`;

            if (predictedRx >= -24.5 && predictedRx <= -15.0) {
                resultBadge.textContent = "Sinal Previsto Ótimo";
                resultBadge.className = "badge badge-success";
            } else if (predictedRx < -24.5 && predictedRx >= -27.0) {
                resultBadge.textContent = "Atenuação No Limite";
                resultBadge.className = "badge badge-warning";
            } else if (predictedRx < -27.0) {
                resultBadge.textContent = "Enlace Com Perda Excessiva";
                resultBadge.className = "badge badge-danger";
            } else {
                resultBadge.textContent = "Sinal Muito Forte";
                resultBadge.className = "badge badge-warning";
            }
        }

        [oltTxInput, distanceInput, fusionsInput, connectorsInput, splitterSelect].forEach(elem => {
            if (elem) elem.addEventListener('input', calculateBudget);
        });

        calculateBudget();
    }

    // 3. Calculadora de Sub-rede IP & Validador de Trusted Subnet MaxiMídia
    function initIpSubnetCalculator() {
        const ipInput = document.getElementById('calcIpAddress');
        const calcBtn = document.getElementById('btnCalcIp');
        const output = document.getElementById('calcIpOutput');

        if (!ipInput || !calcBtn || !output) return;

        calcBtn.addEventListener('click', function() {
            const rawVal = ipInput.value.trim();
            if (!rawVal) return;

            // Extrai IP e CIDR (padrão /26 se não fornecido)
            let parts = rawVal.split('/');
            let ipStr = parts[0];
            let cidr = parts[1] ? parseInt(parts[1], 10) : 26;

            let ipNum = ipToInt(ipStr);
            if (ipNum === null) {
                output.innerHTML = `<span style="color: var(--danger);">Endereço IP inválido. Digite um formato correto (ex: 179.108.128.15/26).</span>`;
                return;
            }

            let maskNum = (0xFFFFFFFF << (32 - cidr)) >>> 0;
            let netNum = (ipNum & maskNum) >>> 0;
            let broadcastNum = (netNum | (~maskNum >>> 0)) >>> 0;

            let netStr = intToIp(netNum);
            let broadcastStr = intToIp(broadcastNum);
            let firstHostStr = intToIp(netNum + 1);
            let lastHostStr = intToIp(broadcastNum - 1);
            let totalHosts = Math.max(0, (broadcastNum - netNum - 1));

            // Verificar se o IP está dentro da Trusted Subnet da MaxiMídia (179.108.128.1 até 179.108.128.64)
            let isTrusted = false;
            let trustedStart = ipToInt("179.108.128.1");
            let trustedEnd = ipToInt("179.108.128.64");

            if (ipNum >= trustedStart && ipNum <= trustedEnd) {
                isTrusted = true;
            }

            const trustedBadge = isTrusted 
                ? `<span class="badge badge-success"><i class="fas fa-shield-alt"></i> IP Pertence à Faixa Confiável TR-069 MaxiMídia</span>`
                : `<span class="badge badge-warning"><i class="fas fa-exclamation-triangle"></i> IP Fora da Faixa de Gerência Confiável (179.108.128.1 - 64)</span>`;

            output.innerHTML = `
                <div style="font-size: 13.5px; color: var(--text-heading); display: flex; flex-direction: column; gap: 6px;">
                    <div style="margin-bottom: 6px;">${trustedBadge}</div>
                    <p><strong>Rede:</strong> ${netStr}/${cidr}</p>
                    <p><strong>Máscara:</strong> ${intToIp(maskNum)}</p>
                    <p><strong>Broadcast:</strong> ${broadcastStr}</p>
                    <p><strong>Faixa de IPs Úteis:</strong> ${firstHostStr} até ${lastHostStr}</p>
                    <p><strong>Total de Hosts Úteis:</strong> ${totalHosts}</p>
                </div>
            `;
        });

        function ipToInt(ip) {
            let p = ip.split('.');
            if (p.length !== 4) return null;
            let num = 0;
            for (let i = 0; i < 4; i++) {
                let n = parseInt(p[i], 10);
                if (isNaN(n) || n < 0 || n > 255) return null;
                num = (num << 8) + n;
            }
            return num >>> 0;
        }

        function intToIp(int) {
            return [
                (int >>> 24) & 255,
                (int >>> 16) & 255,
                (int >>> 8) & 255,
                int & 255
            ].join('.');
        }
    }

    // Handler de Cópia Global com Toast
    function initGlobalCopyHandler() {
        const toast = document.getElementById('globalToast');
        const toastMsg = document.getElementById('globalToastMsg');
        let timer;

        function showToast(message) {
            if (!toast || !toastMsg) return;
            toastMsg.textContent = message;
            toast.classList.add('show');
            clearTimeout(timer);
            timer = setTimeout(() => toast.classList.remove('show'), 2000);
        }

        function copyText(text) {
            if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                navigator.clipboard.writeText(text)
                    .then(() => showToast("Copiado com sucesso!"))
                    .catch(() => fallbackCopy(text));
            } else {
                fallbackCopy(text);
            }
        }

        function fallbackCopy(text) {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy');
                showToast("Copiado com sucesso!");
            } catch (e) {
                showToast("Falha ao copiar.");
            }
            document.body.removeChild(ta);
        }

        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn-copy');
            if (btn) {
                e.preventDefault();
                const text = btn.getAttribute('data-copy');
                if (text) {
                    copyText(text);
                    btn.classList.add('copied');
                    setTimeout(() => btn.classList.remove('copied'), 1500);
                }
            }
        });
    }

    return { init: init };
})();
