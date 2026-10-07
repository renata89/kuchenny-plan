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
      ingredients: ['jajka', 'ser żółty', 'masło', 'chleb żytni'],
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
      ingredients: ['tofu', 'feta', 'oliwa', 'chleb żytni'],
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
      ingredients: ['jajka', 'ser żółty', 'chleb żytni'],
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
      ingredients: ['jajka', 'ser żółty', 'masło'],
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
      ingredients: ['twaróg', 'rzodkiewka', 'chleb żytni'],
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
      ingredients: ['pierś z kurczaka', 'brokuły', 'ziemniaki', 'oliwa'],
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
      ingredients: ['tofu', 'papryka', 'cukinia', 'sos sojowy', 'ryż brązowy'],
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
      ingredients: ['tofu', 'feta', 'pomidory', 'cukinia', 'oliwa'],
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
      ingredients: ['łosoś', 'brokuły', 'marchewka', 'oliwa', 'kasza gryczana'],
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
      ingredients: ['ciecierzyca', 'mleko kokosowe', 'pomidory', 'szpinak', 'ryż'],
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
      ingredients: ['feta', 'awokado', 'mix sałat', 'ogórek', 'pomidor', 'oliwa'],
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
      ingredients: ['chleb żytni', 'ser żółty', 'pomidor'],
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
      ingredients: ['twaróg', 'ogórek', 'rzodkiewka', 'chleb żytni'],
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
      ingredients: ['jajka', 'papryka', 'cukinia', 'pomidor'],
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
      ingredients: ['tuńczyk w puszce', 'mix sałat', 'ogórek', 'pomidor', 'oliwa', 'chleb żytni'],
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
        { id: 'renata', name: 'Renata', kcal: 1600, protein: 120, fat: 50, carbs: 170, fiber: 25, waterGoal: 2000, avatar: '👩' },
        { id: 'rafal', name: 'Rafał', kcal: 2100, protein: 140, fat: 65, carbs: 220, fiber: 30, waterGoal: 2500, avatar: '👨' }
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
    app.dashboard.render();
  },

  switchUser() {
    document.getElementById('view-dashboard').style.display = 'none';
    document.getElementById('view-start').style.display = 'flex';
    document.getElementById('view-start').style.height = '100%';
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

    let totalRenata = 0, totalHusband = 0;
    let html = `<h3 style="margin-bottom:12px">${formatDatePL(dateStr)}</h3>`;
    
    plan.meals.forEach(m => {
      if (m.renata) totalRenata += m.renata.kcal || 0;
      if (m.husband) totalHusband += m.husband.kcal || 0;

      const whomClass = m.shared ? 'shared' : (m.forUser || 'renata');
      html += `
        <div class="meal-card ${whomClass}" style="margin-bottom:8px;padding:12px">
          <div class="meal-header">
            <div>
              <div class="meal-name" style="font-size:14px">${m.name}</div>
              <div class="meal-time" style="font-size:11px">${m.time || ''}</div>
            </div>
            <button class="btn-sm" onclick="app.mealplan.swapMeal('${dateStr}', '${m.recipeId}', '${m.category}')" style="padding:3px 10px;font-size:11px">🔄</button>
          </div>
        </div>`;
    });

    html += `
      <div class="summary-card" style="margin-top:12px">
        <div class="summary-row"><span>Renata suma:</span><span style="color:var(--accent);font-weight:600">${totalRenata} kcal</span></div>
        <div class="summary-row"><span>Mąż suma:</span><span style="color:var(--blue);font-weight:600">${totalHusband} kcal</span></div>
      </div>`;

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

    // Pick breakfast
    const bfOptions = dbMeals.filter(m => m.category === 'breakfast');
    if (bfOptions.length > 0) {
      const picked = bfOptions[Math.floor(Math.random() * bfOptions.length)];
      meals.push(this.makeMealEntry(picked, 'breakfast', cookTogether));
    }

    // Pick lunch
    const lunOptions = dbMeals.filter(m => m.category === 'lunch');
    if (lunOptions.length > 0) {
      const picked = lunOptions[Math.floor(Math.random() * lunOptions.length)];
      meals.push(this.makeMealEntry(picked, 'lunch', cookTogether));
    }

    // Pick dinner
    const dinOptions = dbMeals.filter(m => m.category === 'dinner');
    if (dinOptions.length > 0) {
      const picked = dinOptions[Math.floor(Math.random() * dinOptions.length)];
      meals.push(this.makeMealEntry(picked, 'dinner', cookTogether));
    }

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
      instructions: recipe.instructions
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
        ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
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

    let html = `<p class="text-muted" style="margin-bottom:12px">Wybierz zamiennik:</p>`;
    options.forEach(m => {
      const macrosR = calcMacros(m, 'renata');
      const macrosH = calcMacros(m, 'husband');
      const tags = m.tags.join(', ');
      html += `
        <div class="meal-card shared" style="margin-bottom:8px;padding:12px;cursor:pointer" onclick="app.mealplan.applySwap('${dateStr}', '${currentRecipeId}', '${m.id}')">
          <div style="font-weight:600;font-size:14px">${m.name}</div>
          <div class="meal-macros">
            <span class="meal-macro" style="font-size:12px">R: 🔥${macrosR.kcal}kcal | B${macrosR.protein}g T${macrosR.fat}g W${macrosR.carbs}g</span>
            <span class="meal-macro" style="font-size:12px">M: 🔥${macrosH.kcal}kcal | B${macrosH.protein}g T${macrosH.fat}g W${macrosH.carbs}g</span>
          </div>
          ${tags ? `<div class="text-muted" style="font-size:11px">${tags}</div>` : ''}
        </div>`;
    });

    app.ui.openModal('🔄 Zamiana posiłku', html);
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
  }
};

// --- RECIPES ---
app.recipes = {
  currentFilter: 'all',

  render() {
    this.renderCategories();
    this.renderList();
  },

  renderCategories() {
    const container = document.getElementById('recipe-categories');
    const categories = [
      { id: 'all', label: 'Wszystkie' },
      { id: 'breakfast', label: 'Śniadania' },
      { id: 'lunch', label: 'Obiady' },
      { id: 'dinner', label: 'Kolacje' }
    ];
    // Add appliance filters only if set
    const appliances = app.data.appliances || [];
    if (appliances.includes('airfryer')) categories.push({ id: 'airfryer', label: '🔥 Air Fryer' });
    if (appliances.includes('thermomix')) categories.push({ id: 'thermomix', label: '⚙️ TM6' });

    let html = '<div class="filter-bar">';
    categories.forEach(c => {
      html += `<button class="filter-btn ${this.currentFilter === c.id ? 'active' : ''}" onclick="app.recipes.setFilter('${c.id}')">${c.label}</button>`;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  setFilter(filterId) {
    this.currentFilter = filterId;
    this.render();
  },

  renderList() {
    const container = document.getElementById('recipe-list');
    const all = [...MEAL_DB.breakfast, ...MEAL_DB.lunch, ...MEAL_DB.dinner];
    const appliances = app.data.appliances || [];
    
    let filtered = all;
    if (this.currentFilter !== 'all') {
      if (this.currentFilter === 'airfryer' || this.currentFilter === 'thermomix') {
        filtered = all.filter(r => r.appliances.includes(this.currentFilter));
      } else {
        filtered = all.filter(r => r.category === this.currentFilter);
      }
    }

    if (filtered.length === 0) {
      container.innerHTML = '<div class="card empty-state"><p style="color:#68776D">Brak przepisów w tej kategorii.</p></div>';
      return;
    }

    let html = '';
    filtered.forEach(r => {
      let tags = '';
      r.tags.forEach(t => {
        if (t === 'airfryer') tags += `<span class="meal-tag airfryer">🔥 Air Fryer</span>`;
        else if (t === 'thermomix') tags += `<span class="meal-tag tm6">⚙️ TM6</span>`;
        else tags += `<span class="meal-tag">${t}</span>`;
      });

      const macrosR = calcMacros(r, 'renata');
      const macrosH = calcMacros(r, 'husband');

      html += `
        <div class="card meal-card" style="margin-bottom:10px;cursor:pointer" onclick="app.recipes.showDetail('${r.id}')">
          <div class="meal-header">
            <div>
              <div class="meal-name">${r.name}</div>
              <div class="meal-time">${r.time} • ${r.ingredients.length} składników</div>
            </div>
            <div>${tags}</div>
          </div>
          <div class="meal-macros">
            <span class="meal-macro">R: 🔥${macrosR.kcal}kcal | <span class="p">B${macrosR.protein}g</span> <span class="f">T${macrosR.fat}g</span> <span class="c">W${macrosR.carbs}g</span></span>
            <span class="meal-macro">M: 🔥${macrosH.kcal}kcal | <span class="p">B${macrosH.protein}g</span> <span class="f">T${macrosH.fat}g</span> <span class="c">W${macrosH.carbs}g</span></span>
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
      <ul style="padding-left:18px;margin-bottom:12px;color:#4F5E53;font-size:13px">
        ${r.ingredients.map(i => `<li>${i}</li>`).join('')}
      </ul>
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

// --- WATER ---
app.water = {
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

  remind() {
    const toast = document.getElementById('water-toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
  },

  dismissToast() {
    document.getElementById('water-toast').classList.remove('show');
  },

  updateUI() {
    const total = this.getTotal();
    const activeUser = app.auth.getActiveUser();
    const target = activeUser.waterGoal || 2000;
    const pct = Math.min(100, (total / target) * 100);
    
    const countEl = document.getElementById('dash-water-count');
    if (countEl) countEl.textContent = `${total} ml / ${target} ml`;
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
    // Users
    const usersContainer = document.getElementById('settings-users');
    let userHtml = '';
    app.data.users.forEach(u => {
      userHtml += `
        <div class="user-card">
          <div>
            <div class="user-name">${u.name}</div>
            <div class="user-kcal">Cel: ${u.kcal} kcal/dzień</div>
          </div>
          <div class="user-edit">
            <label style="font-size:12px;color:var(--muted)">kcal:</label>
            <input type="number" value="${u.kcal}" 
              onchange="app.settings.updateKcal('${u.id}', this.value)"
              min="1000" max="4000">
          </div>
        </div>`;
    });
    usersContainer.innerHTML = userHtml;

    // Appliances
    const appContainer = document.getElementById('settings-appliances');
    const allAppliances = [
      { id: 'airfryer', label: '🔥 Air Fryer' },
      { id: 'thermomix', label: '⚙️ Thermomix TM6' },
      { id: 'piekarnik', label: '🔥 Piekarnik' },
      { id: 'parowar', label: '♨️ Parowar' }
    ];
    let appHtml = '';
    allAppliances.forEach(a => {
      const active = (app.data.appliances || []).includes(a.id);
      appHtml += `<div class="appliance-chip ${active?'active':''}" onclick="app.settings.toggleAppliance('${a.id}')">${a.label}</div>`;
    });
    appContainer.innerHTML = appHtml;

    // Cook together
    document.getElementById('cook-together').checked = app.data.cookTogether;
    document.getElementById('cook-together-label').textContent = app.data.cookTogether ? 'Gotujecie razem' : 'Gotujecie osobno';
  },

  updateKcal(userId, val) {
    const kcal = parseInt(val);
    if (isNaN(kcal) || kcal < 800) return;
    const user = app.data.users.find(u => u.id === userId);
    if (user) {
      user.kcal = kcal;
      Store.save(app.data);
      app.dashboard.render();
    }
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

  toggleCookTogether() {
    app.data.cookTogether = document.getElementById('cook-together').checked;
    document.getElementById('cook-together-label').textContent = app.data.cookTogether ? 'Gotujecie razem' : 'Gotujecie osobno';
    Store.save(app.data);
  },

  resetAll() {
    if (confirm('Usunąć wszystkie dane?')) {
      localStorage.removeItem(Store.key);
      app.data = Store.defaults();
      Store.save(app.data);
      app.nav.switch('dashboard');
      app.dashboard.render();
    }
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
    this.dashboard.render();
    this.water.updateUI();
  }
};

// document.addEventListener('DOMContentLoaded', () => app.init());
