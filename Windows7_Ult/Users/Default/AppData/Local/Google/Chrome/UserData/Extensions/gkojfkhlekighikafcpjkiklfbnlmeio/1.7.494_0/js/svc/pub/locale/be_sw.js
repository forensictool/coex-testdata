'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    " via ": {
        "message": " kupitia "
    },
    "$1 Buffering?": {
        "message": "$1 Inaakibisha?"
    },
    "$1 Hola to access $2\n\nClick here to do the same: $3\n\nIt installs Hola, which lets me surf the Internet faster and access $4$5": {
        "message": "$1 Hola kupata $2\n\nClick hapa kwa kufanya hivyo: $3\n\nNi installs Hola, ambayo lets mimi surf internet kwa kasi na kupata $4$5"
    },
    "$1 not found": {
        "message": "$1 halikupatikana"
    },
    "$1 via Hola": {
        "message": "$1 kupitia Hola"
    },
    "(some Hola features are not available on your version)": {
        "message": "(Baadhi ya makala Hola si inapatikana kwenye toleo yako)"
    },
    "AE": {
        "message": "Muugano wa Falme za Nchi za Kiarabu"
    },
    "AG": {
        "message": "Antigua na Barbuda"
    },
    "AR": {
        "message": "Ajentina"
    },
    "About": {
        "message": "Kuhusu"
    },
    "About Hola": {
        "message": "Kuhusu Hola"
    },
    "Accelerator is": {
        "message": "Accelerator ni"
    },
    "Access $1 - cool site!": {
        "message": "Access $1 - tovuti ya baridi!"
    },
    "Access $1?": {
        "message": "Kupata $1?"
    },
    "Access any site from any country, free": {
        "message": "Kupata tovuti yoyote kutoka nchi yoyote, bure"
    },
    "Access cool sites": {
        "message": "Access baridi maeneo ya"
    },
    "Access more sites": {
        "message": "Upatikanaji wa maeneo ya zaidi"
    },
    "Accessing $1 with Hola": {
        "message": "Kupata $1 kwa Hola"
    },
    "Account": {
        "message": "Akaunti"
    },
    "Account type": {
        "message": "Aina akaunti"
    },
    "Apply settings...": {
        "message": "Kuomba mazingira ..."
    },
    "Author site:": {
        "message": "Mwandishi tovuti:"
    },
    "Author:": {
        "message": "Mwandishi:"
    },
    "Awesome!": {
        "message": "Kushangaza!"
    },
    "BA": {
        "message": "Bosnia na Herzegowina"
    },
    "BE": {
        "message": "Ubelgiji"
    },
    "BR": {
        "message": "Brazili"
    },
    "BS": {
        "message": "Visiwa vya Bahama"
    },
    "Back to $1": {
        "message": "Nyuma $1"
    },
    "Be the first to get Hola for iPhone/iPad - Register now:": {
        "message": "Kuwa wa kwanza kupata Hola kwa iPhone / iPad - Register sasa:"
    },
    "Browsing": {
        "message": "Inatafuta"
    },
    "Buffering problems?": {
        "message": "Buffering matatizo?"
    },
    "CA": {
        "message": "Kanada"
    },
    "CF": {
        "message": "Jamhuri ya Afrika ya Kati"
    },
    "CG": {
        "message": "Kongo"
    },
    "CH": {
        "message": "Uswisi"
    },
    "CI": {
        "message": "Pwani ya Pembe"
    },
    "CM": {
        "message": "Kamerun"
    },
    "CN": {
        "message": "Uchina"
    },
    "CO": {
        "message": "Kolombia"
    },
    "CS": {
        "message": "Serbiya da Montenegro"
    },
    "CV": {
        "message": "Rasi Verde"
    },
    "CZ": {
        "message": "Jamhuri ya Czech"
    },
    "Changing country...": {
        "message": "Mabadiliko ya nchi ..."
    },
    "Check out Hola for $1!": {
        "message": "Angalia Hola kwa $1!"
    },
    "Check your Internet connection": {
        "message": "Kuthibitisha una mtandao"
    },
    "Choose<br>Country": {
        "message": "Kuchagua <br> Nchi"
    },
    "Configuring...": {
        "message": "Configuring ..."
    },
    "Connecting...": {
        "message": "Inaunganisha ..."
    },
    "Cool site!": {
        "message": "Baridi tovuti!"
    },
    "Creative licenses": {
        "message": "Leseni Creative"
    },
    "DE": {
        "message": "Udachi"
    },
    "DJ": {
        "message": "Jibuti"
    },
    "DK": {
        "message": "Udenmarki"
    },
    "DM": {
        "message": "Dominika"
    },
    "DO": {
        "message": "Jamhuri ya Dominikan"
    },
    "Delete": {
        "message": "Kufuta"
    },
    "Deleted from my list": {
        "message": "Ilifutwa kutoka orodha yangu"
    },
    "Did it work?": {
        "message": "Je, kazi?"
    },
    "Did you experience any buffering?": {
        "message": "Je, uzoefu buffering yoyote?"
    },
    "Don't show again for $1 for one week": {
        "message": "Hawaonyeshi tena kwa $1 kwa wiki moja"
    },
    "Don't show again for any site for one week": {
        "message": "Hawaonyeshi tena kwa tovuti yoyote kwa wiki moja"
    },
    "Downloading": {
        "message": "Kushusha"
    },
    "EC": {
        "message": "Ekvado"
    },
    "EG": {
        "message": "Misri"
    },
    "ES": {
        "message": "Uhispania"
    },
    "ET": {
        "message": "Uhabeshi"
    },
    "Enable": {
        "message": "Kuwawezesha"
    },
    "Enable Hola Accelerator": {
        "message": "Kuwawezesha Hola Accelerator"
    },
    "Enjoy!": {
        "message": "Kufurahia!"
    },
    "Enter site to access": {
        "message": "Kuingia katika tovuti ya kupata"
    },
    "Enter your email": {
        "message": "Kuingia barua pepe yako"
    },
    "FR": {
        "message": "Ufaransa"
    },
    "Finding new peers...": {
        "message": "Kutafuta rika mpya ..."
    },
    "Finding peers...": {
        "message": "Kutafuta wenzao ..."
    },
    "Free": {
        "message": "Bure"
    },
    "From": {
        "message": "Kutoka"
    },
    "Full list": {
        "message": "Orodha kamili"
    },
    "GB": {
        "message": "Uingereza"
    },
    "GQ": {
        "message": "Guinea ya Ikweta"
    },
    "Get 24/7 Unblocking": {
        "message": "Kupata 24/7 kumfungulia"
    },
    "Get Free Premium": {
        "message": "Kupata Free Premium"
    },
    "Get Hola Accelerator": {
        "message": "Kupata Hola Accelerator"
    },
    "Get Hola Player": {
        "message": "Kupata Hola Player"
    },
    "Get Hola Plus for un-interrupted, ad-free service.": {
        "message": "Kupata Hola Plus kwa ajili ya huduma ya un-kuingiliwa, ad-bure."
    },
    "Get Hola Premium": {
        "message": "Kupata Hola Premium"
    },
    "Get Hola for Android": {
        "message": "Kupata Hola kwa Android"
    },
    "Get Premium support": {
        "message": "Kupata msaada Premium"
    },
    "Get Unlimited Unblocking": {
        "message": "Kupata Unlimited kumfungulia"
    },
    "Get access to censored sites, try it now: $1": {
        "message": "Kupata maeneo ya kudhibiti, jaribu sasa: $1"
    },
    "Get help from engineer over Skype:": {
        "message": "Kupata msaada kutoka kwa mhandisi juu ya skype:"
    },
    "Get the Fastest Servers": {
        "message": "Kupata Servers kwa kasi"
    },
    "Go": {
        "message": "Kwenda"
    },
    "Go Hola Premium": {
        "message": "Kwenda Hola Premium"
    },
    "HR": {
        "message": "Kroatia"
    },
    "HU": {
        "message": "Hungaria"
    },
    "Help": {
        "message": "Msaada"
    },
    "Hey,\n\nI'm using": {
        "message": "Hey,\n\nmimi nina kutumia"
    },
    "Hi,\n\nI started using $1 ($2). It lets me surf the Internet faster and access $3 in my country.": {
        "message": "Hi,\n\nmimi kuanza kutumia $1 ($2). Ni lets mimi surf internet kwa kasi na kupata $3 katika nchi yangu."
    },
    "Hola cannot work because another extension is controlling your proxy settings.": {
        "message": "Hola hawawezi kufanya kazi kwa sababu ugani mwingine ni kudhibiti mazingira yako wakala."
    },
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {
        "message": "Hola haifanyi kazi vizuri katika Windows mode 8. Tafadhali kubadili mode desktop. Bonyeza <a> hapa </a> kwa maelekezo"
    },
    "Hola is not available right now, but we are working on it.": {
        "message": "Hola haipatikani hivi sasa, lakini sisi ni kazi juu yake."
    },
    "Hola is off, click it to turn it on": {
        "message": "Hola ni mbali, bonyeza hadi kurejea kwenye"
    },
    "Hola site list": {
        "message": "Hola tovuti orodha"
    },
    "I can now access $1 from any country!": {
        "message": "Mimi sasa wanaweza kupata $1 kutoka nchi yoyote!"
    },
    "I did not experience any buffering": {
        "message": "Mimi hawakuwa na uzoefu buffering yoyote"
    },
    "I just accessed a censored site using Hola for $1!": {
        "message": "I just kupatikana tovuti kudhibiti kwa kutumia Hola kwa $1!"
    },
    "I'm using $1 to view $2 in my country, and surf faster!": {
        "message": "Mimi nina kutumia $1 hadi $2 kuona katika nchi yangu, na surf kwa kasi!"
    },
    "IL": {
        "message": "Uyahudi"
    },
    "IN": {
        "message": "Uhindi"
    },
    "IQ": {
        "message": "Iraki"
    },
    "IR": {
        "message": "Uajemi"
    },
    "IS": {
        "message": "Barafu"
    },
    "IT": {
        "message": "Uitaliani"
    },
    "Improve translation": {
        "message": "Kuboresha tafsiri"
    },
    "Initializing...": {
        "message": "Inaanza ..."
    },
    "Install": {
        "message": "Kufunga"
    },
    "Install Accelerator": {
        "message": "Kufunga Accelerator"
    },
    "Install Free Hola Accelerator": {
        "message": "Kufunga Free Hola Accelerator"
    },
    "Instantly watch any torrent Video": {
        "message": "Mara kuangalia yoyote torrent Video"
    },
    "Invite friends - free Premium.": {
        "message": "Kukaribisha marafiki - free Premium."
    },
    "Invite friends. Get Premium.": {
        "message": "Kukaribisha marafiki. Kupata Premium."
    },
    "JM": {
        "message": "Jamaika"
    },
    "JP": {
        "message": "Ujapani"
    },
    "KH": {
        "message": "Kampuchea"
    },
    "KM": {
        "message": "Visiwa vya Komoro"
    },
    "KN": {
        "message": "Saint Kitts na Nevis"
    },
    "KP": {
        "message": "Korea ya Kaskazini"
    },
    "KR": {
        "message": "Korea ya Kusini"
    },
    "LU": {
        "message": "Luksemburg"
    },
    "Language": {
        "message": "Lugha"
    },
    "Loading": {
        "message": "Upakiaji"
    },
    "Loading site...": {
        "message": "Upakiaji"
    },
    "Log in": {
        "message": "Ingia"
    },
    "Log out": {
        "message": "Ingia nje"
    },
    "Love Hola?": {
        "message": "Upendo Hola?"
    },
    "MA": {
        "message": "Moroko"
    },
    "MC": {
        "message": "Monako"
    },
    "MH": {
        "message": "Visiwa vya Marshall"
    },
    "MX": {
        "message": "Meksiko"
    },
    "MY": {
        "message": "Malasya"
    },
    "MZ": {
        "message": "Msumbiji"
    },
    "Make your Internet better with $1": {
        "message": "Kufanya Internet yako bora kwa $1"
    },
    "Menu": {
        "message": "Orodha"
    },
    "More countries": {
        "message": "Nchi zaidi"
    },
    "More sites...": {
        "message": "zaidi ..."
    },
    "More...": {
        "message": "zaidi ..."
    },
    "My Account": {
        "message": "Akaunti yangu"
    },
    "My History": {
        "message": "Historia yangu"
    },
    "My Settings": {
        "message": "Mazingira My"
    },
    "My favorites": {
        "message": "Favorites My"
    },
    "NI": {
        "message": "Nikaragua"
    },
    "NL": {
        "message": "Uholanzi"
    },
    "NO": {
        "message": "Unorwe"
    },
    "NP": {
        "message": "Nepali"
    },
    "Need Help?": {
        "message": "Haja Msaada?"
    },
    "Never ask me again": {
        "message": "Kamwe kuuliza mimi tena"
    },
    "Never be a peer": {
        "message": "Kamwe kuwa rika"
    },
    "No": {
        "message": "Hakuna"
    },
    "No idle peers found.": {
        "message": "No wenzao wavivu kupatikana."
    },
    "No recent videos found": {
        "message": "Hakuna Video za hivi karibuni kupatikana"
    },
    "No saved videos found": {
        "message": "Hakuna video uliohifadhiwa"
    },
    "No title": {
        "message": "Hakuna kichwa"
    },
    "No videos found": {
        "message": "Hakuna video zilizopatikana"
    },
    "No videos found on active page": {
        "message": "Hakuna video kupatikana kwenye kazi ukurasa"
    },
    "No, Thanks": {
        "message": "No, Shukrani"
    },
    "No, fix it": {
        "message": "No, kurekebisha"
    },
    "Not working?": {
        "message": "Si kazi?"
    },
    "Number of users that pressed not working": {
        "message": "Idadi ya watumiaji kwamba taabu si kazi"
    },
    "Number of users that use this option": {
        "message": "Idadi ya watumiaji kwamba kutumia chaguo hili"
    },
    "Off": {
        "message": "Mbali"
    },
    "Oh, yes!": {
        "message": "Oh, ndiyo!"
    },
    "Old version of Firefox. Press <a>here</a> to upgrade.": {
        "message": "Miaka toleo la Firefox. Vyombo vya habari <a> hapa </a> ili kuboresha."
    },
    "On": {
        "message": "Iliyo"
    },
    "Our Brand New Mplayer is Coming Soon!": {
        "message": "Yetu Brand New Mplayer is Coming Soon!"
    },
    "PG": {
        "message": "Papua Guinea Mpya"
    },
    "PH": {
        "message": "Filipino"
    },
    "PT": {
        "message": "Ureno"
    },
    "PY": {
        "message": "Paragwai"
    },
    "Please disable other <a>extensions</a> that you think might control your proxy settings such as ad-blockers, other VPN services, etc.": {
        "message": "Tafadhali afya <a>upanuzi</a> nyingine kwamba unafikiri yanaweza kudhibiti vipimo proksi vyako kama vile ad-blockers, huduma nyingine VPN, nk"
    },
    "Please enter a valid email address.": {
        "message": "Tafadhali ingiza anwani ya barua pepe halali."
    },
    "Please enter a web site address, like facebook.com": {
        "message": "Tafadhali ingiza anwani ya mtandao, kama facebook.com"
    },
    "Please help us get better": {
        "message": "Tafadhali kutusaidia kupata bora"
    },
    "Popular in $1": {
        "message": "Popular katika $1"
    },
    "Popular in the world": {
        "message": "Maarufu katika dunia ya"
    },
    "Popular sites": {
        "message": "Popular maeneo ya"
    },
    "RU": {
        "message": "Urusi"
    },
    "Recent Videos": {
        "message": "Video za karibuni"
    },
    "Remember server": {
        "message": "Kumbuka server"
    },
    "Report a problem": {
        "message": "Ripoti tatizo"
    },
    "SA": {
        "message": "Arabuni Saudi"
    },
    "SB": {
        "message": "Visiwa vya Solomon"
    },
    "SC": {
        "message": "Visiwa vya Shelisheli"
    },
    "SE": {
        "message": "Uswidi"
    },
    "SO": {
        "message": "Somali"
    },
    "ST": {
        "message": "Sao Tome na Principe"
    },
    "Saved Videos": {
        "message": "Video kuokolewa"
    },
    "Saved for later": {
        "message": "Kuokolewa kwa baadaye"
    },
    "Search video title": {
        "message": "Search video cheo"
    },
    "Select a Country": {
        "message": "Kuchagua Nchi"
    },
    "Select site to unblock": {
        "message": "Kuchagua tovuti kufungulia"
    },
    "Server saved!": {
        "message": "Server kuokolewa!"
    },
    "Settings": {
        "message": "Mazingira"
    },
    "Share $1 on $2": {
        "message": "Kushiriki $1 kwenye $2"
    },
    "Share $1 via $2": {
        "message": "Kushiriki $1 kupitia $2 "
    },
    "Sign up": {
        "message": "Ishara ya juu"
    },
    "Solve buffering": {
        "message": "Kutatua buffering"
    },
    "Solve buffering problems with": {
        "message": "Kutatua matatizo buffering na"
    },
    "Solves it": {
        "message": "Kutatua ni"
    },
    "Staff Picks": {
        "message": "Zilizochaguliwa na Wafanyakazi"
    },
    "Start Hola": {
        "message": "kuanza"
    },
    "Starting...": {
        "message": "Kuanzia ..."
    },
    "Stop Hola": {
        "message": "Kuacha Hola"
    },
    "Stopping peer routing...": {
        "message": "Kuacha routing rika ..."
    },
    "Stream Instantly": {
        "message": "Mkondo Mara"
    },
    "Submit": {
        "message": "Kuwasilisha"
    },
    "TD": {
        "message": "Chadi"
    },
    "TL": {
        "message": "Timor ya Mashariki"
    },
    "TO": {
        "message": "Kitonga"
    },
    "TR": {
        "message": "Uturuki"
    },
    "TT": {
        "message": "Trinidad na Tobago"
    },
    "Talk to us on $1": {
        "message": "Kuzungumza na sisi juu ya $1"
    },
    "Tell friends about $1": {
        "message": "Mwambie rafiki kuhusu $1"
    },
    "Testing connection...": {
        "message": "Kupima uhusiano ..."
    },
    "Thank you!": {
        "message": "Asante!"
    },
    "There seems to be an error": {
        "message": "Inaonekana kuna hitilafu"
    },
    "Top popular sites": {
        "message": "Top maarufu maeneo ya"
    },
    "Translate to your language": {
        "message": "Kutafsiri kwa lugha yako"
    },
    "Try again": {
        "message": "Jaribu tena"
    },
    "Try another server": {
        "message": "Jaribu server nyingine"
    },
    "Try it": {
        "message": "Jaribu"
    },
    "Try to <span>reload</span>": {
        "message": "Jaribu <span> Reload </span>"
    },
    "Trying another peer...": {
        "message": "Kujaribu rika mwingine ..."
    },
    "Turn off Accelerator": {
        "message": "Zima Accelerator"
    },
    "Turn off Hola": {
        "message": "Zima Hola"
    },
    "Turn on Accelerator": {
        "message": "Kurejea kwenye Accelerator"
    },
    "Turn on Hola": {
        "message": "Kurejea kwenye Hola"
    },
    "Turn on to get started": {
        "message": "Kurejea kwenye kupata ilianza"
    },
    "US": {
        "message": "Muungano wa Nchi za Amerika"
    },
    "UY": {
        "message": "Urugwai"
    },
    "Unblocker is disabled": {
        "message": "Unblocker ni walemavu"
    },
    "Update": {
        "message": "Mwisho"
    },
    "Upgrade": {
        "message": "Mwisho"
    },
    "Using": {
        "message": "Kutumia"
    },
    "Using Hola": {
        "message": "Kutumia Hola"
    },
    "VA": {
        "message": "Vatikano"
    },
    "VC": {
        "message": "Saint Vincent na Grenadines"
    },
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {
        "message": "Sana miaka toleo la Chrome, <a> update </a> Chrome kutumia Hola"
    },
    "Video stuck?": {
        "message": "Video kukwama?"
    },
    "Videos available for instant streaming": {
        "message": "Video inapatikana kwa Streaming papo"
    },
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {
        "message": "Wanataka Hola kwenye vifaa vingine? (Xbox, PS, Apple TV, iPhone ...). Bonyeza hapa"
    },
    "Want to know more?": {
        "message": "Unataka kujua zaidi?"
    },
    "Watch Now": {
        "message": "Watch Sasa"
    },
    "We found $1 videos": {
        "message": "Sisi kupatikana $1 videos"
    },
    "We will be in touch with you soon": {
        "message": "Sisi kuwa katika kuwasiliana na wewe hivi karibuni"
    },
    "Working!": {
        "message": "Kufanya kazi!"
    },
    "Working?": {
        "message": "Kufanya kazi?"
    },
    "YE": {
        "message": "Yemeni"
    },
    "Yes": {
        "message": "Ndiyo"
    },
    "You need to upgrade to the latest version of Opera to use Hola. Press <a>here</a> to upgrade.": {
        "message": "Unahitaji ili kuboresha toleo la karibuni la Opera kutumia Hola. Vyombo vya habari <a>hapa</a> kuboresha."
    },
    "ZA": {
        "message": "Afrika ya Kusini"
    },
    "app_desc": {
        "message": "Upatikanaji wa tovuti imefungwa katika nchi yako, kampuni au shule kwa Hola! Hola ni bure na rahisi kutumia!"
    },
    "app_name": {
        "message": "Hola Bora ya mtandao"
    },
    "back to": {
        "message": "nyuma na"
    },
    "changing...": {
        "message": "kubadilisha ..."
    },
    "cool sites": {
        "message": "maeneo ya baridi"
    },
    "current site": {
        "message": "sasa tovuti"
    },
    "even more...": {
        "message": "hata zaidi ..."
    },
    "more options...": {
        "message": "chaguzi zaidi ..."
    },
    "not working?": {
        "message": "si kazi?"
    },
    "not working? try another server": {
        "message": "si kazi? kujaribu server nyingine"
    },
    "on this page": {
        "message": "kwenye ukurasa huu"
    },
    "sites that are censored": {
        "message": "maeneo ambayo ni kudhibiti"
    },
    "start": {
        "message": "kuanza"
    },
    "working? remember": {
        "message": "kufanya kazi? kumbuka"
    }
};
return E; });