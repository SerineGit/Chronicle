// ─────────────────────────────────────────
// GIST CONFIG
// ─────────────────────────────────────────
const GIST_ID    = 'c33bff3357d1eb0633e00d7c30f5eb92';
const GIST_FILE  = 'chronicle_db.json';
const GIST_URL   = 'https://api.github.com/gists/' + GIST_ID;
function getToken() { return localStorage.getItem('gist_token') || ''; }
function setToken(t) { localStorage.setItem('gist_token', t); console.log('Токен сохранён'); }
// ─────────────────────────────────────────
// INJECT ADMIN STYLES
// ─────────────────────────────────────────
(function injectStyles() {
  const s = document.createElement('style');
  s.textContent = `
    .edit-overlay-btn {
      position:absolute; top:10px; right:10px; z-index:20;
      width:30px; height:30px; border-radius:50%;
      background:rgba(200,169,110,0.15); border:1px solid #9A7A45;
      color:#C8A96E; font-size:13px; cursor:pointer;
      display:none; align-items:center; justify-content:center;
      transition:all .2s;
    }
    .edit-overlay-btn:hover { background:rgba(200,169,110,0.3); }
    .admin-mode .char-card .edit-overlay-btn,
    .admin-mode .side-block .edit-overlay-btn { display:flex; }

    .delete-overlay-btn {
      position:absolute; top:10px; left:10px; z-index:20;
      width:30px; height:30px; border-radius:50%;
      background:rgba(238,102,85,0.15); border:1px solid rgba(238,102,85,0.4);
      color:#EE6655; font-size:13px; cursor:pointer;
      display:none; align-items:center; justify-content:center;
      transition:all .2s;
    }
    .delete-overlay-btn:hover { background:rgba(238,102,85,0.3); }
    .admin-mode .char-card .delete-overlay-btn,
    .admin-mode .side-block .delete-overlay-btn { display:flex; }

    .side-block { position:relative; }
    .side-block .edit-overlay-btn { top:-8px; right:-8px; width:22px; height:22px; font-size:10px; }
    .side-block .delete-overlay-btn { top:-8px; left:-8px; width:22px; height:22px; font-size:10px; }

    .admin-badge {
      position:fixed; bottom:24px; right:24px; z-index:9999;
      background:#C8A96E; color:#0B0B15; padding:8px 16px;
      border-radius:20px; font-size:11px; font-weight:600;
      letter-spacing:2px; text-transform:uppercase;
      box-shadow:0 4px 20px rgba(200,169,110,0.4);
      cursor:pointer; transition:all .2s;
    }
    .admin-badge:hover { background:#E0C07E; }
    .admin-badge.off { background:var(--dim); color:var(--muted); box-shadow:none; }

    .ev-item { margin-bottom:18px; position:relative; padding-bottom:14px; border-bottom:1px solid var(--dim); }
    .ev-item:last-child { border-bottom:none; }
    .ev-actions { display:none; gap:6px; margin-top:8px; flex-wrap:wrap; }
    .admin-mode .ev-actions { display:flex; }
    .ev-btn {
      font-size:10px; letter-spacing:1px; padding:4px 10px;
      border-radius:3px; border:1px solid var(--dim);
      background:transparent; color:var(--muted); cursor:pointer;
      font-family:'Jost',sans-serif; transition:all .2s;
    }
    .ev-btn:hover { color:var(--white); border-color:var(--gold2); }
    .ev-btn.danger:hover { color:#EE6655; border-color:#EE6655; }

    .add-char-card {
      background:var(--bg2); border:1px dashed var(--dim);
      cursor:pointer; transition:all .3s; position:relative;
      aspect-ratio:3/4; display:none;
      flex-direction:column; align-items:center; justify-content:center; gap:12px;
    }
    .admin-mode .add-char-card { display:flex; }
    .add-char-card:hover { border-color:var(--gold2); background:var(--bg3); }
    .add-char-card-icon {
      width:50px; height:50px; border-radius:50%;
      border:1px solid var(--gold2); display:flex;
      align-items:center; justify-content:center;
      color:var(--gold); font-size:24px;
    }
    .add-char-card-label { font-size:10px; letter-spacing:3px; color:var(--muted); text-transform:uppercase; }

    .side-add-btn { cursor:pointer; transition:all .2s; display:none; }
    .admin-mode .side-add-btn { display:flex; }

    .modal-edit-btn {
      position:absolute; top:16px; right:60px;
      width:32px; height:32px; border-radius:50%;
      background:rgba(200,169,110,0.1); border:1px solid var(--dim);
      color:var(--gold2); font-size:14px; cursor:pointer;
      align-items:center; justify-content:center;
      transition:all .2s; z-index:3; display:none;
    }
    .modal-edit-btn:hover { color:var(--gold); border-color:var(--gold2); background:rgba(200,169,110,0.2); }
    .admin-mode .bio-modal-panel .modal-edit-btn { display:flex; }

    .chron-add-btn {
      display:none; margin-top:16px;
      padding:8px 16px; background:transparent;
      border:1px dashed var(--dim); border-radius:3px;
      color:var(--muted); font-size:11px; letter-spacing:2px;
      text-transform:uppercase; cursor:pointer; width:100%;
      font-family:'Jost',sans-serif; transition:all .2s;
    }
    .chron-add-btn:hover { border-color:var(--gold2); color:var(--gold); }
    .admin-mode .chron-add-btn { display:block; }

    .idea-item-actions { display:none; gap:6px; }
    .admin-mode .idea-item-actions { display:inline-flex; }

    .form-panel-wide {
      position:relative; z-index:1; width:100%; max-width:680px;
      background:var(--bg2); border:1px solid var(--dim); border-radius:4px;
      padding:40px; max-height:88vh; overflow-y:auto;
      animation:slideUp .3s cubic-bezier(.16,1,.3,1);
    }
    .conn-row { display:flex; gap:8px; margin-bottom:8px; align-items:center; }
    .conn-row .form-input { flex:1; }
    .row-del-btn {
      background:transparent; border:none; color:var(--muted);
      cursor:pointer; font-size:16px; padding:0 4px; line-height:1;
      transition:color .2s; flex-shrink:0;
    }
    .row-del-btn:hover { color:#EE6655; }
    .bio-para-wrap { margin-bottom:8px; }
  `;
  document.head.appendChild(s);
})();

// ─────────────────────────────────────────
// SAVE STATUS
// ─────────────────────────────────────────
function showSaveStatus(state) {
  let el = document.getElementById('save-status');
  if (!el) {
    el = document.createElement('div');
    el.id = 'save-status';
    Object.assign(el.style, {
      position: 'fixed', bottom: '24px', left: '24px',
      fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
      padding: '6px 14px', borderRadius: '20px', zIndex: '9999',
      transition: 'opacity 0.4s', fontFamily: 'Jost, sans-serif'
    });
    document.body.appendChild(el);
  }
  const states = {
    saving: { text: '⟳ Сохранение…', bg: '#1A1A35', color: '#C8A96E' },
    ok:     { text: '✓ Сохранено',   bg: '#0F2A1A', color: '#7AE0AB' },
    local:  { text: '⚠ Только локально', bg: '#2A1A0F', color: '#E0AB7A' },
  };
  const s = states[state] || states.ok;
  el.textContent = s.text;
  el.style.background = s.bg;
  el.style.color = s.color;
  el.style.opacity = '1';
  if (state !== 'saving') {
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.style.opacity = '0'; }, 2500);
  }
}

// ─────────────────────────────────────────
// DEFAULT DATA
// ─────────────────────────────────────────
const DEFAULT_MAIN_CHARS = [
  {
    id:'elio', type:'main', color:'#7AB3E0',
    name:'Элио Лаксфорд', fullName:'Элио Аурелион Лаксфорд',
    role:'Владелец LUX · Посредник · ~44', fullRole:'Владелец LUX · Посредник IOU · ~44 года',
    initial:'Э',
    stats:[['Настоящее имя','Самаэль Дон'],['Происхождение','Религиозная община'],['Деятельность','Клуб LUX (НО + ЛА), IOU-посредник'],['Статус (2019)','В отношениях с Челси (с 15.10)'],['Терапевт','Linda Martin'],['Год рождения','~1975']],
    bio:['Родился в изолированной религиозной общине под именем Самаэль Дон. Отец — Годфри, жёсткий харизматичный лидер. Мать — Шарлотта, единственное тепло в его жизни. В 17 лет после жестокого «очищения» в подвале мать открывает дверь и шепчет «Беги». Он уходит без имени и будущего.','Добирается до Лос-Анджелеса. Работает посудомойщиком, ночью играет на рояле в пустом ресторане. Хозяин Томи слышит. Рукоплещет. Самаэль умирает — рождается Элио Аурелион Лаксфорд. Томи берёт его под крыло: криминальные связи, обучение, новая жизнь.','В 2002-м родной брат находит его — приехал «продолжить волю отца». Элио вынужден действовать. Брат погибает. Переезд в Новый Орлеан. С тех пор один и тот же сон снова и снова.'],
    secret:'Убил родного брата в ~2002 (самозащита). Тело захоронено в парке, под деревом. Переезд в Новый Орлеан — побег от следов крови. Это знает только он.',
    connections:[{target:'chelsea',label:'Влюблённость / партнёрство'},{target:'linda',label:'Терапевт'},{target:'day',label:'Деловой партнёр'},{target:'bert',label:'Рекламный контракт'}],
    events:[
      {id:'e1',date:'~1992',title:'Побег из общины',participants:[],link:'',desc:'Мать открывает дверь подвала: «Беги».'},
      {id:'e2',date:'~1993',title:'Рождение Элио за роялем',participants:['Элио'],link:'',desc:'Томи слышит игру, берёт под крыло.'},
      {id:'e3',date:'~2002',title:'Убийство брата. Переезд.',participants:['Элио'],link:'',desc:'Самозащита. Новый Орлеан.'},
      {id:'e4',date:'13.05.2013',title:'IOU: кузен Алистера Янга',participants:['Элио'],link:'',desc:'Помогает вытащить из тюрьмы.'},
      {id:'e5',date:'~20.05.2019',title:'Знакомство с Дэй Бэнкс',participants:['Элио','Дэй'],link:'ССЫЛКА_НА_ИГРУ',desc:'Деловое партнёрство. Зарождение редкой дружбы.'},
      {id:'e6',date:'05.07.2019',title:'Знакомство с Линдой Мартин',participants:['Элио','Линда'],link:'ССЫЛКА_НА_ИГРУ',desc:'Благотворительный вечер. Начало терапии.'},
      {id:'e7',date:'29.07.2019',title:'★ Первое знакомство с Челси',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Съёмочная площадка. Кофе. Разговор затягивается.'},
      {id:'e8',date:'01.08.2019',title:'LUX. Пианино.',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Приглашает Челси в клуб. Редкий момент настоящего.'},
      {id:'e9',date:'~07.08.2019',title:'Скандал в сети. Элио всё портит.',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Фото в сети с подписью про роль. Эмоциональный разговор.'},
      {id:'e10',date:'28.08.2019',title:'⚡ Убийство бывшего Челси',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Всё изменилось.'},
      {id:'e11',date:'07.09.2019',title:'Романтический тур в ЛА',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Что-то идёт не так. Пауза.'},
      {id:'e12',date:'10.09.2019',title:'Терапия: почему Челси не ушла',participants:['Элио','Линда'],link:'ССЫЛКА_НА_ИГРУ',desc:'Сессия с Линдой после ЛА-тура.'},
      {id:'e13',date:'29.09.2019',title:'Рекламный контракт с Бертом',participants:['Элио','Берт'],link:'ССЫЛКА_НА_ИГРУ',desc:'Договор на рекламную кампанию LUX.'},
      {id:'e14',date:'15.10.2019',title:'Ужин-ревность. Ресторан.',participants:['Элио','Челси','Дэй','Берт'],link:'ССЫЛКА_НА_ИГРУ',desc:'Элио с Дэй, Челси с Бертом — в одном ресторане.'},
      {id:'e15',date:'15.10.2019',title:'★ Откровенный разговор. Официально вместе.',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Детство. Первая близость. Официально — вместе.'},
      {id:'e16',date:'20.10.2019',title:'Котёнок и ревность',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Первые будни вместе.'},
      {id:'e17',date:'21.10.2019',title:'Бонус Берту. Знакомство с Милди.',participants:['Элио','Берт','Милди'],link:'ССЫЛКА_НА_ИГРУ',desc:'Квартира Берта и Милдред.'},
    ]
  },
  {
    id:'chelsea', type:'main', color:'#E07AB3',
    name:'Челси Хилл', fullName:'Челси Хилл',
    role:'Актриса · Педагог · 25', fullRole:'Актриса театра · Педагог · 25 лет',
    initial:'Ч',
    stats:[['Дата рождения','24 июля 1994'],['Образование','Актёрский факультет, Луизиана'],['Деятельность','Театр + кружок театрального мастерства'],['Статус (2019)','В отношениях с Элио (с 15.10)'],['Терапевт','Linda Martin']],
    bio:['Родилась в Луизиане. Родители много работали — детство в самостоятельности и тихом одиночестве. В 10 лет готовит ужин для родителей, они не приходят. Рано учится быть взрослой.','Поступает на актёрский. На спектакле знакомится с мужчиной старше и успешнее. Отношения быстро становятся деструктивными. Берёт академический перерыв, обрывает все контакты, возвращается домой и собирает себя с нуля.','В 23 года помогает отцу с документами и случайно находит фото его внебрачного сына. Отец всё объясняет. Образ отца трескается. Даёт слово молчать. Находит брата в соцсетях — следит издалека. Никогда не выходит на контакт.'],
    secret:'У неё есть внебрачный брат, которого она никогда не видела. Тайна отца. Дала слово молчать — и молчит, хотя это требует усилий каждый день.',
    connections:[{target:'elio',label:'Влюблённость'},{target:'linda',label:'Терапевт'},{target:'bert',label:'Друг'},{target:'hugo',label:'Режиссёр'},{target:'piper',label:'Коллега по съёмкам'}],
    events:[
      {id:'c1',date:'24.07.1994',title:'Рождение',participants:[],link:'',desc:'Луизиана. Самостоятельное детство.'},
      {id:'c2',date:'~2012',title:'Абьюзивные отношения',participants:[],link:'',desc:'Академический перерыв. Возвращение.'},
      {id:'c3',date:'~2016',title:'Тайна о брате',participants:[],link:'',desc:'Находит фото внебрачного брата отца.'},
      {id:'c4',date:'03.04.2019',title:'Терапия у Линды',participants:['Челси','Линда'],link:'ССЫЛКА_НА_ИГРУ',desc:'Регулярная практика.'},
      {id:'c5',date:'12.07.2019',title:'Съёмки «Колонии»',participants:['Челси','Хьюго','Пайпер'],link:'ССЫЛКА_НА_ИГРУ',desc:'3-я неделя. Режиссёр Хьюго Йорк. Коллега Piper Brandewin.'},
      {id:'c6',date:'29.07.2019',title:'★ Знакомство с Элио',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Кофе. Инцидент. Разговор.'},
      {id:'c7',date:'01.08.2019',title:'LUX. Пианино.',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Вечер в клубе. Что-то начинает складываться.'},
      {id:'c8',date:'~07.08.2019',title:'Скандал в сети',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Фото с подписью — спит со спонсором ради роли.'},
      {id:'c9',date:'28.08.2019',title:'⚡ Шок',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Видит убийство своими глазами. Всё изменилось.'},
      {id:'c10',date:'07.09.2019',title:'Тур в ЛА. Пауза.',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Что-то идёт не так. Почти месяц тишины.'},
      {id:'c11',date:'15.10.2019',title:'Ужин-ревность. Ресторан.',participants:['Челси','Элио','Дэй','Берт'],link:'ССЫЛКА_НА_ИГРУ',desc:'Элио с Дэй, Челси с Бертом — в одном ресторане.'},
      {id:'c12',date:'15.10.2019',title:'★ Вместе',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Официально.'},
      {id:'c13',date:'20.10.2019',title:'Котёнок и ревность',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Первые будни.'},
    ]
  },
  {
    id:'miles', type:'main', color:'#7AE0AB',
    name:'Майлз Милошевич', fullName:'Майлз Милошевич',
    role:'Нейрохирург · 36', fullRole:'Нейрохирург · Заведующий отделением · 36 лет',
    initial:'М',
    stats:[['Дата рождения','7 января 1983'],['Семья','Виктор (гос. секретарь), дед Драган, брат Николас'],['Деятельность','Нейрохирургия, частная клиника НО'],['Статус (2019)','Фиктивный брак с Селин'],['«Услуги»','Нелегальная хирургия для нужных людей']],
    bio:['Семья с историей: дед Драган — серб первого поколения, отец Виктор — государственный секретарь штата Луизиана. Брат Николас на 3 года старше, дипломатия. Майлз рос в атмосфере ожиданий и сравнений. В какой-то момент перестал конкурировать — выбрал стратегию «неудобного».','Блестящая карьера нейрохирурга. Репутация человека, который делает то, что другие не возьмутся. Это привлекает определённых людей — и определённые обязательства.','Осенью 2017-го просыпается рядом с мёртвой женщиной. Не помнит конца вечера. Это единственное, что по-настоящему его пугает: не то, что мог это сделать, а то, что не знает.'],
    secret:'Не знает, что Селин участвовала в подставной схеме против него. Для него она — партнёр по вынужденному договору. Для неё — инструмент доступа к семье.',
    connections:[{target:'celine',label:'Фиктивный брак'}],
    events:[
      {id:'m1',date:'07.01.1983',title:'Рождение',participants:[],link:'',desc:'Семья Милошевич. Ожидания и давление.'},
      {id:'m2',date:'Осень 2017',title:'Мёртвая женщина. Шантаж.',participants:['Майлз'],link:'',desc:'Не помнит конца вечера. Начало шантажа.'},
      {id:'m3',date:'Осень 2017',title:'Фиктивный брак с Селин',participants:['Майлз','Селин'],link:'ССЫЛКА_НА_ИГРУ',desc:'Контракт. Взаимная полезность. Один дом, разные миры.'},
    ]
  },
  {
    id:'celine', type:'main', color:'#B37AE0',
    name:'Селин Деверо', fullName:'Селин Деверо-Милошевич',
    role:'Директор рехаба · Кардиналы · 33', fullRole:'Директор рехаба · Кардиналы I ранг · 33 года',
    initial:'С',
    stats:[['Дата рождения','12 ноября 1985'],['Происхождение','Французская семья, теневые связи отца'],['Деятельность','Рехаб + преподавание политологии (Брайтон)'],['Статус (2019)','Фиктивный брак с Майлзом'],['Роль в Кардиналах','Архитектор. I ранг. Отмывание, агентурная сеть.']],
    bio:['Семья Деверо переехала из Франции. Отец — стальной, с теневыми связями, хотел сына. Мать — утончённая, постепенно растворяющаяся в депрессии. В доме много света и дорогих вещей, но мало любви.','Рано поняла: любовь приходит как награда за правильность. Выращена как проект. Усвоила это — и научилась проектировать других.','Сейчас — директор реабилитационного центра, преподаёт политологию в Брайтоне. В организации Кардиналов — архитектор первого ранга: отмывание, агентурная сеть, долгосрочные схемы. Фиктивный брак с Майлзом — её инструмент доступа к его семье.'],
    secret:'Участвовала в подставной схеме против Майлза осенью 2017-го. Он не знает. Фиктивный брак — продуманный ход, не случайность.',
    connections:[{target:'miles',label:'Фиктивный брак (схема)'}],
    events:[
      {id:'s1',date:'12.11.1985',title:'Рождение',participants:[],link:'',desc:'Французская семья. Выращена как проект.'},
      {id:'s2',date:'Осень 2017',title:'Подстава Майлза',participants:['Селин'],link:'',desc:'Участвовала в схеме. Он не знает.'},
      {id:'s3',date:'Осень 2017',title:'Фиктивный брак',participants:['Селин','Майлз'],link:'ССЫЛКА_НА_ИГРУ',desc:'Инструмент доступа к семье Милошевич.'},
    ]
  }
];

const DEFAULT_SIDE_CHARS = [
  {id:'linda',type:'side',name:'Линда Мартин',initial:'Л',color:'#C8A96E',connections:[{target:'elio',label:'Пациент'},{target:'chelsea',label:'Пациентка'}],events:[{id:'l1',date:'03.04.2019',title:'Сессия с Челси',participants:['Линда','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Регулярная терапия.'},{id:'l2',date:'05.07.2019',title:'Знакомство с Элио',participants:['Линда','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Благотворительный вечер.'},{id:'l3',date:'10.09.2019',title:'Сессия с Элио',participants:['Линда','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Почему Челси не ушла.'}]},
  {id:'day',type:'side',name:'Дэй Бэнкс',initial:'Д',color:'#C8A96E',connections:[{target:'elio',label:'Деловой партнёр'}],events:[{id:'d1',date:'~20.05.2019',title:'Знакомство с Элио',participants:['Дэй','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Деловое партнёрство.'},{id:'d2',date:'15.10.2019',title:'Ужин в ресторане',participants:['Дэй','Элио','Челси','Берт'],link:'ССЫЛКА_НА_ИГРУ',desc:'Деловой ужин — невольно эпизод ревности.'}]},
  {id:'bert',type:'side',name:'Берт Милтон',initial:'Б',color:'#C8A96E',connections:[{target:'elio',label:'Рекламный контракт'},{target:'chelsea',label:'Друг'},{target:'mildi',label:'Сосед'}],events:[{id:'b1',date:'29.09.2019',title:'Рекламный контракт с LUX',participants:['Берт','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Отличная работа. Бонус от Элио.'},{id:'b2',date:'15.10.2019',title:'Ужин с Челси',participants:['Берт','Челси','Элио','Дэй'],link:'ССЫЛКА_НА_ИГРУ',desc:'Триггер ревности Элио.'},{id:'b3',date:'21.10.2019',title:'Берт дома. Бонус.',participants:['Берт','Элио','Милди'],link:'ССЫЛКА_НА_ИГРУ',desc:'Элио приносит бонус.'}]},
  {id:'hugo',type:'side',name:'Хьюго Йорк',initial:'Х',color:'#C8A96E',connections:[{target:'chelsea',label:'Режиссёр'},{target:'piper',label:'Актриса'}],events:[{id:'h1',date:'12.07.2019',title:'Режиссёр «Колонии»',participants:['Хьюго','Челси','Пайпер'],link:'ССЫЛКА_НА_ИГРУ',desc:'Работает с Челси и Piper Brandewin.'}]},
  {id:'mildi',type:'side',name:'Милдред Смит',initial:'М',color:'#C8A96E',connections:[{target:'bert',label:'Сосед'}],events:[{id:'mi1',date:'21.10.2019',title:'Знакомство с Элио',participants:['Милди','Элио','Берт'],link:'ССЫЛКА_НА_ИГРУ',desc:'Квартира Берта.'}]},
  {id:'piper',type:'side',name:'Piper Brandewin',initial:'П',color:'#C8A96E',connections:[{target:'hugo',label:'Режиссёр'},{target:'chelsea',label:'Коллега'}],events:[{id:'p1',date:'12.07.2019',title:'Съёмки «Колонии»',participants:['Пайпер','Хьюго','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Актриса на съёмках.'}]},
];

const DEFAULT_IDEAS = [
  {id:'i1',participants:'Челси · Элио',title:'Разговор на чистоту',plot:'После долгой паузы — встреча наедине. Элио наконец открывает нечто глубокое из своего прошлого. Для Челси это первый момент, когда она видит его настоящего, без маски. Игра строится на медленном снятии слоёв — ни слова об общине напрямую, только через образы, обходные пути. К финалу оба оказываются уязвимее, чем планировали.'},
  {id:'i2',participants:'Майлз · Селин',title:'Фиктивный ужин',plot:'Официальный семейный ужин с родителями Майлза. Виктор Милошевич приезжает с неожиданной проверкой. Майлз и Селин вынуждены разыгрывать счастливую пару — со всеми мелкими деталями, прикосновениями, общими историями, которых нет. Для Селин это рабочий инструмент. Для Майлза — неожиданно болезненно.'},
];

// ─────────────────────────────────────────
// STATE
// ─────────────────────────────────────────
let db = { mainChars: [], sideChars: [], ideas: [] };
let adminMode = false;
let lastSnapshot = '';
let saving = false;
let currentChronicleId = null;

// ─────────────────────────────────────────
// GIST LOAD / SAVE
// ─────────────────────────────────────────
async function loadFromBin() {
  try {
    const r = await fetch(GIST_URL, {
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    const content = j.files[GIST_FILE]?.content;
    if (!content) return false;
    const parsed = JSON.parse(content);
    if (!parsed.mainChars) return false;
    const snap = JSON.stringify(parsed);
    if (snap === lastSnapshot) return false;
    lastSnapshot = snap;
    db = parsed;
    if (!db.mainChars) db.mainChars = [];
    if (!db.sideChars) db.sideChars = [];
    if (!db.ideas)     db.ideas = [];
    return true;
  } catch(e) {
    console.warn('Gist load error:', e);
    try {
      const local = localStorage.getItem('chronicle_db');
      if (local) {
        db = JSON.parse(local);
        if (!db.mainChars) db.mainChars = [];
        if (!db.sideChars) db.sideChars = [];
        if (!db.ideas)     db.ideas = [];
        showSaveStatus('local');
        return true;
      }
    } catch(le) {}
    return false;
  }
}

async function saveToBin() {
  if (saving) return;
  saving = true;
  showSaveStatus('saving');
  const body = JSON.stringify(db, null, 2);

  try { localStorage.setItem('chronicle_db', body); } catch(e) {}

  try {
    const r = await fetch(GIST_URL, {
      method: 'PATCH',
      headers: {
        'Authorization': 'token ' + getToken(),
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: { [GIST_FILE]: { content: body } }
      })
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    lastSnapshot = body;
    showSaveStatus('ok');
  } catch(e) {
    console.warn('Gist save error:', e);
    showSaveStatus('local');
  } finally {
    saving = false;
  }
}

async function poll() {
  if (!saving) {
    const changed = await loadFromBin();
    if (changed) renderAll();
  }
  setTimeout(poll, 5000);
}

// ─────────────────────────────────────────
// ADMIN MODE
// ─────────────────────────────────────────
function toggleAdmin() {
  adminMode = !adminMode;
  document.body.classList.toggle('admin-mode', adminMode);
  const badge = document.getElementById('admin-badge');
  if (badge) {
    badge.textContent = adminMode ? '✏️  ВКЛ (нажми чтобы выйти)' : '✏️ ВЫКЛ (нажми чтобы войти)';
    badge.classList.toggle('off', !adminMode);
  }
}
document.getElementById('admin-btn').addEventListener('click', toggleAdmin);

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
function uid() { return '_' + Math.random().toString(36).substr(2,9); }
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function getAllChars() { return [...(db.mainChars||[]), ...(db.sideChars||[])]; }
function getChar(id) { return getAllChars().find(c => c.id === id); }

function buildConnectionMap() {
  const map = {};
  getAllChars().forEach(ch => {
    map[ch.id] = (ch.connections||[]).map(c => ({ target: c.target, label: c.label }));
  });
  return map;
}

// ─────────────────────────────────────────
// RENDER MAIN CHARS
// ─────────────────────────────────────────
function renderMainChars() {
  const grid = document.querySelector('.chars-grid');
  if (!grid) return;
  grid.innerHTML = '';
  (db.mainChars||[]).forEach(ch => {
    const card = document.createElement('div');
    card.className = 'char-card';
    card.style.position = 'relative';
    card.innerHTML = `
      <div class="char-card-img-wrap"><div class="char-card-img-placeholder">аватарка · ${esc(ch.name)}</div></div>
      <div class="char-card-overlay"></div>
      <div class="char-card-hint">→</div>
      <div class="char-card-bar">
        <div class="char-card-accent" style="background:${ch.color};"></div>
        <div class="char-card-name" style="color:${ch.color};">${esc(ch.name)}</div>
        <div class="char-card-role">${esc(ch.role)}</div>
      </div>
      <button class="edit-overlay-btn" title="Редактировать">✏️</button>
      <button class="delete-overlay-btn" title="Удалить">✕</button>
    `;
    card.addEventListener('click', e => {
      if (e.target.classList.contains('edit-overlay-btn') || e.target.classList.contains('delete-overlay-btn')) return;
      if (!adminMode) openBio(ch.id);
    });
    card.querySelector('.edit-overlay-btn').addEventListener('click', e => { e.stopPropagation(); openEditCharForm(ch.id); });
    card.querySelector('.delete-overlay-btn').addEventListener('click', e => { e.stopPropagation(); deleteChar(ch.id, 'main'); });
    grid.appendChild(card);
  });

  const addCard = document.createElement('div');
  addCard.className = 'add-char-card';
  addCard.innerHTML = `<div class="add-char-card-icon">+</div><div class="add-char-card-label">Добавить персонажа</div>`;
  addCard.addEventListener('click', () => openAddCharForm('main'));
  grid.appendChild(addCard);
}

// ─────────────────────────────────────────
// RENDER SIDE CHARS
// ─────────────────────────────────────────
function renderSideChars() {
  const grid = document.querySelector('.side-chars-grid');
  if (!grid) return;
  grid.innerHTML = '';
  (db.sideChars||[]).forEach(ch => {
    const div = document.createElement('div');
    div.className = 'side-block';
    div.id = 'conn-' + ch.id;
    div.innerHTML = `
      <div class="side-avatar-wrap"><div class="side-avatar-placeholder">${esc(ch.initial||ch.name[0]||'?')}</div></div>
      <div class="side-name">${esc(ch.name)}</div>
      <button class="edit-overlay-btn" title="Редактировать">✏️</button>
      <button class="delete-overlay-btn" title="Удалить">✕</button>
    `;
    div.addEventListener('mouseenter', () => showConnections(ch.id));
    div.addEventListener('mouseleave', hideConnections);
    div.addEventListener('click', e => {
      if (e.target.classList.contains('edit-overlay-btn') || e.target.classList.contains('delete-overlay-btn')) return;
      openCharChronicle(ch.id);
    });
    div.querySelector('.edit-overlay-btn').addEventListener('click', e => { e.stopPropagation(); openEditCharForm(ch.id); });
    div.querySelector('.delete-overlay-btn').addEventListener('click', e => { e.stopPropagation(); deleteChar(ch.id, 'side'); });
    grid.appendChild(div);
  });

  const addDiv = document.createElement('div');
  addDiv.className = 'side-add-btn side-block';
  addDiv.innerHTML = `
    <div class="side-avatar-wrap" style="border-color:var(--gold2);background:transparent;display:flex;align-items:center;justify-content:center;">
      <span style="color:var(--gold);font-size:18px;">+</span>
    </div>
    <div class="side-name" style="color:var(--gold2);">Добавить</div>`;
  addDiv.addEventListener('click', () => openAddCharForm('side'));
  grid.appendChild(addDiv);

  (db.mainChars||[]).forEach(ch => {
    const block = document.getElementById('conn-' + ch.id);
    if (!block) return;
    const nm = block.querySelector('.conn-name');
    const rl = block.querySelector('.conn-role');
    if (nm) nm.textContent = ch.name;
    if (rl) rl.textContent = (ch.role||'').split('·')[0].trim();
  });

  updateChronicleSelect();
}

// ─────────────────────────────────────────
// CONNECTIONS SVG
// ─────────────────────────────────────────
function getElementCenter(el) {
  const wrap = document.getElementById('connections-wrap');
  const wr = wrap.getBoundingClientRect(), r = el.getBoundingClientRect();
  return { x: r.left - wr.left + r.width/2, y: r.top - wr.top + r.height/2 };
}
function showConnections(id) {
  const svg = document.getElementById('connections-svg');
  svg.querySelectorAll('.da').forEach(e => e.remove());
  const src = document.getElementById('conn-'+id); if (!src) return;
  const wrap = document.getElementById('connections-wrap');
  svg.setAttribute('viewBox', `0 0 ${wrap.offsetWidth} ${wrap.offsetHeight}`);
  svg.style.height = wrap.offsetHeight + 'px';
  const map = buildConnectionMap();
  (map[id]||[]).forEach(conn => {
    const tgt = document.getElementById('conn-'+conn.target); if (!tgt) return;
    const s = getElementCenter(src), t = getElementCenter(tgt);
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',s.x); line.setAttribute('y1',s.y);
    line.setAttribute('x2',t.x); line.setAttribute('y2',t.y);
    line.setAttribute('stroke','#C8A96E'); line.setAttribute('stroke-width','1.5');
    line.setAttribute('stroke-dasharray','5 4'); line.setAttribute('marker-end','url(#arrow)');
    line.setAttribute('opacity','0.7'); line.classList.add('da');
    svg.appendChild(line);
    const tx = document.createElementNS('http://www.w3.org/2000/svg','text');
    tx.setAttribute('x',(s.x+t.x)/2); tx.setAttribute('y',(s.y+t.y)/2-6);
    tx.setAttribute('fill','#C8A96E'); tx.setAttribute('font-size','9');
    tx.setAttribute('text-anchor','middle'); tx.setAttribute('font-family','Jost,sans-serif');
    tx.setAttribute('opacity','0.85'); tx.classList.add('da');
    tx.textContent = conn.label; svg.appendChild(tx);
  });
}
function hideConnections() { document.getElementById('connections-svg').querySelectorAll('.da').forEach(e => e.remove()); }

// ─────────────────────────────────────────
// BIO MODAL
// ─────────────────────────────────────────
function openBio(id) {
  const ch = getChar(id); if (!ch) return;
  document.getElementById('bio-img-col').innerHTML =
    `<div class="bio-modal-img-placeholder">ФОТО · ${esc(ch.name)}<br><br><span style="font-size:10px;opacity:0.5">src: ССЫЛКА_НА_ФОТО</span></div>`;
  document.getElementById('bio-accent').style.background = ch.color;
  document.getElementById('bio-name').textContent = ch.fullName || ch.name;
  document.getElementById('bio-name').style.color = ch.color;
  document.getElementById('bio-role').textContent = ch.fullRole || ch.role;
  document.getElementById('bio-stats').innerHTML = (ch.stats||[]).map(([k,v]) =>
    `<div class="bio-stat"><div class="bio-stat-label">${esc(k)}</div><div class="bio-stat-value">${esc(v)}</div></div>`).join('');
  document.getElementById('bio-text').innerHTML = (ch.bio||[]).map(p => `<p class="bio-text">${esc(p)}</p>`).join('');
  document.getElementById('bio-secret').innerHTML = ch.secret
    ? `<div class="bio-secret"><div class="bio-secret-label">⚠ Тайна</div><div class="bio-secret-text">${esc(ch.secret)}</div></div>` : '';

  let editBtn = document.getElementById('bio-modal-edit-btn');
  if (!editBtn) {
    editBtn = document.createElement('button');
    editBtn.id = 'bio-modal-edit-btn';
    editBtn.className = 'modal-edit-btn';
    editBtn.title = 'Редактировать';
    editBtn.textContent = '✏️';
    document.querySelector('.bio-modal-panel').appendChild(editBtn);
  }
  editBtn.onclick = () => { closeBio(); openEditCharForm(id); };

  document.getElementById('bio-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeBio() { document.getElementById('bio-modal').classList.remove('open'); document.body.style.overflow = ''; }

// ─────────────────────────────────────────
// CHRONICLE MODAL
// ─────────────────────────────────────────
function openCharChronicle(id) {
  const ch = getChar(id); if (!ch) return;
  currentChronicleId = id;
  renderChronicleContent(id);
  document.getElementById('char-chronicle-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderChronicleContent(id) {
  const ch = getChar(id); if (!ch) return;
  const color = ch.color || '#C8A96E';
  const container = document.getElementById('char-chronicle-content');
  container.innerHTML = `
    <div style="color:${color};font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;">Хроника</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;color:${color};margin-bottom:24px;">${esc(ch.fullName||ch.name)}</div>
    <div id="chronicle-events-list" style="position:relative;padding-left:24px;border-left:1px solid var(--dim);"></div>
    <button class="chron-add-btn" id="chron-add-ev-btn">+ Добавить событие</button>
  `;
  document.getElementById('chron-add-ev-btn').addEventListener('click', () => openEventForm(id, null));
  renderChronicleEvents(id);
}

function renderChronicleEvents(id) {
  const ch = getChar(id); if (!ch) return;
  const color = ch.color || '#C8A96E';
  const list = document.getElementById('chronicle-events-list'); if (!list) return;
  list.innerHTML = '';
  (ch.events||[]).forEach(ev => {
    const real = ev.link && ev.link !== 'ССЫЛКА_НА_ИГРУ' && ev.link !== '';
    const ph = ev.link === 'ССЫЛКА_НА_ИГРУ';
    const div = document.createElement('div');
    div.className = 'ev-item';
    div.innerHTML = `
      <div style="position:absolute;left:-28px;top:4px;width:8px;height:8px;border-radius:50%;background:${color};opacity:0.7;"></div>
      <div style="font-size:10px;letter-spacing:2px;color:${color};margin-bottom:4px;text-transform:uppercase;">${esc(ev.date||'')}</div>
      <div style="font-size:14px;font-weight:500;color:var(--white);margin-bottom:5px;">
        ${real ? `<a href="${esc(ev.link)}" target="_blank" style="color:var(--white);text-decoration:none;border-bottom:1px solid #9A7A45;">${esc(ev.title)}</a>` : esc(ev.title)}
      </div>
      ${(ev.participants||[]).length ? `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:5px;">${(ev.participants||[]).map(p=>`<span style="font-size:10px;padding:2px 9px;border-radius:10px;background:rgba(200,169,110,0.08);border:1px solid #9A7A45;color:#C8A96E;">${esc(p)}</span>`).join('')}</div>` : ''}
      ${ev.desc ? `<div style="font-size:13px;color:var(--muted);line-height:1.6;">${esc(ev.desc)}</div>` : ''}
      ${ph ? `<div style="font-size:10px;color:#5A5A7A;margin-top:4px;font-style:italic;">[ ссылка не добавлена ]</div>` : ''}
      <div class="ev-actions">
        <button class="ev-btn">✏️ Изменить</button>
        <button class="ev-btn danger">✕ Удалить</button>
      </div>`;
    div.querySelectorAll('.ev-btn')[0].addEventListener('click', () => openEventForm(id, ev.id));
    div.querySelectorAll('.ev-btn')[1].addEventListener('click', () => deleteEvent(id, ev.id));
    list.appendChild(div);
  });
}

function closeCharChronicle() {
  document.getElementById('char-chronicle-modal').classList.remove('open');
  document.body.style.overflow = '';
  currentChronicleId = null;
}

// ─────────────────────────────────────────
// EVENT FORM
// ─────────────────────────────────────────
function getOrCreateEventModal() {
  let m = document.getElementById('event-form-modal');
  if (!m) {
    m = document.createElement('div');
    m.className = 'form-modal';
    m.id = 'event-form-modal';
    m.innerHTML = `
      <div class="modal-backdrop-shared" onclick="closeEventForm()"></div>
      <div class="form-panel" style="z-index:1;position:relative;">
        <button class="bio-modal-close" onclick="closeEventForm()">✕</button>
        <div class="form-title" id="evf-heading">Событие</div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Дата</label><input class="form-input" id="evf-date" placeholder="29.07.2019"></div>
          <div class="form-group"><label class="form-label">Название</label><input class="form-input" id="evf-title" placeholder="Название события"></div>
        </div>
        <div class="form-group"><label class="form-label">Участники (через · )</label><input class="form-input" id="evf-participants" placeholder="Элио · Челси"></div>
        <div class="form-group"><label class="form-label">Ссылка на игру</label><input class="form-input" id="evf-link" placeholder="https://…"></div>
        <div class="form-group"><label class="form-label">Описание</label><textarea class="form-textarea" id="evf-desc" style="min-height:80px;"></textarea></div>
        <div class="form-actions">
          <button class="btn-cancel" onclick="closeEventForm()">Отмена</button>
          <button class="btn-submit" id="evf-submit">Сохранить</button>
        </div>
      </div>`;
    document.body.appendChild(m);
  }
  return m;
}

function openEventForm(charId, evId) {
  const m = getOrCreateEventModal();
  const ch = getChar(charId); if (!ch) return;
  const ev = evId ? (ch.events||[]).find(e => e.id === evId) : null;
  document.getElementById('evf-heading').textContent = ev ? 'Редактировать событие' : 'Добавить событие';
  document.getElementById('evf-date').value = ev ? (ev.date||'') : '';
  document.getElementById('evf-title').value = ev ? (ev.title||'') : '';
  document.getElementById('evf-participants').value = ev ? ((ev.participants||[]).join(' · ')) : '';
  document.getElementById('evf-link').value = ev ? (ev.link||'') : '';
  document.getElementById('evf-desc').value = ev ? (ev.desc||'') : '';
  document.getElementById('evf-submit').onclick = async () => {
    const title = document.getElementById('evf-title').value.trim();
    if (!title) { alert('Введите название'); return; }
    const data = {
      id: ev ? ev.id : uid(),
      date: document.getElementById('evf-date').value.trim(),
      title,
      participants: document.getElementById('evf-participants').value.trim().split(/[·,]+/).map(s=>s.trim()).filter(Boolean),
      link: document.getElementById('evf-link').value.trim() || '',
      desc: document.getElementById('evf-desc').value.trim()
    };
    if (!ch.events) ch.events = [];
    if (ev) {
      const idx = ch.events.findIndex(e => e.id === evId);
      if (idx >= 0) ch.events[idx] = data;
    } else {
      ch.events.push(data);
    }
    await saveToBin();
    closeEventForm();
    renderChronicleEvents(charId);
  };
  m.classList.add('open');
}

function closeEventForm() {
  const m = document.getElementById('event-form-modal');
  if (m) m.classList.remove('open');
}

async function deleteEvent(charId, evId) {
  if (!confirm('Удалить событие?')) return;
  const ch = getChar(charId); if (!ch) return;
  ch.events = (ch.events||[]).filter(e => e.id !== evId);
  await saveToBin();
  renderChronicleEvents(charId);
}

// ─────────────────────────────────────────
// CHAR FORM (add / edit)
// ─────────────────────────────────────────
function getAllCharOptions(excludeId) {
  return getAllChars()
    .filter(c => c.id !== excludeId)
    .map(c => `<option value="${c.id}">${esc(c.name)}</option>`)
    .join('');
}

function getOrCreateCharModal() {
  let m = document.getElementById('char-form-modal');
  if (!m) {
    m = document.createElement('div');
    m.className = 'form-modal';
    m.id = 'char-form-modal';
    m.innerHTML = `
      <div class="modal-backdrop-shared" onclick="closeCharForm()"></div>
      <div class="form-panel-wide">
        <button class="bio-modal-close" onclick="closeCharForm()">✕</button>
        <div class="form-title" id="cf-heading">Персонаж</div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Имя (карточка)</label><input class="form-input" id="cf-name" placeholder="Челси Хилл"></div>
          <div class="form-group"><label class="form-label">Роль (карточка)</label><input class="form-input" id="cf-role" placeholder="Актриса · 25"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Полное имя (биография)</label><input class="form-input" id="cf-fullname" placeholder="Челси Хилл"></div>
          <div class="form-group"><label class="form-label">Полная роль</label><input class="form-input" id="cf-fullrole" placeholder="Актриса театра · 25 лет"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Буква-аватар</label><input class="form-input" id="cf-initial" placeholder="Ч" maxlength="2" style="width:80px;"></div>
          <div class="form-group"><label class="form-label">Цвет</label><input class="form-input" id="cf-color" type="color" style="height:44px;padding:4px;cursor:pointer;"></div>
        </div>
        <div class="form-group">
          <label class="form-label">Статы</label>
          <div id="cf-stats-list"></div>
          <button type="button" class="btn-add" style="margin-top:6px;font-size:11px;padding:7px 12px;" id="cf-add-stat">+ Строка</button>
        </div>
        <div class="form-group">
          <label class="form-label">Биография (абзацы)</label>
          <div id="cf-bio-list"></div>
          <button type="button" class="btn-add" style="margin-top:6px;font-size:11px;padding:7px 12px;" id="cf-add-bio">+ Абзац</button>
        </div>
        <div class="form-group">
          <label class="form-label">Тайна ⚠</label>
          <textarea class="form-textarea" id="cf-secret" style="min-height:70px;border-color:rgba(238,102,85,0.3);"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Связи</label>
          <div id="cf-conn-list"></div>
          <button type="button" class="btn-add" style="margin-top:6px;font-size:11px;padding:7px 12px;" id="cf-add-conn">+ Связь</button>
        </div>
        <div class="form-actions">
          <button class="btn-cancel" onclick="closeCharForm()">Отмена</button>
          <button class="btn-submit" id="cf-submit">Сохранить</button>
        </div>
      </div>`;
    document.body.appendChild(m);
    document.getElementById('cf-add-stat').onclick = () => addStatRow();
    document.getElementById('cf-add-bio').onclick  = () => addBioRow();
    document.getElementById('cf-add-conn').onclick = () => addConnRow(null, null, _currentEditId);
  }
  return m;
}

let _currentEditId = null;

function addStatRow(k, v) {
  const list = document.getElementById('cf-stats-list'); if (!list) return;
  const row = document.createElement('div');
  row.className = 'conn-row';
  row.innerHTML = `
    <input class="form-input cf-stat-key" placeholder="Параметр" value="${esc(k||'')}">
    <input class="form-input cf-stat-val" placeholder="Значение" value="${esc(v||'')}">
    <button type="button" class="row-del-btn" onclick="this.parentElement.remove()">✕</button>`;
  list.appendChild(row);
}
function addBioRow(text) {
  const list = document.getElementById('cf-bio-list'); if (!list) return;
  const row = document.createElement('div');
  row.className = 'bio-para-wrap';
  row.innerHTML = `<div style="display:flex;gap:8px;align-items:flex-start;">
    <textarea class="form-textarea cf-bio-para" style="min-height:70px;flex:1;" placeholder="Абзац…">${esc(text||'')}</textarea>
    <button type="button" class="row-del-btn" style="margin-top:12px;" onclick="this.parentElement.parentElement.remove()">✕</button>
  </div>`;
  list.appendChild(row);
}
function addConnRow(targetId, label, excludeId) {
  const list = document.getElementById('cf-conn-list'); if (!list) return;
  const row = document.createElement('div');
  row.className = 'conn-row';
  row.innerHTML = `
    <select class="form-input form-select cf-conn-target" style="flex:1;">
      <option value="">— персонаж —</option>${getAllCharOptions(excludeId)}
    </select>
    <input class="form-input cf-conn-label" placeholder="Тип связи…" style="flex:1;" value="${esc(label||'')}">
    <button type="button" class="row-del-btn" onclick="this.parentElement.remove()">✕</button>`;
  if (targetId) row.querySelector('.cf-conn-target').value = targetId;
  list.appendChild(row);
}

function fillCharForm(ch) {
  _currentEditId = ch ? ch.id : null;
  document.getElementById('cf-name').value     = ch ? (ch.name||'') : '';
  document.getElementById('cf-role').value     = ch ? (ch.role||'') : '';
  document.getElementById('cf-fullname').value = ch ? (ch.fullName||ch.name||'') : '';
  document.getElementById('cf-fullrole').value = ch ? (ch.fullRole||ch.role||'') : '';
  document.getElementById('cf-initial').value  = ch ? (ch.initial||'') : '';
  document.getElementById('cf-color').value    = ch ? (ch.color||'#C8A96E') : '#C8A96E';
  document.getElementById('cf-secret').value   = ch ? (ch.secret||'') : '';
  document.getElementById('cf-stats-list').innerHTML = '';
  document.getElementById('cf-bio-list').innerHTML   = '';
  document.getElementById('cf-conn-list').innerHTML  = '';
  if (ch) {
    (ch.stats||[]).forEach(([k,v]) => addStatRow(k,v));
    (ch.bio||[]).forEach(p => addBioRow(p));
    (ch.connections||[]).forEach(c => addConnRow(c.target, c.label, ch.id));
  }
}

function openEditCharForm(id) {
  const ch = getChar(id); if (!ch) return;
  const m = getOrCreateCharModal();
  document.getElementById('cf-heading').textContent = 'Редактировать персонажа';
  fillCharForm(ch);
  document.getElementById('cf-submit').onclick = async () => {
    const name = document.getElementById('cf-name').value.trim();
    if (!name) { alert('Введите имя'); return; }
    ch.name     = name;
    ch.role     = document.getElementById('cf-role').value.trim();
    ch.fullName = document.getElementById('cf-fullname').value.trim() || name;
    ch.fullRole = document.getElementById('cf-fullrole').value.trim();
    ch.initial  = document.getElementById('cf-initial').value.trim() || name[0];
    ch.color    = document.getElementById('cf-color').value;
    ch.secret   = document.getElementById('cf-secret').value.trim();
    ch.stats    = [...document.querySelectorAll('#cf-stats-list .conn-row')].map(r => [r.querySelector('.cf-stat-key').value.trim(), r.querySelector('.cf-stat-val').value.trim()]).filter(([k])=>k);
    ch.bio      = [...document.querySelectorAll('#cf-bio-list .cf-bio-para')].map(t=>t.value.trim()).filter(Boolean);
    ch.connections = [...document.querySelectorAll('#cf-conn-list .conn-row')].map(r => ({ target: r.querySelector('.cf-conn-target').value, label: r.querySelector('.cf-conn-label').value.trim() })).filter(c=>c.target);
    await saveToBin();
    closeCharForm();
    renderAll();
  };
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openAddCharForm(type) {
  const m = getOrCreateCharModal();
  document.getElementById('cf-heading').textContent = type === 'main' ? 'Новый главный персонаж' : 'Новый второстепенный персонаж';
  fillCharForm(null);
  document.getElementById('cf-submit').onclick = async () => {
    const name = document.getElementById('cf-name').value.trim();
    if (!name) { alert('Введите имя'); return; }
    const newCh = {
      id: 'char_' + Date.now(), type,
      name, role: document.getElementById('cf-role').value.trim(),
      fullName: document.getElementById('cf-fullname').value.trim() || name,
      fullRole: document.getElementById('cf-fullrole').value.trim(),
      initial: document.getElementById('cf-initial').value.trim() || name[0],
      color: document.getElementById('cf-color').value,
      secret: document.getElementById('cf-secret').value.trim(),
      stats: [...document.querySelectorAll('#cf-stats-list .conn-row')].map(r => [r.querySelector('.cf-stat-key').value.trim(), r.querySelector('.cf-stat-val').value.trim()]).filter(([k])=>k),
      bio: [...document.querySelectorAll('#cf-bio-list .cf-bio-para')].map(t=>t.value.trim()).filter(Boolean),
      connections: [...document.querySelectorAll('#cf-conn-list .conn-row')].map(r => ({ target: r.querySelector('.cf-conn-target').value, label: r.querySelector('.cf-conn-label').value.trim() })).filter(c=>c.target),
      events: []
    };
    if (type === 'main') db.mainChars.push(newCh);
    else db.sideChars.push(newCh);
    await saveToBin();
    closeCharForm();
    renderAll();
  };
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCharForm() {
  const m = document.getElementById('char-form-modal');
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}

async function deleteChar(id, type) {
  if (!confirm('Удалить персонажа? Это действие необратимо.')) return;
  if (type === 'main') db.mainChars = (db.mainChars||[]).filter(c => c.id !== id);
  else db.sideChars = (db.sideChars||[]).filter(c => c.id !== id);
  await saveToBin();
  renderAll();
}

// ─────────────────────────────────────────
// IDEAS
// ─────────────────────────────────────────
function renderIdeas() {
  const wrap = document.getElementById('ideas-spoilers');
  if (!wrap) return;
  wrap.innerHTML = '';
  (db.ideas||[]).forEach((idea, idx) => {
    const div = document.createElement('div');
    div.className = 'spoiler-item di';
    div.innerHTML = `
      <div class="spoiler-header" onclick="toggleSpoiler(this)">
        <span>${esc(idea.title||'Без названия')} — ${esc(idea.participants||'')}</span>
        <span style="display:flex;align-items:center;gap:10px;">
          <span class="idea-item-actions">
            <button class="ev-btn" style="font-size:11px;">✏️</button>
            <button class="ev-btn danger" style="font-size:11px;">✕</button>
          </span>
          <span class="spoiler-arrow">▼</span>
        </span>
      </div>
      <div class="spoiler-body">
        <div class="spoiler-chars">Участники: ${esc(idea.participants||'')}</div>
        <div class="spoiler-text">${esc(idea.plot||'')}</div>
      </div>`;
    div.querySelectorAll('.ev-btn')[0].addEventListener('click', e => { e.stopPropagation(); openIdeaForm(idx); });
    div.querySelectorAll('.ev-btn')[1].addEventListener('click', e => { e.stopPropagation(); deleteIdea(idx); });
    wrap.appendChild(div);
  });
}

function getOrCreateIdeaModal() {
  let m = document.getElementById('idea-dyn-modal');
  if (!m) {
    m = document.createElement('div');
    m.className = 'form-modal';
    m.id = 'idea-dyn-modal';
    m.innerHTML = `
      <div class="modal-backdrop-shared" onclick="closeIdeaModal()"></div>
      <div class="form-panel" style="z-index:1;position:relative;">
        <button class="bio-modal-close" onclick="closeIdeaModal()">✕</button>
        <div class="form-title" id="idm-heading">Идея</div>
        <div class="form-group"><label class="form-label">Участники</label><input class="form-input" id="idm-participants" placeholder="Майлз · Селин"></div>
        <div class="form-group"><label class="form-label">Название</label><input class="form-input" id="idm-title" placeholder="Название идеи"></div>
        <div class="form-group"><label class="form-label">Сюжет</label><textarea class="form-textarea" id="idm-plot" style="min-height:140px;"></textarea></div>
        <div class="form-actions">
          <button class="btn-cancel" onclick="closeIdeaModal()">Отмена</button>
          <button class="btn-submit" id="idm-submit">Сохранить</button>
        </div>
      </div>`;
    document.body.appendChild(m);
  }
  return m;
}

function openAddIdeaForm() {
  const m = getOrCreateIdeaModal();
  document.getElementById('idm-heading').textContent = 'Новая идея';
  document.getElementById('idm-participants').value = '';
  document.getElementById('idm-title').value = '';
  document.getElementById('idm-plot').value = '';
  document.getElementById('idm-submit').onclick = async () => {
    const plot = document.getElementById('idm-plot').value.trim();
    if (!plot) { alert('Напишите сюжет'); return; }
    if (!db.ideas) db.ideas = [];
    db.ideas.push({ id: uid(), participants: document.getElementById('idm-participants').value.trim(), title: document.getElementById('idm-title').value.trim(), plot });
    await saveToBin();
    closeIdeaModal();
    renderIdeas();
  };
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openIdeaForm(idx) {
  const idea = (db.ideas||[])[idx]; if (!idea) return;
  const m = getOrCreateIdeaModal();
  document.getElementById('idm-heading').textContent = 'Редактировать идею';
  document.getElementById('idm-participants').value = idea.participants||'';
  document.getElementById('idm-title').value = idea.title||'';
  document.getElementById('idm-plot').value = idea.plot||'';
  document.getElementById('idm-submit').onclick = async () => {
    idea.participants = document.getElementById('idm-participants').value.trim();
    idea.title = document.getElementById('idm-title').value.trim();
    idea.plot = document.getElementById('idm-plot').value.trim();
    await saveToBin();
    closeIdeaModal();
    renderIdeas();
  };
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}

async function deleteIdea(idx) {
  if (!confirm('Удалить идею?')) return;
  db.ideas.splice(idx, 1);
  await saveToBin();
  renderIdeas();
}

function closeIdeaModal() {
  const m = document.getElementById('idea-dyn-modal');
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}

function submitIdea() { openAddIdeaForm(); }

// ─────────────────────────────────────────
// CHRONICLE SELECT UPDATE
// ─────────────────────────────────────────
function updateChronicleSelect() {
  const sel = document.getElementById('fc-char');
  if (!sel) return;
  sel.innerHTML = '<option value="">— выберите персонажа —</option>';
  getAllChars().forEach(ch => {
    const o = document.createElement('option');
    o.value = ch.id; o.textContent = ch.name;
    sel.appendChild(o);
  });
}

function openAddChronicleForm() {
  document.getElementById('add-chronicle-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeAddChronicleForm() {
  document.getElementById('add-chronicle-modal').classList.remove('open');
  document.body.style.overflow = '';
}
async function submitChronicle() {
  const charId = document.getElementById('fc-char').value;
  const title  = document.getElementById('fc-title').value.trim();
  const date   = document.getElementById('fc-date').value.trim();
  const link   = document.getElementById('fc-link').value.trim();
  const desc   = document.getElementById('fc-desc').value.trim();
  const partsRaw = document.getElementById('fc-participants').value.trim();
  if (!charId) { alert('Выберите персонажа'); return; }
  if (!title)  { alert('Введите название'); return; }
  const ch = getChar(charId); if (!ch) return;
  if (!ch.events) ch.events = [];
  ch.events.push({ id: uid(), title, date, link: link||'', desc, participants: partsRaw ? partsRaw.split(/[·,]+/).map(s=>s.trim()).filter(Boolean) : [] });
  ['fc-char','fc-title','fc-date','fc-link','fc-desc','fc-participants'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  closeAddChronicleForm();
  await saveToBin();
}

// ─────────────────────────────────────────
// SPOILERS
// ─────────────────────────────────────────
function toggleSpoiler(header) { header.parentElement.classList.toggle('open'); }

// ─────────────────────────────────────────
// RENDER ALL
// ─────────────────────────────────────────
function renderAll() {
  renderMainChars();
  renderSideChars();
  renderIdeas();
  updateChronicleSelect();
  if (currentChronicleId) renderChronicleEvents(currentChronicleId);
}

// ─────────────────────────────────────────
// KEYBOARD
// ─────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeBio(); closeCharChronicle(); closeAddChronicleForm();
  closeCharForm(); closeEventForm(); closeIdeaModal();
  document.body.style.overflow = '';
});

// ─────────────────────────────────────────
// ADMIN BADGE
// ─────────────────────────────────────────
function createAdminBadge() {
  const badge = document.createElement('div');
  badge.className = 'admin-badge off';
  badge.id = 'admin-badge';
  badge.textContent = '✏️';
  badge.addEventListener('click', toggleAdmin);
  document.body.appendChild(badge);
}

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────
async function init() {
  // Сначала грузим из localStorage — мгновенно
  try {
    const local = localStorage.getItem('chronicle_db');
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed.mainChars && parsed.mainChars.length > 0) {
        db = parsed;
        if (!db.sideChars) db.sideChars = [];
        if (!db.ideas) db.ideas = [];
      }
    }
  } catch(e) {}

  // Если localStorage пустой — дефолты
  if (!db.mainChars || db.mainChars.length === 0) {
    db.mainChars = DEFAULT_MAIN_CHARS;
    db.sideChars = DEFAULT_SIDE_CHARS;
    db.ideas     = DEFAULT_IDEAS;
  }

  // Рендерим сразу не ждя Gist
  createAdminBadge();
  renderAll();

  // Gist грузим в фоне — если данные новее, перерендерим
  loadFromBin().then(changed => { if (changed) renderAll(); });

  poll();
}

init();
