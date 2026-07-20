
// Morph — Facemorph-Ratespiel
// Jeder Eintrag ist ein gemorphtes Gesicht aus ZWEI Personen/Charakteren.
//
// So fuellst du einen Eintrag:
//   morph   = das fertige, verschmolzene KI-Bild (das wird zuerst gezeigt)
//   bildA   = Originalbild von Person A  (fuer die Aufloesung)
//   bildB   = Originalbild von Person B  (fuer die Aufloesung)
//   nameA   = Name von Person A
//   nameB   = Name von Person B
//
// Ablauf im Spiel: erst wird "morph" gezeigt, dann loest der Spielleiter
// schrittweise auf: zuerst Person A, dann Person B.
//
// Tipp: Mische WIRKLICH BEKANNTE Personen oder bekannte Anime-Charaktere,
// damit die markanten Gesichtszuege gut erkennbar bleiben.
//
// Nicht gebrauchte Eintraege einfach loeschen.

const MORPHS = [
  { morph: "https://i.imgur.com/qjK8fHu_d.png?maxwidth=520&shape=thumb&fidelity=high", bildA: "https://i.pinimg.com/1200x/e2/f0/6c/e2f06c9101dc22814be2a2352f7dc871.jpg", bildB: "https://i.pinimg.com/736x/ae/2f/c3/ae2fc3f8087bbafbc067c32a895bea49.jpg", nameA: "Son Goku", nameB: "John Watson" },
  { morph: "https://i.imgur.com/SjnPLuz_d.png?maxwidth=520&shape=thumb&fidelity=high", bildA: "https://i.pinimg.com/736x/46/bd/02/46bd02bacb7dbfd8725abe4aaf0885cb.jpg", bildB: "https://i.pinimg.com/736x/59/76/f2/5976f25869125cc5376fb3dd25f512bf.jpg", nameA: "Taylor Swift", nameB: "Gollum" },
  { morph: "https://i.imgur.com/uLrHVNT_d.png?maxwidth=520&shape=thumb&fidelity=high", bildA: "https://i.pinimg.com/736x/1f/c5/65/1fc565de4b2a96e96553d219c62632a3.jpg", bildB: "https://i.pinimg.com/736x/73/58/44/73584402ad4a1c279e4729f1beffbcf1.jpg", nameA: "Billie Eilish", nameB: "Ariana Grande" },
  { morph: "https://i.imgur.com/b9xLs0A_d.png?maxwidth=520&shape=thumb&fidelity=high", bildA: "https://i.pinimg.com/736x/5c/b0/d9/5cb0d9f7737263b0ba8a0f1d0cc41df9.jpg", bildB: "https://i.pinimg.com/736x/c6/66/8d/c6668d6f1b57973b4d81bb9ffb59f371.jpg", nameA: "Sherlock Holmes", nameB: "Frodo Beutlin" },
  { morph: "https://i.imgur.com/bBFPg85_d.png?maxwidth=520&shape=thumb&fidelity=high", bildA: "https://i.pinimg.com/736x/a8/2d/76/a82d7650231cbc5cbfba1920d07003fb.jpg", bildB: "https://i.pinimg.com/1200x/5f/ce/fd/5fcefdc31d72043ece5c8f336d1d2183.jpg", nameA: "Ruffy", nameB: "Friedrich Merz" },
  { morph: "https://i.imgur.com/8Ci6swD_d.png?maxwidth=520&shape=thumb&fidelity=high", bildA: "https://i.pinimg.com/736x/31/e7/41/31e741e4c7776682ec8f659536def868.jpg", bildB: "https://i.pinimg.com/1200x/48/49/ba/4849ba2ea6517f805785071120cccc08.jpg", nameA: "Elon Musk", nameB: "Ronaldo" },
  { morph: "https://i.imgur.com/Di8oDJE_d.png?maxwidth=520&shape=thumb&fidelity=high", bildA: "https://i.pinimg.com/736x/f5/ed/1a/f5ed1acd5a5f331aaf77f583de5ae9c3.jpg", bildB: "https://i.pinimg.com/736x/45/53/3a/45533a655044413f7482908cbc111a88.jpg", nameA: "Haaland", nameB: "Bellingham" },
  { morph: "https://i.imgur.com/pbl7Up7_d.png?maxwidth=520&shape=thumb&fidelity=high", bildA: "https://i.pinimg.com/736x/1a/d9/8c/1ad98c7851a56ed38c50d61b016ae44c.jpg", bildB: "https://i.pinimg.com/1200x/15/e5/bd/15e5bd21393d2e66e157a009e98b1cdc.jpg", nameA: "Michi Jackson", nameB: "Elsa" },
  { morph: "https://i.imgur.com/BjcuJxk_d.png?maxwidth=520&shape=thumb&fidelity=high", bildA: "https://i.pinimg.com/1200x/26/44/27/264427b3a0349f7a7072dc124d954061.jpg", bildB: "https://i.pinimg.com/1200x/cb/5c/08/cb5c08214d207238d26e3732d458013e.jpg", nameA: "Albert Einstein", nameB: "Tom Holland" },
  { morph: "https://i.imgur.com/ZRkO2A4_d.png?maxwidth=520&shape=thumb&fidelity=high", bildA: "https://i.pinimg.com/736x/98/de/f6/98def60b4d32cee6eba13f269594412c.jpg", bildB: "https://i.pinimg.com/736x/4e/ef/1a/4eef1ad4b8e63aa117b7c03f830890b4.jpg", nameA: "Eminem", nameB: "Will Smith" }
];
