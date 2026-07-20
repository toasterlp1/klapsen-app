
const WOERTER = [

  "Elefant","Giraffe","Pinguin","Krokodil","Fledermaus","Schnecke","Igel","Eichhörnchen",
  "Delfin","Qualle","Oktopus","Hai","Schmetterling","Marienkäfer","Spinne","Biene",
  "Frosch","Schildkröte","Kamel","Faultier","Nashorn","Waschbär","Papagei","Pfau",
  "Seepferdchen","Skorpion","Chamäleon","Wal","Adler","Eule",

  "Wasserhahn","Regenschirm","Staubsauger","Bügeleisen","Wäscheklammer","Zahnbürste",
  "Kerzenständer","Türklinke","Steckdose","Glühbirne","Waschmaschine","Kühlschrank",
  "Mikrowelle","Toaster","Wecker","Sanduhr","Lupe","Schere","Kleiderbügel","Besen",
  "Mülleimer","Spiegel","Teppich","Vorhang","Kissen","Leiter","Werkzeugkasten","Hammer",
  "Schraubenzieher","Taschenlampe",

  "Ananas","Wassermelone","Brezel","Croissant","Spiegelei","Hamburger","Pizza","Popcorn",
  "Eistüte","Lutscher","Donut","Spaghetti","Sushi","Hotdog","Kaugummi","Zuckerwatte",
  "Kürbis","Karotte","Champignon","Chilischote","Erdbeere","Banane","Käse","Baguette",

  "Leuchtturm","Windmühle","Iglu","Zelt","Burg","Kirche","Brücke","Wolkenkratzer",
  "Achterbahn","Riesenrad","Pyramide","Vulkan","Wasserfall","Insel","Höhle","Bauernhof",
  "Bushaltestelle","Tankstelle","Schwimmbad","Bibliothek",

  "Heissluftballon","U-Boot","Traktor","Feuerwehrauto","Segelboot","Skateboard","Rollstuhl",
  "Motorrad","Hubschrauber","Rakete","Zeppelin","Seilbahn","Einkaufswagen","Schubkarre",
  "Bagger","Panzer","Fahrrad","Strassenbahn",

  "Zylinder","Krawatte","Handschuh","Gummistiefel","Sonnenbrille","Rucksack","Schal",
  "Bikini","Anzug","Turnschuh","Krone","Helm","Regenmantel","Fliege",

  "Angelrute","Dartscheibe","Schach","Trampolin","Skier","Boxhandschuh","Basketballkorb",
  "Tennisschläger","Golfschläger","Bowling","Fallschirm","Surfbrett","Hantel","Springseil",

  "Gitarre","Schlagzeug","Trompete","Klavier","Geige","Harfe","Mikrofon","Kopfhörer",
  "Plattenspieler","Triangel",

  "Regenbogen","Blitz","Tornado","Kaktus","Pilz","Sonnenblume","Tannenbaum","Schneemann",
  "Lagerfeuer","Sternschnuppe","Mondsichel","Wolke","Lawine","Wüste",

  "Einhorn","Drache","Meerjungfrau","Zauberstab","Geist","Vampir","Werwolf","Roboter",
  "Alien","Ufo","Ritter","Pirat","Hexe","Zombie","Yeti","Kraken",

  "Feuerwehrmann","Astronaut","Koch","Clown","Taucher","Cowboy","Ninja","Detektiv",
  "Briefträger","Bauarbeiter","Zauberer","Superheld",

  "Skelett","Gehirn","Herz","Zahn","Auge","Fussabdruck","Handabdruck","Bart",

  "Fernbedienung","Kompass","Fernrohr","Waage","Thermometer","Batterie","Zahnrad",
  "Schlüssel","Vorhängeschloss","Briefmarke","Landkarte","Globus",

  "Geschenk","Torte","Luftballon","Konfetti","Pokal","Medaille","Diamant","Schatztruhe",
  "Angelhaken","Bumerang","Domino","Puzzle","Würfel","Spielkarte","Zirkuszelt","Karussell",
  "Ampel","Verkehrsschild","Wegweiser","Vogelscheuche","Bienenstock","Spinnennetz",
  "Hufeisen","Anker","Fahne","Kaugummiautomat","Parkuhr","Litfasssäule",
  
  // ===== Tiere =====
  "Wal","Koala","Erdmännchen","Flamingo","Nilpferd","Otter","Alpaka","Tintenfisch",
  "Ameise","Käfer","Storch","Möwe","Rentier","Wildschwein","Maulwurf","Hummer",
  "Seestern","Robbe","Gepard","Zebra","Panda","Luchs","Dachs","Bison",

  // ===== Essen und Trinken =====
  "Croissant","Lasagne","Sushi","Waffel","Popcorn","Brezel","Kürbis","Ananas",
  "Wassermelone","Spaghetti","Hamburger","Muffin","Donut","Bratwurst","Käse",
  "Cocktail","Teekanne","Milchshake","Salatschüssel","Grillspiess",

  // ===== Gegenstände =====
  "Regenschirm","Staubsauger","Nähmaschine","Kompass","Fernglas","Bügeleisen",
  "Wecker","Kerzenständer","Werkzeugkasten","Gartenschlauch","Leiter","Besen",
  "Koffer","Rucksack","Taschenlampe","Schere","Locher","Waage","Teleskop","Mikroskop",

  // ===== Orte und Gebäude =====
  "Leuchtturm","Windmühle","Iglu","Zelt","Schloss","Bahnhof","Kirche","Brücke",
  "Wolkenkratzer","Bauernhof","Tankstelle","Schwimmbad","Zirkuszelt","Bibliothek",
  "Achterbahn","Skipiste","Hafen","Tunnel","Aussichtsturm","Baumhaus",

  // ===== Fahrzeuge =====
  "Heissluftballon","U-Boot","Traktor","Seilbahn","Segelboot","Feuerwehrauto",
  "Schneemobil","Rikscha","Zeppelin","Skateboard","Einrad","Bagger","Kran",
  "Rennwagen","Wohnwagen","Kutsche","Jetski","Panzer",

  // ===== Natur =====
  "Vulkan","Wasserfall","Regenbogen","Blitz","Tornado","Kaktus","Palme","Pilz",
  "Sonnenblume","Schneeflocke","Lagerfeuer","Sanduhr","Insel","Höhle","Gletscher",
  "Korallenriff","Wüste","Sumpf","Geysir","Sternschnuppe",

  // ===== Berufe =====
  "Feuerwehrmann","Astronaut","Koch","Clown","Taucher","Imker","Ritter","Pirat",
  "Cowboy","Zauberer","Detektiv","Bäcker","Gärtner","Schornsteinfeger","Dirigent",
  "Bergsteiger","Schiedsrichter","Fotograf","Maler","Bademeister",

  // ===== Sport =====
  "Bogenschiessen","Curling","Turmspringen","Skispringen","Klettern","Rudern",
  "Fechten","Tischtennis","Basketballkorb","Torwart","Hantel","Trampolin",
  "Stabhochsprung","Boxhandschuh","Golfschläger","Surfbrett","Schlittschuh",

  // ===== Abstraktes und Redewendungen =====
  "Heimweh","Schadenfreude","Fernweh","Schnappsidee","Zeitdruck","Glückssträhne",
  "Ohrwurm","Torschlusspanik","Sandmännchen","Luftschloss","Drahtseilakt",
  "Nadel im Heuhaufen","Sturm im Wasserglas","Eselsbrücke","Rampenlicht",

  // ===== Filme, Spiele, Kultur =====
  "Zeitmaschine","Raumschiff","Roboter","Drache","Einhorn","Meerjungfrau","Yeti",
  "Vampir","Zombie","Geist","Superheld","Ninja","Samurai","Wikinger","Mumie",
  "Schatzkarte","Kristallkugel","Zauberstab","Zaubertrank","Thron",

  // ===== Alltag =====
  "Wäscheleine","Geschirrspüler","Mikrowelle","Bügelbrett","Mülltonne","Briefkasten",
  "Türklingel","Fussmatte","Blumentopf","Spiegel","Hängematte","Schaukelstuhl",
  "Kaffeemaschine","Wasserkocher","Toaster","Kühlschrank","Waschmaschine",
  "Nachttisch","Kleiderbügel","Schuhregal",

  // ===== Musik =====
  "Schlagzeug","Dudelsack","Harfe","Akkordeon","Trompete","Geige","Mikrofon",
  "Plattenspieler","Kopfhörer","Notenblatt","Konzertbühne","Lautsprecher",

  // ===== Kleidung =====
  "Zylinder","Gummistiefel","Fliege","Handschuh","Schal","Sonnenbrille","Krone",
  "Fliegerbrille","Badeanzug","Regenmantel","Hausschuhe","Halskette","Armbanduhr"
];

if (typeof window !== 'undefined') window.WOERTER = WOERTER;
