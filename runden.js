/*
  Rundenlimit
  -----------
  Legt fest, wie viele Runden ein Format laeuft, zeigt den Stand an
  und meldet, wenn die letzte Runde durch ist.

  Warum:
  Bisher lief jedes Format, bis der Spielleiter von Hand aufhoerte.
  Bei einem Turnierabend braucht es einen festen Rahmen - "wir
  spielen 30 Emoji-Raetsel" statt "wir hoeren auf, wenn es reicht".

  Nutzung im Spielleiter:

    RUNDEN.init({
      key: 'mo',                       // Kuerzel des Formats
      state: () => state,              // liefert den aktuellen State
      speichern: async (s) => save(s), // schreibt ihn zurueck
      zaehler: (s) => (s.usedIndices || []).length,
      standard: 30
    });

  Das Modul haengt sich selbst eine Eingabe in die Seite und
  schreibt zwei Felder in den State:

    rundenZiel   - wie viele Runden geplant sind
    rundenFertig - true, sobald die letzte durch ist

  Der Host liest die beiden Felder und zeigt Stand und Podest.
*/
(function () {
  'use strict';

  var cfg = null;

  function stand() {
    if (!cfg) return { ist: 0, ziel: 0 };
    var s = cfg.state() || {};
    return {
      ist: cfg.zaehler(s) || 0,
      ziel: s.rundenZiel || cfg.standard || 0
    };
  }

  function baueEingabe() {
    if (document.getElementById('rundenBox')) return;

    var box = document.createElement('div');
    box.id = 'rundenBox';
    box.style.cssText =
      'display:flex;align-items:center;gap:8px;flex-wrap:wrap;' +
      'margin:10px 0;padding:10px 12px;border-radius:10px;' +
      'background:#0d1220;border:1px solid #232b45;';

    box.innerHTML =
      '<span style="font-size:13px;color:#6b7488;">Runden:</span>' +
      '<input type="number" id="rundenZiel" min="1" max="99" ' +
        'style="width:66px;padding:7px;border-radius:8px;background:#12172a;' +
        'border:1px solid #232b45;color:#eef1f8;font-size:14px;">' +
      '<span id="rundenStand" style="font-size:13px;color:#eef1f8;font-weight:700;"></span>' +
      '<button id="rundenReset" style="margin-left:auto;padding:7px 11px;' +
        'border:1px solid #232b45;background:#1b2138;color:#eef1f8;' +
        'border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">' +
        'Zähler auf 0</button>';

    // Moeglichst weit oben einhaengen, aber nach der Ueberschrift
    var ziel = document.querySelector('.card') || document.body;
    ziel.insertBefore(box, ziel.firstChild);

    document.getElementById('rundenZiel').onchange = async function (e) {
      var n = parseInt(e.target.value, 10);
      if (!(n >= 1 && n <= 99)) return;
      var s = cfg.state();
      s.rundenZiel = n;
      s.rundenFertig = false;
      await cfg.speichern(s);
      aktualisiere();
    };

    document.getElementById('rundenReset').onclick = async function () {
      var s = cfg.state();
      if (typeof cfg.reset === 'function') cfg.reset(s);
      s.rundenFertig = false;
      await cfg.speichern(s);
      aktualisiere();
    };
  }

  function aktualisiere() {
    if (!cfg) return;
    var st = stand();
    var inp = document.getElementById('rundenZiel');
    var lbl = document.getElementById('rundenStand');
    if (inp && document.activeElement !== inp) inp.value = st.ziel;
    if (lbl) {
      lbl.textContent = st.ist + ' / ' + st.ziel + ' gespielt';
      lbl.style.color = (st.ist >= st.ziel && st.ziel > 0) ? '#ffd166' : '#eef1f8';
    }
    zeigeSperre(st.ist >= st.ziel && st.ziel > 0);
  }

  // Ist das Ziel erreicht? Formate koennen das vor einer neuen Runde pruefen.
  function zielErreicht() {
    var st = stand();
    return st.ziel > 0 && st.ist >= st.ziel;
  }

  // Blendet oben einen deutlichen Hinweis ein und sperrt die
  // "neue Runde"-Knoepfe, sobald das Ziel erreicht ist.
  function zeigeSperre(an) {
    var box = document.getElementById('rundenSperre');
    if (an && !box) {
      box = document.createElement('div');
      box.id = 'rundenSperre';
      box.style.cssText =
        'margin:10px 0;padding:12px 14px;border-radius:10px;' +
        'background:rgba(255,209,102,.12);border:1px solid #ffd166;' +
        'color:#ffd166;font-size:14px;font-weight:700;line-height:1.5;';
      box.innerHTML = 'Rundenziel erreicht. Schalte unten rechts zum nächsten Format weiter. ' +
        '(Zum Weiterspielen „Zähler auf 0" oder Runden erhöhen.)';
      var ref = document.getElementById('rundenBox');
      if (ref && ref.parentNode) ref.parentNode.insertBefore(box, ref.nextSibling);
    } else if (!an && box) {
      box.remove();
    }
    // "Neue Runde"-artige Knoepfe sperren/entsperren
    var knoepfe = document.querySelectorAll('[data-runden-neu]');
    knoepfe.forEach(function (b) {
      b.disabled = an;
      b.style.opacity = an ? '.4' : '';
      b.style.cursor = an ? 'not-allowed' : '';
    });
  }

  /* Nach jeder abgeschlossenen Runde aufrufen.
     Meldet zurueck, ob das Ziel erreicht ist - dann zeigt der
     Host von selbst das Podest. */
  async function rundeFertig() {
    if (!cfg) return false;
    var st = stand();
    if (st.ziel > 0 && st.ist >= st.ziel) {
      var s = cfg.state();
      if (!s.rundenFertig) {
        s.rundenFertig = true;
        await cfg.speichern(s);
      }
      aktualisiere();
      return true;
    }
    aktualisiere();
    return false;
  }

  function init(konfig) {
    cfg = konfig;

    function los() {
      baueEingabe();
      markiereNeuKnoepfe();
      aktualisiere();
      // Regelmaessig pruefen, damit die Sperre live greift, sobald das
      // Ziel erreicht ist - auch wenn der Zaehler woanders hochgesetzt wird.
      setInterval(aktualisiere, 1500);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', los);
    } else {
      los();
    }
  }

  // Erkennt "neue Runde"-Knoepfe automatisch an ihrer Beschriftung und
  // markiert sie, damit sie bei erreichtem Ziel gesperrt werden koennen.
  function markiereNeuKnoepfe() {
    var muster = /neuer?\s|neue\s|nächst|naechst|neues?\s|weiter|neue frage|neuer morph|neue runde/i;
    var alle = document.querySelectorAll('button');
    alle.forEach(function (b) {
      var t = (b.textContent || '').trim().toLowerCase();
      // Nur echte "neue Runde/Frage/Morph"-Knoepfe, keine Turnier-Knoepfe
      if (b.id === 'turnierWeiterBtn') return;
      if (/neuer morph|neue runde|neue frage|nächste|naechste|neues rätsel|neues wort|neue aufgabe/i.test(t)) {
        b.setAttribute('data-runden-neu', '1');
      }
    });
  }

  window.RUNDEN = {
    init: init,
    aktualisiere: aktualisiere,
    rundeFertig: rundeFertig,
    zielErreicht: zielErreicht,
    stand: stand
  };
})();
