const bioData = {
  elio: {
    color:'#7AB3E0', img:null, imgAlt:'Элио Лаксфорд',
    name:'Элио Аурелион Лаксфорд', role:'Владелец LUX · Посредник IOU · ~44 года',
    stats:[['Настоящее имя','Самаэль Дон'],['Происхождение','Религиозная община'],['Деятельность','Клуб LUX (НО + ЛА), IOU-посредник'],['Статус (2019)','В отношениях с Челси (с 15.10)'],['Терапевт','Linda Martin'],['Год рождения','~1975']],
    bio:['Родился в изолированной религиозной общине под именем Самаэль Дон. Отец — Годфри, жёсткий харизматичный лидер. Мать — Шарлотта, единственное тепло в его жизни. В 17 лет после жестокого «очищения» в подвале мать открывает дверь и шепчет «Беги». Он уходит без имени и будущего.','Добирается до Лос-Анджелеса. Работает посудомойщиком, ночью играет на рояле в пустом ресторане. Хозяин Томи слышит. Рукоплещет. Самаэль умирает — рождается Элио Аурелион Лаксфорд. Томи берёт его под крыло: криминальные связи, обучение, новая жизнь.','В 2002-м родной брат находит его — приехал «продолжить волю отца». Элио вынужден действовать. Брат погибает. Переезд в Новый Орлеан. С тех пор один и тот же сон снова и снова.'],
    secret:'Убил родного брата в ~2002 (самозащита). Тело захоронено в парке, под деревом. Переезд в Новый Орлеан — побег от следов крови. Это знает только он.',
  },
  chelsea: {
    color:'#E07AB3', img:null, imgAlt:'Челси Хилл',
    name:'Челси Хилл', role:'Актриса театра · Педагог · 25 лет',
    stats:[['Дата рождения','24 июля 1994'],['Образование','Актёрский факультет, Луизиана'],['Деятельность','Театр + кружок театрального мастерства'],['Статус (2019)','В отношениях с Элио (с 15.10)'],['Терапевт','Linda Martin']],
    bio:['Родилась в Луизиане. Родители много работали — детство в самостоятельности и тихом одиночестве. В 10 лет готовит ужин для родителей, они не приходят. Рано учится быть взрослой.','Поступает на актёрский. На спектакле знакомится с мужчиной старше и успешнее. Отношения быстро становятся деструктивными. Берёт академический перерыв, обрывает все контакты, возвращается домой и собирает себя с нуля.','В 23 года помогает отцу с документами и случайно находит фото его внебрачного сына. Отец всё объясняет. Образ отца трескается. Даёт слово молчать. Находит брата в соцсетях — следит издалека. Никогда не выходит на контакт.'],
    secret:'У неё есть внебрачный брат, которого она никогда не видела. Тайна отца. Дала слово молчать — и молчит, хотя это требует усилий каждый день.',
  },
  miles: {
    color:'#7AE0AB', img:null, imgAlt:'Майлз Милошевич',
    name:'Майлз Милошевич', role:'Нейрохирург · Заведующий отделением · 36 лет',
    stats:[['Дата рождения','7 января 1983'],['Семья','Виктор (гос. секретарь), дед Драган, брат Николас'],['Деятельность','Нейрохирургия, частная клиника НО'],['Статус (2019)','Фиктивный брак с Селин'],['«Услуги»','Нелегальная хирургия для нужных людей']],
    bio:['Семья с историей: дед Драган — серб первого поколения, отец Виктор — государственный секретарь штата Луизиана. Брат Николас на 3 года старше, дипломатия. Майлз рос в атмосфере ожиданий и сравнений. В какой-то момент перестал конкурировать — выбрал стратегию «неудобного».','Блестящая карьера нейрохирурга. Репутация человека, который делает то, что другие не возьмутся. Это привлекает определённых людей — и определённые обязательства.','Осенью 2017-го просыпается рядом с мёртвой женщиной. Не помнит конца вечера. Это единственное, что по-настоящему его пугает: не то, что мог это сделать, а то, что не знает.'],
    secret:'Не знает, что Селин участвовала в подставной схеме против него. Для него она — партнёр по вынужденному договору. Для неё — инструмент доступа к семье.',
  },
  selin: {
    color:'#B37AE0', img:null, imgAlt:'Селин Деверо',
    name:'Селин Деверо-Милошевич', role:'Директор рехаба · Кардиналы I ранг · 33 года',
    stats:[['Дата рождения','12 ноября 1985'],['Происхождение','Французская семья, теневые связи отца'],['Деятельность','Рехаб + преподавание политологии (Брайтон)'],['Статус (2019)','Фиктивный брак с Майлзом'],['Роль в Кардиналах','Архитектор. I ранг. Отмывание, агентурная сеть.']],
    bio:['Семья Деверо переехала из Франции. Отец — стальной, с теневыми связями, хотел сына. Мать — утончённая, постепенно растворяющаяся в депрессии. В доме много света и дорогих вещей, но мало любви.','Рано поняла: любовь приходит как награда за правильность. Выращена как проект. Усвоила это — и научилась проектировать других.','Сейчас — директор реабилитационного центра, преподаёт политологию в Брайтоне. В организации Кардиналов — архитектор первого ранга: отмывание, агентурная сеть, долгосрочные схемы. Фиктивный брак с Майлзом — её инструмент доступа к его семье.'],
    secret:'Участвовала в подставной схеме против Майлза осенью 2017-го. Он не знает. Фиктивный брак — продуманный ход, не случайность.',
  },
};

function openBio(id) {
  const d = bioData[id]; if (!d) return;
  document.getElementById('bio-img-col').innerHTML = d.img
    ? `<img class="bio-modal-img" src="${d.img}" alt="${d.imgAlt}">`
    : `<div class="bio-modal-img-placeholder">ФОТО · ${d.imgAlt}<br><br><span style="font-size:10px;opacity:0.5">src: ССЫЛКА_НА_ФОТО</span></div>`;
  document.getElementById('bio-accent').style.background = d.color;
  document.getElementById('bio-name').textContent = d.name;
  document.getElementById('bio-name').style.color = d.color;
  document.getElementById('bio-role').textContent = d.role;
  document.getElementById('bio-stats').innerHTML = d.stats.map(([k,v]) =>
    `<div class="bio-stat"><div class="bio-stat-label">${k}</div><div class="bio-stat-value">${v}</div></div>`).join('');
  document.getElementById('bio-text').innerHTML = d.bio.map(p => `<p class="bio-text">${p}</p>`).join('');
  document.getElementById('bio-secret').innerHTML = d.secret
    ? `<div class="bio-secret"><div class="bio-secret-label">⚠ Тайна</div><div class="bio-secret-text">${d.secret}</div></div>` : '';
  document.getElementById('bio-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeBio() { document.getElementById('bio-modal').classList.remove('open'); document.body.style.overflow = ''; }

const connectionMap = {
  elio:    [{target:'chelsea',label:'Влюблённость / партнёрство'},{target:'linda',label:'Терапевт'},{target:'day',label:'Деловой партнёр'},{target:'bert',label:'Рекламный контракт'}],
  chelsea: [{target:'elio',label:'Влюблённость'},{target:'linda',label:'Терапевт'},{target:'bert',label:'Друг'},{target:'hugo',label:'Режиссёр'},{target:'piper',label:'Коллега по съёмкам'}],
  miles:   [{target:'selin',label:'Фиктивный брак'}],
  selin:   [{target:'miles',label:'Фиктивный брак (схема)'}],
  linda:   [{target:'elio',label:'Пациент'},{target:'chelsea',label:'Пациентка'}],
  day:     [{target:'elio',label:'Деловой партнёр'}],
  bert:    [{target:'elio',label:'Рекламный контракт'},{target:'chelsea',label:'Друг'},{target:'mildi',label:'Сосед'}],
  hugo:    [{target:'chelsea',label:'Режиссёр'},{target:'piper',label:'Актриса'}],
  mildi:   [{target:'bert',label:'Сосед'}],
  piper:   [{target:'hugo',label:'Режиссёр'},{target:'chelsea',label:'Коллега'}],
};

function getElementCenter(el) {
  const wrap = document.getElementById('connections-wrap');
  const wr = wrap.getBoundingClientRect(), r = el.getBoundingClientRect();
  return { x: r.left - wr.left + r.width/2, y: r.top - wr.top + r.height/2 };
}
function showConnections(id) {
  const svg = document.getElementById('connections-svg');
  svg.querySelectorAll('.da').forEach(e=>e.remove());
  const src = document.getElementById('conn-'+id); if (!src) return;
  const wrap = document.getElementById('connections-wrap');
  svg.setAttribute('viewBox',`0 0 ${wrap.offsetWidth} ${wrap.offsetHeight}`);
  svg.style.height = wrap.offsetHeight+'px';
  (connectionMap[id]||[]).forEach(conn => {
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
function hideConnections() { document.getElementById('connections-svg').querySelectorAll('.da').forEach(e=>e.remove()); }

const staticChronicles = {
  elio: {
    name:'Элио Лаксфорд', color:'#7AB3E0',
    events:[
      {date:'~1992',title:'Побег из общины',participants:[],link:'',desc:'Мать открывает дверь подвала: «Беги».'},
      {date:'~1993',title:'Рождение Элио за роялем',participants:['Элио'],link:'',desc:'Томи слышит игру, берёт под крыло.'},
      {date:'~2002',title:'Убийство брата. Переезд.',participants:['Элио'],link:'',desc:'Самозащита. Новый Орлеан.'},
      {date:'13.05.2013',title:'IOU: кузен Алистера Янга',participants:['Элио'],link:'',desc:'Помогает вытащить из тюрьмы.'},
      {date:'~20.05.2019',title:'Знакомство с Дэй Бэнкс',participants:['Элио','Дэй'],link:'ССЫЛКА_НА_ИГРУ',desc:'Деловое партнёрство. Зарождение редкой дружбы.'},
      {date:'05.07.2019',title:'Знакомство с Линдой Мартин',participants:['Элио','Линда'],link:'ССЫЛКА_НА_ИГРУ',desc:'Благотворительный вечер. Начало терапии.'},
      {date:'29.07.2019',title:'★ Первое знакомство с Челси',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Съёмочная площадка. Кофе. Разговор затягивается.'},
      {date:'01.08.2019',title:'LUX. Пианино.',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Приглашает Челси в клуб. Редкий момент настоящего.'},
      {date:'~07.08.2019',title:'Скандал в сети. Элио всё портит.',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Фото в сети с подписью про роль. Эмоциональный разговор.'},
      {date:'28.08.2019',title:'⚡ Убийство бывшего Челси',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Всё изменилось.'},
      {date:'07.09.2019',title:'Романтический тур в ЛА',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Что-то идёт не так. Пауза.'},
      {date:'10.09.2019',title:'Терапия: почему Челси не ушла',participants:['Элио','Линда'],link:'ССЫЛКА_НА_ИГРУ',desc:'Сессия с Линдой после ЛА-тура.'},
      {date:'29.09.2019',title:'Рекламный контракт с Бертом',participants:['Элио','Берт'],link:'ССЫЛКА_НА_ИГРУ',desc:'Договор на рекламную кампанию LUX.'},
      {date:'15.10.2019',title:'Ужин-ревность. Ресторан.',participants:['Элио','Челси','Дэй','Берт'],link:'ССЫЛКА_НА_ИГРУ',desc:'Элио с Дэй, Челси с Бертом — в одном ресторане.'},
      {date:'15.10.2019',title:'★ Откровенный разговор. Официально вместе.',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Детство. Первая близость. Официально — вместе.'},
      {date:'20.10.2019',title:'Котёнок и ревность',participants:['Элио','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Первые будни вместе.'},
      {date:'21.10.2019',title:'Бонус Берту. Знакомство с Милди.',participants:['Элио','Берт','Милди'],link:'ССЫЛКА_НА_ИГРУ',desc:'Квартира Берта и Милдред.'},
    ]
  },
  chelsea: {
    name:'Челси Хилл', color:'#E07AB3',
    events:[
      {date:'24.07.1994',title:'Рождение',participants:[],link:'',desc:'Луизиана. Самостоятельное детство.'},
      {date:'~2012',title:'Абьюзивные отношения',participants:[],link:'',desc:'Академический перерыв. Возвращение.'},
      {date:'~2016',title:'Тайна о брате',participants:[],link:'',desc:'Находит фото внебрачного брата отца.'},
      {date:'03.04.2019',title:'Терапия у Линды',participants:['Челси','Линда'],link:'ССЫЛКА_НА_ИГРУ',desc:'Регулярная практика.'},
      {date:'12.07.2019',title:'Съёмки «Колонии»',participants:['Челси','Хьюго','Пайпер'],link:'ССЫЛКА_НА_ИГРУ',desc:'3-я неделя. Режиссёр Хьюго Йорк. Коллега Piper Brandewin.'},
      {date:'29.07.2019',title:'★ Знакомство с Элио',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Кофе. Инцидент. Разговор.'},
      {date:'01.08.2019',title:'LUX. Пианино.',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Вечер в клубе. Что-то начинает складываться.'},
      {date:'~07.08.2019',title:'Скандал в сети',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Фото с подписью — спит со спонсором ради роли.'},
      {date:'28.08.2019',title:'⚡ Шок',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Видит убийство своими глазами. Всё изменилось.'},
      {date:'07.09.2019',title:'Тур в ЛА. Пауза.',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Что-то идёт не так. Почти месяц тишины.'},
      {date:'15.10.2019',title:'Ужин-ревность. Ресторан.',participants:['Челси','Элио','Дэй','Берт'],link:'ССЫЛКА_НА_ИГРУ',desc:'Элио с Дэй, Челси с Бертом — в одном ресторане.'},
      {date:'15.10.2019',title:'★ Вместе',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Официально.'},
      {date:'20.10.2019',title:'Котёнок и ревность',participants:['Челси','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Первые будни.'},
    ]
  },
  miles: {
    name:'Майлз Милошевич', color:'#7AE0AB',
    events:[
      {date:'07.01.1983',title:'Рождение',participants:[],link:'',desc:'Семья Милошевич. Ожидания и давление.'},
      {date:'Осень 2017',title:'Мёртвая женщина. Шантаж.',participants:['Майлз'],link:'',desc:'Не помнит конца вечера. Начало шантажа.'},
      {date:'Осень 2017',title:'Фиктивный брак с Селин',participants:['Майлз','Селин'],link:'ССЫЛКА_НА_ИГРУ',desc:'Контракт. Взаимная полезность. Один дом, разные миры.'},
    ]
  },
  selin: {
    name:'Селин Деверо', color:'#B37AE0',
    events:[
      {date:'12.11.1985',title:'Рождение',participants:[],link:'',desc:'Французская семья. Выращена как проект.'},
      {date:'Осень 2017',title:'Подстава Майлза',participants:['Селин'],link:'',desc:'Участвовала в схеме. Он не знает.'},
      {date:'Осень 2017',title:'Фиктивный брак',participants:['Селин','Майлз'],link:'ССЫЛКА_НА_ИГРУ',desc:'Инструмент доступа к семье Милошевич.'},
    ]
  },
  linda: {
    name:'Линда Мартин', color:'#C8A96E',
    events:[
      {date:'03.04.2019',title:'Сессия с Челси',participants:['Линда','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Регулярная терапия.'},
      {date:'05.07.2019',title:'Знакомство с Элио',participants:['Линда','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Благотворительный вечер. Он записывается на приём.'},
      {date:'10.09.2019',title:'Сессия с Элио',participants:['Линда','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Почему Челси не ушла.'},
    ]
  },
  day: {
    name:'Дэй Бэнкс', color:'#C8A96E',
    events:[
      {date:'~20.05.2019',title:'Знакомство с Элио',participants:['Дэй','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Деловое партнёрство. Зарождение дружбы.'},
      {date:'15.10.2019',title:'Ужин в ресторане',participants:['Дэй','Элио','Челси','Берт'],link:'ССЫЛКА_НА_ИГРУ',desc:'Деловой ужин с Элио — невольно становится эпизодом ревности.'},
    ]
  },
  bert: {
    name:'Берт Милтон', color:'#C8A96E',
    events:[
      {date:'29.09.2019',title:'Рекламный контракт с LUX',participants:['Берт','Элио'],link:'ССЫЛКА_НА_ИГРУ',desc:'Отличная работа. Бонус от Элио.'},
      {date:'15.10.2019',title:'Ужин с Челси',participants:['Берт','Челси','Элио','Дэй'],link:'ССЫЛКА_НА_ИГРУ',desc:'Триггер ревности Элио.'},
      {date:'21.10.2019',title:'Берт дома. Бонус.',participants:['Берт','Элио','Милди'],link:'ССЫЛКА_НА_ИГРУ',desc:'Элио приносит бонус. Знакомство с Милди.'},
    ]
  },
  hugo: {
    name:'Хьюго Йорк', color:'#C8A96E',
    events:[
      {date:'12.07.2019',title:'Режиссёр «Колонии»',participants:['Хьюго','Челси','Пайпер'],link:'ССЫЛКА_НА_ИГРУ',desc:'Работает с Челси и Piper Brandewin на съёмках.'},
    ]
  },
  mildi: {
    name:'Милдред Смит', color:'#C8A96E',
    events:[
      {date:'21.10.2019',title:'Знакомство с Элио',participants:['Милди','Элио','Берт'],link:'ССЫЛКА_НА_ИГРУ',desc:'Квартира Берта.'},
    ]
  },
  piper: {
    name:'Piper Brandewin', color:'#C8A96E',
    events:[
      {date:'12.07.2019',title:'Съёмки «Колонии»',participants:['Пайпер','Хьюго','Челси'],link:'ССЫЛКА_НА_ИГРУ',desc:'Актриса на съёмках. Режиссёр — Хьюго Йорк. Коллега — Челси Хилл.'},
    ]
  },
};

function openCharChronicle(id) {
  const d = staticChronicles[id]; if (!d) return;
  const extra = (chronicles[id] || []);
  const all = [...d.events, ...extra];
  document.getElementById('char-chronicle-content').innerHTML = `
    <div style="color:${d.color};font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;">Хроника</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;color:${d.color};margin-bottom:24px;">${d.name}</div>
    <div style="position:relative;padding-left:24px;border-left:1px solid var(--dim);">
      ${all.map(e => {
        const real = e.link && e.link !== 'ССЫЛКА_НА_ИГРУ' && e.link !== '';
        const ph = e.link === 'ССЫЛКА_НА_ИГРУ';
        return `<div style="margin-bottom:22px;position:relative;">
          <div style="position:absolute;left:-28px;top:4px;width:8px;height:8px;border-radius:50%;background:${d.color};opacity:0.7;"></div>
          <div style="font-size:10px;letter-spacing:2px;color:${d.color};margin-bottom:4px;text-transform:uppercase;">${e.date}</div>
          <div style="font-size:14px;font-weight:500;color:var(--white);margin-bottom:5px;">
            ${real ? `<a href="${e.link}" target="_blank" style="color:var(--white);text-decoration:none;border-bottom:1px solid #9A7A45;">${e.title}</a>` : e.title}
          </div>
          ${e.participants&&e.participants.length ? `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:5px;">${e.participants.map(p=>`<span style="font-size:10px;padding:2px 9px;border-radius:10px;background:rgba(200,169,110,0.08);border:1px solid #9A7A45;color:#C8A96E;">${p}</span>`).join('')}</div>` : ''}
          ${e.desc ? `<div style="font-size:13px;color:var(--muted);line-height:1.6;">${e.desc}</div>` : ''}
          ${ph ? `<div style="font-size:10px;color:#5A5A7A;margin-top:4px;font-style:italic;">[ ссылка не добавлена ]</div>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  document.getElementById('char-chronicle-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCharChronicle() { document.getElementById('char-chronicle-modal').classList.remove('open'); document.body.style.overflow = ''; }

let chronicles = JSON.parse(localStorage.getItem('chronicles_v2') || '{}');

function openAddChronicleForm() { document.getElementById('add-chronicle-modal').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeAddChronicleForm() { document.getElementById('add-chronicle-modal').classList.remove('open'); document.body.style.overflow = ''; }

function submitChronicle() {
  const charId = document.getElementById('fc-char').value;
  const title = document.getElementById('fc-title').value.trim();
  const date = document.getElementById('fc-date').value.trim();
  const link = document.getElementById('fc-link').value.trim();
  const desc = document.getElementById('fc-desc').value.trim();
  const partsRaw = document.getElementById('fc-participants').value.trim();
  if (!charId) { alert('Выберите персонажа'); return; }
  if (!title) { alert('Введите название'); return; }
  if (!chronicles[charId]) chronicles[charId] = [];
  chronicles[charId].push({ title, date, link: link||'', desc, participants: partsRaw ? partsRaw.split(/[·,]+/).map(s=>s.trim()).filter(Boolean) : [] });
  localStorage.setItem('chronicles_v2', JSON.stringify(chronicles));
  ['fc-char','fc-title','fc-date','fc-link','fc-desc','fc-participants'].forEach(id => { document.getElementById(id).value = ''; });
  closeAddChronicleForm();
}

let ideas = JSON.parse(localStorage.getItem('ideas') || '[]');

function renderIdeas() {
  const wrap = document.getElementById('ideas-spoilers');
  wrap.querySelectorAll('.di').forEach(e=>e.remove());
  ideas.forEach(idea => {
    const div = document.createElement('div');
    div.className = 'spoiler-item di';
    div.innerHTML = `<div class="spoiler-header" onclick="toggleSpoiler(this)"><span>${idea.title||'Без названия'} — ${idea.participants||''}</span><span class="spoiler-arrow">▼</span></div><div class="spoiler-body"><div class="spoiler-chars">Участники: ${idea.participants||''}</div><div class="spoiler-text">${idea.plot||''}</div></div>`;
    wrap.appendChild(div);
  });
}

function openAddIdeaForm() { document.getElementById('add-idea-modal').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeAddIdeaForm() { document.getElementById('add-idea-modal').classList.remove('open'); document.body.style.overflow = ''; }

function submitIdea() {
  const participants = document.getElementById('fi-participants').value.trim();
  const title = document.getElementById('fi-title').value.trim();
  const plot = document.getElementById('fi-plot').value.trim();
  if (!plot) { alert('Напишите сюжет'); return; }
  ideas.push({ participants, title, plot });
  localStorage.setItem('ideas', JSON.stringify(ideas));
  renderIdeas();
  ['fi-participants','fi-title','fi-plot'].forEach(id => { document.getElementById(id).value = ''; });
  closeAddIdeaForm();
}

function toggleSpoiler(header) { header.parentElement.classList.toggle('open'); }

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeBio(); closeCharChronicle(); closeAddChronicleForm(); closeAddIdeaForm(); }
});

renderIdeas();
