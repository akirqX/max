/* ==========================================================================
   SUPPORT TUTORIALS AND TROUBLESHOOTING SCENARIOS DATA (REIMAGINED V2)
   ========================================================================== */

const SUPPORT_TUTORIALS_DATA = {
    // 1) Roteiro Completo de Autorização no IXC ERP
    ixcAuthorizationFlow: {
        title: "Roteiro Completo: Autorização de ONU no IXC Provedor",
        menuPath: "Provedor › Autorizar ONUs",
        summary: "Guia passo a passo de 6 etapas para o suporte provisionar ONUs fisicamente conectadas à OLT MaxiMídia.",
        steps: [
            {
                num: 1,
                title: "Acessar a Tela de Autorização",
                desc: "No sistema IXC ERP, navegue até o menu Provedor › Autorizar ONUs. Esta tela exibe todas as ONUs detectadas pela OLT que ainda não foram associadas a um contrato de assinante."
            },
            {
                num: 2,
                title: "Identificar a ONU Física",
                desc: "Localize o equipamento correto pelo Serial Number (GPON Serial no formato NKIA..., HWTC..., TPLK...) impresso na etiqueta da ONU ou pelo endereço MAC. Confirme a porta PON correspondente (ex: OLT-01 PON 0/1:2)."
            },
            {
                num: 3,
                title: "Vincular ao Cadastro do Assinante",
                desc: "No campo Login, digite o nome de usuário PPPoE ativo do cliente. Esta ação cria o vínculo permanente entre o dispositivo físico na fibra e o contrato no Radius."
            },
            {
                num: 4,
                title: "Configurar Perfis de Banda e VLANs",
                desc: "Selecione o Perfil de Velocidade contratado (ex: 300M_DOWNLOAD_150M_UPLOAD) e garanta que as VLANs necessárias estejam marcadas (VLAN Internet e VLAN TR-069)."
            },
            {
                num: 5,
                title: "Enviar Autorização SNMP para a OLT",
                desc: "Clique no botão Autorizar. O IXC executará os comandos SNMP para a OLT. O status da ONU na interface mudará de 'Desconhecida/Inconsistente' para 'Autorizada'."
            },
            {
                num: 6,
                title: "Validar Sincronismo e Sinal Óptico",
                desc: "Abra a aba de Diagnóstico do Login no IXC, confirme que a conexão PPPoE estabeleceu IP e verifique se a potência RX está dentro da faixa aceitável (-15dBm a -24.5dBm)."
            }
        ]
    },

    // 2) Guia Comparativo Especializado: Wi-Fi 2.4GHz vs 5GHz
    wifiBandGuide: {
        title: "Guia Diagnóstico: Wi-Fi 2.4GHz vs Wi-Fi 5GHz (Dual Band)",
        summary: "Entenda as limitações físicas de cada frequência para orientar o cliente e resolver reclamações de lentidão no Wi-Fi.",
        bands: [
            {
                name: "Frequência 2.4 GHz",
                badge: "2.4GHz",
                badgeType: "badge-wifi-2g",
                speedCap: "Até 50 - 90 Mbps (na prática)",
                range: "Maior Alcance (atravessa paredes e barreiras)",
                interference: "Alta (poluída por redes vizinhas, micro-ondas, Bluetooth)",
                bestFor: "Navegação básica, redes sociais, dispositivos IoT (câmeras, lâmpadas inteligentes), locais distantes do roteador."
            },
            {
                name: "Frequência 5 GHz",
                badge: "5GHz",
                badgeType: "badge-wifi-5g",
                speedCap: "Até 600 - 950 Mbps (ultra-rápida)",
                range: "Menor Alcance (sofre alta atenuação em paredes de alvenaria)",
                interference: "Baixa (canais mais largos de 40MHz/80MHz e menos poluídos)",
                bestFor: "Jogos online, streamings 4K, testes de velocidade do plano de banda, Smart TVs e celulares modernos no mesmo ambiente do roteador."
            }
        ]
    },

    // 3) Enciclopédia Diversificada de Situações de Suporte (Sem VoIP)
    scenarios: [
        {
            id: "wifi-5g-versus-2g",
            title: "Lentidão no Wi-Fi: Dispositivo Preso na Frequência 2.4GHz",
            severity: "warning",
            wifiTag: "5GHz x 2.4GHz",
            symptoms: [
                "Cliente contratou 300 Mega mas o teste no celular não passa de 50 ou 70 Mega.",
                "Smartphone ou Smart TV conectado na rede de 2.4GHz em vez da 5GHz.",
                "Instabilidade no Wi-Fi ao ir para cômodos distantes."
            ],
            checklist: [
                "Verificar se o celular/notebook do cliente possui suporte a Wi-Fi Dual Band (5GHz).",
                "Conferir se os SSIDs de 2.4GHz e 5GHz estão unificados (Band Steering/Smart Connect) ou separados (ex: 'Rede_2.4G' e 'Rede_5G').",
                "Conferir se a largura de canal do 5GHz está em 80MHz na ONU."
            ],
            resolutionProcedure: "1. Explique ao cliente que a frequência 2.4GHz possui limite físico de velocidade (máximo ~70 Mbps na prática devido à interferência).\n2. Separe os nomes das redes no roteador/ONU: crie 'NomeRede_2.4G' e 'NomeRede_5G'.\n3. Oriente o cliente a conectar seus celulares modernos, notebooks e Smart TVs exclusivamente na rede 'NomeRede_5G' ficando no mesmo cômodo ou com linha de visão do roteador.\n4. Deixe dispositivos IoT (câmeras, lâmpadas) na rede 2.4G."
        },
        {
            id: "high-attenuation-rx",
            title: "Sinal Óptico Atenuado / Potência RX Fraca (-24.5 dBm a -28 dBm)",
            severity: "warning",
            symptoms: [
                "Status da ONU no IXC indicando sinal fraco (-25.8 dBm).",
                "Instabilidade em momentos de chuva ou vento na rede externa.",
                "Luz PON oscilando ocasionalmente."
            ],
            checklist: [
                "Verificar a leitura da potência RX na OLT via comando ou no IXC ERP.",
                "Verificar se o conector SC/APC verde está solto ou sujo.",
                "Conferir se o cordão óptico amarelo (patch cord) está dobrado na casa do cliente."
            ],
            resolutionProcedure: "1. Solicite ao cliente para verificar se o cabo óptico amarelo fino que entra na ONT está esticado reto ou se foi esmagado atrás de móveis.\n2. Oriente o cliente a desconectar suavemente o plugue verde SC/APC e reconectá-lo até ouvir um clique firme.\n3. Se o sinal lido no IXC continuar pior do que -24.5 dBm, abra Ordem de Serviço para técnico de campo realizar fusão ou substituição do drop óptico."
        },
        {
            id: "los-red-drop-broken",
            title: "Perda Total de Sinal Óptico (Luz LOS Vermelha / Rompimento de Drop)",
            severity: "danger",
            symptoms: [
                "Luz LOS acesa em vermelho fixo ou piscando na ONU.",
                "ONU inacessível via gerência e login PPPoE com status Offline.",
                "Queda repentina após tempestade ou poda de árvores na rua."
            ],
            checklist: [
                "Verificar se outras ONUs da mesma CTO / porta PON também caíram (rompimento geral).",
                "Verificar se o cabo drop que vem do poste foi cortado ou esticado por caminhão."
            ],
            resolutionProcedure: "1. Se o LED LOS estiver VERMELHO, a ONT física deixou de receber os fótons de luz do laser da OLT.\n2. Consulte a OLT: se várias ONUs da mesma CTO caíram juntas, acione o plantão de rede externa para reparo do cabo de fibra da rua.\n3. Se for um caso isolado do cliente, abra OS prioritária de Reparo de Drop/Conector de Campo."
        },
        {
            id: "pppoe-mac-lock",
            title: "Falha de Autenticação PPPoE & Trava de MAC (Port-Limit-Reached)",
            severity: "danger",
            symptoms: [
                "Cliente substituiu o roteador próprio por um modelo Mesh/Wi-Fi 6 e não navega.",
                "Log do Radius exibindo erro 'Port-Limit-Reached' ou 'Authentication-Failure'.",
                "Diagnóstico no IXC indica login não estabelecido."
            ],
            checklist: [
                "Conferir usuário e senha PPPoE cadastrados no IXC.",
                "Verificar se o MAC do roteador antigo permaneceu ativo na tabela do Radius."
            ],
            resolutionProcedure: "1. No IXC ERP › Provedor › Logins, busque o login do cliente e clique na opção 'Limpar MAC / Desconectar Login'.\n2. Aguarde 15 segundos para o servidor Radius purgar a sessão antiga.\n3. Solicite que o cliente desligue seu roteador da tomada por 30 segundos e religue em seguida para forçar novo handshake PPPoE."
        },
        {
            id: "double-nat-ip-conflict",
            title: "Conflito de IP e Duplo NAT (Roteador Próprio em Modo Router na LAN da ONU)",
            severity: "warning",
            symptoms: [
                "Cliente conectou um segundo roteador e alguns sites/jogos não abrem.",
                "Consoles de videogame (PlayStation/Xbox) acusando 'NAT Estrito / NAT Tipo 3'.",
                "Faixa de IP da ONU (192.168.1.1) conflitando com o roteador (192.168.1.1)."
            ],
            checklist: [
                "Verificar em qual porta do segundo roteador a ONU foi conectada (WAN vs LAN).",
                "Verificar se a ONU está operando em modo Router e o roteador secundário também em modo Router."
            ],
            resolutionProcedure: "1. Altere o roteador secundário do cliente para o modo 'Ponto de Acesso' (Access Point / AP) ou 'Bridge', desativando o servidor DHCP dele.\n2. Caso o cliente queira usar seu próprio roteador em modo Router, coloque a porta LAN da ONU em Bridge ou configure DMZ direcionado para o IP WAN do roteador dele."
        },
        {
            id: "power-supply-instability",
            title: "Quedas Intermitentes por Oscilação da Fonte de Alimentação da ONU",
            severity: "warning",
            symptoms: [
                "Conexão cai e volta várias vezes ao dia em horários aleatórios.",
                "Luzes da ONU apagam completamente por alguns segundos e reiniciam.",
                "Extrato de conexões no IXC mostra mais de 30 reconexões diárias."
            ],
            checklist: [
                "Verificar o tempo de uptime da ONT (se a ONT está reiniciando do zero).",
                "Conferir se a fonte de alimentação 12V 1A/1.5A está muito quente ou ruidosa.",
                "Verificar se a tomada da casa do cliente possui adaptadores tipo 'T' (benjamim) frouxos."
            ],
            resolutionProcedure: "1. Acesse os logs do IXC: se a desconexão for marcada como 'NAS-Reboot' ou se a ONT zerar o tempo de ligado (Uptime), o problema é elétrico.\n2. Oriente o cliente a ligar a ONU diretamente em uma tomada de parede exclusiva sem benjamins.\n3. Se persistir reiniciando, envie um técnico para realizar a substituição da fonte de alimentação da ONT."
        },
        {
            id: "financial-suspension",
            title: "Redirecionamento para Tela de Aviso Financeiro / Suspensão IXC",
            severity: "danger",
            symptoms: [
                "Cliente tenta navegar e é redirecionado para a página de aviso de bloqueio.",
                "Status da conexão no Radius autenticando na VLAN de Bloqueio.",
                "Cliente relata ter efetuado o pagamento via PIX recentemente."
            ],
            checklist: [
                "Conferir o status financeiro do contrato no IXC (Financeiro › Faturas).",
                "Verificar se o pagamento já foi compensado no banco ou via PIX automático."
            ],
            resolutionProcedure: "1. No IXC ERP, verifique o contrato do cliente. Se a fatura constar como pendente mas o cliente já pagou, solicite o comprovante.\n2. Utilize o recurso 'Desbloqueio de Confiança / Promessa de Pagamento' no cadastro do cliente no IXC para liberar a navegação imediatamente por 48 horas até a compensação bancária."
        },
        {
            id: "iot-wpa3-incompatibility",
            title: "Incompatibilidade de Câmeras e Dispositivos IoT com Wi-Fi WPA3",
            severity: "primary",
            symptoms: [
                "Câmeras de segurança Wi-Fi, lâmpadas inteligentes ou Smart TVs antigas não encontram a rede Wi-Fi da ONT.",
                "Celulares novos conectam normal, mas dispositivos inteligentes não aceitam a senha."
            ],
            checklist: [
                "Verificar a criptografia Wi-Fi configurada na ONT (WPA3-SAE vs WPA2-PSK).",
                "Verificar se a rede de 2.4GHz está ativa e isolada para dispositivos IoT."
            ],
            resolutionProcedure: "1. Acesse as configurações de Wi-Fi da ONT via TR-069 ou interface local.\n2. Mude o modo de segurança do Wi-Fi de 'WPA3 / WPA2-Personal' para 'WPA2-PSK (AES)', que possui 100% de compatibilidade com dispositivos IoT e câmeras de segurança antigas."
        },
        {
            id: "building-power-outage",
            title: "Queda de Energia no Prédio / Falta de Energia na CTO",
            severity: "danger",
            symptoms: [
                "Vários clientes do mesmo prédio/condomínio ficaram sem internet simultaneamente.",
                "OStatus da ONU indica LOS ou 'Offline' em todos os clientes daquela CTO."
            ],
            checklist: [
                "Verificar se há relato de queda de energia na região através do sistema de monitoramento.",
                "Checar se o condomínio possui energia mas a CTO externa está desligada."
            ],
            resolutionProcedure: "1. Confirme se há queda de energia elétrica na região através do nosso sistema de monitoramento de infraestrutura.\n2. Se apenas o prédio estiver sem energia, informe ao cliente que a rede de fibra óptica do prédio depende da energia do condomínio.\n3. Se o prédio estiver com energia e a CTO sem, acione a equipe de rede externa para reparo na alimentação da CTO."
        },
        {
            id: "network-loop-cabling",
            title: "Loop de Rede por Erro de Cabling (Cabo LAN de Volta para o Roteador)",
            severity: "danger",
            symptoms: [
                "Toda a rede do cliente fica lenta ou 'congelada' mesmo com sinal óptico bom.",
                "As luzes LAN do roteador piscam freneticamente todas ao mesmo tempo.",
                "Dificuldade de navegação em todos os dispositivos simultaneamente."
            ],
            checklist: [
                "Verificar se o cliente conectou um cabo LAN que sai do roteador de volta em outra porta do mesmo roteador.",
                "Verificar se há um hub/switch antigo em loop físico."
            ],
            resolutionProcedure: "1. Instrua o cliente a remover todos os cabos de rede conectados às portas LAN do roteador.\n2. Se o problema de navegação e instabilidade sumir após remover os cabos, o problema é um loop físico.\n3. Oriente o cliente a reconectar os cabos um por um para identificar o cabo que está causando o loop."
        },
        {
            id: "ip-conflict-same-gateway",
            title: "Conflito de IP entre ONT e Roteador Secundário",
            severity: "warning",
            symptoms: [
                "Dispositivos navegam ora sim, ora não.",
                "Acesso à interface do roteador abre a página da ONT.",
                "DHCP do roteador distribuindo IPs na faixa da ONT."
            ],
            checklist: [
                "Checar a faixa de IP da ONT (ex: 192.168.1.1) e do roteador (ex: 192.168.1.1).",
                "Verificar se o roteador está em modo Router ou AP."
            ],
            resolutionProcedure: "1. Acesse o roteador secundário e altere sua faixa de IP LAN para algo diferente (ex: 192.168.10.1).\n2. Se o roteador for usado apenas para Wi-Fi, coloque-o em modo Access Point (Bridge) para que a ONT gerencie os IPs."
        },
        {
            id: "dns-resolution-failure",
            title: "Falha de Resolução de DNS (Internet funciona via IP mas não navega)",
            severity: "primary",
            symptoms: [
                "Nenhum site abre (Google, Facebook, etc).",
                "Comandos como 'ping 8.8.8.8' funcionam, mas 'ping google.com' falha.",
                "Clientes relatam que 'a internet caiu' embora o sinal óptico esteja normal."
            ],
            checklist: [
                "Verificar os servidores DNS configurados no roteador do cliente.",
                "Testar setando o DNS do Google (8.8.8.8) manualmente em um dispositivo."
            ],
            resolutionProcedure: "1. Acesse o roteador do cliente e force os servidores DNS do Google (8.8.8.8 e 8.8.4.4) em vez de usar 'Automático/ISP'.\n2. Limpe o cache DNS do dispositivo do cliente (ipconfig /flushdns no Windows).\n3. Caso o problema persista, verifique se há um servidor DNS local (ex: Pi-hole) configurado na rede do cliente."
        }
    ]
};
