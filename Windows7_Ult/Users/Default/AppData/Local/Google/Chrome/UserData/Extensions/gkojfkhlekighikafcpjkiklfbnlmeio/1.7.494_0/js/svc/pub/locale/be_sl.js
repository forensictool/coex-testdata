'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    " via ": {
        "message": " preko "
    },
    "$1 Buffering?": {
        "message": "$1 Pufer?"
    },
    "$1 Hola to access $2\n\nClick here to do the same: $3\n\nIt installs Hola, which lets me surf the Internet faster and access $4$5": {
        "message": "$1 Hola dostop do $2\n\nKliknite tukaj, da storijo enako: $3\n\nIt namesti Hola, ki mi omogoča brskanje po internetu hitreje in dostop do $4$5"
    },
    "$1 from $2": {
        "message": "$1 iz $2"
    },
    "$1 not found": {
        "message": "$1 ni bilo mogoče najti"
    },
    "$1 via Hola": {
        "message": "$1 preko Hola"
    },
    "(some Hola features are not available on your version)": {
        "message": "(Nekatere Hola storitve niso na voljo v  vaši verziji)"
    },
    "AD": {
        "message": "Andora"
    },
    "AE": {
        "message": "Združeni arabski emirati"
    },
    "AF": {
        "message": "Afganistan"
    },
    "AG": {
        "message": "Antigva in Barbuda"
    },
    "AI": {
        "message": "Angvila"
    },
    "AL": {
        "message": "Albanija"
    },
    "AM": {
        "message": "Armenija"
    },
    "AN": {
        "message": "Nizozemski Antili"
    },
    "AQ": {
        "message": "Antarktika"
    },
    "AS": {
        "message": "Ameriška Samoa"
    },
    "AT": {
        "message": "Avstrija"
    },
    "AU": {
        "message": "Avstralija"
    },
    "AX": {
        "message": "Alandsko otočje"
    },
    "AZ": {
        "message": "Azerbajdžan"
    },
    "About": {
        "message": "O"
    },
    "About Hola": {
        "message": "O Hola"
    },
    "Accelerator": {
        "message": "Pospeševalnik"
    },
    "Accelerator is": {
        "message": "Pospeševalnika"
    },
    "Access $1 - cool site!": {
        "message": "Dostop do $1 - cool site!"
    },
    "Access $1?": {
        "message": "Dostop do $1?"
    },
    "Access any site from any country, free": {
        "message": "Dostop do katerekoli strani, iz katerkoli države, zastonj"
    },
    "Access cool sites": {
        "message": "Dostop Zanimive strani"
    },
    "Access more sites": {
        "message": "Dostop do več spletnih mest"
    },
    "Accessing $1 with Hola": {
        "message": "Dostop do $1 s Hola"
    },
    "Account": {
        "message": "Račun"
    },
    "Account type": {
        "message": "Vrsta računa"
    },
    "All ($1)": {
        "message": "Vse ($1)"
    },
    "Apply settings...": {
        "message": "Uporabi nastavitve ..."
    },
    "Author site:": {
        "message": "Stran avtorja:"
    },
    "Author:": {
        "message": "Avtor:"
    },
    "Awesome!": {
        "message": "Super!"
    },
    "BA": {
        "message": "Bosna in Hercegovina"
    },
    "BD": {
        "message": "Bangladeš"
    },
    "BE": {
        "message": "Belgija"
    },
    "BG": {
        "message": "Bolgarija"
    },
    "BH": {
        "message": "Bahrajn"
    },
    "BL": {
        "message": "Saint Barthelemy"
    },
    "BM": {
        "message": "Bermudi"
    },
    "BN": {
        "message": "Brunej"
    },
    "BO": {
        "message": "Bolivija"
    },
    "BR": {
        "message": "Brazilija"
    },
    "BS": {
        "message": "Bahami"
    },
    "BT": {
        "message": "Butan"
    },
    "BV": {
        "message": "Bouvetov otok"
    },
    "BW": {
        "message": "Bocvana"
    },
    "BY": {
        "message": "Belorusija"
    },
    "Back to $1": {
        "message": "Nazaj na $1"
    },
    "Be the first to get Hola for iPhone/iPad - Register now:": {
        "message": "Bodi prvi, da bi dobili Hola za iPhone / iPad - Registracija zdaj:"
    },
    "Browsing": {
        "message": "Brskanje"
    },
    "Buffering problems?": {
        "message": "Buffering težave?"
    },
    "CA": {
        "message": "Kanada"
    },
    "CC": {
        "message": "Kokosovi otoki"
    },
    "CD": {
        "message": "Demokratična republika Kongo"
    },
    "CF": {
        "message": "Centralnoafriška republika"
    },
    "CG": {
        "message": "Kongo"
    },
    "CH": {
        "message": "Švica"
    },
    "CI": {
        "message": "Slonokoščena obala"
    },
    "CK": {
        "message": "Cookovo otočje"
    },
    "CL": {
        "message": "Čile"
    },
    "CM": {
        "message": "Kamerun"
    },
    "CN": {
        "message": "Kitajska"
    },
    "CO": {
        "message": "Kolumbija"
    },
    "CR": {
        "message": "Kostarika"
    },
    "CS": {
        "message": "Srbija in Črna gora"
    },
    "CU": {
        "message": "Kuba"
    },
    "CV": {
        "message": "Zelenortski otoki"
    },
    "CX": {
        "message": "Božični otok"
    },
    "CY": {
        "message": "Ciper"
    },
    "CZ": {
        "message": "Češka"
    },
    "Changing country...": {
        "message": "Spreminjanje državo ..."
    },
    "Check out Hola for $1!": {
        "message": "Oglejte si Hola za $1!"
    },
    "Check your Internet connection": {
        "message": "Preverite, če imate internet"
    },
    "Choose<br>Country": {
        "message": "Izberite <br> Država"
    },
    "Configuring...": {
        "message": "Konfiguracija ..."
    },
    "Connecting...": {
        "message": "Povezovanje ..."
    },
    "Creative licenses": {
        "message": "Creative licence"
    },
    "DE": {
        "message": "Nemčija"
    },
    "DJ": {
        "message": "Džibuti"
    },
    "DK": {
        "message": "Danska"
    },
    "DM": {
        "message": "Dominika"
    },
    "DO": {
        "message": "Dominikanska republika"
    },
    "DZ": {
        "message": "Alžirija"
    },
    "Delete": {
        "message": "Izbriši"
    },
    "Deleted from my list": {
        "message": "Izbrisan iz mojega seznama"
    },
    "Did it work?": {
        "message": "Je delovalo?"
    },
    "Did you experience any buffering?": {
        "message": "Ali opazite buffering?"
    },
    "Don't show again for $1 for one week": {
        "message": "Ne kaži za $1 za en teden"
    },
    "Don't show again for any site for one week": {
        "message": "Ne kaži za katero koli spletno stran za en teden"
    },
    "Downloading": {
        "message": "Prenos"
    },
    "EC": {
        "message": "Ekvador"
    },
    "EE": {
        "message": "Estonija"
    },
    "EG": {
        "message": "Egipt"
    },
    "EH": {
        "message": "Zahodna Sahara"
    },
    "ER": {
        "message": "Eritreja"
    },
    "ES": {
        "message": "Španija"
    },
    "ET": {
        "message": "Etiopija"
    },
    "Enable": {
        "message": "Omogoči"
    },
    "Enable Hola Accelerator": {
        "message": "Omogoči Hola Accelerator"
    },
    "Enjoy!": {
        "message": "Uživajte!"
    },
    "Enter site to access": {
        "message": "Vpišite spletno stran z dostopom"
    },
    "Enter your email": {
        "message": "Vpišite svoj e-mail"
    },
    "FI": {
        "message": "Finska"
    },
    "FJ": {
        "message": "Fidži"
    },
    "FK": {
        "message": "Falklandski otoki"
    },
    "FM": {
        "message": "Mikronezija"
    },
    "FO": {
        "message": "Ferski otoki"
    },
    "FR": {
        "message": "Francija"
    },
    "Finding new peers...": {
        "message": "Iskanje novih vrstnikov ..."
    },
    "Finding peers...": {
        "message": "Iskanje vrstnike ..."
    },
    "Free": {
        "message": "Brezplačno"
    },
    "From": {
        "message": "Od"
    },
    "Full list": {
        "message": "Celoten seznam"
    },
    "GB": {
        "message": "Velika Britanija"
    },
    "GE": {
        "message": "Gruzija"
    },
    "GF": {
        "message": "Francoska Gvajana"
    },
    "GH": {
        "message": "Gana"
    },
    "GL": {
        "message": "Grenlandija"
    },
    "GM": {
        "message": "Gambija"
    },
    "GN": {
        "message": "Gvineja"
    },
    "GP": {
        "message": "Gvadalupe"
    },
    "GQ": {
        "message": "Ekvatorialna Gvineja"
    },
    "GR": {
        "message": "Grčija"
    },
    "GS": {
        "message": "Južna Georgia in Južni Sandwichevi otoki"
    },
    "GT": {
        "message": "Gvatemala"
    },
    "GW": {
        "message": "Gvineja Bissau"
    },
    "GY": {
        "message": "Gvajana"
    },
    "Get 24/7 Unblocking": {
        "message": "Get 24/7 odblokiranje"
    },
    "Get Hola Accelerator": {
        "message": "Pridobite Hola Accelerator"
    },
    "Get Hola Player": {
        "message": "Pridobite Hola Player"
    },
    "Get Hola Plus for un-interrupted, ad-free service.": {
        "message": "Dobite Hola Plus za neprekinjeno, brez oglasno storitev."
    },
    "Get Hola Premium": {
        "message": "Pridobite Hola Premium"
    },
    "Get Hola for Android": {
        "message": "Get Hola za Android"
    },
    "Get Premium support": {
        "message": "Get Premium podpora"
    },
    "Get Unlimited Unblocking": {
        "message": "Get Unlimited odblokiranje"
    },
    "Get access to censored sites, try it now: $1": {
        "message": "Dobili dostop do cenzuriranih straneh, poskusite zdaj: $1"
    },
    "Get help from engineer over Skype:": {
        "message": "Dobite pomoč od inžinirja preko Skypa:"
    },
    "Get the Fastest Servers": {
        "message": "Get najhitrejši strežniki"
    },
    "Go": {
        "message": "Pojdi"
    },
    "Go Hola Premium": {
        "message": "Pojdi Hola Premium"
    },
    "HK": {
        "message": "Posebno administrativno območje LR Kitajske Hong Kong"
    },
    "HM": {
        "message": "Otok Heard in otočje McDonald"
    },
    "HR": {
        "message": "Hrvaška"
    },
    "HU": {
        "message": "Madžarska"
    },
    "Help": {
        "message": "Pomaga"
    },
    "Hey,\n\nI'm using": {
        "message": "Hej,\n\njaz sem z uporabo"
    },
    "Hi,\n\nI started using $1 ($2). It lets me surf the Internet faster and access $3 in my country.": {
        "message": "Hi,\n\nsem začel uporabljati za $1 ($2). To mi omogoča brskanje po internetu hitreje in dostop do $3 v moji državi."
    },
    "Hola cannot work because another extension is controlling your proxy settings.": {
        "message": "Hola ne morejo delati, ker je drugo podaljšanje kontrolo nastavitve strežnika proxy."
    },
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {
        "message": "Hola ne deluje dobro v Windows 8 načinu. Prosim preklopite v namizen način, Kliknite <a>tu</a> za navodila"
    },
    "Hola is not available right now, but we are working on it.": {
        "message": "Hola ni na voljo prav zdaj, ampak delamo na tem."
    },
    "Hola is off, click it to turn it on": {
        "message": "Hola izklopljen, kliknite vklopite"
    },
    "Hola site list": {
        "message": "Hola seznam strani"
    },
    "I can now access $1 from any country!": {
        "message": "Zdaj lahko dostopate do uporabnika $1 iz katere koli države!"
    },
    "I did not experience any buffering": {
        "message": "Nisem ne občutijo buffering"
    },
    "I just accessed a censored site using Hola for $1!": {
        "message": "Pravkar sem dostopen na cenzurirani strani z uporabo Hola za $1!"
    },
    "I'm using $1 to view $2 in my country, and surf faster!": {
        "message": "Jaz sem z $1 do $2 ogledate v moji državi, in brskanje hitreje!"
    },
    "ID": {
        "message": "Indonezija"
    },
    "IE": {
        "message": "Irska"
    },
    "IL": {
        "message": "Izrael"
    },
    "IM": {
        "message": "Otok Man"
    },
    "IN": {
        "message": "Indija"
    },
    "IO": {
        "message": "Britansko ozemlje v Indijskem oceanu"
    },
    "IQ": {
        "message": "Irak"
    },
    "IS": {
        "message": "Islandija"
    },
    "IT": {
        "message": "Italija"
    },
    "Improve translation": {
        "message": "Izboljšaj prevod"
    },
    "Initializing...": {
        "message": "Inicializiram..."
    },
    "Install": {
        "message": "Namesti"
    },
    "Install Accelerator": {
        "message": "Namestite Accelerator"
    },
    "Install Free Hola Accelerator": {
        "message": "Brezplačno namestite Hola Accelerator"
    },
    "Instantly watch any torrent Video": {
        "message": "Takoj gledate torrent Video"
    },
    "Invite friends - free Premium.": {
        "message": "Povabi prijatelje - brezplačno Premium."
    },
    "Invite friends. Get Premium.": {
        "message": "Povabite prijatelje. Get Premium."
    },
    "JM": {
        "message": "Jamajka"
    },
    "JO": {
        "message": "Jordanija"
    },
    "JP": {
        "message": "Japonska"
    },
    "KE": {
        "message": "Kenija"
    },
    "KG": {
        "message": "Kirgizistan"
    },
    "KH": {
        "message": "Kambodža"
    },
    "KM": {
        "message": "Komori"
    },
    "KN": {
        "message": "Saint Kitts in Nevis"
    },
    "KP": {
        "message": "Severna Koreja"
    },
    "KR": {
        "message": "Južna Koreja"
    },
    "KW": {
        "message": "Kuvajt"
    },
    "KY": {
        "message": "Kajmanski otoki"
    },
    "KZ": {
        "message": "Kazahstan"
    },
    "LB": {
        "message": "Libanon"
    },
    "LI": {
        "message": "Lihtenštajn"
    },
    "LK": {
        "message": "Šrilanka"
    },
    "LR": {
        "message": "Liberija"
    },
    "LS": {
        "message": "Lesoto"
    },
    "LT": {
        "message": "Litva"
    },
    "LU": {
        "message": "Luksemburg"
    },
    "LV": {
        "message": "Latvija"
    },
    "LY": {
        "message": "Libija"
    },
    "Language": {
        "message": "Jezik"
    },
    "Loading": {
        "message": "Nalagam"
    },
    "Loading site...": {
        "message": "Nalagam"
    },
    "Log in": {
        "message": "Se prijavite"
    },
    "Log out": {
        "message": "Odjava"
    },
    "Love Hola?": {
        "message": "Ljubezen Hola?"
    },
    "MA": {
        "message": "Maroko"
    },
    "MC": {
        "message": "Monako"
    },
    "MD": {
        "message": "Moldavija"
    },
    "ME": {
        "message": "Črna gora"
    },
    "MG": {
        "message": "Madagaskar"
    },
    "MH": {
        "message": "Marshallovi otoki"
    },
    "MK": {
        "message": "Makedonija"
    },
    "MM": {
        "message": "Mjanmar"
    },
    "MN": {
        "message": "Mongolija"
    },
    "MO": {
        "message": "Posebno administrativno območje LR Kitajske Macao"
    },
    "MP": {
        "message": "Severni Marianski otoki"
    },
    "MQ": {
        "message": "Martinik"
    },
    "MR": {
        "message": "Mavretanija"
    },
    "MV": {
        "message": "Maldivi"
    },
    "MW": {
        "message": "Malavi"
    },
    "MX": {
        "message": "Mehika"
    },
    "MY": {
        "message": "Malezija"
    },
    "MZ": {
        "message": "Mozambik"
    },
    "Make your Internet better with $1": {
        "message": "Naredite svoj Internet boljši na $1"
    },
    "Menu": {
        "message": "Meni"
    },
    "Mode": {
        "message": "Način"
    },
    "More countries": {
        "message": "Več držav"
    },
    "More sites...": {
        "message": "več..."
    },
    "More...": {
        "message": "več..."
    },
    "My Account": {
        "message": "Moj račun"
    },
    "My History": {
        "message": "Moja zgodovina"
    },
    "My Settings": {
        "message": "Moje nastavitve"
    },
    "My favorites": {
        "message": "Moja izbira"
    },
    "NA": {
        "message": "Namibija"
    },
    "NC": {
        "message": "Nova Kaledonija"
    },
    "NF": {
        "message": "Norfolški otok"
    },
    "NG": {
        "message": "Nigerija"
    },
    "NI": {
        "message": "Nikaragva"
    },
    "NL": {
        "message": "Nizozemska"
    },
    "NO": {
        "message": "Norveška"
    },
    "NZ": {
        "message": "Nova Zelandija"
    },
    "Need Help?": {
        "message": "Potrebujete pomoč?"
    },
    "Never ask me again": {
        "message": "Nikoli ne sprašuj"
    },
    "Never be a peer": {
        "message": "Nikoli ne bo peer"
    },
    "No": {
        "message": "Ne"
    },
    "No idle peers found.": {
        "message": "Ni najdenih idle vrstniki."
    },
    "No recent videos found": {
        "message": "Najdenih Ni nedavnih videoposnetkov"
    },
    "No saved videos found": {
        "message": "Ni najdenih shranjenih video posnetkov"
    },
    "No title": {
        "message": "Brez naslova"
    },
    "No videos found": {
        "message": "Ni videoposnetkov"
    },
    "No videos found on active page": {
        "message": "Ni najdenih na aktivni strani videos"
    },
    "No, Thanks": {
        "message": "Ne, hvala"
    },
    "No, fix it": {
        "message": "Ne, to popravim"
    },
    "Not working?": {
        "message": "Ne deluje?"
    },
    "Number of users that pressed not working": {
        "message": "Število uporabnikov, ki je pritisnilo \"ne deluje\""
    },
    "Number of users that use this option": {
        "message": "Število uporabnikov, ki uporablja to možnost"
    },
    "Off": {
        "message": "Izključeno"
    },
    "Oh, yes!": {
        "message": "Oh, ja!"
    },
    "Old version of Firefox. Press <a>here</a> to upgrade.": {
        "message": "Stara verzija Firefoxa. Kliknite <a>tu</a> za posodobitev."
    },
    "On": {
        "message": "Vključeno"
    },
    "Open Media Player": {
        "message": "Odpri Media Player"
    },
    "Our Brand New Mplayer is Coming Soon!": {
        "message": "Naša Brand New Mplayer je Coming Soon!"
    },
    "PF": {
        "message": "Francoska Polinezija"
    },
    "PG": {
        "message": "Papua Nova Gvineja"
    },
    "PH": {
        "message": "Filipini"
    },
    "PL": {
        "message": "Poljska"
    },
    "PM": {
        "message": "Saint Pierre in Miquelon"
    },
    "PN": {
        "message": "Pitcairn"
    },
    "PR": {
        "message": "Portoriko"
    },
    "PS": {
        "message": "Palestinsko ozemlje"
    },
    "PT": {
        "message": "Portugalska"
    },
    "PY": {
        "message": "Paragvaj"
    },
    "Please disable other <a>extensions</a> that you think might control your proxy settings such as ad-blockers, other VPN services, etc.": {
        "message": "Prosimo izključite druge <a>razširitve</a>, ki mislite, da bi lahko nadzor nastavitve za proxy, kot so ad-blokatorji, drugih storitev VPN itd"
    },
    "Please enter a valid email address.": {
        "message": "Prosimo, vnesite veljaven e-poštni naslov."
    },
    "Please enter a web site address, like facebook.com": {
        "message": "Prosimo, vnesite naslov spletne strani, kot facebook.com"
    },
    "Please help us get better": {
        "message": "Prosim, pomagajte nam bo bolje"
    },
    "Popular in $1": {
        "message": "Priljubljena v $1"
    },
    "Popular in the world": {
        "message": "Priljubljena v svetu"
    },
    "Popular sites": {
        "message": "Priljubljena spletna mesta"
    },
    "QA": {
        "message": "Katar"
    },
    "RE": {
        "message": "Reunion"
    },
    "RO": {
        "message": "Romunija"
    },
    "RS": {
        "message": "Srbija"
    },
    "RU": {
        "message": "Rusija"
    },
    "RW": {
        "message": "Ruanda"
    },
    "Recent Videos": {
        "message": "Nedavni posnetki"
    },
    "Reload": {
        "message": "Osveži"
    },
    "Reload Hola": {
        "message": "Osveži Hola"
    },
    "Remember server": {
        "message": "Zapomni si strežnik"
    },
    "Report a problem": {
        "message": "Prijavi težavo"
    },
    "SA": {
        "message": "Saudova Arabija"
    },
    "SB": {
        "message": "Salomonovi otoki"
    },
    "SC": {
        "message": "Sejšeli"
    },
    "SE": {
        "message": "Švedska"
    },
    "SG": {
        "message": "Singapur"
    },
    "SH": {
        "message": "Sveta Helena"
    },
    "SI": {
        "message": "Slovenija"
    },
    "SJ": {
        "message": "Svalbard in Jan Mayen"
    },
    "SK": {
        "message": "Slovaška"
    },
    "SO": {
        "message": "Somalija"
    },
    "SR": {
        "message": "Surinam"
    },
    "ST": {
        "message": "Sao Tome in Principe"
    },
    "SV": {
        "message": "Salvador"
    },
    "SY": {
        "message": "Sirija"
    },
    "SZ": {
        "message": "Svazi"
    },
    "Save": {
        "message": "Shrani"
    },
    "Saved Videos": {
        "message": "Shranjeni posnetki"
    },
    "Saved for later": {
        "message": "Shrani za pozneje"
    },
    "Search video title": {
        "message": "Iskanje video naslov"
    },
    "Select a Country": {
        "message": "Izberite državo"
    },
    "Select site to unblock": {
        "message": "Izberite mesto odblokirati"
    },
    "Server saved!": {
        "message": "Server shranjene!"
    },
    "Settings": {
        "message": "Nastavitve"
    },
    "Share $1 on $2": {
        "message": "Deliti $1 na $2"
    },
    "Share $1 via $2": {
        "message": "Deliti $1 prek $2"
    },
    "Sign up": {
        "message": "Prijavite"
    },
    "Solve buffering": {
        "message": "Rešite buffering"
    },
    "Solve buffering problems with": {
        "message": "Rešite buffering težave z"
    },
    "Solves it": {
        "message": "To rešuje"
    },
    "Staff Picks": {
        "message": "Kadrovski Picks"
    },
    "Start Hola": {
        "message": "začni"
    },
    "Starting...": {
        "message": "Zaganjam..."
    },
    "Stopping peer routing...": {
        "message": "Ustavitev medsebojni poti ..."
    },
    "Stream Instantly": {
        "message": "Stream priči"
    },
    "Submit": {
        "message": "Oddati"
    },
    "Support Hola": {
        "message": "Podpora Hola"
    },
    "TC": {
        "message": "Otočji Turks in Caicos"
    },
    "TD": {
        "message": "Čad"
    },
    "TF": {
        "message": "Francosko južno ozemlje"
    },
    "TH": {
        "message": "Tajska"
    },
    "TJ": {
        "message": "Tadžikistan"
    },
    "TL": {
        "message": "Vzhodni Timor"
    },
    "TN": {
        "message": "Tunizija"
    },
    "TR": {
        "message": "Turčija"
    },
    "TT": {
        "message": "Trinidad in Tobago"
    },
    "TW": {
        "message": "Tajvan"
    },
    "TZ": {
        "message": "Tanzanija"
    },
    "Talk to us on $1": {
        "message": "Pogovorite se z nami z $1"
    },
    "Tell friends about $1": {
        "message": "Povej prijateljem o $1"
    },
    "Testing connection...": {
        "message": "Povezava testiranje ..."
    },
    "Thank you!": {
        "message": "Hvala za razumevanje!"
    },
    "There seems to be an error": {
        "message": "Zdi se, da je prišlo do napake"
    },
    "Top popular sites": {
        "message": "Top priljubljena spletna mesta"
    },
    "Translate to your language": {
        "message": "Prevedite v vaš jezik"
    },
    "Try again": {
        "message": "Poskusite znova"
    },
    "Try another server": {
        "message": "Poskusite drug strežnik"
    },
    "Try it": {
        "message": "Preizkusite"
    },
    "Try to <span>reload</span>": {
        "message": "Poskusite <span>osvežiti</span>"
    },
    "Trying another peer...": {
        "message": "Poskušamo drug peer ..."
    },
    "Turn off Accelerator": {
        "message": "Izklopi Accelerator"
    },
    "Turn off Hola": {
        "message": "Izklopi Hola"
    },
    "Turn on Accelerator": {
        "message": "Vklopite Accelerator"
    },
    "Turn on Hola": {
        "message": "Vklopite Hola"
    },
    "Turn on to get started": {
        "message": "Vključi, da začneš"
    },
    "UA": {
        "message": "Ukrajina"
    },
    "UM": {
        "message": "Druga ameriška ozemlja v Tihem oceanu"
    },
    "US": {
        "message": "Združene države Amerike"
    },
    "UY": {
        "message": "Urugvaj"
    },
    "Unblocker is disabled": {
        "message": "Unblocker je onemogočen"
    },
    "Update": {
        "message": "Osveži"
    },
    "Upgrade": {
        "message": "Osveži"
    },
    "Using": {
        "message": "Uporaba"
    },
    "Using Hola": {
        "message": "Uporaba Hola"
    },
    "VA": {
        "message": "Vatikan"
    },
    "VC": {
        "message": "Saint Vincent in Grenadine"
    },
    "VG": {
        "message": "Britanski Deviški otoki"
    },
    "VI": {
        "message": "Ameriški Deviški otoki"
    },
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {
        "message": "VZelo stara verija Chroma, <a>posodobi</a> Chrome za uporabo Hola"
    },
    "Video stuck?": {
        "message": "Video zaljubljen?"
    },
    "Videos available for instant streaming": {
        "message": "Video posnetki so na voljo za takojšnje streaming"
    },
    "WF": {
        "message": "Wallis in Futuna"
    },
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {
        "message": "Želite Hola na drugih napravah? (Xbox, PS, Apple TV, iPhone...). Kliknite tu"
    },
    "Want to know more?": {
        "message": "Želite izvedeti več?"
    },
    "Watch Now": {
        "message": "Pazi zdaj"
    },
    "We found $1 videos": {
        "message": "Ugotovili smo $1 videoposnetkov"
    },
    "We will be in touch with you soon": {
        "message": "Mi bomo v stik z vami kmalu"
    },
    "Working!": {
        "message": "Deluje!"
    },
    "Working?": {
        "message": "Delo?"
    },
    "YE": {
        "message": "Jemen"
    },
    "Yes": {
        "message": "Da"
    },
    "You need to upgrade to the latest version of Opera to use Hola. Press <a>here</a> to upgrade.": {
        "message": "Morate nadgraditi na najnovejšo različico Opere za uporabo Hola. Pritisnite <a>tukaj</a> za nadgradnjo."
    },
    "ZA": {
        "message": "Južnoafriška republika"
    },
    "ZM": {
        "message": "Zambija"
    },
    "ZW": {
        "message": "Zimbabve"
    },
    "ZZ": {
        "message": "Neznano ali neveljavno območje"
    },
    "app_desc": {
        "message": "Dostop do spletnih strani, ki so bili blokirani v vaši državi, podjetju ali v šoli s Hola! Hola je brezplačna in enostavna za uporabo!"
    },
    "app_name": {
        "message": "Hola Boljši Internet"
    },
    "back to": {
        "message": "nazaj k"
    },
    "changing...": {
        "message": "menjam..."
    },
    "cool sites": {
        "message": "Zanimive strani"
    },
    "current site": {
        "message": "Trenutna stran"
    },
    "even more...": {
        "message": "še več..."
    },
    "more options...": {
        "message": "Več možnosti ..."
    },
    "not working?": {
        "message": "ne deluje?"
    },
    "not working? try another server": {
        "message": "ne deluje? poskusite drug strežnik"
    },
    "on this page": {
        "message": "na tej strani"
    },
    "sites that are censored": {
        "message": "mesta, ki so cenzurirani"
    },
    "start": {
        "message": "začni"
    },
    "working? remember": {
        "message": "deluje? ne pozabite"
    }
};
return E; });