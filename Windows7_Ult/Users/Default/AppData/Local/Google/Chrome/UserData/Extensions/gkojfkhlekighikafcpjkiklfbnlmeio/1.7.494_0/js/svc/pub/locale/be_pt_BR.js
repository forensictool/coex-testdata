'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "$1 Buffering?": {
        "message": "$1 Buffer?"
    },
    "$1 Hola to access $2\n\nClick here to do the same: $3\n\nIt installs Hola, which lets me surf the Internet faster and access $4$5": {
        "message": "$1 Hola acessar $2\n\nClique aqui para fazer o mesmo: $3\n\nInstala Hola, que me permite navegar na Internet mais rápido e de acesso $4$5"
    },
    "$1 from $2": {
        "message": "$1 de $2"
    },
    "$1 not found": {
        "message": "$1 não encontrado"
    },
    "$1 via Hola": {
        "message": "$1 por Hola"
    },
    "(some Hola features are not available on your version)": {
        "message": "(Hola - alguns recursos não estão disponíveis na sua versão)"
    },
    "AE": {
        "message": "Emirados Árabes Unidos"
    },
    "AF": {
        "message": "Afeganistão"
    },
    "AG": {
        "message": "Antígua e Barbuda"
    },
    "AL": {
        "message": "Albânia"
    },
    "AM": {
        "message": "Armênia"
    },
    "AN": {
        "message": "Antilhas Holandesas"
    },
    "AQ": {
        "message": "Antártida"
    },
    "AS": {
        "message": "Samoa Americana"
    },
    "AT": {
        "message": "Áustria"
    },
    "AU": {
        "message": "Austrália"
    },
    "AX": {
        "message": "Ilhas Aland"
    },
    "AZ": {
        "message": "Azerbaijão"
    },
    "About": {
        "message": "Sobre"
    },
    "About Hola": {
        "message": "Sobre Hola"
    },
    "Accelerator": {
        "message": "Acelerador"
    },
    "Accelerator is": {
        "message": "Accelerator é"
    },
    "Access $1 - cool site!": {
        "message": "Acesso $1 - site legal!"
    },
    "Access $1?": {
        "message": "Desbloquear $1?"
    },
    "Access any site from any country, free": {
        "message": "Acesse qualquer site a partir de qualquer país!"
    },
    "Access cool sites": {
        "message": "Sites legais de acesso"
    },
    "Access more sites": {
        "message": "Acesso mais sites"
    },
    "Accessing $1 with Hola": {
        "message": "Acessando $1 com Hola"
    },
    "Account": {
        "message": "Conta"
    },
    "Account type": {
        "message": "Tipo de conta"
    },
    "All ($1)": {
        "message": "Todos ($1)"
    },
    "Apply settings...": {
        "message": "Aplicar as configurações..."
    },
    "Author site:": {
        "message": "Site do autor:"
    },
    "Author:": {
        "message": "Autor:"
    },
    "Awesome!": {
        "message": "Incrível!"
    },
    "BA": {
        "message": "Bósnia-Herzegovina"
    },
    "BE": {
        "message": "Bélgica"
    },
    "BF": {
        "message": "Burquina Faso"
    },
    "BG": {
        "message": "Bulgária"
    },
    "BL": {
        "message": "São Bartolomeu"
    },
    "BM": {
        "message": "Bermudas"
    },
    "BO": {
        "message": "Bolívia"
    },
    "BR": {
        "message": "Brasil"
    },
    "BT": {
        "message": "Butão"
    },
    "BV": {
        "message": "Ilha Bouvet"
    },
    "BW": {
        "message": "Botsuana"
    },
    "Back to $1": {
        "message": "Voltar para $1"
    },
    "Be the first to get Hola for iPhone/iPad - Register now:": {
        "message": "Seja o primeiro a obter Hola para iPhone / iPad - Cadastre-se agora:"
    },
    "Browsing": {
        "message": "Navegação"
    },
    "Buffering problems?": {
        "message": "Problemas de buffer?"
    },
    "Buffering?": {
        "message": "Buffer?"
    },
    "CA": {
        "message": "Canadá"
    },
    "CC": {
        "message": "Ilhas Coco"
    },
    "CD": {
        "message": "Congo-Kinshasa"
    },
    "CF": {
        "message": "República Centro-Africana"
    },
    "CG": {
        "message": "Congo"
    },
    "CH": {
        "message": "Suíça"
    },
    "CI": {
        "message": "Costa do Marfim"
    },
    "CK": {
        "message": "Ilhas Cook"
    },
    "CM": {
        "message": "República dos Camarões"
    },
    "CO": {
        "message": "Colômbia"
    },
    "CS": {
        "message": "Sérvia e Montenegro"
    },
    "CV": {
        "message": "Cabo Verde"
    },
    "CX": {
        "message": "Ilhas Natal"
    },
    "CY": {
        "message": "Chipre"
    },
    "CZ": {
        "message": "República Tcheca"
    },
    "Changing country...": {
        "message": "Alterar país ..."
    },
    "Check out Hola for $1!": {
        "message": "Confira Hola por $1!"
    },
    "Check your Internet connection": {
        "message": "Verifique se você está conectado à internet"
    },
    "Choose<br>Country": {
        "message": "Escolher <br> País"
    },
    "Configuring...": {
        "message": "Configurando..."
    },
    "Connecting...": {
        "message": "Conectando..."
    },
    "Creative licenses": {
        "message": "Licenças Creative"
    },
    "DE": {
        "message": "Alemanha"
    },
    "DJ": {
        "message": "Djibuti"
    },
    "DK": {
        "message": "Dinamarca"
    },
    "DO": {
        "message": "República Dominicana"
    },
    "DZ": {
        "message": "Argélia"
    },
    "Delete": {
        "message": "Excluir"
    },
    "Deleted from my list": {
        "message": "Excluídos da minha relação"
    },
    "Did it work?": {
        "message": "Será que isso funciona?"
    },
    "Did you experience any buffering?": {
        "message": "Você experimentou qualquer buffer?"
    },
    "Don't show again for $1 for one week": {
        "message": "Não mostrar novamente por $1 por uma semana"
    },
    "Don't show again for any site for one week": {
        "message": "Não mostrar novamente para qualquer site durante uma semana"
    },
    "Downloading": {
        "message": "Baixando"
    },
    "EC": {
        "message": "Equador"
    },
    "EE": {
        "message": "Estônia"
    },
    "EG": {
        "message": "Egito"
    },
    "EH": {
        "message": "Saara Ocidental"
    },
    "ER": {
        "message": "Eritreia"
    },
    "ES": {
        "message": "Espanha"
    },
    "ET": {
        "message": "Etiópia"
    },
    "Enable": {
        "message": "Habilitar"
    },
    "Enable Hola Accelerator": {
        "message": "Ativar Hola Accelerator"
    },
    "Enjoy!": {
        "message": "Divirta-se!"
    },
    "Enter site to access": {
        "message": "Digite o site para acesso"
    },
    "Enter your email": {
        "message": "Digite seu e-mail"
    },
    "FI": {
        "message": "Finlândia"
    },
    "FK": {
        "message": "Ilhas Malvinas"
    },
    "FM": {
        "message": "Micronésia"
    },
    "FO": {
        "message": "Ilhas Faroe"
    },
    "FR": {
        "message": "França"
    },
    "Finding new peers...": {
        "message": "Encontrar novos colegas ..."
    },
    "Finding peers...": {
        "message": "Encontrar colegas ..."
    },
    "Free": {
        "message": "Gratuita"
    },
    "From": {
        "message": "De"
    },
    "Full list": {
        "message": "Lista completa"
    },
    "GA": {
        "message": "Gabão"
    },
    "GB": {
        "message": "Reino Unido"
    },
    "GD": {
        "message": "Granada"
    },
    "GE": {
        "message": "Geórgia"
    },
    "GF": {
        "message": "Guiana Francesa"
    },
    "GH": {
        "message": "Gana"
    },
    "GL": {
        "message": "Groênlandia"
    },
    "GM": {
        "message": "Gâmbia"
    },
    "GN": {
        "message": "Guiné"
    },
    "GP": {
        "message": "Guadalupe"
    },
    "GQ": {
        "message": "Guiné Equatorial"
    },
    "GR": {
        "message": "Grécia"
    },
    "GS": {
        "message": "Geórgia do Sul e Ilhas Sandwich do Sul"
    },
    "GW": {
        "message": "Guiné Bissau"
    },
    "GY": {
        "message": "Guiana"
    },
    "Get 24/7 Unblocking": {
        "message": "Obtenha um desbloqueio 24/7"
    },
    "Get Free Premium": {
        "message": "Get Free premium"
    },
    "Get Hola Accelerator": {
        "message": "Obter Hola Accelerator"
    },
    "Get Hola Player": {
        "message": "Obter Hola Jogador"
    },
    "Get Hola Plus for un-interrupted, ad-free service.": {
        "message": "Obtenha Hola Plus para um serviço sem interrupções ou anúncios"
    },
    "Get Hola Premium": {
        "message": "Obter Hola premium"
    },
    "Get Hola for Android": {
        "message": "Obter Hola para Android"
    },
    "Get Premium support": {
        "message": "Obtenha suporte premium"
    },
    "Get Unlimited Unblocking": {
        "message": "Obtenha um Desbloqueio Ilimitado"
    },
    "Get access to censored sites, try it now: $1": {
        "message": "Tenha acesso a sites censurados, experimentá-lo agora: $1"
    },
    "Get help from engineer over Skype:": {
        "message": "Obtenha ajuda de um engenheiro pelo skype:"
    },
    "Get the Fastest Servers": {
        "message": "Obtenha os Servidores Mais Rápidos"
    },
    "Go": {
        "message": "Vá"
    },
    "Go Hola Premium": {
        "message": "Torne-se Premium"
    },
    "HK": {
        "message": "Hong Kong, Região Admin. Especial da China"
    },
    "HM": {
        "message": "Ilha Heard e Ilhas McDonald"
    },
    "HR": {
        "message": "Croácia"
    },
    "HU": {
        "message": "Hungria"
    },
    "Help": {
        "message": "Ajuda"
    },
    "Hey,\n\nI'm using": {
        "message": "Hey,\n\neu estou usando"
    },
    "Hi,\n\nI started using $1 ($2). It lets me surf the Internet faster and access $3 in my country.": {
        "message": "Oi,\n\neu comecei a usar $1 ($2). Ele me permite navegar na Internet mais rápido e acessar $3 no meu país."
    },
    "Hola Accelerator": {
        "message": "Hola Acelerador"
    },
    "Hola cannot work because another extension is controlling your proxy settings.": {
        "message": "Hola não pode trabalhar porque outra extensão é controlar suas configurações de proxy."
    },
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {
        "message": "Hola não funciona bem no modo Windows 8. Por favor mude para o modo Área de Trabalho. Clique <a>aqui</a> para instruções"
    },
    "Hola is not available right now, but we are working on it.": {
        "message": "Hola não está disponível no momento, mas estamos trabalhando nisso."
    },
    "Hola is off, click it to turn it on": {
        "message": "Hola está desligado, clique em para ligar"
    },
    "Hola site list": {
        "message": "Lista de sites desbloqueados"
    },
    "I can now access $1 from any country!": {
        "message": "Agora eu posso acessar $1 a partir de qualquer país!"
    },
    "I did not experience any buffering": {
        "message": "Eu não experimentar qualquer tamponamento"
    },
    "I just accessed a censored site using Hola for $1!": {
        "message": "Eu só acessado um site censurado usando Hola por $1!"
    },
    "I'm using $1 to view $2 in my country, and surf faster!": {
        "message": "Eu estou usando $1 a $2 em ver o meu país, e navegar mais rápido!"
    },
    "ID": {
        "message": "Indonésia"
    },
    "IE": {
        "message": "Irlanda"
    },
    "IM": {
        "message": "Ilha de Man"
    },
    "IN": {
        "message": "Índia"
    },
    "IO": {
        "message": "Território Britânico do Oceano Índico"
    },
    "IQ": {
        "message": "Iraque"
    },
    "IR": {
        "message": "Irã"
    },
    "IS": {
        "message": "Islândia"
    },
    "IT": {
        "message": "Itália"
    },
    "Improve translation": {
        "message": "Ajude a melhorar a tradução"
    },
    "Initializing...": {
        "message": "Inicializando..."
    },
    "Install": {
        "message": "Instalar"
    },
    "Install Accelerator": {
        "message": "Instale Accelerator"
    },
    "Install Free Hola Accelerator": {
        "message": "Instale grátis Hola Accelerator"
    },
    "Instantly watch any torrent Video": {
        "message": "Instantaneamente assistir qualquer torrente Vídeo"
    },
    "Invite friends - free Premium.": {
        "message": "Convide amigos - Prêmio livre."
    },
    "Invite friends. Get Premium.": {
        "message": "Convide amigos. Obter Premium."
    },
    "JO": {
        "message": "Jordânia"
    },
    "JP": {
        "message": "Japão"
    },
    "KE": {
        "message": "Quênia"
    },
    "KG": {
        "message": "Quirguistão"
    },
    "KH": {
        "message": "Camboja"
    },
    "KI": {
        "message": "Quiribati"
    },
    "KM": {
        "message": "Comores"
    },
    "KN": {
        "message": "São Cristovão e Nevis"
    },
    "KP": {
        "message": "Coreia do Norte"
    },
    "KR": {
        "message": "Coreia do Sul"
    },
    "KY": {
        "message": "Ilhas Caiman"
    },
    "KZ": {
        "message": "Casaquistão"
    },
    "LA": {
        "message": "República Popular Democrática do Laos"
    },
    "LB": {
        "message": "Líbano"
    },
    "LC": {
        "message": "Santa Lúcia"
    },
    "LR": {
        "message": "Libéria"
    },
    "LS": {
        "message": "Lesoto"
    },
    "LT": {
        "message": "Lituânia"
    },
    "LU": {
        "message": "Luxemburgo"
    },
    "LV": {
        "message": "Letônia"
    },
    "LY": {
        "message": "Líbia"
    },
    "Language": {
        "message": "Idioma"
    },
    "Loading": {
        "message": "Carregando"
    },
    "Loading site...": {
        "message": "Carregando"
    },
    "Log in": {
        "message": "Conecte-se"
    },
    "Log out": {
        "message": "Sair"
    },
    "Love Hola?": {
        "message": "Amor Hola?"
    },
    "MA": {
        "message": "Marrocos"
    },
    "MC": {
        "message": "Mônaco"
    },
    "MD": {
        "message": "Moldávia"
    },
    "MF": {
        "message": "São Martinho"
    },
    "MH": {
        "message": "Ilhas Marshall"
    },
    "MK": {
        "message": "Macedônia"
    },
    "MM": {
        "message": "Mianmar"
    },
    "MN": {
        "message": "Mongólia"
    },
    "MO": {
        "message": "Macau, Região Admin. Especial da China"
    },
    "MP": {
        "message": "Ilhas Marianas do Norte"
    },
    "MQ": {
        "message": "Martinica"
    },
    "MR": {
        "message": "Mauritânia"
    },
    "MU": {
        "message": "Maurício"
    },
    "MV": {
        "message": "Maldivas"
    },
    "MX": {
        "message": "México"
    },
    "MY": {
        "message": "Malásia"
    },
    "MZ": {
        "message": "Moçambique"
    },
    "Make your Internet better with $1": {
        "message": "Faça o seu melhor Internet com $1"
    },
    "Mode": {
        "message": "Modo"
    },
    "More countries": {
        "message": "Mais países"
    },
    "More sites...": {
        "message": "mais..."
    },
    "More...": {
        "message": "mais..."
    },
    "My Account": {
        "message": "Minha conta"
    },
    "My History": {
        "message": "Minha História"
    },
    "My Settings": {
        "message": "Minhas Configurações"
    },
    "My favorites": {
        "message": "Meus favoritos"
    },
    "NA": {
        "message": "Namíbia"
    },
    "NC": {
        "message": "Nova Caledônia"
    },
    "NE": {
        "message": "Níger"
    },
    "NF": {
        "message": "Ilha Norfolk"
    },
    "NG": {
        "message": "Nigéria"
    },
    "NI": {
        "message": "Nicarágua"
    },
    "NL": {
        "message": "Holanda"
    },
    "NO": {
        "message": "Noruega"
    },
    "NZ": {
        "message": "Nova Zelândia"
    },
    "Need Help?": {
        "message": "Precisa de Ajuda?"
    },
    "Never ask me again": {
        "message": "Nunca me pergunte novamente"
    },
    "Never be a peer": {
        "message": "Nunca tenha um peer"
    },
    "No": {
        "message": "Não"
    },
    "No idle peers found.": {
        "message": "Não pares ociosos encontrado."
    },
    "No recent videos found": {
        "message": "Não há nenhum vídeo recentes encontrado"
    },
    "No saved videos found": {
        "message": "Não há vídeos guardados encontrado"
    },
    "No title": {
        "message": "Sem título"
    },
    "No videos found": {
        "message": "Não foram encontrados vídeos"
    },
    "No videos found on active page": {
        "message": "Não foram encontrados vídeos na página ativa"
    },
    "No, Thanks": {
        "message": "Não, obrigado"
    },
    "No, fix it": {
        "message": "Não, corrigi-lo"
    },
    "Not working?": {
        "message": "Não está funcionando?"
    },
    "Number of users that pressed not working": {
        "message": "Número de usuários que clicaram em 'não funciona'"
    },
    "Number of users that use this option": {
        "message": "Número de usuários que usam essa opção"
    },
    "OM": {
        "message": "Omã"
    },
    "Off": {
        "message": "Desligado"
    },
    "Oh, yes!": {
        "message": "Oh, sim!"
    },
    "Old version of Firefox. Press <a>here</a> to upgrade.": {
        "message": "Versão antiga do Firefox. Clique <a>aqui</a> para atualizar."
    },
    "On": {
        "message": "Ligado"
    },
    "Open Media Player": {
        "message": "Abrir Media Player"
    },
    "Our Brand New Mplayer is Coming Soon!": {
        "message": "Our Brand New Mplayer está chegando!"
    },
    "PA": {
        "message": "Panamá"
    },
    "PF": {
        "message": "Polinésia Francesa"
    },
    "PG": {
        "message": "Papua-Nova Guiné"
    },
    "PH": {
        "message": "Filipinas"
    },
    "PK": {
        "message": "Paquistão"
    },
    "PL": {
        "message": "Polônia"
    },
    "PM": {
        "message": "Saint Pierre e Miquelon"
    },
    "PN": {
        "message": "Pitcairn"
    },
    "PR": {
        "message": "Porto Rico"
    },
    "PS": {
        "message": "Território da Palestina"
    },
    "PY": {
        "message": "Paraguai"
    },
    "Please disable other <a>extensions</a> that you think might control your proxy settings such as ad-blockers, other VPN services, etc.": {
        "message": "Desative outras <a>extensões</a> que você acha que pode controlar as configurações de proxy, como ad-bloqueadores, outros serviços de VPN, etc"
    },
    "Please enter a valid email address.": {
        "message": "Por favor insira um endereço de e-mail válido."
    },
    "Please enter a web site address, like facebook.com": {
        "message": "Por favor insira um endereço de web site, como facebook.com"
    },
    "Please help us get better": {
        "message": "Ajude-nos a melhorar"
    },
    "Popular in $1": {
        "message": "Popular em $1"
    },
    "Popular in the world": {
        "message": "Popular no mundo"
    },
    "Popular sites": {
        "message": "Os sites mais populares"
    },
    "Premium": {
        "message": "Prêmio"
    },
    "QA": {
        "message": "Catar"
    },
    "RE": {
        "message": "Reunião"
    },
    "RO": {
        "message": "Romênia"
    },
    "RS": {
        "message": "Sérvia"
    },
    "RU": {
        "message": "Rússia"
    },
    "RW": {
        "message": "Ruanda"
    },
    "Recent Videos": {
        "message": "Vídeos Recentes"
    },
    "Reload": {
        "message": "Recarregar"
    },
    "Reload Hola": {
        "message": "Recarregar Hola"
    },
    "Remember server": {
        "message": "Lembre-se de servidor"
    },
    "Report a problem": {
        "message": "Relatar um problema"
    },
    "SA": {
        "message": "Arábia Saudita"
    },
    "SB": {
        "message": "Ilhas Salomão"
    },
    "SD": {
        "message": "Sudão"
    },
    "SE": {
        "message": "Suécia"
    },
    "SG": {
        "message": "Cingapura"
    },
    "SH": {
        "message": "Santa Helena"
    },
    "SI": {
        "message": "Eslovênia"
    },
    "SJ": {
        "message": "Svalbard e Jan Mayen"
    },
    "SK": {
        "message": "Eslováquia"
    },
    "SL": {
        "message": "Serra Leoa"
    },
    "SO": {
        "message": "Somália"
    },
    "ST": {
        "message": "São Tomé e Príncipe"
    },
    "SY": {
        "message": "Síria"
    },
    "SZ": {
        "message": "Suazilândia"
    },
    "Save": {
        "message": "Salvar"
    },
    "Saved Videos": {
        "message": "Vídeos gravados"
    },
    "Saved for later": {
        "message": "Guardar para mais tarde"
    },
    "Search video title": {
        "message": "Pesquisa título de vídeo"
    },
    "Select a Country": {
        "message": "Selecione um País"
    },
    "Select site to unblock": {
        "message": "Selecione local para desbloquear"
    },
    "Server saved!": {
        "message": "Servidor salva!"
    },
    "Settings": {
        "message": "Configuração"
    },
    "Share": {
        "message": "Ação"
    },
    "Share $1 on $2": {
        "message": "Compartilhe $1 com $2"
    },
    "Share $1 via $2": {
        "message": "Compartilhe $1 via $2"
    },
    "Sign up": {
        "message": "Inscrever-se"
    },
    "Solve buffering": {
        "message": "Resolva o buffer"
    },
    "Solve buffering problems with": {
        "message": "Resolver problemas com tamponamento"
    },
    "Solves it": {
        "message": "Resolve-lo"
    },
    "Staff Picks": {
        "message": "Sugestões dos funcionários"
    },
    "Start Hola": {
        "message": "iniciar"
    },
    "Starting...": {
        "message": "Iniciando..."
    },
    "Stop Hola": {
        "message": "Parar Hola"
    },
    "Stopping peer routing...": {
        "message": "Parando encaminhamento pares..."
    },
    "Stream": {
        "message": "Córrego"
    },
    "Stream Instantly": {
        "message": "Transmitir instantaneamente"
    },
    "Submit": {
        "message": "Submeter"
    },
    "Support Hola": {
        "message": "Suporte o Hola"
    },
    "TC": {
        "message": "Ilhas Turks e Caicos"
    },
    "TD": {
        "message": "Chade"
    },
    "TF": {
        "message": "Territórios Franceses do Sul"
    },
    "TH": {
        "message": "Tailândia"
    },
    "TJ": {
        "message": "Tadjiquistão"
    },
    "TL": {
        "message": "Timor Leste"
    },
    "TM": {
        "message": "Turcomenistão"
    },
    "TN": {
        "message": "Tunísia"
    },
    "TR": {
        "message": "Turquia"
    },
    "TT": {
        "message": "Trinidad e Tobago"
    },
    "TZ": {
        "message": "Tanzânia"
    },
    "Talk to us on $1": {
        "message": "Fale com a gente com $1"
    },
    "Tell friends about $1": {
        "message": "Contar aos amigos cerca de $1"
    },
    "Testing connection...": {
        "message": "Teste de conexão..."
    },
    "Thank you!": {
        "message": "Obrigado!"
    },
    "There seems to be an error": {
        "message": "Traduzir para o seu idioma"
    },
    "Top popular sites": {
        "message": "Sites populares Top"
    },
    "Translate to your language": {
        "message": "Traduzir para seu idioma"
    },
    "Try again": {
        "message": "Tente novamente"
    },
    "Try another server": {
        "message": "Tente outro servidor"
    },
    "Try it": {
        "message": "Experimente"
    },
    "Try to <span>reload</span>": {
        "message": "Tente <span>recarregar</span>"
    },
    "Trying another peer...": {
        "message": "Tentando outro par..."
    },
    "Turn off Accelerator": {
        "message": "Desligue Accelerator"
    },
    "Turn off Hola": {
        "message": "Desligue Hola"
    },
    "Turn on Accelerator": {
        "message": "Ligue Accelerator"
    },
    "Turn on Hola": {
        "message": "Ligue Hola"
    },
    "Turn on to get started": {
        "message": "Clique aqui para começar"
    },
    "UA": {
        "message": "Ucrânia"
    },
    "UM": {
        "message": "Ilhas Menores Distantes dos Estados Unidos"
    },
    "US": {
        "message": "Estados Unidos"
    },
    "UY": {
        "message": "Uruguai"
    },
    "UZ": {
        "message": "Uzbequistão"
    },
    "Unblocker": {
        "message": "Desbloqueador"
    },
    "Unblocker is disabled": {
        "message": "O desbloqueador está desativado"
    },
    "Update": {
        "message": "Atualizar"
    },
    "Upgrade": {
        "message": "Atualizar"
    },
    "Using": {
        "message": "Usando"
    },
    "Using Hola": {
        "message": "Usando Hola"
    },
    "VA": {
        "message": "Vaticano"
    },
    "VC": {
        "message": "São Vicente e Granadinas"
    },
    "VG": {
        "message": "Ilhas Virgens Britânicas"
    },
    "VI": {
        "message": "Ilhas Virgens dos EUA"
    },
    "VN": {
        "message": "Vietnã"
    },
    "VPN Premium": {
        "message": "VPN premium"
    },
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {
        "message": "Versão muito antiga do Chrome, <a>atualize</a> para usar Hola"
    },
    "Video": {
        "message": "Vídeo?"
    },
    "Video stuck?": {
        "message": "Vídeo preso?"
    },
    "Videos available for instant streaming": {
        "message": "Vídeos disponíveis para streaming instantâneo"
    },
    "WF": {
        "message": "Wallis e Futuna"
    },
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {
        "message": "Quer Hola em outros dispositivos (Xbox, PS, Apple TV, iPhone, etc)? Clique aqui"
    },
    "Want to know more?": {
        "message": "Quer saber mais?"
    },
    "Watch Now": {
        "message": "Assista agora"
    },
    "We found $1 videos": {
        "message": "Encontramos $1 vídeos"
    },
    "We will be in touch with you soon": {
        "message": "Nós entraremos em contato com você em breve"
    },
    "Working!": {
        "message": "Trabalhando!"
    },
    "Working?": {
        "message": "Trabalhando?"
    },
    "YE": {
        "message": "Iêmen"
    },
    "Yes": {
        "message": "Sim"
    },
    "You need to upgrade to the latest version of Opera to use Hola. Press <a>here</a> to upgrade.": {
        "message": "Você precisa atualizar para a última versão do Opera para usar Hola. Pressione <a>aqui</a> para atualizar."
    },
    "ZA": {
        "message": "África do Sul"
    },
    "ZM": {
        "message": "Zâmbia"
    },
    "ZW": {
        "message": "Zimbábue"
    },
    "ZZ": {
        "message": "Região desconhecida ou inválida"
    },
    "app_desc": {
        "message": "Acessar sites bloqueados em seu país, empresa ou escola com Hola! Hola é gratuito e fácil de usar!"
    },
    "app_name": {
        "message": "Hola, Uma Internet Melhor"
    },
    "back to": {
        "message": "voltar para"
    },
    "changing...": {
        "message": "mudando..."
    },
    "cool sites": {
        "message": "sites legais"
    },
    "current site": {
        "message": "site atual"
    },
    "even more...": {
        "message": "ainda mais..."
    },
    "more options...": {
        "message": "mais opções..."
    },
    "not working?": {
        "message": "não funciona?"
    },
    "not working? try another server": {
        "message": "não está funcionando? tente outro servidor"
    },
    "on this page": {
        "message": "nesta página"
    },
    "sites that are censored": {
        "message": "sites que são censuradas"
    },
    "start": {
        "message": "iniciar"
    },
    "working? remember": {
        "message": "trabalho? lembrar"
    }
};
return E; });