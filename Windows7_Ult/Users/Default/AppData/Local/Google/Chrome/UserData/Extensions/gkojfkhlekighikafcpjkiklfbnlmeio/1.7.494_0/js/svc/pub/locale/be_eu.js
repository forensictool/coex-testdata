'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    " via ": {
        "message": " bidez "
    },
    "$1 Buffering?": {
        "message": "$1 buffer?"
    },
    "$1 Hola to access $2\n\nClick here to do the same: $3\n\nIt installs Hola, which lets me surf the Internet faster and access $4$5": {
        "message": "$1 Hola sartzeko $2\n\nSakatu hemen gauza bera egin zuen: $3\n\nHola, eta horrek aukera ematen dizu, Interneten azkarrago nabigatzeko me eta sartzeko instalatzen $4$5"
    },
    "$1 from $2": {
        "message": "$1 $2"
    },
    "$1 not found": {
        "message": "$1 ez da aurkitu"
    },
    "$1 via Hola": {
        "message": "$1 Hola bidez"
    },
    "(some Hola features are not available on your version)": {
        "message": "(Hola eginbide batzuk ez dira erabilgarri zure bertsioa)"
    },
    "AE": {
        "message": "Arabiar Emirrerri Batuak"
    },
    "AF": {
        "message": "Afganistan"
    },
    "AG": {
        "message": "Antigua eta Barbuda"
    },
    "AN": {
        "message": "Holandarren Antillak"
    },
    "AQ": {
        "message": "Antartika"
    },
    "AS": {
        "message": "Amerikar Samoa"
    },
    "AX": {
        "message": "Aland Uharteak"
    },
    "About": {
        "message": "Buruz"
    },
    "About Hola": {
        "message": "Hola buruz"
    },
    "Accelerator": {
        "message": "Azeleragailu"
    },
    "Accelerator is": {
        "message": "Accelerator da"
    },
    "Access $1 - cool site!": {
        "message": "Sarbide $1 - cool gune!"
    },
    "Access $1?": {
        "message": "Sartzeko $1?"
    },
    "Access any site from any country, free": {
        "message": "Sartzeko edozein herrialdetan eta edozein gune, doako"
    },
    "Access cool sites": {
        "message": "Sarbide guneak cool"
    },
    "Access more sites": {
        "message": "Sarbide guneak gehiago"
    },
    "Accessing $1 with Hola": {
        "message": "$1 atzitzea Hola batera"
    },
    "Account": {
        "message": "Kontu"
    },
    "Account type": {
        "message": "Kontu mota"
    },
    "All ($1)": {
        "message": "Guztiak ($1)"
    },
    "Apply settings...": {
        "message": "Aplikatu ezarpenak..."
    },
    "Author site:": {
        "message": "Egilea gune:"
    },
    "Author:": {
        "message": "Egilea:"
    },
    "BA": {
        "message": "Bosnia-Herzegovina"
    },
    "BE": {
        "message": "Belgika"
    },
    "BO": {
        "message": "Bolibia"
    },
    "BR": {
        "message": "Brasil"
    },
    "BS": {
        "message": "Bahamak"
    },
    "BV": {
        "message": "Bouvet Uhartea"
    },
    "BY": {
        "message": "Bielorrusia"
    },
    "Back to $1": {
        "message": "Itzuli $1"
    },
    "Be the first to get Hola for iPhone/iPad - Register now:": {
        "message": "Lehenengoa Hola lortzeko iPhone / iPad izan - Erregistra zaitez:"
    },
    "Buffering problems?": {
        "message": "Buferra arazoak?"
    },
    "Buffering?": {
        "message": "Buferra?"
    },
    "CA": {
        "message": "Kanada"
    },
    "CC": {
        "message": "Cocos uharteak"
    },
    "CD": {
        "message": "Kongoko Errepublika Demokratikoa"
    },
    "CF": {
        "message": "Afrika Erdiko Errepublika"
    },
    "CG": {
        "message": "Kongo"
    },
    "CH": {
        "message": "Suitza"
    },
    "CI": {
        "message": "Boli Kosta"
    },
    "CK": {
        "message": "Cook uharteak"
    },
    "CL": {
        "message": "Txile"
    },
    "CM": {
        "message": "Kamerun"
    },
    "CN": {
        "message": "Txina"
    },
    "CO": {
        "message": "Kolonbia"
    },
    "CS": {
        "message": "Serbia eta Montenegro"
    },
    "CU": {
        "message": "Kuba"
    },
    "CV": {
        "message": "Cabo Verde"
    },
    "CX": {
        "message": "Christmas uhartea"
    },
    "CY": {
        "message": "Zipre"
    },
    "CZ": {
        "message": "Txekiar errepublika"
    },
    "Changing country...": {
        "message": "Herrialde aldatzen..."
    },
    "Check out Hola for $1!": {
        "message": "Begiratu Hola $1!"
    },
    "Check your Internet connection": {
        "message": "Ziurtatu interneteko duzu"
    },
    "Choose<br>Country": {
        "message": "Aukeratu<br>Herrialde"
    },
    "Configuring...": {
        "message": "Konfiguratzen..."
    },
    "Connecting...": {
        "message": "Konektatzen..."
    },
    "Cool site!": {
        "message": "Cool gune!"
    },
    "Creative licenses": {
        "message": "Creative lizentziak"
    },
    "DE": {
        "message": "Alemania"
    },
    "DJ": {
        "message": "Djibuti"
    },
    "DK": {
        "message": "Danimarka"
    },
    "DM": {
        "message": "Dominika"
    },
    "DO": {
        "message": "Dominikar Errepublika"
    },
    "DZ": {
        "message": "Aljeria"
    },
    "Delete": {
        "message": "Ezabatu"
    },
    "Deleted from my list": {
        "message": "Nire zerrenda ezabatuko"
    },
    "Did it work?": {
        "message": "Ba al du lan?"
    },
    "Did you experience any buffering?": {
        "message": "Ba al edozein buferra esperientzia duzu?"
    },
    "Don't show again for $1 for one week": {
        "message": "Ez erakutsi berriro $1 aste bat egiteko"
    },
    "Don't show again for any site for one week": {
        "message": "Ez erakutsi berriro aste bat gune edozein"
    },
    "Downloading": {
        "message": "Deskargen"
    },
    "EC": {
        "message": "Ekuador"
    },
    "EG": {
        "message": "Egipto"
    },
    "EH": {
        "message": "Mendebaldeko Sahara"
    },
    "ES": {
        "message": "Espainia"
    },
    "ET": {
        "message": "Etiopia"
    },
    "Enable": {
        "message": "Gaitu"
    },
    "Enable Hola Accelerator": {
        "message": "Gaitu Hola Accelerator"
    },
    "Enjoy!": {
        "message": "Gozatu!"
    },
    "Enter site to access": {
        "message": "Idatzi webgunean sartzeko"
    },
    "Enter your email": {
        "message": "Idatzi zure e-posta"
    },
    "FI": {
        "message": "Finlandia"
    },
    "FK": {
        "message": "Malvinak"
    },
    "FM": {
        "message": "Mikronesia"
    },
    "FO": {
        "message": "Faroe Uharteak"
    },
    "FR": {
        "message": "Frantzia"
    },
    "Finding new peers...": {
        "message": "Ikaskideek berriak aurkitzeko..."
    },
    "Finding peers...": {
        "message": "Ikaskideek aurkitzeko..."
    },
    "From": {
        "message": "Aurrera"
    },
    "Full list": {
        "message": "Zerrenda osoa"
    },
    "GB": {
        "message": "Erresuma Batua"
    },
    "GF": {
        "message": "Guyana Frantsesa"
    },
    "GL": {
        "message": "Groenlandia"
    },
    "GN": {
        "message": "Ginea"
    },
    "GQ": {
        "message": "Ekuatore Ginea"
    },
    "GR": {
        "message": "Grezia"
    },
    "GS": {
        "message": "Hegoaldeko Georgia eta Hegoaldeko Sandwich uharteak"
    },
    "GW": {
        "message": "Ginea-Bissau"
    },
    "Get 24/7 Unblocking": {
        "message": "Talde 24/7 Unblocking"
    },
    "Get Free Premium": {
        "message": "Dohainik Premium"
    },
    "Get Hola Accelerator": {
        "message": "Talde Hola Accelerator"
    },
    "Get Hola Player": {
        "message": "Talde Hola Player"
    },
    "Get Hola Plus for un-interrupted, ad-free service.": {
        "message": "Talde Hola Plus un-eten, ad-zerbitzu librean."
    },
    "Get Hola Premium": {
        "message": "Talde Hola Premium"
    },
    "Get Hola for Android": {
        "message": "Talde Hola Android"
    },
    "Get Premium support": {
        "message": "Talde Premium laguntza"
    },
    "Get Unlimited Unblocking": {
        "message": "Talde Unlimited Unblocking"
    },
    "Get access to censored sites, try it now: $1": {
        "message": "Talde sarbidea zentsuratu guneetara, saiatu da orain: $1"
    },
    "Get help from engineer over Skype:": {
        "message": "Laguntza ingeniaria etatik skype gainetik:"
    },
    "Get the Fastest Servers": {
        "message": "Talde Servers Fastest du"
    },
    "Go": {
        "message": "Joan"
    },
    "Go Hola Premium": {
        "message": "Joan Hola Premium"
    },
    "HM": {
        "message": "Heard eta McDonald Uharteak"
    },
    "HR": {
        "message": "Kroazia"
    },
    "HU": {
        "message": "Hungaria"
    },
    "Help": {
        "message": "Laguntza"
    },
    "Hey,\n\nI'm using": {
        "message": "Hey,\n\nerabiltzen dut"
    },
    "Hi,\n\nI started using $1 ($2). It lets me surf the Internet faster and access $3 in my country.": {
        "message": "Kaixo,\n\n$1 ($2) erabiltzen hasi nintzen. Internet azkarrago nabigatzeko me eta $3 sartzeko nire herrialdean ematen du."
    },
    "Hola cannot work because another extension is controlling your proxy settings.": {
        "message": "Hola ezin funtzionatuko beste luzapena da zure proxy ezarpenak kontrolatzen delako."
    },
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {
        "message": "Hola ez du ondo lan Windows 8 moduan. Mesedez desktop modura aldatzeko. Ezkutatu <a> hemen </a> argibideak"
    },
    "Hola is not available right now, but we are working on it.": {
        "message": "Hola ez dago erabilgarri, baina horretan ari gara lanean."
    },
    "Hola is off, click it to turn it on": {
        "message": "Hola da off, sakatu pizteko"
    },
    "Hola site list": {
        "message": "Hola gune zerrenda"
    },
    "I can now access $1 from any country!": {
        "message": "Dut orain sartu ahal izango $1 edozein herrialdetako!"
    },
    "I did not experience any buffering": {
        "message": "Nik ez dut inolako buferra esperimentatu"
    },
    "I just accessed a censored site using Hola for $1!": {
        "message": "Accessed dut besterik Hola erabiliz $1 gune zentsuratu bat!"
    },
    "I'm using $1 to view $2 in my country, and surf faster!": {
        "message": "$1 erabiltzen dut $2 ikusteko nire herrialdean, eta azkarrago nabigatzen!"
    },
    "IE": {
        "message": "Irlanda"
    },
    "IM": {
        "message": "Man uhartea"
    },
    "IO": {
        "message": "Indiako Ozeanoko Britainiar Lurraldea"
    },
    "IQ": {
        "message": "Irak"
    },
    "IS": {
        "message": "Islandia"
    },
    "IT": {
        "message": "Italia"
    },
    "Improve translation": {
        "message": "Itzulpena hobetzeko"
    },
    "Initializing...": {
        "message": "Hasten..."
    },
    "Install": {
        "message": "Instalatu"
    },
    "Install Accelerator": {
        "message": "Instalatu Accelerator"
    },
    "Install Free Hola Accelerator": {
        "message": "Instalatu Free Hola Accelerator"
    },
    "Instantly watch any torrent Video": {
        "message": "Edozein torrent Video Berehala ikusi"
    },
    "Invite friends - free Premium.": {
        "message": "Gonbidatu lagunak - free Premium."
    },
    "Invite friends. Get Premium.": {
        "message": "Gonbidatu lagunak. Talde Premium."
    },
    "JM": {
        "message": "Jamaika"
    },
    "JO": {
        "message": "Jordania"
    },
    "JP": {
        "message": "Japonia"
    },
    "KE": {
        "message": "Kenia"
    },
    "KG": {
        "message": "Kirgizistan"
    },
    "KH": {
        "message": "Kanbodia"
    },
    "KM": {
        "message": "Komoreak"
    },
    "KN": {
        "message": "Saint Kitts eta Nevis"
    },
    "KP": {
        "message": "Ipar Korea"
    },
    "KR": {
        "message": "Hego Korea"
    },
    "KY": {
        "message": "Kaiman Uharteak"
    },
    "LB": {
        "message": "Libano"
    },
    "LC": {
        "message": "Santa Luzia"
    },
    "LT": {
        "message": "Lituania"
    },
    "LU": {
        "message": "Luxenburgo"
    },
    "LV": {
        "message": "Letonia"
    },
    "LY": {
        "message": "Libia"
    },
    "Language": {
        "message": "Hizkuntza"
    },
    "Loading": {
        "message": "Lanean"
    },
    "Loading site...": {
        "message": "Lanean..."
    },
    "Log in": {
        "message": "Saioa hasi"
    },
    "Log out": {
        "message": "Saioa amaitu"
    },
    "Love Hola?": {
        "message": "Hola maite?"
    },
    "MA": {
        "message": "Maroko"
    },
    "MC": {
        "message": "Monako"
    },
    "MD": {
        "message": "Moldavia"
    },
    "MG": {
        "message": "Madagaskar"
    },
    "MH": {
        "message": "Marshall uharteak"
    },
    "MK": {
        "message": "Mazedonia"
    },
    "MM": {
        "message": "Birmania"
    },
    "MO": {
        "message": "Makau"
    },
    "MP": {
        "message": "Iparraldeko Mariana uharteak"
    },
    "MU": {
        "message": "Maurizio"
    },
    "MV": {
        "message": "Maldivak"
    },
    "MX": {
        "message": "Mexiko"
    },
    "MY": {
        "message": "Malasia"
    },
    "MZ": {
        "message": "Mozambike"
    },
    "Make your Internet better with $1": {
        "message": "Egin zure Internet $1-ekin hobeto"
    },
    "More countries": {
        "message": "Herrialde gehiago"
    },
    "More sites...": {
        "message": "gehiago..."
    },
    "More...": {
        "message": "gehiago..."
    },
    "My Account": {
        "message": "Nire kontua"
    },
    "My History": {
        "message": "Nire Historia"
    },
    "My Settings": {
        "message": "Nire ezarpenak"
    },
    "My favorites": {
        "message": "Nire tokiak"
    },
    "NC": {
        "message": "Kaledonia Berria"
    },
    "NF": {
        "message": "Norfolk uhartea"
    },
    "NI": {
        "message": "Nikaragua"
    },
    "NL": {
        "message": "Herbehereak"
    },
    "NO": {
        "message": "Norvegia"
    },
    "NZ": {
        "message": "Zeelanda Berria"
    },
    "Need Help?": {
        "message": "Laguntza behar duzu?"
    },
    "Never ask me again": {
        "message": "Inoiz ez galdetu berriro"
    },
    "Never be a peer": {
        "message": "Inoiz izan parez"
    },
    "No": {
        "message": "Ez"
    },
    "No idle peers found.": {
        "message": "No ikaskideek idle aurkitu."
    },
    "No recent videos found": {
        "message": "Ez dago azken bideoak topatu"
    },
    "No saved videos found": {
        "message": "Ez da gordetako bideoak topatu"
    },
    "No title": {
        "message": "Titulurik"
    },
    "No videos found": {
        "message": "Ez da bideorik aurkitu"
    },
    "No videos found on active page": {
        "message": "Ez da bideorik orri aktibo topatu"
    },
    "No, Thanks": {
        "message": "Ez, esker"
    },
    "No, fix it": {
        "message": "Ez, konpondu"
    },
    "Not working?": {
        "message": "Ez lan?"
    },
    "Number of users that pressed not working": {
        "message": "Hori ez sakatzen lan erabiltzaile kopurua"
    },
    "Number of users that use this option": {
        "message": "Aukera hau erabiltzen duten erabiltzaile kopurua"
    },
    "Oh, yes!": {
        "message": "Bai, bai!"
    },
    "Old version of Firefox. Press <a>here</a> to upgrade.": {
        "message": "Firefox bertsio zaharra. Prentsa <a> hemen </a> berritzea."
    },
    "Our Brand New Mplayer is Coming Soon!": {
        "message": "Gure marka berria MPlayer arida!"
    },
    "PF": {
        "message": "Polinesia Frantsesa"
    },
    "PG": {
        "message": "Papua Ginea Berria"
    },
    "PH": {
        "message": "Filipinak"
    },
    "PL": {
        "message": "Polonia"
    },
    "PM": {
        "message": "Saint-Pierre eta Mikelune"
    },
    "PS": {
        "message": "Palestina"
    },
    "PY": {
        "message": "Paraguai"
    },
    "Please disable other <a>extensions</a> that you think might control your proxy settings such as ad-blockers, other VPN services, etc.": {
        "message": "Mesedez ezgaitu uste zure proxy esaterako, ad-blokeatzaileak, beste VPN zerbitzuak, etab <a>ezarpenak</a> kontrolatzeko dezakezu Beste hedapen"
    },
    "Please enter a valid email address.": {
        "message": "Sartu baliozko helbide elektronikoa."
    },
    "Please enter a web site address, like facebook.com": {
        "message": "Sartu web gunearen helbidea, facebook.com bezalako"
    },
    "Please help us get better": {
        "message": "Mesedez, laguntza hobeak lortzeko gurekin"
    },
    "Popular in $1": {
        "message": "Popular $1"
    },
    "Popular in the world": {
        "message": "Munduko herri"
    },
    "Popular sites": {
        "message": "Guneak Popular"
    },
    "QA": {
        "message": "Katar"
    },
    "RO": {
        "message": "Errumania"
    },
    "RU": {
        "message": "Errusia"
    },
    "RW": {
        "message": "Ruanda"
    },
    "Recent Videos": {
        "message": "Azken bideoak"
    },
    "Reload": {
        "message": "Freskatuz"
    },
    "Reload Hola": {
        "message": "Berritze Hola"
    },
    "Remember server": {
        "message": "Gogoan izan zerbitzaria"
    },
    "Report a problem": {
        "message": "Arazo baten berri"
    },
    "SB": {
        "message": "Salomon uharteak"
    },
    "SC": {
        "message": "Seychelleak"
    },
    "SE": {
        "message": "Suedia"
    },
    "SG": {
        "message": "Singapur"
    },
    "SI": {
        "message": "Eslovenia"
    },
    "SJ": {
        "message": "Svalbard eta Jan Mayen uharteak"
    },
    "SK": {
        "message": "Eslovakia"
    },
    "SL": {
        "message": "Sierra Leona"
    },
    "SR": {
        "message": "Surinam"
    },
    "ST": {
        "message": "Sao Tomé eta Principe"
    },
    "SY": {
        "message": "Siria"
    },
    "SZ": {
        "message": "Swazilandia"
    },
    "Saved Videos": {
        "message": "Gordetako Bideoak"
    },
    "Saved for later": {
        "message": "Geroago gorde"
    },
    "Search video title": {
        "message": "Search bideoaren titulua"
    },
    "Select a Country": {
        "message": "Herrialde bat aukeratu"
    },
    "Select site to unblock": {
        "message": "Aukeratu gune desblokeatu"
    },
    "Server saved!": {
        "message": "Zerbitzari gorde!"
    },
    "Settings": {
        "message": "Ezarpenak"
    },
    "Share $1 on $2": {
        "message": "Share $1 $2 an"
    },
    "Share $1 via $2": {
        "message": "Share $1 $2 via"
    },
    "Sign up": {
        "message": "Izena eman"
    },
    "Solve buffering": {
        "message": "Konpontzeko buferra"
    },
    "Solve buffering problems with": {
        "message": "Konponduko dituzten buferra arazoak"
    },
    "Solves it": {
        "message": "Konpontzen da"
    },
    "Staff Picks": {
        "message": "Langileak Picks"
    },
    "Start Hola": {
        "message": "Irteeran"
    },
    "Starting...": {
        "message": "Hasten..."
    },
    "Stopping peer routing...": {
        "message": "Peer routing gelditu..."
    },
    "Stream Instantly": {
        "message": "Stream Berehala"
    },
    "Submit": {
        "message": "Aurkez"
    },
    "Support Hola": {
        "message": "Euskarria Hola"
    },
    "TC": {
        "message": "Turk eta Caico uharteak"
    },
    "TD": {
        "message": "Txad"
    },
    "TF": {
        "message": "Frantziaren Lurralde Australak"
    },
    "TH": {
        "message": "Tailandia"
    },
    "TJ": {
        "message": "Tadjikistan"
    },
    "TL": {
        "message": "Ekialdeko Timor"
    },
    "TR": {
        "message": "Turkia"
    },
    "TT": {
        "message": "Trinidad eta Tobago"
    },
    "Talk to us on $1": {
        "message": "Hizketan $1"
    },
    "Tell friends about $1": {
        "message": "Hitz egin lagunekin buruz $1"
    },
    "Testing connection...": {
        "message": "Probak konexioa..."
    },
    "Thank you!": {
        "message": "Eskerrik asko!"
    },
    "There seems to be an error": {
        "message": "Badirudi errore bat dagoela"
    },
    "Top popular sites": {
        "message": "Top guneak popular"
    },
    "Translate to your language": {
        "message": "Hizkuntza itzultzeko"
    },
    "Try again": {
        "message": "Saiatu berriz"
    },
    "Try another server": {
        "message": "Saiatu beste zerbitzari"
    },
    "Try it": {
        "message": "Saiatu"
    },
    "Try to <span>reload</span>": {
        "message": "Saiatzeko <span>reload</span>"
    },
    "Trying another peer...": {
        "message": "Peer bestera saiatzen..."
    },
    "Turn off Accelerator": {
        "message": "Itzali Accelerator"
    },
    "Turn off Hola": {
        "message": "Itzali Hola"
    },
    "Turn on Accelerator": {
        "message": "Accelerator Piztu"
    },
    "Turn on Hola": {
        "message": "Hola Piztu"
    },
    "Turn on to get started": {
        "message": "Aktibatu Hasteko"
    },
    "UA": {
        "message": "Ukraina"
    },
    "UM": {
        "message": "Estatu Batuetatik urruti dauden uharte txikiak"
    },
    "US": {
        "message": "Ameriketako Estatu Batuak"
    },
    "UY": {
        "message": "Uruguai"
    },
    "Unblocker is disabled": {
        "message": "Unblocker desgaituta dago"
    },
    "Update": {
        "message": "Eguneratzea"
    },
    "Upgrade": {
        "message": "Eguneratzea"
    },
    "Using": {
        "message": "Erabiliz"
    },
    "Using Hola": {
        "message": "Hola erabiliz"
    },
    "VA": {
        "message": "Vatikano"
    },
    "VC": {
        "message": "Saint Vincent eta Grenadinak"
    },
    "VG": {
        "message": "Birjina uharte britainiarrak"
    },
    "VI": {
        "message": "Birjina uharte amerikarrak"
    },
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {
        "message": "Hola erabili Chrome, <a> eguneratu </a> Chrome bertsio oso zaharra"
    },
    "Video": {
        "message": "Bideo"
    },
    "Video stuck?": {
        "message": "Bideo itsatsita?"
    },
    "Videos available for instant streaming": {
        "message": "Bideoak berehalako streaming eskuragarri"
    },
    "WF": {
        "message": "Wallis eta Futuna"
    },
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {
        "message": "Hola nahi beste gailu batzuetan? (Xbox, PS, Apple TV, iPhone...). Egin klik hemen"
    },
    "Want to know more?": {
        "message": "Gehiago jakin nahi duzu?"
    },
    "Watch Now": {
        "message": "Watch orain"
    },
    "We found $1 videos": {
        "message": "Aurkitu dugu $1 bideoak"
    },
    "We will be in touch with you soon": {
        "message": "Zurekin harremanetan jarriko gara laster"
    },
    "Working!": {
        "message": "Lan!"
    },
    "Working?": {
        "message": "Lan?"
    },
    "Yes": {
        "message": "Bai"
    },
    "You need to upgrade to the latest version of Opera to use Hola. Press <a>here</a> to upgrade.": {
        "message": "Opera azken bertsioa berritu Hola erabili behar duzu. Sakatu <a>hemen</a> berritzea."
    },
    "ZA": {
        "message": "Hegoafrika"
    },
    "app_desc": {
        "message": "Zure herrialdea, enpresa edo Hola batera eskolan blokeatu sarbide webgune? Hola dohainik eta erabiltzeko erraza da!"
    },
    "back to": {
        "message": "atzera"
    },
    "changing...": {
        "message": "aldatzen..."
    },
    "cool sites": {
        "message": "cool guneak"
    },
    "current site": {
        "message": "oraingoa gune"
    },
    "even more...": {
        "message": "are gehiago..."
    },
    "more options...": {
        "message": "aukera gehiago..."
    },
    "not working?": {
        "message": "ez lan?"
    },
    "not working? try another server": {
        "message": "ez lan? saiatu beste zerbitzari"
    },
    "on this page": {
        "message": "Orrialde honetako"
    },
    "sites that are censored": {
        "message": "duten zentsuratu diren guneak"
    },
    "start": {
        "message": "Irteeran"
    },
    "working? remember": {
        "message": "lan? gogoratu"
    }
};
return E; });