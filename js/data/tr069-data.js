/* ==========================================================================
   TR-069 EQUIPMENT PARAMETERS DATA REGISTRY V3
   ========================================================================== */

const TR069_EQUIPMENT_DATA = {
    globalAlert: {
        title: "Pré-requisito Obrigatório de Rede para Gerência",
        description: "A interface WAN configurada em cada equipamento de assinante deve possuir ambos os serviços de INTERNET + TR069 ativos. A rede de gerenciamento permitida (trusted network) deve cobrir estritamente a faixa de IPs de 179.108.128.1 até 179.108.128.64."
    },
    commonParams: {
        acsUrl: "http://madegraph.mxt.net.br:7547",
        acsUser: "Admin",
        acsPass: "AdminAdmin",
        connReqUser: "Admin",
        connReqPass: "AdminAdmin",
        informInterval: "3600"
    },
    models: [
        {
            id: "nokia-wifi6",
            name: "Nokia Wi-Fi 6",
            icon: "fa-wifi",
            compatModels: "G-0425G-C e G-2426G-A",
            pages: "Págs. 2–3",
            wanPath: "WAN › WAN Services",
            acsPath: "WAN › WAN Services › TR-069",
            steps: [
                {
                    num: 1,
                    title: "Ativar IPv4, IPv6 e TR-069 na WAN",
                    desc: "Acesse o menu WAN › WAN Services, marque as opções de operação simultânea de IPv4 e IPv6, e ative a opção TR-069 no perfil de conexão."
                },
                {
                    num: 2,
                    title: "Acessar configuração do TR-069",
                    desc: "Clique na aba TR-069 dentro do menu WAN Services para exibir os campos do servidor ACS."
                },
                {
                    num: 3,
                    title: "Preencher os parâmetros e salvar",
                    desc: "Insira as credenciais unificadas do servidor ACS, salve as configurações e aplique."
                }
            ]
        },
        {
            id: "nokia-semwifi",
            name: "Nokia sem Wi-Fi",
            icon: "fa-network-wired",
            compatModels: "G-240W-C e G-1425G-E",
            pages: "Págs. 4–5",
            wanPath: "Network › WAN",
            acsPath: "Network › TR-069",
            steps: [
                {
                    num: 1,
                    title: "Ativar Serviços WAN",
                    desc: "Navegue até Network › WAN, marque as caixas IPv4 e IPv6 e selecione o serviço TR-069 na interface."
                },
                {
                    num: 2,
                    title: "Configurar Servidor ACS",
                    desc: "Acesse o menu Network › TR-069 e insira o endereço URL e as senhas do servidor de gerência."
                }
            ]
        },
        {
            id: "tplink",
            name: "TP-Link (ONT e Roteador)",
            icon: "fa-link",
            compatModels: "XX530v e Roteadores TP-Link",
            pages: "Págs. 6–8",
            wanPath: "Network › Internet",
            acsPath: "System Tools › CWMP Settings",
            tip: "Utilize o sufixo /superadmin no final da URL do ACS caso queira liberar privilégios superiores de gerenciamento no TP-Link.",
            steps: [
                {
                    num: 1,
                    title: "Configurar Interface WAN",
                    desc: "Acesse Network › Internet. Caso o perfil WAN atual não possua opção de TR-069, exclua o perfil existente e recrie um novo ativando o serviço TR069 + IPv6."
                },
                {
                    num: 2,
                    title: "Vincular o CWMP na Interface",
                    desc: "Vá em Network › Internet › Interface Binding e marque a opção CWMP para atrelar a gerência à porta correta."
                },
                {
                    num: 3,
                    title: "Ajustar CWMP Settings",
                    desc: "Entre em System Tools › CWMP Settings, ative Inform Enable, periodicidade de 3600 segundos e insira a URL e credenciais."
                }
            ]
        },
        {
            id: "huawei-ont",
            name: "Huawei ONT",
            icon: "fa-microchip",
            compatModels: "F3001, F1001-DC-L1, F200D e EG8145V5-V2",
            pages: "Págs. 9–10",
            wanPath: "Settings › WAN › Basic Information",
            acsPath: "System Management › TR-069",
            steps: [
                {
                    num: 1,
                    title: "Configurar Service Type WAN",
                    desc: "Acesse Settings › WAN, escolha o Service Type como TR069_INTERNET para trafegar dados de gerência e navegação juntos."
                },
                {
                    num: 2,
                    title: "Configuração do ACS",
                    desc: "Acesse System Management › TR-069, ative Enable ACS Management e Periodic Informing, preenchendo os dados padrões de login."
                }
            ]
        },
        {
            id: "easylink",
            name: "EasyLink",
            icon: "fa-plug",
            compatModels: "E4L-H5410WA",
            pages: "Págs. 11–12",
            wanPath: "NET › WAN › Internet Connection",
            acsPath: "NET › CWMP › ITMS Server",
            steps: [
                {
                    num: 1,
                    title: "Definir Service Mode",
                    desc: "Selecione Service Mode: TR069_INTERNET na interface de conexão WAN e habilite o protocolo IPv4/IPv6."
                },
                {
                    num: 2,
                    title: "Preencher ITMS Server",
                    desc: "Navegue até NET › CWMP › ITMS Server, marque Periodic Notification Enable, insira o domínio madegraph.mxt.net.br:7547 e credenciais Admin."
                }
            ]
        },
        {
            id: "huawei-router",
            name: "Roteador Huawei AX3S",
            icon: "fa-route",
            compatModels: "HUAWEI WiFi AX3S, HG8245, HG8447, HG659",
            pages: "Pág. 13",
            wanPath: "Conectar-se à Internet",
            acsPath: "Mais funções › Configurações do Sistema › TR-069",
            steps: [
                {
                    num: 1,
                    title: "Ativar Gerenciamento TR-069",
                    desc: "Vá em Mais funções › Configurações do Sistema › TR-069, ative a chave Gerenciamento do TR069 e insira o endereço do servidor ACS."
                },
                {
                    num: 2,
                    title: "Ajustar Intervalo de Informe",
                    desc: "Ative a opção Intervalo de informe e defina 3600 segundos."
                }
            ]
        },
        {
            id: "acesso-remoto",
            name: "Acesso Remoto e Segurança",
            icon: "fa-lock",
            compatModels: "Todos os roteadores e ONTs da rede",
            pages: "Págs. 14–16",
            wanPath: "Ferramentas de Sistema › Gerenciamento Remoto",
            acsPath: "Segurança / Trusted Network",
            steps: [
                {
                    num: 1,
                    title: "Restringir IP de Origem (Trusted Network)",
                    desc: "Em todas as ONTs, o acesso WAN remoto deve estar configurado para permitir APENAS a sub-rede de gerência 179.108.128.1 até 179.108.128.64."
                },
                {
                    num: 2,
                    title: "Verificação de Cabeçalho HTTP (Referer)",
                    desc: "Nos roteadores TP-Link, acesse Ferramentas de Sistema › Gerenciamento Remoto e ative a opção Verificação do cabeçote de referência HTTP para mitigar ataques de CSRF."
                }
            ]
        }
    ]
};
