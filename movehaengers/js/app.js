
let currentUser = '';

document.addEventListener('DOMContentLoaded', async () => {
  applySettings(Store.getSettings());

  const savedUser = Store.getUser();
  if (savedUser && await Store.hasSession()) {
    currentUser = savedUser;
    showApp();
  }

  bindUI();
  setInterval(() => { if (currentUser) renderAll(); }, 30000);
});

function bindUI() {
  document.getElementById('login-btn').addEventListener('click', doLogin);
  document.getElementById('login-input').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
  document.getElementById('password-input').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

  document.getElementById('open-settings').addEventListener('click', () => openModal('modal-settings'));
  document.getElementById('change-user-btn').addEventListener('click', () => {
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
    document.getElementById('login-input').value = '';
    setTimeout(() => document.getElementById('login-input').focus(), 100);
  });

  document.getElementById('qa-event').addEventListener('click', () => openModal('modal-event'));
  document.getElementById('qa-poll').addEventListener('click', () => openModal('modal-poll'));
  document.getElementById('qa-game').addEventListener('click', () => openModal('modal-game'));
  document.getElementById('qa-discord').addEventListener('click', pingDiscordAll);

  document.querySelectorAll('.modal-close, .btn-cancel').forEach(btn => {
    btn.addEventListener('click', () => { if (btn.dataset.modal) closeModal(btn.dataset.modal); });
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay.id); });
  });

  document.getElementById('save-event').addEventListener('click', saveEvent);
  document.getElementById('save-poll').addEventListener('click', savePoll);
  document.getElementById('save-game').addEventListener('click', saveGame);
  document.getElementById('save-settings').addEventListener('click', saveSettings);

  document.getElementById('add-poll-option').addEventListener('click', () => {
    const container = document.getElementById('poll-options-container');
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'poll-option-input';
    inp.placeholder = `Option ${container.children.length + 1}...`;
    container.appendChild(inp);
  });

  document.getElementById('color-primary').addEventListener('input', e => {
    document.documentElement.style.setProperty('--primary', e.target.value);
    ParticleSystem.setColor(e.target.value);
  });
  document.getElementById('color-secondary').addEventListener('input', e => {
    document.documentElement.style.setProperty('--secondary', e.target.value);
  });
  document.querySelectorAll('.bg-preset').forEach(btn => {
    btn.addEventListener('click', () => applyBg(btn.dataset.bg));
  });
  document.getElementById('fx-particles').addEventListener('change', e => ParticleSystem.setEnabled(e.target.checked));
  document.getElementById('fx-glow').addEventListener('change', e => {
    document.body.classList.toggle('no-glow', !e.target.checked);
  });
}

async function doLogin() {
  const name = document.getElementById('login-input').value.trim();
  const pw = document.getElementById('password-input').value;
  if (!name || name.length < 2) { showToast('Min. 2 Zeichen!', 'error'); return; }
  const btn = document.getElementById('login-btn');
  btn.disabled = true; btn.textContent = 'PRÜFE...';
  const ok = await Store.login(pw);
  btn.disabled = false; btn.textContent = 'LOG IN';
  if (!ok) { showToast('Falsches Passwort!', 'error'); document.getElementById('password-input').value = ''; return; }
  currentUser = name;
  Store.setUser(name);
  showApp();
}

function showApp() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('nav-username-display').textContent = currentUser;
  document.getElementById('hero-greet').textContent = 'WILLKOMMEN,';
  document.getElementById('hero-name').textContent = currentUser.toUpperCase();
  const h = new Date().getHours();
  document.getElementById('hero-sub').textContent =
    h < 6 ? 'Nachtschicht? Los geht\'s' :
    h < 12 ? 'Morgen-Session?' :
    h < 18 ? 'Nachmittags-Runde?' : 'Abend-Session?';

  Store.heartbeat(currentUser);
  setInterval(() => Store.heartbeat(currentUser), 60000);
  window.addEventListener('beforeunload', () => Store.goOffline(currentUser));

  renderAll();
  loadSettingsForm();
}

async function renderAll() {
  await Promise.all([renderEvents(), renderPolls(), renderGames()]);
  updateStats();
}

async function saveEvent() {
  const title = document.getElementById('event-title').value.trim();
  const dt = document.getElementById('event-datetime').value;
  const game = document.getElementById('event-game').value.trim();
  const desc = document.getElementById('event-desc').value.trim();
  const maxPlayers = parseInt(document.getElementById('event-maxplayers').value) || 5;
  if (!title || !dt) { showToast('Titel & Datum nötig!', 'error'); return; }
  try {
    await Store.addEvent({ title, datetime: new Date(dt).toISOString(), game, desc, maxPlayers, creator: currentUser });
    closeModal('modal-event');
    clearModal('modal-event');
    await renderEvents();
    updateStats();
    showToast('Session erstellt!');
    sendDiscordNotification(`**Neue Gaming-Session!**\n**${title}**\nvon **${currentUser}**\nSpiel: ${game || 'TBD'}\nWann: ${formatDateTime(dt)}\nMax. Spieler: ${maxPlayers}`);
  } catch(e) { showToast('Fehler: ' + e.message, 'error'); }
}

async function renderEvents() {
  const list = document.getElementById('events-list');
  try {
    const events = await Store.getEvents();
    document.getElementById('badge-events').textContent = events.length;
    if (!events.length) { list.innerHTML = '<div class="empty-state"></div>'; return; }
    list.innerHTML = events.map(ev => {
      const rsvps = ev.rsvps || {};
      const yes = Object.entries(rsvps).filter(([,v]) => v === 'yes').map(([k]) => k);
      const no = Object.entries(rsvps).filter(([,v]) => v === 'no').map(([k]) => k);
      const maybe = Object.entries(rsvps).filter(([,v]) => v === 'maybe').map(([k]) => k);
      const myRsvp = rsvps[currentUser];
      return `<div class="event-card">
        <div class="card-title">${escHtml(ev.title)}</div>
        <div class="card-meta">
          <span>${formatDateTime(ev.datetime)}</span>
          ${ev.game ? `<span>${escHtml(ev.game)}</span>` : ''}
          <span>Max. ${ev.max_players}</span>
        </div>
        ${ev.description ? `<div class="card-desc">${escHtml(ev.description)}</div>` : ''}
        <div class="rsvp-area">
          <div class="rsvp-btns">
            <button class="rsvp-btn yes ${myRsvp === 'yes' ? 'active' : ''}" onclick="rsvp(${ev.id},'yes')">Dabei (${yes.length})</button>
            <button class="rsvp-btn maybe ${myRsvp === 'maybe' ? 'active' : ''}" onclick="rsvp(${ev.id},'maybe')">Vielleicht (${maybe.length})</button>
            <button class="rsvp-btn no ${myRsvp === 'no' ? 'active' : ''}" onclick="rsvp(${ev.id},'no')">Raus (${no.length})</button>
          </div>
          ${yes.length ? `<div class="rsvp-count">${yes.join(', ')}</div>` : ''}
        </div>
        <div class="card-footer">
          <div class="card-author">von <span>${escHtml(ev.creator)}</span></div>
          ${ev.creator === currentUser ? `<button class="card-delete" onclick="deleteEvent(${ev.id})">Löschen</button>` : ''}
        </div>
      </div>`;
    }).join('');
  } catch(e) { list.innerHTML = '<div class="empty-state"></div>'; }
}

async function rsvp(eventId, status) {
  await Store.rsvpEvent(eventId, currentUser, status);
  await renderEvents();
}

async function deleteEvent(id) {
  if (!confirm('Session löschen?')) return;
  await Store.deleteEvent(id);
  await renderEvents();
  updateStats();
}

async function savePoll() {
  const question = document.getElementById('poll-question').value.trim();
  const opts = [...document.querySelectorAll('.poll-option-input')].map(i => i.value.trim()).filter(Boolean);
  if (!question) { showToast('Frage eingeben!', 'error'); return; }
  if (opts.length < 2) { showToast('Min. 2 Optionen!', 'error'); return; }
  try {
    await Store.addPoll({ question, options: opts, creator: currentUser });
    closeModal('modal-poll');
    clearModal('modal-poll');
    await renderPolls();
    updateStats();
    showToast('Umfrage gestartet!');
    sendDiscordNotification(`**Neue Umfrage von ${currentUser}!**\n**${question}**\n${opts.map((o,i) => `${i+1}. ${o}`).join('\n')}`);
  } catch(e) { showToast('Fehler: ' + e.message, 'error'); }
}

async function renderPolls() {
  const list = document.getElementById('polls-list');
  try {
    const polls = await Store.getPolls();
    document.getElementById('badge-polls').textContent = polls.length;
    if (!polls.length) { list.innerHTML = '<div class="empty-state"></div>'; return; }
    list.innerHTML = polls.map(poll => {
      const voteValues = Object.values(poll.votes || {}).filter(v => v && typeof v === 'object');
      const total = voteValues.length;
      const myVote = Store.getUserVoteForPoll(poll, currentUser);
      const optionsHtml = (poll.options || []).map((opt, i) => {
        const count = voteValues.filter(v => v.optionIndex === i).length;
        const pct = total ? Math.round(count / total * 100) : 0;
        return `<div class="poll-option">
          <div class="poll-option-label"><span>${escHtml(opt)}</span><span>${count} (${pct}%)</span></div>
          <div class="poll-bar-bg"><div class="poll-bar-fill" style="width:${pct}%"></div></div>
          <button class="poll-vote-btn ${myVote === i ? 'voted' : ''}" onclick="votePoll(${poll.id},${i})">
            ${myVote === i ? 'Meine Stimme' : 'Abstimmen'}
          </button>
        </div>`;
      }).join('');
      return `<div class="poll-card">
        <div class="card-title">${escHtml(poll.question)}</div>
        <div class="card-meta"><span>${total} Stimmen</span></div>
        ${optionsHtml}
        <div class="card-footer">
          <div class="card-author">von <span>${escHtml(poll.creator)}</span></div>
          ${poll.creator === currentUser ? `<button class="card-delete" onclick="deletePoll(${poll.id})">Löschen</button>` : ''}
        </div>
      </div>`;
    }).join('');
  } catch(e) { list.innerHTML = '<div class="empty-state"></div>'; }
}

async function votePoll(pollId, optionIndex) {
  await Store.votePoll(pollId, optionIndex, currentUser);
  await renderPolls();
}

async function deletePoll(id) {
  if (!confirm('Umfrage löschen?')) return;
  await Store.deletePoll(id);
  await renderPolls();
  updateStats();
}

async function saveGame() {
  const name = document.getElementById('game-name').value.trim();
  if (!name) { showToast('Spielname eingeben!', 'error'); return; }
  try {
    await Store.addGame({
      name,
      genre: document.getElementById('game-genre').value,
      players: document.getElementById('game-players').value.trim(),
      comment: document.getElementById('game-comment').value.trim(),
      creator: currentUser
    });
    closeModal('modal-game');
    clearModal('modal-game');
    await renderGames();
    updateStats();
    showToast('Spiel vorgeschlagen!');
  } catch(e) { showToast('Fehler: ' + e.message, 'error'); }
}

async function renderGames() {
  const list = document.getElementById('games-list');
  try {
    const games = await Store.getGames();
    const sorted = [...games].sort((a,b) => (b.votes||[]).length - (a.votes||[]).length);
    document.getElementById('badge-games').textContent = games.length;
    if (!games.length) { list.innerHTML = '<div class="empty-state"></div>'; return; }
    list.innerHTML = sorted.map(game => {
      const votes = game.votes || [];
      const hasVoted = votes.includes(currentUser);
      return `<div class="game-card">
        <div class="genre-badge">${escHtml(game.genre || '')}</div>
        <div class="card-title">${escHtml(game.name)}</div>
        ${game.players ? `<div class="card-meta"><span>${escHtml(game.players)}</span></div>` : ''}
        ${game.comment ? `<div class="card-desc">${escHtml(game.comment)}</div>` : ''}
        <div class="game-votes">
          <button class="game-vote-btn ${hasVoted ? 'voted' : ''}" onclick="voteGame(${game.id})">
            ${hasVoted ? 'Gewollt' : 'Will ich'}
          </button>
          <span class="game-vote-count">${votes.length}</span>
        </div>
        <div class="card-footer">
          <div class="card-author">von <span>${escHtml(game.creator)}</span></div>
          ${game.creator === currentUser ? `<button class="card-delete" onclick="deleteGame(${game.id})">Löschen</button>` : ''}
        </div>
      </div>`;
    }).join('');
  } catch(e) { list.innerHTML = '<div class="empty-state"></div>'; }
}

async function voteGame(gameId) {
  await Store.voteGame(gameId, currentUser);
  await renderGames();
}

async function deleteGame(id) {
  if (!confirm('Spiel löschen?')) return;
  await Store.deleteGame(id);
  await renderGames();
  updateStats();
}

async function updateStats() {
  try {
    const [events, polls, online] = await Promise.all([Store.getEvents(), Store.getPolls(), Store.getOnlineUsers()]);
    document.getElementById('count-events').textContent = events.length;
    document.getElementById('count-polls').textContent = polls.length;
    document.getElementById('count-online').textContent = online.length;
  } catch {}
}

function loadSettingsForm() {
  const s = Store.getSettings();
  document.getElementById('color-primary').value = s.primaryColor || '#6366f1';
  document.getElementById('color-secondary').value = s.secondaryColor || '#f472b6';
  document.getElementById('fx-particles').checked = s.fxParticles !== false;
  document.getElementById('fx-glow').checked = s.fxGlow !== false;
  document.querySelectorAll('.bg-preset').forEach(btn => btn.classList.toggle('active', btn.dataset.bg === s.bg));
}

function saveSettings() {
  const s = {
    bg: document.querySelector('.bg-preset.active')?.dataset.bg || 'aurora',
    primaryColor: document.getElementById('color-primary').value,
    secondaryColor: document.getElementById('color-secondary').value,
    fxParticles: document.getElementById('fx-particles').checked,
    fxGlow: document.getElementById('fx-glow').checked
  };
  Store.saveSettings(s);
  applySettings(s);
  closeModal('modal-settings');
  showToast('Settings gespeichert');
}

function applySettings(s) {
  document.documentElement.style.setProperty('--primary', s.primaryColor || '#6366f1');
  document.documentElement.style.setProperty('--secondary', s.secondaryColor || '#f472b6');
  applyBg(s.bg || 'aurora', false);
  ParticleSystem.setColor(s.primaryColor || '#818cf8');
  ParticleSystem.setEnabled(s.fxParticles !== false);
  document.body.classList.toggle('no-glow', s.fxGlow === false);
}

function applyBg(bg, updateBtn = true) {
  Backgrounds.apply(bg);
  if (updateBtn) document.querySelectorAll('.bg-preset').forEach(btn => btn.classList.toggle('active', btn.dataset.bg === bg));
}

async function sendDiscordNotification(message) {
  await Store.sendDiscord(message);
}

async function pingDiscordAll() {
  const ok = await Store.sendDiscord(`@everyone — ${currentUser} ruft alle zum Zocken! Komm auf Discord!`);
  showToast(ok ? 'Alle gepingt!' : 'Discord-Ping fehlgeschlagen', ok ? 'info' : 'error');
}

function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
  if (id === 'modal-settings') loadSettingsForm();
}
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
function clearModal(id) {
  document.getElementById(id).querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(el => el.value = '');
  if (id === 'modal-event') document.getElementById('event-maxplayers').value = '5';
  if (id === 'modal-poll') {
    document.getElementById('poll-options-container').innerHTML =
      `<input type="text" class="poll-option-input" placeholder="Option 1..." />
       <input type="text" class="poll-option-input" placeholder="Option 2..." />`;
  }
}

function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  document.getElementById('toast-container').appendChild(toast);
  setTimeout(() => { toast.style.animation = 'toast-out 0.3s ease forwards'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function formatDateTime(dtStr) {
  if (!dtStr) return '';
  try {
    return new Date(dtStr).toLocaleString('de-DE', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
  } catch { return dtStr; }
}
