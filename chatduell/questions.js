
const QUESTIONS = [
  {
    frage: "Nenne ein ungewöhnliches Haustier",
    antworten: [
      { text: "Schlange", punkte: 44 },
      { text: "Spinne", punkte: 21 },
      { text: "Schildkröte", punkte: 15 },
      { text: "Schwein", punkte: 11 },
      { text: "Skorpion", punkte: 5 },
    ]
  },
  {
    frage: "Nenne etwas, das man nicht mit ins Flugzeug nehmen darf",
    antworten: [
      { text: "Messer", punkte: 40 },
      { text: "Flüssigkeiten über 100ml", punkte: 25 },
      { text: "Feuerzeug", punkte: 15 },
      { text: "Schere", punkte: 12 },
      { text: "Waffen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne einen Grund, warum jemand zu spät zur Arbeit kommt",
    antworten: [
      { text: "Verschlafen", punkte: 38 },
      { text: "Stau", punkte: 28 },
      { text: "Zug verpasst", punkte: 18 },
      { text: "Auto sprang nicht an", punkte: 10 },
      { text: "Wecker nicht gestellt", punkte: 6 },
    ]
  },
  {
    frage: "Nenne etwas, das man in einem Hotelzimmer findet",
    antworten: [
      { text: "Benutztes Kondom", punkte: 35 },
      { text: "Kleidung von anderen Leuten", punkte: 25 },
      { text: "Zahnbürste", punkte: 20 },
      { text: "Safe", punkte: 12 },
      { text: "Bibel in der Schublade", punkte: 8 },
    ]
  },
  {
    frage: "Nenne einen Beruf, bei dem man Uniform trägt",
    antworten: [
      { text: "Polizist", punkte: 40 },
      { text: "Feuerwehrmann", punkte: 25 },
      { text: "Pilot", punkte: 15 },
      { text: "Koch", punkte: 12 },
      { text: "Soldat", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das explodieren kann",
    antworten: [
      { text: "Bombe", punkte: 35 },
      { text: "Gasflasche", punkte: 25 },
      { text: "Vulkan", punkte: 20 },
      { text: "Feuerwerk", punkte: 12 },
      { text: "Akku/Handy", punkte: 8 },
    ]
  },
  {
    frage: "Nenne ein Land, in das viele Leute in den Ferien reisen",
    antworten: [
      { text: "Japan", punkte: 35 },
      { text: "Italien", punkte: 25 },
      { text: "Türkei", punkte: 18 },
      { text: "Griechenland", punkte: 12 },
      { text: "Thailand", punkte: 10 },
    ]
  },
  {
    frage: "Nenne etwas, das Kinder ihren Eltern oft verschweigen",
    antworten: [
      { text: "Schlechte Noten", punkte: 38 },
      { text: "Rauchen", punkte: 24 },
      { text: "Beziehung", punkte: 18 },
      { text: "Party", punkte: 12 },
      { text: "Kaputtes Handy", punkte: 8 },
    ]
  },
  {
    frage: "Nenne einen Grund, nachts wach zu bleiben",
    antworten: [
      { text: "Social Media scrollen", punkte: 40 },
      { text: "Serie schauen", punkte: 25 },
      { text: "Gaming", punkte: 18 },
      { text: "Mit Freunden chatten", punkte: 10 },
      { text: "Videos schauen", punkte: 7 },
    ]
  },
  {
    frage: "Nenne etwas, das man auf einem Bauernhof findet",
    antworten: [
      { text: "Kuh", punkte: 35 },
      { text: "Traktor", punkte: 25 },
      { text: "Huhn", punkte: 20 },
      { text: "Scheune", punkte: 12 },
      { text: "Schwein", punkte: 8 },
    ]
  },
  {
    frage: "Nenne einen Grund für einen Beziehungsstreit",
    antworten: [
      { text: "Eifersucht", punkte: 32 },
      { text: "Geld", punkte: 25 },
      { text: "Haushalt", punkte: 20 },
      { text: "Zu wenig Zeit füreinander", punkte: 14 },
      { text: "Handy-Kontrolle", punkte: 9 },
    ]
  },
  {
    frage: "Nenne etwas, das im Kühlschrank abläuft, bevor man's isst",
    antworten: [
      { text: "Milch", punkte: 35 },
      { text: "Joghurt", punkte: 25 },
      { text: "Resteessen", punkte: 20 },
      { text: "Gemüse", punkte: 12 },
      { text: "Fleisch", punkte: 8 },
    ]
  },
  {
    frage: "Nenne ein Tier, vor dem viele Menschen Angst haben",
    antworten: [
      { text: "Spinne", punkte: 40 },
      { text: "Schlange", punkte: 28 },
      { text: "Hai", punkte: 15 },
      { text: "Ratte", punkte: 10 },
      { text: "Wespe", punkte: 7 },
    ]
  },
  {
    frage: "Nenne etwas, das man beim Camping vergisst",
    antworten: [
      { text: "Zahnbürste", punkte: 30 },
      { text: "Powerbank/Ladekabel", punkte: 25 },
      { text: "Sonnencreme", punkte: 20 },
      { text: "Taschenlampe", punkte: 15 },
      { text: "Insektenspray", punkte: 10 },
    ]
  },
  {
    frage: "Nenne einen Ort, an dem man leise sein sollte",
    antworten: [
      { text: "Bibliothek", punkte: 40 },
      { text: "Kino", punkte: 25 },
      { text: "Krankenhaus", punkte: 15 },
      { text: "Kirche", punkte: 12 },
      { text: "Schlafzimmer nachts", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man in einer Notfalltasche haben sollte",
    antworten: [
      { text: "Verbandszeug", punkte: 35 },
      { text: "Taschenlampe", punkte: 25 },
      { text: "Wasser", punkte: 20 },
      { text: "Powerbank", punkte: 12 },
      { text: "Medikamente", punkte: 8 },
    ]
  },
  {
    frage: "Nenne eine Ausrede, um eine Party früh zu verlassen",
    antworten: [
      { text: "Muss früh raus/arbeiten", punkte: 35 },
      { text: "Kopfschmerzen", punkte: 25 },
      { text: "Müde", punkte: 20 },
      { text: "Letzter Zug/Bus", punkte: 12 },
      { text: "Haustier allein zuhause", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das teurer ist, als man denkt",
    antworten: [
      { text: "Hochzeit", punkte: 30 },
      { text: "Auto (Unterhalt)", punkte: 25 },
      { text: "Wohnung/Miete", punkte: 20 },
      { text: "Kinder", punkte: 15 },
      { text: "Studium", punkte: 10 },
    ]
  },
  {
    frage: "Nenne etwas, das man nach dem Sport als erstes macht",
    antworten: [
      { text: "Duschen", punkte: 40 },
      { text: "Trinken", punkte: 25 },
      { text: "Essen", punkte: 15 },
      { text: "Dehnen", punkte: 12 },
      { text: "Aufs Handy schauen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne einen Film, den fast jeder gesehen hat",
    antworten: [
      { text: "Titanic", punkte: 30 },
      { text: "Der König der Löwen", punkte: 25 },
      { text: "Harry Potter", punkte: 20 },
      { text: "Star Wars", punkte: 15 },
      { text: "Avengers", punkte: 10 },
    ]
  },
  {
    frage: "Nenne etwas, das man im Kühlschrank vergisst",
    antworten: [
      { text: "Joghurt", punkte: 32 },
      { text: "Reste vom Vortag", punkte: 27 },
      { text: "Gemüse", punkte: 19 },
      { text: "Senf oder Sauce", punkte: 14 },
      { text: "Ein Getränk", punkte: 8 },
    ]
  },
  {
    frage: "Nenne eine Ausrede für Zuspätkommen",
    antworten: [
      { text: "Stau", punkte: 35 },
      { text: "Verschlafen", punkte: 26 },
      { text: "Zug hatte Verspätung", punkte: 20 },
      { text: "Wecker hat nicht geklingelt", punkte: 12 },
      { text: "Parkplatz gesucht", punkte: 7 },
    ]
  },
  {
    frage: "Nenne etwas, das jeder in der Schublade hat, aber nie benutzt",
    antworten: [
      { text: "Alte Kabel", punkte: 30 },
      { text: "Batterien", punkte: 24 },
      { text: "Bedienungsanleitungen", punkte: 20 },
      { text: "Schlüssel ohne Schloss", punkte: 15 },
      { text: "Kerzen", punkte: 11 },
    ]
  },
  {
    frage: "Nenne ein Tier, das man nicht streicheln sollte",
    antworten: [
      { text: "Igel", punkte: 28 },
      { text: "Skorpion", punkte: 23 },
      { text: "Wildschwein", punkte: 21 },
      { text: "Schlange", punkte: 16 },
      { text: "Qualle", punkte: 12 },
    ]
  },
  {
    frage: "Nenne etwas, das beim Camping garantiert schiefgeht",
    antworten: [
      { text: "Es regnet", punkte: 33 },
      { text: "Zelt falsch aufgebaut", punkte: 25 },
      { text: "Etwas vergessen", punkte: 19 },
      { text: "Mücken", punkte: 14 },
      { text: "Feuer geht nicht an", punkte: 9 },
    ]
  },
  {
    frage: "Nenne etwas, das man macht, wenn niemand zusieht",
    antworten: [
      { text: "Singen", punkte: 31 },
      { text: "Tanzen", punkte: 24 },
      { text: "Mit sich selbst reden", punkte: 21 },
      { text: "Direkt aus der Packung essen", punkte: 15 },
      { text: "In den Spiegel schauen", punkte: 9 },
    ]
  },
  {
    frage: "Nenne einen Grund, warum man ein Telefonat beendet",
    antworten: [
      { text: "Keine Zeit mehr", punkte: 29 },
      { text: "Akku leer", punkte: 25 },
      { text: "Schlechter Empfang", punkte: 22 },
      { text: "Jemand steht vor der Tür", punkte: 15 },
      { text: "Essen ist fertig", punkte: 9 },
    ]
  },
  {
    frage: "Nenne etwas, das in jedem Auto herumliegt",
    antworten: [
      { text: "Leere Flaschen", punkte: 27 },
      { text: "Ladekabel", punkte: 24 },
      { text: "Parkscheine", punkte: 20 },
      { text: "Kratzer-Eiskratzer", punkte: 17 },
      { text: "Sonnenbrille", punkte: 12 },
    ]
  },
  {
    frage: "Nenne etwas, das Kinder besser können als Erwachsene",
    antworten: [
      { text: "Handy bedienen", punkte: 34 },
      { text: "Sich Dinge merken", punkte: 24 },
      { text: "Fragen stellen", punkte: 18 },
      { text: "Unbefangen sein", punkte: 15 },
      { text: "Sich verbiegen", punkte: 9 },
    ]
  },
  {
    frage: "Nenne etwas, das man aus dem Hotel mitnimmt",
    antworten: [
      { text: "Shampoo", punkte: 38 },
      { text: "Seife", punkte: 26 },
      { text: "Handtuch", punkte: 16 },
      { text: "Kugelschreiber", punkte: 12 },
      { text: "Hausschuhe", punkte: 8 },
    ]
  },
  {
    frage: "Nenne einen Beruf, den Kinder cool finden",
    antworten: [
      { text: "Feuerwehrmann", punkte: 30 },
      { text: "Polizist", punkte: 24 },
      { text: "Astronaut", punkte: 20 },
      { text: "Tierarzt", punkte: 15 },
      { text: "Youtuber", punkte: 11 },
    ]
  },
  {
    frage: "Nenne etwas, das man nie zurückbekommt, wenn man es verleiht",
    antworten: [
      { text: "Bücher", punkte: 31 },
      { text: "Kugelschreiber", punkte: 26 },
      { text: "Geld", punkte: 21 },
      { text: "Feuerzeug", punkte: 14 },
      { text: "Werkzeug", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das im Winter nervt",
    antworten: [
      { text: "Auto freikratzen", punkte: 29 },
      { text: "Frühe Dunkelheit", punkte: 25 },
      { text: "Kälte", punkte: 20 },
      { text: "Nasse Schuhe", punkte: 15 },
      { text: "Erkältung", punkte: 11 },
    ]
  },
  {
    frage: "Nenne etwas, das man auf einer Insel bräuchte",
    antworten: [
      { text: "Wasser", punkte: 36 },
      { text: "Messer", punkte: 24 },
      { text: "Feuerzeug", punkte: 18 },
      { text: "Essen", punkte: 13 },
      { text: "Sonnenschutz", punkte: 9 },
    ]
  },
  {
    frage: "Nenne einen Film, den fast jeder gesehen hat",
    antworten: [
      { text: "Titanic", punkte: 28 },
      { text: "Herr der Ringe", punkte: 23 },
      { text: "Harry Potter", punkte: 21 },
      { text: "Der König der Löwen", punkte: 16 },
      { text: "Avatar", punkte: 12 },
    ]
  },
  {
    frage: "Nenne etwas, das man im Supermarkt kauft, obwohl man es nicht braucht",
    antworten: [
      { text: "Süssigkeiten", punkte: 33 },
      { text: "Chips", punkte: 25 },
      { text: "Angebote", punkte: 19 },
      { text: "Getränke", punkte: 13 },
      { text: "Zeitschriften", punkte: 10 },
    ]
  },
  {
    frage: "Nenne etwas, das man in der Schule gelernt hat und nie braucht",
    antworten: [
      { text: "Kurvendiskussion", punkte: 30 },
      { text: "Gedichtanalyse", punkte: 25 },
      { text: "Latein", punkte: 20 },
      { text: "Bundesländer auswendig", punkte: 15 },
      { text: "Schönschrift", punkte: 10 },
    ]
  },
  {
    frage: "Nenne etwas, das laut ist",
    antworten: [
      { text: "Presslufthammer", punkte: 29 },
      { text: "Feuerwerk", punkte: 24 },
      { text: "Flugzeug", punkte: 21 },
      { text: "Staubsauger", punkte: 16 },
      { text: "Rasenmäher", punkte: 10 },
    ]
  },
  {
    frage: "Nenne etwas, das man am Sonntag macht",
    antworten: [
      { text: "Ausschlafen", punkte: 32 },
      { text: "Spazieren", punkte: 25 },
      { text: "Familie besuchen", punkte: 19 },
      { text: "Kochen", punkte: 14 },
      { text: "Nichts", punkte: 10 },
    ]
  },
  {
    frage: "Nenne etwas, das jeder falsch ausspricht",
    antworten: [
      { text: "Croissant", punkte: 27 },
      { text: "Nutella", punkte: 24 },
      { text: "Gnocchi", punkte: 22 },
      { text: "Espresso", punkte: 16 },
      { text: "Jalapeño", punkte: 11 },
    ]
  },
  {
    frage: "Nenne etwas, das in der Handtasche verschwindet",
    antworten: [
      { text: "Schlüssel", punkte: 34 },
      { text: "Handy", punkte: 26 },
      { text: "Lippenstift", punkte: 18 },
      { text: "Kopfhörer", punkte: 13 },
      { text: "Kassenzettel", punkte: 9 },
    ]
  },
  {
    frage: "Nenne einen Grund, warum man nicht schlafen kann",
    antworten: [
      { text: "Gedanken kreisen", punkte: 31 },
      { text: "Zu warm", punkte: 23 },
      { text: "Lärm", punkte: 20 },
      { text: "Handy", punkte: 16 },
      { text: "Kaffee am Abend", punkte: 10 },
    ]
  },
  {
    frage: "Nenne etwas, das man beim ersten Date nicht tun sollte",
    antworten: [
      { text: "Über den Ex reden", punkte: 35 },
      { text: "Aufs Handy schauen", punkte: 26 },
      { text: "Zu spät kommen", punkte: 18 },
      { text: "Nur über sich reden", punkte: 13 },
      { text: "Rechnung teilen diskutieren", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das im Keller steht und nie benutzt wird",
    antworten: [
      { text: "Fitnessgerät", punkte: 30 },
      { text: "Alte Möbel", punkte: 25 },
      { text: "Kartons", punkte: 21 },
      { text: "Fahrrad", punkte: 14 },
      { text: "Farbeimer", punkte: 10 },
    ]
  },
  {
    frage: "Nenne etwas, das man macht, wenn der Strom ausfällt",
    antworten: [
      { text: "Kerzen anzünden", punkte: 36 },
      { text: "Taschenlampe suchen", punkte: 25 },
      { text: "Sicherung prüfen", punkte: 18 },
      { text: "Nachbarn fragen", punkte: 12 },
      { text: "Früh schlafen gehen", punkte: 9 },
    ]
  },
  {
    frage: "Nenne ein Getränk, das man morgens trinkt",
    antworten: [
      { text: "Kaffee", punkte: 45 },
      { text: "Tee", punkte: 24 },
      { text: "Wasser", punkte: 15 },
      { text: "Orangensaft", punkte: 11 },
      { text: "Milch", punkte: 5 },
    ]
  },
  {
    frage: "Nenne etwas, das im Sommer schmilzt",
    antworten: [
      { text: "Eis", punkte: 40 },
      { text: "Schokolade", punkte: 28 },
      { text: "Butter", punkte: 15 },
      { text: "Asphalt", punkte: 10 },
      { text: "Kerzen", punkte: 7 },
    ]
  },
  {
    frage: "Nenne etwas, das man vor dem Urlaub vergisst",
    antworten: [
      { text: "Ladekabel", punkte: 32 },
      { text: "Zahnbürste", punkte: 24 },
      { text: "Pass", punkte: 18 },
      { text: "Sonnencreme", punkte: 15 },
      { text: "Fenster schliessen", punkte: 11 },
    ]
  },
  {
    frage: "Nenne etwas, das man in einem Wartezimmer macht",
    antworten: [
      { text: "Handy schauen", punkte: 38 },
      { text: "Zeitschrift lesen", punkte: 26 },
      { text: "Andere beobachten", punkte: 17 },
      { text: "Nachrichten schreiben", punkte: 12 },
      { text: "Einschlafen", punkte: 7 },
    ]
  },
  {
    frage: "Nenne etwas, das teurer ist, als man denkt",
    antworten: [
      { text: "Drucker-Tinte", punkte: 29 },
      { text: "Autoreparatur", punkte: 25 },
      { text: "Zahnarzt", punkte: 20 },
      { text: "Umzug", punkte: 16 },
      { text: "Hochzeit", punkte: 10 },
    ]
  }
];
