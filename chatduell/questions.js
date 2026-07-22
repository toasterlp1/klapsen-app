
const QUESTIONS = [
  {
    frage: "Nenne etwas, das du sofort machst, wenn du allein zuhause bist",
    antworten: [
      { text: "Laut Musik hören und mitsingen", punkte: 38 },
      { text: "In Unterhose rumlaufen", punkte: 24 },
      { text: "Snacks essen ohne Teller", punkte: 16 },
      { text: "Mit sich selbst reden", punkte: 12 },
      { text: "Vor dem Spiegel tanzen", punkte: 10 },
    ]
  },
  {
    frage: "Nenne die schlechteste Ausrede, um nicht zocken zu kommen",
    antworten: [
      { text: "Mein Internet ist kaputt", punkte: 35 },
      { text: "Ich muss früh raus", punkte: 26 },
      { text: "Meine Mutter ruft", punkte: 18 },
      { text: "Ich bin müde", punkte: 13 },
      { text: "Mein Akku ist leer", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das jeder schon mal gegoogelt und sofort gelöscht hat",
    antworten: [
      { text: "Symptome einer Krankheit", punkte: 41 },
      { text: "Wie alt ist ein Promi", punkte: 21 },
      { text: "Eine peinliche Körperfrage", punkte: 17 },
      { text: "Den Ex stalken", punkte: 13 },
      { text: "Wie man ein Wort schreibt", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas im Kühlschrank, das man nicht mehr identifizieren kann",
    antworten: [
      { text: "Reste in einer Tupperdose", punkte: 39 },
      { text: "Schimmeliges Gemüse", punkte: 23 },
      { text: "Eine offene Sauce", punkte: 17 },
      { text: "Käse mit Pelz", punkte: 13 },
      { text: "Irgendwas Braunes", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man macht, wenn der Lehrer kurz rausgeht",
    antworten: [
      { text: "Sofort laut losreden", punkte: 37 },
      { text: "Ans Handy gehen", punkte: 27 },
      { text: "Aufstehen und rumlaufen", punkte: 16 },
      { text: "Was an die Tafel malen", punkte: 12 },
      { text: "Schnell abschreiben", punkte: 8 },
    ]
  },
  {
    frage: "Nenne den nervigsten Mitspieler-Typ in einem Online-Game",
    antworten: [
      { text: "Der Rager, der alle flamed", punkte: 34 },
      { text: "Der AFK-Typ", punkte: 24 },
      { text: "Der Besserwisser im Voice", punkte: 19 },
      { text: "Der Camper", punkte: 14 },
      { text: "Der mit offenem Mikro", punkte: 9 },
    ]
  },
  {
    frage: "Nenne etwas, das man tut, um beschäftigt auszusehen",
    antworten: [
      { text: "Auf den Bildschirm starren", punkte: 36 },
      { text: "Mit Papieren rascheln", punkte: 22 },
      { text: "Schnell tippen ohne Inhalt", punkte: 20 },
      { text: "Ernst telefonieren", punkte: 13 },
      { text: "Konzentriert nicken", punkte: 9 },
    ]
  },
  {
    frage: "Nenne etwas, das man im Discord-Call macht, während die anderen reden",
    antworten: [
      { text: "Am Handy scrollen", punkte: 40 },
      { text: "Ein anderes Spiel zocken", punkte: 24 },
      { text: "Essen", punkte: 16 },
      { text: "Nichts, einfach auf mute", punkte: 12 },
      { text: "Ins Leere starren", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das dir peinlich wäre, wenn deine Mutter es auf deinem Handy findet",
    antworten: [
      { text: "Der Suchverlauf", punkte: 42 },
      { text: "Screenshots aus dem Chat", punkte: 21 },
      { text: "Fotos vom Wochenende", punkte: 16 },
      { text: "Alte Sprachnachrichten", punkte: 12 },
      { text: "Die Bildschirmzeit", punkte: 9 },
    ]
  },
  {
    frage: "Nenne etwas, das man verspricht und nie einhält",
    antworten: [
      { text: "Ich fang morgen mit Sport an", punkte: 38 },
      { text: "Nur noch eine Runde", punkte: 25 },
      { text: "Ich geh gleich schlafen", punkte: 18 },
      { text: "Ich zahl's dir zurück", punkte: 11 },
      { text: "Ich meld mich", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man macht, wenn man den Namen vergessen hat",
    antworten: [
      { text: "Alter oder Digga sagen", punkte: 39 },
      { text: "Ausweichen und nuscheln", punkte: 24 },
      { text: "Jemand anderen fragen", punkte: 17 },
      { text: "Auf Instagram nachschauen", punkte: 12 },
      { text: "Einfach raten", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man nur macht, wenn niemand zuschaut",
    antworten: [
      { text: "In der Nase bohren", punkte: 35 },
      { text: "Essen vom Boden essen", punkte: 24 },
      { text: "Am Shirt riechen", punkte: 19 },
      { text: "Mit sich selbst reden", punkte: 14 },
      { text: "Grimassen im Spiegel", punkte: 8 },
    ]
  },
  {
    frage: "Nenne den schlimmsten Fehler beim ersten Date",
    antworten: [
      { text: "Nur über sich selbst reden", punkte: 37 },
      { text: "Am Handy hängen", punkte: 25 },
      { text: "Über den Ex reden", punkte: 18 },
      { text: "Zu spät kommen", punkte: 12 },
      { text: "Nicht zahlen wollen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das im Kinderzimmer von jedem 2000er-Kind stand",
    antworten: [
      { text: "Ein Hochbett", punkte: 33 },
      { text: "Poster an der Wand", punkte: 26 },
      { text: "Eine Lavalampe", punkte: 18 },
      { text: "Ein Fernseher", punkte: 14 },
      { text: "Ein Sparschwein", punkte: 9 },
    ]
  },
  {
    frage: "Nenne etwas, das man sagt, wenn man keine Ahnung hat, aber mitreden will",
    antworten: [
      { text: "Ja genau, voll", punkte: 36 },
      { text: "Kommt drauf an", punkte: 25 },
      { text: "Hab ich auch gehört", punkte: 19 },
      { text: "Interessant", punkte: 12 },
      { text: "Ist halt so", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das jeder in seinem Zimmer versteckt hat",
    antworten: [
      { text: "Geld", punkte: 34 },
      { text: "Alte Fotos oder Briefe", punkte: 24 },
      { text: "Süssigkeiten", punkte: 20 },
      { text: "Kram aus der Kindheit", punkte: 13 },
      { text: "Kabel, die zu nichts gehören", punkte: 9 },
    ]
  },
  {
    frage: "Nenne etwas, das man beim Kochen falsch machen kann",
    antworten: [
      { text: "Alles anbrennen lassen", punkte: 38 },
      { text: "Zu viel Salz", punkte: 26 },
      { text: "Die Zeit vergessen", punkte: 16 },
      { text: "Eine Zutat weglassen", punkte: 12 },
      { text: "Sich schneiden", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man nach drei Sekunden bereut, geschrieben zu haben",
    antworten: [
      { text: "Eine Sprachnachricht nachts", punkte: 35 },
      { text: "Die ehrliche Meinung", punkte: 25 },
      { text: "Eine Nachricht an den Ex", punkte: 20 },
      { text: "Was in die falsche Gruppe", punkte: 12 },
      { text: "Ein Emoji zu viel", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das alle in der Schule gehasst haben",
    antworten: [
      { text: "Mathe", punkte: 36 },
      { text: "Früh aufstehen", punkte: 25 },
      { text: "Referate halten", punkte: 19 },
      { text: "Sportunterricht", punkte: 12 },
      { text: "Das Mittagessen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man macht, wenn das WLAN ausfällt",
    antworten: [
      { text: "Router neu starten", punkte: 41 },
      { text: "Mobile Daten anmachen", punkte: 24 },
      { text: "Fluchen", punkte: 16 },
      { text: "Alle im Haus anschreien", punkte: 11 },
      { text: "Rausgehen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man im Supermarkt kauft, obwohl man es nicht braucht",
    antworten: [
      { text: "Süssigkeiten", punkte: 37 },
      { text: "Chips", punkte: 25 },
      { text: "Irgendwas im Angebot", punkte: 18 },
      { text: "Energy Drinks", punkte: 12 },
      { text: "Noch eine Sauce", punkte: 8 },
    ]
  },
  {
    frage: "Nenne den peinlichsten Moment im Sportunterricht",
    antworten: [
      { text: "Als Letzter gewählt werden", punkte: 39 },
      { text: "Vor allen hinfallen", punkte: 24 },
      { text: "Den Ball ins Gesicht", punkte: 18 },
      { text: "Beim Umziehen gesehen werden", punkte: 11 },
      { text: "Nicht über den Bock kommen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man tut, wenn man nachts Hunger hat",
    antworten: [
      { text: "Zum Kühlschrank schleichen", punkte: 42 },
      { text: "Was bestellen", punkte: 22 },
      { text: "Chips aus dem Schrank", punkte: 17 },
      { text: "Weiterschlafen versuchen", punkte: 11 },
      { text: "Wasser trinken", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man im Auto macht, wenn man allein ist",
    antworten: [
      { text: "Laut mitsingen", punkte: 44 },
      { text: "Mit sich selbst reden", punkte: 20 },
      { text: "Zu schnell fahren", punkte: 16 },
      { text: "Andere Fahrer beschimpfen", punkte: 12 },
      { text: "Aufs Lenkrad trommeln", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das jeder Gamer schon mal aus Wut gemacht hat",
    antworten: [
      { text: "Controller werfen", punkte: 36 },
      { text: "Ins Mikro schreien", punkte: 26 },
      { text: "Das Spiel deinstallieren", punkte: 18 },
      { text: "Auf den Tisch hauen", punkte: 12 },
      { text: "Den PC ausmachen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man sagt, wenn man beim Lügen erwischt wird",
    antworten: [
      { text: "War nur ein Witz", punkte: 35 },
      { text: "Hab ich nie gesagt", punkte: 26 },
      { text: "Du hast das falsch verstanden", punkte: 19 },
      { text: "Okay, ich geb's zu", punkte: 12 },
      { text: "Wer sagt das", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man mit 30 nicht mehr machen sollte, aber trotzdem macht",
    antworten: [
      { text: "Bis 4 Uhr zocken", punkte: 34 },
      { text: "Fertigpizza essen", punkte: 25 },
      { text: "Saufen wie mit 18", punkte: 19 },
      { text: "Alles aufschieben", punkte: 14 },
      { text: "Mama die Wäsche machen lassen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man tut, wenn eine unbekannte Nummer anruft",
    antworten: [
      { text: "Nicht rangehen", punkte: 45 },
      { text: "Die Nummer googeln", punkte: 22 },
      { text: "Rangehen und nichts sagen", punkte: 15 },
      { text: "Blockieren", punkte: 10 },
      { text: "Sofort auflegen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne den nervigsten Satz, den Eltern sagen",
    antworten: [
      { text: "Solange du hier wohnst", punkte: 33 },
      { text: "Räum dein Zimmer auf", punkte: 27 },
      { text: "Handy weg beim Essen", punkte: 18 },
      { text: "Frag deinen Vater", punkte: 13 },
      { text: "Wir reden später", punkte: 9 },
    ]
  },
  {
    frage: "Nenne etwas, worüber es in einer WG immer Streit gibt",
    antworten: [
      { text: "Der Abwasch", punkte: 38 },
      { text: "Essen im Kühlschrank", punkte: 25 },
      { text: "Das Bad", punkte: 17 },
      { text: "Der Müll", punkte: 12 },
      { text: "Klopapier", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das jeder auf dem Handy hat und nie benutzt",
    antworten: [
      { text: "Vorinstallierte Apps", punkte: 36 },
      { text: "Der Ordner mit dem Rest", punkte: 22 },
      { text: "Alte Screenshots", punkte: 20 },
      { text: "Eine zweite Wetter-App", punkte: 14 },
      { text: "Notizen von 2019", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man macht, wenn man verschlafen hat",
    antworten: [
      { text: "Panisch aufspringen", punkte: 39 },
      { text: "Duschen weglassen", punkte: 24 },
      { text: "Eine Ausrede erfinden", punkte: 18 },
      { text: "Einfach liegen bleiben", punkte: 11 },
      { text: "Rennen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man bereut, online bestellt zu haben",
    antworten: [
      { text: "Klamotten, die nicht passen", punkte: 37 },
      { text: "Was nachts Bestelltes", punkte: 25 },
      { text: "Billigen Kram", punkte: 18 },
      { text: "Viel zu viel auf einmal", punkte: 12 },
      { text: "Ein Fitnessgerät", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man tut, um ein Gespräch zu beenden",
    antworten: [
      { text: "Auf die Uhr schauen", punkte: 35 },
      { text: "Ja dann mal sagen", punkte: 27 },
      { text: "Sagen, man muss los", punkte: 19 },
      { text: "Aufs Handy schauen", punkte: 11 },
      { text: "Langsam wegdriften", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man beim Zocken als Erstes einstellt",
    antworten: [
      { text: "Die Lautstärke", punkte: 34 },
      { text: "Den NamenDie Grafik", punkte: 26 },
      { text: "Die Tastenbelegung", punkte: 20 },
      { text: "Die Maus-Sensi", punkte: 12 },
      { text: "Die Grafik", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man macht, wenn man allein im Aufzug ist",
    antworten: [
      { text: "In den Spiegel schauen", punkte: 38 },
      { text: "Tanzen oder singen", punkte: 24 },
      { text: "Die Haare richten", punkte: 18 },
      { text: "Grimassen schneiden", punkte: 12 },
      { text: "Hochspringen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne den Typen, den es in jeder Freundesgruppe gibt",
    antworten: [
      { text: "Der immer zu spät kommt", punkte: 40 },
      { text: "Der nie Geld dabei hat", punkte: 23 },
      { text: "Der immer absagt", punkte: 17 },
      { text: "Der Lauteste", punkte: 12 },
      { text: "Der alles organisiert", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man tut, wenn der Strom ausfällt",
    antworten: [
      { text: "Handy-Taschenlampe an", punkte: 42 },
      { text: "Schlafen gehen", punkte: 24 },
      { text: "Kerzen suchen", punkte: 16 },
      { text: "Die Sicherung checken", punkte: 10 },
      { text: "Beim Nachbarn klingeln", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man auf keiner Party machen sollte",
    antworten: [
      { text: "Zu viel trinken", punkte: 36 },
      { text: "Die Musik wechseln", punkte: 24 },
      { text: "Mit Sketchy-Fremden reden", punkte: 19 },
      { text: "Was kaputt machen", punkte: 13 },
      { text: "Als Erster gehen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man macht, wenn man sich verlaufen hat",
    antworten: [
      { text: "Google Maps aufmachen", punkte: 45 },
      { text: "Umdrehen", punkte: 21 },
      { text: "Einfach weiterlaufen", punkte: 16 },
      { text: "Jemanden fragen", punkte: 10 },
      { text: "So tun, als wär's Absicht", punkte: 8 },
    ]
  },
  {
    frage: "Nenne den schlimmsten Geruch, den jeder kennt",
    antworten: [
      { text: "Alte Sportschuhe", punkte: 35 },
      { text: "Verdorbenes Essen", punkte: 26 },
      { text: "Müll im Sommer", punkte: 19 },
      { text: "Nasser Hund", punkte: 12 },
      { text: "Öffentliche Toilette", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man tut, um beim Streit recht zu behalten",
    antworten: [
      { text: "Lauter werden", punkte: 34 },
      { text: "Googeln und Beweis zeigen", punkte: 27 },
      { text: "Ein altes Thema ausgraben", punkte: 19 },
      { text: "Beleidigt schweigen", punkte: 12 },
      { text: "Einfach rausgehen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man kauft und nach zwei Wochen nie wieder anfasst",
    antworten: [
      { text: "Ein Fitnessgerät", punkte: 37 },
      { text: "Ein Buch", punkte: 24 },
      { text: "Ein Instrument", punkte: 19 },
      { text: "Ein neues Hobby-Set", punkte: 12 },
      { text: "Eine Küchenmaschine", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man macht, wenn spontan Besuch kommt",
    antworten: [
      { text: "So tun, als wär man nicht da", punkte: 40 },
      { text: "Alles in den Schrank stopfenSchnell durchsaugen", punkte: 23 },
      { text: "Lüften", punkte: 17 },
      { text: "Sich umziehen", punkte: 12 },
      { text: "Schnell durchsaugen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man im Urlaub garantiert vergisst",
    antworten: [
      { text: "Das Ladekabel", punkte: 41 },
      { text: "Die Zahnbürste", punkte: 22 },
      { text: "Sonnencreme", punkte: 17 },
      { text: "Unterwäsche", punkte: 12 },
      { text: "Den Adapter", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man als Kind unglaublich cool fand",
    antworten: [
      { text: "Kaugummiblasen machen", punkte: 33 },
      { text: "Skateboard oder Rollerblades", punkte: 25 },
      { text: "Eine Lederjacke", punkte: 19 },
      { text: "Gefärbte Haare", punkte: 14 },
      { text: "Ein Handy mit Kamera", punkte: 9 },
    ]
  },
  {
    frage: "Nenne etwas, das im Gruppenchat immer passiert",
    antworten: [
      { text: "Keiner antwortet", punkte: 38 },
      { text: "Einer spammt Memes", punkte: 25 },
      { text: "Ein Plan wird nie umgesetzt", punkte: 18 },
      { text: "Jemand verlässt die Gruppe", punkte: 11 },
      { text: "500 ungelesene Nachrichten", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man tut, wenn man sich blamiert hat",
    antworten: [
      { text: "So tun, als wär nichts", punkte: 37 },
      { text: "Nachts wieder dran denken", punkte: 25 },
      { text: "Schnell verschwinden", punkte: 18 },
      { text: "Selbst drüber lachen", punkte: 12 },
      { text: "Es allen selbst erzählen", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das man macht, kurz bevor man einschläft",
    antworten: [
      { text: "Am Handy scrollen", punkte: 44 },
      { text: "An peinliche Momente denken", punkte: 21 },
      { text: "Den Wecker stellen", punkte: 15 },
      { text: "Das Kissen umdrehen", punkte: 12 },
      { text: "Nochmal aufs Klo", punkte: 8 },
    ]
  },
  {
    frage: "Nenne etwas, das jeder behauptet zu können, aber keiner wirklich kann",
    antworten: [
      { text: "Gut tanzen", punkte: 33 },
      { text: "Eine Fremdsprache", punkte: 26 },
      { text: "Kochen", punkte: 19 },
      { text: "Singen", punkte: 14 },
      { text: "Autos reparieren", punkte: 8 },
    ]
  },
  {
    frage: "Nenne den ersten Gedanken am Montagmorgen",
    antworten: [
      { text: "Noch fünf Minuten", punkte: 42 },
      { text: "Warum ist das Wochenende vorbei", punkte: 23 },
      { text: "Ich kündige", punkte: 16 },
      { text: "Was zieh ich an", punkte: 11 },
      { text: "Kaffee/Energy", punkte: 8 },
    ]
  }
];
