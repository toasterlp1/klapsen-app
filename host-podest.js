/*
  Podest auf der Host-Seite
  -------------------------
  Zeigt die Siegerehrung automatisch, sobald das Rundenziel eines
  Formats erreicht ist.

  Warum:
  Bisher lief die Siegerehrung nur im Spielleiter - auf dem Monitor,
  den nur du siehst. Im Stream lief derweil das leere Board weiter.

  Nutzung auf der Host-Seite:

    HOSTPODEST.init({
      punkte: function(s){            // aus dem State die Punkte holen
        return Object.entries(s.players || {})
          .map(function(e){ return { spieler:e[0], punkte:e[1] }; });
      }
    });

  Danach bei jedem State-Update aufrufen:

    HOSTPODEST.pruefe(state);

  Sobald state.rundenFertig gesetzt ist, erscheint das Podest.
*/
(function () {
  'use strict';

  var cfg = null;
  var offen = false;

  function stil() {
    if (document.getElementById('hp-stil')) return;
    var st = document.createElement('style');
    st.id = 'hp-stil';
    st.textContent =
      '#hp-schicht{position:fixed;inset:0;z-index:9999;display:none;' +
        'align-items:center;justify-content:center;' +
        'background:rgba(6,9,16,.94);backdrop-filter:blur(10px);' +
        'animation:hpAuf .5s ease both;}' +
      '#hp-schicht.zeigen{display:flex;}' +
      '@keyframes hpAuf{from{opacity:0;}to{opacity:1;}}' +
      '.hp-box{width:min(880px,92vw);text-align:center;}' +
      '.hp-titel{font-family:Anton,Impact,sans-serif;font-size:clamp(30px,6vw,64px);' +
        'letter-spacing:3px;color:#ffd166;margin-bottom:6px;' +
        'text-shadow:0 0 40px rgba(255,209,102,.45);}' +
      '.hp-sub{font-size:clamp(13px,1.6vw,17px);color:#8b93a7;margin-bottom:34px;' +
        'letter-spacing:2px;text-transform:uppercase;}' +
      '.hp-podest{display:flex;justify-content:center;align-items:flex-end;' +
        'gap:clamp(8px,1.6vw,20px);margin-bottom:30px;}' +
      '.hp-platz{border-radius:16px 16px 0 0;padding:14px 10px 16px;' +
        'min-width:clamp(90px,15vw,170px);background:linear-gradient(180deg,#1b2138,#12172a);' +
        'border:1px solid #2a3350;border-bottom:none;animation:hpHoch .6s cubic-bezier(.2,.9,.2,1) both;}' +
      '@keyframes hpHoch{from{transform:translateY(40px);opacity:0;}to{transform:none;opacity:1;}}' +
      '.hp-platz.p1{border-color:#ffd166;box-shadow:0 0 46px -10px rgba(255,209,102,.55);}' +
      '.hp-platz.p2{border-color:#c7cddb;}' +
      '.hp-platz.p3{border-color:#cd7f4a;}' +
      '.hp-platz .rang{font-family:Anton,Impact,sans-serif;font-size:clamp(22px,3.4vw,40px);line-height:1;}' +
      '.hp-platz.p1 .rang{color:#ffd166;}' +
      '.hp-platz.p2 .rang{color:#c7cddb;}' +
      '.hp-platz.p3 .rang{color:#cd7f4a;}' +
      '.hp-platz .ava{width:clamp(44px,6vw,74px);height:clamp(44px,6vw,74px);' +
        'border-radius:50%;object-fit:cover;margin:8px auto;display:block;' +
        'border:2px solid rgba(255,255,255,.18);}' +
      '.hp-platz .nam{font-weight:800;font-size:clamp(12px,1.5vw,17px);color:#eef1f8;' +
        'word-break:break-word;}' +
      '.hp-platz .pkt{font-family:Anton,Impact,sans-serif;font-size:clamp(16px,2.2vw,26px);' +
        'color:#3ddc84;margin-top:4px;}' +
      '.hp-rest{display:flex;flex-direction:column;gap:6px;max-width:440px;margin:0 auto;}' +
      '.hp-zeile{display:flex;justify-content:space-between;padding:9px 14px;' +
        'background:#12172a;border:1px solid #232b45;border-radius:10px;' +
        'font-size:14px;color:#c7cddb;}' +
      '.hp-zeile .p{color:#3ddc84;font-weight:800;}';
    document.head.appendChild(st);
  }

  function schicht() {
    var el = document.getElementById('hp-schicht');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'hp-schicht';
    el.innerHTML = '<div class="hp-box" id="hp-inhalt"></div>';
    document.body.appendChild(el);
    return el;
  }

  function bild(name) {
    var url = (typeof avatarFor === 'function') ? avatarFor(name) : null;
    return url ? '<img class="ava" src="' + url + '" alt="">' : '';
  }

  function zeige(liste) {
    stil();
    var el = schicht();
    var sortiert = liste.slice().sort(function (a, b) {
      return (b.punkte || 0) - (a.punkte || 0);
    });

    var top = sortiert.slice(0, 3);
    var rest = sortiert.slice(3);

    // Reihenfolge auf dem Podest: 2 - 1 - 3
    var anordnung = [top[1], top[0], top[2]].filter(Boolean);
    var rangVon = {};
    top.forEach(function (e, i) { if (e) rangVon[e.spieler] = i + 1; });

    var podest = '<div class="hp-podest">' + anordnung.map(function (e) {
      var r = rangVon[e.spieler];
      var hoehe = r === 1 ? 'padding-top:26px;' : (r === 2 ? 'padding-top:14px;' : '');
      return '<div class="hp-platz p' + r + '" style="' + hoehe + '">' +
             '<div class="rang">' + r + '</div>' +
             bild(e.spieler) +
             '<div class="nam">' + e.spieler + '</div>' +
             '<div class="pkt">' + (e.punkte || 0) + '</div></div>';
    }).join('') + '</div>';

    var liste4 = rest.length
      ? '<div class="hp-rest">' + rest.map(function (e, i) {
          return '<div class="hp-zeile"><span>' + (i + 4) + '. ' + e.spieler +
                 '</span><span class="p">' + (e.punkte || 0) + '</span></div>';
        }).join('') + '</div>'
      : '';

    document.getElementById('hp-inhalt').innerHTML =
      '<div class="hp-titel">SIEGEREHRUNG</div>' +
      '<div class="hp-sub">Alle Runden gespielt</div>' +
      podest + liste4;

    el.classList.add('zeigen');
    offen = true;
  }

  function verstecke() {
    var el = document.getElementById('hp-schicht');
    if (el) el.classList.remove('zeigen');
    offen = false;
  }

  function pruefe(state) {
    if (!cfg || !state) return;
    if (state.rundenFertig) {
      if (!offen) {
        var liste = [];
        try { liste = cfg.punkte(state) || []; } catch (e) { liste = []; }
        liste = liste.filter(function (e) { return e && e.spieler; });
        if (liste.length) zeige(liste);
      }
    } else if (offen) {
      verstecke();
    }
  }

  window.HOSTPODEST = {
    init: function (k) { cfg = k; stil(); },
    pruefe: pruefe,
    verstecke: verstecke
  };
})();
