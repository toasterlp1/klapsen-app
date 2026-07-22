
const WWM_FRAGEN = [

  { frage: "Was passiert, wenn man Cola und Mentos mischt?", antworten: ["Es wird süsser","Es explodiert wie ein Geysir","Gar nichts","Es gefriert"], richtig: 1 },
  { frage: "Wie viele Beine hat eine Spinne?", antworten: ["6","8","10","12"], richtig: 1 },

  { frage: "Was ist ein Katzenjunges?", antworten: ["Ein Welpe","Ein Kitten","Ein Ferkel","Ein Küken"], richtig: 1 },
  { frage: "Welche Farbe entsteht, wenn man Blau und Gelb mischt?", antworten: ["Lila","Orange","Grün","Braun"], richtig: 2 },

  { frage: "Was kann ein Oktopus, was Menschen nicht können?", antworten: ["Fliegen","Die Farbe wechseln","Unsichtbar werden","Feuer spucken"], richtig: 1 },
  { frage: "Wie viele Minuten hat ein Fussballspiel regulär?", antworten: ["60","80","90","120"], richtig: 2 },

  { frage: "Welches Tier schläft im Stehen?", antworten: ["Der Hund","Das Pferd","Die Katze","Der Hase"], richtig: 1 },
  { frage: "Was ist das grösste Organ des Menschen?", antworten: ["Die Leber","Das Gehirn","Die Haut","Die Lunge"], richtig: 2 },

  { frage: "Wie nennt man einen Pilz, der auf Pizza landet?", antworten: ["Champignon","Fliegenpilz","Trüffel","Pfifferling"], richtig: 0 },
  { frage: "Wie heisst die Währung in Japan?", antworten: ["Won","Yuan","Yen","Baht"], richtig: 2 },

  { frage: "Wie viele Herzen hat ein Oktopus?", antworten: ["1","2","3","4"], richtig: 2 },
  { frage: "Welches Tier kann rückwärts fliegen?", antworten: ["Der Adler","Der Kolibri","Die Möwe","Der Papagei"], richtig: 1 },

  { frage: "Was passiert mit Bananen, wenn sie zu lange liegen?", antworten: ["Sie werden grün","Sie werden braun","Sie werden hart","Sie schrumpfen zu nichts"], richtig: 1 },
  { frage: "Welches Land isst pro Kopf am meisten Käse?", antworten: ["Deutschland","Frankreich","Italien","Dänemark"], richtig: 1 },

  { frage: "Was ist Wasabi eigentlich?", antworten: ["Eine Alge","Eine Wurzel","Eine Bohne","Ein Fisch"], richtig: 1 },
  { frage: "Wie lange kann ein Mensch ungefähr ohne Schlaf auskommen?", antworten: ["1 Tag","3 Tage","11 Tage","30 Tage"], richtig: 2 },

  { frage: "Welches Tier hat den längsten Schlaf pro Tag?", antworten: ["Die Katze","Das Faultier","Der Koala","Der Bär"], richtig: 2 },
  { frage: "Was ist ein Zwiebelturm?", antworten: ["Ein Gemüsestapel","Eine Kirchturmform","Ein Kochtrick","Ein Kartenspiel"], richtig: 1 },

  { frage: "Was passiert, wenn man Popcornmais zu lange erhitzt?", antworten: ["Es wird gross","Es verbrennt","Es schmilzt","Es wird flüssig"], richtig: 1 },
  { frage: "Welche Stadt liegt auf zwei Kontinenten?", antworten: ["Kairo","Istanbul","Athen","Moskau"], richtig: 1 },

  { frage: "Wie viele Löcher hat ein Strohhalm?", antworten: ["Keins","Eins","Zwei","Drei"], richtig: 1 },
  { frage: "Welches Tier kann seinen Kopf fast komplett drehen?", antworten: ["Die Eule","Der Frosch","Der Fisch","Die Ente"], richtig: 0 },

  { frage: "Was ist eine Erdnuss botanisch gesehen?", antworten: ["Eine Nuss","Eine Hülsenfrucht","Eine Beere","Ein Samen"], richtig: 1 },
  { frage: "Welches Meerestier hat blaues Blut?", antworten: ["Der Hai","Der Tintenfisch","Der Delfin","Die Qualle"], richtig: 1 },

  { frage: "Was ist eine Banane botanisch gesehen?", antworten: ["Eine Frucht","Eine Beere","Ein Gemüse","Ein Kraut"], richtig: 1 },
  { frage: "Wie viele Zähne hat ein erwachsener Mensch normalerweise?", antworten: ["28","30","32","36"], richtig: 2 },

  { frage: "Welches Lebensmittel wird nie schlecht?", antworten: ["Milch","Honig","Brot","Käse"], richtig: 1 },
  { frage: "Welcher Planet dreht sich rückwärts?", antworten: ["Mars","Venus","Jupiter","Saturn"], richtig: 1 },

  { frage: "Wie viel Prozent des Gehirns nutzt der Mensch wirklich?", antworten: ["10 Prozent","50 Prozent","Fast alles","30 Prozent"], richtig: 2 },
  { frage: "Was ist der kürzeste Krieg der Geschichte gewesen?", antworten: ["3 Tage","38 Minuten","1 Woche","2 Stunden"], richtig: 1 },

];

function wwmPunkte(index) {
  return Math.floor(index / 2) + 1;
}

if (typeof window !== 'undefined') {
  window.WWM_FRAGEN = WWM_FRAGEN;
  window.wwmPunkte = wwmPunkte;
}
