// =============================================
// ХРОНИКА · Новый Орлеан — script.js
// Использует JSONBin для синхронизации между устройствами
// =============================================

const JSONBIN_ID = '69b4bf17c3097a1dd523132d';
const JSONBIN_KEY = '$2a$10$0GPaIJrOvPUYtRsyx6N7zeJ9j6zm7nNDDv8gaiAKESR6cQ8PAWZOG';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_ID}`;

let db = {
  version: 3,
  lastUpdated: new Date().toISOString(),
  mainCharacters: {},
  sideCharacters: [],
  chronicles: {},
  ideas: []
};

let currentEditingEvent = null; // для редактирования события

// ====================== ЗАГРУЗКА / СОХРАНЕНИЕ ======================
async function loadFromJsonBin() {
  try {
    const res = await fetch(JSONBIN_URL + '/latest', {
      headers: { 'X-Master-Key': JSONBIN_KEY }
    });
    const data = await res.json();
    if (data.record && data.record.version) {
      db = { ...data.record };
      console.log('✅ Данные загружены из JSONBin');
    }
  } catch (e) {
    console.warn('Не удалось загрузить данные, используем локальные', e);
  }
  renderAll();
}

async function saveToJsonBin() {
  db.lastUpdated = new Date().toISOString();
  try {
    await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_KEY
      },
      body: JSON.stringify(db)
    });
    console.log('💾 Сохранено в JSONBin');
  } catch (e) {
    console.error('Ошибка сохранения', e);
    alert('Не удалось сохранить данные в облако. Проверь интернет.');
  }
}

// Поллинг каждые 4 секунды
let pollingInterval;
function startPolling() {
  if (pollingInterval) clearInterval(pollingInterval);
  pollingInterval = setInterval(async () => {
    await loadFromJsonBin();
  }, 4000);
}

// ====================== РЕНДЕР ВСЕГО ======================
function renderAll() {
  renderIdeas();
  // Можно добавить renderSideCharacters() позже
}

// ====================== БИОГРАФИИ (пока оставляем как было) ======================
const bioData = db.mainCharacters; // ссылка на db

// (твои старые функции openBio, closeBio можно оставить почти без изменений,
// только bioData = db.mainCharacters)

// ====================== ХРОНИКА ПЕРСОНАЖА ======================
function openCharChronicle(id) {
  const isMain = db.mainCharacters[id];
  const char = isMain || db.sideCharacters.find(c => c.id === id);
  if (!char) return;

  const events = (db.chronicles[id] || []).sort((a, b) => new Date(b.date) - new Date(a.date));

  let html = `
    <div style="color:${char.color || '#C8A96E'};font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;">ХРОНИКА</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:600;color:${char.color || '#C8A96E'};margin-bottom:30px;">${char.name}</div>
    
    <button onclick="addNewEvent('${id}')" style="margin-bottom:20px;padding:8px 16px;background:var(--gold2);color:var(--bg);border:none;border-radius:4px;cursor:pointer;">+ Добавить событие</button>
    
    <div style="position:relative;padding-left:28px;border-left:2px solid var(--dim);">
  `;

  events.forEach((ev, index) => {
    const isLink = ev.link && ev.link.trim() !== '';
    html += `
      <div style="margin-bottom:28px;position:relative;">
        <div style="position:absolute;left:-10px;top:6px;width:10px;height:10px;border-radius:50%;background:${char.color || '#C8A96E'};"></div>
        <div style="font-size:10px;letter-spacing:2px;color:${char.color || '#C8A96E'};margin-bottom:6px;">${ev.date}</div>
        <div style="font-size:15px;font-weight:500;margin-bottom:6px;">
          ${isLink ? `<a href="${ev.link}" target="_blank" style="color:var(--white);text-decoration:underline;">${ev.title}</a>` : ev.title}
        </div>
        ${ev.participants && ev.participants.length ? 
          `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">${ev.participants.map(p => `<span style="font-size:10px;padding:3px 10px;background:rgba(200,169,110,0.1);border:1px solid var(--gold2);border-radius:12px;color:var(--gold);">${p}</span>`).join('')}</div>` : ''}
        ${ev.desc ? `<div style="font-size:13.5px;color:var(--muted);line-height:1.6;">${ev.desc}</div>` : ''}
        
        <div style="margin-top:10px;">
          <button onclick="editEvent('${id}', ${index})" style="font-size:11px;margin-right:8px;color:var(--gold);">✏️ Редактировать</button>
          <button onclick="deleteEvent('${id}', ${index})" style="font-size:11px;color:#EE6655;">🗑 Удалить</button>
        </div>
      </div>
    `;
  });

  html += `</div>`;

  document.getElementById('char-chronicle-content').innerHTML = html;
  document.getElementById('char-chronicle-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function addNewEvent(charId) {
  // Можно открыть форму или prompt для простоты сначала
  const date = prompt("Дата события (например 15.10.2019):");
  if (!date) return;
  const title = prompt("Название события:");
  if (!title) return;
  const link = prompt("Ссылка на игру (или оставь пустым):") || "";
  const desc = prompt("Короткое описание:");
  const participants = prompt("Участники через · (например Элио · Челси):") || "";

  if (!db.chronicles[charId]) db.chronicles[charId] = [];
  db.chronicles[charId].push({
    date, title, link, desc,
    participants: participants ? participants.split(/[·,]+/).map(s => s.trim()).filter(Boolean) : []
  });

  saveToJsonBin();
  openCharChronicle(charId); // переоткрываем
}

function editEvent(charId, index) {
  // Для начала можно сделать через prompt, позже — красивую форму
  const events = db.chronicles[charId];
  const ev = events[index];
  const newTitle = prompt("Новое название:", ev.title);
  if (newTitle === null) return;
  ev.title = newTitle;
  ev.link = prompt("Ссылка:", ev.link || "") || "";
  ev.desc = prompt("Описание:", ev.desc || "");
  saveToJsonBin();
  openCharChronicle(charId);
}

function deleteEvent(charId, index) {
  if (!confirm("Удалить это событие?")) return;
  db.chronicles[charId].splice(index, 1);
  saveToJsonBin();
  openCharChronicle(charId);
}

// ====================== ИДЕИ ======================
function renderIdeas() {
  const wrap = document.getElementById('ideas-spoilers');
  // Удаляем только динамические
  wrap.querySelectorAll('.dynamic-idea').forEach(el => el.remove());

  db.ideas.forEach((idea, i) => {
    const div = document.createElement('div');
    div.className = 'spoiler-item dynamic-idea';
    div.innerHTML = `
      <div class="spoiler-header" onclick="toggleSpoiler(this)">
        <span>${idea.title || 'Идея без названия'} — ${idea.participants || ''}</span>
        <span class="spoiler-arrow">▼</span>
      </div>
      <div class="spoiler-body">
        <div class="spoiler-chars">Участники: ${idea.participants || ''}</div>
        <div class="spoiler-text">${idea.plot || ''}</div>
        <div style="margin-top:12px;">
          <button onclick="editIdea(${i});event.stopImmediatePropagation()" style="margin-right:8px;font-size:11px;">✏️ Редактировать</button>
          <button onclick="deleteIdea(${i});event.stopImmediatePropagation()" style="color:#EE6655;font-size:11px;">🗑 Удалить</button>
        </div>
      </div>
    `;
    wrap.appendChild(div);
  });
}

function editIdea(index) {
  const idea = db.ideas[index];
  const newTitle = prompt("Заголовок:", idea.title);
  if (newTitle === null) return;
  idea.title = newTitle;
  idea.participants = prompt("Участники:", idea.participants) || "";
  idea.plot = prompt("Сюжет:", idea.plot) || "";
  saveToJsonBin();
  renderIdeas();
}

function deleteIdea(index) {
  if (!confirm("Удалить идею?")) return;
  db.ideas.splice(index, 1);
  saveToJsonBin();
  renderIdeas();
}

// ====================== СТАРТ ======================
document.addEventListener('DOMContentLoaded', async () => {
  await loadFromJsonBin();
  startPolling();

  // Кнопка админ (добавь её в HTML)
  const adminBtn = document.getElementById('admin-btn');
  if (adminBtn) adminBtn.addEventListener('click', () => {
    alert('Админ-панель в разработке.\nПока редактирование доступно внутри модалок хроники и идей.');
  });

  // Сохраняем старые функции добавления (они теперь сохраняют в db)
  window.submitChronicle = submitChronicle; // можешь адаптировать под новую структуру
  window.submitIdea = submitIdea;
});

// Не забудь адаптировать старые функции submitChronicle и submitIdea под db.chronicles и db.ideas

console.log('%cХроника · Новый Орлеан — новый скрипт загружен', 'color:#C8A96E;font-size:13px;');
