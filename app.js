'use strict';

const app = {};

// ========== MEAL DATABASE ==========
const MEAL_DB = {
  breakfast: [
    {
      id: 'bf-jajecznica',
      name: 'Jajecznica z serem',
      category: 'breakfast',
      time: 'Śniadanie (8:00)',
      ingredients: [{name: 'jajka', amount: '2 szt.'}, {name: 'ser żółty', amount: '50g'}, {name: 'masło', amount: '15g'}, {name: 'chleb żytni', amount: '2 kromki (60g)'}, {name: 'sól', amount: 'szczypta'}, {name: 'pieprz', amount: 'szczypta'}],
      macros: { kcal: 420, protein: 28, fat: 28, carbs: 14, fiber: 2 },
      tags: [],
      instructions: 'Roztop masło na patelni. Wbij jajka, mieszaj. Pod koniec dodaj starty ser. Podawaj z kromką chleba.',
      appliances: [],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.5
    },
    {
      id: 'bf-tofu-scramble',
      name: 'Tofu scramble z fetą',
      category: 'breakfast',
      time: 'Śniadanie (8:00)',
      ingredients: [{name: 'tofu', amount: '150g'}, {name: 'feta', amount: '60g'}, {name: 'oliwa', amount: '15ml (1 łyżka)'}, {name: 'chleb żytni', amount: '2 kromki (60g)'}, {name: 'sól', amount: 'szczypta'}, {name: 'pieprz', amount: 'szczypta'}, {name: 'kurkuma', amount: '1g'}],
      macros: { kcal: 390, protein: 26, fat: 24, carbs: 16, fiber: 3 },
      tags: ['wegetariańskie'],
      instructions: 'Rozgnieć tofu widelcem. Smaż na oliwie 5 min z ulubionymi przyprawami. Dodaj pokruszoną fetę. Podawaj z chlebem.',
      appliances: [],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.5
    },
    {
      id: 'bf-jajka-airfryer',
      name: 'Jajka zapiekane w airfryer',
      category: 'breakfast',
      time: 'Śniadanie (8:00)',
      ingredients: [{name: 'jajka', amount: '2 szt.'}, {name: 'ser żółty', amount: '50g'}, {name: 'chleb żytni', amount: '2 kromki (60g)'}, {name: 'sól', amount: 'szczypta'}, {name: 'pieprz', amount: 'szczypta'}, {name: 'papryka słodka', amount: '1g'}],
      macros: { kcal: 380, protein: 25, fat: 26, carbs: 12, fiber: 1 },
      tags: ['airfryer'],
      instructions: 'Rozbij jajka do foremki silikonowej. Posyp serem. Airfryer 170°C, 10 min. Podawaj z chlebem.',
      appliances: ['airfryer'],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.5
    },
    {
      id: 'bf-omlet-tm6',
      name: 'Omlet z serem (TM6)',
      category: 'breakfast',
      time: 'Śniadanie (8:00)',
      ingredients: [{name: 'jajka', amount: '2 szt.'}, {name: 'ser żółty', amount: '50g'}, {name: 'masło', amount: '15g'}, {name: 'sól', amount: 'szczypta'}, {name: 'pieprz', amount: 'szczypta'}],
      macros: { kcal: 400, protein: 27, fat: 30, carbs: 3, fiber: 0 },
      tags: ['thermomix'],
      instructions: 'TM6: jajka do misy, 10s/obr. 4. Dodaj ser, 5s/obr. 3. Wlej do formy. Piecz w airfryer lub na patelni 180°C/12min.',
      appliances: ['thermomix'],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.5
    },
    {
      id: 'bf-twarozek',
      name: 'Twarożek z rzodkiewką',
      category: 'breakfast',
      time: 'Śniadanie (8:00)',
      ingredients: [{name: 'twaróg', amount: '150g'}, {name: 'rzodkiewka', amount: '4 szt. (40g)'}, {name: 'chleb żytni', amount: '2 kromki (60g)'}, {name: 'szczypiorek', amount: '10g'}, {name: 'sól', amount: 'szczypta'}],
      macros: { kcal: 340, protein: 28, fat: 12, carbs: 28, fiber: 4 },
      tags: ['wegetariańskie'],
      instructions: 'Rozgnieć twaróg. Dodaj pokrojoną rzodkiewkę, szczypiorek. Podawaj z chlebem żytnim.',
      appliances: [],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.3
    }
  ],
  lunch: [
    {
      id: 'lu-kurczak-airfryer',
      name: 'Kurczak z airfryera + warzywa',
      category: 'lunch',
      time: 'Obiad (14:00)',
      ingredients: [{name: 'pierś z kurczaka', amount: '150g'}, {name: 'brokuły', amount: '100g'}, {name: 'ziemniaki', amount: '150g'}, {name: 'oliwa', amount: '15ml (1 łyżka)'}, {name: 'sól', amount: '2g'}, {name: 'pieprz', amount: '1g'}, {name: 'papryka słodka', amount: '3g'}, {name: 'czosnek granulowany', amount: '2g'}],
      macros: { kcal: 520, protein: 48, fat: 18, carbs: 35, fiber: 6 },
      tags: ['airfryer', 'wysokobiałkowe'],
      instructions: 'Kurczaka pokrój w paski, zamarynuj. Airfryer 180°C/15 min. Warzywa ugotuj na parze lub airfryer 170°C/10min.',
      appliances: ['airfryer'],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.5
    },
    {
      id: 'lu-tofu-stirfry',
      name: 'Tofu stir-fry z warzywami',
      category: 'lunch',
      time: 'Obiad (14:00)',
      ingredients: [{name: 'tofu', amount: '150g'}, {name: 'papryka', amount: '100g (1/2 szt.)'}, {name: 'cukinia', amount: '100g'}, {name: 'sos sojowy', amount: '15ml'}, {name: 'ryż brązowy', amount: '60g (suchy)'}, {name: 'sól', amount: '2g'}, {name: 'pieprz', amount: '1g'}, {name: 'imbir', amount: '5g'}, {name: 'czosnek', amount: '2 ząbki'}],
      macros: { kcal: 450, protein: 28, fat: 16, carbs: 50, fiber: 5 },
      tags: ['wegetariańskie'],
      instructions: 'Tofu pokrój w kostkę, obsmaż na oliwie. Dodaj warzywa, smaż 5 min. Dodaj sos sojowy. Podawaj z ryżem.',
      appliances: [],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.6
    },
    {
      id: 'lu-zapiekanka-tm6',
      name: 'Zapiekanka z tofu i fetą (TM6)',
      category: 'lunch',
      time: 'Obiad (14:00)',
      ingredients: [{name: 'tofu', amount: '150g'}, {name: 'feta', amount: '60g'}, {name: 'pomidory', amount: '100g'}, {name: 'cukinia', amount: '100g'}, {name: 'oliwa', amount: '15ml (1 łyżka)'}, {name: 'sól', amount: '2g'}, {name: 'pieprz', amount: '1g'}, {name: 'oregano', amount: '2g'}],
      macros: { kcal: 480, protein: 30, fat: 28, carbs: 22, fiber: 4 },
      tags: ['thermomix', 'wegetariańskie'],
      instructions: 'TM6: Warzywa do misy 5s/obr.5. Tofu rozgnieć, wymieszaj z fetą i jajkiem. Piecz w piekarniku 180°C/25min.',
      appliances: ['thermomix'],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.5
    },
    {
      id: 'lu-losos',
      name: 'Łosoś z warzywami na parze',
      category: 'lunch',
      time: 'Obiad (14:00)',
      ingredients: [{name: 'łosoś', amount: '150g'}, {name: 'brokuły', amount: '100g'}, {name: 'marchewka', amount: '80g (1 szt.)'}, {name: 'oliwa', amount: '15ml (1 łyżka)'}, {name: 'kasza gryczana', amount: '60g (sucha)'}, {name: 'sól', amount: '2g'}, {name: 'pieprz', amount: '1g'}, {name: 'koperek', amount: '5g'}, {name: 'cytryna', amount: '1 plaster'}],
      macros: { kcal: 550, protein: 42, fat: 24, carbs: 38, fiber: 5 },
      tags: ['wysokobiałkowe', 'zdrowe tłuszcze'],
      instructions: 'Łososia skrop cytryną, posyp przyprawami. Gotuj na parze w TM6 (Varoma) 20min/Varoma/obr.1. Podawaj z kaszą i warzywami.',
      appliances: ['thermomix'],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.4
    },
    {
      id: 'lu-curry-ciecierzyca',
      name: 'Curry z ciecierzycą (TM6)',
      category: 'lunch',
      time: 'Obiad (14:00)',
      ingredients: [{name: 'ciecierzyca', amount: '120g (ugotowana)'}, {name: 'mleko kokosowe', amount: '100ml'}, {name: 'pomidory', amount: '100g'}, {name: 'szpinak', amount: '80g'}, {name: 'ryż', amount: '60g (suchy)'}, {name: 'curry', amount: '5g'}, {name: 'kurkuma', amount: '2g'}, {name: 'imbir', amount: '5g'}, {name: 'sól', amount: '2g'}],
      macros: { kcal: 480, protein: 22, fat: 24, carbs: 52, fiber: 10 },
      tags: ['thermomix', 'wegetariańskie', 'wysokobłonnikowe'],
      instructions: 'TM6: Cebula i czosnek 5s/obr.5. Dodaj przyprawy, 3min/120°C/obr.1. Dodaj pomidory i mleko kokosowe, 15min/100°C/obr.1. Pod koniec dodaj ciecierzycę i szpinak. Podawaj z ryżem.',
      appliances: ['thermomix'],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.5
    }
  ],
  dinner: [
    {
      id: 'dn-salatka-feta',
      name: 'Sałatka z fetą i awokado',
      category: 'dinner',
      time: 'Kolacja (20:00)',
      ingredients: [{name: 'feta', amount: '60g'}, {name: 'awokado', amount: '100g (1/2 szt.)'}, {name: 'mix sałat', amount: '60g'}, {name: 'ogórek', amount: '100g (1/2 szt.)'}, {name: 'pomidor', amount: '100g (1 szt.)'}, {name: 'oliwa', amount: '15ml (1 łyżka)'}, {name: 'sól', amount: 'szczypta'}, {name: 'pieprz', amount: 'szczypta'}, {name: 'oregano', amount: '2g'}],
      macros: { kcal: 380, protein: 14, fat: 30, carbs: 12, fiber: 6 },
      tags: ['wegetariańskie', 'bezglutenowe'],
      instructions: 'Pokrój warzywa i fetę. Wymieszaj z mixem sałat. Polej oliwą.',
      appliances: [],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.3
    },
    {
      id: 'dn-tosty-airfryer',
      name: 'Tosty z serem w airfryer',
      category: 'dinner',
      time: 'Kolacja (20:00)',
      ingredients: [{name: 'chleb żytni', amount: '2 kromki (60g)'}, {name: 'ser żółty', amount: '50g'}, {name: 'pomidor', amount: '100g (1 szt.)'}, {name: 'sól', amount: 'szczypta'}, {name: 'pieprz', amount: 'szczypta'}],
      macros: { kcal: 360, protein: 20, fat: 18, carbs: 30, fiber: 3 },
      tags: ['airfryer'],
      instructions: 'Złóż tosty z serem i pomidorem. Airfryer 170°C/8 min. Podawaj z sałatą.',
      appliances: ['airfryer'],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.5
    },
    {
      id: 'dn-twarog-warzywa',
      name: 'Twaróg z warzywami',
      category: 'dinner',
      time: 'Kolacja (20:00)',
      ingredients: [{name: 'twaróg', amount: '150g'}, {name: 'ogórek', amount: '100g (1/2 szt.)'}, {name: 'rzodkiewka', amount: '4 szt. (40g)'}, {name: 'chleb żytni', amount: '2 kromki (60g)'}, {name: 'szczypiorek', amount: '10g'}, {name: 'sól', amount: 'szczypta'}, {name: 'pieprz', amount: 'szczypta'}],
      macros: { kcal: 320, protein: 26, fat: 10, carbs: 30, fiber: 4 },
      tags: ['wegetariańskie', 'wysokobiałkowe'],
      instructions: 'Wymieszaj twaróg z pokrojonymi warzywami i szczypiorkiem. Podawaj z chlebem.',
      appliances: [],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.3
    },
    {
      id: 'dn-omlet-warzywny',
      name: 'Omlet warzywny',
      category: 'dinner',
      time: 'Kolacja (20:00)',
      ingredients: [{name: 'jajka', amount: '2 szt.'}, {name: 'papryka', amount: '100g (1/2 szt.)'}, {name: 'cukinia', amount: '100g'}, {name: 'pomidor', amount: '100g (1 szt.)'}, {name: 'sól', amount: 'szczypta'}, {name: 'pieprz', amount: 'szczypta'}, {name: 'bazylia', amount: '2g'}],
      macros: { kcal: 340, protein: 24, fat: 22, carbs: 10, fiber: 3 },
      tags: ['wegetariańskie', 'bezglutenowe'],
      instructions: 'Roztrzep jajka, dodaj pokrojone warzywa. Smaż na patelni lub TM6 10min/100°C/obr.1.',
      appliances: ['thermomix'],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.4
    },
    {
      id: 'dn-salatka-tunczyk',
      name: 'Sałatka z tuńczykiem',
      category: 'dinner',
      time: 'Kolacja (20:00)',
      ingredients: [{name: 'tuńczyk w puszce', amount: ''}, {name: 'mix sałat', amount: '60g'}, {name: 'ogórek', amount: '100g (1/2 szt.)'}, {name: 'pomidor', amount: '100g (1 szt.)'}, {name: 'oliwa', amount: '15ml (1 łyżka)'}, {name: 'chleb żytni', amount: '2 kromki (60g)'}, {name: 'sól', amount: 'szczypta'}, {name: 'pieprz', amount: 'szczypta'}, {name: 'cebula', amount: '30g (1/4 szt.)'}],
      macros: { kcal: 370, protein: 30, fat: 18, carbs: 20, fiber: 4 },
      tags: ['wysokobiałkowe'],
      instructions: 'Wymieszaj tuńczyka z warzywami i sałatą. Dodaj oliwę. Podawaj z kromką chleba.',
      appliances: [],
      shared: true,
      renata_portion: 1,
      husband_portion: 1.4
    }
  ]
};

// ========== STORE ==========
const Store = {
  key: 'kp_data',
  
  get() {
    try {
      const raw = localStorage.getItem(this.key);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return this.defaults();
  },

  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  },

  defaults() {
    return {
      activeUser: null,
      users: [
        { id: 'renata', name: 'Renata', kcal: 1600, protein: 120, fat: 50, carbs: 170, fiber: 25, waterGoal: 2000, avatar: '👩', pairedWith: null, pairRequestFrom: null, mealTimes: { breakfast: '8:00', lunch: '14:00', dinner: '20:00' } },
        { id: 'rafal', name: 'Rafał', kcal: 2100, protein: 140, fat: 65, carbs: 220, fiber: 30, waterGoal: 2500, avatar: '👨', pairedWith: null, pairRequestFrom: null, mealTimes: { breakfast: '8:00', lunch: '14:00', dinner: '20:00' } }
      ],
      pantry: [
        { id: 'p1', name: 'Jajka', category: 'białko', qty: '12 szt', emoji: '🥚', inStock: true },
        { id: 'p2', name: 'Ser żółty', category: 'nabiał', qty: '200g', emoji: '🧀', inStock: true },
        { id: 'p3', name: 'Chleb żytni', category: 'węglowodany', qty: '1 bochenek', emoji: '🍞', inStock: true },
        { id: 'p4', name: 'Tofu', category: 'białko', qty: '300g', emoji: '🧊', inStock: true },
        { id: 'p5', name: 'Feta', category: 'nabiał', qty: '200g', emoji: '🧀', inStock: true },
        { id: 'p6', name: 'Oliwa z oliwek', category: 'tłuszcze', qty: 'butelka', emoji: '', inStock: true }
      ],
      appliances: ['airfryer', 'thermomix'],
      cookTogether: true,
      water: [],
      mealPlan: {},
      settings: {
        theme: 'dark'
      }
    };
  }
};

// ========== DATE HELPERS ==========
const DOW = ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'];
const DOW_SHORT = ['Nd','Pn','Wt','Śr','Cz','Pt','Sb'];

function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getDOW(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.getDay();
}

function formatDatePL(dateStr) {
  const dow = getDOW(dateStr);
  const parts = dateStr.split('-');
  return `${DOW[dow]}, ${parts[2]}.${parts[1]}`;
}

function getWeekDates() {
  const today = new Date();
  const todayDOW = today.getDay();
  const mondayOffset = todayDOW === 0 ? -6 : 1 - todayDOW;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
  }
  return dates;
}

// ========== MACRO HELPERS ==========
function calcMacros(meal, userId, portion = 1) {
  const user = app.data.users.find(u => u.id === userId);
  const mult = userId === 'renata' ? (meal.renata_portion || 1) : (meal.husband_portion || 1);
  const factor = mult * portion;
  return {
    kcal: Math.round(meal.macros.kcal * factor),
    protein: Math.round(meal.macros.protein * factor),
    fat: Math.round(meal.macros.fat * factor),
    carbs: Math.round(meal.macros.carbs * factor),
    fiber: Math.round(meal.macros.fiber * factor)
  };
}

function scaleMacros(macros, factor) {
  return {
    kcal: Math.round(macros.kcal * factor),
    protein: Math.round(macros.protein * factor),
    fat: Math.round(macros.fat * factor),
    carbs: Math.round(macros.carbs * factor),
    fiber: Math.round(macros.fiber * factor)
  };
}

// ========== APP STATE ==========
app.data = Store.get();

// ========== AUTH ==========
app.auth = {
  select(userId) {
    app.data.activeUser = userId;
    Store.save(app.data);
    document.getElementById('view-start').style.display = 'none';
    document.getElementById('view-dashboard').style.display = 'block';
    
    // Show nav
    const nav = document.querySelector('.floating-nav');
    if (nav) nav.style.display = 'flex';
    
    // Auto-generate weekly plan on first use
    const hasPlan = Object.keys(app.data.mealPlan || {}).length > 0;
    if (!hasPlan && app.mealplan) {
      app.mealplan.generateWeek();
    }
    
    app.dashboard.render();
  },

  switchUser() {
    document.getElementById('view-dashboard').style.display = 'none';
    document.getElementById('view-start').style.display = 'flex';
    document.getElementById('view-start').style.height = '100%';
    
    // Hide nav
    const nav = document.querySelector('.floating-nav');
    if (nav) nav.style.display = 'none';
  },

  getActiveUser() {
    return app.data.users.find(u => u.id === app.data.activeUser) || app.data.users[0];
  },

  isActive(userId) {
    return app.data.activeUser === userId;
  }
};

// ========== CORE APP ==========

// --- NAV ---
app.nav = {
  init() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => this.switch(btn.dataset.view));
    });
  },
  switch(viewId) {
    document.querySelectorAll('#views > section').forEach(v => v.style.display = 'none');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const view = document.getElementById(`view-${viewId}`);
    const btn = document.querySelector(`.nav-btn[data-view="${viewId}"]`);
    if (view) view.style.display = 'block';
    if (btn) btn.classList.add('active');
    // Refresh views
    if (viewId === 'dashboard') app.dashboard.render();
    if (viewId === 'mealplan') app.mealplan.render();
    if (viewId === 'recipes') app.recipes.render();
    if (viewId === 'pantry') app.pantry.render();
    if (viewId === 'water') app.water.renderFull();
    if (viewId === 'zakupy') app.zakupy.render();
    if (viewId === 'settings') app.settings.render();
  }
};

// --- UI ---
app.ui = {
  openModal(title, bodyHtml) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = bodyHtml;
    document.getElementById('modal-overlay').classList.add('open');
  },
  closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
  },
  showToast(msg) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#1F2621;color:#FFF;padding:10px 20px;border-radius:14px;font-size:13px;font-weight:500;z-index:9999;opacity:0;transition:opacity 0.3s;white-space:nowrap;max-width:90vw';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
  }
};

// --- DASHBOARD ---
app.dashboard = {
  render() {
    const today = getToday();
    document.getElementById('dash-date').textContent = formatDatePL(today);
    
    const activeUser = app.auth.getActiveUser();
    const target = activeUser.kcal;
    
    // Calculate consumed calories from meal plan
    const plan = app.data.mealPlan[today];
    let consumed = 0;
    if (plan && plan.meals) {
      plan.meals.forEach(m => {
        if (activeUser.id === 'renata' && m.renata) consumed += m.renata.kcal || 0;
        if (activeUser.id === 'rafal' && m.husband) consumed += m.husband.kcal || 0;
      });
    }
    
    // Render user card
    const cardContainer = document.getElementById('dash-user-card');
    cardContainer.innerHTML = `
      <div class="card">
        <div class="user-card">
          <div class="user-card-left">
            <div class="avatar ${activeUser.id === 'renata' ? 'female' : 'male'}">${activeUser.avatar}</div>
            <div>
              <div class="user-name">${activeUser.name}</div>
            </div>
          </div>
          <div class="user-card-right">
            <div class="kcal-current">${consumed}</div>
            <div class="kcal-target">/ ${target} kcal</div>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${Math.min(100, (consumed/target)*100)}%"></div>
        </div>
      </div>
    `;
    
    // Update water
    this.updateWater();
    
    // Render today's meals
    this.renderTodayMeals();
  },

  renderUserTabs() {
    const container = document.getElementById('dash-user-tabs');
    const activeId = app.data.activeUser;
    container.innerHTML = app.data.users.map(u => `
      <button class="user-tab ${u.id === activeId ? 'active' : ''}" onclick="app.dashboard.switchUser('${u.id}')">
        <span class="tab-avatar">${u.avatar}</span>
        <span class="tab-name">${u.name}</span>
      </button>
    `).join('');
  },

  switchUser(userId) {
    app.data.activeUser = userId;
    Store.save(app.data);
    this.render();
  },

  updateWater() {
    const total = app.water.getTotal();
    const activeUser = app.auth.getActiveUser();
    const target = activeUser.waterGoal || 2000;
    const countEl = document.getElementById('dash-water-count');
    if (countEl) countEl.textContent = `${total} ml / ${target} ml`;
    const glassImg = document.getElementById('water-glass-img');
    if (glassImg) glassImg.src = app.water.getWaterGlassImage(Math.min(100, (total / target) * 100));
  },

  renderTodayMeals() {
    const container = document.getElementById('dash-today-meals-content');
    const kcalBadge = document.getElementById('dash-meals-kcal');
    const today = getToday();
    const plan = app.data.mealPlan[today];
    const activeUser = app.auth.getActiveUser();

    if (!plan || !plan.meals || plan.meals.length === 0) {
      container.innerHTML = '<p class="text-muted" style="font-size:13px;padding:12px;text-align:center">Brak wygenerowanego planu</p>';
      if (kcalBadge) kcalBadge.textContent = '';
      return;
    }

    const userKey = activeUser.id === 'renata' ? 'renata' : 'husband';
    const dailyGoal = activeUser.kcal || 1600;
    let totalKcal = 0;
    let html = '';

    // Group meals by type
    const mealTypes = { 'śniadanie': [], 'obiad': [], 'kolacja': [], 'przekąska': [], 'posiłek': [] };
    const labels = { 'śniadanie': 'ŚNIADANIE', 'obiad': 'OBIAD', 'kolacja': 'WIECZERZA', 'przekąska': 'PRZEKĄSKA', 'posiłek': 'POSIŁEK' };

    plan.meals.forEach(m => {
      const timeStr = (m.time || m.category || '').toLowerCase();
      let key = 'posiłek';
      if (timeStr.includes('śniadanie') || timeStr.includes('breakfast')) key = 'śniadanie';
      else if (timeStr.includes('obiad') || timeStr.includes('lunch')) key = 'obiad';
      else if (timeStr.includes('kolacja') || timeStr.includes('dinner')) key = 'kolacja';
      else if (timeStr.includes('przekąska') || timeStr.includes('snack')) key = 'przekąska';
      mealTypes[key].push(m);
    });

    Object.keys(mealTypes).forEach(type => {
      const meals = mealTypes[type];
      if (meals.length === 0) return;

      html += `<div class="dash-meal-section">
        <div class="dash-meal-header">${labels[type]}</div>`;

      meals.forEach(m => {
        const kcal = m[userKey] ? (m[userKey].kcal || 0) : 0;
        totalKcal += kcal;
        const displayKcal = kcal !== 0 ? kcal : '—';

        html += `
        <div class="dash-meal-item">
          <span class="dash-meal-name">${m.name}</span>
          <span class="dash-meal-kcal">${displayKcal} kcal</span>
        </div>`;
      });

      html += `</div>`;
    });

    container.innerHTML = html;
    if (kcalBadge) kcalBadge.textContent = `${totalKcal} / ${dailyGoal} kcal`;

    // Add meal item styles dynamically if not present
    if (!document.getElementById('dash-meal-styles')) {
      const style = document.createElement('style');
      style.id = 'dash-meal-styles';
      style.textContent = `
        #dash-today-meals-content { padding: 8px 0; }
        .dash-meal-section { margin-bottom: 4px; }
        .dash-meal-header {
          font-size: 11px;
          font-weight: 700;
          color: #728E7C;
          letter-spacing: 1.5px;
          padding: 6px 16px;
          background: rgba(114,142,124,0.08);
          border-radius: 8px;
          margin: 6px 8px 2px;
          font-family: 'Cinzel', serif;
        }
        .dash-meal-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 8px 16px;
          transition: background 0.1s;
        }
        .dash-meal-item:last-child { border-bottom: none; }
        .dash-meal-item:hover { background: #F8FBF8; }
        .dash-meal-name { flex: 1; font-size: 13px; font-weight: 500; color: #1F2621; }
        .dash-meal-kcal { font-size: 12px; font-weight: 600; color: #4F5E53; background: #EFF3EF; padding: 2px 10px; border-radius: 10px; }
      `;
      document.head.appendChild(style);
    }
  }
};

// --- MEAL PLAN ---
app.mealplan = {
  currentDay: getToday(),

  render() {
    this.renderWeekTabs();
    this.renderDay(this.currentDay);
  },

  renderWeekTabs() {
    const container = document.getElementById('week-tabs');
    const dates = getWeekDates();
    const today = getToday();
    
    let html = '';
    dates.forEach((d, i) => {
      const active = d === this.currentDay;
      const shortDate = `${d.split('-')[2]}.${d.split('-')[1]}`;
      const isToday = d === today;
      html += `<div class="week-tab ${active?'active':''}" onclick="app.mealplan.selectDay('${d}')">${DOW_SHORT[getDOW(d)]}<br><small>${shortDate}</small>${isToday?' 📌':''}</div>`;
    });
    container.innerHTML = html;
  },

  selectDay(dateStr) {
    this.currentDay = dateStr;
    this.renderWeekTabs();
    this.renderDay(dateStr);
  },

  renderDay(dateStr) {
    const container = document.getElementById('day-detail');
    const plan = app.data.mealPlan[dateStr];
    const isFuture = dateStr > getToday();
    const isToday = dateStr === getToday();
    const activeUser = app.auth.getActiveUser();

    if (!plan || !plan.meals || plan.meals.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="big">📅</div>
          <p>Brak planu na ${formatDatePL(dateStr)}</p>
          <button class="btn-sm" onclick="app.mealplan.generateDay('${dateStr}')" style="margin-top:12px">
            Generuj dla tego dnia
          </button>
        </div>`;
      return;
    }

    let totalActive = 0;
    let totalProtein = 0, totalFat = 0, totalCarbs = 0;
    let totalOtherKcal = 0, totalOtherProtein = 0, totalOtherFat = 0, totalOtherCarbs = 0;
    const userKey = activeUser.id === 'renata' ? 'renata' : 'husband';
    const otherUserKey = activeUser.id === 'renata' ? 'husband' : 'renata';
    const dailyGoal = activeUser.kcal || 1600;
    const otherUserName = activeUser.id === 'renata' ? 'Rafał' : 'Renata';
    let html = `
      <div class="day-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <h3 style="margin:0">${formatDatePL(dateStr)}</h3>
        <span class="day-total" style="font-size:16px;font-weight:700;color:var(--accent,#4A6150)">0 kcal</span>
      </div>
      <div class="day-progress" style="display:flex;justify-content:space-between;align-items:center;padding:6px 12px;background:#F5F8F5;border-radius:12px;margin-bottom:12px;font-size:12px;color:#4F5E53">
        <span>Cel: <strong>${dailyGoal} kcal</strong></span>
        <span id="day-remaining">pozostało: — kcal</span>
      </div>`;
    
    plan.meals.forEach((m, idx) => {
      const kcal = m[userKey] ? (m[userKey].kcal || 0) : 0;
      const protein = m[userKey] ? (m[userKey].protein || 0) : 0;
      const fat = m[userKey] ? (m[userKey].fat || 0) : 0;
      const carbs = m[userKey] ? (m[userKey].carbs || 0) : 0;
      totalActive += kcal;
      totalProtein += protein;
      totalFat += fat;
      totalCarbs += carbs;

      const timeLabel = m.time || (m.category === 'breakfast' ? 'ŚNIADANIE' : m.category === 'lunch' ? 'OBIAD' : m.category === 'dinner' ? 'WIECZERZA' : 'POSIŁEK');
      const whomClass = m.shared ? 'shared' : (m.forUser || 'renata');
      const isShared = m.shared;
      // Get macros for the other person when shared
      const otherUserKey = activeUser.id === 'renata' ? 'husband' : 'renata';
      const otherKcal = isShared && m[otherUserKey] ? (m[otherUserKey].kcal || 0) : 0;
      const otherProtein = isShared && m[otherUserKey] ? (m[otherUserKey].protein || 0) : 0;
      const otherFat = isShared && m[otherUserKey] ? (m[otherUserKey].fat || 0) : 0;
      const otherCarbs = isShared && m[otherUserKey] ? (m[otherUserKey].carbs || 0) : 0;
      totalOtherKcal += otherKcal;
      totalOtherProtein += otherProtein;
      totalOtherFat += otherFat;
      totalOtherCarbs += otherCarbs;
      // Look up recipe portions for shared mode
      const allRecipes = [...MEAL_DB.breakfast, ...MEAL_DB.lunch, ...MEAL_DB.dinner];
      const foundRecipe = allRecipes.find(r => r.id === m.recipeId);
      const recipePortions = foundRecipe ? { renata: foundRecipe.renata_portion || 1, husband: foundRecipe.husband_portion || 1 } : null;
      html += `
        <div class="meal-card ${whomClass}" style="margin-bottom:8px;padding:12px;border:1px solid #E0E8E0;border-radius:16px;background:#FFFFFF">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
            <div style="font-size:13px;font-weight:700;color:#4A6150;text-transform:uppercase;letter-spacing:0.5px;font-family:'Cinzel',serif">${timeLabel}</div>
            <div style="display:flex;gap:4px">
              <button class="btn-sm" onclick="app.mealplan.toggleShared('${dateStr}', ${idx})" style="padding:3px 8px;font-size:11px;background:${isShared ? '#D6E8D6' : 'transparent'};border:1px solid ${isShared ? '#7DA08A' : '#C8D0C8'};border-radius:8px;cursor:pointer;color:#4F5E53" title="Gotuj ${isShared ? 'z Rafałem' : 'sam(a)'}">${isShared ? '👫' : '👤'}</button>
              <button class="btn-sm" onclick="app.mealplan.swapMeal('${dateStr}', '${m.recipeId}', '${m.category}')" style="padding:3px 10px;font-size:11px;background:transparent;border:none;cursor:pointer">🔄</button>
              <button class="btn-sm" onclick="app.mealplan.deleteMeal('${dateStr}', ${idx})" style="padding:3px 8px;font-size:11px;background:transparent;border:none;cursor:pointer;color:#C07060" title="Usuń posiłek">✕</button>
            </div>
          </div>
          <div style="font-size:15px;font-weight:600;color:#1F2621;margin-bottom:6px">${m.name}</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <span style="font-size:11px;font-weight:600;color:#4F5E53;margin-right:2px">${activeUser.name}:</span>
            <span style="font-size:11px;font-weight:700;color:#C47050;background:#FFF5F0;padding:2px 8px;border-radius:10px">${kcal} kcal</span>
            <span style="font-size:10px;color:#4F5E53;background:#F0F5F0;padding:2px 8px;border-radius:8px">B ${protein}g</span>
            <span style="font-size:10px;color:#4F5E53;background:#F0F5F0;padding:2px 8px;border-radius:8px">T ${fat}g</span>
            <span style="font-size:10px;color:#4F5E53;background:#F0F5F0;padding:2px 8px;border-radius:8px">W ${carbs}g</span>
          </div>
          ${isShared ? `
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;padding-top:6px;border-top:1px dashed #D6E0D6">
            <span style="font-size:11px;font-weight:600;color:#4F5E53;margin-right:2px">Rafał:</span>
            <span style="font-size:11px;font-weight:700;color:#C47050;background:#FFF5F0;padding:2px 8px;border-radius:10px">${otherKcal} kcal</span>
            <span style="font-size:10px;color:#4F5E53;background:#F0F5F0;padding:2px 8px;border-radius:8px">B ${otherProtein}g</span>
            <span style="font-size:10px;color:#4F5E53;background:#F0F5F0;padding:2px 8px;border-radius:8px">T ${otherFat}g</span>
            <span style="font-size:10px;color:#4F5E53;background:#F0F5F0;padding:2px 8px;border-radius:8px">W ${otherCarbs}g</span>
          </div>` : ''}
          <button class="details-toggle-btn" onclick="app.mealplan.toggleDetails('${dateStr}', ${idx})" style="width:100%;padding:6px;margin-top:6px;border:none;border-radius:8px;background:#F5F8F5;color:#68776D;font-size:11px;cursor:pointer;font-weight:500">📖 Pokaż składniki i przepis</button>
          <div id="details-${dateStr}-${idx}" style="display:none;margin-top:8px;padding:10px;background:#FAFCFA;border-radius:12px;border:1px solid #E8EFE8">
            <div style="font-size:12px;font-weight:600;color:#4F5E53;margin-bottom:6px">🛒 Składniki ${isShared ? '(razem na 2 osoby)' : ''}:</div>
            <ul style="margin:0 0 10px 0;padding-left:18px;font-size:12px;color:#4F5E53;line-height:1.7">
              ${(m.ingredients||[]).map(i => {
                if (!isShared || !recipePortions) return `<li>${i.name}${i.amount ? ' — ' + i.amount : ''}</li>`;
                const renataPortion = recipePortions.renata || 1;
                const husbandPortion = recipePortions.husband || 1;
                const totalPortions = renataPortion + husbandPortion;
                const amt = i.amount || '';
                const numMatch = amt.match(/^([\d.]+)\s*(.*)/);
                if (numMatch) {
                  const baseNum = parseFloat(numMatch[1]);
                  const unit = numMatch[2];
                  const totalNum = Math.round(baseNum * totalPortions * 10) / 10;
                  const rNum = Math.round(baseNum * renataPortion * 10) / 10;
                  const hNum = Math.round(baseNum * husbandPortion * 10) / 10;
                  return `<li>${i.name} — ${totalNum}${unit} <span style="color:#9AABA0;font-size:10px">(Renata: ${rNum}${unit}, Rafał: ${hNum}${unit})</span></li>`;
                }
                return `<li>${i.name} — ${amt}</li>`;
              }).join('')}
            </ul>
            ${isShared && recipePortions ? `
            <div style="font-size:11px;color:#4F5E53;background:#EFF5F0;padding:8px 10px;border-radius:8px;margin-bottom:8px">
              <strong>Podział:</strong> Renata ×${recipePortions.renata} · Rafał ×${recipePortions.husband}<br>
              <span style="font-size:10px">Przygotuj całość, następnie podziel według proporcji przed podaniem.</span>
            </div>` : ''}
            <div style="font-size:12px;font-weight:600;color:#4F5E53;margin-bottom:4px">👨‍🍳 Przygotowanie:</div>
            <p style="margin:0;font-size:12px;color:#68776D;line-height:1.6">${m.instructions}</p>
          </div>
        </div>`;
    });

    // Add new meal button
    html += `
      <button onclick="app.mealplan.showAddMealForm('${dateStr}')" style="width:100%;padding:12px;border:2px dashed #C8D0C8;border-radius:16px;background:transparent;color:#4F5E53;font-size:14px;font-weight:500;cursor:pointer;margin-top:4px">
        + Dodaj posiłek
      </button>`;

    // Macro summary
    const hasOther = app.data.cookTogether && app.auth.getActiveUser()?.pairedWith && totalOtherKcal > 0;
    html += `
      <div class="day-macro-summary" style="position:sticky;bottom:0;margin-top:12px;padding:12px;background:#F5F8F5;border-radius:14px 14px 0 0;border:1px solid #E0E8E0;z-index:10">
        <div style="font-size:12px;font-weight:600;color:#1F2621;margin-bottom:8px">📊 Podsumowanie makro</div>
        <div style="display:flex;gap:12px">
          <div style="flex:1;padding:8px;background:#FFF;border-radius:10px;border:1px solid #E8EFE8">
            <div style="font-size:10px;font-weight:600;color:#9AABA0;margin-bottom:4px">${activeUser.name}</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:2px;text-align:center">
              <div><div style="font-weight:700;font-size:14px;color:#C47050">${totalActive}</div><div style="font-size:9px;color:#9AABA0">kcal</div></div>
              <div><div style="font-weight:700;font-size:12px;color:#4F5E53">${totalProtein}g</div><div style="font-size:9px;color:#9AABA0">B</div></div>
              <div><div style="font-weight:700;font-size:12px;color:#4F5E53">${totalFat}g</div><div style="font-size:9px;color:#9AABA0">T</div></div>
              <div><div style="font-weight:700;font-size:12px;color:#4F5E53">${totalCarbs}g</div><div style="font-size:9px;color:#9AABA0">W</div></div>
            </div>
          </div>
          ${hasOther ? `
          <div style="flex:1;padding:8px;background:#FFF;border-radius:10px;border:1px solid #E8EFE8">
            <div style="font-size:10px;font-weight:600;color:#9AABA0;margin-bottom:4px">${otherUserName}</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:2px;text-align:center">
              <div><div style="font-weight:700;font-size:14px;color:#C47050">${totalOtherKcal}</div><div style="font-size:9px;color:#9AABA0">kcal</div></div>
              <div><div style="font-weight:700;font-size:12px;color:#4F5E53">${totalOtherProtein}g</div><div style="font-size:9px;color:#9AABA0">B</div></div>
              <div><div style="font-weight:700;font-size:12px;color:#4F5E53">${totalOtherFat}g</div><div style="font-size:9px;color:#9AABA0">T</div></div>
              <div><div style="font-weight:700;font-size:12px;color:#4F5E53">${totalOtherCarbs}g</div><div style="font-size:9px;color:#9AABA0">W</div></div>
            </div>
          </div>` : ''}
        </div>
      </div>`;

    // Update total in header and remaining
    const remaining = dailyGoal - totalActive;
    const remainingColor = remaining >= 0 ? '#4F5E53' : '#D0805C';
    html = html.replace(
      '<span class="day-total" style="font-size:16px;font-weight:700;color:var(--accent,#4A6150)">0 kcal</span>',
      `<span class="day-total" style="font-size:16px;font-weight:700;color:#4A6150">${totalActive} kcal</span>`
    );
    html = html.replace(
      '<span id="day-remaining">pozostało: — kcal</span>',
      `<span id="day-remaining" style="color:${remainingColor}">pozostało: <strong>${remaining}</strong> kcal</span>`
    );

    container.innerHTML = html;

    // If today, also update dashboard
    if (dateStr === getToday()) app.dashboard.render();
  },

  generateToday() {
    this.generateDay(getToday());
  },

  generateDay(dateStr) {
    const dbMeals = this.getAvailableMeals();
    if (dbMeals.length === 0) return;

    const meals = [];
    const cookTogether = app.data.cookTogether;
    const activeUser = app.auth.getActiveUser();
    const dailyGoal = activeUser.kcal || 1600;
    const userKey = activeUser.id === 'renata' ? 'renata' : 'husband';

    // Target per meal (3 meals: breakfast, lunch, dinner)
    const targetPerMeal = Math.round(dailyGoal / 3);

    function pickBestMeal(category, targetKcal) {
      const options = dbMeals.filter(m => m.category === category);
      if (options.length === 0) return null;

      // Score each option by how close it is to target
      let best = null;
      let bestScore = Infinity;
      const userPortion = userKey === 'renata' ? 'renata_portion' : 'husband_portion';

      options.forEach(m => {
        const portion = m[userPortion] || 1;
        const kcal = Math.round(m.macros.kcal * portion);
        const score = Math.abs(kcal - targetKcal);
        if (score < bestScore) {
          bestScore = score;
          best = m;
        }
      });

      return best;
    }

    // Pick breakfast, lunch, dinner with calorie targeting
    const bfTarget = Math.round(targetPerMeal * 0.8); // breakfast slightly lighter
    const bfPicked = pickBestMeal('breakfast', bfTarget);
    if (bfPicked) meals.push(this.makeMealEntry(bfPicked, 'breakfast', cookTogether));

    const lunTarget = Math.round(targetPerMeal * 1.2); // lunch slightly larger
    const lunPicked = pickBestMeal('lunch', lunTarget);
    if (lunPicked) meals.push(this.makeMealEntry(lunPicked, 'lunch', cookTogether));

    const dinTarget = Math.round(targetPerMeal * 1.0);
    const dinPicked = pickBestMeal('dinner', dinTarget);
    if (dinPicked) meals.push(this.makeMealEntry(dinPicked, 'dinner', cookTogether));

    app.data.mealPlan[dateStr] = { date: dateStr, meals };
    Store.save(app.data);
    this.renderDay(dateStr);
    if (dateStr === getToday()) app.dashboard.render();
  },

  generateWeek() {
    const dates = getWeekDates();
    dates.forEach(d => this.generateDay(d));
    this.render();
  },

  getAvailableMeals() {
    const all = [...MEAL_DB.breakfast, ...MEAL_DB.lunch, ...MEAL_DB.dinner];
    const appliances = app.data.appliances || [];
    const cookTogether = app.data.cookTogether;
    
    return all.filter(m => {
      if (m.appliances.length > 0) {
        return m.appliances.every(a => appliances.includes(a));
      }
      return true;
    });
  },

  makeMealEntry(recipe, category, shared = true) {
    const entry = {
      recipeId: recipe.id,
      name: recipe.name,
      time: recipe.time,
      category: category,
      tags: recipe.tags || [],
      shared: shared,
      instructions: recipe.instructions,
      ingredients: recipe.ingredients || []
    };

    if (shared) {
      entry.renata = calcMacros(recipe, 'renata');
      entry.husband = calcMacros(recipe, 'husband');
    } else {
      entry.renata = calcMacros(recipe, 'renata');
    }

    return entry;
  },

  showMealDetail(recipeId) {
    const all = [...MEAL_DB.breakfast, ...MEAL_DB.lunch, ...MEAL_DB.dinner];
    const recipe = all.find(m => m.id === recipeId);
    if (!recipe) return;

    let appliancesHtml = '';
    if (recipe.appliances.includes('airfryer')) appliancesHtml += '<span class="meal-tag airfryer">🔥 Air Fryer</span> ';
    if (recipe.appliances.includes('thermomix')) appliancesHtml += '<span class="meal-tag tm6">⚙️ Thermomix TM6</span>';

    app.ui.openModal(recipe.name, `
      <div class="text-muted" style="margin-bottom:12px">${appliancesHtml}</div>
      <h4 style="margin-bottom:8px">Składniki na 1 porcję (Renata):</h4>
      <ul style="margin-bottom:12px;padding-left:20px;color:var(--muted)">
        ${recipe.ingredients.map(i => `<li>${i.name}${i.amount ? ' — <strong>' + i.amount + '</strong>' : ''}</li>`).join('')}
      </ul>
      <h4 style="margin-bottom:8px">Przepis:</h4>
      <p style="color:var(--muted);line-height:1.6">${recipe.instructions}</p>
      <h4 style="margin:12px 0 8px">Makro na porcję:</h4>
      <table style="width:100%;color:var(--muted);font-size:13px">
        <tr><td></td><td style="color:var(--accent)">Renata</td><td style="color:var(--blue)">Mąż</td></tr>
        <tr><td>Kalorie</td><td style="color:var(--accent)">${Math.round(recipe.macros.kcal * (recipe.renata_portion||1))}</td><td style="color:var(--blue)">${Math.round(recipe.macros.kcal * (recipe.husband_portion||1))}</td></tr>
        <tr><td>Białko</td><td style="color:var(--accent)">${Math.round(recipe.macros.protein * (recipe.renata_portion||1))}g</td><td style="color:var(--blue)">${Math.round(recipe.macros.protein * (recipe.husband_portion||1))}g</td></tr>
        <tr><td>Tłuszcz</td><td style="color:var(--accent)">${Math.round(recipe.macros.fat * (recipe.renata_portion||1))}g</td><td style="color:var(--blue)">${Math.round(recipe.macros.fat * (recipe.husband_portion||1))}g</td></tr>
        <tr><td>Węglowodany</td><td style="color:var(--accent)">${Math.round(recipe.macros.carbs * (recipe.renata_portion||1))}g</td><td style="color:var(--blue)">${Math.round(recipe.macros.carbs * (recipe.husband_portion||1))}g</td></tr>
        <tr><td>Błonnik</td><td style="color:var(--accent)">${Math.round(recipe.macros.fiber * (recipe.renata_portion||1))}g</td><td style="color:var(--blue)">${Math.round(recipe.macros.fiber * (recipe.husband_portion||1))}g</td></tr>
      </table>
    `);
  },

  swapMeal(dateStr, currentRecipeId, category) {
    const all = [...MEAL_DB.breakfast, ...MEAL_DB.lunch, ...MEAL_DB.dinner];
    const appliances = app.data.appliances || [];
    
    const options = all.filter(m => 
      m.category === category && 
      m.id !== currentRecipeId &&
      (m.appliances.length === 0 || m.appliances.every(a => appliances.includes(a)))
    );

    if (options.length === 0) {
      app.ui.openModal('Zamień posiłek', `<p class="text-muted">Brak innych opcji dla tej kategorii.</p>`);
      return;
    }

    const pageSize = 5;
    let currentPage = 0;
    const totalPages = Math.ceil(options.length / pageSize);

    function renderPage(page) {
      const start = page * pageSize;
      const end = Math.min(start + pageSize, options.length);
      const pageOptions = options.slice(start, end);

      let html = `<p class="text-muted" style="margin-bottom:10px">Strona ${page+1} z ${totalPages} (${options.length} zamienników):</p>`;
      
      pageOptions.forEach(m => {
        const macrosR = calcMacros(m, 'renata');
        const macrosH = calcMacros(m, 'husband');
        const tags = m.tags.join(', ');
        html += `
          <div class="meal-card shared" style="margin-bottom:10px;padding:12px;border:1px solid #E0E8E0;border-radius:16px;background:#FFFFFF">
            <div style="font-weight:600;font-size:14px;margin-bottom:4px">${m.name}</div>
            <div class="meal-macros" style="margin-bottom:6px">
              <span class="meal-macro" style="font-size:10px;display:block;color:#4F5E53">Renata: ${macrosR.kcal}kcal · B${macrosR.protein}g · T${macrosR.fat}g · W${macrosR.carbs}g</span>
              <span class="meal-macro" style="font-size:10px;display:block;color:#4F5E53">Rafał: ${macrosH.kcal}kcal · B${macrosH.protein}g · T${macrosH.fat}g · W${macrosH.carbs}g</span>
            </div>
            ${tags ? `<div class="text-muted" style="font-size:10px;margin-bottom:6px">${tags}</div>` : ''}
            <div style="display:flex;gap:6px">
              <button onclick="app.mealplan.applySwap('${dateStr}', '${currentRecipeId}', '${m.id}', true)" style="flex:1;padding:8px;border:none;border-radius:12px;background:linear-gradient(135deg,#7DA08A,#4F735C);color:#FFFFFF;font-size:13px;font-weight:600;cursor:pointer">✓ Wybierz</button>
              <button onclick="app.mealplan.showRecipeDetail('${m.id}', '${dateStr}', '${currentRecipeId}')" style="flex:1;padding:8px;border:1px solid #C8D0C8;border-radius:12px;background:#F5F8F5;color:#4F5E53;font-size:13px;font-weight:500;cursor:pointer">👁 Zobacz</button>
            </div>
          </div>`;
      });

      // Pagination controls
      if (totalPages > 1) {
        html += `<div style="display:flex;gap:8px;justify-content:center;margin-top:8px">`;
        if (page > 0) {
          html += `<button onclick="app.mealplan._swapPage('${dateStr}', '${currentRecipeId}', '${category}', ${page-1})" style="flex:1;padding:8px;border:1px solid #C8D0C8;border-radius:12px;background:#F5F8F5;color:#4F5E53;font-size:13px;cursor:pointer;font-weight:500">← Poprzednie</button>`;
        }
        if (page < totalPages - 1) {
          html += `<button onclick="app.mealplan._swapPage('${dateStr}', '${currentRecipeId}', '${category}', ${page+1})" style="flex:1;padding:8px;border:1px solid #C8D0C8;border-radius:12px;background:#F5F8F5;color:#4F5E53;font-size:13px;cursor:pointer;font-weight:500">Następne →</button>`;
        }
        html += `</div>`;
      }

      // Store page state and update modal
      app.mealplan._swapState = { dateStr, currentRecipeId, category, page: page };
      const modalBody = document.getElementById('modal-body');
      if (modalBody) modalBody.innerHTML = html;
    }

    app.ui.openModal('🔄 Zamiana posiłku', '<p style="text-align:center;color:#68776D">Ładowanie...</p>');
    renderPage(0);
  },

  _swapPage(dateStr, currentRecipeId, category, page) {
    const all = [...MEAL_DB.breakfast, ...MEAL_DB.lunch, ...MEAL_DB.dinner];
    const appliances = app.data.appliances || [];
    const options = all.filter(m => 
      m.category === category && 
      m.id !== currentRecipeId &&
      (m.appliances.length === 0 || m.appliances.every(a => appliances.includes(a)))
    );

    const pageSize = 5;
    const pageOptions = options.slice(page * pageSize, Math.min((page + 1) * pageSize, options.length));
    const totalPages = Math.ceil(options.length / pageSize);

    let html = `<p class="text-muted" style="margin-bottom:10px">Strona ${page+1} z ${totalPages} (${options.length} zamienników):</p>`;
    
    pageOptions.forEach(m => {
      const macrosR = calcMacros(m, 'renata');
      const macrosH = calcMacros(m, 'husband');
      const tags = m.tags.join(', ');
      html += `
        <div class="meal-card shared" style="margin-bottom:10px;padding:12px;border:1px solid #E0E8E0;border-radius:16px;background:#FFFFFF">
          <div style="font-weight:600;font-size:14px;margin-bottom:4px">${m.name}</div>
          <div class="meal-macros" style="margin-bottom:6px">
            <span class="meal-macro" style="font-size:10px;display:block;color:#4F5E53">Renata: ${macrosR.kcal}kcal · B${macrosR.protein}g · T${macrosR.fat}g · W${macrosR.carbs}g</span>
            <span class="meal-macro" style="font-size:10px;display:block;color:#4F5E53">Rafał: ${macrosH.kcal}kcal · B${macrosH.protein}g · T${macrosH.fat}g · W${macrosH.carbs}g</span>
          </div>
          ${tags ? `<div class="text-muted" style="font-size:10px;margin-bottom:6px">${tags}</div>` : ''}
          <div style="display:flex;gap:6px">
            <button onclick="app.mealplan.applySwap('${dateStr}', '${currentRecipeId}', '${m.id}', true)" style="flex:1;padding:8px;border:none;border-radius:12px;background:linear-gradient(135deg,#7DA08A,#4F735C);color:#FFFFFF;font-size:13px;font-weight:600;cursor:pointer">✓ Wybierz</button>
            <button onclick="app.mealplan.showRecipeDetail('${m.id}', '${dateStr}', '${currentRecipeId}')" style="flex:1;padding:8px;border:1px solid #C8D0C8;border-radius:12px;background:#F5F8F5;color:#4F5E53;font-size:13px;font-weight:500;cursor:pointer">👁 Zobacz</button>
          </div>
        </div>`;
    });

    if (totalPages > 1) {
      html += `<div style="display:flex;gap:8px;justify-content:center;margin-top:8px">`;
      if (page > 0) {
        html += `<button onclick="app.mealplan._swapPage('${dateStr}', '${currentRecipeId}', '${category}', ${page-1})" style="flex:1;padding:8px;border:1px solid #C8D0C8;border-radius:12px;background:#F5F8F5;color:#4F5E53;font-size:13px;cursor:pointer;font-weight:500">← Poprzednie</button>`;
      }
      if (page < totalPages - 1) {
        html += `<button onclick="app.mealplan._swapPage('${dateStr}', '${currentRecipeId}', '${category}', ${page+1})" style="flex:1;padding:8px;border:1px solid #C8D0C8;border-radius:12px;background:#F5F8F5;color:#4F5E53;font-size:13px;cursor:pointer;font-weight:500">Następne →</button>`;
      }
      html += `</div>`;
    }

    const modalBody = document.getElementById('modal-body');
    if (modalBody) modalBody.innerHTML = html;
  },

  showRecipeDetail(recipeId, dateStr, currentRecipeId) {
    const all = [...MEAL_DB.breakfast, ...MEAL_DB.lunch, ...MEAL_DB.dinner];
    const recipe = all.find(m => m.id === recipeId);
    if (!recipe) return;

    let appliancesHtml = '';
    if (recipe.appliances.includes('airfryer')) appliancesHtml += '<span class="meal-tag airfryer">🔥 Air Fryer</span> ';
    if (recipe.appliances.includes('thermomix')) appliancesHtml += '<span class="meal-tag tm6">⚙️ Thermomix TM6</span>';

    const macrosR = calcMacros(recipe, 'renata');
    const macrosH = calcMacros(recipe, 'husband');

    app.ui.openModal(recipe.name, `
      <div style="margin-bottom:10px">${appliancesHtml}</div>
      
      <h4 style="margin-bottom:6px;font-size:13px;color:#1F2621">📊 Makro na porcję</h4>
      <table style="width:100%;font-size:11px;margin-bottom:12px;border-collapse:collapse">
        <tr style="border-bottom:1px solid #E8EDE8"><td></td><td style="color:#728E7C;font-weight:600;padding:2px 4px">Renata</td><td style="color:#5297C7;font-weight:600;padding:2px 4px">Rafał</td></tr>
        <tr><td style="padding:2px 4px">Kalorie</td><td style="padding:2px 4px">${macrosR.kcal}</td><td style="padding:2px 4px">${macrosH.kcal}</td></tr>
        <tr><td style="padding:2px 4px">Białko</td><td style="padding:2px 4px">${macrosR.protein}g</td><td style="padding:2px 4px">${macrosH.protein}g</td></tr>
        <tr><td style="padding:2px 4px">Tłuszcz</td><td style="padding:2px 4px">${macrosR.fat}g</td><td style="padding:2px 4px">${macrosH.fat}g</td></tr>
        <tr><td style="padding:2px 4px">Węglowodany</td><td style="padding:2px 4px">${macrosR.carbs}g</td><td style="padding:2px 4px">${macrosH.carbs}g</td></tr>
        <tr style="border-bottom:1px solid #E8EDE8"><td style="padding:2px 4px">Błonnik</td><td style="padding:2px 4px">${macrosR.fiber}g</td><td style="padding:2px 4px">${macrosH.fiber}g</td></tr>
      </table>

      <h4 style="margin-bottom:4px;font-size:13px;color:#1F2621">🛒 Składniki</h4>
      <ul style="margin-bottom:10px;padding-left:18px;font-size:12px;color:#4F5E53">
        ${recipe.ingredients.map(i => `<li>${i.name}${i.amount ? ' — <strong>' + i.amount + '</strong>' : ''}</li>`).join('')}
      </ul>

      <h4 style="margin-bottom:4px;font-size:13px;color:#1F2621">👨‍🍳 Przygotowanie</h4>
      <p style="font-size:12px;color:#4F5E53;line-height:1.6;margin-bottom:12px">${recipe.instructions}</p>

      <div style="display:flex;flex-direction:column;gap:6px">
        <button onclick="app.mealplan.addToShoppingList('${recipeId}'); app.ui.closeModal(); app.mealplan.swapMeal('${dateStr}', '${currentRecipeId}', '${recipe.category}')" style="width:100%;padding:10px;border:1px solid #C8D0C8;border-radius:12px;background:#F5F8F5;color:#4F5E53;font-size:13px;font-weight:600;cursor:pointer">🛒 Dodaj do listy zakupów</button>
        <button onclick="app.mealplan.applySwap('${dateStr}', '${currentRecipeId}', '${recipeId}', true)" style="width:100%;padding:10px;border:none;border-radius:12px;background:linear-gradient(135deg,#7DA08A,#4F735C);color:#FFFFFF;font-size:13px;font-weight:600;cursor:pointer">✓ Wybierz ten posiłek</button>
      </div>
    `);
  },

  addToShoppingList(recipeId) {
    const all = [...MEAL_DB.breakfast, ...MEAL_DB.lunch, ...MEAL_DB.dinner];
    const recipe = all.find(m => m.id === recipeId);
    if (!recipe) return;

    if (!app.data.pantry) app.data.pantry = [];

    const existingNames = new Set(app.data.pantry.map(i => i.name.toLowerCase().trim()));

    recipe.ingredients.forEach(ingredient => {
      const name = ingredient.name ? ingredient.name.trim() : String(ingredient).trim();
      const nameLower = name.toLowerCase();
      if (!existingNames.has(nameLower)) {
        // Determine category based on common keywords
        let category = 'inne';
        const proteinKeywords = ['kurczak', 'łosoś', 'tuńczyk', 'tofu', 'jajka', 'jajko', 'ser', 'twaróg', 'feta', 'mięso', 'wołowina', 'wieprzowina'];
        const dairyKeywords = ['mleko', 'jogurt', 'śmietana', 'masło', 'mleko kokosowe'];
        const vegKeywords = ['brokuł', 'ziemniak', 'batat', 'cebula', 'czosnek', 'pomidor', 'szpinak', 'sałata', 'ogórek', 'rzodkiewka', 'papryka', 'cukinia', 'marchew', 'kapusta', 'awokado'];
        const carbKeywords = ['chleb', 'kasza', 'ryż', 'makaron', 'mąka'];
        const fatKeywords = ['oliwa', 'olej', 'orzech'];
        const spiceKeywords = ['sól', 'pieprz', 'kurkuma', 'kumin', 'curry', 'cynamon', 'imbir', 'oregano', 'koperek', 'szczypiorek'];

        if (proteinKeywords.some(k => nameLower.includes(k))) category = 'białko';
        else if (dairyKeywords.some(k => nameLower.includes(k))) category = 'nabiał';
        else if (vegKeywords.some(k => nameLower.includes(k))) category = 'warzywa';
        else if (carbKeywords.some(k => nameLower.includes(k))) category = 'węglowodany';
        else if (fatKeywords.some(k => nameLower.includes(k))) category = 'tłuszcze';
        else if (spiceKeywords.some(k => nameLower.includes(k))) category = 'przyprawy';

        app.data.pantry.push({
          id: 'shop_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
          name: name.charAt(0).toUpperCase() + name.slice(1),
          category: category,
          qty: '',
          emoji: '',
          inStock: true
        });
        existingNames.add(nameLower);
      }
    });

    Store.save(app.data);
    app.ui.showToast('🛒 Dodano składniki do listy zakupów!');
  },

  applySwap(dateStr, oldRecipeId, newRecipeId) {
    const plan = app.data.mealPlan[dateStr];
    if (!plan) return;

    const all = [...MEAL_DB.breakfast, ...MEAL_DB.lunch, ...MEAL_DB.dinner];
    const newRecipe = all.find(m => m.id === newRecipeId);
    if (!newRecipe) return;

    const idx = plan.meals.findIndex(m => m.recipeId === oldRecipeId);
    if (idx === -1) return;

    const shared = plan.meals[idx].shared;
    plan.meals[idx] = this.makeMealEntry(newRecipe, newRecipe.category, shared);
    
    Store.save(app.data);
    app.ui.closeModal();
    this.renderDay(dateStr);
    if (dateStr === getToday()) app.dashboard.render();
  },

  showAddMealForm(dateStr) {
    const mealTypes = [
      { value: 'breakfast', label: 'Śniadanie' },
      { value: 'lunch', label: 'Obiad' },
      { value: 'dinner', label: 'Kolacja' },
      { value: 'snack', label: 'Przekąska' },
      { value: 'other', label: 'Inne' }
    ];
    const categoryOptions = [
      { value: 'inne', label: 'Inne' },
      { value: 'wegetariańskie', label: 'Wegetariańskie' },
      { value: 'białkowe', label: 'Białkowe' },
      { value: 'przekąski', label: 'Przekąski' },
      { value: 'wegańskie', label: 'Wegańskie' },
      { value: 'bezglutenowe', label: 'Bezglutenowe' },
      { value: 'niskowęglowodanowe', label: 'Niskowęglowodanowe' }
    ];

    app.ui.openModal('+ Dodaj posiłek', `
      <div style="display:flex;flex-direction:column;gap:10px">
        <div>
          <label style="font-size:12px;font-weight:600;color:#1F2621;display:block;margin-bottom:3px">Rodzaj posiłku</label>
          <select id="addmeal-type" style="width:100%;padding:10px;border:1px solid #D0D8D0;border-radius:12px;font-size:13px;font-family:inherit;background:#FAF8F2">
            ${mealTypes.map(t => `<option value="${t.value}">${t.label}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:#1F2621;display:block;margin-bottom:3px">Kategoria</label>
          <select id="addmeal-category" style="width:100%;padding:10px;border:1px solid #D0D8D0;border-radius:12px;font-size:13px;font-family:inherit;background:#FAF8F2">
            ${categoryOptions.map(c => `<option value="${c.value}">${c.label}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:#1F2621;display:block;margin-bottom:3px">Nazwa potrawy</label>
          <input type="text" id="addmeal-name" placeholder="np. Koktajl białkowy" style="width:100%;padding:10px;border:1px solid #D0D8D0;border-radius:12px;font-size:13px;font-family:inherit;box-sizing:border-box;background:#FAF8F2">
        </div>
        <div style="display:flex;gap:8px">
          <div style="flex:1">
            <label style="font-size:12px;font-weight:600;color:#1F2621;display:block;margin-bottom:3px">Kalorie (kcal)</label>
            <input type="number" id="addmeal-kcal" placeholder="np. 350" min="0" style="width:100%;padding:10px;border:1px solid #D0D8D0;border-radius:12px;font-size:13px;font-family:inherit;box-sizing:border-box;background:#FAF8F2">
          </div>
          <div style="flex:1">
            <label style="font-size:12px;font-weight:600;color:#1F2621;display:block;margin-bottom:3px">Białko (g)</label>
            <input type="number" id="addmeal-protein" placeholder="np. 20" min="0" style="width:100%;padding:10px;border:1px solid #D0D8D0;border-radius:12px;font-size:13px;font-family:inherit;box-sizing:border-box;background:#FAF8F2">
          </div>
        </div>
        <div style="display:flex;gap:8px">
          <div style="flex:1">
            <label style="font-size:12px;font-weight:600;color:#1F2621;display:block;margin-bottom:3px">Tłuszcz (g)</label>
            <input type="number" id="addmeal-fat" placeholder="np. 12" min="0" style="width:100%;padding:10px;border:1px solid #D0D8D0;border-radius:12px;font-size:13px;font-family:inherit;box-sizing:border-box;background:#FAF8F2">
          </div>
          <div style="flex:1">
            <label style="font-size:12px;font-weight:600;color:#1F2621;display:block;margin-bottom:3px">Węglowodany (g)</label>
            <input type="number" id="addmeal-carbs" placeholder="np. 30" min="0" style="width:100%;padding:10px;border:1px solid #D0D8D0;border-radius:12px;font-size:13px;font-family:inherit;box-sizing:border-box;background:#FAF8F2">
          </div>
        </div>
        <button onclick="app.mealplan.addCustomMeal('${dateStr}')" style="width:100%;padding:12px;border:none;border-radius:14px;background:linear-gradient(135deg,#7DA08A,#4F735C);color:#FFFFFF;font-size:15px;font-weight:600;cursor:pointer;margin-top:4px">✓ Dodaj posiłek</button>
      </div>
    `);
  },

  addCustomMeal(dateStr) {
    const mealType = document.getElementById('addmeal-type').value;
    const category = document.getElementById('addmeal-category').value;
    const name = document.getElementById('addmeal-name').value.trim();
    const kcal = parseInt(document.getElementById('addmeal-kcal').value) || 0;
    const protein = parseInt(document.getElementById('addmeal-protein').value) || 0;
    const fat = parseInt(document.getElementById('addmeal-fat').value) || 0;
    const carbs = parseInt(document.getElementById('addmeal-carbs').value) || 0;

    if (!name || kcal === 0) {
      app.ui.showToast('Podaj nazwę i kaloryczność posiłku');
      return;
    }

    const timeLabels = {
      breakfast: 'Śniadanie',
      lunch: 'Obiad',
      dinner: 'Kolacja',
      snack: 'Przekąska',
      other: 'Posiłek'
    };
    const timeHours = {
      breakfast: '(8:00)',
      lunch: '(14:00)',
      dinner: '(20:00)',
      snack: '',
      other: ''
    };

    const customMeal = {
      recipeId: 'custom_' + Date.now(),
      name: name + (category !== 'inne' ? ` (${category})` : ''),
      time: `${timeLabels[mealType] || 'Posiłek'} ${timeHours[mealType] || ''}`,
      category: mealType,
      tags: category !== 'inne' ? [category] : [],
      shared: true,
      renata: { kcal, protein, fat, carbs, fiber: 0 },
      husband: { kcal: Math.round(kcal * 1.4), protein: Math.round(protein * 1.4), fat: Math.round(fat * 1.4), carbs: Math.round(carbs * 1.4), fiber: 0 },
      isCustom: true
    };

    if (!app.data.mealPlan[dateStr]) {
      app.data.mealPlan[dateStr] = { date: dateStr, meals: [] };
    }
    app.data.mealPlan[dateStr].meals.push(customMeal);
    Store.save(app.data);
    app.ui.closeModal();
    this.renderDay(dateStr);
    if (dateStr === getToday()) app.dashboard.render();
    app.ui.showToast('✓ Dodano: ' + name);
  },

  toggleDetails(dateStr, mealIdx) {
    const el = document.getElementById('details-' + dateStr + '-' + mealIdx);
    if (!el) return;
    const isHidden = el.style.display === 'none';
    el.style.display = isHidden ? 'block' : 'none';
    const btn = el.parentElement.querySelector('.details-toggle-btn');
    if (btn) btn.textContent = isHidden ? '📖 Ukryj składniki i przepis' : '📖 Pokaż składniki i przepis';
  },

  toggleShared(dateStr, mealIdx) {
    const plan = app.data.mealPlan[dateStr];
    if (!plan || !plan.meals[mealIdx]) return;
    const meal = plan.meals[mealIdx];
    meal.shared = !meal.shared;
    Store.save(app.data);
    this.renderDay(dateStr);
    if (dateStr === getToday()) app.dashboard.render();
  },

  deleteMeal(dateStr, mealIdx) {
    const plan = app.data.mealPlan[dateStr];
    if (!plan || !plan.meals[mealIdx]) return;
    const mealName = plan.meals[mealIdx].name;
    plan.meals.splice(mealIdx, 1);
    Store.save(app.data);
    this.renderDay(dateStr);
    if (dateStr === getToday()) app.dashboard.render();
    app.ui.showToast('✕ Usunięto: ' + mealName);
  }
};

// --- RECIPES ---
app.recipes = {
  currentFilter: 'all',
  subFilter: null,

  render() {
    this.renderFilters();
    this.renderList();
  },

  renderFilters() {
    const container = document.getElementById('recipe-categories');
    const all = [...MEAL_DB.breakfast, ...MEAL_DB.lunch, ...MEAL_DB.dinner];

    // Collect all unique tags
    const allTags = new Set();
    all.forEach(r => (r.tags || []).forEach(t => allTags.add(t)));
    const appliances = app.data.appliances || [];
    const activeAppliances = appliances.filter(a => all.some(r => (r.appliances||[]).includes(a)));

    let html = '<div style="margin-bottom:10px">';
    
    // Main category pills
    html += '<div style="font-size:10px;font-weight:600;color:#9AABA0;margin-bottom:6px;text-transform:uppercase;letter-spacing:1px">Posiłek</div>';
    html += '<div class="filter-bar">';
    html += `<button class="filter-btn ${this.currentFilter === 'all' ? 'active' : ''}" onclick="app.recipes.setFilter('all')">Wszystkie</button>`;
    const catLabels = { breakfast: 'Śniadania', lunch: 'Obiady', dinner: 'Kolacje' };
    const allCats = [...new Set(all.map(r => r.category))];
    allCats.forEach(c => {
      html += `<button class="filter-btn ${this.currentFilter === c ? 'active' : ''}" onclick="app.recipes.setFilter('${c}')">${catLabels[c] || c}</button>`;
    });
    html += '</div>';

    // Appliance filters
    if (activeAppliances.length > 0) {
      html += '<div style="font-size:10px;font-weight:600;color:#9AABA0;margin:8px 0 6px;text-transform:uppercase;letter-spacing:1px">Sprzęt</div>';
      html += '<div class="filter-bar">';
      const applianceLabels = { airfryer: '🔥 Air Fryer', thermomix: '⚙️ TM6', lidlomix: '⚙️ Lidlomix', piekarnik: '🔥 Piekarnik', blender: '🔄 Blender', parowar: '♨️ Parowar', grill: '🍖 Grill', slowcooker: '🍲 Slow Cooker', gofrownica: '🧇 Gofrownica', mikrofalowka: '📡 Mikrofalówka', kuchenka: '🔥 Kuchenka', robot: '⚙️ Robot' };
      activeAppliances.forEach(a => {
        html += `<button class="filter-btn ${this.currentFilter === a ? 'active' : ''}" onclick="app.recipes.setFilter('${a}')">${applianceLabels[a] || a}</button>`;
      });
      html += '</div>';
    }

    // Dietary tags (only when a main filter is active)
    if (this.currentFilter !== 'all') {
      html += '<div style="font-size:10px;font-weight:600;color:#9AABA0;margin:8px 0 6px;text-transform:uppercase;letter-spacing:1px">Kategoria</div>';
      html += '<div class="filter-bar" style="flex-wrap:wrap">';
      [...allTags].forEach(t => {
        const active = this.subFilter === t;
        html += `<button class="filter-btn ${active ? 'active' : ''}" onclick="app.recipes.setSubFilter('${t}')">${t}</button>`;
      });
      if (this.subFilter) {
        html += `<button class="filter-btn" onclick="app.recipes.setSubFilter(null)" style="color:#C07060">✕ Wyczyść</button>`;
      }
      html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
  },

  setFilter(filterId) {
    this.currentFilter = filterId;
    this.subFilter = null;
    this.render();
  },

  setSubFilter(tag) {
    this.subFilter = this.subFilter === tag ? null : tag;
    this.render();
  },

  renderList() {
    const container = document.getElementById('recipe-list');
    const all = [...MEAL_DB.breakfast, ...MEAL_DB.lunch, ...MEAL_DB.dinner];

    let filtered = all;
    if (this.currentFilter !== 'all') {
      filtered = all.filter(r => {
        if (r.category === this.currentFilter) return true;
        if ((r.appliances || []).includes(this.currentFilter)) return true;
        return false;
      });
    }
    if (this.subFilter) {
      filtered = filtered.filter(r => (r.tags || []).includes(this.subFilter));
    }

    if (filtered.length === 0) {
      container.innerHTML = '<div class="card empty-state"><p style="color:#68776D">Brak przepisów.</p></div>';
      return;
    }

    let html = '';
    filtered.forEach(r => {
      // Build pill filters as chips on the card
      let pills = '';
      const typeLabel = { breakfast: 'Śniadania', lunch: 'Obiady', dinner: 'Kolacje' }[r.category] || r.category;
      const appLabels = { airfryer: 'Air Fryer', thermomix: 'TM6', lidlomix: 'Lidlomix', piekarnik: 'Piekarnik', blender: 'Blender', parowar: 'Parowar', grill: 'Grill', slowcooker: 'Slow Cooker', mikrofalowka: 'Mikrofalówka', kuchenka: 'Kuchenka', robot: 'Robot' };
      (r.appliances || []).forEach(a => {
        if (app.data.appliances?.includes(a)) {
          pills += `<span class="meal-tag ${a}" onclick="app.recipes.setFilter('${a}')" style="cursor:pointer">${appLabels[a] || a}</span>`;
        }
      });
      (r.tags || []).forEach(t => {
        if (!Object.keys(appLabels).includes(t)) {
          pills += `<span class="meal-tag" onclick="app.recipes.setSubFilter('${t}')" style="cursor:pointer">${t}</span>`;
        }
      });

      const macrosR = calcMacros(r, 'renata');
      const macrosH = calcMacros(r, 'husband');

      html += `
        <div class="card meal-card" style="margin-bottom:10px;cursor:pointer" onclick="app.recipes.showDetail('${r.id}')">
          <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px">${pills}</div>
          <div class="meal-name">${r.name}</div>
          <div class="meal-macros">
            <span class="meal-macro">Renata: 🔥${macrosR.kcal}kcal | B${macrosR.protein}g T${macrosR.fat}g W${macrosR.carbs}g</span>
            <span class="meal-macro">Rafał: 🔥${macrosH.kcal}kcal | B${macrosH.protein}g T${macrosH.fat}g W${macrosH.carbs}g</span>
          </div>
        </div>`;
    });
    container.innerHTML = html;
  },

  showDetail(recipeId) {
    const all = [...MEAL_DB.breakfast, ...MEAL_DB.lunch, ...MEAL_DB.dinner];
    const r = all.find(x => x.id === recipeId);
    if (!r) return;

    let tags = '';
    r.tags.forEach(t => {
      if (t === 'airfryer') tags += '<span class="meal-tag airfryer">🔥 Air Fryer</span> ';
      else if (t === 'thermomix') tags += '<span class="meal-tag tm6">⚙️ TM6</span> ';
      else tags += `<span class="meal-tag">${t}</span> `;
    });

    const macrosR = calcMacros(r, 'renata');
    const macrosH = calcMacros(r, 'husband');

    app.ui.openModal(r.name, `
      <div style="margin-bottom:12px">${tags}</div>
      <h4 style="margin-bottom:6px;color:#1F2621">🥘 Sposób przygotowania:</h4>
      <p style="color:#4F5E53;line-height:1.6;margin-bottom:12px;font-size:13px">${r.instructions}</p>
      <h4 style="margin-bottom:6px;color:#1F2621">🛒 Składniki:</h4>
      <ul style="padding-left:18px;margin-bottom:12px;color:#4F5E53;font-size:13px">${r.ingredients.map(i => `<li>${i.name}${i.amount ? ' — ' + i.amount : ''}</li>`).join('')}</ul>
      <h4 style="margin-bottom:6px;color:#1F2621">📊 Makro na porcję:</h4>
      <table style="width:100%;color:#4F5E53;font-size:12px">
        <tr><td></td><td style="color:#728E7C;font-weight:600">Renata</td><td style="color:#5297C7;font-weight:600">Mąż</td></tr>
        <tr><td>Kalorie</td><td style="color:#728E7C">${macrosR.kcal}</td><td style="color:#5297C7">${macrosH.kcal}</td></tr>
        <tr><td>Białko</td><td style="color:#728E7C">${macrosR.protein}g</td><td style="color:#5297C7">${macrosH.protein}g</td></tr>
        <tr><td>Tłuszcz</td><td style="color:#728E7C">${macrosR.fat}g</td><td style="color:#5297C7">${macrosH.fat}g</td></tr>
        <tr><td>Węglowodany</td><td style="color:#728E7C">${macrosR.carbs}g</td><td style="color:#5297C7">${macrosH.carbs}g</td></tr>
        <tr><td>Błonnik</td><td style="color:#728E7C">${macrosR.fiber}g</td><td style="color:#5297C7">${macrosH.fiber}g</td></tr>
      </table>
      <button class="btn-primary" onclick="app.ui.closeModal()" style="margin-top:12px">Zamknij</button>
    `);
  }
};

// --- PANTRY ---
app.pantry = {
  render() {
    const items = app.data.pantry || [];
    const container = document.getElementById('pantry-items');
    
    if (items.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="big">🧊</div><p>Spiżarnia pusta. Dodaj produkty.</p></div>`;
      return;
    }

    const activeFilter = document.querySelector('.filter-btn.active');
    const filter = activeFilter ? activeFilter.dataset.filter : 'all';

    const filtered = filter === 'all' ? items : items.filter(i => i.category === filter);

    let html = '';
    filtered.forEach(item => {
      html += `
        <div class="pantry-item">
          <button class="delete-btn" onclick="app.pantry.remove('${item.id}')">✕</button>
          <div class="emoji">${item.emoji || '📦'}</div>
          <div class="name">${item.name}</div>
          <div class="qty">${item.qty || ''}</div>
        </div>`;
    });

    container.innerHTML = html || '<div class="empty-state"><p>Brak w tej kategorii</p></div>';
  },

  initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.render();
      });
    });
  },

  showAddForm() {
    const categories = ['białko', 'nabiał', 'warzywa', 'węglowodany', 'tłuszcze', 'przyprawy', 'inne'];
    const catOptions = categories.map(c => `<option value="${c}">${c}</option>`).join('');

    app.ui.openModal('Dodaj produkt', `
      <label>Nazwa produktu</label>
      <input type="text" id="pantry-name" placeholder="np. Pierś z kurczaka">
      <label>Kategoria</label>
      <select id="pantry-category">${catOptions}</select>
      <label>Ilość (opcjonalnie)</label>
      <input type="text" id="pantry-qty" placeholder="np. 500g, 1 opakowanie">
      <label>Emoji (opcjonalnie)</label>
      <input type="text" id="pantry-emoji" placeholder="np. 🥩" maxlength="2">
      <button class="btn-primary" onclick="app.pantry.add()">Dodaj do spiżarni</button>
    `);
  },

  add() {
    const name = document.getElementById('pantry-name').value.trim();
    if (!name) return;
    const category = document.getElementById('pantry-category').value;
    const qty = document.getElementById('pantry-qty').value.trim();
    const emoji = document.getElementById('pantry-emoji').value.trim() || '📦';

    app.data.pantry.push({
      id: 'p' + Date.now(),
      name,
      category,
      qty,
      emoji,
      inStock: true
    });
    Store.save(app.data);
    app.ui.closeModal();
    this.render();
  },

  remove(id) {
    app.data.pantry = app.data.pantry.filter(i => i.id !== id);
    Store.save(app.data);
    this.render();
  }
};

// --- ZAKUPY ---
app.zakupy = {
  render() {
    const container = document.getElementById('zakupy-list');
    const allItems = app.data.pantry || [];
    const toBuy = allItems.filter(i => i.inStock);
    const pantry = allItems.filter(i => !i.inStock);

    // Shopping list
    let html = `<h3 style="font-size:15px;font-weight:700;color:#1F2621;margin-bottom:8px">🛒 Lista zakupów</h3>`;

    if (toBuy.length === 0) {
      html += `<div class="empty-state" style="padding:20px"><p style="color:#68776D;font-size:13px">Brak produktów do kupienia.<br>Dodaj przez przycisk "Dodaj" lub z posiłków.</p></div>`;
    } else {
      const categories = [...new Set(toBuy.map(i => i.category))];
      const catLabels = { 'białko': '🥩 Białko', 'nabiał': '🧀 Nabiał', 'warzywa': '🥦 Warzywa', 'węglowodany': '🍞 Węglowodany', 'tłuszcze': '🫒 Tłuszcze', 'przyprawy': '🧂 Przyprawy', 'inne': '📦 Inne' };
      categories.forEach(cat => {
        const catItems = toBuy.filter(i => i.category === cat);
        if (catItems.length === 0) return;
        html += `<div style="margin-bottom:8px">`;
        html += `<div style="font-size:13px;font-weight:600;color:#4F5E53;margin-bottom:4px">${catLabels[cat] || cat}</div>`;
        catItems.forEach(item => {
          html += `
            <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;margin-bottom:3px;background:#FAF8F2;border-radius:12px;border:1px solid #E8EDE8">
              <input type="checkbox" id="shop-${item.id}" onchange="app.zakupy.toggle('${item.id}')" style="width:18px;height:18px;accent-color:#728E7C;cursor:pointer">
              <label for="shop-${item.id}" style="flex:1;font-size:13px;color:#1F2621;cursor:pointer">${item.name}</label>
              ${item.qty ? `<span style="font-size:11px;color:#68776D">${item.qty}</span>` : ''}
              <button onclick="app.zakupy.remove('${item.id}')" style="background:none;border:none;color:#C07060;font-size:16px;cursor:pointer;padding:2px">✕</button>
            </div>`;
        });
        html += `</div>`;
      });
    }

    // FAB and pantry badge (if items in pantry)
    const pantryCount = pantry.length;
    if (pantryCount > 0) {
      html += `<div style="text-align:center;margin-top:8px;font-size:11px;color:#8AA08E">🏪 ${pantryCount} produktów w spiżarni</div>`;
    }

    html += `
      <button id="pantry-fab" onclick="app.zakupy.openPantry()" style="position:absolute;bottom:80px;right:16px;width:56px;height:56px;border-radius:50%;border:none;background:linear-gradient(135deg,#7DA08A,#4F735C);color:#FFFFFF;font-size:24px;cursor:pointer;box-shadow:0 4px 16px rgba(79,115,92,0.35);z-index:50;display:flex;align-items:center;justify-content:center;transition:transform 0.15s">
        🧊
        ${pantryCount > 0 ? `<span style="position:absolute;top:-4px;right:-4px;background:#C47050;color:#FFF;font-size:10px;font-weight:700;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(196,112,80,0.4)">${pantryCount > 9 ? '9+' : pantryCount}</span>` : ''}
      </button>`;

    container.innerHTML = html;
  },

  openPantry() {
    const pantry = (app.data.pantry || []).filter(i => !i.inStock);

    if (pantry.length === 0) {
      app.ui.openModal('🏪 Spiżarnia', '<p style="color:#68776D;text-align:center;padding:20px">Spiżarnia pusta — odznacz produkty na liście zakupów, by je tu przenieść.</p>');
      return;
    }

    const categories = [...new Set(pantry.map(i => i.category))];
    const catLabels = { 'białko': '🥩 Białko', 'nabiał': '🧀 Nabiał', 'warzywa': '🥦 Warzywa', 'węglowodany': '🍞 Węglowodany', 'tłuszcze': '🫒 Tłuszcze', 'przyprawy': '🧂 Przyprawy', 'inne': '📦 Inne' };

    let html = `<p style="font-size:13px;color:#68776D;margin-bottom:10px">Produkty, które masz w domu:</p>`;
    categories.forEach(cat => {
      const catItems = pantry.filter(i => i.category === cat);
      if (catItems.length === 0) return;
      html += `<div style="margin-bottom:8px">`;
      html += `<div style="font-size:12px;font-weight:600;color:#4F5E53;margin-bottom:4px">${catLabels[cat] || cat}</div>`;
      catItems.forEach(item => {
        html += `
          <div style="display:flex;align-items:center;gap:8px;padding:6px 10px;margin-bottom:2px;background:#F5F8F5;border-radius:10px;font-size:12px;color:#68776D">
            <span style="flex:1">${item.name}</span>
            ${item.qty ? `<span style="font-size:10px">${item.qty}</span>` : ''}
            <button onclick="app.zakupy.moveToBuy('${item.id}'); app.ui.closeModal(); app.zakupy.render()" style="background:none;border:none;color:#728E7C;font-size:16px;cursor:pointer;padding:2px" title="Dodaj do listy zakupów">🛒</button>
            <button onclick="app.zakupy.remove('${item.id}'); app.zakupy.openPantry()" style="background:none;border:none;color:#C07060;font-size:16px;cursor:pointer;padding:2px">✕</button>
          </div>`;
      });
      html += `</div>`;
    });

    app.ui.openModal('🏪 Spiżarnia', html);
  },

  toggle(id) {
    const item = (app.data.pantry || []).find(i => i.id === id);
    if (!item) return;
    
    // Visual: check the checkbox immediately
    const checkbox = document.getElementById('shop-' + id);
    if (checkbox) checkbox.checked = true;
    
    // Brief delay before moving to pantry
    clearTimeout(item._toggleTimer);
    item._toggleTimer = setTimeout(() => {
      item.inStock = false;
      Store.save(app.data);
      this.render();
      
      // Flash the FAB to signal connection
      const fab = document.getElementById('pantry-fab');
      if (fab) {
        fab.style.transition = 'transform 0.15s, box-shadow 0.15s';
        fab.style.transform = 'scale(1.15)';
        fab.style.boxShadow = '0 6px 24px rgba(79,115,92,0.5)';
        setTimeout(() => {
          fab.style.transform = 'scale(1)';
          fab.style.boxShadow = '0 4px 16px rgba(79,115,92,0.35)';
        }, 400);
      }
    }, 800);
  },

  moveToBuy(id) {
    const item = (app.data.pantry || []).find(i => i.id === id);
    if (item) {
      item.inStock = true;
      Store.save(app.data);
      this.render();
    }
  },

  remove(id) {
    app.data.pantry = (app.data.pantry || []).filter(i => i.id !== id);
    Store.save(app.data);
    this.render();
  },

  clearBought() {
    app.data.pantry = (app.data.pantry || []).filter(i => i.inStock);
    Store.save(app.data);
    this.render();
  },

  showAddForm() {
    const categories = ['białko', 'nabiał', 'warzywa', 'węglowodany', 'tłuszcze', 'przyprawy', 'inne'];
    const catOptions = categories.map(c => `<option value="${c}">${c}</option>`).join('');

    app.ui.openModal('Dodaj produkt do listy', `
      <div style="display:flex;flex-direction:column;gap:10px">
        <div>
          <label style="font-size:12px;font-weight:600;color:#1F2621;display:block;margin-bottom:3px">Nazwa produktu</label>
          <input type="text" id="zakupy-name" placeholder="np. Pierś z kurczaka" style="width:100%;padding:10px;border:1px solid #D0D8D0;border-radius:12px;font-size:13px;font-family:inherit;box-sizing:border-box;background:#FAF8F2">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:#1F2621;display:block;margin-bottom:3px">Kategoria</label>
          <select id="zakupy-category" style="width:100%;padding:10px;border:1px solid #D0D8D0;border-radius:12px;font-size:13px;font-family:inherit;background:#FAF8F2">
            ${catOptions}
          </select>
        </div>
        <button onclick="app.zakupy.addItem()" style="width:100%;padding:12px;border:none;border-radius:14px;background:linear-gradient(135deg,#7DA08A,#4F735C);color:#FFFFFF;font-size:15px;font-weight:600;cursor:pointer">✓ Dodaj do listy</button>
      </div>
    `);
  },

  addItem() {
    const name = document.getElementById('zakupy-name').value.trim();
    const category = document.getElementById('zakupy-category').value;
    if (!name) { app.ui.showToast('Podaj nazwę produktu'); return; }

    if (!app.data.pantry) app.data.pantry = [];
    app.data.pantry.push({
      id: 'shop_' + Date.now(),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      category: category,
      qty: '',
      inStock: true
    });
    Store.save(app.data);
    app.ui.closeModal();
    this.render();
    app.ui.showToast('✓ Dodano: ' + name);
  }
};

// --- WATER ---
app.water = {
  getWaterGlassImage(pct) {
    if (pct <= 0) return 'water-glass-0.jpg';
    if (pct <= 20) return 'water-glass-1.jpg';
    if (pct <= 40) return 'water-glass-2.jpg';
    if (pct <= 60) return 'water-glass-3.jpg';
    if (pct <= 80) return 'water-glass-4.jpg';
    if (pct <= 99) return 'water-glass-5.jpg';
    return 'water-glass-6.jpg';
  },

  getTodayLog() {
    const today = getToday();
    const activeUser = app.auth.getActiveUser();
    return (app.data.water || []).filter(w => w.date === today && w.userId === activeUser.id);
  },

  getTotal() {
    return this.getTodayLog().reduce((sum, w) => sum + w.ml, 0);
  },

  add(ml) {
    const today = getToday();
    const activeUser = app.auth.getActiveUser();
    const entry = { 
      userId: activeUser.id, 
      date: today, 
      ml, 
      time: new Date().toLocaleTimeString('pl-PL', {hour:'2-digit',minute:'2-digit'}) 
    };
    if (!app.data.water) app.data.water = [];
    app.data.water.push(entry);
    Store.save(app.data);
    this.updateUI();
    this.updateFull();
  },

  reset() {
    const today = getToday();
    const activeUser = app.auth.getActiveUser();
    app.data.water = (app.data.water || []).filter(w => !(w.date === today && w.userId === activeUser.id));
    Store.save(app.data);
    this.updateUI();
    this.updateFull();
  },

  undo() {
    const today = getToday();
    const activeUser = app.auth.getActiveUser();
    const log = this.getTodayLog();
    if (log.length === 0) return;
    const last = log[log.length - 1];
    const idx = app.data.water.lastIndexOf(last);
    if (idx !== -1) app.data.water.splice(idx, 1);
    Store.save(app.data);
    this.updateUI();
    this.updateFull();
  },

  updateUI() {
    const total = this.getTotal();
    const activeUser = app.auth.getActiveUser();
    const target = activeUser.waterGoal || 2000;
    const pct = Math.min(100, (total / target) * 100);
    
    const countEl = document.getElementById('dash-water-count');
    if (countEl) countEl.textContent = `${total} ml / ${target} ml`;
    
    const glassImg = document.getElementById('water-glass-img');
    if (glassImg) glassImg.src = this.getWaterGlassImage(pct);
  },

  renderFull() {
    this.updateFull();
  },

  updateFull() {
    const total = this.getTotal();
    const activeUser = app.auth.getActiveUser();
    const target = activeUser.waterGoal || 2000;
    const pct = Math.min(100, (total / target) * 100);
    const circumference = 339.292;
    const offset = circumference - (pct / 100) * circumference;

    document.getElementById('water-circle-ml').textContent = total;
    document.getElementById('water-progress').setAttribute('stroke-dashoffset', offset);

    const targetEl = document.getElementById('water-target');
    if (targetEl) targetEl.textContent = `${target} ml`;

    const cups = total / 250;
    document.getElementById('water-cups-today').textContent = `${Math.round(cups * 10) / 10} szklanek dzisiaj`;

    // History
    const log = this.getTodayLog();
    const logContainer = document.getElementById('water-log');
    if (log.length === 0) {
      logContainer.innerHTML = '<p class="text-muted">Brak wpisów</p>';
    } else {
      let html = '';
      log.slice().reverse().forEach(w => {
        html += `<div class="water-entry"><span>${w.time}</span><span>+${w.ml} ml</span></div>`;
      });
      logContainer.innerHTML = html;
    }
  }
};

// --- SETTINGS ---
app.settings = {
  render() {
    const activeUser = app.auth.getActiveUser();
    
    // Users
    const usersContainer = document.getElementById('settings-users');
    let userHtml = '';
    app.data.users.forEach(u => {
      const isActive = u.id === activeUser.id;
      const kcalEditable = app.data._kcalEditing === u.id;
      userHtml += `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid #EEF2EE">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:36px;height:36px;border-radius:50%;background:${u.id === 'renata' ? '#E8D5C8' : '#C8DCF0'};display:flex;align-items:center;justify-content:center;font-size:16px">${u.avatar || '👤'}</div>
            <div>
              <div style="font-size:14px;font-weight:600;color:#1F2621">${u.name}</div>
              <div style="font-size:11px;color:#9AABA0">
                ${u.pairedWith ? `🧑‍🤝‍🧑 Połączony z ${app.data.users.find(x => x.id === u.pairedWith)?.name || u.pairedWith}` : '—'}
              </div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            ${kcalEditable ? `
              <input type="number" id="kcal-input-${u.id}" value="${u.kcal}" min="800" max="4000" style="width:65px;padding:6px 8px;border-radius:10px;background:#F5F8F5;color:#1F2621;border:1px solid #7DA08A;font-size:13px;text-align:center;font-family:inherit">
              <button onclick="app.settings.saveKcal('${u.id}')" style="padding:6px 10px;border:none;border-radius:10px;background:#7DA08A;color:#FFF;font-size:12px;cursor:pointer;font-weight:600">✓</button>
            ` : `
              <span style="font-size:13px;font-weight:600;color:#4F5E53;margin-right:4px">${u.kcal} kcal</span>
              <button onclick="app.settings._kcalEditing = '${u.id}'; app.settings.render()" style="padding:4px 8px;border:1px solid #D6E0D6;border-radius:8px;background:transparent;color:#68776D;font-size:11px;cursor:pointer">✎</button>
            `}
          </div>
        </div>`;
    });
    usersContainer.innerHTML = userHtml;

    // Meal times per user
    const mtContainer = document.getElementById('settings-mealtimes');
    if (mtContainer) {
      const myUser = app.data.users.find(u => u.id === activeUser.id);
      const times = myUser?.mealTimes || { breakfast: '8:00', lunch: '14:00', dinner: '20:00' };
      const mtLabels = { breakfast: 'Śniadanie', lunch: 'Obiad', dinner: 'Kolacja' };
      mtContainer.innerHTML = Object.keys(mtLabels).map(key => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #EEF2EE">
          <span style="font-size:13px;color:#4F5E53">${mtLabels[key]}</span>
          <input type="time" value="${times[key] || '08:00'}" onchange="app.settings.setMealTime('${key}', this.value)" style="padding:4px 8px;border:1px solid #DEEAE2;border-radius:8px;background:#F5F8F5;color:#1F2621;font-size:13px;font-family:inherit">
        </div>
      `).join('');
    }

    // Pairing section
    const pairContainer = document.getElementById('settings-pairing');
    if (pairContainer) {
      const myUser = app.data.users.find(u => u.id === activeUser.id);
      const pairedUser = myUser?.pairedWith ? app.data.users.find(u => u.id === myUser.pairedWith) : null;
      const otherUsers = app.data.users.filter(u => u.id !== activeUser.id);
      
      let pairHtml = '';
      
      // Pending request from someone else
      if (myUser?.pairRequestFrom) {
        const requester = app.data.users.find(u => u.id === myUser.pairRequestFrom);
        pairHtml += `
          <div style="background:#FFF8E8;border:1px solid #E8DDB0;border-radius:12px;padding:10px;margin-bottom:10px">
            <div style="font-size:13px;color:#4F5E53;margin-bottom:8px">📩 ${requester?.name || 'Ktoś'} chce gotować z Tobą!</div>
            <div style="display:flex;gap:8px">
              <button onclick="app.settings.acceptPair('${myUser.pairRequestFrom}')" style="flex:1;padding:8px;border:none;border-radius:10px;background:#7DA08A;color:#FFF;font-size:12px;cursor:pointer;font-weight:600">✓ Akceptuj</button>
              <button onclick="app.settings.rejectPair()" style="flex:1;padding:8px;border:1px solid #D6E0D6;border-radius:10px;background:transparent;color:#68776D;font-size:12px;cursor:pointer">✕ Odrzuć</button>
            </div>
          </div>`;
      }
      
      if (pairedUser) {
        pairHtml += `
          <div style="background:#EFF5F0;border:1px solid #C8D8C8;border-radius:12px;padding:10px;margin-bottom:10px">
            <div style="font-size:13px;color:#4F5E53;margin-bottom:6px">🧑‍🤝‍🧑 Gotujecie razem z ${pairedUser.name}</div>
            <div style="font-size:11px;color:#9AABA0;margin-bottom:8px">Przy posiłkach możesz wybrać tryb 👤 solo lub 👫 wspólny</div>
            <button onclick="app.settings.removePair()" style="padding:6px 12px;border:1px solid #D6C8C8;border-radius:10px;background:transparent;color:#C07060;font-size:11px;cursor:pointer">Rozłącz</button>
          </div>`;
      } else if (!myUser?.pairRequestFrom) {
        pairHtml += `
          <div style="font-size:13px;color:#4F5E53;margin-bottom:8px">Połącz się z drugą osobą:</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">`;
        otherUsers.forEach(u => {
          pairHtml += `
            <button onclick="app.settings.requestPair('${u.id}')" style="padding:8px 14px;border:1px solid #D6E0D6;border-radius:12px;background:#F5F8F5;color:#4F5E53;font-size:12px;cursor:pointer">
              ${u.avatar || '👤'} ${u.name}
            </button>`;
        });
        pairHtml += `</div>`;
      }
      
      pairContainer.innerHTML = pairHtml;
    }

    // Appliances - expanded checklist
    const appContainer = document.getElementById('settings-appliances');
    const displayEl = document.getElementById('selected-appliances-display');
    const allAppliances = [
      { id: 'airfryer', label: '🔥 Air Fryer' },
      { id: 'thermomix', label: '⚙️ Thermomix TM6' },
      { id: 'lidlomix', label: '⚙️ Lidlomix' },
      { id: 'piekarnik', label: '🔥 Piekarnik' },
      { id: 'kuchenka', label: '🔥 Kuchenka gazowa/indukcyjna' },
      { id: 'mikrofalowka', label: '📡 Mikrofalówka' },
      { id: 'blender', label: '🔄 Blender' },
      { id: 'robot', label: '⚙️ Robot kuchenny' },
      { id: 'parowar', label: '♨️ Parowar' },
      { id: 'grill', label: '🍖 Grill elektryczny' },
      { id: 'gofrownica', label: '🧇 Gofrownica' },
      { id: 'slowcooker', label: '🍲 Slow cooker' },
    ];
    let appHtml = '';
    const selected = app.data.appliances || [];
    allAppliances.forEach(a => {
      const checked = selected.includes(a.id);
      appHtml += `
        <label style="display:flex;align-items:center;gap:8px;padding:6px 0;cursor:pointer">
          <input type="checkbox" ${checked ? 'checked' : ''} onchange="app.settings.toggleAppliance('${a.id}')" style="accent-color:#7DA08A;width:16px;height:16px">
          <span style="font-size:13px;color:#4F5E53">${a.label}</span>
        </label>`;
    });
    appContainer.innerHTML = appHtml;
    if (displayEl) {
      const names = selected.map(id => {
        const a = allAppliances.find(x => x.id === id);
        return a ? a.label.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ 0-9]/g, '').trim() : id;
      });
      displayEl.textContent = names.length ? names.join(', ') : '—';
    }

    // Cook together toggle
    const cookToggle = document.getElementById('cook-together');
    const cookLabel = document.getElementById('cook-together-label');
    if (cookToggle && cookLabel) {
      const isPaired = myUser?.pairedWith;
      if (isPaired) {
        cookToggle.disabled = false;
        cookToggle.checked = app.data.cookTogether;
        cookLabel.textContent = app.data.cookTogether ? 'Gotujecie razem' : 'Gotujecie osobno';
      } else {
        cookToggle.disabled = true;
        cookToggle.checked = false;
        cookLabel.textContent = 'Połącz profile, by gotować razem';
      }
    }
  },

  saveKcal(userId) {
    const input = document.getElementById('kcal-input-' + userId);
    if (!input) return;
    const kcal = parseInt(input.value);
    if (isNaN(kcal) || kcal < 800 || kcal > 4000) {
      app.ui.showToast('Podaj wartość między 800 a 4000 kcal');
      return;
    }
    const user = app.data.users.find(u => u.id === userId);
    if (user) {
      user.kcal = kcal;
      app.data._kcalEditing = null;
      Store.save(app.data);
      app.dashboard.render();
      this.render();
      app.ui.showToast('✓ Zapisano kaloryczność');
    }
  },

  requestPair(targetUserId) {
    const activeUser = app.auth.getActiveUser();
    const target = app.data.users.find(u => u.id === targetUserId);
    if (!target) return;
    target.pairRequestFrom = activeUser.id;
    Store.save(app.data);
    this.render();
    app.ui.showToast('📩 Zaproszenie wysłane do ' + target.name);
  },

  acceptPair(requesterId) {
    const activeUser = app.auth.getActiveUser();
    const me = app.data.users.find(u => u.id === activeUser.id);
    const requester = app.data.users.find(u => u.id === requesterId);
    if (!me || !requester) return;
    me.pairedWith = requesterId;
    requester.pairedWith = activeUser.id;
    me.pairRequestFrom = null;
    requester.pairRequestFrom = null;
    app.data.cookTogether = true;
    Store.save(app.data);
    this.render();
    app.ui.showToast('🧑‍🤝‍🧑 Połączono! Możecie gotować razem');
  },

  rejectPair() {
    const activeUser = app.auth.getActiveUser();
    const me = app.data.users.find(u => u.id === activeUser.id);
    if (!me) return;
    const requester = app.data.users.find(u => u.id === me.pairRequestFrom);
    if (requester) requester.pairRequestFrom = null;
    me.pairRequestFrom = null;
    Store.save(app.data);
    this.render();
  },

  removePair() {
    const activeUser = app.auth.getActiveUser();
    const me = app.data.users.find(u => u.id === activeUser.id);
    if (!me || !me.pairedWith) return;
    const partner = app.data.users.find(u => u.id === me.pairedWith);
    if (partner) { partner.pairedWith = null; partner.pairRequestFrom = null; }
    me.pairedWith = null;
    me.pairRequestFrom = null;
    app.data.cookTogether = false;
    Store.save(app.data);
    this.render();
    app.ui.showToast('Rozłączono');
  },

  toggleAppliance(id) {
    if (!app.data.appliances) app.data.appliances = [];
    const idx = app.data.appliances.indexOf(id);
    if (idx > -1) {
      app.data.appliances.splice(idx, 1);
    } else {
      app.data.appliances.push(id);
    }
    Store.save(app.data);
    this.render();
  },

  confirmReset() {
    if (confirm('Czy na pewno chcesz zresetować wszystkie dane?')) {
      if (confirm('Wszystkie dane zostaną nieodwracalnie usunięte. Jesteś pewna, że chcesz kontynuować?')) {
        localStorage.removeItem(Store.key);
        app.data = Store.defaults();
        Store.save(app.data);
        app.nav.switch('dashboard');
        app.dashboard.render();
        app.ui.showToast('✓ Dane zresetowane');
      }
    }
  },

  toggleCookTogether() {
    app.data.cookTogether = document.getElementById('cook-together').checked;
    document.getElementById('cook-together-label').textContent = app.data.cookTogether ? 'Gotujecie razem' : 'Gotujecie osobno';
    Store.save(app.data);
  },

  exportData() {
    const data = JSON.stringify(app.data, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kuchenny-plan-${getToday()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        app.data = data;
        Store.save(data);
        app.nav.switch('dashboard');
        app.dashboard.render();
      } catch(err) {
        alert('Nieprawidłowy plik');
      }
    };
    reader.readAsText(file);
  }
};

// ========== INIT ==========
app.init = function() {
  this.nav.init();
  this.pantry.initFilters();
  
  if (!app.data.activeUser) {
    // Show start screen
    document.getElementById('view-start').style.display = 'flex';
    document.getElementById('view-start').style.height = '100%';
    document.getElementById('view-dashboard').style.display = 'none';
    document.querySelectorAll('#views > section:not(#view-start):not(#view-dashboard)').forEach(v => v.style.display = 'none');
  } else {
    document.getElementById('view-start').style.display = 'none';
    document.getElementById('view-dashboard').style.display = 'block';
    // Show nav on restore
    const nav = document.querySelector('.floating-nav');
    if (nav) nav.style.display = 'flex';
    this.dashboard.render();
    this.water.updateUI();
  }
};

// document.addEventListener('DOMContentLoaded', () => app.init());
