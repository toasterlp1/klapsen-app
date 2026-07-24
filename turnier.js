/*
  Turniermodus
  ------------
  Haelt fest, welche Formate an diesem Abend gespielt werden, und
  zieht ALLE Geraete zuverlaessig ins naechste Format, wenn du
  weiterschaltest.

  Warum es jetzt wirklich zieht:
  Frueher wurde nur "hat sich das aktive Format geaendert?" geprueft.
  Verpasste ein Geraet den einen Realtime-Moment (Seite lud gerade neu,
  Realtime hakte, App war kurz im Hintergrund), war die Schaltung fuer
  dieses Geraet fuer immer verpasst.

  Jetzt zaehlt jede Schaltung einen Zaehler "gen" hoch. Jedes Geraet
  merkt sich in sessionStorage, welche "gen" es zuletzt umgesetzt hat.
  Bei jedem Realtime-Event UND bei jedem Poll (alle 2.5s) UND beim
  Zurueckkehren in den Vordergrund vergleicht es: liegt die gespeicherte
  gen der Datenbank hoeher als meine? Dann springe ich - egal wie oft
  ich das Event verpasst habe. Damit gibt es kein "manchmal" mehr.
*/
(function () {
  'use strict';

  var TABELLE = 'turnier_state';
  var GEN_KEY = 'ka_turnier_gen';   // zuletzt umgesetzte Schaltung (pro Geraet)
  var FREI_KEY = 'ka_turnier_frei'; // Geraet hat sich per Home ausgeklinkt

  // Welche Datei gehoert zu welcher Rolle?
  var WEGE = {
    ausreden:       { host:'host.html', sl:'spielleiter.html', buzzer:'buzzer.html' },
    blackstories:   { host:'host.html', sl:'spielleiter.html', buzzer:'host.html' },
    'bluff-quiz':   { host:'host.html', sl:'spielleiter.html', buzzer:'buzzer.html' },
    chatduell:      { host:'host.html', sl:'spielleiter.html', buzzer:'buzzer.html' },
    emoji:          { host:'host.html', sl:'spielleiter.html', buzzer:'buzzer.html' },
    higherlower:    { host:'host.html', sl:'spielleiter.html', buzzer:'host.html?nur=zuschauen' },
    hotzone:        { host:'host.html', sl:'spielleiter.html', buzzer:'buzzer.html' },
    imposter:       { host:'host.html', sl:'spielleiter.html', buzzer:'host.html' },
    millionaer:     { host:'host.html', sl:'spielleiter.html', buzzer:'buzzer.html' },
    morph:          { host:'host.html', sl:'spielleiter.html', buzzer:'buzzer.html' },
    weristdas:      { host:'host.html', sl:'spielleiter.html', buzzer:'buzzer.html' },
    gartic:         { host:'index.html', sl:'index.html', buzzer:'index.html' },
    quizduell:      { host:'index.html?rolle=host', sl:'index.html?rolle=master', buzzer:'index.html?rolle=buzzer' },
    skribbl:        { host:'index.html', sl:'index.html', buzzer:'index.html' },
    stadtlandfluss: { host:'index.html', sl:'index.html', buzzer:'index.html' }
  };

  var NAMEN = {
    ausreden:'Ausredenkönig', blackstories:'Black Stories', 'bluff-quiz':'Bluff-Quiz',
    chatduell:'ChatDuell', emoji:'Emoji-Rätsel', gartic:'Gartic Phone',
    higherlower:'Higher or Lower', hotzone:'Hotzone', imposter:'Imposter',
    millionaer:'Wer wird Millionär', morph:'Morph', quizduell:'Quizduell',
    skribbl:'Skribbl', stadtlandfluss:'Stadt-Land-Fluss', weristdas:'Wer ist das?'
  };

  /* ---------- Rolle (gerätegebunden, wird NIE aus dem Pfad ueberschrieben) ---------- */

  function meineRolle() {
    try {
      var r = localStorage.getItem('ka_rolle');
      if (r) return r;
    } catch (e) {}
    // Nur als allererster Fallback aus dem Pfad ableiten
    var p = location.pathname;
    if (p.indexOf('spielleiter') >= 0) return 'sl';
    if (p.indexOf('buzzer') >= 0) return 'buzzer';
    if (p.indexOf('host') >= 0) return 'host';
    return 'buzzer'; // im Zweifel Zuschauer/Buzzer, nie ausversehen Host
  }

  // setzeRolle(r)        -> normaler Seiten-Default (host.html sagt 'host' usw.)
  // setzeRolle(r, true)  -> feste Lobby-Rolle, die NICHT von Seiten-Defaults
  //                         ueberschrieben werden darf.
  // Ein Spieler, der bei Higher or Lower / Imposter / Black Stories auf der
  // host.html landet, wuerde sonst als 'host' getarnt und beim naechsten
  // Format faelschlich auf die echte Host-Ansicht gezogen.
  function setzeRolle(r, fest) {
    try {
      if (fest) {
        localStorage.setItem('ka_rolle', r);
        localStorage.setItem('ka_rolle_fest', '1');
        return;
      }
      // Kein Ueberschreiben, wenn die Lobby die Rolle fest vergeben hat
      if (localStorage.getItem('ka_rolle_fest') === '1') return;
      localStorage.setItem('ka_rolle', r);
    } catch (e) {}
  }

  /* ---------- Ausklinken / Wiedereinklinken (Home-Button) ---------- */

  function loescheRolle() {
    try {
      localStorage.removeItem('ka_rolle');
      localStorage.removeItem('ka_rolle_fest');
    } catch (e) {}
  }
  function klinkeAus() {
    try { sessionStorage.setItem(FREI_KEY, '1'); } catch (e) {}
  }
  function klinkeEin() {
    try { sessionStorage.removeItem(FREI_KEY); } catch (e) {}
  }

  /* ---------- gen: zuletzt umgesetzte Schaltung ---------- */

  function meineGen() {
    try { return parseInt(sessionStorage.getItem(GEN_KEY) || '0', 10) || 0; }
    catch (e) { return 0; }
  }
  function setzeGen(g) {
    try { sessionStorage.setItem(GEN_KEY, String(g)); } catch (e) {}
  }

  /* ---------- Pfad-Helfer ---------- */

  function wurzel() {
    var teile = location.pathname.split('/').filter(Boolean);
    var datei = teile[teile.length - 1] || '';
    var tiefe = datei.indexOf('.') >= 0 ? 1 : 0;
    return '../'.repeat(tiefe);
  }

  function zielWeg(format, rolle) {
    var w = WEGE[format];
    if (!w) return null;
    return wurzel() + format + '/' + (w[rolle] || w.host);
  }

  function meinFormat() {
    var teile = location.pathname.split('/').filter(Boolean);
    return teile.length >= 2 ? teile[teile.length - 2] : null;
  }

  /* ---------- Anbindung ---------- */

  var sb = null;
  var kanal = null;
  var springtGerade = false;

  async function lade() {
    if (!sb) return null;
    var r = await sb.from(TABELLE).select('state').eq('id', 1).single();
    if (r.error || !r.data) return null;
    return r.data.state || {};
  }

  async function speichere(s) {
    if (!sb) return;
    await sb.from(TABELLE).update({ state: s, updated_at: new Date().toISOString() }).eq('id', 1);
  }

  // Der Kern: liegt die Schaltung der Datenbank vor meiner? Dann ziehen.
  function pruefeWechsel(s) {
    if (springtGerade) return;
    if (!s || !s.laeuft || !s.aktiv) return;
    if (istFrei()) return;                 // per Home ausgeklinkt -> nicht ziehen

    var dbGen = parseInt(s.gen || 0, 10) || 0;
    if (dbGen <= meineGen()) return;       // ich bin schon auf dem Stand

    var rolle = meineRolle();
    var ziel = zielWeg(s.aktiv, rolle);

    // Merken, dass ich diese Schaltung gesehen habe - auch wenn ich
    // schon auf der richtigen Seite bin (dann springe ich nicht doppelt).
    setzeGen(dbGen);

    if (!ziel) return;

    // Bin ich schon genau da? Dann nicht neu laden.
    var jetzt = location.pathname.split('/').filter(Boolean);
    var jetztFormat = jetzt.length >= 2 ? jetzt[jetzt.length - 2] : null;
    var zielDatei = (WEGE[s.aktiv] && WEGE[s.aktiv][rolle]) || '';
    var zielHatParam = zielDatei.indexOf('?') >= 0;
    var binSchonDa = (jetztFormat === s.aktiv) &&
                     (!zielHatParam ? location.pathname.indexOf(zielDatei.split('?')[0]) >= 0
                                    : (location.pathname + location.search).indexOf(zielDatei) >= 0);
    if (binSchonDa) return;

    springtGerade = true;
    setTimeout(function () { location.href = ziel; }, 400);
  }

  function starte(client) {
    sb = client || window.KA_SB;
    if (!sb) return;

    // Wer selbst ein Format oeffnet, klinkt sich wieder ins Turnier ein.
    // (Die Steuerungsseite ruft danach klinkeAus() erneut auf und bleibt frei.)
    klinkeEin();

    // Beim Laden sofort abgleichen: bin ich auf dem aktuellen Stand?
    lade().then(function (s) { pruefeWechsel(s); });

    kanal = sb.channel('turnier_' + Math.random().toString(36).slice(2, 8))
      .on('postgres_changes',
          { event: '*', schema: 'public', table: TABELLE },
          function (payload) {
            var s = payload && payload.new ? payload.new.state : null;
            pruefeWechsel(s);
          })
      .subscribe();

    // Sicherheitsnetz: schneller Poll faengt jedes verpasste Event ab
    setInterval(async function () {
      var s = await lade();
      pruefeWechsel(s);
    }, 2500);

    // Zurueck aus dem Hintergrund (Handy war gesperrt) -> sofort abgleichen
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) lade().then(function (s) { pruefeWechsel(s); });
    });
    window.addEventListener('focus', function () {
      lade().then(function (s) { pruefeWechsel(s); });
    });
  }

  window.TURNIER = {
    starte: starte,
    lade: lade,
    speichere: speichere,
    setzeRolle: setzeRolle,
    meineRolle: meineRolle,
    meinFormat: meinFormat,
    zielWeg: zielWeg,
    meineGen: meineGen,
    setzeGen: setzeGen,
    klinkeAus: klinkeAus,
    klinkeEin: klinkeEin,
    istFrei: istFrei,
    loescheRolle: loescheRolle,
    NAMEN: NAMEN,
    WEGE: WEGE
  };
})();
