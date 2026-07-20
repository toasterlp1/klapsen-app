
const WWM_FRAGEN = [

  { frage: "Die Hauptstadt von Australien ist...", antworten: ["Canberra","Melbourne","Sydney","Ottawa"], richtig: 0 },
  { frage: "Wie viele Beine hat eine Spinne?", antworten: ["6","8","10","12"], richtig: 1 },

  { frage: "Welches Element hat das Symbol 'Au'?", antworten: ["Silber","Aluminium","Gold","Kupfer"], richtig: 2 },
  { frage: "Wie viele Spieler stehen bei einer Fussballmannschaft auf dem Feld?", antworten: ["9","10","11","12"], richtig: 2 },

  { frage: "Welcher Planet ist der Sonne am nächsten?", antworten: ["Venus","Merkur","Mars","Erde"], richtig: 1 },
  { frage: "Wer malte die Mona Lisa?", antworten: ["Michelangelo","Raffael","Donatello","Leonardo da Vinci"], richtig: 3 },

  { frage: "In welchem Jahr fiel die Berliner Mauer?", antworten: ["1987","1989","1991","1993"], richtig: 1 },
  { frage: "Welches ist das grösste Organ des menschlichen Körpers?", antworten: ["Die Leber","Das Gehirn","Die Haut","Die Lunge"], richtig: 2 },

  { frage: "Welche Firma entwickelte 'League of Legends'?", antworten: ["Valve","Riot Games","Blizzard","Epic Games"], richtig: 1 },
  { frage: "Wie heisst die Währung Japans?", antworten: ["Won","Yuan","Yen","Baht"], richtig: 2 },

  { frage: "Wie viele Herzen hat ein Oktopus?", antworten: ["1","2","3","4"], richtig: 2 },
  { frage: "Welcher Fluss fliesst durch Wien?", antworten: ["Die Donau","Der Rhein","Die Elbe","Die Themse"], richtig: 0 },

  { frage: "Wer schrieb 'Der Herr der Ringe'?", antworten: ["C. S. Lewis","J. R. R. Tolkien","George R. R. Martin","Terry Pratchett"], richtig: 1 },
  { frage: "Welches Land gewann die Fussball-WM 2014?", antworten: ["Brasilien","Argentinien","Deutschland","Spanien"], richtig: 2 },

  { frage: "Wie heisst das grösste Korallenriff der Welt?", antworten: ["Belize Barrier Reef","Great Barrier Reef","Red Sea Reef","Tubbataha Reef"], richtig: 1 },
  { frage: "Welches chemische Element hat die Ordnungszahl 1?", antworten: ["Helium","Sauerstoff","Wasserstoff","Kohlenstoff"], richtig: 2 },

  { frage: "In welchem Jahr erschien das originale 'Doom'?", antworten: ["1991","1993","1995","1997"], richtig: 1 },
  { frage: "Wer war der erste Mensch im Weltall?", antworten: ["Neil Armstrong","Alan Shepard","Juri Gagarin","John Glenn"], richtig: 2 },

  { frage: "Welche Stadt liegt auf zwei Kontinenten?", antworten: ["Kairo","Istanbul","Athen","Moskau"], richtig: 1 },
  { frage: "Wie heisst der tiefste See der Welt?", antworten: ["Der Titicacasee","Der Baikalsee","Der Tanganjikasee","Das Kaspische Meer"], richtig: 1 },

  { frage: "Welcher Komponist schrieb die Oper 'Carmen'?", antworten: ["Giuseppe Verdi","Georges Bizet","Richard Wagner","Giacomo Puccini"], richtig: 1 },
  { frage: "Welches Studio entwickelte 'Elden Ring'?", antworten: ["Capcom","Bandai Namco","FromSoftware","Square Enix"], richtig: 2 },

  { frage: "Wie heisst die Hauptstadt von Kasachstan?", antworten: ["Astana","Almaty","Taschkent","Bischkek"], richtig: 0 },
  { frage: "Welcher Physiker formulierte die Unschärferelation?", antworten: ["Niels Bohr","Max Planck","Werner Heisenberg","Erwin Schrödinger"], richtig: 2 },

  { frage: "In welchem Jahr eroberten die Osmanen Konstantinopel?", antworten: ["1453","1492","1517","1389"], richtig: 0 },
  { frage: "Wie heisst das einzige Säugetier, das Eier legt und in Australien lebt?", antworten: ["Der Koala","Das Schnabeltier","Der Wombat","Das Opossum"], richtig: 1 },

  { frage: "Welcher Regisseur drehte 'Die sieben Samurai'?", antworten: ["Yasujiro Ozu","Akira Kurosawa","Kenji Mizoguchi","Hayao Miyazaki"], richtig: 1 },
  { frage: "Wie heisst der grösste Vulkan im Sonnensystem?", antworten: ["Mauna Loa","Olympus Mons","Ätna","Vesuv"], richtig: 1 },

  { frage: "Welche Konstante beschreibt die Zahl der Teilchen in einem Mol?", antworten: ["Planck-Konstante","Avogadro-Zahl","Boltzmann-Konstante","Faraday-Konstante"], richtig: 1 },
  { frage: "Wie heisst das Schwarze Loch im Zentrum der Milchstrasse?", antworten: ["Cygnus X-1","Sagittarius A*","M87*","Centaurus A"], richtig: 1 },
];

function wwmPunkte(index) {
  return Math.floor(index / 2) + 1;
}

if (typeof window !== 'undefined') {
  window.WWM_FRAGEN = WWM_FRAGEN;
  window.wwmPunkte = wwmPunkte;
}
