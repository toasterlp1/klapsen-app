(function () {
  var css = document.createElement('style');
  css.textContent =
    '#sb-btn{position:fixed;left:16px;bottom:16px;z-index:99997;' +
    'display:flex;align-items:center;gap:8px;padding:11px 18px;border-radius:12px;' +
    'background:linear-gradient(135deg,#ff4d4d,#d63030);border:none;color:#fff;cursor:pointer;' +
    'font-family:Inter,system-ui,sans-serif;font-size:14px;font-weight:800;letter-spacing:.3px;' +
    'box-shadow:0 8px 24px -10px rgba(255,77,77,.7);transition:transform .12s;}' +
    '#sb-btn:active{transform:scale(.96);}' +
    '#sb-ov{position:fixed;inset:0;z-index:99999;background:rgba(6,10,20,.85);backdrop-filter:blur(6px);' +
    'display:none;align-items:center;justify-content:center;padding:20px;overflow:hidden;}' +
    '#sb-ov.an{display:flex;}' +
    '#sb-box{background:linear-gradient(165deg,#16223f,#111a30);border:1px solid #2a3a5f;border-radius:20px;' +
    'padding:26px;max-width:520px;width:100%;font-family:Inter,system-ui,sans-serif;color:#eef1f8;' +
    'box-shadow:0 30px 80px -20px rgba(0,0,0,.8);position:relative;z-index:2;max-height:92vh;overflow-y:auto;}' +
    '#sb-box h3{font-family:Anton,sans-serif;font-size:28px;letter-spacing:1px;margin:0 0 4px;text-align:center;}' +
    '#sb-box .sub{color:#8b96b3;font-size:14px;margin-bottom:20px;text-align:center;}' +
    // Podest
    '.sb-podest{display:flex;justify-content:center;align-items:flex-end;gap:10px;margin-bottom:18px;}' +
    '.sb-col{display:flex;flex-direction:column;align-items:center;gap:8px;flex:1;max-width:130px;}' +
    '.sb-col .av-wrap{position:relative;}' +
    '.sb-col .av{border-radius:50%;object-fit:cover;background:#1b2138;border:3px solid #2a3a5f;display:block;}' +
    '.sb-col .av-fb{border-radius:50%;background:#1b2138;display:flex;align-items:center;justify-content:center;' +
    'font-family:Anton,sans-serif;color:#8b96b3;border:3px solid #2a3a5f;}' +
    '.sb-col.p1 .av,.sb-col.p1 .av-fb{width:88px;height:88px;border-color:#f5c542;box-shadow:0 0 26px -4px #f5c542;}' +
    '.sb-col.p2 .av,.sb-col.p2 .av-fb{width:66px;height:66px;border-color:#cdd6e4;box-shadow:0 0 18px -6px #cdd6e4;}' +
    '.sb-col.p3 .av,.sb-col.p3 .av-fb{width:66px;height:66px;border-color:#cd7f4d;box-shadow:0 0 18px -6px #cd7f4d;}' +
    '.sb-col.p1 .av-fb{font-size:36px;}.sb-col.p2 .av-fb,.sb-col.p3 .av-fb{font-size:26px;}' +
    '.sb-col .krone{position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-size:26px;}' +
    '.sb-col .nm{font-weight:800;font-size:14px;text-align:center;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}' +
    '.sb-col .pts{font-family:Anton,sans-serif;font-size:22px;}' +
    '.sb-col.p1 .pts{color:#f5c542;}.sb-col.p2 .pts{color:#cdd6e4;}.sb-col.p3 .pts{color:#cd7f4d;}' +
    '.sb-col .sockel{width:100%;border-radius:10px 10px 0 0;display:flex;align-items:flex-start;justify-content:center;' +
    'padding-top:8px;font-family:Anton,sans-serif;font-size:20px;color:rgba(255,255,255,.5);}' +
    '.sb-col.p1 .sockel{height:70px;background:linear-gradient(180deg,#f5c542,#3a3320);}' +
    '.sb-col.p2 .sockel{height:52px;background:linear-gradient(180deg,#cdd6e4,#2a3040);}' +
    '.sb-col.p3 .sockel{height:40px;background:linear-gradient(180deg,#cd7f4d,#33241a);}' +
    '.sb-col.rein{animation:sbRein .5s cubic-bezier(.16,1,.3,1) both;}' +
    '.sb-col.p1.rein{animation-delay:.25s;}.sb-col.p2.rein{animation-delay:.05s;}.sb-col.p3.rein{animation-delay:.15s;}' +
    '@keyframes sbRein{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}' +
    // Rest-Liste
    '#sb-liste{display:flex;flex-direction:column;gap:7px;margin-bottom:20px;max-height:26vh;overflow-y:auto;}' +
    '#sb-liste .row{display:flex;align-items:center;justify-content:space-between;gap:12px;' +
    'background:#0d1424;border:1px solid #1e2a4a;border-radius:12px;padding:9px 14px;}' +
    '#sb-liste .row .pl{display:flex;align-items:center;gap:10px;}' +
    '#sb-liste .row .rank{font-family:Anton,sans-serif;font-size:16px;color:#8b96b3;min-width:24px;}' +
    '#sb-liste .row .mini{width:28px;height:28px;border-radius:50%;object-fit:cover;background:#1b2138;}' +
    '#sb-liste .row .mini-fb{width:28px;height:28px;border-radius:50%;background:#1b2138;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;color:#8b96b3;}' +
    '#sb-liste .row .nm{font-weight:700;font-size:14px;}' +
    '#sb-liste .row .pts{font-family:Anton,sans-serif;font-size:18px;color:#3ddc84;}' +
    '#sb-box .btns{display:flex;gap:10px;}' +
    '#sb-box button{flex:1;border:none;border-radius:12px;padding:14px;font-weight:800;font-size:15px;' +
    'cursor:pointer;font-family:inherit;transition:transform .12s;}' +
    '#sb-box button:active{transform:scale(.97);}' +
    '#sb-ja{background:linear-gradient(135deg,#3ddc84,#2bbf72);color:#04120c;}' +
    '#sb-nein{background:transparent;border:1px solid #2a3a5f;color:#8b96b3;}' +
    '#sb-box .leer{color:#8b96b3;text-align:center;padding:20px 0;}' +
    '#sb-box .fertig{text-align:center;padding:10px 0;}' +
    '#sb-box .fertig .gross{font-family:Anton,sans-serif;font-size:26px;color:#3ddc84;margin-bottom:6px;}' +
    // Konfetti
    '.sb-konf{position:absolute;top:-12px;width:10px;height:14px;opacity:.9;z-index:1;border-radius:2px;' +
    'animation:sbFall linear forwards;}' +
    '@keyframes sbFall{to{transform:translateY(102vh) rotate(720deg);opacity:.4;}}';
  document.head.appendChild(css);

  var cfg = null;

  function baueButton() {
    if (document.getElementById('sb-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'sb-btn';
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18l7-5 7 5V3z"/></svg><span>Spiel beenden</span>';
    btn.onclick = oeffnen;
    document.body.appendChild(btn);

    var ov = document.createElement('div');
    ov.id = 'sb-ov';
    ov.innerHTML = '<div id="sb-box"></div>';
    ov.onclick = function (e) { if (e.target === ov) schliessen(); };
    document.body.appendChild(ov);

    if (cfg && typeof cfg.sichtbar === 'function') {
      setInterval(function () {
        var zeige = false;
        try { zeige = !!cfg.sichtbar(); } catch (e) { zeige = false; }
        btn.style.display = zeige ? 'flex' : 'none';
      }, 800);
      btn.style.display = 'none';
    }
  }

  function ov() { return document.getElementById('sb-ov'); }
  function box() { return document.getElementById('sb-box'); }
  function schliessen() { ov().classList.remove('an'); entferneKonfetti(); }

  function avatarEl(name, klasse, fbKlasse) {
    var url = (typeof avatarFor === 'function') ? avatarFor(name) : null;
    if (url) return '<img class="' + klasse + '" src="' + url + '" alt="">';
    return '<div class="' + fbKlasse + '">' + (name ? name[0].toUpperCase() : '?') + '</div>';
  }

  function konfetti() {
    var farben = ['#f5c542', '#3ddc84', '#4d9fff', '#ff4d6d', '#c44dff', '#ff9f40'];
    var o = ov();
    for (var i = 0; i < 60; i++) {
      var k = document.createElement('div');
      k.className = 'sb-konf';
      k.style.left = Math.random() * 100 + 'vw';
      k.style.background = farben[Math.floor(Math.random() * farben.length)];
      k.style.animationDuration = (2.5 + Math.random() * 2) + 's';
      k.style.animationDelay = (Math.random() * 0.6) + 's';
      o.appendChild(k);
    }
  }
  function entferneKonfetti() {
    var o = ov();
    if (!o) return;
    o.querySelectorAll('.sb-konf').forEach(function (k) { k.remove(); });
  }

  async function oeffnen() {
    var ergebnisse = [];
    try { ergebnisse = (cfg && cfg.sammle) ? (await cfg.sammle()) || [] : []; } catch (e) { ergebnisse = []; }
    ergebnisse = ergebnisse.filter(function (e) { return e && e.spieler; });
    ergebnisse.sort(function (a, b) { return (b.punkte || 0) - (a.punkte || 0); });

    if (!ergebnisse.length) {
      box().innerHTML =
        '<h3>Spiel beenden</h3>' +
        '<div class="sub">Aktueller Punktestand</div>' +
        '<div class="leer">Noch keine Punkte vorhanden. Es gibt nichts zu speichern.</div>' +
        '<div class="btns"><button id="sb-nein">Schliessen</button></div>';
      document.getElementById('sb-nein').onclick = schliessen;
      ov().classList.add('an');
      return;
    }

    var top = ergebnisse.slice(0, 3);
    var rest = ergebnisse.slice(3);

    // Podest-Reihenfolge: 2 - 1 - 3
    var reihenfolge = [];
    if (top[1]) reihenfolge.push({ e: top[1], platz: 2 });
    if (top[0]) reihenfolge.push({ e: top[0], platz: 1 });
    if (top[2]) reihenfolge.push({ e: top[2], platz: 3 });

    var podest = '<div class="sb-podest">' + reihenfolge.map(function (x) {
      var krone = x.platz === 1 ? '<span class="krone">👑</span>' : '';
      return '<div class="sb-col p' + x.platz + ' rein">' +
        '<div class="av-wrap">' + krone + avatarEl(x.e.spieler, 'av', 'av-fb') + '</div>' +
        '<div class="nm">' + x.e.spieler + '</div>' +
        '<div class="pts">' + Math.round(x.e.punkte || 0) + '</div>' +
        '<div class="sockel">' + x.platz + '</div>' +
      '</div>';
    }).join('') + '</div>';

    var restHtml = '';
    if (rest.length) {
      restHtml = '<div id="sb-liste">' + rest.map(function (e, i) {
        return '<div class="row"><div class="pl"><span class="rank">' + (i + 4) + '</span>' +
          avatarEl(e.spieler, 'mini', 'mini-fb') +
          '<span class="nm">' + e.spieler + '</span></div>' +
          '<span class="pts">' + Math.round(e.punkte || 0) + '</span></div>';
      }).join('') + '</div>';
    }

    box().innerHTML =
      '<h3>Endstand</h3>' +
      '<div class="sub">Diese Punkte kommen in die Bestenliste</div>' +
      podest +
      restHtml +
      '<div class="btns">' +
        '<button id="sb-nein">Abbrechen</button>' +
        '<button id="sb-ja">Speichern &amp; beenden</button>' +
      '</div>';
    document.getElementById('sb-nein').onclick = schliessen;
    document.getElementById('sb-ja').onclick = function () { speichern(ergebnisse); };
    ov().classList.add('an');
    konfetti();
  }

  async function speichern(ergebnisse) {
    var jaBtn = document.getElementById('sb-ja');
    if (jaBtn) { jaBtn.textContent = 'Speichere…'; jaBtn.disabled = true; }

    var res = { ok: false };
    try {
      if (typeof speichereErgebnisse === 'function') {
        res = await speichereErgebnisse(cfg.format, ergebnisse);
      }
    } catch (e) { res = { ok: false, grund: e.message }; }

    entferneKonfetti();

    if (res && res.ok) {
      box().innerHTML =
        '<div class="fertig"><div class="gross">Gespeichert!</div>' +
        '<div class="sub">' + res.anzahl + ' Spieler in die Bestenliste eingetragen.</div></div>' +
        '<div class="btns"><button id="sb-ja">Fertig</button></div>';
      document.getElementById('sb-ja').onclick = function () {
        schliessen();
        if (cfg && typeof cfg.nachSpeichern === 'function') { try { cfg.nachSpeichern(); } catch (e) {} }
      };
    } else {
      box().innerHTML =
        '<h3>Fehler</h3>' +
        '<div class="sub">Konnte nicht speichern: ' + ((res && res.grund) || 'unbekannt') + '</div>' +
        '<div class="btns"><button id="sb-nein">Schliessen</button></div>';
      document.getElementById('sb-nein').onclick = schliessen;
    }
  }

  window.SpielBeenden = {
    init: function (config) {
      cfg = config || {};
      if (document.body) baueButton();
      else document.addEventListener('DOMContentLoaded', baueButton);
    }
  };
})();
