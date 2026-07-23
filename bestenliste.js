
const BL_FORMATE = {
  'quizduell': 'Quiz Duell',
  'chatduell': 'ChatDuell',
  'hotzone': 'Hotzone',
  'emoji': 'Emoji-Rätsel',
  'weristdas': 'Wer ist das?',
  'higherlower': 'Higher or Lower',
  'blackstories': 'Black Stories',
  'imposter': 'Imposter',
  'millionaer': 'Wer wird Millionär',
  'bluff-quiz': 'Bluff-Quiz',
  'skribbl': 'Skribbl',
  'gartic': 'Gartic Phone'
};

function bl_client(){
  return window.KA_SB || null;
}

// Welche Gruppe gerade spielt.
// Bisher rief das eine Funktion aktuelleGruppe() auf, die es
// nirgends im Projekt gab - alles landete unter 'standard' und
// die Bestenliste zeigte samtliche Gruppen gemischt.
// Jetzt haengt es an avatare.js: wer dort steht, bildet die Crew.
function bl_gruppe(){
  if(typeof aktuelleGruppe === 'function'){
    try { return aktuelleGruppe() || 'standard'; } catch(e){}
  }
  // Von Hand gesetzt (localStorage) hat Vorrang
  try {
    const gesetzt = localStorage.getItem('ka_gruppe');
    if(gesetzt) return gesetzt;
  } catch(e){}
  // Sonst aus avatare.js ableiten: der Kommentar in Zeile 1
  // benennt die Gruppe, ersatzweise die Namen selbst.
  if(typeof AVATARE === 'object' && AVATARE){
    if(typeof AVATARE_GRUPPE === 'string' && AVATARE_GRUPPE) return AVATARE_GRUPPE;
  }
  return 'standard';
}

// Nur Spieler aus avatare.js zaehlen.
// Ohne diesen Filter tauchten in der Rangliste alle Namen auf,
// die je gespielt haben - auch aus anderen Freundeskreisen.
function bl_gehoertZurCrew(name){
  if(typeof AVATARE !== 'object' || !AVATARE) return true;
  const crew = Object.keys(AVATARE);
  if(!crew.length) return true;
  return crew.indexOf(name) >= 0;
}

async function speichereErgebnisse(format, ergebnisse){
  const sb = bl_client();
  if(!sb || !ergebnisse || !ergebnisse.length) return { ok:false, grund:'keine Daten' };

  const gefiltert = ergebnisse.filter(e => e && e.spieler && (e.punkte || e.punkte === 0));
  if(!gefiltert.length) return { ok:false, grund:'keine gültigen Spieler' };

  const rundeId = crypto.randomUUID();
  const gruppe = bl_gruppe();
  const sortiert = gefiltert.slice().sort((a,b) => b.punkte - a.punkte);

  const rows = sortiert.map((e,i) => ({
    format: format,
    spieler: e.spieler,
    punkte: Math.round(e.punkte || 0),
    platz: i + 1,
    runde_id: rundeId,
    gruppe: gruppe
  }));

  const { error } = await sb.from('ergebnisse').insert(rows);
  if(error){ console.error('Bestenliste:', error.message); return { ok:false, grund:error.message }; }
  return { ok:true, anzahl:rows.length };
}

async function ladeBestenliste(){
  const sb = bl_client();
  if(!sb) return null;

  const gruppe = bl_gruppe();
  const { data, error } = await sb.from('ergebnisse')
    .select('format, spieler, punkte, platz, gruppe')
    .eq('gruppe', gruppe);
  if(error){ console.error('Bestenliste:', error.message); return null; }

  const gesamt = {};
  const proFormat = {};

  data.forEach(r => {
    // Fremde Namen aus anderen Freundeskreisen ueberspringen
    if(!bl_gehoertZurCrew(r.spieler)) return;
    if(!gesamt[r.spieler]) gesamt[r.spieler] = { spieler:r.spieler, punkte:0, siege:0, spiele:0 };
    gesamt[r.spieler].punkte += r.punkte;
    gesamt[r.spieler].spiele += 1;
    if(r.platz === 1) gesamt[r.spieler].siege += 1;

    if(!proFormat[r.format]) proFormat[r.format] = {};
    if(!proFormat[r.format][r.spieler]) proFormat[r.format][r.spieler] = { spieler:r.spieler, punkte:0, siege:0, spiele:0 };
    const f = proFormat[r.format][r.spieler];
    f.punkte += r.punkte;
    f.spiele += 1;
    if(r.platz === 1) f.siege += 1;
  });

  const sortFn = (a,b) => (b.siege - a.siege) || (b.punkte - a.punkte);

  const formate = Object.keys(proFormat).map(key => ({
    key: key,
    name: BL_FORMATE[key] || key,
    rangliste: Object.values(proFormat[key]).sort(sortFn)
  })).sort((a,b) => a.name.localeCompare(b.name, 'de-CH'));

  return { gesamt: Object.values(gesamt).sort(sortFn), formate: formate, gruppe: gruppe };
}

async function ladeSpielerStatistiken(){
  const sb = bl_client();
  if(!sb) return null;

  const gruppe = bl_gruppe();
  const { data, error } = await sb.from('ergebnisse')
    .select('format, spieler, punkte, platz, runde_id, gruppe')
    .eq('gruppe', gruppe);
  if(error){ console.error('Statistiken:', error.message); return null; }
  if(!data || !data.length) return { spieler: {}, formatNamen: BL_FORMATE };

  const runden = {};
  data.forEach(r => {
    if(!bl_gehoertZurCrew(r.spieler)) return;
    if(!runden[r.runde_id]) runden[r.runde_id] = { format:r.format, eintraege:[] };
    runden[r.runde_id].eintraege.push({ spieler:r.spieler, punkte:r.punkte, platz:r.platz });
  });

  const spieler = {};
  function slot(name){
    if(!spieler[name]) spieler[name] = {
      spieler:name, spiele:0, siege:0, podeste:0, punkte:0, platzSumme:0,
      proFormat:{}, gegner:{}
    };
    return spieler[name];
  }

  data.forEach(r => {
    if(!bl_gehoertZurCrew(r.spieler)) return;
    const s = slot(r.spieler);
    s.spiele += 1;
    s.punkte += r.punkte;
    s.platzSumme += r.platz;
    if(r.platz === 1) s.siege += 1;
    if(r.platz <= 3) s.podeste += 1;

    if(!s.proFormat[r.format]) s.proFormat[r.format] = { format:r.format, spiele:0, siege:0, punkte:0 };
    const pf = s.proFormat[r.format];
    pf.spiele += 1;
    pf.punkte += r.punkte;
    if(r.platz === 1) pf.siege += 1;
  });

  Object.values(runden).forEach(runde => {
    const e = runde.eintraege;
    for(let i=0;i<e.length;i++){
      for(let j=0;j<e.length;j++){
        if(i===j) continue;
        const a = e[i], b = e[j];
        const s = spieler[a.spieler];
        if(!s) continue;
        if(!s.gegner[b.spieler]) s.gegner[b.spieler] = { gegner:b.spieler, davor:0, dahinter:0 };
        if(a.platz < b.platz) s.gegner[b.spieler].davor += 1;
        else if(a.platz > b.platz) s.gegner[b.spieler].dahinter += 1;
      }
    }
  });

  return { spieler: spieler, formatNamen: BL_FORMATE };
}
