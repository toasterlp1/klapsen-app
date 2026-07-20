
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
      { text: "Bett", punkte: 35 },
      { text: "Fernseher", punkte: 25 },
      { text: "Minibar", punkte: 20 },
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
      { text: "Spanien", punkte: 35 },
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
      { text: "Käse", punkte: 8 },
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
];
