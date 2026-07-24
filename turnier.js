/*
  Turniermodus
  ------------
  Haelt fest, welche Formate an diesem Abend gespielt werden, und
  zieht alle Geraete automatisch ins naechste Format, wenn du
  weiterschaltest.

  Wie es laeuft:
  - Du stellst in turnier/index.html die Formate zusammen
  - Jede Seite bindet turnier.js ein und meldet ihre Rolle an
  - Wechselt das aktive Format, springt jedes Geraet auf die
    passende Seite: Host auf host.html, Buzzer auf buzzer.html,
    du selbst auf spielleiter.html

  Die Rolle merkt sich das Geraet in localStorage. Wer einmal als
  Host gestartet ist, bleibt Host - auch nach dem Wechsel.
*/
(function () {
  'use strict';

  var TABELLE = 'turnier_state';

  // Welche Datei gehoert zu welcher Rolle?
  // Vier Formate haben alles in einer index.html, dort wird die
  // Rolle als Parameter uebergeben.
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

  function meineRolle() {
    try {
      var r = localStorage.getItem('ka_rolle');
      if (r) return r;
    } catch (e) {}
    // Aus dem Pfad ableiten, falls noch nichts gespeichert ist
    var p = location.pathname;
    if (p.indexOf('spielleiter') >= 0) return 'sl';
    if (p.indexOf('buzzer') >= 0) return 'buzzer';
    if (p.indexOf('host') >= 0) return 'host';
    return null;
  }

  function setzeRolle(r) {
    try { localStorage.setItem('ka_rolle', r); } catch (e) {}
  }

  function meinFormat() {
    var teile = location.pathname.split('/').filter(Boolean);
    // Der vorletzte Teil ist der Ordner, der letzte die Datei
    return teile.length >= 2 ? teile[teile.length - 2] : null;
  }

  function wurzel() {
    // Wie tief liegen wir? /klapsen-app-main/morph/host.html -> eine Ebene
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

  /* ---------- Anbindung ---------- */

  var sb = null;
  var letztesFormat = null;
  var kanal = null;

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

  function pruefeWechsel(s) {
    if (!s || !s.aktiv) return;
    var rolle = meineRolle();
    if (!rolle) return;

    // Beim ersten Durchlauf merken, wo wir stehen
    if (letztesFormat === null) { letztesFormat = s.aktiv; return; }
    if (s.aktiv === letztesFormat) return;

    letztesFormat = s.aktiv;
    var ziel = zielWeg(s.aktiv, rolle);
    if (!ziel) return;
    // Kurz warten, damit man den Wechsel bemerkt
    setTimeout(function () { location.href = ziel; }, 600);
  }

  function starte(client) {
    sb = client || window.KA_SB;
    if (!sb) return;

    lade().then(function (s) {
      if (s && s.aktiv) letztesFormat = s.aktiv;
    });

    kanal = sb.channel('turnier_' + Math.random().toString(36).slice(2, 8))
      .on('postgres_changes',
          { event: '*', schema: 'public', table: TABELLE },
          function (payload) {
            var s = payload && payload.new ? payload.new.state : null;
            pruefeWechsel(s);
          })
      .subscribe();

    // Sicherheitsnetz, falls Realtime haengt
    setInterval(async function () {
      var s = await lade();
      pruefeWechsel(s);
    }, 8000);
  }

  window.TURNIER = {
    starte: starte,
    lade: lade,
    speichere: speichere,
    setzeRolle: setzeRolle,
    meineRolle: meineRolle,
    meinFormat: meinFormat,
    zielWeg: zielWeg,
    NAMEN: NAMEN,
    WEGE: WEGE
  };
})();
